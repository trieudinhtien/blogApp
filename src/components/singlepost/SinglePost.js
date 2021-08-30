import { useEffect, useState,useContext } from 'react'
import { useLocation } from 'react-router-dom'
import {
    Link
} from "react-router-dom";
import './singlepost.css'
import axios from 'axios'
import { Context } from '../../context/Context'


export default function SinglePost() {
    const PF = "http://localhost:5000/images/"
    const { user } = useContext(Context)
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const [isUpdateing, setisUpdateing] = useState(false);
    const [title, setTitle] = useState("");
    

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("/posts/" + path);
            setPost(res.data)
            setTitle(res.data.title)
        }
        getPost()
    }, [path]);

    const handlerUpdate = () => {
        setisUpdateing(true)
    }

    const handlerDelete = async() => {
        try{
            await axios.delete(`/posts/${post._id}`, {
                data: {username: user.username}});
            window.location.replace("/");
        }catch(err){}
    }

    const clickupdate = async()=>{
        try{
            await axios.put(`/posts/${post._id}`, {
                username: user.username,
                title
            });
            window.location.reload();
        }catch(err){
            console.log(err);
        }
    }
    return (
        <div className='singlepost'>
            <div className='singlePost'>
                <div className='singlePostWrapper'>
                    {post.photo && (
                        <img
                            src={PF + post.photo}
                            alt=''
                            className="singlePostImg"
                        />
                    )}
                    <h1 className="singlePostTitle">
                        {
                            isUpdateing ? (<input type='text' className='singlePostTitle' value={title} onChange={(e)=> setTitle(e.target.value)} autoFocus></input>) :    post.title
                        }
                   
                        {post.username === user?.username &&
                            <div className="singlePostEdit">
                                <i className="singlePostIcon far fa-edit" onClick={handlerUpdate}></i>
                                <i className="singlePostIcon far fa-trash-alt" onClick={handlerDelete}></i>
                            </div>
                        }
                    </h1>
                    <div className="singlePostInfo">
                        <span>
                            Author:
                            <Link to={`/?user=${post.username}`}>
                                <b className="singlePostAuthor">
                                    {post.username}
                                </b>
                            </Link>
                        </span>
                        <span>{new Date(post.createdAt).toDateString}</span>
                    </div>
                    
                    <p className="singlePostDesc">
                        <div dangerouslySetInnerHTML={{ __html: post.desc }}>
                        </div>
                    </p>
                    {isUpdateing && <button onClick={clickupdate}>update</button>}
                </div>
            </div>
        </div>
    )
}
