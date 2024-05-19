import React from 'react'
import useFetch from '../../hooks/useFetch'
import './featuredProperty.css'

const FeaturedProperty = () => {
    const {data, error, isLoading} = useFetch('http://localhost:5000/api/v1/hotels?featured=false&limit=4')
    console.log(data)
  return (
    <div className='featuredProperty'>
      <div className="featuredPropertyContainer">
        <h1>Home guests love</h1>
        <button>Discover Homes</button>
      </div>
      <div className="propertyCardContainer">
        {
            	data && data.map((item, index)=>(
            <div className="propertyCard" key={index}>
                <img src={item.photos && item.photos[0]} alt={item.name} className="propertyCardImg" />
                <div className="propertyCardText">
                    <h1>{item?.name}</h1>
                    <p>{item?.city} <br/> {item?.address}</p>
                    <p>Starting from Rs. {item?.cheapestPrice}</p>
                    { item.rating && 
                    <span className='rating'>
                        <span>{item.rating}</span>
                        <b>Excellent . 2,096 Reviews</b>
                    </span>
                    }      
                </div>
            </div>
                ))
        }
      </div>
    </div>
  )
}

export default FeaturedProperty
