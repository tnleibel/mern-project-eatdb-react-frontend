import { useState } from "react"
import { useNavigate } from "react-router-dom";
import * as authService from '../../services/authService'

const Register = () => {
    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const navigate = useNavigate(); 
    const [err, setErr] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (pwd !== confirmPwd) {
            setErr("The passwords you provided do not match, please try again.");
            return;
        } 
        try {
            await authService.signup({username, password: pwd });
            navigate('/signin');
        } catch (e) {
            setErr(e.message || 'Error while registering');
        }
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
                        <input id='username' type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                   </div>
                   <div>
                        <label htmlFor="pwd">Password</label>
                        <input id='pwd' type='password' name='password' value={pwd} onChange={(e) => setPwd(e.target.value)} />
                   </div>
                   <div>
                        <label htmlFor="confirm-pwd">Confirm Password</label>
                        <input id='confirmPwd' type='password' name='confirmPassword' placeholder='must match password' value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} />
                   </div>
                   {err && <p className="error-message">{err}</p>}
                   <button disabled={isFormInvalid()}>Register</button>
                </form>
            </div>
        </>
    )
}

export default Register;