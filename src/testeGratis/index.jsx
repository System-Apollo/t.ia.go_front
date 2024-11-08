import React, { useState } from 'react';
import '../styles/TesteGratis.css';
import Logo from '../Assets/TiagoLogo.png'
import { useNavigate } from 'react-router-dom';
import apiLogin from '../utils/PostLogin';

const TesteGratis = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const credentials = {
            username: username,
            password: password,
        }

        try{
            const res = await apiLogin.Login(credentials);
            console.log('Login bem-sucedido', res.data);
            localStorage.setItem("token", res.data.tokens.access_token);
            navigate('/ia');
        } catch(error) {
            setError('Error ao fazer login. Verifique suas credenciais.');
            console.log(error);
        }
    }

    return (
        <div className="trial-container">
            <div className="teste-gratis-box">
                <img src={Logo} alt="Ícone de login" className="login-icon"/>
                <div className="text-box">
                    <h2 className="login-title">Teste grátis com email</h2>
                    <p className='login-text'>Comece sua experiência com Tiago</p>
                </div>
                <form className='form' onSubmit={handleSubmit}>

                    <input
                     className="input"
                     type="text" 
                     placeholder="Usuário"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)} />

                    <input
                     className="input" 
                     type="password" 
                     placeholder="Senha"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                    />
                    
                    <button className="button" type="submit">Iniciar Teste</button>

                </form>
                {error && <p className='error-message'>{error}</p>}
            </div>
        </div>
    );
};

export default TesteGratis;
