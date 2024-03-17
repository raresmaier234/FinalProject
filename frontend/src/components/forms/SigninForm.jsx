import { useState } from 'react'

import { createTheme } from '@mui/material/styles';

import StyledButton from '../general-components/StyledButton';
import StyledModal from '../general-components/StyledModal';
import FormLayout from '../../containers/FormLayout';

const SigninForm = ({ isOpen, onClose }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const defaultTheme = createTheme();

    const onCloseModal = () => {

    }

    const handleSave = () => {
        console.log(username)
        console.log(password)
        onClose()
    }

    return (
        <StyledModal isOpen={isOpen} onClose={onClose} title="Sign In">
            <FormLayout onSubmit={(event) => {
                event.preventDefault();
                handleSave();
            }}>

                <StyledButton type="submit"> Save</StyledButton>
                <StyledButton onClick={onClose}> Exit </StyledButton>
            </FormLayout>
        </StyledModal>
    );
}

export default SigninForm





