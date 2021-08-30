import React from 'react'
import SideBar from '../../components/sidebar/Sidebar'
import SinglePost from '../../components/singlepost/SinglePost'
import './single.css'
export default function Single() {
    return (
        <div className='single'>
            <SinglePost/>
            <SideBar />
        </div>
    )
}
