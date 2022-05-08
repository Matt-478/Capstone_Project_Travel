import React from 'react'
import { useState } from 'react'

function ExtraInfo() {
  const [buyBtnIsOpen, setBuyBtnIsOpen] = useState(true)

  const handleBuy = () => {
    setBuyBtnIsOpen(!buyBtnIsOpen)
  }


  return (
    buyBtnIsOpen ?
    <div className="buy-btn-modal extra-info-module">
      <h3>Hey There!</h3>
      Before you keep exploring this application you should know that for this mock application our default location is Paris and currently is unable to be changed and I'm still working on some visual changes for some parts. If you're interested to find out more about the devloper or have a suggestion there are links in the footer. Enjoy!
      <span onClick={handleBuy}>X</span>
    </div>
    : null
  )
}

export default ExtraInfo