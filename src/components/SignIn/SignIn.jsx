import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../../services/authService"; 


const SignIn = (props) => {
    const [message, setMessage] = useState([''])
    const [signinForm, setSigninForm] = useState({
        username: '',
        password: ''
    })
    const navigate = useNavigate();

    const updateMessage = (msg) => {
        setMessage(msg)
    }

    const handleChange = (e) => {
        updateMessage('')
        setSigninForm({ ...signinForm, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await authService.signin(signinForm)
            props.setUser(user)
            navigate('/')
        } catch (error) {
            updateMessage(error.message)
        }
    }

    return (
        <>
            <div>
                <h1>Welcome, Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type='text' name='username' value={signinForm.username} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="pwd">Password</label>
                        <input type='password' name='password' value={signinForm.password} onChange={handleChange} />
                    </div>
                    <button type='subit'>Sign-In</button>
                </form>
            </div>
        </>
    )
}

export default SignIn;