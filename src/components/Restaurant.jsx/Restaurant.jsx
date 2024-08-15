import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// importing star from react
import { IoIosStar } from "react-icons/io"; 
import * as restaurantService from '../../services/restaurantService';
import * as authService from '../../services/authService';
import { SiAwselasticloadbalancing } from 'react-icons/si';

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
                                                    // 
    const userId = 1;
    useEffect(() => {
        const userRestaurants = async () => {
            try {
                const user = authService.getUser();
                if (user) {
                    const userId = user._id;
                    const getRestaurants = await restaurantService.index();
                    setRestaurants(getRestaurants);
                } else {
                    setErrMessage('The User does not seem to be logged in');
                }
            } catch (e) {
                setErrMessage('Error while fetching restaurants')
                console.log(e);
            } finally {
                setProcessing(false);
            }
        };
        userRestaurants();
    }, []);

    if (processing) return <p>Still processing</p>
    if (errMessage) return <p>{errMessage}</p>
    return (
        <>
            <div>
                <h1>All Restaurants</h1>
                <Link to="/restaurants/new">Add Restaurant</Link>

                <ul>
                    {restaurants.map((restaurant) => (
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