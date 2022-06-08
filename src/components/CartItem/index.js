import Counter from '../Counter'

import './index.css'

const CartItem = props => {
  const {
    cartItemDetails,
    incrementFoodItemQuantity,
    decrementFoodItemQuantity,
  } = props
  const {id, name, quantity, cost, imageUrl} = cartItemDetails

  const totalPrice = cost * quantity

  return (
    <div testid="cartItem" className="cart-item">
      <img className="cart-food-item-image" src={imageUrl} alt={name} />
      <div className="cart-item-details-container">
        <h1 className="cart-product-title">{name}</h1>
        <div className="cart-counter-price-container">
          <Counter
            key={id}
            foodItemId={id}
            quantity={quantity}
            incrementFoodItemQuantity={incrementFoodItemQuantity}
            decrementFoodItemQuantity={decrementFoodItemQuantity}
          />
          <p className="cart-total-price">&#8377; {totalPrice}.00</p>
        </div>
      </div>
    </div>
  )
}

export default CartItem
