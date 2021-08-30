import React, { useContext, useState } from 'react'
import './write.css'
import axios from 'axios'
import { Context } from '../../context/Context'

import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html';

export default function Write() {
    const PF = "http://localhost:5000/images/"

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [file, setFile] = useState("")
    const { user } = useContext(Context)
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [uploadedImages, setUploadedImages] = useState([])

    // console.log(editorState.getCurrentContent);
    const handlerSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        }
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename)
            data.append("file", file)
            newPost.photo = filename;
            try {
                await axios.post("/upload", data);
            } catch (err) {

            }
        }
        try {
            const res = await axios.post("/posts", newPost);
            window.location.replace("/post/" + res.data._id);
        } catch (err) {

        }
    }


    //nhap
    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
    };
    const uploadImageCallBack = async (file) => {
        console.log(file)
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        try {
            await axios.post("/upload", data);
        } catch (err) {

        }
        const imageObject = {
          file: file,
          localSrc: PF + filename,
          
        }
        // console.log(imageObject.localSrc, '00000');
    
        uploadedImages.push(imageObject);
    
        setUploadedImages(uploadedImages)
        return new Promise(
          (resolve, reject) => {
            resolve({ data: { link: imageObject.localSrc } });
          }
        );
    }
    return (
        <div className='write'>
            {
                file && (
                    <img
                        className='imageWrite'
                        src={URL.createObjectURL(file)}
                    />

                )
            }

            <form className='formWrite' onSubmit={handlerSubmit}>
                <div className="formGroupinput">
                    <label htmlFor='inputfile'>
                        <i className="writeIcon fas fa-plus"></i>
                    </label>
                    <input type='file' id='inputfile' style={{ display: "none" }} onChange={e => setFile(e.target.files[0])}></input>
                    <input type='text' placeholder='title' className='writeInputText' onChange={e => setTitle(e.target.value)}></input>
                </div>
                <div className="formGroupinput">
                    {/* <textarea className='writeInputText' placeholder="tell your post">

                    </textarea> */}
                </div>
                <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={onEditorStateChange}
                    toolbar={{
                        options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'image', 'history'],
                        link: {
                            options: ['link'],
                        },
                        history: { inDropdown: true },
                        image: {
                            uploadCallback: uploadImageCallBack,
                            previewImage: true,
                            alt: { present: true, mandatory: false }
                        }
                    }}
                />
                <textarea
                disabled
                value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                />
                <button className="btn-submit" type='submit'>Publish</button>
            </form>
        </div>
    )
}
