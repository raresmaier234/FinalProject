import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import ButtonWithHover from "../Button";
import { Box } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Map from "./Map";


function SearchBar() {
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
                                <ButtonWithHover label="Search" st="btnNoMargin" />
                            </InputAdornment>
                            <InputAdornment position="end">
                                <Map>

                                </Map>
                            </InputAdornment>
                        </>

                    ),
                }}
            />
        </Box>
    );
}

export default SearchBar;