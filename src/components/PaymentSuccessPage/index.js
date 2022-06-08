import {Link} from 'react-router-dom'
import './index.css'

const PaymentSuccessPage = () => (
  <div className="payment-success-container">
    <img
      className="success-image"
      src="https://res.cloudinary.com/dpx8zts9r/image/upload/v1634629144/tasty-kitchens-payment-successful_rnchif.png"
      alt="success"
    />
    <h1 className="payment-success-title-1">Payment Successful</h1>
    <p className="payment-success-title-2">
      Thank you for ordering Your payment is successfully completed.
    </p>
    <Link to="/">
      <button className="go-to-home-page-button" type="button">
        Go To Home Page
      </button>
    </Link>
  </div>
)

export default PaymentSuccessPage
