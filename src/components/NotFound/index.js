import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <div className="not-found-content-container">
      <img
        className="not-found-image"
        src="https://res.cloudinary.com/dpx8zts9r/image/upload/v1634629189/tasty-kitchens-something-went-wrong-image_dday9s.png"
        alt="not found"
      />
      <h1 className="not-found-line-1">Page Not Found</h1>
      <p className="not-found-line-2">
        we are sorry, the page you requested could not be found Please go back
        to the homepage
      </p>
      <Link to="/" className="nav-link">
        <button className="not-found-home-page-button" type="button">
          Home Page
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
