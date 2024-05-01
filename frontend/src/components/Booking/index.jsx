import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie"
import { useDispatch, useSelector } from 'react-redux';

import { getUser } from "../../../store/slices/login/thunk";

import { TextField } from '@mui/material'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link';

import StyledButton from "../../general-components/StyledButton";
import StyledModal from "../../general-components/StyledModal";
import StyledDropdown from "../general-components/StyledDropdown";
import FormLayout from "../../../containers/FormLayout";

import useClasses from "../../utils/useClasses";

import LoginFormStyles from "./LoginFormStyles";
import GoogleMaps from "../general-components/GoogleMaps";

const Booking = ({ isOpen, onClose }) => {
    const resources = useSelector()
    const sectionData = useSelector()

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState(null);
    const [location, setLocation] = useState(null)

    const [cookies, setCookies] = useCookies(['name'])

    const dispatch = useDispatch()

    const classes = useClasses(LoginFormStyles, { name: "LoginFormStyles" })

    const handleBooking = () => {
        let payload = {
            email: email,
            fitstName: firstName,
            lastName: lastName,
            phone: phone,
            location: location
        }
        dispatch(getUser({ payload: payload })).then((res) => {
            if (!res?.payload?.error) {
                onClose();
            }
        }).catch((error) => {

            console.error('Login error:', error);
            if (error && error.code === 404) {

            }
        });
    }

    return (
        <StyledModal isOpen={isOpen} onClose={onClose} title="Booking">
            <FormLayout onSubmit={(event) => {
                event.preventDefault();
                handleBooking();
            }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="first_name"
                    label="First Name"
                    name="firstName"
                    type="string"
                    autoFocus
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    type="string"
                    autoFocus
                    onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    type="string"
                    autoFocus
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="phone"
                    label="Phone"
                    name="phone"
                    type="string"
                    autoFocus
                    onChange={(e) => setPhone(e.target.value)}
                />
                <GoogleMaps onChange={(e) => e !== null ? setLocation(e.description) : setLocation(null)} />

                <StyledDropdown
                    id="nrOfRooms"
                    activeLabel
                    options={resources?.nrOfRooms || []}
                    label={"Numar de camere"}
                    required
                    value={sectionData?.nrOfRooms || null}
                    width="100%"
                    onChange={(e, value) => {

                    }}
                />

                <StyledDropdown
                    id="nrOfRooms"
                    activeLabel
                    options={resources?.nrOfPersons || []}
                    label={"Numar de persoane"}
                    required
                    value={sectionData?.nrOfPersons || null}
                    width="100%"
                    onChange={(e, value) => {

                    }}
                />

                <div className={classes.button}>
                    <StyledButton type="submit">Submit</StyledButton>
                    <StyledButton onClick={onClose}>Exit</StyledButton>
                </div>

            </FormLayout>
        </StyledModal>
    );
}

export default Booking






