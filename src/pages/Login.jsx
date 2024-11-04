import React from 'react';
import '../styles/Login.css';
import Logo from '../Assets/TiagoLogo.png'

const Login = () => {
    return (
        <div className="login-container">
            <div className='login-box'>
                <img src={Logo} alt="Ícone de login" className="login-icon"/>
                <div className="text-box">
                    <h2 className="login-title">Fazer Login</h2>
                    <p className='login-text'>Entre com seu email para falar com Tiago</p>
                </div>
                <form className='form'>
                    {/* <label>Email:</label> */}
                    <input className="input" type="email" placeholder="Email" />
                    {/* <label>Senha:</label> */}
                    <input className="input" type="password" placeholder="Senha" />
                    <button className="button" type="submit">Entrar</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
