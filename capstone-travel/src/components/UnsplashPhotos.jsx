import { useState, useEffect } from 'react'

function UnsplashPhotos () {
  const [unsplashPhotos, setUnsplashPhotos] = useState()

  useEffect(async () => {
    try {
      const response = await fetch("https://api.unsplash.com/", {
        headers: {
          authorization: "RJQgQ8ElFq3CtST4Fg2xu0ZLMLBSeUyfz-1jrNsvVP4"
        }
      })
      const unsplashData = await response.json()

      // access key RJQgQ8ElFq3CtST4Fg2xu0ZLMLBSeUyfz-1jrNsvVP4

      console.log(unsplashData)
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <>
      <p>Here we'll show all the fetched photos</p>
    </>
  )
}

export default UnsplashPhotos