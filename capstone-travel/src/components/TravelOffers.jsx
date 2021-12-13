import { useState, useEffect } from 'react'
import DisplayFLights from './DisplayFLights'


const TravelOffers = ({ history }) => {


  const[isLoading, setIsLoading] = useState(false)
  const[error, setError] = useState(false)
  const[selectedOptions, setSelectedOptions] = useState({
    destinationLocationCode: "",
    departureDate: "2021-12-14",
    returnDate: "0",
    adults: "1",
    kids: "0",
    travelClass: "ECONOMY",
    nonStop: "true",
    maxPrice: "250",
    max: "30",
  })
  const[selectedData, setSelectedData] = useState([])
  // const[flightInfo, setFlightInfo] = useState([])
  // const[cityQuery, setCityQuery] = useState("")


  useEffect(() => {
    getData()
  },[])

  const getData = async () => {
    let ci = urlFunction() // getting the query string parameter
    console.log("!!!!", ci)
    let t = await newTokenRequest() // we're getting a token and not saving it anymore in the state, but just in a local variable because this is sync
    // console.log('!!!', t)
    let iataCi = await cityCode(t, ci)
    let flightInfoToExtract = await fetchFlights(
      t,
      iataCi,
      selectedOptions.adults,
      selectedOptions.travelClass,
      selectedOptions.nonStop,
      )
      console.log('bam here: ',flightInfoToExtract)
    await extractedData(flightInfoToExtract)
    // setSelectedData(extrudedAllTheWays)
  } 

  const urlFunction = () => {
    // access url
    const urlQueryString = window.location.search;

    // extract query from params in the 'flight' page
    const urlParams = new URLSearchParams(urlQueryString);
    const city = urlParams.get('cityQuery')
    return city
    // setCityQuery(city)
  }

  // if value === null/0 = skip value(?)

  const newTokenRequest = async() => {
    try {
      const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials&client_id=Qib3QfOzZG1a6g8r8zX0Kx9XhtA8XBS6&client_secret=BzObmAeMp1ClNDtn',
    })
      const data = await response.json()
      let tokenToSet = await data
      return tokenToSet.access_token
    }catch (error) {
      console.log(error)
      return ''
    }
  }

  async function cityCode(token, query) {
    try{
      if(query.length > 2) {
      const response = await fetch("https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=" + query + "&sort=analytics.travelers.score&view=LIGHT&page%5Boffset%5D=0&page%5Blimit%5D=10", {
        headers: {
            'Authorization': 'Bearer ' + token,
          }
        })
      const { data }  = await response.json()
      console.log('!!!', data)
      const firstItem = await data[0].iataCode
      console.log(firstItem)
      let iataCity = firstItem
      return iataCity
      // setSelectedOptions({
      //   ...selectedOptions,
      //   destinationLocationCode: "" + firstItem + ""
      // })
      } else {
      console.log("oops")
      }
      }catch(err) {
        console.log(err)
      }

    // why can't I set the state to be the first array element?
    // setIATACode(data[0].iataCode)

  //  after each reload I need to remove all the values from the array
  }

  const fetchFlights = async(token = '', location = "LON", adults = 1, travelClass = "economy", nonStop) => {
    try{
      const response = await fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=PAR&destinationLocationCode=${location}&departureDate=2021-12-14&adults=${adults}&travelClass=${travelClass}&nonStop=${nonStop}&max=15`, {
        headers: {
            'Authorization': 'Bearer ' + token
          }
        });
      const data = await response.json()
        console.log("here's the data", data)
      // return data
      // setFlightInfo(data)
      // console.log("here's the data")
      // console.log(data)

      if(!response.ok) {
        setError(true)
      } else {
        setIsLoading(true)
      }
      return data

    } catch(err) {
      console.log(err.message)
    }
  }

  const extractedData = (arr) => {
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

        carrierCode: element.itineraries[0].segments.map((segm) => (
          segm.carrierCode
        )),
        aircraftCode: element.itineraries[0].segments.map((segm) => (
          segm.aircraft.code
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
        ))
        // weightUnit: element.travelerPricings[0].fareDetailsBySegment.map((i) => (
          // i.includedCheckedBags.weightUnit
          // props will have includedCheckedBags.weightUnit once we give it the parameters for it
          // since now we're working on their link. We're not using our custom
        // )),
      }
      ))

      console.log("extruded", extrudedData)
      // setSelectedData(extrudedData)
      // return extrudedData

      if(extrudedData)  {
        setSelectedData(extrudedData)
        console.log("selected data should be set =>   ", selectedData)
      } else {
        console.log("no data in the new arr")
      }
      
    } catch (error) {
      console.log(error.message)
    }
  }

  return(
    <>
    <div className="header-bg-dark" style={{height: "auto"}}>
      <div className="p-page">
        {
          isLoading ?
            selectedData ? (
              "yuh, it's",
              // GIVES BACK ALL OF THE FUNCTION I JUST NEED THE OBJEXT -DEAL W THAT 
              selectedData.map((array) => (
                // <p>yuh</p>
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
            ))
          ) : "nah, bruh"
        : "still, none"
        }
      </div>
  </div>

      {/* ERROR HANDLING {
      { error && (
        // "error"
        history.push('/404')
        ) } */
      }
    {/* </div> */}
    {/* </div> */}
    </>
  )
}

export default TravelOffers

// INPUTS FOR MORE SPECIFIC RESULTS

{/* <div className="inline-flex">
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
      </form> */}

      {/* CLASS OPTIONS V1 */}
        {/* <div className="display-inline-flex">
          <p>Travel Class: </p>
          <select >
            <option>Economy</option>
            <option>Premium Economy</option>
            <option>Business</option>
            <option>First</option>
          </select>
        </div> */}

      {/* CLASS OPTIONS V2 */}
      {/* <div className="display-inline-flex">
        <p>Travel Class</p>
      </form>
    </div> */}







// id Qib3QfOzZG1a6g8r8zX0Kx9XhtA8XBS6

// INPUTS
// departureDate    YYYY-MM-DD    string
// returnDate   YYYY-MM-DD    string
// adults(12+)    1-100     integer
// kids           1-100     integer
// travelClass     economy, premium economy, business or first class     string
// nonStop      true/false      boolean
// maxPrice       1-100000        integer
// max 1-10000  integer     for me