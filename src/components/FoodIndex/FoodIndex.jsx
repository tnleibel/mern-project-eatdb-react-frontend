import styles from './FoodIndex.module.css';

const FoodIndex = (props) => {
  return (
    <div className={styles.container}>
      <nav>
        <ul>
          {props.foodList.map((food) => (
            <li key={food._id}>
              <h2>{food.name}</h2>
              <p>Vegan: {food.isVegan}</p>
              <p>Price: {food.price}</p>
              <p>Rating: {food.rating}</p>
              <p>Ingredients: {food.ingredients}</p>
              <button>Edit</button>
              <button>Delete</button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
export default FoodIndex;

