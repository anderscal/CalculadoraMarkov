import { create, all } from 'mathjs';

const math = create(all);

function validarMatrizEstocastica(matriz) {
    return matriz.every(fila => {
        const suma = fila.reduce((a, b) => a + b, 0);
        return Math.abs(suma - 1) < 1e-10 && fila.every(valor => valor >= 0 && valor <= 1);
    });
}

function validarVectorInicial(vector, n) {
    const suma = vector.reduce((a, b) => a + b, 0);
    return vector.length === n && Math.abs(suma - 1) < 1e-10 && vector.every(valor => valor >= 0 && valor <= 1);
}

export default async function handler(req, res) {
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(200).end();
    }
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }
    let body = req.body;
    if (!body || Object.keys(body).length === 0) {
        try {
            body = JSON.parse(await new Promise((resolve) => {
                let data = '';
                req.on('data', chunk => data += chunk);
                req.on('end', () => resolve(data));
            }));
        } catch (e) {
            return res.status(400).json({ error: 'No se pudo leer el body' });
        }
    }
    try {
        const { matriz, vector, pasos } = body;
        if (!validarMatrizEstocastica(matriz)) {
            return res.status(400).json({ error: 'La matriz no es estocástica' });
        }
        if (!validarVectorInicial(vector, matriz.length)) {
            return res.status(400).json({ error: 'El vector inicial no es válido' });
        }
        const P = math.matrix(matriz);
        const P_t = math.pow(P, pasos);
        const resultado = math.multiply(vector, P_t);
        res.status(200).json({
            matrizResultante: P_t.toArray(),
            distribucionFinal: resultado.toArray()
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
} 