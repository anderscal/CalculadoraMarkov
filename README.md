# Calculadora de Cadenas de Markov

Esta aplicación web permite realizar cálculos relacionados con Cadenas de Markov, específicamente:

1. Proyección de estados: Calcular el estado del sistema después de t pasos
2. Análisis de estados absorbentes: Identificar estados absorbentes, calcular matriz fundamental, probabilidades y tiempos esperados

## Tecnologías Utilizadas

- Frontend:
  - React
  - Material-UI (MUI)
  - Recharts para visualización
  - Axios para peticiones HTTP

- Backend:
  - Node.js
  - Express
  - mathjs para cálculos matemáticos

## Instalación

1. Clonar el repositorio
2. Instalar dependencias del backend:
   ```bash
   npm install
   ```
3. Instalar dependencias del frontend:
   ```bash
   cd frontend
   npm install
   ```

## Ejecución

1. Iniciar el servidor backend:
   ```bash
   npm start
   ```

2. Iniciar el frontend:
   ```bash
   cd frontend
   npm start
   ```

La aplicación estará disponible en:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Uso

### Proyección de Estados
1. Seleccionar "Proyección de Estados"
2. Ingresar el número de estados
3. Completar la matriz de transición
4. Ingresar el vector de estado inicial
5. Especificar el número de pasos
6. Hacer clic en "Calcular"

### Estados Absorbentes
1. Seleccionar "Estados Absorbentes"
2. Ingresar el número de estados
3. Completar la matriz de transición
4. Hacer clic en "Calcular"

## Validaciones

La aplicación realiza las siguientes validaciones:
- Todas las filas de la matriz P deben sumar 1 (matriz estocástica)
- Los valores deben estar entre 0 y 1
- El vector inicial debe tener la misma longitud que la cantidad de estados y sumar 1
- El número de pasos t debe ser positivo

## Resultados

### Proyección de Estados
- Distribución final después de t pasos
- Gráfica de barras de la distribución

### Estados Absorbentes
- Identificación de estados absorbentes
- Matriz fundamental
- Probabilidades de absorción
- Tiempos esperados en estados transitorios 