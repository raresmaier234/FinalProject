import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getAvailableRents } from "../../store/slices/rent/thunk";
import useClasses from "../utils/useClasses";
import CardRent from "./CardRent";
import rentComponentStyles from "./RentComponentStyles";
import Map from "../general-components/Map/Map";
import StyledButton from "../general-components/StyledButton";

const RentComponent = () => {
    const classes = useClasses(rentComponentStyles, { name: "rentComponentStyles" });
    const rents = useSelector((state) => state.rent.items || []);
    const dispatch = useDispatch();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const [openMap, setOpenMap] = useState(false);

    useEffect(() => {
        const filter = {
            location: searchParams.get("location"),
            startDate: searchParams.get("startDate"),
            endDate: searchParams.get("endDate"),
            rooms: searchParams.get("rooms"),
            adults: searchParams.get("adults"),
            children: searchParams.get("children")
        };
        dispatch(getAvailableRents({ payload: filter }));
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
                        photos={rent.photoUrls}
                        type={rent.type}
                    />
                ))}
            </div>
        </>


    );
};

export default RentComponent;