import './index.css'

const CartSummary = props => {
  const {cartList} = props
  let total = 0
  cartList.forEach(eachCartItem => {
    total += eachCartItem.cost * eachCartItem.quantity
  })

  const onClickPlaceOrder = () => {
    const {toggleSuccessPage} = props
    toggleSuccessPage()
  }

  return (
    <>
      <div className="order-total-container">
        <h1 className="order-total-label">Order Total:</h1>{' '}
        <p testid="total-price" className="order-total-value">
          &#8377; {total}
          .00
        </p>
      </div>
      <button
        type="button"
        className="place-order-button"
        onClick={onClickPlaceOrder}
      >
        Place Order
      </button>
    </>
  )
}

export default CartSummary
