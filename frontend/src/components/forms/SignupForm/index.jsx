import { useState } from 'react'
import axios from "axios";


import { createTheme } from '@mui/material/styles';
import { TextField } from '@mui/material'

import StyledButton from '../../general-components/StyledButton';
import StyledModal from '../../general-components/StyledModal';
import FormLayout from '../../../containers/FormLayout';

import useClasses from '../../utils/useClasses';

import SignupFormStyles from './SignupFormStyles';

const SigninForm = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [error, setError] = useState(null);


    const classes = useClasses(SignupFormStyles, { name: "SignupFormStyles" })


    const handleSave = () => {
        let payload = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            password: password
        }
        axios.post(process.env.REACT_APP_API_URL + "/register", payload)
            .then((res) => {
                const rspData = res.data;
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
                    id="password"
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
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
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





