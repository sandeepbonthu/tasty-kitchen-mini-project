import {Link} from 'react-router-dom'

import {FaStar} from 'react-icons/fa'

import './index.css'

const RestaurantListItemCard = props => {
  const {restaurantItemDetails} = props
  const {id, imageUrl, name, cuisine, userRating} = restaurantItemDetails

  return (
    <Link to={`/restaurant/${id}`} className="restaurant-card-link">
      <li
        testid="restaurant-item"
        className="restaurant-card-container"
        key={id}
      >
        <img
          src={imageUrl}
          className="restaurant-card-image"
          alt="restaurant"
        />
        <div className="restaurant-item-data-container">
          <h1 className="restaurant-title">{name}</h1>
          <p className="restaurant-cuisine">{cuisine}</p>
          <div className="rating-container">
            <FaStar className="star-logo" />
            <p className="rating-count">{userRating.rating}</p>
            <p className="total-reviews-text">
              ({userRating.totalReviews} ratings)
            </p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantListItemCard
