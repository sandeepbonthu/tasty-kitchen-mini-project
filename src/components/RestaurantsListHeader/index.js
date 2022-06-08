import {BsFilterLeft} from 'react-icons/bs'

import './index.css'

const RestaurantsListHeader = props => {
  const {activeOptionId, sortByOptions, onChangeSortBy} = props

  const onChangeSortByEle = event => {
    onChangeSortBy(event.target.value)
  }

  return (
    <div className="text-sort-container">
      <h1 className="popular-restaurants-title">Popular Restaurants</h1>
      <div className="text-sort-by-container">
        <p className="select-your-fav-line">
          Select Your favourite restaurant special dish and make your day
          happy...
        </p>
        <div className="sort-by-container">
          <BsFilterLeft className="sort-by-icon" />
          <p className="sort-by">Sort By </p>
          <div className="options-container">
            <select
              name="sort-by-select"
              className="sort-by-select"
              value={activeOptionId}
              onChange={onChangeSortByEle}
            >
              {sortByOptions.map(eachOption => (
                <option key={eachOption.id} value={eachOption.optionId}>
                  {eachOption.displayText}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <hr className="middle-line" />
    </div>
  )
}

export default RestaurantsListHeader
