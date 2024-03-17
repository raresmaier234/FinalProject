import { React } from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Map from "./Map";
import StyledButton from "../StyledButton/index"

const SearchBar = (props) => {
    return (
        <Box
            sx={{

                paddingTop: "50px",
                display: "flex"
            }}
        >
            <TextField
                sx={{
                    margin: "auto",
                    width: "50%"
                }}
                placeholder="Places to go..."
                InputProps={{
                    endAdornment: (
                        <>
                            <InputAdornment position="end">
                                <StyledButton>Search</StyledButton>
                            </InputAdornment>
                            <InputAdornment position="end">
                                <Map />
                            </InputAdornment>
                        </>

                    ),
                }}
            />
        </Box>
    );
}

export default SearchBar;