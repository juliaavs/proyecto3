const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Conectado a MongoDB"))
.catch((err) => console.error("Error al conectar a MongoDB:", err));

// Ejemplo de ruta
app.get("/", (req, res) => {
  res.json({ message: "API funcionando 🚀"});
});
app.get('/hola', (req,res)=>{
  res.json({mensaje: 'A mi me gustan las pastillas rojas, verdes y amarillas'});
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
