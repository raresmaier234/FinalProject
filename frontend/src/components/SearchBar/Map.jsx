import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useState } from 'react'
import Popup from 'reactjs-popup';
import ButtonWithHover from '../Button';

const containerStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

function Map() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY
    })

    const [showMap, setShowMap] = useState(false)

    const toggleMap = () => {
        setShowMap(!showMap)
    }

    return isLoaded ? (
        <>
            <ButtonWithHover label="Map" handleClick={toggleMap}></ButtonWithHover>
            <Popup
                position="right center"
                open={showMap}
                closeOnDocumentClick={false}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={16}
                >
                </GoogleMap>
                <ButtonWithHover label="Exit" handleClick={toggleMap}></ButtonWithHover>
            </Popup>
        </>


    ) : <></>
}

export default Map;