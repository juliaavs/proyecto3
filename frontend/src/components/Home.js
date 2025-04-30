import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const userName = sessionStorage.getItem('userName') || 'Usuario';

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1 style={{ fontSize: '2em', color: '#333' }}>Bienvenido, {userName}</h1>
            <p style={{ fontSize: '1.2em', color: '#555' }}>¡Explora nuestra colección de películas!</p>
           
        </div>
    );
};

export default Home;