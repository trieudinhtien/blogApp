import React from 'react'
import './header.css'

export default function Header() {
    return (
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitleSm">React & Node</span>
                <span className="headerTitleLg">BLOG</span>
            </div>
            <img
                className="headerImg"
                src="https://cdn.pixabay.com/photo/2019/09/27/09/39/melons-4507974__480.jpg"
                alt=""
            />
        </div>
    )
}
