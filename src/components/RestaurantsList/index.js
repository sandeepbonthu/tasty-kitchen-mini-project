import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import RestaurantsListHeader from '../RestaurantsListHeader'

import RestaurantListItemCard from '../RestaurantListItemCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 1,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class RestaurantsList extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    activeOptionId: sortByOptions[1].value,
    restaurantsList: [],
    activePage: 1,
    limit: 9,
  }

  componentDidMount() {
    this.getRestaurantsList()
  }

  getRestaurantsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {activeOptionId, activePage, limit} = this.state
    const offset = (activePage - 1) * limit
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${activeOptionId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.restaurants.map(each => ({
        hasOnlineDelivery: each.has_online_delivery,
        userRating: {
          ratingText: each.user_rating.rating_text,
          ratingColor: each.user_rating.rating_color,
          totalReviews: each.user_rating.total_reviews,
          rating: each.user_rating.rating,
        },
        name: each.name,
        hasTableBooking: each.has_table_booking,
        isDeliveryNow: each.is_delivering_now,
        costForTwo: each.cost_for_two,
        cuisine: each.cuisine,
        imageUrl: each.image_url,
        id: each.id,
        menuType: each.menu_type,
        location: each.location,
        opensAt: each.opens_at,
        groupByTime: each.group_by_time,
      }))

      this.setState({
        restaurantsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  onChangeSortBy = option => {
    this.setState({activeOptionId: option}, this.getRestaurantsList)
  }

  onIncrement = () => {
    const {activePage} = this.state
    if (activePage < 4) {
      this.setState({activePage: activePage + 1}, this.getRestaurantsList)
    }
  }

  onDecrement = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState({activePage: activePage - 1}, this.getRestaurantsList)
    }
  }

  renderRestaurantsList = () => {
    const {restaurantsList, activePage} = this.state

    return (
      <>
        <ul className="restaurants-list-container">
          {restaurantsList.map(eachItem => (
            <RestaurantListItemCard
              key={eachItem.id}
              restaurantItemDetails={eachItem}
            />
          ))}
        </ul>
        <div className="pagination-container">
          <button
            type="button"
            className="pagination-button"
            onClick={this.onDecrement}
            testid="pagination-left-button"
          >
            &#60;
          </button>

          <p className="pagination-text">
            <span testid="active-page-number">{activePage}</span> of 4
          </p>
          <button
            type="button"
            className="pagination-button"
            onClick={this.onIncrement}
            testid="pagination-right-button"
          >
            &#62;
          </button>
        </div>
      </>
    )
  }

  renderLoaderView = () => (
    <div testid="restaurants-list-loader" className="list-loader-container">
      <Loader type="Oval" color="#F7931E" width="100%" height="100%" />
    </div>
  )

  renderRestaurantsListApiStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantsList()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    const {activeOptionId} = this.state
    return (
      <div className="restaurants-container">
        <RestaurantsListHeader
          activeOptionId={activeOptionId}
          sortByOptions={sortByOptions}
          onChangeSortBy={this.onChangeSortBy}
        />

        {this.renderRestaurantsListApiStatusView()}
      </div>
    )
  }
}

export default RestaurantsList
