import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Alert, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin, username }) => {
  const [usernamee, setUsernamee] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const deleteLocalStorageDaten =() => {
        localStorage.removeItem("tokenKey");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("userName");
        setUsernamee(null);
        setPassword(null);
  }
  const sendRequest = async () => {
  try {
    console.log(usernamee , " " ,password);
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: usernamee,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error("Login başarısız");
    }

    const result = await response.json();

    localStorage.setItem("tokenKey", result.message);
    localStorage.setItem("currentUser", result.userId);
    localStorage.setItem("userName", usernamee);
    onLogin(usernamee); // doğru isim bu çünkü input değeri


    console.log("Login başarılı:", result);
  } catch (err) {
    console.error("Hata:", err);
    deleteLocalStorageDaten();
  }
};

  const handleSubmit = (e) => {
    sendRequest();
    setUsernamee(null);
    setPassword(null);
    console.log(localStorage.getItem("tokenKey"));
    console.log(localStorage.getItem("currentUser"));
    console.log(localStorage.getItem("userName"));
    if(localStorage.getItem("tokenKey") !== null){
      onLogin(username);
    }else{
      deleteLocalStorageDaten();
    }
    navigate("/");


    /*e.preventDefault();
    if (username === 'admin' && password === '1234') {
      localStorage.setItem('token', 'dummy-token');
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      onLogin(username);
      navigate('/home');
    } else {
      setError('Kullanıcı adı veya şifre hatalı!');
    }*/
  };

  const handleRegister = () => {
    navigate('/register');
  };
  
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="80vh">
      <Typography variant="h4" mb={2}>Login</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: 300 }}>
        <TextField
          label="Kullanici Adi"
          variant="outlined"
          fullWidth
          margin="normal"
          value={usernamee}
          onChange={e => setUsernamee(e.target.value)}
        />
        <TextField
          label="Şifre"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Giriş Yap
          </Button>
          <Button variant="outlined" color="secondary" fullWidth onClick={handleRegister}>
            Register
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Login; 