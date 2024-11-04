import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import '../styles/Home.css';

import Logo2 from '../Assets/ti.png';
import Logo1 from '../Assets/logo.png';

const Home = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const handleFreeTrial = () => {
        navigate('/teste-gratis');
    };

    return (
        <div className="home-container">
            <img src={Logo1} className="images1" alt="Logo1" height={30} width={180} />
            <img src={Logo2} className="images" alt="Logo2" />
            <div>
                <h1>
                    <TypeAnimation className="title-text"
                        sequence={[
                            'Inteligência Artificial',
                            1000,
                            'Insights Instantâneos',
                            1000,
                            'Análises Inteligentes',
                            1000,
                            'Resoluções Assertivas',
                            1000,
                        ]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                    />
                </h1>
            </div>
            <div className="button-container">
                <button onClick={handleLogin} className="login-button">Fazer Login</button>
                <button onClick={handleFreeTrial} className="trial-button">Teste Grátis</button>
            </div>
        </div>
    );
};

export default Home;
