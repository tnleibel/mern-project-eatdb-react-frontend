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
        if (password !== confirmPassword) {
            updateMessage("The passwords you provided do not match, please try again.");
        return;
        } 
        try {
            const newUserResponse = await authService.signup(signupFormData)
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
                        <input id='username' type='text' name='username' value={username} onChange={handleChange} />
                   </div>
                   <div>
                        <label htmlFor="pwd">Password</label>
                        <input id='pwd' type='password' name='password' value={password} onChange={handleChange} />
                   </div>
                   <div>
                        <label htmlFor="confirm-pwd">Confirm Password</label>
                        <input id='confirm-pwd' type='password' name='confirmPassword' value={confirmPassword} placeholder='must match password' onChange={handleChange} />
                   </div>
                   {message && <p className="error-message">{message}</p>}
                   <button disabled={isFormInvalid()}>Register</button>
                </form>
            </div>
        </>
    )
}

export default Register;