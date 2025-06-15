import React, { useState, useEffect } from "react";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { green, grey } from "@mui/material/colors";
import { deleteUser } from "../services/UserService";

const SingleUser = ({ user, onUserDeleted }) => {
    const tokenKey = localStorage.getItem("tokenKey");
    const currentUser = localStorage.getItem("currentUser");
    const userName = localStorage.getItem("userName");
    const [addButtonView, setAddButtonView] = useState(true);

    const userData = {
        id: user.userId,
        mail: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: "",
        password: user.password,
        pictureAdress: user.photo
    };

    const handleClick = async () => {
        try {
            await deleteUser(userData.id);
            console.log("Kullanici başariyla gönderildi.");
            if (onUserDeleted) onUserDeleted();
        } catch (err) {
            console.log("Api Hatasi", err);
        }
        setAddButtonView(false);
    };

    useEffect(() => {
        setAddButtonView(true);
    }, [user.id]);

    useEffect(() => {
        setAddButtonView(!!currentUser);
        console.log(user);
    }, []);

    return (
        <div className="single-user single-user-dark">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                <img src={userData.pictureAdress} alt="" />
                <div style={{ marginLeft: 16, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <div style={{ fontSize: '0.95em', color: '#000' }}>user id:</div>
                    <div style={{ fontWeight: 600, fontSize: '0.95em', color: '#1976d2' }}>{userData.id}</div>
                    <div style={{ fontSize: '0.75em', color: '#444' }}>
  password: {
    userData.password
      ? userData.password.length === 1
        ? userData.password + ' ...'
        : userData.password.substring(0, 2) + '...'
      : '...'
  }
</div>
                </div>
            </div>
            <div className="user-info">
                <h3>
                    {userData.firstName} {userData.lastName}
                </h3>
                <p className="user-mail">E-Mail :  {userData.mail}</p>
                <p className="user-location">22</p>
            </div>
            <div
                className={`addButton ${!addButtonView ? "disabled" : ""}`}
                onClick={addButtonView ? handleClick : undefined}
            >
                <RemoveCircleIcon
                    sx={{ color: addButtonView ? green[500] : grey[400] }}
                />
            </div>
        </div>
    );
};

export default SingleUser;