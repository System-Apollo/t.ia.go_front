import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation'
import '../styles/Home.css'; // Importar o arquivo CSS

import Logo2 from '../Assets/ti.png'
import Logo1 from '../Assets/logo.png'
import Logo3 from '../Assets/go1.png'






const Home = () => {
    const navigate = useNavigate();

    const handleAcessar = () => {
        // Redireciona para a página da IA ao clicar no botão
        navigate('/ia');
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
                        wrapper='span'
                        speed={50}
                        repeat={Infinity}

                    />
                </h1>
            </div>
            {/* <h1 className="title-text">Insights!</h1> */}

            <div onClick={handleAcessar} className="uiverse">
                {/* <span class="tooltip">Chamar o TIAGO</span> */}
                <span>
                Iniciar Análise
                </span>
                {/* <span class="top-key"></span>
                <span class="text">Iniciar Análise</span>
                <span class="bottom-key-1"></span>
                <span class="bottom-key-2"></span> */}
                {/* Fale com o TIA <img src={Logo3} className="icon" alt="Logo2" /> */}
            </div>

        </div>
    );
};

export default Home;
