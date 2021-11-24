import { useState } from 'react'

const SingleFlightOption = ( {data} ) => {

  const[flightInfo, setFlightInfo] = useState([])

    // set state to be the flight
    // setFlightInfo(data.itineraries)
    // console.log(flightInfo)

  {/* {
    itineraries.map((item) => (
      item.segments.map((flight) => (
        flight.
    ))
    ))
  } */}
  return (
    <div className="flight-demo" key={data.id}>

      {/* origin */}
      <div className="solo-flight-box">
        <p>FROM: {
        // data.itineraries.map((i) => (
          // i.segments.map((j) => (
          //   j.arrival.iataCode
          // ))
        // ))
        }</p>
      </div>

      {/* destination */}
      <div className="solo-flight-box">
        <p>TO:</p>
      </div>

      {/* price */}
      <div className="solo-flight-box">
        <p>PRICE: {data.price.total}{data.price.currency}</p>
      </div> 

      <div className="solo-flight-box">
        <p>Company: </p>
      </div> 
    </div>
  )
}

// ALL THE FLIGHT INFO IN: (loop over)
// itineraries elements.segments
// itineraries[i].segments

export default SingleFlightOption