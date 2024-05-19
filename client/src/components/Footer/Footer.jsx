import React from 'react'
import { Link } from 'react-router-dom'
import {  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './footer.css'
import { faFacebook, faGoogle, faInstagram, faPinterest, faTwitter } from '@fortawesome/free-brands-svg-icons'
const Footer = () => {
  return (
    <div className='footer'>
        <div className="footerHero">
            <span>Get connected with us on social networks:</span>
            <div className="footerIcons">
                <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faPinterest}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>

            </div>
        </div>
      <div className="primaryFooter">
        <div className="fCol1 cols">
            <h2>Area of Servies</h2>
            <Link>Countries</Link>
            <Link>Regions</Link>
            <Link>Cities</Link>
            <Link>Airports</Link>
            <Link>Hotels</Link>
            <Link>Place of Interest</Link>
        </div>
        <div className="fCol2 cols">
            <h2>Range of Services</h2>
            <Link>Home</Link>
            <Link>Appartment</Link>
            <Link>Hostel</Link>
            <Link>Villas</Link>
            <Link>Resorts</Link>
            <Link>BnBs</Link>
            <Link>Guest Houses</Link>
        </div>
        <div className="fCol3 cols">
            <h2>Extra Services</h2>
            <Link>Car Rental</Link>
            <Link>Flight Finder</Link>
            <Link>Restaurant Reservations</Link>
            <Link>Booking.com for travel agents</Link>
        </div>
      </div>
      <div className="secondaryFooter">
      © 2022 Copyright: <b>BookScape.com</b>
      </div>
    </div>
  )
}

export default Footer
