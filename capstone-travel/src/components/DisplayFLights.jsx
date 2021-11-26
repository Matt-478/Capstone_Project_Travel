import { useState } from 'react'

const DisplayFLights = () => {

  const [showResults, setShowResults] = useState(false)

  function handleClick(){
    setShowResults(!showResults)
  }
  return (
    <>
    "does it even work?"
    <div> 

    <div className="solo-ticket">
      <a href="#nav"><div>FROM: PRG       TO: GLA</div></a>
      { showResults ? (
        <div class="expandable" id="nav" onClick={handleClick}>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio ad recusandae natus atque voluptates ut eveniet necessitatibus neque repudiandae  consequatur doloremque adipisci, reprehenderit asperiores enim tempore. Est nesciunt architecto sequi.
          Eius, doloribus ratione accusamus doloremque architecto ad laudantium dicta numquam quia iusto voluptatem tempore, a ullam, quam laborum blanditiis harum itaque unde officiis. Reiciendis debitis, ipsa omnis quo tempore nihil?
          Odit odio architecto optio numquam perferendis molestiae vero debitis, libero adipisci nihil sunt! Animi ducimus minima illum, officia architecto minus   suscipit possimus natus doloribus accusamus quae cupiditate neque quos sequi?</p>
        </div>
      ) : null }
    </div>

      <div className="solo-ticket">
        <a href="#nav2"><span>FROM: LON       TO: PAR</span></a>
        { showResults ? (
        <div class="expandable" id="nav" onClick={handleClick}>
            <p>Cum enim magna parturient</p>
        </div>
      ) : null }
      </div>
    </div> 
    </>
  )
}

export default DisplayFLights
