import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './searchListItems.css'

const SearchListItems = ({item}) => {
  const navigate = useNavigate()
  const handleSearch = ()=>{
    navigate(`/list/${item._id}`)
  }

  return (
    <div className='searchListItems'>
      <div className="resultImg">
        {item.photos.length ? <img src={item.photos[0]} alt="7-seasons" />:''}
      </div>
      <div className="resultDescription">
        <b>{item.name} </b>
        <p>{item.distance} from {item.city} center</p>
        <p>Featuring a 24-hour reception, the 7Seasons Apartments offers you spacious 1- to 3-bedroom apartments in the heart of Budapest, only 328 feet from Deak Ferenc tér, which is a major public transport..</p>
      </div>
      <div className="resultDetails">
        <span>
            <b>Excellent</b>
            <b>{item.rating}</b>
        </span>
        <span>Rs. {item.cheapestPrice} </span>
        <button onClick={handleSearch}>
        See Availibility
        </button>
      </div>
    </div>
  )
}

export default SearchListItems
