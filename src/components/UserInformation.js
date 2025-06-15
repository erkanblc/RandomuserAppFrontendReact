import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserInformation = ({ username }) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/home');
  };

  return (
    <Box p={2} minWidth={200} display="flex" flexDirection="column" alignItems="flex-start">
      <Typography variant="h6" mb={2}>{username} hoşgeldiniz!</Typography>
      <Button variant="text" onClick={handleHomeClick}>Home</Button>
    </Box>
  );
};

export default UserInformation; 