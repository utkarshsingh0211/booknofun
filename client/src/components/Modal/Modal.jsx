import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useFetch from '../../hooks/useFetch'
import { useContext, useState } from 'react'
import './modal.css'
import axios from 'axios'
import { SearchContext } from '../../contexts/SearchContext'

const Modal = ({setModal, hotelID}) => {

  const [selectedRooms, setSelectedRooms] = useState([])
  const {data, error, isLoading} = useFetch(`http://localhost:5000/api/v1/hotels/room/${hotelID}`)
  const rooms = data?.list
  const {date} = useContext(SearchContext)

  const handleChange = (e)=>{
    console.log(e.target.parentNode)
    const checked = e.target.checked
    const value = e.target.value

    setSelectedRooms(checked?[...selectedRooms, value]:selectedRooms.filter((room)=>room!==value))
  }

  const getDatesInRange = (startDate, endDate)=>{
    const start = new Date(startDate)
    const end = new Date(endDate)
    const date = new Date(start.getTime())
    let list = []
    while(date<=end)
    {
      list.push(new Date(date).getTime())
      date.setDate(date.getDate()+1)
    }
    return list
  }
  
  const allDates = getDatesInRange(date[0]?.startDate, date[0]?.endDate)
  
  const isAvailable = (roomNumber)=>{
    const isFound = roomNumber.unavailableDates.some((date)=>
    allDates.includes(new Date(date).getTime())
    )
    return !isFound
  }

  const handleClick = async()=>{
    
    try {
      await Promise.all(selectedRooms.map((roomId)=>{
        const res = axios.patch(`http://localhost:5000/api/v1/room/availability/${roomId}`,{dates:allDates})
        console.log(res)
      }))
    } catch (error) {
      console.log(error)
      
    }
    
  }
  console.log(allDates.length)
  return (
    <div className='modal'>
      <div className="modalContainer">
      <FontAwesomeIcon icon={faCircleXmark} className='cross' onClick={()=>{setModal(false)}}></FontAwesomeIcon>
      <h1>Select your rooms </h1>
      <div className="itemWrapper">
        {
          rooms && rooms.map((room)=>(
            <div className="item">
              <div className="info">
                <div>{room.title}</div>
                <div>{room.desc}</div>
                <div>Max People : <b> {room.maxPeople}</b></div>
                <div>Price : <b> {room.price*allDates.length*2}</b></div>

              </div>
              {
                room.roomNumbers && room.roomNumbers.map((roomNumber, index)=>(
                  <div className='roomStatus' key={index}>
                  <label htmlFor="">{roomNumber.number}</label>
                  <input type="checkbox" value={roomNumber._id} onChange={handleChange} disabled={!isAvailable(roomNumber)}/>
                  </div>
                ))
              }
            </div>
          ))
        }
        </div>
        <button onClick={handleClick}>Reserve</button>
      </div>
    </div>
  )
}

export default Modal
