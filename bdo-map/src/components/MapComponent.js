import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, useMapEvent } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import npcIcon from '../assets/icons/npc/npc_icon.png';

const icon = new L.Icon({
  iconUrl: npcIcon,
  iconSize: [32, 32],
});

const MapComponent = ({ cursorStyle }) => {
  const centerPosition = [70, -80];
  const maxBounds = [
    [-90, -180],
    [190, 180]
  ];

  const [npcs, setNpcs] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const mapRoot = document.querySelector(".leaflet-container");
    if (mapRoot) {
      mapRoot.style.cursor = cursorStyle;
    }
  }, [cursorStyle]);

  const fetchNpcs = async () => {
    try {
      const response = await axios.get('http://localhost:8389/api/npcs');
      setNpcs(response.data);
    } catch (error) {
      console.error("No NPCs found:", error);
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await axios.get('http://localhost:8389/api/locations');
      setLocations(response.data);
    } catch (error) {
      console.error("No Locations found:", error);
    }
  };

  const MapClickHandler = () => {
    useMapEvent('click', (e) => {
      const { lat, lng } = e.latlng;
      alert(`클릭한 위치의 좌표: (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
    });
    return null; // 컴포넌트가 실제로 렌더링 되지 않게 null 반환
  };

  return (
    <div style={{ position: 'relative', zIndex: 10 }}>
      <button onClick={fetchNpcs}>
        Show NPCs
      </button>
      <button onClick={fetchLocations}>
        Show Locations
      </button>

      <MapContainer 
        center={centerPosition} 
        zoom={2} 
        minZoom={2} 
        maxZoom={6} 
        maxBounds={maxBounds}
        style={{ width: '100vw', height: '100vh' }}
      >
        <TileLayer
          url="http://localhost:8389/tiles/{z}/{x}/{y}.png"
          attribution="&copy; 검은사막 지도"
          noWrap={true}
        />

        <MapClickHandler />

        {npcs.map((npc, index) => (
          <Marker key={index} position={npc.position} icon={icon}>
            <Tooltip>{npc.name}</Tooltip>
          </Marker>
        ))}

        {locations.map((location, index) => (
          <Marker key={index} position={location.position}>
            <Tooltip>{location.name}</Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
