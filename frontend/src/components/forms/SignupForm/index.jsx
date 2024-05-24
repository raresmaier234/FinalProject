import { useState } from 'react'
import axios from "axios";


import StyledButton from '../../general-components/StyledButton';
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


    const classes = useClasses(SignupFormStyles, { name: "SignupFormStyles" })

    const handleRenterChange = () => {
        setRenter(!renter)
    }

    const handleSave = () => {
        let payload = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            password: password,
            role: renter ? "RENTER" : "CLIENT"
        }
        console.log(payload)
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
                    onChange={(e) => setEmail(e.target.value)}
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
                        Chirias
                    </label>
                    <label>
                        <Checkbox checked={!renter} onChange={handleRenterChange} />
                        Client
                    </label>
                </Box>
                {error && <p>{error}</p>}
                <div className={classes.button}>
                    <StyledButton type="submit"> Submit </StyledButton>
                    <StyledButton onClick={onClose}> Exit </StyledButton>
                </div>

            </FormLayout>
        </StyledModal>
    );
}

export default SigninForm





