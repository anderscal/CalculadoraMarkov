import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1a237e' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h6" component="div">
            Calculadora de Cadenas de Markov
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 