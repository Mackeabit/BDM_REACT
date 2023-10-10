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
  const [showModal, setShowModal] = useState(false);
  const [clickedPosition, setClickedPosition] = useState(null);

  useEffect(() => {
    const mapRoot = document.querySelector(".leaflet-container");
    if (mapRoot) {
      mapRoot.style.cursor = cursorStyle;
    }
  }, [cursorStyle]);

  const MapClickHandler = () => {
    useMapEvent('click', (e) => {
      const { lat, lng } = e.latlng;
      setClickedPosition([lat.toFixed(4), lng.toFixed(4)]);
      setShowModal(true);
    });
    return null;
  };

  const Modal = ({ onClose, position }) => {
    return (
      <div style={modalStyle.overlay}>
        <div style={modalStyle.modal}>
          <h2>위치: ({position[0]}, {position[1]})</h2>
          <label>
            카테고리명:
            <input type="text" />
          </label>
          <br />
          <label>
            설명:
            <textarea />
          </label>
          <br />
          <button onClick={onClose}>닫기</button>
          <button>저장하기</button>
        </div>
      </div>
    );
  };

  const modalStyle = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10001
    },
    modal: {
      background: 'white',
      borderRadius: '5px',
      padding: '20px',
      width: '300px',
      boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.2)'
    }
  };

  return (
    <div style={{ position: 'relative', zIndex: 10 }}>
      <button onClick={() => {
        axios.get('http://localhost:8389/api/npcs').then(response => {
          setNpcs(response.data);
        }).catch(error => {
          console.error("No NPCs found:", error);
        });
      }}>
        Show NPCs
      </button>
      <button onClick={() => {
        axios.get('http://localhost:8389/api/locations').then(response => {
          setLocations(response.data);
        }).catch(error => {
          console.error("No Locations found:", error);
        });
      }}>
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

      {showModal && 
        <Modal 
          onClose={() => setShowModal(false)} 
          position={clickedPosition} 
        />
      }
    </div>
  );
};

export default MapComponent;
