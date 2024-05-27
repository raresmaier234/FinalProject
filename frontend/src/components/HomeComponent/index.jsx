// HomeComponent.js
import React, { useState } from "react";
import "./HomeComponent.css";
import GoogleMaps from "../general-components/GoogleMaps";
import { Link } from "react-router-dom";
import { getAvailableRents } from "../../store/slices/rent/thunk";
import { useNavigate } from "react-router-dom";
import Map from "../general-components/Map/Map";
import { useAuth } from "../../providers/AuthProvider";
import { TextField } from "@mui/material";
import StyledDatePicker from "../general-components/StyledDatePicker";

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
                                                <StyledDatePicker
                                                    className="form-control"
                                                    onChange={(e) => setCheckIn(e.format("YYYY-MM-DD"))}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <span className="form-label">Check Out</span>
                                                <StyledDatePicker
                                                    className="form-control"
                                                    onChange=
                                                    {(e) =>
                                                        setCheckOut(e.format("YYYY-MM-DD"))}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <span className="form-label">Rooms</span>
                                                <TextField
                                                    className="form-control"
                                                    value={rooms}
                                                    type="number"
                                                    onChange={(e) => setRooms(e.target.value)}
                                                    inputProps={{ min: 1 }}
                                                >
                                                </TextField>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <span className="form-label">Adults</span>
                                                <TextField
                                                    className="form-control"
                                                    value={adults}
                                                    onChange={(e) => setAdults(e.target.value)}
                                                    type="number"
                                                    inputProps={{ min: 1 }}
                                                >
                                                </TextField>
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
