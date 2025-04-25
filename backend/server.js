// server.js
const express = require('express');
const cors = require('cors');
<<<<<<< HEAD
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const users = []; // aquí se guardan usuarios temporalmente

app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'El usuario ya existe' });
  }

  users.push({ name, email, password });
  res.json({ message: 'PRRRRRRR Bicus Dicus De Bicus De Dicus' });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  res.json({ message: `Bienvenido, ${user.name}` });
});

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
=======
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Para evitar el error de CORS
app.use(express.json()); // Para manejar JSON en las peticiones

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Backend funcionando correctamente');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
>>>>>>> ddd8bec (cambios)
