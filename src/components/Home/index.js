import Header from '../Header'
import RestaurantsOffers from '../RestaurantsOffers'
import RestaurantsList from '../RestaurantsList'
import Footer from '../Footer'

import './index.css'

const Home = () => (
  <div className="home-container">
    <Header activeTabId="home" />
    <RestaurantsOffers />
    <RestaurantsList />
    <Footer />
  </div>
)

export default Home
