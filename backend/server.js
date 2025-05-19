// server.js
const fs = require('fs');
const https = require('https');
const http = require('http'); // Opcional: para redirección
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/routes');
const path = require('path');

const app = express();
const HTTPS_PORT = 3443; // Puerto seguro
const HTTP_PORT = 3001; // Puerto opcional si quieres redirigir desde HTTP

// Certificados SSL (autofirmados o reales)
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, 'ssl', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'ssl', 'cert.pem'))
};

// Middleware
app.use(cors({
  origin: 'https://localhost', // Ajusta si usas un dominio diferente
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', router);

// MongoDB
mongoose.connect('mongodb://localhost:27017/ProyectoFinal', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB conectado'))
.catch((err) => console.error('Error de conexión a MongoDB:', err));

// Iniciar servidor HTTPS
https.createServer(sslOptions, app).listen(HTTPS_PORT, () => {
  console.log(`Servidor HTTPS corriendo en https://localhost`);
});

// (Opcional) Redirección de HTTP a HTTPS
http.createServer((req, res) => {
  res.writeHead(301, { "Location": "https://" + req.headers.host + req.url });
  res.end();
}).listen(HTTP_PORT, () => {
  console.log(`Redireccionando HTTP desde http://localhost:${HTTP_PORT}`);
});

