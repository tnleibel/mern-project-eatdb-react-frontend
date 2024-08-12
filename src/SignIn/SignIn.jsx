import { useState } from "react";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState();
    const navigate = useNavigate();

    const handleSubmit = () => {
        e.preventDefault();
    }

    return (
        <>
            <div>
                <h1>Welcome, Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type='string' value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="pwd">Password</label>
                        <input type='password' value={pwd} onChange={(e) => setPwd(e.target.value)} />
                    </div>
                    <button type='subit'>Sign-In</button>
                </form>
            </div>
        </>
    )
}

export default SignIn;