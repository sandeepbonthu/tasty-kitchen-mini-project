import './index.css'

const Counter = props => {
  const {
    foodItemId,
    quantity,
    incrementFoodItemQuantity,
    decrementFoodItemQuantity,
  } = props

  const onClickDecrement = () => {
    decrementFoodItemQuantity(foodItemId)
  }
  const onClickIncrement = () => {
    incrementFoodItemQuantity(foodItemId)
  }

  return (
    <div className="food-item-counter-container">
      <button
        testid="decrement-quantity"
        type="button"
        onClick={onClickDecrement}
        className="food-item-counter-button"
      >
        -
      </button>
      <p testid="item-quantity" className="add-subtract-quantity-count">
        {quantity}
      </p>
      <button
        testid="increment-quantity"
        type="button"
        onClick={onClickIncrement}
        className="food-item-counter-button"
      >
        +
      </button>
    </div>
  )
}

export default Counter
