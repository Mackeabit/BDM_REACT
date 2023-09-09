import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';

function App() {
    return (
        <div className="App">
            <MapContainer center={[72.5, -80]} zoom={3} style={{ width: '100vw', height: '100vh' }}>
                <TileLayer
                    url="http://localhost:8389/tiles/{z}/{x}/{y}.png"
                    maxZoom={6}
                    minZoom={3}
                    noWrap={true}
                />
            </MapContainer>
        </div>
    );
}

export default App;
