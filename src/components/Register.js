import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createUser } from "../services/UserService";

const Register = ({ onRegister }) => {
  const [form, setForm] = useState({
    mail: '',
    firstName: '',
    lastName: '',
    middleName: '',
    isActive: false,
    password: '',
    pictureAdress: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Boş alan kontrolü (middleName hariç)
    if (!form.mail || !form.firstName || !form.lastName || !form.password) {
      setError('Lütfen tüm zorunlu alanları doldurun!');
      return;
    }
    try {
    const results = await createUser(form);
    if (onRegister) onRegister(results); // opsiyonel: kullanıcı üst bileşene bilgi göndermek isterse
    navigate('/login');
  } catch (err) {
    setError("Kayıt sırasında hata oluştu!");
    console.error(err);
  }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="80vh">
      <Typography variant="h4" mb={2}>Register</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: 350 }}>
        <TextField
          label="E-Mail"
          name="mail"
          variant="outlined"
          fullWidth
          margin="normal"
          value={form.mail}
          onChange={handleChange}
        />
        <TextField
          label="Ad (First Name)"
          name="firstName"
          variant="outlined"
          fullWidth
          margin="normal"
          value={form.firstName}
          onChange={handleChange}
        />
        <TextField
          label="Soyad (Last Name)"
          name="lastName"
          variant="outlined"
          fullWidth
          margin="normal"
          value={form.lastName}
          onChange={handleChange}
        />
        <TextField
          label="İkinci Ad (Middle Name)"
          name="middleName"
          variant="outlined"
          fullWidth
          margin="normal"
          value={form.middleName}
          onChange={handleChange}
        />
        <TextField
          label="Şifre (Password)"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={form.password}
          onChange={handleChange}
        />
        <TextField
          label="Picture Adress"
          name="pictureAdress"
          variant="outlined"
          fullWidth
          margin="normal"
          value={form.pictureAdress}
          onChange={handleChange}
        />
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Kayıt Ol
        </Button>
      </Box>
    </Box>
  );
};

export default Register; 