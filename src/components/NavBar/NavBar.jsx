import { Link } from 'react-router-dom';

const NavBar = ({ user, handleSignout }) => {
  

  
  return (
    <>
        <nav>
          <ul>
            { user ? (
              <>
                <li><Link to="/">Home</Link></li>
                <li><button onClick={handleSignout}>Sign Out</button></li>
              </>
            ) : (
              <>
                <li><Link to="/sign-in">Sign In</Link></li>
                <li><Link to="/sign-up">Register</Link></li>
              </>
            )}
            <li>
              <Link to='/restaurants'>All Restaurants</Link>
            </li>
          </ul>
        </nav>
    </>
  )
}

export default NavBar;
