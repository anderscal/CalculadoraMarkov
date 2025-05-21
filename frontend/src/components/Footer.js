import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        py: 2,
        px: 1,
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(90deg, #1976d2 0%, #43a047 100%)',
        color: '#fff',
        textAlign: 'center',
        letterSpacing: 1,
        fontSize: '1.05rem',
        fontWeight: 500,
        boxShadow: '0 -2px 12px 0 rgba(60,72,100,0.08)',
        zIndex: 1300
      }}
    >
      <Typography variant="body1" sx={{ fontWeight: 600 }}>
        Universidad de la Amazonia &nbsp;|&nbsp; Ingeniería de Sistemas &nbsp;|&nbsp; &copy; {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer; 