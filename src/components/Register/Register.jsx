import { useState } from "react"
import { useNavigate } from "react-router-dom";
import * as authService from '../../services/authService'

const Register = (props) => {
    const [message, setMessage] = useState([''])
    const [signupFormData, setSignupFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })
    const navigate = useNavigate(); 

    const updateMessage = (msg) => {
        setMessage(msg)
    }

    const handleChange = async (e) => {
        setSignupFormData({ ...signupFormData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await authService.signup(signupFormData)
            props.setUser(response.user)
            navigate('/sign-in')
        } catch (error) {
            updateMessage(error.message)
        }
    }

    const { username, password, confirmPassword } = signupFormData

    const isFormInvalid = () => {
        return !(username && password && password === confirmPassword);
    };
    return (
        <>
            <div>
                <h1>Create A New Account</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username </label>
                        <input id='username' type='string' name='username' value={signupFormData.username} onChange={handleChange} />
                   </div>
                   <div>
                        <label htmlFor="pwd">Password</label>
                        <input id='pwd' type='password' name='password' value={signupFormData.password} onChange={handleChange} />
                   </div>
                   <div>
                        <label htmlFor="confirm-pwd">Confirm Password</label>
                        <input id='confirmPwd' type='password' name='confirmPassword' value={signupFormData.confirmPassword} placeholder='must match password' onChange={handleChange} />
                   </div>
                   
                   <button type="submit" disabled={isFormInvalid()}>Register</button>
                </form>
            </div>
        </>
    )
}

export default Register;