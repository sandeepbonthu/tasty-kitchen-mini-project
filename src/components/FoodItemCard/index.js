import {Component} from 'react'
import {FaStar} from 'react-icons/fa'

import AddSubtractCounter from '../AddSubtractCounter'

import './index.css'

class FoodItemCard extends Component {
  state = {showCounter: false, quantity: 1}

  onClickAddButton = () => {
    const {quantity} = this.state
    const {addFoodItem, foodItemDetails} = this.props
    addFoodItem({...foodItemDetails, quantity})
    this.setState(prevState => ({
      showCounter: !prevState.showCounter,
    }))
  }

  toggleCounter = () => {
    this.setState(prevState => ({
      showCounter: !prevState.showCounter,
    }))
  }

  render() {
    const {showCounter} = this.state
    const {
      foodItemDetails,
      cartList,
      incrementFoodItemQuantity,
      decrementFoodItemQuantity,
    } = this.props

    const {id, imageUrl, name, cost, rating} = foodItemDetails

    return (
      <li testid="foodItem" className="food-item-card-container">
        <img src={imageUrl} className="food-item-card-image" alt="food item" />
        <div className="data-container">
          <h1 className="card-title">{name}</h1>
          <p className="cost">{cost}</p>
          <p className="food-item-rating-container">
            <span className="rating-logo">
              <FaStar />
            </span>
            {'  '} {rating}
          </p>
          {showCounter ? (
            <AddSubtractCounter
              key={id}
              id={id}
              toggleCounter={this.toggleCounter}
              cartList={cartList}
              incrementFoodItemQuantity={incrementFoodItemQuantity}
              decrementFoodItemQuantity={decrementFoodItemQuantity}
            />
          ) : (
            <button
              className="add-button"
              onClick={this.onClickAddButton}
              type="button"
            >
              Add
            </button>
          )}
        </div>
      </li>
    )
  }
}

export default FoodItemCard
