import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { addPhotos, addVid } from './actions';
import ImageCard from './ImageCard';
import VideoCard from './VideoCard';

const HomePage = ({history}) => {

  const dispatch = useDispatch()

  const[cityInfo, setCityInfo] = useState([])
  const[query, setQuery] = useState("")
  const[realState, setRealState] = useState("")
  const [mediaArray, setMediaArray] = useState([])

  const photos = useSelector(state => state.photos.list)
  const videos = useSelector(state => state.videos.list)

  useEffect(() => {
    let bigArray = [...photos, ...videos]
    console.log("big", bigArray)

    const shuffleArray = (arr) => {
      for (let i = arr.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          let temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
      }
  }  
    shuffleArray(bigArray)
    console.log("big big ", shuffleArray)
    // setMediaArray(shuffleArray)
    setMediaArray(bigArray)
  }, [photos, videos])

  useEffect(()=>{
    if(query.length >= 4) {
      setRealState(query)
    }
  },[query])

  useEffect(() => {
    if(realState.length > 0) {
      fetchWikipediaCitySummary(realState)
      urlFunction(realState)
      fetchPexelsData()
      fetchPexelsVideos()
    }
  },[realState])

  async function fetchPexelsData () {
    try {
      const response = await fetch("https://api.pexels.com/v1/search?query=" + query + "&per_page=30", {
        // &size=large
        "method":"GET",
        "headers": {          
        "Authorization": "563492ad6f91700001000001d99276bcb4d4402fbf7f8f502c81c2ba"}
      })
      const {photos} = await response.json()
      console.log('!!photos', photos)
      if (photos) {
        dispatch(addPhotos(photos))
      } else {
        console.log("no - photos")
      }
      // setPexelsPhotos(photos)
      // console.log(pexelsPhotos)

      // push these results up to Homepage array or push these to an array and then use it in homepage
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchPexelsVideos () {
    try {
      const response = await fetch("https://api.pexels.com/videos/search?query=" + query + "&per_page=15", {
         // &size=large
        "method":"GET",
        "headers": {          
        "Authorization": "563492ad6f91700001000001d99276bcb4d4402fbf7f8f502c81c2ba"}
      })
      const {videos} = await response.json()
      console.log('!!videos', videos)
      if (videos) {
        dispatch(addVid(videos))
      } else {
        console.log("no")
      }
      // setPexelsVideos(data.videos) 
      // return data.videos
    } catch (error) {
      console.log(error)
    }
  }

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
    // setRealState(query)
  }

  const handleBookTrip = () => {
    history.push({
      pathname: '/flight',
      search: '?cityQuery=' + realState.toLowerCase()
    })
  }

  const handleTravelCity = (city) => {
    fetchPexelsData(city)
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
          <div className="travel-options-box relative" onClick={handleTravelCity("Dublin")}><h2>Dublin</h2></div>
          <div className="travel-options-box relative"><h2>Paris</h2></div>
          <div className="travel-options-box relative"><h2>Tokyo</h2></div>
          <div className="travel-options-box relative"><h2>Berlin</h2></div>
      </div>

      <div className="left-area-top">
        <h3>{query && toTitleCase(query)}</h3>
          <div className="d-flex-space">
          <div className="left-side">
            <p>
              {cityInfo.extract}
            </p>
          </div>
          <div className="right-side">
          </div>
          </div>
      </div>
      </div>
    </div>
    </div> {/* padding div */}


    <div className="image-display"> 
          <ul style={{paddingBottom: query.length >= 4 ? "39px" : "none"}}>
              {
                mediaArray && mediaArray.map(picOrVideo => picOrVideo.alt ? (
                  <ImageCard
                    src={picOrVideo.src.medium}
                    key={picOrVideo.id}
                    query={query}
                  />
                ):(
                  <VideoCard
                    id={picOrVideo.id}
                    src={picOrVideo.video_files[0].link}
                    query={query}
                  />
                ))
              }
          </ul>
        </div>
      <div className="d-flex align-center space-between change-page-btn">
        <h3 className="d-inline">Interested? What are you waiting for?</h3> 
        <button className="pill-btn book-a-trip-btn" onClick={handleBookTrip}>Book a trip now!</button>
      </div>
    <div>
    </div>
  </>
  )
}

export default HomePage
