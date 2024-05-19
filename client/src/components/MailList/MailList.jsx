import React from 'react'
import './mailList.css'

const MailList = () => {
  return (
    <div className='mailList'>
      <h2 className='mailprimaryHeader'>Save time, save money!</h2>
      <h4 className='mailsecondaryHeader'>Sign up and we'll send the best deals to you</h4>
      <div className="mailWrapper">
        <input type="text" placeholder='Your email address'/>
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default MailList
