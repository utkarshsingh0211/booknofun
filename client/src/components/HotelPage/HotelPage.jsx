import { faCross, faCut, faLeftLong, faLocationDot, faRightLong, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useContext, useState} from 'react'
import useFetch from '../../hooks/useFetch'

import {useLocation, useNavigate} from 'react-router-dom'
import './hotelPage.css'
import { SearchContext } from '../../contexts/SearchContext'
import {AuthContext} from '../../contexts/AuthContext'
import Modal from '../Modal/Modal'

const HotelPage = () => {
  const [open, setOpen] = useState(false)
  const [slider, setSlider] = useState(0)
  const [modal, setModal] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()
  const id = location.pathname.split("/")[2]
  const {user} = useContext(AuthContext)
  const {data, error, isLoading} = useFetch(`http://localhost:5000/api/v1/hotels/find/${id}`)
  const hotel = data.hotel

  const dayFinder = (a, b) =>{
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }
  const {date, counter} = useContext(SearchContext)
  const startDate = new Date(date[0]?.startDate)
  const endDate = new Date(date[0]?.endDate)
  const days = dayFinder(startDate, endDate)
  // console.log(days)

  const handleSlider = (key)=>{
    setOpen(true)
    setSlider(key)
  }
  const handleLeftBtn = ()=>{
    const rn = slider
    setSlider((rn+1)%hotel.photos.length)
  }
  const handleRightBtn = ()=>{
    const rn = slider
    setSlider((rn-1+hotel.photos.length)%hotel.photos.length)
  }
  const handleClick = ()=>{
    if(user)
    {
      setModal(true)
    }
    else{
      navigate('/login')
    }
  }
  
  return (
    <div className='hotelPage'>
      {
      open && <div className="slider">
        <img src={hotel.photos[slider]}></img> 
        <FontAwesomeIcon icon={faLeftLong} className='al fl' onClick={handleLeftBtn}></FontAwesomeIcon>
        <FontAwesomeIcon icon={faRightLong} className='ar fl' onClick={handleRightBtn}></FontAwesomeIcon>
        <FontAwesomeIcon icon={faX} className='ac fl' onClick={()=>{setOpen(false)}}></FontAwesomeIcon>
      </div>
      }
      {
        modal && <Modal setModal={setModal} hotelID={id}></Modal>
      }
      <div className="hotelTitleContainer">
        
        <div className="description">
          <span>{hotel?.name}</span>
          <span>
            <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>
            {'\u00A0'} {hotel?.address}, {hotel?.city}
            </span>
          <span>Excellent location - {hotel?.distance} from Center</span>
          <span>Book a stay over Rs {hotel?.cheapestPrice} and get a free airport taxi</span>
        </div>
        <button onClick={handleClick} >Reserve or Book Now</button>
      </div>
      <div className="hotelImgContainer">
          {
            hotel?.photos && hotel.photos.map((src,index)=>{
              return <img key={index} src={src} alt="img" onClick={()=>{handleSlider(index)}}/>
            })
          }
      </div>
      <div className="hotelDescCotainer">
          <div className='primaryDesc'>
          <h1 className="hotelTitle">Stay in the heart of City</h1>
              <p className="hotelDesc">
                Located a 5-minute walk from St. Florian's Gate in Krakow, Tower
                Street Apartments has accommodations with air conditioning and
                free WiFi. The units come with hardwood floors and feature a
                fully equipped kitchenette with a microwave, a flat-screen TV,
                and a private bathroom with shower and a hairdryer. A fridge is
                also offered, as well as an electric tea pot and a coffee
                machine. Popular points of interest near the apartment include
                Cloth Hall, Main Market Square and Town Hall Tower. The nearest
                airport is John Paul II International Kraków–Balice, 16.1 km
                from Tower Street Apartments, and the property offers a paid
                airport shuttle service.
              </p>
          </div>
          <div className="scheme">
            <p>Perfect for a {days}-night stay!</p>
            <p>Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!</p>
            <p><b>Rs {hotel?.cheapestPrice*days*counter.rooms}</b>/- ({days} nights)</p>
            <button onClick={handleClick}>Reserve or book now</button>
          </div>

      </div>
      
    </div>
  )
}

export default HotelPage
