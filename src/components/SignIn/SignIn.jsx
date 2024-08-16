import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../../services/authService";
import styles from './Signin.module.css';

const SignIn = ({ setUser }) => {
  const [message, setMessage] = useState('');
  const [signinForm, setSigninForm] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();
  const updateMessage = (msg) => {
    setMessage(msg);
  };
  const handleChange = (e) => {
    setMessage('');
    setSigninForm({
      ...signinForm,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token, user } = await authService.signin({
        username: signinForm.username,
        password: signinForm.password
      });
      setUser(user);
      navigate('/');
    } catch (e) {
      updateMessage(e.message);
    }
  };
  return (
    <main className={styles.signinContainer}>
      <div className={styles['form-wrap']}>
        <h1>Welcome, Sign In</h1>
        {message && <p className={styles['error-message']}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input type='text' name='username' value={signinForm.username} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="pwd">Password</label>
            <input type='password' name='password' value={signinForm.password} onChange={handleChange} />
          </div>
          <button type='submit'>Sign-In</button>
        </form>
      </div>
    </main>
  );
};
export default SignIn;