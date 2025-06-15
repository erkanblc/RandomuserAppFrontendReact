import React, { useState } from "react";
import { FormControl, InputLabel, Input, Box, FormHelperText, Button } from "@mui/material";
//import { PostWithoutAuth } from "../../services/HttpService";
import { useNavigate } from "react-router-dom";

function Auth() {

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleUsername = (value) => {
        setUserName(value);
    }
    const handlePassword = (value) => {
        setPassword(value);
    }
    const handleButton = (path) => {
        sendRequest(path)
        setUserName("")
        setPassword("")
        setIsAuthenticated(true);
        navigate("/");
    }
   
    const sendRequest = (path) => {
        fetch("/api/auth/" + path, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: userName,
            password: password,
          }),
        })
          .then((res) => res.json())
          .then((result) => {   
                                console.log(result);
                                localStorage.setItem("tokenKey",result.message);
                                localStorage.setItem("currentUser",result.userId);
                                localStorage.setItem("userName",userName);
                            })
          .catch((err) => console.log(err));
      };

    return (
        <Box
            display="flex"
            justifyContent="center"
            sx={{ marginTop: "50px" }} // üstten 50px boşluk
        >
            <FormControl>
                <InputLabel >Username</InputLabel>
                <Input sx={{ border: "1px solid #90caf9", borderRadius: "4px", padding: "6px" }}
                    onChange={(i) => handleUsername(i.target.value)}></Input>
                <InputLabel style={{ marginTop: 80 }}>Password</InputLabel>
                <Input sx={{ border: "1px solid #90caf9", borderRadius: "4px", padding: "6px", marginTop: "50px" }}
                    onChange={(i) => handlePassword(i.target.value)}></Input>
                
                <FormHelperText style={{ margin: 5 }}> </FormHelperText>
                <Button variant="contained"
                    style={{
                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        color: 'white'
                    }}
                    onClick={() => handleButton("login")}
                >Login</Button>
            </FormControl></Box>
    )
}

export default Auth;