import React, { useContext } from 'react'
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom' 
import { AuthContext } from '../../contexts/AuthContext'

const Navbar = () => {
  const {user, dispatch} = useContext(AuthContext)
  const navigate = useNavigate()
  // console.log(user.data)
  const handleLogout = ()=>{
    dispatch({
      type:'LOGOUT'
    })
    navigate('/')
  }
  return (
    <div className='navbar'>
        <div className="nav-container">
            <div className="logo"><Link to='/' className='txt-dec-none col-white'>BookScape</Link></div>
            <div className="navbar-items">
              {
                user?
                <>
                  <span className="userName">{user.data.username}</span>
                  <button className='nav-btn' onClick={handleLogout}>Logout</button>
                </>
                :
                <>
                <button className='nav-btn'>Register</button>
                <button className='nav-btn' onClick={()=>{navigate('/login')}}>Login</button>
                </>
              }
            </div>
        </div>
    </div>
  )
}

export default Navbar
