import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"

const FoodForm = (props) => {
    const [foodFormData, setFoodFormData] = useState({
        name: '',
        isVegan: false,
        rating: 0,
        price: '',
        ingredients: ''
    })

    const { id } = useParams()

    const handleChange = (event) => {
        setFoodFormData({ ...foodFormData, [event.target.name]: event.target.value });
    };

    const handleCheckbox = (event) => {
        setFoodFormData({ ...foodFormData,[event.target.name]: event.target.checked })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleAddFood(id, foodFormData)
    }

    return(
        <main>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    required
                    type="text"
                    name="name"
                    id="name-input"
                    value={foodFormData.name}
                    onChange={handleChange}
                />
                <label htmlFor="isVegan">Vegan?</label>
                <input
                    type="checkbox"
                    name="isVegan"
                    id="isVegan-input"
                    checked={foodFormData.isVegan}
                    onChange={handleCheckbox}
                />
                <label htmlFor="price">Price:</label>
                <input
                    type="text"
                    name="price"
                    id="price-input"
                    value={foodFormData.price}
                    onChange={handleChange}
                />
                <label htmlFor="rating">Rating:</label>
                <select
                    name="rating"
                    id="rating-input"
                    value={foodFormData.rating}
                    onChange={handleChange}
                >
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
                <label htmlFor="ingredients">Ingredients:</label>
                <input
                    type="text-area"
                    name="ingredients"
                    id="ingredients-input"
                    value={foodFormData.ingredients}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}

export default FoodForm