import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../../services/authService"; 
const SignIn = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [err, setErr] = useState();
    const [pwd, setPwd] = useState();
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const { token, user } = await authService.signin({ username, password: pwd})
            setUser(user);
            navigate('/restaurants');
            window.location.reload();
        } catch (e) {
            setErr('Invalid credentials')
        }
        
    }

    return (
        <>
            <div>
                <h1>Welcome, Sign In</h1>
                {err && <p style={{ color: 'red'}}>{err}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type='string' name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="pwd">Password</label>
                        <input type='password' name='password' value={pwd} onChange={(e) => setPwd(e.target.value)} />
                    </div>
                    <button type='submit'>Sign-In</button>
                    {err && <p> {err}</p>}
                </form>
            </div>
        </>
    )
}

export default SignIn;