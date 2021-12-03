import { useState, useEffect } from 'react'
import DisplayFLights from './DisplayFLights'

import SingleFlightOption from './SingleFlightOption'


const TravelOffers = ({ query, history }) => {

  // const[IATACode, setIATACode] = useState([])


  const[isLoading, setIsLoading] = useState(false)
  const[error, setError] = useState(false)
  const[selectedOptions, setSelectedOptions] = useState({
    destinationLocationCode: "LON",
    departureDate: "2021-12-14",
    returnDate: "0",
    adults: "1",
    kids: "0",
    travelClass: "ECONOMY",
    nonStop: "true",
    maxPrice: "250",
    max: "30",
  })
  const[flightInfo, setFlightInfo] = useState([])
  const[selectedData, setSelectedData] = useState([])
  const[token, setToken] = useState("")

  // for updating the token
  useEffect(() => {
    newTokenRequest()
    let timer = setInterval(function() {
      newTokenRequest()
  }, 600000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    cityCode(query)
    // console.log(query)
  },[query, token])

  useEffect(() => {
    fetchFlights(
      selectedOptions.destinationLocationCode,
      selectedOptions.adults,
      selectedOptions.travelClass,
      selectedOptions.nonStop,
      )
  },[selectedOptions])

  useEffect(() => {
    extractedData(flightInfo)
  },[flightInfo])

  // if value === null/0 = skip value(?)

  async function cityCode(query = "LON") {
    try{
    if(query && query.length > 2) {
    const response = await fetch("https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=" + query + "&view=LIGHT&page%5Boffset%5D=0&page%5Blimit%5D=10", {
      headers: {
          'Authorization': 'Bearer ' + token
        }
      })
    const { data } = await response.json()
    // console.log('!!!', data)
    const firstItem = await data[0].iataCode
    setSelectedOptions({
      ...selectedOptions,
      destinationLocationCode: firstItem
    })}
    } catch(err) {
      console.log(err)
    }

    // why can't I set the state to be the first array element?
    // setIATACode(data[0].iataCode)

  //  after each reload I need to remove all the values from the array
  }

  const fetchFlights = async(location="LON", adults = 1, travelClass = "economy", nonStop) => {
    try{
      const response = await fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=PAR&destinationLocationCode=${location}&departureDate=2021-12-14&adults=${adults}&travelClass=${travelClass}&nonStop=${nonStop}&max=15`, {
        headers: {
            'Authorization': 'Bearer ' + token
          }
        });
      const data = await response.json()
      setFlightInfo(data)
      // console.log("here's the data")
      // console.log(data )

      if(!response.ok) {
        setError(true)
      } else {
        setIsLoading(true)
      }

    } catch(err) {
      console.log(err.message)
    }

      // console.log("flight info")
      // console.log(flightInfo)
  }

  const extractedData = async(arr) => {
    try {
      let extrudedData = arr.data.map((element) => ({
        id: element.itineraries[0].segments.map((seg) => (
          seg.id
        )),
        departureCode: element.itineraries[0].segments.map((segm) => (
          segm.departure.iataCode
        )),
        departureTerminal: element.itineraries[0].segments.map((segm) => (
          segm.departure.terminal
        )),
        departureTime: element.itineraries[0].segments.map((segm) => (
          segm.departure.at
        )),
        arrivalCode:  element.itineraries[0].segments.map((segm) => (
          segm.arrival.iataCode
        )),
        arrivalTerminal:  element.itineraries[0].segments.map((segm) => (
          segm.arrival.terminal
        )),
        arrivalTime:  element.itineraries[0].segments.map((segm) => (
          segm.arrival.at
         )),

        carrierCode: element.itineraries[0].segments.map((itin) => (
            itin.carrierCode
        )),
        aircraftCode: element.itineraries[0].segments.map((itin) => (
          itin.aircraft.code
        )),
        priceCurrency: element.price.currency,
        priceTotal: element.price.total,
        priceBase: element.price.base,
        priceFees: element.price.fees.map((fee) => (
          fee.amount + " " + fee.type + " "
        )),
        fareOption: element.travelerPricings[0].fareOption,
        cabin: element.travelerPricings[0].fareDetailsBySegment[0].cabin,
        weightOfIncludedCHeckedBags: element.travelerPricings[0].fareDetailsBySegment.map((arr) => (
          arr.includedCheckedBags.weight + "   " + arr.includedCheckedBags.weightUnit
        )),
        // weightUnit: element.travelerPricings[0].fareDetailsBySegment.map((i) => (
          // i.includedCheckedBags.weightUnit
          // props will have includedCheckedBags.weightUnit once we give it the parameters for it
          // since now we're working on their link. We're not using our custom
        // )),
      }))

      if(extrudedData)  {
        setSelectedData(extrudedData)
      } else {
        console.log("no data in the new arr")
      }
      
    } catch (error) {
      console.log(error.message)
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
  .then(data => {
    console.log(data.access_token)
    setToken(data.access_token)
  })
  }

  return(
    <>
    <div className="p-page">
    <div className="inline-flex">
        <div className="wrapper" >
          <form className="inline-b">
           <div className="searchBar" >
            <input id="searchQueryInput" type="text" name="searchQueryInput" placeholder="FROM:" />
           </div>
          </form>

          <form className="inline-b" style={{paddingRight: "15px"}}>
           <div className="searchBar" >
            <input id="searchQueryInput" type="text" name="searchQueryInput" placeholder="TO:" />
           </div>
          </form>
        </div>
    </div>
    <div className="options-input-box">
      <p>Non-Stop: </p>
      <form>
        <div className="human-amount">
          <div className="d-inline-flex">
            <p>Adults(12+):</p>
            <input type="number" min="12"/>
          </div>

          <div className="d-inline-flex">
            <p>Kids(2 - 11): </p>
            <input type="number" min="2" max="11" />
          </div>

          <div className="d-inline-flex">
            <p>Infants(under 2): </p>
            <input type="number" max="2" min="0.1" step="0.1"/>
          </div>
        </div>

        <div className="display-inline-flex">
          <p>Travel Class: </p>
          <select >
            <option>

            </option>
          </select>
        </div>
      </form>
    </div>


    { isLoading ?
      selectedData.length > 1 && selectedData.map((array) => (
        <DisplayFLights
          departureCode={array.departureCode}
          departureTerminal={array.departureTerminal}
          departureTime={array.departureTime}
          arrivalCode={array.arrivalCode}
          arrivalTerminal={array.arrivalTerminal}
          arrivalTime={array.arrivalTime}
          carrierCode={array.carrierCode}
          aircraftCode={array.aircraftCode}
          priceCurrency={array.priceCurrency}
          priceTotal={array.priceTotal}
          priceBase={array.priceBase}
          priceFees={array.priceFees}
          fareOption={array.fareOption}
          cabin={array.cabin}
          weightOfIncludedCHeckedBags={array.weightOfIncludedCHeckedBags}
          key={array.id}
           />
      )) :  <div className="loader">Loading...</div>
    }

      {/* ERROR HANDLING {
      { error && (
        // "error"
        history.push('/404')
        ) } */
      }
    </div>
    </>
  )
}

export default TravelOffers

// AMADEUS
//  bearer   Qib3QfOzZG1a6g8r8zX0Kx9XhtA8XBS6
//  secret   BzObmAeMp1ClNDtn

// id Qib3QfOzZG1a6g8r8zX0Kx9XhtA8XBS6

// return the token right into the token thing

// INPUTS
// departureDate    YYYY-MM-DD    string
// returnDate   YYYY-MM-DD    string
// adults(12+)    1-100     integer
// kids           1-100     integer
// travelClass     economy, premium economy, business or first class     string
// nonStop      true/false      boolean
// maxPrice       1-100000        integer
// max 1-10000  integer     for me