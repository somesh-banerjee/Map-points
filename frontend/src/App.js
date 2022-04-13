import { useState } from 'react';
import Map,{ Marker } from 'react-map-gl';

function App() {
  const [viewState, setViewState] = useState({
    latitude: 22.572645,
    longitude: 88.363892,
    zoom: 8
  });
  return (
    <div className="App">
      <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      style={{width: 800, height: 600}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
    >
    </Map>
    </div>
  );
}

export default App;
