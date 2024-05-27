import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import './Notifications.css';
import { getUserByEmail } from '../../store/slices/user/thunk';
import { getClientBookings } from '../../store/slices/booking/thunk';
import { useAuth } from '../../providers/AuthProvider';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';

const Notifications = () => {
    const [bookings, setBookings] = useState([]);
    const userInfo = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const { user } = useAuth();

    console.log(userInfo)
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
        dispatch(getClientBookings({ userId: userInfo.id })).then(res => {
            console.log(res?.payload)
            const pendingBookings =
                res?.payload.filter(booking => booking.bookingStatus === 'CONFIRMED' || booking.booking === 'DECLINED');
            setBookings(pendingBookings);
        });
    };


    return (
        <div className="booking-container">
            {bookings.length > 0 ? bookings.map((booking) => (
                <div key={booking.id} className="booking-card">
                    <h2>Booking for {booking.rent.name}</h2>
                    <p>User: {booking.user.firstName} {booking.user.lastName}</p>
                    <p>From: {format(new Date(booking.startDate), 'MMM dd, yyyy')} To: {format(new Date(booking.endDate), 'MMM dd, yyyy')}</p>
                    <p>Rooms: {booking.nrOfRooms}, Persons: {booking.nrOfPersons}</p>
                    <p>Total Price: {booking.totalPrice} €</p>
                    <p>
                        {booking.bookingStatus === "CONFIRMED" ?
                            <>
                                <div className="status-label">
                                    {booking.bookingStatus}
                                    <CheckCircleIcon className="status-icon"></CheckCircleIcon>
                                </div>
                            </> :
                            <>
                                Status: {booking.bookingStatus}
                                <CloseIcon></CloseIcon>
                            </>
                        }
                    </p>
                </div>
            )) : <div className="empty-state">
                <p>You don't have any notifications!</p>
            </div>}
        </div>
    );
};


export default Notifications;
