import React from "react";
import { Outlet } from "react-router-dom";
import Appbar from "../components/Navbar/Appbar";
import SignIn from '../components/Navbar/SignIn'
import SearchBar from "../components/SearchBar/SearchBar";
import Box from '@mui/material/Box';
import Map from '../components/SearchBar/Map'
import ImageSlider from "../components/ImageSlider";

const Layout = () => {
    return (
        <>
            <Appbar></Appbar>
            <SearchBar />
            <ImageSlider />
            <Outlet></Outlet>
        </>
    )
}

export default Layout;