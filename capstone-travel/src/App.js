import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import TravelOffers from './components/TravelOffers'
import HomePage from './components/HomePage'

function App() {


  return (
    <div className="App">
      <Router>
        
        <Route path="/home" exact component={HomePage} />
        <Route path="/flight" exact component={TravelOffers}/>
      </Router>
    </div>
  );
}

export default App;