import React, { useState } from 'react';
import useClasses from '../../utils/useClasses';
import moment from 'moment';
import Appbar from '../../general-components/Navbar';
import { Outlet } from 'react-router-dom';
import FormLayout from '../../../containers/FormLayout';
import GoogleMaps from '../../general-components/GoogleMaps';
import { TextField, Box, Checkbox } from '@mui/material';
import createRentStyles from './CreateRentStyles';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import StyledButton from '../../general-components/StyledButton';
import StyledDatePicker from '../../general-components/StyledDatePicker';

import { addRent } from '../../../store/slices/rent/thunk';

const CreateRentForm = () => {
    const classes = useClasses(createRentStyles, { name: "createRentStyles" })

    const dispatch = useDispatch()

    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const [photos, setPhotos] = useState([]);
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [description, setDescription] = useState("");
    const [nrOfRooms, setNrOfRooms] = useState(null);
    const [nrOfPersons, setNrOfPersons] = useState(null);
    const [nrOfBathrooms, setNrOfBathrooms] = useState(null);
    const [hasParking, setHasParking] = useState(false);

    const handleUploadPhotos = (e) => {
        setPhotos(e.target.files);
    }

    const handleParkingChange = () => {
        setHasParking(!hasParking);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const startDateFormatted = moment(startDate).format("YYYY-MM-DD");
        const endDateFormatted = moment(endDate).format("YYYY-MM-DD");

        const formData = new FormData();
        formData.append("location", location);
        formData.append("price", price);
        formData.append("name", name);
        formData.append("description", description);
        formData.append("nrOfBathrooms", nrOfBathrooms);
        formData.append("nrOfPersons", nrOfPersons);
        formData.append("nrOfRooms", nrOfRooms);
        formData.append("hasParking", hasParking);
        formData.append("startDate", startDateFormatted);
        formData.append("endDate", endDateFormatted);
        for (let i = 0; i < photos.length; i++) {
            formData.append("photos", photos[i]);
        }
        console.log(formData)
        dispatch(addRent({ rent: formData }))
    };

    return (
        <div>
            <Appbar></Appbar>
            <h2>Create Rent</h2>
            <FormLayout onSubmit={handleSubmit}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Nume"
                    name="name"
                    type="string"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="price"
                    label="Pret pe zi"
                    name="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="description"
                    label="Descriere"
                    name="price"
                    type="string"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="description"
                    label="Numar maxim de persoane"
                    name="nrOfPersons"
                    type="number"
                    value={nrOfPersons}
                    onChange={(e) => setNrOfPersons(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="nrOfRooms"
                    label="Numar de camere"
                    name="nrOfRooms"
                    type="number"
                    value={nrOfRooms}
                    onChange={(e) => setNrOfRooms(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="nrOfBathrooms"
                    label="Numar de bai"
                    name="nrOfBathrooms"
                    type="number"
                    value={nrOfBathrooms}
                    onChange={(e) => setNrOfBathrooms(e.target.value)}
                />

                <StyledDatePicker
                    label="start date"
                    onChange={(e) => {
                        setStartDate(e.format("YYYY/MM/DD"))
                    }}>
                </StyledDatePicker>
                <StyledDatePicker label="end date"
                    onChange={(e) => {
                        setEndDate(e.format("YYYY/MM/DD"))
                    }}>
                </StyledDatePicker>
                <GoogleMaps onChange={(selectedLocation) => selectedLocation !== null ? setLocation(selectedLocation.description) : setLocation("")} />
                <Box sx={{ display: 'flex', gap: 3 }}>
                    <label>
                        <Checkbox checked={hasParking} onChange={handleParkingChange} />
                        Parcare
                    </label>
                    <label>
                        <Checkbox checked={!hasParking} onChange={handleParkingChange} />
                        Fara parcare
                    </label>
                </Box>
                <input type="file" onChange={handleUploadPhotos} multiple />
                <StyledButton type="submit">
                    Submit
                </StyledButton>
            </FormLayout>
            <Outlet />
        </div>
    );
};

export default CreateRentForm;
