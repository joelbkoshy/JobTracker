import React, { useState } from 'react'
import '../styles/Registration.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { BreadCrumb } from '../components/BreadCrumb'
import axios from 'axios'


const Registration = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    const [showPassword, setShowPassword] = useState(false)



    const handleSignUp = async () => {
        try {
            const regResponse = await axios.post('http://localhost:3000/api/users/register', {
                name,
                email,
                password
            })

            console.log(regResponse.status)
            window.alert(regResponse.data.message)
            navigate('/login')
        } catch (error) {
            window.alert(error?.response?.data?.message)
        }
    }

    return (
        <div className='registration-container'>
            <div className="registration-leftContainer">
                {/* <div className="registration-BreadCrumbContainer">
                    <BreadCrumb pathname={location.pathname} styling={"border-light button-padding shadow-light bg-white"}/>
                </div> */}
                <div className="register-leftMainContainer shadow-light border-light bg-white">
                    <h1 className='fw-bold'>Create an account</h1>
                    <h4 style={{ color: '#8b8d93' }}>Hello There! Please enter your details</h4>
                    <div className="register-leftInputItems">
                        <div className="register-leftInputIndividual">
                            <span>Full Name</span>
                            <input type="text"
                                className='input shadow-light border-light button-padding fw-bold'
                                onChange={(e) => {
                                    setName(e?.target?.value)
                                }}
                                placeholder='eg. John Doe' />
                        </div>
                        <div className="register-leftInputIndividual">
                            <span>Email</span>
                            <input type="email" className='input shadow-light border-light button-padding fw-bold'
                                placeholder='hi@example.com'
                                onChange={(e) => {
                                    setEmail(e?.target?.value)
                                }}
                            />
                        </div>
                        <div className="register-leftInputIndividual">
                            <span>Password</span>
                            <div className="input-wrapper">
                                <input type={showPassword ? "text" : "password"} className='input shadow-light border-light button-padding fw-bold'
                                    onChange={(e) => { setPassword(e?.target?.value) }}
                                    placeholder='Enter password' />
                                <i className={`fa-solid ${showPassword ? "fa-eye-slash" : " fa-eye"}`} onClick={() => setShowPassword(!showPassword)} />
                            </div>
                        </div>
                    </div>
                    <div className="register-leftButtonContainer">
                        <button className='shadow-light border-light rounded-20 button-padding click fw-bold registerBtn'
                            style={{ color: 'white' }}
                            onClick={() => {
                                if (name && email && password) {
                                    handleSignUp()
                                } else {
                                    window.alert("Please fill the details")
                                }
                            }}

                        >
                            Sign up</button>
                    </div>
                    <div className="register-LoginLinkContainer">
                        <h5>Already have an account? <Link to={"/login"} className='fw-bold'>Sign in</Link></h5>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Registration