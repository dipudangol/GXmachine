import React, { useState, useEffect } from 'react';
import { APIS } from "../../../config/Api.config";
import { api } from "../../../helpers/Api.helper";
import L from 'leaflet'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import markerred from "../../../assets/icons/marker-icon-2x-red.png"
import markergreen from "../../../assets/icons/marker-icon-2x-green.png"
import markeryellow from "../../../assets/icons/marker-icon-2x-yellow.png"
import markergold from "../../../assets/icons/marker-icon-2x-gold.png"
import markerorange from "../../../assets/icons/marker-icon-2x-orange.png"
import markershadow from "../../../assets/icons/marker-shadow.png"
const NepalMap = () => {
    const [siteMapData, setSiteMapData] = useState([])
    const [pos, setPos] = useState({
        lat: 28.438035,
        lng: 84.754714,
        zoom: 7
    });
    const position = [pos.lat, pos.lng];
    var greenIcon = [
        L.icon({
            iconUrl: markergreen,
            shadowUrl: markershadow,

            // iconSize:     [20, 70], // size of the icon
            shadowSize: [41, 41], // size of the shadow
            iconSize: [25, 41],
            iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
            shadowAnchor: [12, 41],  // the same for the shadow
            popupAnchor: [1, -41] // point from which the popup should open relative to the iconAnchor
        }),
        L.icon({
            iconUrl: markeryellow,
            shadowUrl: markershadow,

            // size of the icon
            shadowSize: [41, 41], // size of the shadow
            iconSize: [25, 41],
            iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
            shadowAnchor: [12, 41],  // the same for the shadow
            popupAnchor: [1, -41] // point from which the popup should open relative to the iconAnchor
        }),
        L.icon({
            iconUrl: markergold,
            shadowUrl: markershadow,

            // size of the icon
            shadowSize: [41, 41], // size of the shadow
            iconSize: [25, 41],
            iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
            shadowAnchor: [12, 41],  // the same for the shadow
            popupAnchor: [1, -41] // point from which the popup should open relative to the iconAnchor
        }),

        L.icon({
            iconUrl: markerorange,
            shadowUrl: markershadow,

            // size of the icon
            shadowSize: [41, 41], // size of the shadow
            iconSize: [25, 41],
            iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
            shadowAnchor: [12, 41],  // the same for the shadow
            popupAnchor: [1, -41] // point from which the popup should open relative to the iconAnchor
        }),
        L.icon({
            iconUrl: markerred,
            shadowUrl: markershadow,

            // size of the icon
            shadowSize: [41, 41], // size of the shadow
            iconSize: [25, 41],
            iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
            shadowAnchor: [12, 41],  // the same for the shadow
            popupAnchor: [1, -41] // point from which the popup should open relative to the iconAnchor
        }),

    ];


    useEffect(() => {
        const fetch = async () => {
            let site_map_result = await api(APIS.site_map_result)
            setSiteMapData(site_map_result.data)
        }
        fetch()
    }, [])
    return (
        <div className="nepalmap-container">
            <div className="nepalmap">

                <Map center={position} zoom={pos.zoom} zoomControl={true}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {siteMapData.length>0&&siteMapData.map((item, index) => {
                        return (
                            item.latitude && item.longitude &&
                            <Marker
                                icon={greenIcon[item.color - 1]}
                                key={index}
                                position={[item.latitude, item.longitude]}
                                onClick={() => setPos({ lat: item.latitude, lng: item.longitude, zoom: 10 })}
                                onMouseOver={e => {
                                    e.target.openPopup();
                                }}
                                onMouseOut={e => {
                                    e.target.closePopup();
                                }}>
                                <Popup>
                                    {item.name}
                                </Popup>
                            </Marker>

                        )
                    }
                    )}


                </Map>
                <div className="nepalmap-legend"  >
                    <div className="nepalmap-legend-item" ><div className="nepalmap-legend-item-index1" /> Delay More than 7 days</div>
                    <div className="nepalmap-legend-item"><div className="nepalmap-legend-item-index2" />Delay for 5-6 days</div>
                    <div className="nepalmap-legend-item"><div className="nepalmap-legend-item-index3" />Delay for 3-4 days</div>
                    <div className="nepalmap-legend-item"><div className="nepalmap-legend-item-index4" />Delay for 1-2 days</div>
                    <div className="nepalmap-legend-item"><div className="nepalmap-legend-item-index5" />Operational</div>
                </div>
            </div>
        </div>
    );
}

export default NepalMap;