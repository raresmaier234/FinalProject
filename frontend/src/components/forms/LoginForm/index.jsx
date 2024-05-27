import { useState } from "react";
import { useCookies } from "react-cookie"
import { useAuth } from "../../../providers/AuthProvider";
import { useDispatch } from 'react-redux';

import { getUser } from "../../../store/slices/user/thunk";

import { TextField } from '@mui/material'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link';

import Button from "@mui/joy/Button";
import StyledModal from "../../general-components/StyledModal";
import FormLayout from "../../../containers/FormLayout";

import useClasses from "../../utils/useClasses";

import LoginFormStyles from "./LoginFormStyles";

const LoginForm = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);

    const { login } = useAuth();

    const dispatch = useDispatch()

    const classes = useClasses(LoginFormStyles, { name: "LoginFormStyles" })

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleEmailChange = (e) => {
        const input = e.target.value;
        setEmail(input);
        setEmailError(!validateEmail(input));
    };

    const handleLogin = () => {
        if (emailError) {
            console.error('Invalid email attempt');
            return;
        }

        let payload = {
            email: email,
            password: password
        }
        dispatch(getUser({ payload: payload })).then((res) => {
            if (!res?.payload?.error) {

                const serializedUser = JSON.stringify(res);
                localStorage.setItem("loggedInUser", serializedUser)
                login(res?.payload?.token);
                onClose();
            }
        }).catch((error) => {

            console.error('Login error:', error);
            if (error && error.code === 404) {

            }
        });
    }

    return (
        <StyledModal isOpen={isOpen} onClose={onClose} title="Log In">
            <FormLayout onSubmit={(event) => {
                event.preventDefault();
                handleLogin();
            }}>

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
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
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

export default LoginForm






