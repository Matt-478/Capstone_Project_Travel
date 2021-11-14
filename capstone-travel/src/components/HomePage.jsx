import PexelsPhotos from './PexelsPhotos'
import PexelsVideos from './PexelsVideos';
import SnapMap from './SnapMap'

import { useState, useEffect } from 'react';

const HomePage = ( {realState, query} ) => {


  // initial input value
  // const[query, setQuery] = useState("")

  // value we use for fetches
  // const[realState, setRealState] = useState("")

  // storing wikipedia fetch results
  const[cityInfo, setCityInfo] = useState([])

  
  useEffect(() => {
    fetchWikipediaCitySummary(realState)
  },[realState])

  // const handleChange = (e) => {
  //   setQuery(e.target.value)
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   setRealState(query)
  // }

  function toTitleCase (str) {
    let text = str
    text = text.toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
    return text
  }

  async function fetchWikipediaCitySummary(query) {
    const response = await fetch("https://en.wikipedia.org/api/rest_v1/page/summary/" + query + "?redirect=false")
    const data = await response.json()
    setCityInfo(data)
    console.log(cityInfo)

    // checking if the city typed is the same as in the query
    console.log(query)
  }

  return (
    <>
    <div className="left-area-top">

    {/* area name */}
    <h1>{query && toTitleCase(query)}</h1>

    <div className="d-flex-space">
      <div className="left-side">

        {/* brief description */}
        <p>
          {cityInfo.extract}
        </p>

      </div>
      <div className="right-side">
        {/* map based on location */}
        {/* <SnapMap /> */}
      </div>
    </div>

    </div>

    {/* photos here (based on the search bar query) */}
    {/* <UnsplashPhotos /> */}
    <PexelsPhotos query={realState}/>

    {/* videos based on location */}
    {/* <PexelsVideos query={realState}/> */}

    <div className="d-flex align-center space-between">
      <h3 className="d-inline">Interested? What are you waiting for?</h3>
      {/* book a trip */}
      <button className="pill-btn book-a-trip-btn">Book a trip now!</button>
    </div>
  </>
  )
}

export default HomePage
