import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoIosStar } from "react-icons/io";
import * as restaurantService from '../../services/restaurantService';
import * as authService from '../../services/authService';
import styles from './Restaurant.module.css';


//mocking a restaurant until the backend is done
// const mockRestaurant = [
//     {id: 1, name: 'pink onion', category: 'Italian', rating: 5, review: 'best pizza spot in SF'},
//     {id: 2, name: 'shi shi', category: 'Japanese', rating: 3, review: 'good vibes'},
//     {id: 3, name: 'linlin', category: 'Indian', rating: 3.5, review: 'had a great time with my wife, great service'},
//     {id: 4, name: 'sfasfa', category: 'American', rating: 0, review: 'terrible food and service'},
// ]
// const fetchUserRestaurants = async (userId) => {
//     const restaurants = await restaurantService.index();
//     return restaurants;
// }


const Restaurant = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [errMessage, setErrMessage] = useState(null);
    const [processing, setProcessing] = useState(true) // will use this to update the user while we are running async processes 
    const [showEverything, setShowEverything] = useState(false) // will use this boolean to toggle between showing everything or just what the logged in user has created
    const [userRestaurants, setUserRestaurants] = useState([]);
   const [currentUser, setCurrentUser] = useState(null); // will use this to identify the auth user and restaurants they own

    const getAllRestaurants = async (userId = null) => {
        try {
            const all = await restaurantService.index();
            if (userId) {
                const userFilteredRestaurants = all.filter(restaurant => restaurant.author._id === userId);
                setUserRestaurants(userFilteredRestaurants);
            } else {
                setRestaurants(all);
            }
        } catch (e) {
            setErrMessage("Error occured while getting restaurants");
            console.log(e);
        } finally {
            setProcessing(false);
        }
    }


    useEffect(() => {
        const getData = async () => {
            try {
                const user = authService.getUser();
                if (user) { // we are storing the logged in user in current user after fetching it using getUser
                    setCurrentUser(user._id);
                    const userId = user._id;
                    await getAllRestaurants(showEverything ? null : userId);
                } 
                else {
                    setErrMessage('The User does not seem to be logged in');
                    setProcessing(false);
                }
            } catch (e) {
                console.log(e);
                setProcessing(false)
            };
        };
        getData();
    }, [showEverything]);

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

    if (processing) return <p>Still processing</p>
    if (errMessage) return <p>{errMessage}</p>
    return (
        <>
            <div className={styles.restaurantContainer}>
                <button className={styles.toggleBtn} onClick={() => setShowEverything(!showEverything)}>
                    {showEverything ? "See Your Restaurants" : "See All Restaurants"}
                </button>
                <button className={styles.addBtn}><Link to="/restaurants/new">Add Restaurant</Link></button>
                <div className={styles.restaurantList}>
                    {(showEverything ? restaurants : userRestaurants).map((restaurant) => (
                        <div key={restaurant._id} className={styles.restaurantItem}>
                            <Link to={`/restaurants/${restaurant._id}`} className={styles.restaurantLink}>{restaurant.name}</Link>
                            <p className={styles.ctg}>Category: {restaurant.category}</p>
                            <p className={styles.rating}>{displayStars(restaurant.rating)}</p>
                            <p className={styles.review}>{restaurant.review}</p>
                            {currentUser === restaurant.author._id ? (
                                <button className={styles.editBtn}><Link to={`/restaurants/${restaurant._id}/edit`} className={styles.btnLink}>Edit</Link></button>
                            ) : (
                                <button className={styles.readBtn}><Link to={`/restaurants/${restaurant._id}`} className={styles.btnLink}>Read</Link></button>
                            )}
                            
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Restaurant;