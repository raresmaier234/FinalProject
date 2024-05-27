import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker, Circle } from '@react-google-maps/api';
import Button from '@mui/joy/Button';
import Switch from '@mui/joy/Switch'; // Importing the Switch component for the toggle
import StyledModal from '../StyledModal';
import IconButton from '@mui/joy/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const containerStyle = {
    width: '550px',
    height: '550px'
};

const options = {
    fillColor: "lightblue",
    fillOpacity: 0.5,
    strokeColor: "red",
    strokeOpacity: 1,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 500,
    zIndex: 1
};

const defaultCenter = {
    lat: -3.745,
    lng: -38.523
};

const libraries = ["places"];

const Map = ({ isOpen, onClose, location = defaultCenter }) => {
    const { isLoaded, loadError } = useLoadScript({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
        libraries
    });

    const [markers, setMarkers] = useState([]);
    const [showSupermarkets, setShowSupermarkets] = useState(false);
    const [showParking, setShowParking] = useState(false);
    const [showRestaurants, setShowRestaurants] = useState(false);

    const mapRef = useRef(null);
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const fetchPlaces = useCallback((type) => {
        if (!mapRef.current) return;

        const service = new window.google.maps.places.PlacesService(mapRef.current);
        const request = {
            location: new window.google.maps.LatLng(location.lat, location.lng),
            radius: '500',
            type: [type] // This will be dynamically set based on the filter type
        };

        service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                const newMarkers = results.map(place => ({
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                    type: type // Store the type of place
                }));
                setMarkers(prevMarkers => [...prevMarkers, ...newMarkers]);
            }
        });
    }, [location]);

    // Update the useEffect to call fetchPlaces based on filter state changes
    useEffect(() => {
        if (isLoaded && !loadError && mapRef.current) {
            setMarkers([]); // Clear existing markers when filters change
            if (showSupermarkets) fetchPlaces('supermarket');
            if (showParking) fetchPlaces('parking');
            if (showRestaurants) fetchPlaces('restaurant');
        }
    }, [isLoaded, fetchPlaces, loadError, showSupermarkets, showParking, showRestaurants]);

    return (
        <StyledModal isOpen={isOpen} onClose={onClose}>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "5px" }}>
                <IconButton size="large" color="inherit" onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
                <div>
                    <p>Supermarkets</p>
                    <Switch checked={showSupermarkets} onChange={() => setShowSupermarkets(!showSupermarkets)} />
                </div>
                <div>
                    <p>Parking</p>
                    <Switch checked={showParking} onChange={() => setShowParking(!showParking)} />
                </div>
                <div>
                    <p>Restaurants</p>
                    <Switch checked={showRestaurants} onChange={() => setShowRestaurants(!showRestaurants)} />
                </div>
            </div>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={location}
                zoom={16}
                onLoad={onMapLoad}
            >
                {markers.map((marker, index) => (
                    <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
                ))}
                <Marker position={location} icon={{ url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }} />
                <Circle center={location} options={options} />
            </GoogleMap>
        </StyledModal>
    );
}

export default Map;
