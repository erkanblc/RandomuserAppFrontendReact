import React, { useState, useEffect } from "react";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { green, grey } from "@mui/material/colors";

const SingleUser = ({ user, resetSignal }) => {

    const tokenKey = localStorage.getItem("tokenKey");
    const currentUser = localStorage.getItem("currentUser");
    const userName = localStorage.getItem("userName");

    const [addButtonView, setAddButtonView] = useState(false);

    console.log("SingleUser'a gelen props:", user);

    const handleClick = () => {
        console.log(user);
        setAddButtonView(false);
    };
    useEffect(() => {
        setAddButtonView(true);
    }, [resetSignal]);

    useEffect(() => {
        console.log(currentUser)
        setAddButtonView(!currentUser);
    },[]);
    return (
        <div className="single-user">
            <img src={user.picture.large} alt="" />

            <div className="user-info">
                <h3>
                    {user.name.first}{user.name.last}
                </h3>
                <p className="user-mail">E-Mail :  {user.email}</p>
                <p className="user-location">{user.location.country}|{user.location.city}</p>
            </div>
            <div
                className={`addButton ${!addButtonView ? "disabled" : ""}`}
                onClick={addButtonView ? handleClick : undefined}
            >
                <AddCircleIcon
                    sx={{ color: addButtonView ? green[500] : grey[400] }}
                    onClick={handleClick}
                />
            </div>
        </div>
    );
};

export default SingleUser;