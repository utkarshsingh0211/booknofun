import './login.css'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Login = () => {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        username: null,
        password: null
    })
    const handleChange = (e)=>{
        setCredentials((prev)=> ({
            ...prev,
            [e.target.id]:e.target.value
        }))
    }
    const handleClick = async(e)=>{
        e.preventDefault()
        dispatch({
            type: 'LOGIN_START'
        })
        try {
            const res = await axios.post('http://localhost:5000/api/v1/auth/login',credentials)
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: res.data
            })
            navigate('/')
            
        } catch (err) {
            
            dispatch({
                type: 'LOGIN_FAILURE',
                payload: err.response.data.msg
            })
        }
    }
    const {user, loading, error, dispatch} = useContext(AuthContext)
    console.log(user, error)
    
    return (
        <div className="login">
          <div className="lContainer">
            {error && <span>{error}</span>}
            <input
              type="text"
              placeholder="username"
              id="username" 
              onChange={handleChange}
              className="lInput"
            />
            <input
              type="password"
              placeholder="password"
              id="password"
              onChange={handleChange}
              className="lInput"
            />
            <button disabled={loading} onClick={handleClick} className="lButton">
              Login
            </button>
          </div>
        </div>
      );
}

export default Login
