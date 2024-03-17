import React from "react";
import { Outlet } from "react-router-dom";
import Appbar from "../general-components/Navbar/index";
import SearchBar from '../general-components/SearchBar/SearchBar'

const HomeComponent = () => {
    return (
        <>
            <Appbar></Appbar>
            <SearchBar />
            {/* <ImageSlider /> */}
            <Outlet></Outlet>
        </>
    )
}

export default HomeComponent;