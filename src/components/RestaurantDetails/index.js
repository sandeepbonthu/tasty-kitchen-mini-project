import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaStar} from 'react-icons/fa'

import Header from '../Header'
import FoodItemCard from '../FoodItemCard'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class RestaurantDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    restaurantDetailsData: [],
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        id: fetchedData.id,
        name: fetchedData.name,
        costForTwo: fetchedData.cost_for_two,
        cuisine: fetchedData.cuisine,
        imageUrl: fetchedData.image_url,
        itemsCount: fetchedData.items_count,
        location: fetchedData.location,
        opensAt: fetchedData.opens_at,
        rating: fetchedData.rating,
        reviewsCount: fetchedData.reviews_count,
        foodItems: fetchedData.food_items.map(each => ({
          name: each.name,
          cost: each.cost,
          foodType: each.food_type,
          imageUrl: each.image_url,
          rating: each.rating,
          id: each.id,
        })),
      }

      this.setState({
        restaurantDetailsData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderRestaurantDetails = () => {
    const {
      cartList,
      addFoodItem,
      incrementFoodItemQuantity,
      decrementFoodItemQuantity,
    } = this.props
    const {restaurantDetailsData} = this.state
    const {
      name,
      cuisine,
      location,
      rating,
      reviewsCount,
      costForTwo,
      imageUrl,
      foodItems,
    } = restaurantDetailsData

    return (
      <>
        <div className="restaurant-header-container">
          <div className="restaurant-details-image-container">
            <img alt="restaurant" className="restaurant-image" src={imageUrl} />
            <div className="restaurant-data-container">
              <h1 className="restaurant-header-card-title">{name}</h1>
              <p className="cuisine-location">{cuisine}</p>
              <p className="cuisine-location">{location}</p>
              <div className="rating-cost-container">
                <div>
                  <p className="rating-cost">
                    <FaStar />
                    {'  '}
                    {'  '} {rating}
                  </p>
                  <p className="rating-cost-tag">{reviewsCount}+ Ratings</p>
                </div>
                <hr className="vertical-line" />
                <div>
                  <p className="rating-cost">
                    &#8377; {'  '}
                    {costForTwo}
                  </p>
                  <p className="rating-cost-tag">Cost For Two</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ul className="food-items-container">
          {foodItems.map(each => (
            <FoodItemCard
              key={each.id}
              id={each.id}
              cartList={cartList}
              addFoodItem={addFoodItem}
              incrementFoodItemQuantity={incrementFoodItemQuantity}
              decrementFoodItemQuantity={decrementFoodItemQuantity}
              foodItemDetails={each}
            />
          ))}
        </ul>
      </>
    )
  }

  renderLoaderView = () => (
    <div
      testid="restaurant-details-loader"
      className="details-loader-container"
    >
      <Loader type="Oval" color="#F7931E" width="100%" height="100%" />
    </div>
  )

  renderRestaurantDetailsApiStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="restaurant-details-container">
        <Header activeTabId="home" />
        {this.renderRestaurantDetailsApiStatusView()}
        <Footer />
      </div>
    )
  }
}

export default RestaurantDetails
