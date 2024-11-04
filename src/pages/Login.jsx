import React, { useState } from 'react';
import apiLogin from '../utils/PostLogin';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import Logo from '../Assets/TiagoLogo.png';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        const credentials = {
            username: username,
            password: password,
        };

        try {
            const response = await apiLogin.Login(credentials);
            console.log('Login bem-sucedido:', response.data);
            localStorage.setItem("token", response.data.tokens.access_token);
            navigate('/ia');
        } catch (error) {
            setError('Erro ao fazer login. Verifique suas credenciais.');
            console.error(error);
        }
    };

    return (
        <div className="login-container">
            <div className='login-box'>
                <img src={Logo} alt="Ícone de login" className="login-icon" />
                <div className="text-box">
                    <h2 className="login-title">Fazer Login</h2>
                    <p className='login-text'>Entre com seu email para falar com Tiago</p>
                </div>
                <form className='form' onSubmit={handleLogin}>
                    <input
                        className="input"
                        type="text"
                        placeholder="usuário"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        className="input"
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="button" type="submit">Entrar</button>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default Login;
