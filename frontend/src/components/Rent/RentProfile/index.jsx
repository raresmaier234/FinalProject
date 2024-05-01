import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getRentById } from '../../../store/slices/rent/thunk';

const RentProfile = () => {
    const { id } = useParams();

    const resources = useSelector((state) => state.rent.items)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRentById({ id: id }))
    }, [])

    return (
        <>

        </>
    );
}

export default RentProfile;