import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Appbar from "../general-components/Navbar/index";
import ImageSlider from "../general-components/ImageSlider/index"

import useClasses from "../utils/useClasses";

import homeComponentStyles from "./HomeComponentStyles";

const HomeComponent = () => {
    const classes = useClasses(homeComponentStyles, { name: "homeComponentStyles" })

    return (
        <>
            <div className={classes.wrapper}>
                <Appbar></Appbar>
                <ImageSlider />
                <Outlet></Outlet>
            </div>

        </>
    )
}

export default HomeComponent;