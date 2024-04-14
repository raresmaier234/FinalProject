import React, { useState } from 'react';
import useClasses from '../../utils/useClasses';
import Appbar from '../../general-components/Navbar';
import UploadButton from '../../general-components/UploadButton';
import { Outlet } from 'react-router-dom';
import FormLayout from '../../../containers/FormLayout';
import GoogleMaps from '../../general-components/GoogleMaps';
import { TextField } from '@mui/material';
import createRentStyles from './CreateRentStyles';

const CreateRentForm = () => {
    const classes = useClasses(createRentStyles, { name: "createRentStyles" })

    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [photos, setPhotos] = useState([]);
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ location, price, photos, name });
    };

    const handlePhotoChange = (e) => {
        const files = e.target.files;
        setPhotos(files);
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
                    label="Price"
                    name="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <GoogleMaps onChange={(selectedLocation) => setLocation(selectedLocation.description)} />
                <UploadButton label={"photo"} onChange={(e) => setPhotos(e.target.value)} />
                <button type="submit">Submit</button>
            </FormLayout>
            <Outlet />
        </div>
    );
};

export default CreateRentForm;
