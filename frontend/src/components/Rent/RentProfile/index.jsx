// RentProfile.js
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@mui/joy/Typography';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import './RentProfile.css';
import ImageSlider from '../../general-components/ImageSlider';
import { getRentById } from '../../../store/slices/rent/thunk';

export default function RentProfile() {
    const { id } = useParams();
    const rent = useSelector((state) => state.rent.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getRentById({ id }));
    }, [dispatch, id]);

    const { name, description, location, price, photoUrls = [] } = rent;

    const handleBookNow = () => {
        navigate(`/booking/${id}`);
    };

    return (
        <div className="rent-profile">
            <Typography level="h1" className="profile-header">{name}</Typography>
            <AspectRatio height="500px">
                <ImageSlider images={photoUrls} />
            </AspectRatio>
            <div className="profile-content">
                <Typography level="body-lg" className="profile-description">{description}</Typography>
                <Typography level="body-md" className="profile-location"><strong>Location:</strong> {location}</Typography>
                <Typography level="body-md" className="profile-price"><strong>Price:</strong> {price} € per night</Typography>

                <Button
                    variant="solid"
                    size="lg"
                    color="primary"
                    aria-label="Book Now"
                    sx={{ mt: 2 }}
                    onClick={handleBookNow}
                >
                    Book Now
                </Button>
            </div>
        </div>
    );
}
