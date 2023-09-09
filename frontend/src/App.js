import Map from 'react-map-gl';

function App() {
  const mapboxAccessToken = process.env.REACT_APP_MAPBOX
  return (
    <div className="App">
      <Map
        mapboxAccessToken={mapboxAccessToken}
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14
        }}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      />
    </div>
  );
}

export default App;
