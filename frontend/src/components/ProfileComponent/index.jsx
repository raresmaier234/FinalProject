import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Appbar from "../general-components/Navbar/index";
import ImageSlider from "../general-components/ImageSlider/index"

import useClasses from "../utils/useClasses";


const ProfileComponent = () => {

    return (
        <>
            <div>
                <Appbar></Appbar>
                <Outlet></Outlet>
            </div>
        </>
    )
}

export default ProfileComponent;