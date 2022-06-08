import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-content-container">
        <div className="footer-website-logo-container">
          <img
            className="footer-website-logo"
            src="https://res.cloudinary.com/dpx8zts9r/image/upload/v1634628951/tasty-kitchens-logo-white_bgv9yv.png"
            alt="website-footer-logo"
          />
          <h1 className="footer-website-name">Tasty Kitchens</h1>
        </div>
        <p className="footer-tag-line">
          The only thing we are serious about is food. Contact us on
        </p>
        <ul className="social-icons-container">
          <li className="social-icon-item">
            <FaPinterestSquare testid="pintrest-social-icon" />
          </li>
          <li className="social-icon-item">
            <FaInstagram testid="instagram-social-icon" />
          </li>
          <li className="social-icon-item">
            <FaTwitter testid="twitter-social-icon" />
          </li>
          <li className="social-icon-item">
            <FaFacebookSquare testid="facebook-social-icon" />
          </li>
        </ul>
      </div>
    </div>
  )
}
