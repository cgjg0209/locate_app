import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Results from './components/Results';
import Form from './components/Form';
import Title from './components/Title';
import axios from 'axios';


const ErrorText = () => (
  <p className="App-error-text">geolocation IS NOT available</p>
);

function App() {
  const [isAvailable, setAvailable] = useState(false);
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const [city, setCity] = useState("東京都");
  const [results, setResults] = useState({
    date: "",
    name_jp: "",
    npatients: "",
    mpatients: ""
  })
  
  // Used to determine if "useEffect" is already used
  const isFirstRef = useRef(true);

  useEffect(() => {
    isFirstRef.current = false;
    if ('geolocation' in navigator) {
      setAvailable(true);
    }
  }, [isAvailable]);

  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setPosition({ latitude, longitude });
      
    });
    getPoint();
  };

  // Show this(Loading...) until "useEffect" is completed
  if (isFirstRef.current) return <div className="App">Loading...</div>;

  const getPoint = (e) => {
    // e.preventDefault();
    axios.get(`http://geoapi.heartrails.com/api/json?method=searchByGeoLocation&y=${Math.round(position.latitude*10)/10}&x=${Math.round(position.longitude*10)/10}`)
    .then(res => {
      console.log(res.data);
      setCity(res.data.response.location[0].prefecture)})
  }
  const getCovid = (e) => {
    e.preventDefault();
    axios.get(`/api/Covid19JapanAll?dataName=${city}`, { headers: {
      "Access-Control-Allow-Origin": "*"
      },
      params: {crossDomain: true}
      })
      .then(res => {setResults({
        date: res.data.itemList[0].date,
        name_jp: res.data.itemList[0].name_jp,
        npatients: res.data.itemList[0].npatients,
        mpatients: res.data.itemList[1].npatients
      })})
  }

  return (
    <div className="App">
      <Title />
      <h2>Geolocation API Sample</h2>
      {!isFirstRef && !isAvailable && <ErrorText />}
      {isAvailable && (
        <div>
          <Form getCurrentPosition={getCurrentPosition} getPoint={getPoint} getCovid={getCovid} city={city} />
          
          <div>
            <h3>Position</h3>
            <Results position={position} results={results} />
          </div>

        </div>
      )}
    </div>
  );
}

export default App;
