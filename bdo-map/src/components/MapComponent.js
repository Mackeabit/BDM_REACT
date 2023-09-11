import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
    const centerPosition = [70, -80];
    const maxBounds = [
        [-90, -180], // 왼쪽 하단 좌표
        [190, 180]  // 오른쪽 상단 좌표
    ];

    return (
        <MapContainer 
            center={centerPosition} 
            zoom={2} 
            minZoom={2} 
            maxZoom={6} 
            maxBounds={maxBounds} 
            worldCopyJump={false}
            bounceAtZoomLimits={false}
            style={{ width: '100vw', height: '100vh' }}
        >
            <TileLayer
                url="http://localhost:8389/tiles/{z}/{x}/{y}.png"
                attribution="&copy; 검은사막 지도"
                noWrap={true}
            />
        </MapContainer>
    );
}

export default MapComponent;
