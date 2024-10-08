import React from 'react'
import './Navbar.css'
import menu_icon from '../../assets/menu.png'
import logo from '../../assets/logo.png'
import logo2 from '../../assets/mytube.png'
import search_icon from '../../assets/search.png'
import upload_icon from '../../assets/upload.png'
import more_icon from '../../assets/more.png'
import notification_icon from '../../assets/notification.png'
import user_profile2 from '../../assets/user_profile2.jpg'
import { Link } from 'react-router-dom'
const Navbar = ({setSidebar}) => {
  return (
    <nav className='flex-div'>
      <div className="nav-left flex-div">
          <img className='menu-icon' src={menu_icon} alt='menu_icon' onClick={()=>setSidebar(prev=>prev===false?true:false)}/>
        <Link to='/'>
          <img className='logo' src={logo2} alt='logo'/>
        </Link>
      </div>
      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input type='text' placeholder='search' />
          <img src={search_icon} alt='' />
        </div>
      </div>
      <div className="nav-right flex-div">
        <img src={upload_icon} alt="" />
        <img src={more_icon} alt="" />
        <img src={notification_icon} alt="" />
        <img className='user-icon' src={user_profile2} alt="" />
      </div>
    </nav>
  )
}

export default Navbar
