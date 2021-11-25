import { useState, useEffect } from 'react'

const SingleFlightOption = ( {info} ) => {

  // const[flightInfo, setFlightInfo] = useState([])
  // const[data, setData] = useState([])
  // const[dictionaries ,setDictionaries] = useState([])

    // set state to be the flight
    // setFlightInfo(data.itineraries)
    // console.log(flightInfo)


    // does it work when the page refreshes for this component or for the parent?
    // useEffect(() => (
    //   setAllFlightInfo()
    // ), [])

    function setAllFlightInfo () {
      // info.map((item) => (
      //     setData(item.data),
      //     setDictionaries(item.dictionaries),
      //     console.log(data, dictionaries)
      // ))
    }

  return (
    <div>

      {/* origin */}
      <div className="solo-flight-box" key={info.id}>

        {
        // FROM; TO;
        // info.itineraries.map((i) => (
        //   i.segments.map((j) => (
        //     <div className="flight-demo" key={j.id}>
        //       <p>FROM: {j.arrival.iataCode}</p>
        //       <p>TO: {j.departure.iataCode}</p>
        //     </div>
        //     ))
        //   ))
        }


      {/* <p>PRICE: {data.price.total}</p> */}
      </div>
    </div>
  )
}

export default SingleFlightOption






// ALL THE FLIGHT INFO IN: (loop over)
// itineraries elements.segments
// itineraries[i].segments


// DEFAULT SET-UP
      {/* origin */}
      {/* <div className="solo-flight-box">
        <p>FROM: </p>
      </div> */}

      {/* destination */}
      {/* <div className="solo-flight-box">
        <p>TO:</p>
      </div> */}

      {/* price */}
      {/* <div className="solo-flight-box">
        <p>PRICE: {data.price.total}{data.price.currency}</p>
      </div> 

      <div className="solo-flight-box">
        <p>Company: </p>
      </div>  */}