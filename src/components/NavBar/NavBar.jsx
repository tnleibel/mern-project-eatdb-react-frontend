import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';


const NavBar = ({ user, handleSignout }) => {
  return (
    <nav>
      <ul>
        {user ? (
          <>
            <li><Link to="/">Home</Link></li>
            <li><button onClick={handleSignout}>Sign Out</button></li>
          </>
        ) : (
          <>
            <li><Link to="/signin">Sign In</Link></li>
            <li><Link to="/signup">Register</Link></li>
          </>
        )}
        <li>
          <Link to='/restaurants'>All Restaurants</Link>
        </li>
      </ul>
    </nav>
  );
};
export default NavBar;