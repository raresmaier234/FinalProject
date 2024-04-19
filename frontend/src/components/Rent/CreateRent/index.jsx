import React, { useState } from 'react';
import useClasses from '../../utils/useClasses';
import moment from 'moment';
import Appbar from '../../general-components/Navbar';
import { Outlet } from 'react-router-dom';
import FormLayout from '../../../containers/FormLayout';
import GoogleMaps from '../../general-components/GoogleMaps';
import { TextField } from '@mui/material';
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
    const [photos, setPhotos] = useState(null);
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [description, setDescription] = useState("");

    const handleUploadPhotos = (e) => {
        setPhotos(e.target.files);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            location: location,
            price: price,
            photos: photos,
            name: name,
            description: description,
            startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : null,
            endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : null
        }
        console.log(payload)
        dispatch(addRent({ payload: payload }))
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
                    label="Pret"
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
                <input type="file" onChange={handleUploadPhotos} />
                <StyledButton type="submit">
                    Submit
                </StyledButton>
            </FormLayout>
            <Outlet />
        </div>
    );
};

export default CreateRentForm;
