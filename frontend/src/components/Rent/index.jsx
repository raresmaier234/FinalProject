// RentComponent.js

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAvailableRents } from "../../store/slices/rent/thunk";

import useClasses from "../utils/useClasses";
import CardRent from "./CardRent";
import Appbar from "../general-components/Navbar";
import rentComponentStyles from "./RentComponentStyles";

const RentComponent = ({ filter }) => {
    const classes = useClasses(rentComponentStyles, { name: "rentComponentStyles" });
    const rents = useSelector((state) => state.rent.items || []);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAvailableRents({ payload: filter }));
    }, []);

    return (
        <>
            <Appbar></Appbar>
            <div className={classes.wrapper}>
                {Array.isArray(rents) && rents.map((rent) => (
                    <CardRent
                        key={rent.id}
                        id={rent.id}
                        name={rent.name}
                        description={rent.description}
                        price={rent.price}
                        location={rent.location}
                        photos={rent.photoUrls}
                    />
                ))}
            </div>
        </>

    );
};

export default RentComponent;
