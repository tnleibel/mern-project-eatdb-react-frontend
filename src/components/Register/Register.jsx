import { useState } from "react"
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    // const navigate = useNavigate(); // will activate after routes added in app.jsx
    const [e, setE] = useState(null);
    const handleSubmit = () => {
        e.preventDefault();
        if (pwd !== confirmPwd) {
            setE("The passwords you provided do not match, please try again.");
            return;
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
                        <input type='string' value={username} onChange={(e) => setUsername(e.target.value)} />
                   </div>
                   <div>
                    <label htmlFor="pwd">Password</label>
                    <input type='password' value={pwd} onChange={(e) => setPwd(e.target.value)} />
                   </div>
                   <div>
                    <label htmlFor="confirm-pwd">Confirm Password</label>
                    <input type='password' placeholder='must match password' value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} />
                   </div>
                   
                   <button disabled={isFormInvalid()}>Register</button>
                </form>
            </div>
        </>
    )
}

export default Register;