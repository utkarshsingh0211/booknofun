import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Header from '../../components/Header/Header'
import Featured from '../../components/Featured/Featured'
import FeaturedProperty from '../../components/FeaturedProperty/FeaturedProperty'
import './home.css'
import PropertyList from '../../components/PropertyList/PropertyList'
import MailList from '../../components/MailList/MailList'
import Footer from '../../components/Footer/Footer'
const Home = () => {
  return (
    <div className='home'>
      <Navbar></Navbar>
      <Header></Header>
      <div className="homeContainer">
        <Featured></Featured>
        <PropertyList></PropertyList>
        <FeaturedProperty></FeaturedProperty>
        <MailList></MailList>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Home
