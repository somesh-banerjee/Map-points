import { useEffect, useState } from 'react';
import Map,{ Marker,Popup } from 'react-map-gl';
import { Star,Room } from '@material-ui/icons';
import './app.css';
import axios from 'axios';
//import { format } from 'timeago.js';

function App() {

  const [pins,setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [viewState, setViewState] =   useState({
    latitude: 22.572645,
    longitude: 88.363892,
    zoom: 8
  });

  useEffect(()=>{
    const getPins = async() =>{
      try {
        const res = await axios.get("/pins");
        setPins(res.data);
      } catch (err) {
        console.log(err)
      }
    }
    getPins();
  },[])

  const handleMarkerClick = (id,lat,long) =>{
    console.log("clicked")
    setCurrentPlaceId(id);
  }

  return (
    <div className="App">
      <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      style={{width: "100vw", height: "100vh"}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
    >
      {
        pins.map(p=>(
          <div key={p._id}>
          <Marker
            longitude={p.long}
            latitude={p.lat}
            color="red">
              <Room
                style={{
                  fontSize: 7 * viewState.zoom,
                  // color:
                  //   currentUsername === p.username ? "tomato" : "slateblue",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}    
              />
          </Marker>
          {p._id === currentPlaceId && (
              <Popup
                longitude={p.long}
                latitude={p.lat}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
                anchor="left">
                <div className='card'>
                  <label>Place</label>
                  <h4 className='place'>{p.title}</h4>
                  <label>Review</label>
                  <p>{p.desc}</p>
                  <label>Rating</label>
                  <div className='stars'>
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                  </div>
                  <label>Information</label>
                  <span className='username'>Created by {p.username}</span>
                  <span className='date'>{/*format(p.createdAt)*/}</span>

                </div>
              </Popup>
            )
          }
          </div>
        ))
      }
      
    </Map>
    </div>
  );
}

export default App;
