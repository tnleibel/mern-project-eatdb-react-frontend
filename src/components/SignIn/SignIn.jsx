import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signin } from "../../services/authService"; 
const SignIn = () => {
    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState();
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const user = await signin({ username, password: pwd });
        navigate('/')
    }

    return (
        <>
            <div>
                <h1>Welcome, Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type='string' name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="pwd">Password</label>
                        <input type='password' name='password' value={pwd} onChange={(e) => setPwd(e.target.value)} />
                    </div>
                    <button type='subit'>Sign-In</button>
                </form>
            </div>
        </>
    )
}

export default SignIn;