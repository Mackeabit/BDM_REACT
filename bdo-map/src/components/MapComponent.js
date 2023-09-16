import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import npcIcon from '../assets/icons/npc/npc_icon.png';

const icon = new L.Icon({
  iconUrl: npcIcon,
  iconSize: [32, 32],
});

const MapComponent = () => {
  const centerPosition = [70, -80];
  const maxBounds = [
    [-90, -180],
    [190, 180]
  ];

  const [npcs, setNpcs] = useState([]);
  const [locations, setLocations] = useState([]);

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

  return (
    <div>
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
