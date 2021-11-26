import { useState, useEffect } from 'react'

const SingleFlightOption = ( {info} ) => {

  // const[flightInfo, setFlightInfo] = useState([])
  // const[data, setData] = useState([])
  // const[dictionaries ,setDictionaries] = useState([])

    // set state to be the flight
    // setFlightInfo(data.itineraries)
    // console.log(flightInfo)


    // does it work when the page refreshes for this component or for the parent?
    // useEffect(() => (
    //   setAllFlightInfo()
    // ), [])

    function setAllFlightInfo () {
      // info.map((item) => (
      //     setData(item.data),
      //     setDictionaries(item.dictionaries),
      //     console.log(data, dictionaries)
      // ))
    }

  return (
    <>
    <div class="custom-big-seperate">

        {/* {
           info.itineraries.map((i) => (
            <div className="seperate" >
                {
                  i.segments.map((j) => (
                    <div className="flight-demo" >
                      <p>FROM: {j.arrival.iataCode}</p>
                      <p>TO: {j.departure.iataCode}</p>
                      
                      {/* OPT #1 */}
                      {/* <div id="content"> 
                        <a href="#nav"><span>Click Here</span></a>
                        <div className="expandable" id="nav">
                          <p>Cum enim magna parturient</p>
                        </div>
                      </div> */}



                      {/* OPT #2  - USE THIS ONE*/}
                      {/* <div>
                        <input type="checkbox" name="toggle" id="toggle" />
                        <label for="toggle"></label>
                          <div className="container"></div>
                        <div className="message"><h1> hello, I'm a hidden message. You found it.</h1>                                               
                        </div>
                      </div> */}

{/* 
                    </div>
                  ))
                }
              </div>
            ))
        } */}
      </div>

{/* 
    <div id="content"> 
      <a href="#nav"><span>Click Here</span></a>
      <div className="expandable" id="nav">
        <p>Cum enim magna parturient</p>
      </div>
      <a href="#nav2"><span>Click Here</span></a>
      <div className="expandable" id="nav2">
        <p>Cum enim magna parturient</p>
      </div>
    </div>  */}
  </>
    // </div>
  )
}

export default SingleFlightOption






// ALL THE FLIGHT INFO IN: (loop over)
// itineraries elements.segments
// itineraries[i].segments


// DEFAULT SET-UP
      {/* origin */}
      {/* <div className="solo-flight-box">
        <p>FROM: </p>
      </div> */}

      {/* destination */}
      {/* <div className="solo-flight-box">
        <p>TO:</p>
      </div> */}

      {/* price */}
      {/* <div className="solo-flight-box">
        <p>PRICE: {data.price.total}{data.price.currency}</p>
      </div> 

      <div className="solo-flight-box">
        <p>Company: </p>
      </div>  */}



      {
        //  FROM; TO;
        // info.data.map((i) => (
        //    i.segments.map((j) => (
        //      <div className="flight-demo" key={j.id}>
        //        <p>FROM: {j.arrival.iataCode}</p>
        //        <p>TO: {j.departure.iataCode}</p>
        //      </div>
        //      ))
        //    ))
        }


             {/* {info.map((item) => (

      ))} */}

      {/* origin */}
      {/* <div className="solo-flight-box" key={info.id}>
      </div> */}
      

      {/* <p>PRICE: {data.price.total}</p> */}



              {/* {
          info.itineraries.map((itin) => (
            <div className="left-align">
              {
              itin.map((segm) => (
                <>
                  <p>FROM: {segm.arrival.iataCode}</p>
                  <p>TO: {segm.departure.iataCode} </p>
                </>
              ))
              }
            </div>
          ))
        } */}