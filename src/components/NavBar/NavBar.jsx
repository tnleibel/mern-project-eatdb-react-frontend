import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import logo from './logo.jpg';

const NavBar = ({ user, handleSignout }) => {
  return (
    <nav className={styles.container}>
      <Link to='/'><img src={logo} alt="A Restaurant" className={styles.logo} /></Link>
      <ul>
        {user ? (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <button onClick={handleSignout}>Sign Out</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/sign-in">Sign In</Link>
            </li>
            <li>
              <Link to="/sign-up">Register</Link>
            </li>
          </>
        )}
        <li>
          <Link to="/restaurants">All Restaurants</Link>
        </li>
      </ul>
    </nav>
  );
};
export default NavBar;