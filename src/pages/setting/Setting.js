import React, { useContext, useState } from 'react'
import SideBar from '../../components/sidebar/Sidebar'
import { Context } from '../../context/Context'
import './setting.css'
import axios from 'axios'

export default function Setting() {
    const { user } = useContext(Context);
    const [file, setFile] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handlerSubmit = async (e) => {
        e.preventDefault();
        const updateUser = {
            userId: user._id,
            username, email, password
        }
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename)
            data.append("file", file)
            updateUser.profilePic = filename;
            try {
                await axios.post("/upload", data);
            } catch (err) {

            }
        }
        try {
            await axios.put("/users/"+user._id, updateUser);
            
        } catch (err) {

        }
    }

    return (
        <div className='setting'>
            <form className='formSetting' onSubmit={handlerSubmit}>
                <label>Profile Picture</label>
                <div className='settingAvatar'>
                    <img className='imgSetting' src={file ? URL.createObjectURL(file) : user.profilePic}></img>
                    <label htmlFor="fileInput">
                        <i className="settingsIcon far fa-user-circle"></i>{" "}
                    </label>
                    <input
                        id="fileInput"
                        type="file"
                        style={{ display: "none" }}
                        className="settingsPPInput"
                        onChange={e => setFile(e.target.files[0])}
                    />
                </div>
                <label htmlFor='ten'>Ho Ten:</label>
                <input className='inputSetting' placeholder={user.username} id='ten' type='text' onChange={(e) => setUsername(e.target.value)}></input>
                <label htmlFor='email'>Email:</label>
                <input className='inputSetting' placeholder={user.email} id='email' type='email' onChange={(e) => setEmail(e.target.value)}></input>
                <label htmlFor='password'>Password:</label>
                <input className='inputSetting' placeholder={user.password} id='password' type='password' onChange={(e) => setPassword(e.target.value)}></input>
                <button className="btn-upload" type="submit">
                    Update
                </button>
            </form>
            <SideBar />
        </div>
    )
}
