import React from 'react';
import '../styles/Login.css';

const Login = () => {
    return (
        <div className="login-container">
            <div className='login-box'>
                <h2>Fazer Login</h2>
                <form>
                    <label>Email:</label>
                    <input className="input" type="email" placeholder="Digite seu email" />
                    <label>Senha:</label>
                    <input className="input" type="password" placeholder="Digite sua senha" />
                    <button className="button" type="submit">Entrar</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
