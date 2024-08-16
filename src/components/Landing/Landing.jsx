import { Link } from 'react-router-dom';
import styles from './Landing.module.css';
import { useEffect, useState } from 'react';
import { index, guestPreview } from '../../services/restaurantService';
import { IoIosStar } from "react-icons/io";

const Landing = ({ user, handleSignout }) => {
    const [restaurants, setRestaurants] = useState([]);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const getRestaurants = async () => {
            try {
                if (user) {
                    const data = await index()
                    setRestaurants(data)
                } else {
                    const data = await guestPreview();
                    setRestaurants(data);
                }
                
            } catch (e) {
                setMessage('Error occured while getting data');
                console.log('Error occured while getting restaurants for db', e);
            }
        };
        getRestaurants();
    }, [user]);

    // based on rating, display eq # of stars
    const displayStars = (rating) => {
        let stars = [];
        for (let i = 0; i < Math.floor(rating); i++) {
            stars.push(<IoIosStar key={i} className={styles.icon} />);
        }
        if (rating % 1 !== 0) {
            stars.push(<IoIosStar key='halfStar' className={styles.icon} style={{ opacity: 0.5 }} />);
        }
        return stars;
    }
    return (
        <div>
            <div className={styles.landing}>
                <div className={styles.overlay}>
                    <div className={styles.welcome}>
                        <h1>EAT-DB</h1>
                        <p>Explore and discover amazing restaurants around you!</p>
                    </div>
                    <div className={styles.authBtns}>
                        {user ? (
                            <>
                                <h2>Hello, {user.username}!</h2>
                                <p>You are all set to start exploring and reviewing restaurants</p>
                                <Link to='/restaurants' className={styles.btn}>Restaurants</Link>
                            </>

                        ) : (
                            <>
                                <p>Welcome! You can explore all restaurants as a Guest or sign in to leave reviews</p>
                            </>
                        )}
                    </div>
                </div>            
            </div>
            {!user && (
                <div className={styles.preview}>
                    <h2>Guest preview, sign in/up for a better experience</h2>
                    <p>still under devepment</p>
                        {message ? (
                            <p>{message}</p>
                        ) : (
                            restaurants.length > 0 ? (
                                <div className={styles.restaurantGrid}>
                                    {restaurants.map((restaurant) => (
                                        <div key={restaurant._id} className={styles.restaurantItem}>
                                            <h3>{restaurant.name}</h3>
                                            <p><span>Category:</span> {restaurant.category}</p>
                                            <p className={styles.stars}>{displayStars(restaurant.rating)}</p>
                                            <p>{restaurant.review}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No Restaurants has been added</p>
                            )
                        )}
                </div>
            )}
        </div> 
    );
}

export default Landing;