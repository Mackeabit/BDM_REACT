import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import npcIcon from '../assets/icons/npc/npc_icon.png';

// 아이콘 이미지 경로 설정
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

    // 마커 표시 상태
    const [showNPC, setShowNPC] = useState(false);
    const [showPosition, setShowPosition] = useState(false);

    // 예시 NPC 데이터
    const npcs = [
        {
            name: "General Vendor",
            position: [78, -75]
        },
        {
            name: "Skill Instructor",
            position: [79, -76]
        }
    ];

    // 예시 거점 데이터
    const positions = [
        {
            name: "House 1",
            position: [80, -80],
            icon: "position1.png"
        },
        {
            name: "House 2",
            position: [81, -82],
            icon: "position2.png"
        }
    ];

    return (
        <div>
            <button onClick={() => setShowNPC(!showNPC)}>
                {showNPC ? 'Hide' : 'Show'} NPC
            </button>
            <button onClick={() => setShowPosition(!showPosition)}>
                {showPosition ? 'Hide' : 'Show'} Position
            </button>
            
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

                {showNPC && npcs.map((npc, index) => (
                    <Marker key={index} position={npc.position} icon={icon}>
                        <Tooltip>{npc.name}</Tooltip>
                    </Marker>
                ))}

                {showPosition && positions.map((pos, index) => {
                    const positionIcon = new L.Icon({
                        iconUrl: `http://localhost:8389/public/icons/points/${pos.icon}`,
                        iconSize: [32, 32],
                    });
                    return (
                        <Marker key={index} position={pos.position} icon={positionIcon}>
                            <Tooltip>{pos.name}</Tooltip>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
}

export default MapComponent;
