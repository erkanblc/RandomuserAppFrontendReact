import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { Link, useNavigate } from "react-router-dom";
const Header = ({ onReset , isAuthenticated, setIsAuthenticated}) => {

    const navigate = useNavigate(); // 💥 bu satır eksikti!
    const [userName ,setUserName]= useState(localStorage.getItem("userName"));


    useEffect(() => {
        setUserName(localStorage.getItem("userName"));
        }, [isAuthenticated]);

useEffect(() => {
        setUserName(localStorage.getItem("userName"));
        }, []);
    const handleResetPeople = () => {
        console.log("oldu");
        setUserName(localStorage.getItem("userName"));
        onReset();
    }


    const handleLogout = () => {
        localStorage.removeItem("tokenKey");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("userName");
        setIsAuthenticated(false);
        //navigate("/"); // ✅ yönlendirme
        navigate("/user");
        window.location.reload();
    };

    
    return (
        <header className="header">
            <div className="left"></div>
            <div className="center">LIVAD</div>
            <div className="right">
                {isAuthenticated ?(<>
                <Button color="inherit" onClick={handleLogout}>{userName}</Button>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </>) : (<>
                    <Button color="inherit">
                        <Link to="/login" >Login/Register</Link>
                    </Button>
                </>)

                }


                <Button onClick={handleResetPeople}

                    variant="contained"
                    endIcon={<RotateLeftIcon
                    />}>
                    Reset
                </Button></div>
        </header>
    )
}

export default Header;
