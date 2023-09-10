import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
    const centerPosition = [70, -80]; // 지도의 중심 위치. 필요에 따라 조정하세요.

    return (
        <MapContainer center={centerPosition} zoom={4} style={{ width: '100%', height: '600px' }}>
            <TileLayer
                url="http://localhost:8389/tiles/{z}/{x}/{y}.png"
                attribution="&copy; 검은사막 지도"
            />
        </MapContainer>
    );
}

export default MapComponent;
