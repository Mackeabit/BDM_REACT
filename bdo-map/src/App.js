import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';

function App() {
    return (
        <div className="App">
            <MapContainer center={[0, 0]} zoom={11} style={{ width: '100vw', height: '100vh' }}>
                <TileLayer
                    url="http://localhost:3000/tiles/{z}/{x}/{y}.png"
                    maxZoom={22}
                />
            </MapContainer>
        </div>
    );
}

export default App;
