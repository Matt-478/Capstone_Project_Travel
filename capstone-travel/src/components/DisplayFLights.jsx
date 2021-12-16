import { useState, useRef, useEffect } from 'react'
import './Styles/Collapsible.css'

const DisplayFLights = ({ id, departureCode, departureTerminal, departureTime, arrivalCode, arrivalTerminal, arrivalTime, duration, carrierCode, aircraftCode, priceCurrency, priceTotal, priceBase, priceFees, fareOption, cabin, weightOfIncludedCHeckedBags}) => {
  const[isOpen, setIsOpen] = useState(false)
  const [newDate, setNewDate] = useState()
  const [newTime, setNewTime] = useState()
  const parentRef = useRef()

  useEffect(() => {
    convertTime(departureTime)
  }, [departureTime])

  const convertTime = (time) => {
    let preConvertTime = new Date(time)

    let convertedTime = preConvertTime.toDateString()
    let convertedTimeTwo = preConvertTime.getHours().toString()
    let convertedTimeThree = preConvertTime.getMinutes().toString()
    let GMTTime = preConvertTime.getTimezoneOffset()
    console.log(preConvertTime.toUTCString(), preConvertTime.toTimeString)
    // let convertedTime = preConvertTime.getDay().toString()

    console.log("Converted: ", convertedTime, ", ", convertedTimeTwo, ".", convertedTimeThree + GMTTime)
    let combinedNewDate = convertedTime
    let combinedNewTime = convertedTimeTwo + "." + convertedTimeThree
    setNewDate(combinedNewDate) 
    setNewTime(combinedNewTime)
  }

  return (
    <>
    {/* all the info is passed as a prop
    styling will be in this component, but
    the actual info should be in the parent component */}

    <div className="collapsible">
      <button
       className="toggle" 
       onClick={() => setIsOpen(!isOpen)}
       style={ isOpen ?{
         borderRadius: "20px",
         padding: "10px 20px"
        } : {
         borderRadius: "20px",
         padding: "10px 20px"
        }}
      >

        <div className="flex-align-center">
          <h2>FROM: {departureCode}</h2>
          <h2>TO: {arrivalCode}</h2>
          <h2>PRICE: {priceTotal}{priceCurrency}</h2> 
        </div>
      </button>
      <div 
        className="content-parent" 
        ref={parentRef} 
        style={ isOpen ? {
          height: parentRef.current.scrollHeight + "px" ,
          borderRadius: "20px",
          marginTop: "10px"
        } : {
          height: "0px",
          borderRadius: "20px",
          marginTop: "10px"
         }} 
         > 

        <div className="content"> 
        {/* {props.children} */}
          <div className="flight-from">
            <div>{newDate}</div>
            <div>{departureTime}</div>
            <div>{departureCode} (actual airport name)</div>
            <div>terminal: {departureTerminal}</div>
          </div>
          <div>{duration}</div>
          <div className="flight-to">         
            <div>{arrivalTime}</div>          
            <div>{arrivalCode}</div>
            <div>terminal: {arrivalTerminal}</div>          
          </div>
          {/* <div>{carrierCode}</div>
          <div>aircraftCode: {aircraftCode}</div>
          <div>priceCurrency: {priceCurrency}</div>
          <div>priceTotal: {priceTotal}</div> */}
          {/* <div>priceBase: {priceBase}</div>
          <div>priceFees: {priceFees}</div> */}
          {/* <div>fareOption: {fareOption}</div>
          <div>cabin: {cabin}</div>
          <div>weightInfo: {weightOfIncludedCHeckedBags}</div>  */}
        </div>
      </div>
    </div> 


    </>
  )
}
export default DisplayFLights



    {/* <details> */}
      {/* <summary className="flight-box"> */}
        {/* here goes the main block of info */}
        {/* <div className="flex-align-center">
          <h2>FROM: {departureCode}</h2>
          <h2>TO: {arrivalCode}</h2>
          <h2>PRICE: {priceTotal}</h2> 
        </div>
      </summary>
      <div className="details-content">
        <div>from: {departureCode}</div>
        <div>terminal: {departureTerminal}</div>
        <div>leaving at: {departureTime}</div>
        <div>to: {arrivalCode}</div>
        <div>terminal: {arrivalTerminal}</div>          
        <div>arriving at: {arrivalTime}</div>          
        <div>carrierCode: {carrierCode}</div>
        <div>aircraftCode: {aircraftCode}</div>
        <div>priceCurrency: {priceCurrency}</div>
        <div>priceTotal: {priceTotal}</div>
        <div>priceBase: {priceBase}</div>
        <div>priceFees: {priceFees}</div>
        <div>fareOption: {fareOption}</div>
        <div>cabin: {cabin}</div>
        <div>weightInfo: {weightOfIncludedCHeckedBags}</div> 
      </div>
    </details> */}




















