import { useState, useEffect } from 'react'

function PexelsPhotos () {
  const [pexelsPhotos, setPexelsPhotos] = useState([])

  useEffect(() => {
    fetchPexelsData() 
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchPexelsData () {
    try {
      const response = await fetch("https://api.pexels.com/v1/search?query=tigers", {
        "method":"GET",
        "headers": {          
        "Authorization": "563492ad6f91700001000001d99276bcb4d4402fbf7f8f502c81c2ba"}
      })
      const {photos} = await response.json()

      setPexelsPhotos(photos)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <p>It works</p>
      {
        <>
        { 
          pexelsPhotos.map((data, boop = data.id) => <img src={data.src.tiny} alt="generic pic" key={boop}/>)
        }
        </>
      }

    </>
  )
}

export default PexelsPhotos




// import React from "react";
  
// class PexelsPhotos extends React.Component {

//   state = {
//     pexelsPhotos: null,
//   }

//   render() {
//     return(
//       <p>It works</p>
//     )
//   }
// }

// export default PexelsPhotos