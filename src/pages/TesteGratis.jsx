import React from 'react';
import '../styles/TesteGratis.css';
import Logo from '../Assets/TiagoLogo.png'

const TesteGratis = () => {
    return (
        <div className="trial-container">
            <div className="teste-gratis-box">
                <img src={Logo} alt="Ícone de login" className="login-icon"/>
                <div className="text-box">
                    <h2 className="login-title">Teste grátis com email</h2>
                    <p className='login-text'>Comece sua experiência com Tiago</p>
                </div>
                <form className='form'>
                    {/* <label>Email:</label> */}
                    <input className="input" type="email" placeholder="Email" />
                    {/* <label>Senha:</label> */}
                    <input className="input" type="password" placeholder="Senha" />
                    <button className="button" type="submit">Iniciar Teste</button>
                </form>
            </div>
        </div>
    );
};

export default TesteGratis;
