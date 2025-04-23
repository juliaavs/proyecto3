import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [mensaje, setMensaje] = useState(""); // Estado reactivo para el mensaje

  useEffect(() => {
    // Llamada al backend cuando se monta el componente
    axios.get("http://localhost:5000/hola")
      .then((response) => {
        setMensaje(response.data.mensaje); // Actualiza el estado con la respuesta
      })
      .catch((error) => console.error("Error al llamar a la API:", error));
  }, []); // El array vacío [] asegura que solo se ejecute una vez

  return (
    <div>
      <h1>Naboo</h1>
      <p>{mensaje}</p> {/* Esto se renderiza con el valor del estado */}
    </div>
  );
}

export default App;
