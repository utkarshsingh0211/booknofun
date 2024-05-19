import { faBed, faCalendarDays, faPerson } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React,{useContext, useReducer, useState} from 'react'
import './headerSearch.css'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns'
import { Link, useNavigate } from 'react-router-dom'
import { SearchContext } from '../../contexts/SearchContext'


const HeaderSearch = () => {
    const [selectDest, setSelectDest] = useState('')
    const [openDate, setOpenDate] = useState(false)
    const [openCounter, setOpenCounter] = useState(false)
    const [counter, setCounter] = useState({
        adults: 2,
        childs: 1,
        rooms: 1
    })
    const getTommorow = ()=>{
        const tod = new Date()
        const tom = new Date()
        tom.setDate(tod.getDate()+1)
        return tom
    }
    const [date, setDate] = useState([
        {
          startDate: new Date(),
          endDate: getTommorow(),
          key: 'selection'
        }
      ]); 
    const navigate = useNavigate()
    const {dispatch} = useContext(SearchContext)
    const handleSearch = ()=>{
        dispatch({
            type: 'NEW_SEARCH',
            payload: {
                city:selectDest,
                date: date,
                counter: counter
            }
        })
        navigate('/list')
    }
  return (
    <div className="headerSearch">
                <div className="headerSearchItem">
                    <FontAwesomeIcon icon={faBed} className='headerIcon'></FontAwesomeIcon>
                    <input type="text" placeholder='Where are u going ?' className='headerSearchInput' onChange={(e)=>setSelectDest(e.target.value)}/>
                </div>
                <div className="headerSearchItem pos-rel">
                    <FontAwesomeIcon icon={faCalendarDays} className='headerIcon' onClick={()=>{setOpenDate(!openDate);setOpenCounter(false)}}></FontAwesomeIcon>
                    <span className="headerSearchText">{`${format(date[0].startDate,'dd/MM/yyyy')} - ${format(date[0].endDate,'dd/MM/yyyy')}`}</span>
                    {openDate && <DateRange
                        editableDateInputs={true}
                        onChange={item => setDate([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={date}
                        className='pos-abs z-index-2'
                        />}
                </div>
                <div className="headerSearchItem pos-rel">
                    <FontAwesomeIcon icon={faPerson} className='headerIcon' onClick={()=>{setOpenCounter(!openCounter);setOpenDate(false)}}></FontAwesomeIcon>
                    <span className="headerSearchText">{counter.adults} adults | {counter.childs} child | {counter.rooms} room</span>
                    {openCounter && 
                    <div className="headerSearchRoomStatus pos-abs z-index-2">
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
                <div className="headerSearchItem">
                    <div className="headerSearchBtn" onClick={handleSearch}>
                            Search
                        </div>
                </div>
            </div>
  )
}

export default HeaderSearch
