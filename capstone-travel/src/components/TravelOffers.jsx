import { useState, useEffect } from 'react'


const TravelOffers = ({ realState }) => {

  const[flightInfo, setFlightInfo] = useState([])

  useEffect(() => {
    fetchFlights(realState)
  },[realState])

  
  const fetchFlights = async(query) => {
    const response = await fetch('https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=PAR&maxPrice=200', {
      headers: {
          'Authorization': 'Bearer FRWl20u61KT9sivvzfk4j7jv5v4Y'
        }
      });
    const data = await response.json()
    setFlightInfo(data)
    console.log(flightInfo)

    // checking if the city typed is the same as in the query
    // console.log(query)
  }


  return(
    <>
      <p>Here we'll display all of our info about flights to cool and great places</p>
    </>
  )
}

export default TravelOffers

// AMADEUS
//  bearer   Qib3QfOzZG1a6g8r8zX0Kx9XhtA8XBS6
//  secret   BzObmAeMp1ClNDtn

// id Qib3QfOzZG1a6g8r8zX0Kx9XhtA8XBS6
// token FRWl20u61KT9sivvzfk4j7jv5v4Y
