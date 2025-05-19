import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './UserDashboard.css';

ChartJS.register(ArcElement, Tooltip, Legend);



const UserDashboard = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [peliculas, setPeliculas] = useState([]);
  const [generosData, setGenerosData] = useState(null);

  // Cargar datos del usuario
  useEffect(() => {
    const id = sessionStorage.getItem('usuarioId');
    if (!id) {
      navigate('/');
      return;
    }

    setUsuario({
      nombre: sessionStorage.getItem('usuarioName') || 'Usuario',
      id,
      email: sessionStorage.getItem('usuarioEmail') || 'Desconocido',
    });
  }, [navigate]);

  // Cargar películas y procesar géneros
  useEffect(() => {
    if (!usuario?.id) return;

    fetch(`https://localhost:3001/api/peliculas?usuarioId=${usuario.id}`)
      .then((res) => res.json())
      .then((data) => {
        setPeliculas(data);
        calcularGeneros(data);
      })
      .catch((err) => console.error('Error al obtener películas:', err));
  }, [usuario]);

  const calcularGeneros = (peliculas) => {
    const generos = {};
    peliculas.forEach((peli) => {
      generos[peli.genero] = (generos[peli.genero] || 0) + 1;
    });

    setGenerosData({
      labels: Object.keys(generos),
      datasets: [
        {
          label: 'Películas por Género',
          data: Object.values(generos),
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56',
            '#4BC0C0', '#9966FF', '#FF9F40',
          ],
          hoverBackgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56',
            '#4BC0C0', '#9966FF', '#FF9F40',
          ],
        },
      ],
    });
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: 'white',
          font: { size: 14 },
        },
      },
    },
  };

  // NO renderices nada hasta que `usuario` esté listo
  if (!usuario) return <p>Cargando usuario...</p>;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Bienvenido, {usuario.nombre}</h1>
      <div className="dashboard-content">
        <div className="user-info">
          <h2>Información del Usuario</h2>
          <p><strong>Nombre:</strong> {usuario.nombre}</p>
          <p><strong>Correo Electrónico:</strong> {usuario.email}</p>
          <p><strong>Total de Películas Vistas:</strong> {peliculas.length}</p>
        </div>
        <div className="charts">
          <h2>Películas por Género</h2>
          {generosData && generosData.labels.length > 0 ? (
            <Pie data={generosData} options={chartOptions} />
          ) : (
            <p>No hay datos de películas aún.</p>
          )}
        </div>
      </div>
      <button className="btn-home" onClick={() => navigate('/home')}>
      Volver a la Página Principal
      </button>
    </div>
    
  );
};

export default UserDashboard;
