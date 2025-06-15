import React from 'react';
import { Box, Typography } from '@mui/material';

const FirstPage = ({ username }) => (
  <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="80vh">
    <Typography variant="h3">
      Uygulamaya Hoş Geldiniz!{username ? ` ${username}` : ''}
    </Typography>
    <Typography variant="h6" mt={2}>Lütfen giriş yapınız veya devam etmek için Login'e tıklayınız.</Typography>
  </Box>
);

export default FirstPage; 