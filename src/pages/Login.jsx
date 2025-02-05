import React,{useState} from 'react'
import '../styles/Login.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const Login = () => {

    // const location = useLocation()


    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        try {
            const loginResponse = await axios.post('http://localhost:3000/api/users/login', {
                email,
                password
            })

            if (loginResponse.status === 200) {
                localStorage.setItem('userID', loginResponse.data.userID)
                navigate('/dashboard')
            }

        } catch (error) {
            window.alert("Invalid Credentials")
        }
    }




    return (
        <div className='login-container'>
            <div className="login-leftContainer ">
                {/* <div className="registration-BreadCrumbContainer">
                    <BreadCrumb pathname={location.pathname} styling={"border-light button-padding shadow-light bg-white"} />
                </div> */}
                <div className="login-leftMainContainer shadow-light border-light bg-white">
                    <h1 className='fw-bold'>Welcome Back</h1>
                    <h4 style={{ color: '#8b8d93' }}>Welcome back! Please enter your details</h4>
                    <div className="login-leftInputItems">
                        <div className="login-leftInputIndividual">
                            <span>Email</span>
                            <input type="email" className='input shadow-light border-light  button-padding fw-bold' placeholder='hi@example.com'
                                onChange={(e) => setEmail(e?.target?.value)}
                            />
                        </div>
                        <div className="login-leftInputIndividual">
                            <span>Password</span>
                            <input type="password" className='input shadow-light border-light button-padding fw-bold'
                                onChange={(e) => setPassword(e?.target?.value)}
                                placeholder='Enter password' />
                        </div>
                    </div>
                    <div className="login-leftForgotPasswordContainer">
                        <h5>Forgot Password?</h5>
                    </div>
                    <div className="login-leftButtonContainer">
                        <button className='shadow-light border-light rounded-20 button-padding click fw-bold login'
                            onClick={() => {
                                if (email && password) {
                                    handleLogin()
                                } else {
                                    window.alert("Please fill the email and password!")
                                }
                            }}
                        >Login</button>
                    </div>
                    <div className="login-RegisterLinkContainer">
                        <h5>Dont have an account? <Link to={"/"} className='fw-bold'>Create Account</Link></h5>
                    </div>
                </div>

            </div>
            {/* <div className="login-rightContainer">
                <div className="login-ImageContainer">
                    <img src={Login1} alt="hi" />
                </div>
            </div> */}

        </div>
    )
}

export default Login