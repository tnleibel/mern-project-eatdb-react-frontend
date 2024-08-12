import { useState, useEffect } from 'react';
//mocking a restaurant until the backend is done
const mockRestaurant = [
    {id: 1, name: 'pink onion', category: 'Italian', rating: 5, review: 'best pizza spot in SF'},
    {id: 2, name: 'shi shi', category: 'Japanese', rating: 3, review: 'good vibes'},
    {id: 3, name: 'linlin', category: 'Indian', rating: 3.5, review: 'had a great time with my wife, great service'},
    {id: 4, name: 'sfasfa', category: 'American', rating: 0, review: 'terrible food and service'},
]
const fetchUserRestaurants = (userId) => {
    return mockRestaurant.filter(restaurant => restaurant.userId === userId);
}
const Restaurant = () => {
    const [restaurants, setRestaurants] = useState([]);
    const userId = 1;
    useEffect(() => {
        const userRestaurants = fetchUserRestaurants(userId);
        setRestaurants(userRestaurants);
    }, [userId]);
    return (
        <>
            <div>
                <h1>All Restaurants</h1>
                {restaurants.length === 0 ? (
                    <div><p>you have not added any restaurants</p></div>
                ) : (
                    <ul>{restaurants.map(r => (
                        <li>
                            <h1>{r.name}</h1>
                            <p>category: {r.category}</p>
                            <p>Rating: {r.rating}</p>
                            <p>Review: {r.review}</p>
                        </li>    
                    ))}    
                    </ul>
                )}
            </div>
        </>
    )
}

export default Restaurant;