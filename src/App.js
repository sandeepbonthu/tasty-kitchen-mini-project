import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import RestaurantDetails from './components/RestaurantDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  componentDidMount() {
    this.gettingCartDataFromLocalStorage()
  }

  componentWillUnmount() {
    this.storingDataInLocalStorage()
  }

  gettingCartDataFromLocalStorage = () => {
    const {cartList} = this.state
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    if (cartData) {
      this.setState({
        cartList: [...cartData],
      })
    } else {
      localStorage.setItem('cartData', JSON.stringify(cartList))
    }
  }

  storingDataInLocalStorage = () => {
    const {cartList} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartList))
  }

  removeAllFoodItems = () => {
    this.setState({cartList: []})
  }

  addFoodItem = foodItem => {
    const {cartList} = this.state
    const foodItemObject = cartList.find(
      eachFoodItem => eachFoodItem.id === foodItem.id,
    )

    if (foodItemObject) {
      this.setState(
        prevState => ({
          cartList: prevState.cartList.map(eachFoodItem => {
            if (eachFoodItem.id === foodItem.id) {
              const updateQuantity = eachFoodItem.quantity + foodItem.quantity
              return {...eachFoodItem, quantity: updateQuantity}
            }
            return eachFoodItem
          }),
        }),
        this.storingDataInLocalStorage,
      )
    } else {
      this.setState(
        prevState => ({
          cartList: [...prevState.cartList, foodItem],
        }),
        this.storingDataInLocalStorage,
      )
    }
  }

  removeFoodItem = foodItemId => {
    const {cartList} = this.state

    const updatedList = cartList.filter(foodItem => foodItem.id !== foodItemId)

    this.setState({cartList: updatedList}, this.storingDataInLocalStorage)
  }

  incrementFoodItemQuantity = id => {
    this.setState(
      prevState => ({
        cartList: prevState.cartList.map(foodItem => {
          if (foodItem.id === id) {
            const updateQuantity = foodItem.quantity + 1
            return {...foodItem, quantity: updateQuantity}
          }
          return foodItem
        }),
      }),
      this.storingDataInLocalStorage,
    )
  }

  decrementFoodItemQuantity = id => {
    const {cartList} = this.state

    const foodItemObject = cartList.find(eachFoodItem => eachFoodItem.id === id)

    if (foodItemObject.quantity > 1) {
      this.setState(
        prevState => ({
          cartList: prevState.cartList.map(foodItem => {
            if (foodItem.id === id) {
              const updateQuantity = foodItem.quantity - 1
              return {...foodItem, quantity: updateQuantity}
            }
            return foodItem
          }),
        }),
        this.storingDataInLocalStorage,
      )
    } else {
      this.removeFoodItem(id)
    }
  }

  render() {
    const {cartList} = this.state
    return (
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute
          exact
          path="/restaurant/:id"
          render={routeProps => (
            <RestaurantDetails
              cartList={cartList}
              addFoodItem={this.addFoodItem}
              incrementFoodItemQuantity={this.incrementFoodItemQuantity}
              decrementFoodItemQuantity={this.decrementFoodItemQuantity}
              {...routeProps}
            />
          )}
        />
        <ProtectedRoute
          exact
          path="/cart"
          render={routeProps => (
            <Cart
              cartList={cartList}
              gettingCartDataFromLocalStorage={
                this.gettingCartDataFromLocalStorage
              }
              addFoodItem={this.addFoodItem}
              incrementFoodItemQuantity={this.incrementFoodItemQuantity}
              decrementFoodItemQuantity={this.decrementFoodItemQuantity}
              {...routeProps}
            />
          )}
        />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    )
  }
}

export default App
