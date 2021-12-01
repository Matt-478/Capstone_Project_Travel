import { useState, useEffect } from 'react'
import DisplayFLights from './DisplayFLights'

import SingleFlightOption from './SingleFlightOption'


const TravelOffers = ({ query, history }) => {

  const[IATACode, setIATACode] = useState([])
  const[flightInfo, setFlightInfo] = useState([])
  const[isLoading, setIsLoading] = useState(false)
  const[error, setError] = useState(false)

  const [selectedData, setSelectedData] = useState([])
  const[data, setData] = useState([])
  const[dictionaries ,setDictionaries] = useState([])

  let token = 'SaP0iCiiiqmAPB8inXIOTMmAeBRH'

  // on Query change, I call new IATA code
  useEffect(() => {
    cityCode(query)
    console.log(query)

    // newTokenRequest() 
  },[query])

  useEffect(() => {
    fetchFlights(IATACode)
  },[IATACode])

  useEffect(() => {
    extractedData(flightInfo)
  },[flightInfo])



  const fetchFlights = async(IATACode) => {
    try{
      const response = await fetch('https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=PAR&destinationLocationCode=LON&departureDate=2021-12-14&adults=1&max=15', {
        headers: {
            'Authorization': 'Bearer ' + token
          }
        });
      const data = await response.json()
      setFlightInfo(data)

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
        console.log("the new arr")
        console.log(extrudedData)
        setSelectedData(extrudedData)
      } else {
        console.log("no data in the new arr")
      }
      
    } catch (error) {
      console.log( error.message)
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

    {isLoading ? flightInfo.data.map((item) => (
        ""
      )) :  <div className="loader">Loading...</div>
    }

    {
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
           />
      ))
    }

      {/* ERROR HANDLING {
      { error && (
        // "error"
        history.push('/404')
        ) } */
      }

        {/* V1 OF DISPLAYING FLIGHTS */}
        {/* {isLoading ? <DisplayFLights info={flightInfo.data}/> : "nope"} */}
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