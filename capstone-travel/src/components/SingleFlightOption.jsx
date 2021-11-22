

const SingleFlightOption = ( {info} ) => {
  return (
    <div className="single-flight-option">

      <p key={info.id}>works</p>

      {/* origin */}
      <div className="solo-flight-box">
        <p>FROM:</p>
        {
        //  info.itineraries.segments.map((info) => 
        //   <h3>{info.arrival.at}</h3>) 
          // console.log(info)
        }
      </div>

      /* destination */
    //   <div className="solo-flight-box">
    //     <p>TO:</p>
    //   </div>

    //   {/* price */}
    //   <div className="solo-flight-box">
    //     <p>PRICE:</p>
    //   </div> 
    // </div>
  )
}

export default SingleFlightOption