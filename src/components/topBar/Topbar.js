import React, { useContext } from 'react'
import './topbar.css'
import {
    Link
} from "react-router-dom";
import { Context } from '../../context/Context';
export default function Topbar() {
    const { user, dispatch } = useContext(Context)
    const handlerLogout = () => {
        dispatch({ type: "LOGOUT" });
    }
    return (
        <div className='top'>
            <div className='topLeft'>
                <i className="topIcon fab fa-facebook-square"></i>
                <i className="topIcon fab fa-instagram-square"></i>
                <i className="topIcon fab fa-pinterest-square"></i>
                <i className="topIcon fab fa-twitter-square"></i>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <Link to='/'><li className="topListItem">HOME</li></Link>
                    <Link to='/register'><li className="topListItem">REGISTER</li></Link>
                    <Link to='/login'><li className="topListItem">LOGIN</li></Link>
                    <Link to='/write'><li className="topListItem">WRITE</li></Link>
                    <li className="topListItem" onClick={handlerLogout}>{user && "LOGOUT"}</li>
                </ul>
            </div>
            <div className="topRight">
                <Link to='/setting'>
                    <img
                        className="topImg"

                        src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        alt=""
                    />
                </Link>
            </div>
        </div>

    )
}
