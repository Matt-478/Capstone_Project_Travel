import { useState, useEffect } from 'react'

function PexelsPhotos ( {query} ) {
  const [pexelsPhotos, setPexelsPhotos] = useState([])

  useEffect(() => {
    fetchPexelsData() 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  async function fetchPexelsData () {
    try {
      const response = await fetch("https://api.pexels.com/v1/search?query=" + query, {
        "method":"GET",
        "headers": {          
        "Authorization": "563492ad6f91700001000001d99276bcb4d4402fbf7f8f502c81c2ba"}
      })
      const {photos} = await response.json()

      setPexelsPhotos(photos)
      console.log(pexelsPhotos)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <p>It works</p>
      {
        <div className="flex-layout"> 
        { 
          // pexelsPhotos.map((data, boop = data.id) => <img src={data.src.medium} alt="generic pic" key={boop} className="grid-item"/>)
          // pexelsPhotos.map((data, boop = data.id) => { <p key={boop}>{data.photographer}</p> })
        }
        </div>
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