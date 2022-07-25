import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Results from './components/Results';
// import Form from './components/Form';
import Title from './components/Title';
import axios from 'axios';
import SecButton from './components/SecButton';


const ErrorText = () => (
  <p className="App-error-text">geolocation IS NOT available</p>
);

function App() {
  const [isAvailable, setAvailable] = useState(false);
  const [results, setResults] = useState({
    date0: "",
    date1: "",
    date2: "",
    date_w: "",
    name_jp: "",
    patients: null,
    patient0: null,
    patient1: null,
    patient2: null,
    patient3: null
  })
  
  
  // Used to determine if "useEffect" is already used
  const isFirstRef = useRef(true);

  useEffect(() => {
    isFirstRef.current = false;
    if ('geolocation' in navigator) {
      setAvailable(true);
    }
    const getData = async() => {
      let data = {
        city: "東京都",
        pos: {
          latitude: 0,
          longitude: 0
        },
      }
    const getCurrentPosition = async() => {
      let positions = await new Promise((resolve,reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const { latitude, longitude } = positions.coords;
      data.pos.latitude = latitude;
      data.pos.longitude = longitude;
    };
    await getCurrentPosition();

    await axios.get(`https://geoapi.heartrails.com/api/json?method=searchByGeoLocation&x=${Math.round(data.pos.longitude*10)/10}&y=${Math.round(data.pos.latitude*10)/10}`)
    .then(res => {
      data.city = res.data.response.location[0].prefecture});

    await axios.get(`/api/Covid19JapanAll?dataName=${data.city}`, { headers: {
        "Access-Control-Allow-Origin": "*"
        },
        params: {crossDomain: true}
        })
        .then(res => {setResults({
          date0: res.data.itemList[0].date,
          date1: res.data.itemList[1].date,
          date2: res.data.itemList[2].date,
          date_w: res.data.itemList[7].date,
          name_jp: res.data.itemList[0].name_jp,
          patients: res.data.itemList[0].npatients - res.data.itemList[1].npatients,
          patients_w: res.data.itemList[7].npatients - res.data.itemList[8].npatients,
          patient0: res.data.itemList[0].npatients,
          patient1: res.data.itemList[1].npatients,
          patient2: res.data.itemList[2].npatients,
          patient3: res.data.itemList[3].npatients
        })})
    }
    getData();
  }, [isAvailable]);

  

  // Show this(Loading...) until "useEffect" is completed
  if (isFirstRef.current) return <div className="App">Loading...</div>;

  

  return (
    <div className="bg-gradient-to-r from-teal-200 to-blue-300 h-screen text-gray-800">
      <div className='container mx-auto'>
        <Title />
        {/* <h2>Geolocation API Sample</h2> */}
        {!isFirstRef && !isAvailable && <ErrorText />}
        {isAvailable && (
          <div>
          {/* <Form getCurrentPosition={getCurrentPosition} getPoint={getPoint} getCovid={getCovid} city={city} /> */}
          
            <div>
              {/* <h3>Position</h3> */}
              <Results results={results} />
            
            </div>

          </div>
        )}
        <SecButton />

      </div>
      
    </div>
  );
}

export default App;
