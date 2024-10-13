import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Importar o arquivo CSS
import Logo2 from '../Assets/image1.png'
import Logo1 from '../Assets/logo.png'
import { FaArrowCircleRight } from "react-icons/fa";





const Home = () => {
    const navigate = useNavigate(); // Hook para redirecionamento

    const handleAcessar = () => {
        // Redireciona para a página da IA ao clicar no botão
        navigate('/ia');
    };



    return (
        <div className="home-container">

            <img src={Logo1} className="images" alt="Logo1" height={55} width={248}/>
            <img src={Logo2} className="images" alt="Logo2" height={390} width={797}/>
            <h1 className="title-text">O futuro do direito a um toque!</h1>
            <button onClick={handleAcessar} className="access-button">
                Iniciar experiência <FaArrowCircleRight  className='icon-button'/>
            </button>
        </div>
    );
};

export default Home;
