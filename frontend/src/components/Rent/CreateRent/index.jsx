import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Outlet } from 'react-router-dom';
import { TextField, Box, Checkbox, Typography } from '@mui/material';
import { Snackbar, Alert } from '@mui/material';
import Button from '@mui/joy/Button';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import StyledDatePicker from '../../general-components/StyledDatePicker';
import GoogleMaps from '../../general-components/GoogleMaps';
import FormLayout from '../../../containers/FormLayout';
import { addRent } from '../../../store/slices/rent/thunk';
import './CreateRentStyles.css';

const CreateRentForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userInfo = useSelector((state) => state.user.user)

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
    const [type, setType] = useState("");

    const [openSnackbar, setOpenSnackbar] = useState(false);


    const handleUploadPhotos = (e) => {
        const files = e.target.files;
        const newPhotos = Array.from(files).map(file =>
            Object.assign(file, {
                id: `photo-${file.name}`,
                content: file,
                preview: URL.createObjectURL(file)
            })
        );
        setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
    };

    const onDragEnd = (result) => {
        const { destination, source } = result;
        if (!destination) {
            return;
        }
        if (destination.index === source.index) {
            return;
        }

        const newPhotos = Array.from(photos);
        const [removed] = newPhotos.splice(source.index, 1);
        newPhotos.splice(destination.index, 0, removed);
        setPhotos(newPhotos);
    };

    const handleParkingChange = () => {
        setHasParking(!hasParking);
    };

    const handleOpenSnackbar = () => {
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;  // Prevents the snackbar from closing when the user clicks outside it
        }
        setOpenSnackbar(false);
    };

    const handleChangeType = (e) => {
        setType(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const startDateFormatted = moment(startDate).format("YYYY-MM-DD");
        const endDateFormatted = moment(endDate).format("YYYY-MM-DD");

        const formData = new FormData();
        formData.append("user_id", userInfo.id);
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
        formData.append("type", type);
        for (let i = 0; i < photos.length; i++) {
            formData.append("photos", photos[i]);
        }
        dispatch(addRent({ rent: formData })).then(() => {
            handleOpenSnackbar();
        });

        // navigate('/');
    };

    return (
        <div className="create-rent-form-container">
            <Typography variant="h4" className="form-heading">
                Create Rent
            </Typography>
            <FormLayout onSubmit={handleSubmit} className="form-layout">
                <FormControl fullWidth className="form-field">
                    <InputLabel id="type-label">Tip cazare</InputLabel>
                    <Select
                        labelId="type-label"
                        id="type-select"
                        value={type}
                        label="Tip cazare"
                        onChange={handleChangeType}
                    >
                        <MenuItem value="HOTEL">Hotel</MenuItem>
                        <MenuItem value="CABANA">Cabana</MenuItem>
                        <MenuItem value="PENSIUNE">Pensiune</MenuItem>
                        <MenuItem value="APARTAMENT">Apartament</MenuItem>
                        <MenuItem value="CASA">Casa</MenuItem>
                        <MenuItem value="CAMPING">Camping</MenuItem>
                    </Select>
                </FormControl>


                <div style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr",
                    gap: "10px"
                }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Nume"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-field"
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
                        className="form-field"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="description"
                        label="Descriere"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-field"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="nrOfPersons"
                        label="Numar maxim de persoane"
                        name="nrOfPersons"
                        type="number"
                        value={nrOfPersons}
                        onChange={(e) => setNrOfPersons(e.target.value)}
                        className="form-field"
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
                        className="form-field"
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
                        className="form-field"
                    />
                    <StyledDatePicker
                        label="Start Date"
                        width={"100%"}
                        onChange={(e) => setStartDate(e.format("YYYY-MM-DD"))}
                        className="form-field"
                    />
                    <StyledDatePicker
                        label="End Date"
                        width={"100%"}
                        onChange={(e) => setEndDate(e.format("YYYY-MM-DD"))}
                        className="form-field"
                    />
                </div>

                <GoogleMaps
                    onChange={(selectedLocation) =>
                        selectedLocation !== null ? setLocation(selectedLocation.description) : setLocation("")
                    }
                    className="form-field"
                />
                <Box className="form-parking">
                    <label>
                        <Checkbox checked={hasParking} onChange={handleParkingChange} />
                        Parcare
                    </label>
                    <label>
                        <Checkbox checked={!hasParking} onChange={handleParkingChange} />
                        Fara parcare
                    </label>
                </Box>
                <input type="file" onChange={handleUploadPhotos} multiple className="file-input" />
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable-photos">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="uploaded-photos"
                            >
                                {photos.map((file, index) => (
                                    <Draggable key={file.id} draggableId={file.id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <img src={file.preview} alt={file.content.name} style={{ width: '100px', height: 'auto' }} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                <Button variant="solid"
                    size="lg"
                    color="primary"
                    type="submit"
                    sx={{ mt: 2 }} >
                    Submit
                </Button>
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                    <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                        Rent created successfully!
                    </Alert>
                </Snackbar>
            </FormLayout>
            <Outlet />
        </div>
    );
};

export default CreateRentForm;
