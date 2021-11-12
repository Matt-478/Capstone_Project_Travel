import { useState, useEffect } from 'react'
import VideoCard from './VideoCard'

function PexelsVideos ( {query} ) {
  const [pexelsVideos, setPexelsVideos] = useState(["nothing yet", ])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchPexelsVideos() 
    query.length <=  3  ? setIsLoading(!isLoading) : setIsLoading(isLoading)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  async function fetchPexelsVideos () {
    try {
      const response = await fetch("https://api.pexels.com/videos/search?query=" + query + "&per_page=1&per_page=5", {
         // &size=large
        "method":"GET",
        "headers": {          
        "Authorization": "563492ad6f91700001000001d99276bcb4d4402fbf7f8f502c81c2ba"}
      })
      const data = await response.json()
      setPexelsVideos(data.videos)

      console.log(data.videos)
      console.log(pexelsVideos)

    } catch (error) {
      console.log(error)
    }
  }
  

  return (
    <>
      {
        isLoading ?
         pexelsVideos.map((data, boop = data.id) => <VideoCard src={data.video_files.map((data) => data.link)} key={boop}/>)
        : <p>not much to see here for now</p>
      }

        <li></li> {/* do not remove, neccesary for layout */}
    </>
  )
}

export default PexelsVideos