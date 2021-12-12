import { useState, useEffect } from 'react'
import VideoCard from './VideoCard'

function PexelsVideos ( {query} ) {
  const [pexelsVideos, setPexelsVideos] = useState(["nothing yet",])
  // const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // let arrayOfVideos = await fetchPexelsVideos
    // displayVideos(arrayOfVideos)
    // displayVideos would ...?
    // fetchPexelsVideos() 
    // query.length <=  3  ? setIsLoading(!isLoading) : setIsLoading(isLoading)
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
      let data = await response.json()
      setPexelsVideos(data.videos)
      console.log("trying to make this work from under component")

      // return data.videos

      console.log(data.videos)
      console.log(pexelsVideos)
    } catch (error) {
      console.log(error)
    }
  }
  

  return (
    <>
      {
        //  pexelsVideos.map((data, id = data.id) => {
          // <VideoCard src={data.video_files} key={id}/>
        // })
        console.log("just loaded pexels videos")

        // pexelsVideos ?
        //   pexelsVideos.map((item) => {
        //     <p>{item.id}</p>
        //   })
        // : console.log("something not happening in render of Pexels Videos ",pexelsVideos)
      }

        <li></li> {/* do not remove, neccesary for layout */}
    </>
  )
}

export default PexelsVideos