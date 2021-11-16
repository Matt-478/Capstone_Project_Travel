

const SingleFlightOption = ( {info} ) => {
  return (
    <div className="single-flight-option">

      {/* origin */}
      <div className="solo-flight-box">
        <p>FROM:</p>
        <h3>{info.origin}</h3>
      </div>

      {/* destination */}
      <div className="solo-flight-box">
        <p>TO:</p>
        <h3>{info.destination}</h3>
      </div>

      {/* price */}
      <div className="solo-flight-box">
        <p>PRICE:</p>
        <h3>{info.price.total}</h3>
      </div>
    </div>
  )
}

export default SingleFlightOption