const corsOptions = {
  origin: ['http://localhost:3000', 'https://calculadora-markov.vercel.app'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true
};

module.exports = corsOptions; 