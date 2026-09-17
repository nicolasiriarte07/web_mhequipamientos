"use client";

import { MapContainer, TileLayer, Circle, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const CARHUE_LAT = -37.1667;
const CARHUE_LON = -62.7667;
const CARHUE: [number, number] = [CARHUE_LAT, CARHUE_LON];

const FREE_RADIUS_KM = 150;
const NEGOTIATED_RADIUS_KM = 300;

function boundsForRadiusKm(radiusKm: number): [[number, number], [number, number]] {
  const latDelta = radiusKm / 110.574;
  const lonDelta = radiusKm / (111.32 * Math.cos((CARHUE_LAT * Math.PI) / 180));
  return [
    [CARHUE_LAT - latDelta, CARHUE_LON - lonDelta],
    [CARHUE_LAT + latDelta, CARHUE_LON + lonDelta],
  ];
}

const pinIcon = L.divIcon({
  className: "",
  html: `<div style="width:14px;height:14px;border-radius:9999px;background:#5b21b6;border:3px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.4);"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

export default function ShippingMap() {
  return (
    <MapContainer
      bounds={boundsForRadiusKm(NEGOTIATED_RADIUS_KM)}
      boundsOptions={{ padding: [16, 16] }}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Circle
        center={CARHUE}
        radius={NEGOTIATED_RADIUS_KM * 1000}
        pathOptions={{ color: "#6d28d9", fillColor: "#6d28d9", fillOpacity: 0.12, weight: 1 }}
      />
      <Circle
        center={CARHUE}
        radius={FREE_RADIUS_KM * 1000}
        pathOptions={{ color: "#5b21b6", fillColor: "#5b21b6", fillOpacity: 0.35, weight: 2 }}
      />
      <Marker position={CARHUE} icon={pinIcon}>
        <Popup>Carhué, Buenos Aires — nuestro depósito</Popup>
      </Marker>
    </MapContainer>
  );
}
