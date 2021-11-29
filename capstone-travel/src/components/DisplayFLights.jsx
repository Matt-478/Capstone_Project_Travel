import { useState, useRef } from 'react'
import './Styles/Collapsible.css'

const DisplayFLights = (props) => {
  // let arr = [1,2,3,4,5]

  const[isOpen, setIsOpen] = useState(false)
  const parentRef = useRef()

  return (
    <>
    {/* "does it even work?" */}

    <div className="collapsible">
      <button className="toggle" onClick={() => setIsOpen(!isOpen)}>
        {props.label}
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
          {props.children}
        </div>
      </div>
    </div>
    </>
  )
}

export default DisplayFLights
