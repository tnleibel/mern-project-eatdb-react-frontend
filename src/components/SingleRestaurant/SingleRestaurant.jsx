import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

//mocking a restaurant until the backend is done
const mockRestaurant = [
    {id: 1, name: 'pink onion', category: 'Italian', rating: 5, review: 'best pizza spot in SF'},
    {id: 2, name: 'shi shi', category: 'Japanese', rating: 3, review: 'good vibes'},
    {id: 3, name: 'linlin', category: 'Indian', rating: 3.5, review: 'had a great time with my wife, great service'},
    {id: 4, name: 'sfasfa', category: 'American', rating: 0, review: 'terrible food and service'},
]

const SingleRestaurant = () => {
    const [restaurant, setRestaurant] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        // will need to fetch the details of restaurants by id after backend is done
        //testing using mock restaurant data
        console.log(id);
        const fetchedMockRestaurantById = mockRestaurant.find((x) => x.id === parseInt(id));
        setRestaurant(fetchedMockRestaurantById)
    }, [id]);
    if (!restaurant) {
        <div>Loading the details of the clicked restaurant.....</div>
    }
    return (
        <>
            <div>
                <h1>{restaurant.name}</h1>
                <p>Ctg: {restaurant.category}</p>
                <p>Rating: {restaurant.rating}</p>
                <p>Reviews: {restaurant.review}</p>
                <h3><strong>FoodList</strong></h3>
                <ul>
                    {restaurant.foodList.length > 0 ? (
                        restaurant.foodList.map((food, index) => (
                            <div key={index}>
                                <p>{food.name}</p>
                                <p>{food.ingredients}</p>
                                <p>{food.isVegan ? "Vegan" : "Not Vegan"}</p>
                                <p>Food Rating: {food.rating}</p>
                                <p>Price: {food.price}</p>
                                <Link to={`/restaurants/${id}/food/edit/${food._id}`}>Edit Food</Link>
                            </div>
                        ))
                    ) : (
                        <p>Nothing is in foodList</p>
                    )} 
                </ul>
                <Link to={`/restaurants/${id}/food/new`}>Add Food/Menu</Link>
            </div>
        </>
    ) 
}

export default SingleRestaurant;