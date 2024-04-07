import React, { useState } from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Appbar from "../general-components/Navbar/index";
import ImageSlider from "../general-components/ImageSlider/index"
import StyledDatePicker from "../general-components/StyledDatePicker";
import { Search, SearchIconWrapper } from "../general-components/Navbar/index";
import SearchIcon from '@mui/icons-material/Search';
import StyledButton from "../general-components/StyledButton";
import Map from "../general-components/Map/Map";
import { StyledInputBase } from "../general-components/Navbar/index";

import useClasses from "../utils/useClasses";

import homeComponentStyles from "./HomeComponentStyles";

const HomeComponent = () => {
    const classes = useClasses(homeComponentStyles, { name: "homeComponentStyles" })

    const [openMap, setOpenMap] = useState(false)

    const [filters, setFilters] = useState({
        startDate: null,
        endDate: null,
        searchText: null,
    })

    const setMultipleFilters = (newFilter) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            ...newFilter
        }))
    }

    return (
        <>
            <div className={classes.wrapper}>
                <Appbar></Appbar>
                <div className={classes.datePicker}>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(e) => {
                                setMultipleFilters({
                                    searchText: e.target.value
                                })
                            }}
                        />

                    </Search>
                    <StyledDatePicker
                        label="start date"
                        onChange={(e) => {
                            setMultipleFilters({
                                startDate: e.format("YYYY/MM/DD")
                            })
                        }}>
                    </StyledDatePicker>
                    <StyledDatePicker label="end date"
                        onChange={(e) => {
                            setMultipleFilters({
                                endDate: e.format("YYYY/MM/DD")
                            })
                        }}>
                    </StyledDatePicker>
                    <StyledButton>Search</StyledButton>
                    <StyledButton onClick={() => { setOpenMap(true) }}>Map</StyledButton>
                    <Map isOpen={openMap} onClose={() => { setOpenMap(false) }} />
                </div>
                <ImageSlider />
                <Outlet></Outlet>
            </div>

        </>
    )
}

export default HomeComponent;