import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css'; // Importar o arquivo CSS
import Logo2 from '../Assets/logos.png'
import Logo1 from '../Assets/logo.png'
import Logo3 from '../Assets/go1.png'






const Home = () => {
    const navigate = useNavigate(); // Hook para redirecionamento

    const handleAcessar = () => {
        // Redireciona para a página da IA ao clicar no botão
        navigate('/ia');
    };



    return (
        <div className="home-container">

            <img src={Logo1} className="images1" alt="Logo1" height={55} width={248} />
            <img src={Logo2} className="images" alt="Logo2" />
            <h1 className="title-text">Insights!</h1>
            
                <div onClick={handleAcessar} className="access-button">
                    Fale com o TIA <img src={Logo3} className="icon" alt="Logo2" />
                </div>
            
        </div>
    );
};

export default Home;
