// RentProfile.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@mui/joy/Typography';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import './RentProfile.css';
import ImageSlider from '../../general-components/ImageSlider';
import ReviewForm from '../ReviewForm';
import { getRentById } from '../../../store/slices/rent/thunk';
import { getReviews } from '../../../store/slices/reviews/thunk';
import HoverRating from '../../general-components/Rating';

export default function RentProfile() {
    const { id } = useParams();
    const rent = useSelector((state) => state.rent.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [openReviewModal, setOpenReviewModal] = useState(false);


    const reviews = useSelector((state) => state.reviews.items);

    useEffect(() => {
        dispatch(getRentById({ id }));
        dispatch(getReviews({ rentId: id }))
    }, [dispatch, id]);



    const { name, description, location, price, photoUrls = [] } = rent;

    const handleBookNow = () => {
        navigate(`/booking/${id}`);
    };

    return (
        <div className="wrapper">
            <div className="rent-profile">
                <Typography level="h1" className="profile-header">{name}</Typography>
                <AspectRatio height="500px">
                    <ImageSlider images={photoUrls} />
                </AspectRatio>
                <div className="profile-content">
                    <Typography level="body-lg" className="profile-description"><strong>Description: </strong>   {description}</Typography>
                    <Typography level="body-md" className="profile-location"><strong>Location:</strong> {location}</Typography>
                    <Typography level="body-md" className="profile-price">
                        <strong>Price:</strong> {price} € per night</Typography>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
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
                        <Button
                            variant="solid"
                            size="lg"
                            color="primary"
                            aria-label="Book Now"
                            sx={{ mt: 2 }}
                            onClick={() => setOpenReviewModal(true)}
                        >
                            Review
                        </Button>
                    </div>

                    <ReviewForm rentId={id} isOpen={openReviewModal} onClose={() => setOpenReviewModal(false)} />
                    {Array.isArray(reviews) && reviews.map((review, index) => (
                        <div key={index} style={{ margin: '10px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                            <h3>{review.user.firstName} {review.user.lastName}</h3>
                            <HoverRating
                                rating={review.rating}
                                isEditable={false}
                            />
                            <p>Comment: {review.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
}
