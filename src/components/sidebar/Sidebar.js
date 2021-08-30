import { useState, useEffect } from 'react'
import axios from 'axios';
import './sidebar.css';
import {
    Link
  } from "react-router-dom";
export default function SideBar() {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get("/category");
            setCats(res.data)
        }
        getCats();
    }, [])
    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img
                    src="https://lh3.googleusercontent.com/proxy/-1JdnDV7k_rIf_K7Owsx-Bm2J2-fXkCL5BNjzCfJ6mseFrafO1T6Dan23eBE2oIhqS65NJzy7DDHxyoNtQQFNRFGcICjHk80COXLW243sSgvWZ9mAgpZzG7jKoas0yFlJtSvikmrPuRQHHTS"
                    alt=""
                />
                <p>
                    Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
                    amet ex esse.Sunt eu ut nostrud id quis proident.
                </p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    {
                        cats.map((c) => (
                            <Link to={`/?cat=${c.name}`}>
                            <li className="sidebarListItem">
                                {c.name}
                            </li>
                            </Link>
                        ))
                    }
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fab fa-facebook-square"></i>
                    <i className="sidebarIcon fab fa-instagram-square"></i>
                    <i className="sidebarIcon fab fa-pinterest-square"></i>
                    <i className="sidebarIcon fab fa-twitter-square"></i>
                </div>
            </div>
        </div>
    )
}
