import React, { useState } from 'react';
import { Box, Paper, Tabs, Tab, Typography } from '@mui/material';
import FormularioEntrada from './FormularioEntrada';
import Resultados from './Resultados';

function Calculadora() {
  const [tipoCalculo, setTipoCalculo] = useState('proyeccion');
  const [resultados, setResultados] = useState(null);
  const [error, setError] = useState(null);

  const handleChangeTipo = (event, newValue) => {
    setTipoCalculo(newValue);
    setResultados(null);
    setError(null);
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tipoCalculo} onChange={handleChangeTipo}>
          <Tab label="Proyección de Estados" value="proyeccion" />
          <Tab label="Estados Absorbentes" value="absorbentes" />
        </Tabs>
      </Box>

      <FormularioEntrada 
        tipoCalculo={tipoCalculo}
        setResultados={setResultados}
        setError={setError}
      />

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {resultados && (
        <Resultados 
          resultados={resultados}
          tipoCalculo={tipoCalculo}
        />
      )}
    </Paper>
  );
}

export default Calculadora; 