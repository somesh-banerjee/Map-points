import { useEffect, useState } from 'react';
import Map,{ Marker,Popup } from 'react-map-gl';
import { Star,Room } from '@material-ui/icons';
import './app.css';
import axios from 'axios';
//import { format } from 'timeago.js';

function App() {

  const [pins,setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [currentUsername, setCurrentUsername] = useState("user");
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [review, setReview] = useState(null);
  const [rating, setRating] = useState(0);
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
    setCurrentPlaceId(id)
    setViewState({
      ...viewState,
      latitude: lat,
      longitude: long,
    })
  }

  const handleAddPlace = (e) =>{
    setNewPlace({
      long: e.lngLat.lng,
      lat: e.lngLat.lat,
    })
  }

  const handleSubmit = (e) =>{
    setNewPlace({
      long: e.lngLat.lng,
      lat: e.lngLat.lat,
    })
  }

  return (
    <div className="App">
      <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      style={{width: "100vw", height: "100vh"}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      onDblClick = {handleAddPlace}
      // transitionDuration="200"
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
                  color:
                    currentUsername === p.username ? "blue" : "green",
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
                    {Array(p.rating).fill(<Star />)}
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
      {newPlace && (
        <Popup
          longitude={newPlace.long}
          latitude={newPlace.lat}
          closeOnClick={false}
          onClose={() => setNewPlace(null)}
          anchor="left">
          <div>
            <form onSubmit={handleSubmit}>
              <label>Title</label>
              <input onChange={(e)=>setTitle(e.target.value)} />
              <label>Review</label>
              <textarea onChange={(e)=>setReview(e.target.value)} />
              <label>Rating</label>
              <select onChange={(e)=>setRating(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button type='submit'>Submit</button>
            </form>
          </div>
        </Popup>
      )}
    </Map>
    </div>
  );
}

export default App;
