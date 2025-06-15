import React, { useState, useEffect } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { green, grey } from "@mui/material/colors";
import { createUser } from "../services/UserService";

const SingleUser = ({ user, resetSignal }) => {
    const tokenKey = localStorage.getItem("tokenKey");
    const [addButtonView, setAddButtonView] = useState(!!tokenKey);

    const handleClick = async () => {
        const userData ={
            mail: user.email,
            firstName:user.name.first,
            lastName:user.name.last,
            middleName:"",
            isActive: false,
            password:user.login.password,
            pictureAdress:user.picture.large
        };
        try{
            await createUser(userData);
            console.log(userData)
            console.log("Kullanici başariyla gönderildi.");
        }catch(err){
            console.log("Api Hatasi" , err);
        }
        setAddButtonView(false);
    };

    useEffect(() => {
        setAddButtonView(!!localStorage.getItem("tokenKey"));
    }, [resetSignal]);

    return (
        <div className="single-user single-user-dark">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                <img src={user.picture.large} alt="" />
                <div style={{ marginLeft: 16, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <div style={{ fontSize: '0.95em', color: '#000' }}>username:</div>
                    <div style={{ fontWeight: 600,fontSize: '0.95em', color: '#1976d2' }}>{user.login.username}</div>
                    <div style={{ fontSize: '0.75em', color: '#444' }}>password : {user.login.password}</div>
                </div>
            </div>
            <div className="user-info">
                <h3>
                    {user.name.first} {user.name.last}
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
                />
            </div>
        </div>
    );
};

export default SingleUser;