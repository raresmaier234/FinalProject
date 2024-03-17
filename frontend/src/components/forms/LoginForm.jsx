import { Axios } from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie"

import { TextField } from '@mui/material'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link';

import StyledButton from "../general-components/StyledButton";
import StyledModal from "../general-components/StyledModal";
import FormLayout from "../../containers/FormLayout";

const LoginForm = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [cookies, setCookies] = useCookies("name", "id")


    const onCloseModal = () => {

    }


    const handleLogin = () => {
        let data;
        const options = {
            url: "/auth/login",
            method: "POST",
            data: data
        };
        Axios(options).then((res) => {
            const rspData = res.data

        })
    }
    return (
        <StyledModal isOpen={isOpen} onClose={onClose} title="Sign In">
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
                <StyledButton type="submit"> Save</StyledButton>
                <StyledButton onClick={onClose}> Exit </StyledButton>
            </FormLayout>
        </StyledModal>
    );
}

export default LoginForm






