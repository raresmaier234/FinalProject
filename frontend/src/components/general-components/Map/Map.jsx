import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useState } from 'react'
import StyledButton from '../StyledButton';
import StyledModal from '../StyledModal';

const containerStyle = {
    width: '400px',
    height: '400px'
};

const defaultCenter = {
    lat: -3.745,
    lng: -38.523
};

const Map = ({ isOpen, onClose, location = defaultCenter }) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY
    })

    const [showMap, setShowMap] = useState(false)

    const toggleMap = () => {
        setShowMap(!showMap)
        onClose()
    }

    return isLoaded ? (
        <>
            <StyledModal isOpen={isOpen} onClose={onClose}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={location}
                    zoom={16}
                >
                    <Marker
                        position={location}
                    />
                </GoogleMap>
                <StyledButton onClick={() => toggleMap()}>Exit</StyledButton>
            </StyledModal>
        </>


    ) : <></>
}

export default Map;