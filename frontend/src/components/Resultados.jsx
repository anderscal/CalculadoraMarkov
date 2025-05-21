import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function conclusionesProyeccion(resultados, pasos) {
  const dist = resultados.distribucionFinal;
  const maxProb = Math.max(...dist);
  const maxIdx = dist.findIndex(p => p === maxProb);
  return (
    <Box sx={{ my: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
        Después de {pasos} pasos:
      </Typography>
      {dist.map((p, i) => (
        <Typography key={i}>
          La probabilidad de estar en el estado {i + 1} es del {(p * 100).toFixed(2)}%.
        </Typography>
      ))}
      <Typography sx={{ mt: 1, color: 'primary.main', fontWeight: 600 }}>
        El estado con mayor probabilidad es el estado {maxIdx + 1} ({(maxProb * 100).toFixed(2)}%).
      </Typography>
    </Box>
  );
}

function conclusionesAbsorbentes(resultados) {
  const absorbentes = resultados.estadosAbsorbentes
    .map((esAbs, i) => esAbs ? i + 1 : null)
    .filter(x => x !== null);
  const transitorios = resultados.estadosAbsorbentes
    .map((esAbs, i) => !esAbs ? i : null)
    .filter(x => x !== null);
  const frases = [];
  absorbentes.forEach(e => {
    frases.push(`El estado ${e} es absorbente. Una vez se entra, no se sale.`);
  });
  resultados.probabilidadesAbsorcion?.forEach((fila, i) => {
    const maxProb = Math.max(...fila);
    const maxIdx = fila.findIndex(p => p === maxProb);
    frases.push(`Desde el estado ${transitorios[i] + 1}, la mayor probabilidad de absorción es en el estado ${absorbentes[maxIdx]} (${(maxProb * 100).toFixed(2)}%).`);
  });
  resultados.tiemposEsperados?.forEach((t, i) => {
    const valor = Array.isArray(t) ? t[0] : t;
    frases.push(`El tiempo esperado para ser absorbido desde el estado ${transitorios[i] + 1} es de ${valor.toFixed(2)} pasos.`);
  });
  return (
    <Box sx={{ my: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
        Conclusiones:
      </Typography>
      {frases.map((f, i) => (
        <Typography key={i}>{f}</Typography>
      ))}
    </Box>
  );
}

function Resultados({ resultados, tipoCalculo }) {
  const renderProyeccion = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {conclusionesProyeccion(resultados, resultados.matrizResultante?.length || 1)}
        <Typography variant="h6" gutterBottom>
          Distribución Final
        </Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                {resultados.distribucionFinal.map((_, i) => (
                  <TableCell key={i} align="center">
                    Estado {i + 1}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {resultados.distribucionFinal.map((valor, i) => (
                  <TableCell key={i} align="center">
                    {valor.toFixed(4)}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Gráfica de Distribución
        </Typography>
        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={resultados.distribucionFinal.map((valor, i) => ({
                estado: `Estado ${i + 1}`,
                probabilidad: valor,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="estado" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="probabilidad" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Grid>
    </Grid>
  );

  const renderAbsorbentes = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {conclusionesAbsorbentes(resultados)}
        <Typography variant="h6" gutterBottom>
          Estados Absorbentes
        </Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Estado</TableCell>
                <TableCell align="center">¿Es Absorbente?</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resultados.estadosAbsorbentes.map((esAbsorbente, i) => (
                <TableRow key={i}>
                  <TableCell>Estado {i + 1}</TableCell>
                  <TableCell align="center">
                    {esAbsorbente ? 'Sí' : 'No'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Matriz Fundamental
        </Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                {resultados.matrizFundamental[0].map((_, i) => (
                  <TableCell key={i} align="center">
                    Estado {i + 1}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {resultados.matrizFundamental.map((fila, i) => (
                <TableRow key={i}>
                  {fila.map((valor, j) => (
                    <TableCell key={j} align="center">
                      {valor.toFixed(4)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Probabilidades de Absorción
        </Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                {resultados.probabilidadesAbsorcion[0].map((_, i) => (
                  <TableCell key={i} align="center">
                    Estado Absorbente {i + 1}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {resultados.probabilidadesAbsorcion.map((fila, i) => (
                <TableRow key={i}>
                  {fila.map((valor, j) => (
                    <TableCell key={j} align="center">
                      {valor.toFixed(4)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Tiempos Esperados
        </Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Estado Transitorio</TableCell>
                <TableCell align="center">Tiempo Esperado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resultados.tiemposEsperados.map((tiempo, i) => (
                <TableRow key={i}>
                  <TableCell>Estado {i + 1}</TableCell>
                  <TableCell align="center">
                    {Array.isArray(tiempo) ? tiempo[0].toFixed(4) : tiempo.toFixed(4)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Resultados
      </Typography>
      {tipoCalculo === 'proyeccion' ? renderProyeccion() : renderAbsorbentes()}
    </Box>
  );
}

export default Resultados; 