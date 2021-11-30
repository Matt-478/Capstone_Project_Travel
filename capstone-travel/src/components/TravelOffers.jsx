import { useState, useEffect } from 'react'
import DisplayFLights from './DisplayFLights'

import SingleFlightOption from './SingleFlightOption'


const TravelOffers = ({ query, history }) => {

  const[IATACode, setIATACode] = useState([])
  const[flightInfo, setFlightInfo] = useState([])
  const[isLoading, setIsLoading] = useState(false)
  const[error, setError] = useState(false)

  const [selectedData, setSelectedData] = useState([])

  let fakeArr = [{
    title: 1,
    from: "LON",
    to: "DUB"
  },
  {
    title: 2,
    from: "ORG",
    to: "NYX"
  }, 
  {
    title: 3,
    from: "GAT",
    to: "POR"
  }]


  const[data, setData] = useState([])
  const[dictionaries ,setDictionaries] = useState([])

  let token = 'M2I56bIXKs33G6zjdHlG1VwK2082'

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
        departure: element.itineraries[0].segments.map((itin) => (
            itin.departure
        )),
        arrival:  element.itineraries[0].segments.map((itin) => (
            itin.arrival
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
        priceFees: element.price.fees,
        fareOption: element.travelerPricings[0].fareOption,
        fareDetailsBySegment: element.travelerPricings[0].fareDetailsBySegment,
        cabin: element.travelerPricings[0].fareDetailsBySegment[0].cabin,
        weight: element.travelerPricings[0].fareDetailsBySegment.map((i) => (
          i.includedCheckedBags
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

      {/* ERROR HANDLING {
      { error && (
        // "error"
        history.push('/404')
        ) } */
      }

        {isLoading ? flightInfo.data.map((item) => (
          // <SingleFlightOption info={item} key={item.id}/>
          ""
        )) :  <div className="loader">Loading...</div>
        }


        {/* V1 OF DISPLAYING FLIGHTS */}
        {/* {isLoading ? <DisplayFLights info={flightInfo.data}/> : "nope"} */}


        {
          selectedData && selectedData.map((thing) => (
            <DisplayFLights from={thing.departure.map((item) => item.iataCode)} to={thing.arrival.map((i) => i.iataCode)} price={thing.priceTotal} />
          ))
        }
        {/* USE THIS AFTER I GET DATA BACK & (add the actual data)*/}
        {/* {fakeArr.map((thing) => (
          <DisplayFLights label={thing.title} from={thing.from} to={thing.to} />
        ))} */}
    </>
  )
}

export default TravelOffers

// AMADEUS
//  bearer   Qib3QfOzZG1a6g8r8zX0Kx9XhtA8XBS6
//  secret   BzObmAeMp1ClNDtn

// id Qib3QfOzZG1a6g8r8zX0Kx9XhtA8XBS6

// return the token right into the token thing



        // let selectedData = theWholeArray.map((element) => ({
        //   departure: element.itineraries[0].segments[0].departure,
        //   arrival: element.itineraries[0].segments[0].arrival,
        //   carrierCode: element.itineraries[0].segments[0].carrierCode,
        //   aircraftCode: element.itineraries[0].segments[0].aircraft.code,
        //   priceCurrency: element.price.currency,
        //   priceTotal: element.price.total,
        //   priceBase: element.price.base,
        //   priceFees: element.price.fees,
        //   fareOption: element.travelerPricings[0].fareOption,
        //   fareDetailsBySegment: element.travelerPricings[0].fareDetailsBySegment,
        //   cabin: element.travelerPricings[0].fareDetailsBySegment[0].cabin,
        //   weight:
        //     element.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags
        //       .weight,
        //   weightUnit:
        //     element.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags
        //       .weightUnit,
        // }))
        