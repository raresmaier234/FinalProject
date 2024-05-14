import { useState, useEffect } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import StyledButton from '../../general-components/StyledButton';
import ImageSlider from '../../general-components/ImageSlider';
import { Link } from 'react-router-dom';
import cardRentStyles from './CardRentStyles';
import useClasses from '../../utils/useClasses';
import Map from '../../general-components/Map/Map';
import { useJsApiLoader } from '@react-google-maps/api';

export default function CardRent({ id, name, description, price, location, photos, type }) {
    const classes = useClasses(cardRentStyles, { name: "cardRentStyles" });

    const searchParams = new URLSearchParams(location.search);

    const [openMap, setOpenMap] = useState(false);
    const [coordinates, setCoordinates] = useState(null);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY
    });

    const fetchCoordinates = async () => {
        const apiKey = process.env.REACT_APP_GOOGLE_MAPS_KEY;  // Make sure this key has access to the Geocoding API
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();
        if (data.status === 'OK') {
            const { lat, lng } = data.results[0].geometry.location;
            setCoordinates({ lat, lng });
        } else {
            console.error('Geocoding failed: ' + data.status);
        }
    };

    useEffect(() => {
        if (location) {
            fetchCoordinates();
        }
    }, [location]);


    return (
        <>
            <Card sx={{ width: "100%", height: "500px" }}>

                <div>
                    <Typography level="title-lg">{name}</Typography>
                    <Typography level="body-sm">{type}</Typography>
                    <Typography level="body-sm">{description}</Typography>
                    <Typography level="body-sm">{location}</Typography>
                    <IconButton
                        aria-label="bookmark Bahamas Islands"
                        variant="plain"
                        color="neutral"
                        size="sm"
                        sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
                    >
                        <BookmarkAdd />
                    </IconButton>
                </div>
                <AspectRatio height="400px" maxHeight="200px">
                    <ImageSlider images={photos}></ImageSlider>
                </AspectRatio>
                <CardContent orientation="horizontal">
                    <div>
                        <Typography level="body-xs">Price:</Typography>
                        <Typography fontSize="lg" fontWeight="lg">
                            {price} €
                        </Typography>
                    </div>
                    <Link to={`/${id}/${name}`}>
                        <Button
                            variant="solid"
                            size="md"
                            color="primary"
                            aria-label="Explore Bahamas Islands"
                            sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                        >
                            Explore
                        </Button>
                    </Link>
                    <div>
                        <Button variant="solid"
                            size="md"
                            color="primary"
                            sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                            onClick={() => setOpenMap(true)}>
                            Map
                        </Button>
                    </div>

                </CardContent>
            </Card>
            {isLoaded && coordinates &&
                <Map isOpen={openMap} onClose={() => setOpenMap(false)} location={coordinates}></Map>
            }
        </>
    );
}