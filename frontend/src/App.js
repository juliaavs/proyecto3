import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [mensaje, setMensaje] = useState('Conectando con el backend...');

  useEffect(() => {
    axios.get('http://localhost:3000/')
      .then(response => {
        setMensaje(response.data.mensaje);
      })
      .catch(error => {
        setMensaje('❌ Error al conectar con el backend');
        console.error(error);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;

