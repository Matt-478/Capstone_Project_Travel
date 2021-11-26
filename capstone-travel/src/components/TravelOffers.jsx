import { useState, useEffect } from 'react'

import SingleFlightOption from './SingleFlightOption'


const TravelOffers = ({ query, history }) => {

  const[IATACode, setIATACode] = useState([])
  const[flightInfo, setFlightInfo] = useState([])
  const[isLoading, setIsLoading] = useState(false)
  const[error, setError] = useState(false)


  const[data, setData] = useState([])
  const[dictionaries ,setDictionaries] = useState([])

  let token = 'ML4R9bDKCp3Baav6F7AzEwhLEfMR'

  // on Query change, I call new IATA code
  useEffect(() => {
    cityCode(query)
    console.log(query)

    // newTokenRequest()
  },[query])

// on a IATA code change I call fetchFlights
  useEffect(() => {
    fetchFlights(IATACode)
  },[IATACode])
  

  const fetchFlights = async(IATACode) => {
    try{
      const response = await fetch('https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=PAR&destinationLocationCode=LON&departureDate=2021-11-28&adults=1&max=15', {
        headers: {
            'Authorization': 'Bearer ' + token
          }
        });
      const data = await response.json()
      setFlightInfo(data)
      // also doesn't work
      // data.map((info) => (
      //   setDictionaries(info.dictionaries),
      //   setData(info.data)
      // ))


      if(!response.ok) {
        setError(true)
      } else {
        setIsLoading(true)
      }

      console.log("returned data")
      console.log(data)

      console.log("flight info")
      console.log(flightInfo)

    } catch(err) {
      console.log(err.message)
    }
  }

  function newTokenRequest () {
    fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=Qib3QfOzZG1a6g8r8zX0Kx9XhtA8XBS6&client_secret=BzObmAeMp1ClNDtn'
  })
  .then(response => response.json())
  .then(data => console.log(data.access_token))
  }

  async function cityCode(query) {
    try{
      if(query.length > 2) {
      const response = await fetch("https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=" + query + "&view=LIGHT&page%5Boffset%5D=0&page%5Blimit%5D=10", {
        headers: {
            'Authorization': 'Bearer ' + token
          }
        })
      const { data } = await response.json()
      const firstItem = await data[0].iataCode
      setIATACode(firstItem)

      // console.log("city code data: " + data)
      // console.log("firstItem: " + firstItem)
      // console.log("IATACode: " + IATACode)
      }
    } catch(err) {
      console.log(err)
    }

    // why can't I set the state to be the first array element?
    // setIATACode(data[0].iataCode)

  //  after each reload I need to remove all the values from the array
  }

  return(
    <>
      <p>Here we'll display all of our info about flights to cool and great places</p>
      {/* {
      { error && (
        // "error"
        history.push('/404')
        ) } */
      }

        {isLoading ? flightInfo.data.map((item) => (
          <SingleFlightOption info={item} key={item.id}/>
        )) :  <div className="loader">Loading...</div>
        }
    </>
  )
}

export default TravelOffers

// AMADEUS
//  bearer   Qib3QfOzZG1a6g8r8zX0Kx9XhtA8XBS6
//  secret   BzObmAeMp1ClNDtn

// id Qib3QfOzZG1a6g8r8zX0Kx9XhtA8XBS6

// return the token right into the token thing





{/* SETTING THESE AS STATES DIDN'T WORK
        {isLoading ? flightInfo.data.map((item) => (
          setData(item)
        )) : "setting data failed"
        }

        {isLoading ? flightInfo.dictionaries.map((item) => (
          setDictionaries(item)
        )) : "setting dictionaries failed"
        } */}