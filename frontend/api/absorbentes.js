import { create, all } from 'mathjs';

const math = create(all);

function validarMatrizEstocastica(matriz) {
    return matriz.every(fila => {
        const suma = fila.reduce((a, b) => a + b, 0);
        return Math.abs(suma - 1) < 1e-10 && fila.every(valor => valor >= 0 && valor <= 1);
    });
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }
    try {
        const { matriz } = req.body;
        if (!validarMatrizEstocastica(matriz)) {
            return res.status(400).json({ error: 'La matriz no es estocástica' });
        }
        const estadosAbsorbentes = matriz.map((fila, i) => {
            return fila[i] === 1 && fila.every((val, j) => j === i || val === 0);
        });
        const n = matriz.length;
        const absorbentes = estadosAbsorbentes.map((esAbsorbente, i) => ({ esAbsorbente, indice: i }));
        const ordenados = [...absorbentes].sort((a, b) => (a.esAbsorbente === b.esAbsorbente) ? 0 : a.esAbsorbente ? 1 : -1);
        const matrizReordenada = ordenados.map(o => ordenados.map(p => matriz[o.indice][p.indice]));
        const numTransitorios = estadosAbsorbentes.filter(x => !x).length;
        const Q = matrizReordenada.slice(0, numTransitorios).map(fila => fila.slice(0, numTransitorios));
        const I = math.identity(numTransitorios);
        const N = math.inv(math.subtract(I, Q));
        const R = matrizReordenada.slice(0, numTransitorios).map(fila => fila.slice(numTransitorios));
        const B = math.multiply(N, R);
        const unos = math.ones(numTransitorios, 1);
        const t = math.multiply(N, unos);
        const tiemposEsperados = t.toArray().map(row => row[0]);
        res.status(200).json({
            estadosAbsorbentes,
            matrizReordenada,
            matrizFundamental: N.toArray(),
            probabilidadesAbsorcion: B.toArray(),
            tiemposEsperados
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
} 