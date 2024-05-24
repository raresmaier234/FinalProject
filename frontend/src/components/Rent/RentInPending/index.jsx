import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RentInPending = ({ rentId }) => {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`/api/bookings/pending/${rentId}`);
                setBookings(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch bookings:', error);
                setIsLoading(false);
            }
        };

        fetchBookings();
    }, [rentId]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Pending Bookings for Rent ID: {rentId}</h1>
            {bookings.length > 0 ? (
                <ul>
                    {bookings.map((booking) => (
                        <li key={booking.id}>
                            Booking ID: {booking.id}, Date: {booking.startDate} to {booking.endDate}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No pending bookings found.</p>
            )}
        </div>
    );
};

export default RentInPending;
