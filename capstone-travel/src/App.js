import { useState, useEffect } from 'react';
import './App.css';



import PexelsPhotos from './components/PexelsPhotos'

function App() {

  const[query, setQuery] = useState("")
  const[cityInfo, setCityInfo] = useState([])

  useEffect(() => {
    fetchWikipediaCitySummary(query)
  },[toTitleCase(query)])

  const handleChange = (e) => {
    setQuery(e.target.value)
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
    // "https://en.wikipedia.org/api/rest_v1/page/summary/London?redirect=false"
    const data = await response.json()
    setCityInfo(data)
    console.log(cityInfo)
  }


  return (
    <div className="App">

    <div className="left-area-top">
      {/* insert search bar */}
      <div className="w-100">
        <input type="text"
          placeholder="Search for an area..."
          class="round-searchbar"
          id="searchQueryInput"
          value={query}
          onChange={handleChange} />
      </div>


      {/* insert area name */}
      <h3>{query && toTitleCase(query)}</h3>

      {/* insert brief description */}
      <p>
        {cityInfo.extract}
      </p>
    </div>




      {/* photos here (based on the search bar query) */}
      {/* <UnsplashPhotos /> */}
      <PexelsPhotos />
    </div>
  );
}

export default App;
