import { useState, useRef } from 'react'
import './Styles/Collapsible.css'

const DisplayFLights = ({ from, to, price }) => {
  const[isOpen, setIsOpen] = useState(false)
  const parentRef = useRef()

  return (
    <>
    {/* all the info is passed as a prop
    styling will be in this component, but
    the actual info should be in the parent component */}
    <div className="collapsible">
      <button className="toggle" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex-align-center p-10-20">
          <h2>FROM: {from}</h2>
          <h2>TO: {to}</h2>
          <h2>PRICE: {price}</h2>
        </div>
      </button>
      <div 
        className="content-parent" 
        ref={parentRef} 
        style={ isOpen ? {
          height: parentRef.current.scrollHeight + "px",
        } : {
          height: "0px",
        }}
        >

        <div className="content">
          {/* {props.children} */}
          <p>FROM: </p>
          <p>TO: </p>


        </div>
      </div>
    </div>
    </>
  )
}

export default DisplayFLights
