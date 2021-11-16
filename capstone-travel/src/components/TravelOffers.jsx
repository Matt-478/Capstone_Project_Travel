import { useState, useEffect } from 'react'

import SingleFlightOption from './SingleFlightOption'


const TravelOffers = ({ realState }) => {

  const[flightInfo, setFlightInfo] = useState([])

  let token

  useEffect(() => {
    fetchFlights(realState)
    // newTokenRequest()
    console.log(flightInfo.data)
  },[realState])
  
  // eventually add query back
  const fetchFlights = async() => {
    const response = await fetch('https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=MAD&oneWay=false&nonStop=false', {
      headers: {
          'Authorization': 'Bearer Rorvfr9kJG9XTtMybvDC4VWJWAY9'
        }
      });
    const data = await response.json()
    setFlightInfo(data)
    console.log(flightInfo)
  }
  // OG link https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=PAR&maxPrice=200

  function newTokenRequest () {
    fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=Qib3QfOzZG1a6g8r8zX0Kx9XhtA8XBS6&client_secret=BzObmAeMp1ClNDtn'
  })
  .then(response => response.json())
  .then(data => console.log(data.access_token))
  }

  return(
    <>
      <p>Here we'll display all of our info about flights to cool and great places</p>
      {/* <SingleFlightOption info={flightInfo}/> */}
    {
      // console.log(flightInfo.data)
      flightInfo.data.map((d) => (
         <SingleFlightOption info={d} />
        // <p>works</p>
      ))
    }
    {/* key could be index of arr */}
    </>
  )
}

export default TravelOffers

// AMADEUS
//  bearer   Qib3QfOzZG1a6g8r8zX0Kx9XhtA8XBS6
//  secret   BzObmAeMp1ClNDtn

// id Qib3QfOzZG1a6g8r8zX0Kx9XhtA8XBS6
// token As589KUv5n42o2DYBneJzdQdafmZ - valid for 30 mins



// return the token right into the token thing
