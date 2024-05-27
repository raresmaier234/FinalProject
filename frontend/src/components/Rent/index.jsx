import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getAllRents } from "../../store/slices/rent/thunk";
import useClasses from "../utils/useClasses";
import CardRent from "./CardRent";
import rentComponentStyles from "./RentComponentStyles";
import { useAuth } from "../../providers/AuthProvider";
import { getUserByEmail } from "../../store/slices/user/thunk";

const RentComponent = () => {
    const classes = useClasses(rentComponentStyles, { name: "rentComponentStyles" });
    const rents = useSelector((state) => state.rent.items || []);
    const dispatch = useDispatch();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const userInfo = useSelector((state) => state.user.user);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            dispatch(getUserByEmail({ email: user }));
        }
    }, [user, dispatch]);

    useEffect(() => {
        const filter = {
            location: searchParams.get("location"),
            startDate: searchParams.get("startDate"),
            endDate: searchParams.get("endDate"),
            rooms: searchParams.get("rooms"),
            adults: searchParams.get("adults"),
            children: searchParams.get("children")
        };
        dispatch(getAllRents({}));
        console.log(rents)
    }, [dispatch]);

    return (
        <>
            <div className={classes.wrapper}>

                {Array.isArray(rents) && rents.map((rent) => (
                    <CardRent
                        key={rent.id}
                        id={rent.id}
                        name={rent.name}
                        description={rent.description}
                        price={rent.price}
                        location={rent.location}
                        photos={rent.photos}
                        type={rent.type}
                        nrOfPersons={rent.nrOfPersons}
                        averageRating={rent.averageRating}
                    />
                ))}
            </div>
        </>


    );
};

export default RentComponent;