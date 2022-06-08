import {Link, withRouter} from 'react-router-dom'

import {GiHamburgerMenu} from 'react-icons/gi'

import {IoCloseCircle} from 'react-icons/io5'

import Popup from 'reactjs-popup'

import Cookies from 'js-cookie'

import './index.css'
import CartContext from '../../context/CartContext'

const menuItems = [
  {id: 1, pathId: 'home', displayText: 'Home'},
  {id: 2, pathId: 'cart', displayText: 'Cart'},
  {id: 3, displayText: 'Logout'},
]

const Header = props => {
  const onClickLogOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const renderCartItemsCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartListCount = cartList.length
        return (
          <>
            {cartListCount > 0 ? (
              <span className="cart-count-badge">{cartListCount}</span>
            ) : null}
          </>
        )
      }}
    </CartContext.Consumer>
  )

  const {activeTabId} = props

  const renderPopup = button => (
    <Popup trigger={button} modal>
      {close => (
        <div className="nav-bar-mobile-menu-popup">
          <ul className="nav-menu-mobile">
            <li key={menuItems[0].id} className="nav-menu-item">
              <Link
                to="/"
                className={
                  activeTabId === menuItems[0].pathId
                    ? 'nav-menu-item-link active-link'
                    : 'nav-menu-item-link'
                }
              >
                {menuItems[0].displayText}
              </Link>
            </li>
            <li key={menuItems[1].id} className="nav-menu-item">
              <Link
                to="/cart"
                className={
                  activeTabId === menuItems[1].pathId
                    ? 'nav-menu-item-link active-link'
                    : 'nav-menu-item-link'
                }
              >
                {menuItems[1].displayText}
                {renderCartItemsCount()}
              </Link>
            </li>
            <li key={menuItems[2].id} className="nav-menu-item">
              <button
                type="button"
                className="logout-button"
                onClick={onClickLogOut}
              >
                {menuItems[2].displayText}
              </button>
            </li>
          </ul>
          <button
            type="button"
            className="nav-menu-close-button"
            onClick={() => close()}
          >
            <IoCloseCircle color=" #334155" size="20" />
          </button>
        </div>
      )}
    </Popup>
  )

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-mobile-container">
          <Link to="/" className="nav-link">
            <div className="website-logo-container">
              <img
                className="website-logo"
                src="https://res.cloudinary.com/dpx8zts9r/image/upload/v1634628914/tasty-kitchens-logo_py7rah.png"
                alt="website logo"
              />
              <p className="website-name">Tasty Kitchens</p>
            </div>
          </Link>
          {renderPopup(
            <button className="hamburger-menu-button" type="button">
              <GiHamburgerMenu color="#183B56" size="20" />
            </button>,
          )}
        </div>
        <div className="nav-bar-large-container">
          <Link to="/" className="nav-link">
            <div className="website-logo-container">
              <img
                className="website-logo"
                src="https://res.cloudinary.com/dpx8zts9r/image/upload/v1634628914/tasty-kitchens-logo_py7rah.png"
                alt="website logo"
              />
              <p className="website-name">Tasty Kitchens</p>
            </div>
          </Link>

          <ul className="nav-menu-large">
            <li key={menuItems[0].id} className="nav-menu-item">
              <Link
                to="/"
                className={
                  activeTabId === menuItems[0].pathId
                    ? 'nav-menu-item-link active-link'
                    : 'nav-menu-item-link'
                }
              >
                {menuItems[0].displayText}
              </Link>
            </li>
            <li key={menuItems[1].id} className="nav-menu-item">
              <Link
                to="/cart"
                className={
                  activeTabId === menuItems[1].pathId
                    ? 'nav-menu-item-link active-link'
                    : 'nav-menu-item-link'
                }
              >
                {menuItems[1].displayText}
                {renderCartItemsCount()}
              </Link>
            </li>
            <li key={menuItems[2].id} className="nav-menu-item">
              <button
                type="button"
                className="logout-button"
                onClick={onClickLogOut}
              >
                {menuItems[2].displayText}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
