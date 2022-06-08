import {Component} from 'react'

import Cookies from 'js-cookie'

import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: true,
  arrows: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 3000,
  autoplaySpeed: 5000,
  pauseOnHover: true,
  adaptiveHeight: true,
  appendDots: dots => (
    <div className="slick-dots">
      <ul>{dots}</ul>
    </div>
  ),
}

class RestaurantsOffers extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    offersList: [],
  }

  componentDidMount() {
    this.getCarouselImages()
  }

  getCarouselImages = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      const {offers} = await fetchedData
      const newList = offers.map(eachObject => ({
        id: eachObject.id,
        imageUrl: eachObject.image_url,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        offersList: newList,
      })
    }
  }

  renderRestaurantsOffers = () => {
    const {offersList} = this.state

    return (
      <div className="slider-container">
        <Slider {...settings}>
          {offersList.map(eachOffer => (
            <div key={eachOffer.id}>
              <img
                src={eachOffer.imageUrl}
                className="offer-image"
                alt="offer"
              />
            </div>
          ))}
        </Slider>
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="offers-loader-container" testid="restaurants-offers-loader">
      <Loader type="Oval" color="#F7931E" width="100%" height="100%" />
    </div>
  )

  renderApiStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantsOffers()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="restaurants-offers-container">
        {this.renderApiStatusView()}
      </div>
    )
  }
}

export default RestaurantsOffers
