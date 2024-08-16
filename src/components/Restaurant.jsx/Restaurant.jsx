import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoIosStar } from "react-icons/io";
import * as restaurantService from '../../services/restaurantService';
import * as authService from '../../services/authService';
import styles from './Restaurant.module.css';
import { SiAwselasticloadbalancing } from 'react-icons/si';
import mongoose from 'mongoose';

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
    const getUserRestaurants = async (userId) => {
        try {
            const allRestaurantsOnDB = await restaurantService.index();
            // comparing the authors _id with our userId
            // in our backend, we are populating author with user information 
            // since we only need the _id, we can access it using dot notation
            const userFilteredRestaurants = allRestaurantsOnDB.filter(restaurant => restaurant.author._id === userId);
            setUserRestaurants(userFilteredRestaurants);
        } catch (e) {
            setErrMessage('error while getting restaunts that belong to the logged in user')
            console.log(e);
        } finally {
            setProcessing(false);
        }
    }
    const allRestaurants = async () => {
        try {
            const all = await restaurantService.index();
            setRestaurants(all);
        } catch (e) {
            console.log(e);
        } finally {
            setProcessing(false);
        }
    };


    useEffect(() => {
        const getData = async () => {
            try {
                const user = authService.getUser();
                if (user) {
                    const userId = user._id;
                    if (showEverything) {
                        await allRestaurants();
                    } else {
                        getUserRestaurants(userId);
                    }
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

    const handleShowEverything = () => {
        setShowEverything(true);
    }

    const handleShowUserSpecificRestaurants = () => {
        setShowEverything(false);
    }

    if (processing) return <p>Still processing</p>
    if (errMessage) return <p>{errMessage}</p>
    return (
        <>
            <div>
                <h1>{showEverything ? "All Restaurants" : "Your Restaurants"}</h1>
                
                <button onClick={handleShowUserSpecificRestaurants}>Your Restaurants</button>
                <button onClick={handleShowEverything}>All Restaurants</button>
                <button><Link to="/restaurants/new">Add Restaurant</Link></button>
                <ul>
                    {(showEverything ? restaurants : userRestaurants).map((restaurant) => (
                        <li key={restaurant._id}>
                            <Link to={`/restaurants/${restaurant._id}`}>{restaurant.name}</Link>
                            <p>Ctg: {restaurant.category}</p>
                            <p><IoIosStar />: {restaurant.rating}</p>
                            <p>Reviews: {restaurant.review}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Restaurant;