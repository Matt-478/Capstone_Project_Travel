import { useState, useEffect } from 'react'
import VideoCard from './VideoCard'

function PexelsVideos ( {query} ) {
  const [pexelsVideos, setPexelsVideos] = useState([])

  useEffect(() => {
    fetchPexelsVideos() 
    console.log(query)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  async function fetchPexelsVideos () {
    try {
      const response = await fetch("https://api.pexels.com/videos/search?query=" + query + "&size=small&per_page=5", {
        "method":"GET",
        "headers": {          
        "Authorization": "563492ad6f91700001000001d99276bcb4d4402fbf7f8f502c81c2ba"}
      })
      const {videos} = await response.json()

      setPexelsVideos(videos)
      console.log(pexelsVideos)
    } catch (error) {
      console.log(error)
    }
  }

  

  return (
    <>
        <div className="image-display"> 
        {/* how to randomise all the img's and videos? */}
          <ul>
              { 
                pexelsVideos && pexelsVideos.map((data, boop = data.id) => (
                  <VideoCard src={data.video_files} key={boop}/>
                  // <p>o</p>
                ))
              }
            <li></li> {/* do not remove, neccesary for layout */}
          </ul>
        </div>
    </>
  )
}

export default PexelsVideos