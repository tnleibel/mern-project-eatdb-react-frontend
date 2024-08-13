import { useState } from "react"
import { useNavigate } from "react-router-dom";
import * as authService from '../services/authService';

const Register = () => {
    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const navigate = useNavigate(); 
    const [e, setE] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (pwd !== confirmPwd) {
            setE("The passwords you provided do not match, please try again.");
            return;
        } 
        await authService.signup({username, password: pwd });
        navigate('/sign-in');
        
    }

    const isFormInvalid = () => {
        return !(username && pwd && pwd === confirmPwd);
    };
    return (
        <>
            <div>
                <h1>Create A New Account</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username </label>
                        <input id='username' type='string' name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                   </div>
                   <div>
                        <label htmlFor="pwd">Password</label>
                        <input id='pwd' type='password' name='password' value={pwd} onChange={(e) => setPwd(e.target.value)} />
                   </div>
                   <div>
                        <label htmlFor="confirm-pwd">Confirm Password</label>
                        <input id='confirmPwd' type='password' name='confirmPassword' placeholder='must match password' value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} />
                   </div>
                   
                   <button disabled={isFormInvalid()}>Register</button>
                </form>
            </div>
        </>
    )
}

export default Register;