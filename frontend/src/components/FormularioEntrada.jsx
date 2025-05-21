import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import axios from 'axios';

// Configuración de axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  }
});

function FormularioEntrada({ tipoCalculo, setResultados, setError }) {
  const [numEstados, setNumEstados] = useState(3);
  const [matriz, setMatriz] = useState(Array(3).fill().map(() => Array(3).fill(0)));
  const [vectorInicial, setVectorInicial] = useState(Array(3).fill(0));
  const [pasos, setPasos] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Actualizar tamaño de matriz y vector cuando cambia numEstados
    setMatriz(Array(numEstados).fill().map(() => Array(numEstados).fill(0)));
    setVectorInicial(Array(numEstados).fill(0));
  }, [numEstados]);

  const handleMatrizChange = (row, col, value) => {
    const newMatriz = matriz.map((r, i) =>
      i === row ? r.map((c, j) => (j === col ? parseFloat(value) || 0 : c)) : r
    );
    setMatriz(newMatriz);
  };

  const handleVectorChange = (index, value) => {
    const newVector = vectorInicial.map((v, i) =>
      i === index ? parseFloat(value) || 0 : v
    );
    setVectorInicial(newVector);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const endpoint = tipoCalculo === 'proyeccion' ? '/api/proyeccion' : '/api/absorbentes';
      const data = {
        matriz,
        vector: vectorInicial,
        pasos: tipoCalculo === 'proyeccion' ? pasos : undefined
      };

      const response = await api.post(endpoint, data);
      setResultados(response.data);
    } catch (error) {
      console.error('Error completo:', error);
      if (error.response) {
        // El servidor respondió con un código de error
        setError(error.response.data?.error || 'Error en el servidor');
      } else if (error.request) {
        // La petición fue hecha pero no se recibió respuesta
        setError('No se pudo conectar con el servidor. Por favor, intente más tarde.');
      } else {
        // Algo sucedió al configurar la petición
        setError('Error al procesar la solicitud');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Número de Estados"
            type="number"
            value={numEstados}
            onChange={(e) => setNumEstados(Math.max(2, parseInt(e.target.value) || 2))}
            inputProps={{ min: 2 }}
          />
        </Grid>

        {tipoCalculo === 'proyeccion' && (
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Número de Pasos"
              type="number"
              value={pasos}
              onChange={(e) => setPasos(Math.max(1, parseInt(e.target.value) || 1))}
              inputProps={{ min: 1 }}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Matriz de Transición
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {Array(numEstados).fill().map((_, i) => (
                    <TableCell key={i} align="center">
                      Estado {i + 1}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {matriz.map((row, i) => (
                  <TableRow key={i}>
                    {row.map((cell, j) => (
                      <TableCell key={j}>
                        <TextField
                          type="number"
                          value={cell}
                          onChange={(e) => handleMatrizChange(i, j, e.target.value)}
                          inputProps={{
                            step: 0.1,
                            min: 0,
                            max: 1,
                          }}
                          size="small"
                          fullWidth
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {tipoCalculo === 'proyeccion' && (
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Vector de Estado Inicial
            </Typography>
            <Grid container spacing={2}>
              {vectorInicial.map((value, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <TextField
                    fullWidth
                    label={`Estado ${i + 1}`}
                    type="number"
                    value={value}
                    onChange={(e) => handleVectorChange(i, e.target.value)}
                    inputProps={{
                      step: 0.1,
                      min: 0,
                      max: 1,
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? 'Calculando...' : 'Calcular'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FormularioEntrada; 