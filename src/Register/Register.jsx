import { useState } from "react"
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    // const navigate = useNavigate();
    const [e, setE] = useState(null);
    const handleSubmit = () => {
        e.preventDefault();
    }

    const isFormInvalid = () => {
        return !(username && password && password === passwordConf);
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
                    <input type='password' placeholder='must match password' value={confirmPwd} onChange={(e) => setPwd(e.target.value)} />
                   </div>
                   
                   <button disabled={isFormInvalid()}>Register</button>
                </form>
            </div>
        </>
    )
}

export default Register;