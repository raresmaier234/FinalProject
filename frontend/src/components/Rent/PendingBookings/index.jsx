import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import './PendingBookings.css';
import { getUserByEmail } from '../../../store/slices/user/thunk';
import { getBookings, updateBookingStatus } from '../../../store/slices/booking/thunk';
import { useAuth } from '../../../providers/AuthProvider';

const PendingBookings = () => {
    const [bookings, setBookings] = useState([]);
    const userInfo = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            dispatch(getUserByEmail({ email: user }));
        }
    }, [user, dispatch]);

    useEffect(() => {
        if (userInfo?.id) {
            fetchBookings();
        }
    }, [userInfo?.id, dispatch]);

    const fetchBookings = () => {
        dispatch(getBookings({ userId: userInfo.id })).then(res => {
            const pendingBookings =
                res?.payload.filter(booking => booking.bookingStatus === 'PENDING');
            setBookings(pendingBookings);
        });
    };

    const handleApprove = (bookingId) => {
        dispatch(updateBookingStatus({ bookingId, status: 'CONFIRMED' })).then(() => {
            fetchBookings();
        });
    };

    const handleDecline = (bookingId) => {
        dispatch(updateBookingStatus({ bookingId, status: 'DECLINED' })).then(() => {
            fetchBookings();
        });
    };


    return (
        <div className="booking-container">
            {bookings.length > 0 ? bookings.map((booking) => (
                <div key={booking.id} className="booking-card">
                    <h2>Booking for {booking.rent.name}</h2>
                    <p>User: {booking.user.firstName} {booking.user.lastName}</p>
                    <p>From: {format(new Date(booking.startDate), 'MMM dd, yyyy')} To: {format(new Date(booking.endDate), 'MMM dd, yyyy')}</p>
                    <p>Status: {booking.bookingStatus}</p>
                    <p>Rooms: {booking.nrOfRooms}, Persons: {booking.nrOfPersons}</p>
                    <p>Total Price:{booking.totalPrice} €</p>
                    <div className="button-container">
                        <button className="approve-button" onClick={() => handleApprove(booking.id)}>Approve</button>
                        <button className="decline-button" onClick={() => handleDecline(booking.id)}>Decline</button>
                    </div>
                </div>
            )) : <div className="empty-state">
                <p>No pending bookings available.</p>
            </div>}
        </div>
    );
};


export default PendingBookings;
