import React from 'react'
import './featured.css'
import useFetch from '../../hooks/useFetch'

const Featured = () => {
  const {data, error, loading} = useFetch('http://localhost:5000/api/v1/hotels/countByCity?cities=Delhi,Mumbai,Chennai')

  return (
    <div className='featured'>
      <div className="featuredItem">
        <img src="https://cf.bstatic.com/xdata/images/city/600x600/684765.jpg?k=3f7d20034c13ac7686520ac1ccf1621337a1e59860abfd9cbd96f8d66b4fc138&o=" alt="Taj mahal" className="featuredImg" />
        <div className="featuredItemText">
          <h1 className="primaryHeader">Delhi</h1>
          <h3 className='secondaryHeader'>{data[0]} + stays</h3>
        </div>
      </div>
      <div className="featuredItem">
        <img src="https://cf.bstatic.com/xdata/images/city/600x600/971346.jpg?k=40eeb583a755f2835f4dcb6900cdeba2a46dc9d50e64f2aa04206f5f6fce5671&o=" alt="Mud Island" className="featuredImg" />
        <div className="featuredItemText">
          <h1 className="primaryHeader">Mumbai</h1>
          <h3 className='secondaryHeader'>{data[1]} + stays</h3>
        </div>
      </div>
      <div className="featuredItem">
        <img src="https://cf.bstatic.com/xdata/images/city/600x600/684730.jpg?k=e37b93d88c1fe12e827f10c9d6909a1def7349be2c68df5de885deaa4bc01ee3&o=" alt="Mysore Palace" className="featuredImg" />
        <div className="featuredItemText">
          <h1 className="primaryHeader">Chennai</h1>
          <h3 className='secondaryHeader'>{data[2]} + stays</h3>
        </div>
      </div>
    </div>
  )
}

export default Featured
