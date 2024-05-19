import React from 'react'
import './header.css'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import HeaderList from '../HeaderList/HeaderList'
import HeaderSearch from '../HeaderSearch/HeaderSearch'

const Header = () => {
  return (
    <div className='container'>
    <HeaderList/>  
    <div className="headerText">
    <h1 className='headerTitle'> A lifetime of discounts! Genius ?..</h1>
    <p className='headerDescription'>
    Get rewarded for your travels – unlock instant savings of 10% or
    more with a free Shopix account.
    Venture the world with us and be our guest , earn experience and points to travel more and more around the globe !!!
    </p>
    </div>
    <HeaderSearch/>
    </div>
      
  )
}

export default Header
