import React,{useContext, useState} from 'react'
import { useLocation } from 'react-router-dom'
import HeaderList from '../../components/HeaderList/HeaderList'
import Navbar from '../../components/Navbar/Navbar'
import SearchListItems from '../../components/SearchListItems/SearchListItems'
import SideBarSearch from '../../components/SideBarSearch/SideBarSearch'
import Footer from '../../components/Footer/Footer'
import MailList from '../../components/MailList/MailList'
import useFetch from '../../hooks/useFetch'

import './list.css'
import { SearchContext } from '../../contexts/SearchContext'

const List = () => {
    
    const [minPrice, setMinPrice] = useState(1)
    const [maxPrice, setMaxPrice] = useState(1500)
    const {city:destination} = useContext(SearchContext)
    const {data, error, isLoading, reFetch} = useFetch(`http://localhost:5000/api/v1/hotels?city=${destination}&min=${minPrice}&max=${maxPrice}`)
    
  return (
    <div>
      <Navbar></Navbar>
      <HeaderList></HeaderList>
      <div className="searchContainer">
        <SideBarSearch setMinPrice={setMinPrice} setMaxPrice={setMaxPrice}
        />

        <div className="listResults">
          {
            data && data.map((item)=>(
              <SearchListItems key={item._id} item={item} />
            ))
          }
          
        </div>
      </div>
      <MailList></MailList>
      <Footer></Footer>
    </div>
  )
}

export default List
