import React, { useState, useContext, useEffect } from 'react'
import { faBed, faCalendarDays, faPerson, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './sideBarSearch.css'
import { DateRange } from 'react-date-range'
import { SearchContext } from '../../contexts/SearchContext'
import { format } from 'date-fns'

const SideBarSearch = ({
    setMinPrice, setMaxPrice
}) => {
    const {city, date:ctxDate, counter:ctxCounter, dispatch } = useContext(SearchContext)  
    const [destination, setDestination] = useState(city)
    const [date, setDate] = useState(ctxDate)
    const [counter, setCounter] = useState(ctxCounter)
    const [openDate, setOpenDate] = useState(false)
    const [openCounter, setOpenCounter] = useState(false)
    
    useEffect(() => {
        dispatch({
            type: 'NEW_SEARCH',
            payload: {
                city:destination,
                date: date,
                counter: counter
            }
        })
    }, [destination])
    
    console.log(city,date,counter)
    
    return (
    <div className='sideBarSearch'>
    <div className="sideBarContainer">
         {/* <h2>Search</h2> */}
        <div className="sideSearchItem">
        <FontAwesomeIcon icon={faSearch} className='sideIcon'></FontAwesomeIcon>
        <input type="text" placeholder='Destination' className='sideSearchInput' onChange={(e)=>{setDestination(e.target.value)}} value={destination}/>
        </div>
        
        <div className="sideSearchItem pos-rel">
        <FontAwesomeIcon icon={faCalendarDays} className='sideIcon' onClick={()=>{setOpenDate(!openDate);setOpenCounter(false)}}></FontAwesomeIcon>
            
            <span className="sideSearchText">{`${format(date[0]?.startDate,'dd/MM/yyyy')} - ${format(date[0]?.endDate,'dd/MM/yyyy')}`}</span>
            {openDate && <DateRange
                editableDateInputs={true}
                onChange={item => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className='pos-abs z-index-2'
                />}
        </div>
    
        <div className="sideSearchItem pos-rel">
            <FontAwesomeIcon icon={faPerson} className='sideIcon' onClick={()=>{setOpenCounter(!openCounter);setOpenDate(false)}}></FontAwesomeIcon>
            <span className="sideSearchText">{counter.adults} adults | {counter.childs} child | {counter.rooms} room</span>
            {openCounter && 
            <div className="sideSearchRoomStatus pos-abs z-index-2">
                <span className="infoStrips">
                    <p>adults</p>
                    <div className="btnWrappers">
                        <button disabled={counter.adults <=1} className='counterBtn' onClick={()=>{let temp = counter.adults-1;setCounter({...counter, adults: temp})}}>-</button>
                            {counter.adults} 
                        <button className='counterBtn' onClick={()=>{let temp = counter.adults+1;setCounter({...counter, adults: temp})}}>+</button> 
                    </div>
                </span>
                <span className="infoStrips">
                    <p>children</p>
                    <div className="btnWrappers">
                        <button disabled={counter.childs <=0} className='counterBtn' onClick={()=>{let temp = counter.childs-1;setCounter({...counter, childs: temp})}}>-</button>
                            {counter.childs} 
                        <button className='counterBtn' onClick={()=>{let temp = counter.childs+1;setCounter({...counter, childs: temp})}}>+</button> 
                    </div>
                </span>
                <span className="infoStrips">
                    <p>rooms</p>
                    <div className="btnWrappers">
                        <button disabled={counter.rooms <=1} className='counterBtn' onClick={()=>{let temp = counter.rooms-1;setCounter({...counter, rooms: temp})}}>-</button>
                            {counter.rooms} 
                        <button className='counterBtn' onClick={()=>{let temp = counter.rooms+1;setCounter({...counter, rooms: temp})}}>+</button> 
                    </div>
                </span>
            </div>
            }
        </div>
    
        <div className="sideSearchItem"> 
            <input className="sideSearchInput" placeholder='Min Price' name='min' onChange={(e)=>{
                setMinPrice(e.target.value)
            }}/>
            -
            <input className="sideSearchInput" placeholder='Max Price' name='max'  onChange={(e)=>{
                setMaxPrice(e.target.value)
            }}/>           
        </div>
        
        
        
      </div>
    </div>
  )
}

export default SideBarSearch
