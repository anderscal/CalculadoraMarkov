import React, { useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Calculadora from './components/Calculadora';
import Footer from './components/Footer';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Azul principal
    },
    secondary: {
      main: '#43a047', // Verde acento
    },
    background: {
      default: '#f4f6f8', // Gris muy claro
      paper: '#fff',
    },
    text: {
      primary: '#222',
      secondary: '#555',
    },
  },
  typography: {
    fontFamily: 'Montserrat, Roboto, Arial',
    h3: {
      fontWeight: 700,
      letterSpacing: '-1px',
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.5px',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 4px 24px 0 rgba(60,72,100,0.08)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontSize: '1.1rem',
          padding: '10px 32px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          background: '#f9fafb',
          borderRadius: 8,
        },
      },
    },
  },
});

function App() {
  useEffect(() => {
    document.title = 'Calculadora Markov';
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Box sx={{ my: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <CalculateOutlinedIcon sx={{ fontSize: 48, color: 'primary.main', mr: 2 }} />
            <Typography variant="h3" component="h1" gutterBottom align="center" color="primary" sx={{ fontWeight: 700 }}>
              Calculadora de Cadenas de Markov
            </Typography>
          </Box>
          <Calculadora />
        </Box>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
