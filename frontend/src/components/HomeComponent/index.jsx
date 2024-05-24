// HomeComponent.js
import React, { useState } from "react";
import "./HomeComponent.css";
import GoogleMaps from "../general-components/GoogleMaps";
import { Link } from "react-router-dom";
import { getAvailableRents } from "../../store/slices/rent/thunk";
import { useNavigate } from "react-router-dom";
import Map from "../general-components/Map/Map";
import { useAuth } from "../../providers/AuthProvider";

const HomeComponent = () => {
    const { user } = useAuth()
    const navigate = useNavigate();
    const [location, setLocation] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [rooms, setRooms] = useState(1);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();

        const searchParams = new URLSearchParams({
            location: location,
            startDate: checkIn,
            endDate: checkOut,
            rooms: rooms,
            adults: adults,
            children: children
        });

        navigate(`/trips?${searchParams.toString()}`);
    };

    return (
        <div id="booking" className="section">
            <div className="section-center">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7 col-md-push-5">
                            <div className="booking-cta">
                                <h1>Make your reservation</h1>
                                <p>

                                </p>
                            </div>
                        </div>
                        <div className="col-md-4 col-md-pull-7">
                            <div className="booking-form">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <span className="form-label">Your Destination</span>
                                        <GoogleMaps
                                            onChange={(selectedLocation) =>
                                                selectedLocation !== null ? setLocation(selectedLocation.description) : setLocation("")
                                            }
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <span className="form-label">Check In</span>
                                                <input
                                                    className="form-control"
                                                    type="date"
                                                    required
                                                    value={checkIn}
                                                    onChange={(e) => setCheckIn(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <span className="form-label">Check Out</span>
                                                <input
                                                    className="form-control"
                                                    type="date"
                                                    required
                                                    value={checkOut}
                                                    onChange={(e) => setCheckOut(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <span className="form-label">Rooms</span>
                                                <select
                                                    className="form-control"
                                                    value={rooms}
                                                    onChange={(e) => setRooms(e.target.value)}
                                                >
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <span className="form-label">Adults</span>
                                                <select
                                                    className="form-control"
                                                    value={adults}
                                                    onChange={(e) => setAdults(e.target.value)}
                                                >
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <span className="form-label">Children</span>
                                                <select
                                                    className="form-control"
                                                    value={children}
                                                    onChange={(e) => setChildren(e.target.value)}
                                                >
                                                    <option>0</option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-btn">
                                        <button type="submit" className="submit-btn">Check availability</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeComponent;
