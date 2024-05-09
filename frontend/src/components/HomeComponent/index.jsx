import React, { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { Outlet } from "react-router-dom";
import Appbar from "../general-components/Navbar/index";
import StyledDatePicker from "../general-components/StyledDatePicker";
import { Search, SearchIconWrapper } from "../general-components/Navbar/index";
import SearchIcon from '@mui/icons-material/Search';
import StyledButton from "../general-components/StyledButton";
import Map from "../general-components/Map/Map";
import { StyledInputBase } from "../general-components/Navbar/index";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import useClasses from "../utils/useClasses";
import { getAvailableRents } from "../../store/slices/rent/thunk";
import GoogleMaps from "../general-components/GoogleMaps";

import homeComponentStyles from "./HomeComponentStyles";

const HomeComponent = () => {
    const classes = useClasses(homeComponentStyles, { name: "homeComponentStyles" })

    const dispatch = useDispatch()
    const [openMap, setOpenMap] = useState(false)

    const [filters, setFilters] = useState({
        startDate: null,
        endDate: null,
        searchText: null,
        location: null
    })

    const setMultipleFilters = (newFilter) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            ...newFilter
        }))
    }

    const handleSubmit = () => {
        const payload = {
            startDate: filters.startDate,
            endDate: filters.endDate,
            searchText: filters.searchText
        }

    }

    return (
        <>
            <div className={classes.wrapper}>
                <div className={classes.filterBox} onSubmit={handleSubmit}>
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
                    <StyledDatePicker className={classes.datePicker}
                        label="start date"
                        onChange={(e) => {
                            setMultipleFilters({
                                startDate: e.format("YYYY/MM/DD")
                            })
                        }}>
                    </StyledDatePicker>
                    <StyledDatePicker label="end date" className={classes.datePicker}
                        onChange={(e) => {
                            setMultipleFilters({
                                endDate: e.format("YYYY/MM/DD")
                            })
                        }}>
                    </StyledDatePicker>
                    <GoogleMaps onChange={(e) => e !== null ?
                        setMultipleFilters({ location: e.description }) : setMultipleFilters({ location: null })} />
                    <Link to="/trips">
                        <StyledButton type="submit">Search</StyledButton>
                    </Link>
                    <StyledButton onClick={() => { setOpenMap(true) }}>Map</StyledButton>
                    <Map isOpen={openMap} onClose={() => { setOpenMap(false) }} />
                </div>
                <Outlet></Outlet>
            </div>

        </>
    )
}

export default HomeComponent;