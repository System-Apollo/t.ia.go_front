import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../styles/IA.css';
import Logo2 from '../Assets/tiago.png'
import Logo3 from '../Assets/tiagoia.png'
import { Button } from '@chakra-ui/react'
import { SendHorizontal, ChartNoAxesCombined } from 'lucide-react'
import { TypeAnimation } from 'react-type-animation'

// Registrar os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const App = () => {
  const [pergunta, setPergunta] = useState('');
  const [resposta, setResposta] = useState('');
  const [conversas, setConversas] = useState([]);
  const [digitando, setDigitando] = useState(false); // Estado de "digitando..."
  const [status, setStatus] = useState('online'); // Estado para o status (online ou digitando)
  const [dadosGrafico, setDadosGrafico] = useState({}); // Estado para os dados do gráfico
  const [tipoGrafico, setTipoGrafico] = useState(''); // Estado para o tipo de gráfico a ser gerado
  const [mostrarBotaoGrafico, setMostrarBotaoGrafico] = useState(false); // Controla a exibição do botão de gerar gráfico
  const [mostrarGrafico, setMostrarGrafico] = useState(false); // Controla exibição do gráfico
  const [mostrarMensagem, setMostrarMensagem] = useState(false);


  // Carregar conversas do localStorage quando o componente é montado
  useEffect(() => {
    const conversasSalvas = JSON.parse(localStorage.getItem('conversas')) || [];
    setConversas(conversasSalvas);
  }, []);

  useEffect(() => {
    // Limpar o localStorage ao recarregar a página
    localStorage.removeItem('conversas');

    // Limpar o estado de conversas
    setConversas([]);
  }, []);
  const conversaRef = useRef(null);

  useEffect(() => {
    // Sempre rola para o final da conversa após novas mensagens
    if (conversaRef.current) {
      conversaRef.current.scrollTo({
        top: conversaRef.current.scrollHeight,
        behavior: 'smooth', // Adiciona um efeito suave na rolagem
      });
    }
  }, [conversas]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setMostrarMensagem(true);
    }, 100); // Tempo de atraso para a transição suave
  
    return () => clearTimeout(timeout); // Limpa o timeout ao desmontar
  }, [conversas]);

  const handlePergunta = async () => {
    try {

      // Atualiza o status para "digitando..."
      setDigitando(true);
      setStatus('digitando...');
      // Exibe a pergunta imediatamente no chat
      const novaConversa = { pergunta, resposta: '' }; // Exibe a pergunta imediatamente
      setConversas((prevConversas) => [...prevConversas, novaConversa]);

      setDigitando(true); // Mostra "digitando..."


      setMostrarGrafico(false);
      setMostrarBotaoGrafico(false);
      setDadosGrafico({});
      setResposta('');
      // Limpa o campo de input logo após o envio da pergunta
      setPergunta('')

      const response = await axios.post('https://c988-187-32-212-210.ngrok-free.app/pergunta', {
        pergunta: pergunta,
      });

      // Simulação de atraso de 2 segundos antes de mostrar a resposta
      setTimeout(() => {
        const respostaRecebida = response.data.resposta;
        setResposta(respostaRecebida);

        // Obter as conversas anteriores do localStorage
        const conversasAnteriores = JSON.parse(localStorage.getItem('conversas')) || [];

        // Adicionar a nova pergunta e resposta à lista de conversas
        const novaConversa = {
          pergunta: pergunta,
          resposta: respostaRecebida,
        };

        const novasConversas = [...conversasAnteriores, novaConversa];

        // Armazenar a lista atualizada no localStorage
        localStorage.setItem('conversas', JSON.stringify(novasConversas));

        setDigitando(false); // Para de mostrar "digitando..."
        setStatus('online'); // Volta para "online"

        // Atualizar o estado das conversas para que a nova conversa apareça imediatamente
        setConversas(novasConversas);

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
        } else if (graficoData && graficoData.sentencas) {
          setDadosGrafico({
            labels: Object.keys(graficoData.sentencas),
            datasets: [{
              label: 'Quantidade de Processos por Sentença',
              data: Object.values(graficoData.sentencas),
              backgroundColor: 'rgba(153, 102, 255, 0.6)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
            }],
          });
          setTipoGrafico('Sentenças');
          setMostrarBotaoGrafico(true);
        } else if (graficoData && graficoData["Quantidade de Acordos"] && graficoData["Valor Total"]) {
          setDadosGrafico({
            labels: ['Quantidade de Acordos', 'Valor Total (R$)'],
            datasets: [{
              label: 'Dados dos Acordos',
              data: [graficoData["Quantidade de Acordos"], graficoData["Valor Total"]],
              backgroundColor: ['rgba(153, 102, 255, 0.6)', 'rgba(75, 192, 192, 0.6)'],
              borderColor: ['rgba(153, 102, 255, 1)', 'rgba(75, 192, 192, 1)'],
              borderWidth: 1,
            }],
          });
          setTipoGrafico('Acordos');
          setMostrarBotaoGrafico(true);  // Exibir o botão ao encontrar dados
        } else if (graficoData && graficoData.condenacao_por_estado) {
          setDadosGrafico({
            labels: Object.keys(graficoData.condenacao_por_estado),  // Estados
            datasets: [{
              label: 'Valor Total de Condenações (R$)',
              data: Object.values(graficoData.condenacao_por_estado),  // Valores
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            }],
          });
          setTipoGrafico('Condenação por Estado');
          setMostrarBotaoGrafico(true);
        } else if (graficoData && graficoData["valor_causa_por_estado"]) {
          setDadosGrafico({
            labels: Object.keys(graficoData["valor_causa_por_estado"]),
            datasets: [{
              label: 'Valor de Causa por Estado (R$)',
              data: Object.values(graficoData["valor_causa_por_estado"]),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            }],
          });
          setTipoGrafico('Valor de Causa por Estado');
          setMostrarBotaoGrafico(true);
        } else if (graficoData && graficoData["media_valor_causa_por_estado"]) {
          setDadosGrafico({
            labels: Object.keys(graficoData["media_valor_causa_por_estado"]),
            datasets: [{
              label: 'Média de Valor de Causa por Estado (R$)',
              data: Object.values(graficoData["media_valor_causa_por_estado"]),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            }],
          });
          setTipoGrafico('Média de Valor de Causa por Estado');
          setMostrarBotaoGrafico(true);
        } else if (graficoData && (graficoData.transitados || graficoData.nao_transitados)) {
          setDadosGrafico({
            labels: ['Transitados em Julgado', 'Não Transitados em Julgado'],
            datasets: [{
              label: 'Quantidade de Processos',
              data: [graficoData.transitados, graficoData.nao_transitados],
              backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
              borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
              borderWidth: 1,
            }],
          });
          setTipoGrafico('Transitado em Julgado');
          setMostrarBotaoGrafico(true);
        } else if (graficoData && graficoData.ativos !== undefined && graficoData.arquivados !== undefined) {
          setDadosGrafico({
            labels: ['Ativos', 'Arquivados'],
            datasets: [{
              label: 'Quantidade de Processos',
              data: [graficoData.ativos, graficoData.arquivados],
              backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
              borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
              borderWidth: 1,
            }],
          });
          setTipoGrafico('Processos Ativos e Arquivados');
          setMostrarBotaoGrafico(true);
        } else if (graficoData && graficoData.estados) {
          setDadosGrafico({
            labels: Object.keys(graficoData.estados),
            datasets: [{
              label: 'Processos por Estado',
              data: Object.values(graficoData.estados),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            }],
          });
          setTipoGrafico('Processos por Estado');
          setMostrarBotaoGrafico(true);
        } else if (graficoData && graficoData.ativos && graficoData.arquivados) {
          setDadosGrafico({
            labels: ['Processos Ativos', 'Processos Arquivados'],
            datasets: [{
              label: 'Valor Total da Causa',
              data: [graficoData.ativos, graficoData.arquivados],
              backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
              borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
              borderWidth: 1,
            }],
          });
          setTipoGrafico('Valor Total da Causa por Status');
          setMostrarBotaoGrafico(true);
        } else if (graficoData && graficoData.com_recursos && graficoData.sem_recursos) {
          setDadosGrafico({
            labels: ['Com Recursos', 'Sem Recursos'],
            datasets: [{
              label: 'Quantidade de Recursos Interpostos',
              data: [graficoData.com_recursos, graficoData.sem_recursos],
              backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
              borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
              borderWidth: 1,
            }],
          });
          setTipoGrafico('Recursos Interpostos');
          setMostrarBotaoGrafico(true);
        } else if (graficoData && graficoData.assuntos) {
          setDadosGrafico({
            labels: Object.keys(graficoData.assuntos),  // Abreviações já são tratadas no backend
            datasets: [{
              label: 'Assuntos Recorrentes',
              data: Object.values(graficoData.assuntos),
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            }],
          });
          setTipoGrafico('Assuntos Recorrentes');
          setMostrarBotaoGrafico(true);
        } else if (graficoData && graficoData.tribunais) {
          setDadosGrafico({
            labels: Object.keys(graficoData.tribunais),  // Tribunais
            datasets: [{
              label: 'Ações sobre Convenções Coletivas',
              data: Object.values(graficoData.tribunais),  // Quantidade de ações por tribunal
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            }],
          });
          setTipoGrafico('Ações por Tribunal');
          setMostrarBotaoGrafico(true);
        } else if (graficoData && graficoData.ritos) {
          setDadosGrafico({
            labels: Object.keys(graficoData.ritos),  // Ritos (Sumaríssimo, Sumário, Ordinário, etc.)
            datasets: [{
              label: 'Processos por Rito',
              data: Object.values(graficoData.ritos),  // Quantidade de processos por rito
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            }],
          });
          setTipoGrafico('Processos por Rito');
          setMostrarBotaoGrafico(true);
        } else if (graficoData && graficoData.reclamantes_multiplos) {
          setDadosGrafico({
            labels: Object.keys(graficoData.reclamantes_multiplos),  // Nomes dos reclamantes
            datasets: [{
              label: 'Número de Processos',
              data: Object.values(graficoData.reclamantes_multiplos),  // Quantidade de processos por reclamante
              backgroundColor: 'rgba(153, 102, 255, 0.6)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
            }],
          });
          setTipoGrafico('Reclamantes com Mais de Um Processo');
          setMostrarBotaoGrafico(true);
        } else if (graficoData && graficoData.valor_por_estado) {
          setDadosGrafico({
            labels: Object.keys(graficoData.valor_por_estado),  // Estados
            datasets: [{
              label: 'Valor Total de Condenação',
              data: Object.values(graficoData.valor_por_estado),  // Valores de condenação por estado
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            }],
          });
          setTipoGrafico('Valor de Condenação por Estado');
          setMostrarBotaoGrafico(true);
        } else if (graficoData && graficoData.quantidade_processos_por_estado) {
          // Gráfico de quantidade de processos por estado
          setDadosGrafico({
            labels: Object.keys(graficoData.quantidade_processos_por_estado), // Estados
            datasets: [{
              label: 'Quantidade de Processos por Estado',
              data: Object.values(graficoData.quantidade_processos_por_estado), // Quantidades de processos
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            }],
          });
          setTipoGrafico('Quantidade de Processos por Estado');
          setMostrarBotaoGrafico(true);  // Exibir o botão ao encontrar dados
        } else if (graficoData && graficoData.valor_condenacao_por_estado) {
          setDadosGrafico({
            labels: Object.keys(graficoData.valor_condenacao_por_estado), // Estados (Foro)
            datasets: [{
              label: 'Total de Condenação por Estado (R$)',
              data: Object.values(graficoData.valor_condenacao_por_estado), // Valores da condenação por estado
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            }],
          });
          setTipoGrafico('Total de Condenação por Estado');
          setMostrarBotaoGrafico(true);  // Exibe o botão para gerar gráfico
        } else if (graficoData && graficoData.valor_condenacao_por_comarca) {
          setDadosGrafico({
            labels: Object.keys(graficoData.valor_condenacao_por_comarca),  // Comarcas (municipios)
            datasets: [{
              label: 'Valor Total de Condenação (R$)',
              data: Object.values(graficoData.valor_condenacao_por_comarca),  // Valores de condenação por comarca
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            }],
          });
          setTipoGrafico('Valor Total de Condenação por Comarca');
          setMostrarBotaoGrafico(true);
        } else if (graficoData && graficoData.duração_por_processo) {
          setDadosGrafico({
            labels: Object.keys(graficoData.duração_por_processo),  // Identificadores de processo (ou índices)
            datasets: [{
              label: 'Duração dos Processos (dias)',
              data: Object.values(graficoData.duração_por_processo),  // Duração dos processos arquivados
              backgroundColor: 'rgba(153, 102, 255, 0.6)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
            }],
          });
          setTipoGrafico('Duração dos Processos Arquivados');
          setMostrarBotaoGrafico(true);
        } else if (graficoData && graficoData.media_duracao_por_estado) {
          setDadosGrafico({
            labels: Object.keys(graficoData.media_duracao_por_estado),  // Estados
            datasets: [{
              label: 'Média de Duração (dias)',
              data: Object.values(graficoData.media_duracao_por_estado),  // Média de duração por estado
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            }],
          });
          setTipoGrafico('Média de Duração por Estado');
          setMostrarBotaoGrafico(true);
        } else if (graficoData && graficoData.media_duracao_por_comarca) {
          setDadosGrafico({
            labels: Object.keys(graficoData.media_duracao_por_comarca),  // Comarcas
            datasets: [{
              label: 'Média de Duração (dias)',
              data: Object.values(graficoData.media_duracao_por_comarca),  // Média de duração por comarca
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            }],
          });
          setTipoGrafico('Média de Duração por Comarca');
          setMostrarBotaoGrafico(true);
        } else if (graficoData && graficoData.sentencas) {
          setDadosGrafico({
            labels: Object.keys(graficoData.sentencas),  // Tipos de sentenças
            datasets: [{
              label: 'Quantidade de Processos',
              data: Object.values(graficoData.sentencas),  // Quantidade por tipo de sentença
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            }],
          });
          setTipoGrafico('Sentenças');
          setMostrarBotaoGrafico(true);
        } else if (graficoData && graficoData.sentencas) {
          setDadosGrafico({
            labels: Object.keys(graficoData.sentencas),  // Tipos de sentenças
            datasets: [{
              label: 'Quantidade de Processos',
              data: Object.values(graficoData.sentencas),  // Quantidade por tipo de sentença
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            }],
          });
          setTipoGrafico('Sentenças');
          setMostrarBotaoGrafico(true);
        } else if (graficoData && graficoData.processos) {
          setDadosGrafico({
            labels: Object.keys(graficoData.processos).slice(0, 4),  // Números dos 4 primeiros processos
            datasets: [{
              label: 'Dias sem Movimentação',
              data: Object.values(graficoData.processos).slice(0, 4),  // Dias sem movimentação para os 4 primeiros processos
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            }],
          });
          setTipoGrafico('Top 4 Processos com Maior Tempo sem Movimentação');
          setMostrarBotaoGrafico(true);
        } else if (graficoData && graficoData.ritos) {
          setDadosGrafico({
            labels: Object.keys(graficoData.ritos),  // Tipos de Rito
            datasets: [{
              label: 'Quantidade de Processos por Rito',
              data: Object.values(graficoData.ritos),  // Quantidade de processos por tipo de rito
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            }],
          });
          setTipoGrafico('Divisão por Rito');
          setMostrarBotaoGrafico(true);
        } else if (graficoData && graficoData.nao_julgados) {
          setDadosGrafico({
            labels: ['Processos Não Julgados'],
            datasets: [{
              label: 'Quantidade de Processos Não Julgados',
              data: [graficoData.nao_julgados],
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            }],
          });
          setTipoGrafico('Processos Não Julgados');
          setMostrarBotaoGrafico(true);
        } else if (graficoData && (graficoData.processos_citados || graficoData.processos_nao_citados)) {
          setDadosGrafico({
            labels: ['Processos Citados', 'Processos Não Citados'],
            datasets: [{
              label: 'Quantidade de Processos',
              data: [graficoData.processos_citados, graficoData.processos_nao_citados],
              backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
              borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
              borderWidth: 1,
            }],
          });
          setTipoGrafico('Processos Citados vs Não Citados');
          setMostrarBotaoGrafico(true); // Exibir o botão de gráfico
        } else {
          // Caso não haja dados para o gráfico, não exibe o botão
          setMostrarBotaoGrafico(false);
        }
      }, 2000);
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
    scales: {
      x: {
        ticks: {
          font: {
            size: 12, // Ajustar o tamanho da fonte do eixo x
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 12, // Ajustar o tamanho da fonte do eixo y
          },
        },
      },
    },
    barThickness: 10,  // Define uma espessura fixa para as barras
    maxBarThickness: 100,  // Limita a espessura máxima das barras
  };


  return (
    <div className="ia-container">
      {/* <div className='title-container'> */}
        <div className='img-logo'>
          <img src={Logo2} className="imf-img" alt="Logo1" width={248} />
        </div>
        
       

      {/* Exibir o chat ou o gráfico com efeito de rotação */}
    
        <div className={`chat-grafico-wrapper ${mostrarGrafico ? 'virar' : ''}`}>
          <div className="chat-conversa" ref={conversaRef}>
            {/* Cabeçalho com imagem e nome, estilo WhatsApp */}
            <div className="ia-nome">
              <img src={Logo3} className="profile-image" alt="Logo" />
              <div className="ia-app-name">
                <h1 className="ia-app-name">TIAGO</h1>
                {/* Exibir o status, que será "online" ou "digitando..." */}
                <p className="digitando-texto">{status}</p>
              </div>
            </div>

            {conversas.map((conversa, index) => (
              <div key={index} className={`mensagem ${mostrarMensagem ? 'aparecer' : ''}`}>
                <div className="pergunta">
                  <p>{conversa.pergunta}</p>
                </div>
                <div className="resposta">
                  {/* Exibe o efeito "..." enquanto está digitando, caso contrário, exibe a resposta */}
                  {digitando && index === conversas.length - 1 ? (
                    <p className="digitando-p">...</p>
                  ) : (
                    <p>{conversa.resposta}</p>
                  )}
                </div>
              </div>
            ))}

          </div>

          {/* Gráfico */}
          <div className={`ia-grafico ${mostrarGrafico ? 'mostrar-grafico' : 'esconder-grafico'}`}>
            {mostrarGrafico && <Bar data={dadosGrafico} options={options} />}
            {/* <h3 className='grafico-message'>Faça novamente uma nova pergunta para volta a chat-conversa.</h3> */}
          </div>
        {/* Input e botão de envio */}
        <div className="input-button">
          <input
            type="text"
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handlePergunta();
              }
            }}
            placeholder="Faça uma pergunta"
            className="ia-input"
          />

          {/* Botão de envio */}
          <Button
            textColor='#fff'
            rightIcon={<SendHorizontal color="#ffffff" />}
            onClick={handlePergunta}
            bgColor='#3B3670'
            borderRadius={50}
            variant='solid'
            _hover={{ bg: '#2e2b58' }}
            className="send-button"
          >
            GO
          </Button>

          {/* Botão para gerar gráfico */}
          {mostrarBotaoGrafico && (
            <Button
              textColor='#fff'
              onClick={handleGerarGrafico}
              bgColor='#3B3670'
              borderRadius="50%"
              variant='solid'
              _hover={{ bg: '#2e2b58' }}
              className="icon-button"
              m={0}
              p={2}
            >
              <ChartNoAxesCombined color="#ffffff" size={30} />
            </Button>
          )}
        </div>
        </div>


    </div>
  );
};

export default App;
