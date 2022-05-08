import './App.css';
import { useState, useEffect } from 'react';
import { HashRouter as Router, Route} from 'react-router-dom'

import TravelOffers from './components/TravelOffers'
import HomePage from './components/HomePage'
import ErrorPage from './components/ErrorPage'

function App() {
  return(
    <div className="App">
      <Router>
        <div className="navbar p-page"> 
          <h2>RapidPack*</h2>
        </div>
        {/* <Route path="/" exact render={(props) => <HomePage {...props} />} /> */}
        <Route path="/flight" exact render={(props) => <TravelOffers {...props} />} />
        <Route path="/404" exact component={<ErrorPage />} /> 
        <footer className="p-page main-footer">
          <a href="https://www.linkedin.com/in/matīss-komļevs-20343020b/" target="_blank"><p>Linkedin</p></a>
          <a href="https://github.com/Matt-478" target="_blank"><p>Github</p></a>
        </footer>
      </Router>
    </div>
  )
}

export default App;