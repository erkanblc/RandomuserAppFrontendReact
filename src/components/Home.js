import React from 'react';
import { Box, Typography } from '@mui/material';

const Home = ({ username }) => (
  <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="80vh">
    <Typography variant="h3">Hoş geldiniz! {username}</Typography>
    <Typography variant="h6" mt={2}>Burası ana sayfa.</Typography>
  </Box>
);

export default Home; 