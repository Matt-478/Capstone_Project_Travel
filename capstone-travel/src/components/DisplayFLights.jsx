import { useState } from 'react'

const DisplayFLights = (props) => {
  // let arr = [1,2,3,4,5]

  const[isOpen, setIsOpen] = useState(false)

  return (
    <>
    {/* "does it even work?" */}

    <div className="collapsible">
      <button onClick={() => setIsOpen(!isOpen)}>
        {props.label}
      </button>
      {isOpen && <div className="content"> Some content here </div>}
    </div>
    </>
  )
}

export default DisplayFLights
