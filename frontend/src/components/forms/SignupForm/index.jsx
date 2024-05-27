import { useState } from 'react'
import axios from "axios";

import Button from '@mui/joy/Button';
import StyledModal from '../../general-components/StyledModal';
import FormLayout from '../../../containers/FormLayout';
import { TextField, Box, Checkbox } from '@mui/material';

import useClasses from '../../utils/useClasses';

import SignupFormStyles from './SignupFormStyles';

const SigninForm = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [error, setError] = useState(null);
    const [renter, setRenter] = useState(false);
    const [emailError, setEmailError] = useState(false);


    const classes = useClasses(SignupFormStyles, { name: "SignupFormStyles" })

    const handleRenterChange = () => {
        setRenter(!renter)
    }

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleEmailChange = (e) => {
        const input = e.target.value;
        setEmail(input);
        setEmailError(!validateEmail(input));
    };

    const handleSave = () => {
        if (emailError) {
            console.error('Invalid email attempt');
            return;
        }

        let payload = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            password: password,
            role: renter ? "RENTER" : "CLIENT"
        }
        axios.post(process.env.REACT_APP_API_URL + "/register", payload)
            .then((res) => {
                onClose()
            })
            .catch((error) => {
                setError(error.response.data);
            });
    }

    return (
        <StyledModal isOpen={isOpen} onClose={onClose} title="Sign In">
            <FormLayout onSubmit={(event) => {
                event.preventDefault();
                handleSave();
            }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="First Name"
                    label="First Name"
                    type="string"
                    autoFocus
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="Last Name"
                    label="Last Name"
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
                    value={email}
                    onChange={handleEmailChange}
                    error={emailError}
                    helperText={emailError ? "Invalid email address" : ""}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="phone"
                    label="Numar telefon"
                    type="number"
                    autoFocus
                    onChange={(e) => setPhone(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Box className="form-parking">
                    <label>
                        <Checkbox checked={renter} onChange={handleRenterChange} />
                        Renter
                    </label>
                    <label>
                        <Checkbox checked={!renter} onChange={handleRenterChange} />
                        Client
                    </label>
                </Box>
                {error && <p>{error}</p>}
                <div className={classes.button}>
                    <Button variant="solid"
                        size="lg"
                        color="primary"
                        type="submit"
                        sx={{ mt: 2 }} >
                        Submit
                    </Button>
                    <Button variant="solid"
                        size="lg"
                        color="primary"
                        type="submit"
                        onClick={onClose}
                        sx={{ mt: 2 }} >
                        Exit
                    </Button>
                </div>

            </FormLayout>
        </StyledModal>
    );
}

export default SigninForm





