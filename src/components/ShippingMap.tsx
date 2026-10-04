"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Circle, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const CARHUE_LAT = -37.1667;
const CARHUE_LON = -62.7667;
const CARHUE: [number, number] = [CARHUE_LAT, CARHUE_LON];

const FREE_RADIUS_KM = 120;
const NEGOTIATED_RADIUS_KM = 450;
// Margen extra alrededor del radio de envío a convenir para que el círculo
// no quede pegado al borde del mapa.
const VIEW_MARGIN = 1.15;
const DEFAULT_ASPECT = 1.6;

// Arma los límites del mapa en función del ancho/alto real del contenedor,
// para que el círculo use todo el espacio disponible en vez de dejar un
// mapa "vacío" alrededor (ver a qué se debe: fitBounds siempre ajusta al
// lado más restrictivo, y un contenedor ancho + una caja cuadrada en km
// deja mucho margen horizontal de sobra).
function boundsForAspect(radiusKm: number, aspectRatio: number): [[number, number], [number, number]] {
  const verticalKm = radiusKm;
  const horizontalKm = Math.max(radiusKm, radiusKm * aspectRatio);
  const latDelta = verticalKm / 110.574;
  const lonDelta = horizontalKm / (111.32 * Math.cos((CARHUE_LAT * Math.PI) / 180));
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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) setAspectRatio(width / height);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const bounds = boundsForAspect(NEGOTIATED_RADIUS_KM * VIEW_MARGIN, aspectRatio ?? DEFAULT_ASPECT);

  return (
    <div ref={wrapperRef} style={{ height: "100%", width: "100%" }}>
      {aspectRatio !== null && (
        <MapContainer
          bounds={bounds}
          boundsOptions={{ padding: [0, 0] }}
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
      )}
    </div>
  );
}
