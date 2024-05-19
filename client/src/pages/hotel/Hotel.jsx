import React from 'react'
import HotelPage from '../../components/HotelPage/HotelPage'
import Navbar from '../../components/Navbar/Navbar'
import HeaderList from '../../components/HeaderList/HeaderList'
import MailList from '../../components/MailList/MailList'
import Footer from '../../components/Footer/Footer'

const Hotel = () => {
  return (
    <div>
      <Navbar></Navbar>
      <HeaderList></HeaderList>
      <HotelPage></HotelPage>
      <MailList></MailList>
      <Footer></Footer>
    </div>
  )
}

export default Hotel
