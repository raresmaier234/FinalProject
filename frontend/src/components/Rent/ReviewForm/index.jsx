import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addReview } from '../../../store/slices/reviews/thunk';
import { TextField } from "@mui/material";
import { getUserByEmail } from '../../../store/slices/user/thunk';
import Button from '@mui/joy/Button';
import HoverRating from '../../general-components/Rating';
import { useAuth } from '../../../providers/AuthProvider';
import { useSelector } from 'react-redux';
import StyledModal from '../../general-components/StyledModal';

export default function ReviewForm({ isOpen, onClose, review, rentId }) {
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(2);
    const dispatch = useDispatch();
    const { user } = useAuth();
    const userInfo = useSelector((state) => state.user.user)

    useEffect(() => {
        if (user) {
            dispatch(getUserByEmail({ email: user }));
        }
    }, [user, dispatch]);

    useEffect(() => {
        if (review) {
            setReviewText(review.text);
            setRating(review.rating);
        } else {
            setReviewText('');
            setRating(0);
        }
    }, [review]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const review = {
            user: userInfo,
            text: reviewText,
            rating: rating
        }
        if (user) {
            dispatch(addReview({ rentId, review: review }));
            setReviewText('');
            setRating(2);
            onClose()
        } else {
            alert("You need to be logged in to post a review.");
        }
    };

    return (
        <StyledModal isOpen={isOpen} onClose={onClose} style={{ width: "200px", height: "200px" }} title={"Do a review for this rent"} >
            <form onSubmit={handleSubmit} style={{ width: "200px", height: "200px" }}>
                <h2>{review ? 'Edit Review' : 'New Review'}</h2>
                <TextField
                    label="Your Review"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    multiline
                    required
                />
                <HoverRating rating={rating} setRating={setRating} isEditable={true} />
                <Button type="submit" variant="solid" color="primary">
                    {review ? 'Update Review' : 'Submit Review'}
                </Button>
            </form>
        </StyledModal>

    );
}
