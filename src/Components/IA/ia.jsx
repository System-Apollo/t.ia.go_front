import React, { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './IA.css';
import Logo1 from '../Assets/logo.png';

// Registrar os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const App = () => {
  const [pergunta, setPergunta] = useState('');
  const [resposta, setResposta] = useState('');
  const [dadosGrafico, setDadosGrafico] = useState({}); // Estado para os dados do gráfico
  const [tipoGrafico, setTipoGrafico] = useState(''); // Estado para o tipo de gráfico a ser gerado
  const [mostrarBotaoGrafico, setMostrarBotaoGrafico] = useState(false); // Controla a exibição do botão de gerar gráfico
  const [mostrarGrafico, setMostrarGrafico] = useState(false); // Controla exibição do gráfico

  const handlePergunta = async () => {
    try {
      // Resetar estados ao fazer nova pergunta
      setMostrarGrafico(false);
      setMostrarBotaoGrafico(false);
      setDadosGrafico({});
      setResposta(''); // Limpa a resposta anterior
  
      const response = await axios.post('http://127.0.0.1:5000/pergunta', {
        pergunta: pergunta,
      });
  
      const respostaRecebida = response.data.resposta;
      setResposta(respostaRecebida);
  
      const graficoData = response.data.grafico;
  
      // Verificar se os dados para o gráfico estão disponíveis e não vazios
      if (graficoData && (graficoData.ativos || graficoData.arquivados)) {
        setDadosGrafico({
          labels: ['Processos Ativos', 'Processos Arquivados'],
          datasets: [{
            label: 'Quantidade de Processos',
            data: [graficoData.ativos, graficoData.arquivados],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }],
        });
        setTipoGrafico('Ativos e Arquivados');
        setMostrarBotaoGrafico(true);  // Exibir o botão ao encontrar dados
      } else if (graficoData && graficoData["Data de cadastro_por_data"]) {
        setDadosGrafico({
          labels: Object.keys(graficoData["Data de cadastro_por_data"]),
          datasets: [{
            label: 'Processos Cadastrados',
            data: Object.values(graficoData["Data de cadastro_por_data"]),
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
          }],
        });
        setTipoGrafico('Cadastros por Data');
        setMostrarBotaoGrafico(true);
      } else if (graficoData && graficoData["Data de distribuição_por_data"]) {
        setDadosGrafico({
          labels: Object.keys(graficoData["Data de distribuição_por_data"]),
          datasets: [{
            label: 'Processos Distribuídos',
            data: Object.values(graficoData["Data de distribuição_por_data"]),
            backgroundColor: 'rgba(255, 159, 64, 0.6)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
          }],
        });
        setTipoGrafico('Distribuídos por Data');
        setMostrarBotaoGrafico(true);
      } else if (graficoData && graficoData["Data de citação_por_data"]) {
        setDadosGrafico({
          labels: Object.keys(graficoData["Data de citação_por_data"]),
          datasets: [{
            label: 'Citações',
            data: Object.values(graficoData["Data de citação_por_data"]),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          }],
        });
        setTipoGrafico('Citações por Data');
        setMostrarBotaoGrafico(true);
      } else if (graficoData && graficoData.fases) {
        setDadosGrafico({
          labels: Object.keys(graficoData.fases),
          datasets: [{
            label: 'Processos por Fase',
            data: Object.values(graficoData.fases),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          }],
        });
        setTipoGrafico('Fases');
        setMostrarBotaoGrafico(true);
      } else if (graficoData && graficoData.orgaos) {
        setDadosGrafico({
          labels: Object.keys(graficoData.orgaos),
          datasets: [{
            label: 'Processos por Órgão',
            data: Object.values(graficoData.orgaos),
            backgroundColor: 'rgba(255, 206, 86, 0.6)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
          }],
        });
        setTipoGrafico('Órgãos');
        setMostrarBotaoGrafico(true);
      } else {
        // Caso não haja dados para o gráfico, não exibe o botão
        setMostrarBotaoGrafico(false);
      }
    } catch (error) {
      console.error('Erro ao fazer a pergunta:', error);
    }
  };

  // Gerar gráfico
  const handleGerarGrafico = () => {
    setMostrarGrafico(true);
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: tipoGrafico,
      },
    },
  };

  return (
    <div className="ia-container">
      <img src={Logo1} className="images" alt="Logo1" height={55} width={248}/>
      <h1 className="ia-title1">Como posso facilitar seu dia hoje?</h1>
      <h2 className="ia-title">Faça uma pergunta, como: Quantos processos ativos citam minha empresa? </h2>
      <div className='input-button'>
        <input
          type="text"
          value={pergunta}
          onChange={(e) => setPergunta(e.target.value)}
          placeholder="Faça sua pergunta"
          className="ia-input"
        />
        <button onClick={handlePergunta} className="ia-button">Pesquisar</button>
      </div>

      <div className="ia-response">{resposta}</div>

      {/* Botão para gerar gráfico (exibe se houver dados para gerar gráfico) */}
      {mostrarBotaoGrafico && (
        <button onClick={handleGerarGrafico} className="ia-button-grafico">Gerar gráfico</button>
      )}

      {/* Mostrar gráfico */}
      {mostrarGrafico && (
        <div className="ia-grafico">
          <Bar data={dadosGrafico} options={options} />
        </div>
      )}
    </div>
  );
};

export default App;
