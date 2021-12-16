import PexelsPhotos from './PexelsPhotos'
import PexelsVideos from './PexelsVideos';
import SnapMap from './SnapMap'

import { useState, useEffect } from 'react';

const HomePage = ({history}) => {

  const[cityInfo, setCityInfo] = useState([])
  const[query, setQuery] = useState("")
  const[realState, setRealState] = useState("")

  useEffect(()=>{
    if(query.length >= 4) {
      setRealState(query)
    }
  },[query])

  useEffect(() => {
    fetchWikipediaCitySummary(realState)
    urlFunction(realState)
  },[realState])

  const urlFunction = (realState) => {
    const _myURL = new URL(window.location.href)
    console.log(_myURL)
    
    // access url
    // set it's parameter to be the query
    // pass it down with the history.push
    // extract it from params in the 'flight' page
  }


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
    // console.log(query)
  }

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setRealState(query)
  }

  const handleBookTrip = () => {
    history.push({
      pathname: '/flight',
      // search: '?cityQuery=' + realState.toLowerCase()
    })
  }

  return (
    <>

    <div className="App">
      <div className="header-bg">
        <div className="head-line">
          <h2>"Fuck it, let's go somewhere"</h2>
        </div>

          <div className="p-page">
            <div className="wrapper" >
              <form onSubmit={handleSubmit}>
              <div className="searchBar" >
                <input id="searchQueryInput" type="text" name="searchQueryInput" placeholder="It all starts with a simple query..." value={query} onChange={handleChange}/>
                <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
                  <svg  viewBox="0 0 24 24">
                  <path fill="#666666" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                  </svg>
                </button>
              </div>
              </form>
            </div>
          </div>
      </div>


      {/* 
      A backpack away from adventures - let's roll! 
      More than a search bar, I'm your guide to new experineces
      */}


      <div className="header-bg-dark">
       <div className="p-page">


      <div className="travel-options-box-container" style={{display: realState.length >4 ? "none" : ""}}>
          <div className="travel-options-box relative"><h2>London</h2></div>
          <div className="travel-options-box relative"><h2>Paris</h2></div>
          <div className="travel-options-box relative"><h2>Tokyo</h2></div>
          <div className="travel-options-box relative"><h2>Berlin</h2></div>
      </div>

      <div className="left-area-top">
        {/* <h2>{query && toTitleCase(query)}</h2> */}
        <h3>{query && toTitleCase(query)}</h3>
        {/* <h4>{query && toTitleCase(query)}</h4> */}
          <div className="d-flex-space">
          <div className="left-side">
            {/* brief description */}
            <p>
              {cityInfo.extract}
            </p>
          </div>
          <div className="right-side">
            {/* map based on location */}
            {/* <SnapMap style={{width: "40%"}}/> */}
          </div>
          </div>
      </div>
      </div>
    </div>
    </div> {/* padding div */}

      <PexelsPhotos query={realState}/>
      <div className="d-flex align-center space-between change-page-btn">
        <h3 className="d-inline">Interested? What are you waiting for? ---------------------------------------------------------------------------------------------------{'>'}</h3> 
        <button className="pill-btn book-a-trip-btn" onClick={handleBookTrip}>Book a trip now!</button>
    </div>
    {/* videos based on location */}
    {/* <div>
      { realState  ? (
        <PexelsVideos query={realState}/>
      )
        : "not going further than HOMEPAGE component"
      }
    </div> */}
  </>
  )
}

export default HomePage
