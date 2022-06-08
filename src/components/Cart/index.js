import {Component} from 'react'

import Header from '../Header'
import EmptyCartView from '../EmptyCartView'
import CartItem from '../CartItem'
import CartSummary from '../CartSummary'
import PaymentSuccessPage from '../PaymentSuccessPage'
import Footer from '../Footer'

import './index.css'

class Cart extends Component {
  state = {showSuccessPage: false}

  toggleSuccessPage = () => {
    this.setState(prevState => ({showSuccessPage: !prevState.showSuccessPage}))
  }

  renderCartListView = () => {
    const {
      cartList,
      incrementFoodItemQuantity,
      decrementFoodItemQuantity,
    } = this.props

    const cartData = JSON.parse(localStorage.getItem('cartData')).length
    console.log(cartData)

    const showEmptyView = cartList.length === 0

    return (
      <>
        {showEmptyView ? (
          <div className="cart-empty-view-container">
            <EmptyCartView />
          </div>
        ) : (
          <div className="cart-items-container">
            <div className="cart-content-container">
              <div className="item-quantity-price-container">
                <p className="item-quantity-price-text">Item</p>
                <p className="item-quantity-price-text">Quantity</p>
                <p className="item-quantity-price-text">Price</p>
              </div>
              {cartList.map(eachCartItem => (
                <CartItem
                  key={eachCartItem.id}
                  incrementFoodItemQuantity={incrementFoodItemQuantity}
                  decrementFoodItemQuantity={decrementFoodItemQuantity}
                  cartItemDetails={eachCartItem}
                />
              ))}
              <hr className="horizontal-line" />
              <CartSummary
                cartList={cartList}
                toggleSuccessPage={this.toggleSuccessPage}
              />
            </div>
            <Footer />
          </div>
        )}
      </>
    )
  }

  renderSuccessPage = () => <PaymentSuccessPage />

  render() {
    const {showSuccessPage} = this.state

    return (
      <div className="cart-page-container">
        <Header activeTabId="cart" />
        {showSuccessPage ? this.renderSuccessPage() : this.renderCartListView()}
      </div>
    )
  }
}

export default Cart
