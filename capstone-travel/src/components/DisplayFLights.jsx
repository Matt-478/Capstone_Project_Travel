import { useState, useRef, useEffect } from 'react'
import './Styles/Collapsible.css'
import {useSelector, useDispatch} from 'react-redux'

const DisplayFLights = ({ id, departureCode, departureTerminal, departureTime, arrivalCode, arrivalTerminal, arrivalTime, duration, carrierCode, aircraftCode, priceCurrency, priceTotal, priceBase, priceFees, fareOption, cabin, weightOfIncludedCHeckedBags}) => {
  const[isOpen, setIsOpen] = useState(false)
  const [newDate, setNewDate] = useState()
  const [newTime, setNewTime] = useState()
  const [buyBtnIsOpen, setBuyBtnIsOpen] = useState(false)
  const [submit, setSubmit] = useState(false)
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

  const handleBuy = () => {
    setBuyBtnIsOpen(!buyBtnIsOpen)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmit(!submit)
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
            {/* <div>{newDate}</div> */}
            <div>{newTime}</div>
            <div>{departureCode}</div>
            <div>terminal: {departureTerminal}</div>
          </div>

         <div className="flight-duration-flex">
         <div>{newDate}</div>
          <div>{duration}</div>
          <span className="flight-line"></span>
         </div>

          <div className="flight-to">         
            {/* <div>{newDate}</div>           */}
            <div>{newTime}</div>          
            <div>{arrivalCode}</div>
            <div>terminal: {arrivalTerminal}</div>          
          </div>
          <div className="buy-btn" onClick={handleBuy}>
            BUY
          </div>


         {buyBtnIsOpen ? (
            <div className="buy-btn-modal">
              <h2>Ready to go?</h2>
              <p>Your email is the only thing keeping you and that ticket away from each other. Let's make this happen!</p>

              <form onSubmit={(e) => handleSubmit(e)}>
                <input type="text" placeholder="myEmail@gmail.com" id="email-input"/>
                {submit ? 
                  <input type="submit" disabled/> : 
                  <input type="submit" />
                }
              </form>

              {submit ? 
              <p style={{
                marginTop: "30px",
                fontWeight: "800",
              }}>Your journey just begun!</p>
              : null}

              <span onClick={handleBuy}>X</span>
            </div>
         ): null}
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




















