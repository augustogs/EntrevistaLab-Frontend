import { useState, useEffect } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';

import Header from '../components/Header/Header';
import Nav from '../components/Nav/Nav';
import AnimacaoPerguntas from '../components/AnimacaoPerguntas/AnimacaoPerguntas';
import AnimacaoFeedback from '../components/AnimacaoFeedback/AnimacaoFeedback';
import LocalStorageChecker from '../components/LocalStorageChecker/LocalStorageChecker';

import '../styles/Treino.css'

const Treino = () => {

    const [areaAtuacao, setAreaAtuacao] = useState("");
    const [erro, setErro] = useState(null);
    const [perguntas, setPerguntas] = useState([]);
    const [respostas, setRespostas] = useState([]);
    const [indicePergunta, setIndicePergunta] = useState(0);
    const [respostaAtual, setRespostaAtual] = useState(""); 
    const [botaoResponderHabilitado, setBotaoResponderHabilitado] = useState(false);
    const [gerandoPerguntas, setGerandoPerguntas] = useState(true);
    const [gerandoFeedback, setGerandoFeedback] = useState(false);

    
    const location = useLocation();
    const navigate = useNavigate();

    const usuario = localStorage.getItem('username');

    useEffect(() => {
        if (location.state && location.state.areaAtuacao) {
          const areaSelecionada = location.state.areaAtuacao;
          setAreaAtuacao(areaSelecionada);
          requestPerguntas(areaSelecionada);
        }
      }, [location.state]);

    useEffect(() => {
        setBotaoResponderHabilitado(respostaAtual.trim() !== '');
    }, [respostaAtual]);

    const requestPerguntas = async (areaAtuacao) => {
        try {
            const resposta = await fetch('https://entrevistalab-backend.vercel.app/perguntas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ areaAtuacao })
            });

            if (!resposta.ok) {
                throw new Error('Não foi possível completar a requisição');
            }

            const dados = await resposta.json();
            const perguntas = dados.perguntas;
            setPerguntas(perguntas);
        } catch (error) {
            setErro(error.message);
        } finally {
            setGerandoPerguntas(false);
        }
    };

    const requestFeedback = async (perguntas, respostas) => {
        try {
            const resposta = await fetch('https://entrevistalab-backend.vercel.app/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ usuario, areaAtuacao, perguntas, respostas })
            });
    
            if (!resposta.ok) {
                throw new Error('Não foi possível completar a requisição');
            }
    
            const dados = await resposta.json();
            const textoFeedback = dados.textoFeedback;
            navigate("/feedback", { state: { usuario: usuario, areaAtuacao: areaAtuacao, textoFeedback: textoFeedback, perguntas: perguntas, respostas: respostas } });
        } catch (error) {
            console.error('Erro ao enviar os dados para a API:', error.message);
        }
    };
   
    const extrairPerguntaAtual = () => {
        return perguntas[indicePergunta] || null;
    };

    const responder = () => {
        const respostaAtual = document.getElementById('resposta').value;
        setRespostas(prevRespostas => [...prevRespostas, respostaAtual]);

        if (indicePergunta + 1 === 5) {
            requestFeedback(perguntas, [...respostas, respostaAtual]);
            setGerandoFeedback(true);
        } else {
            setIndicePergunta(indicePergunta + 1);
        }
        document.getElementById('resposta').value = '';
        setRespostaAtual('');
    };
    
    const handleRespostaChange = (event) => {
        const respostaAtual = event.target.value;
        setRespostaAtual(respostaAtual);
        setBotaoResponderHabilitado(respostaAtual.trim() !== '');
    };

    return (
        <LocalStorageChecker>
            <Header />
            <div className='treino-container'>
                <div className="nav-treino">
                    <Nav usuario={usuario}/>
                </div>
                <div className="treino">
                    <h2>Área: {areaAtuacao}</h2>
                    {gerandoPerguntas && <AnimacaoPerguntas />}
                    {erro && <p>Ocorreu um erro: {erro}</p>}
                    {perguntas && !gerandoPerguntas && (
                        <div className='pr-container'>
                            <div className="pergunta-info">
                                <span>{`Pergunta ${indicePergunta + 1}/${perguntas.length}`}</span>
                            </div>
                            <p>{extrairPerguntaAtual()}</p>
                            <textarea 
                                id='resposta'
                                autoComplete='off'
                                autoFocus
                                value={respostaAtual}
                                onChange={handleRespostaChange}
                            />
                            <span className='resposta-info'>Resposta</span>
                        </div>
                    )}
                    {!gerandoPerguntas && (
                        <button className='btn-responder' onClick={responder} disabled={!botaoResponderHabilitado}>Responder</button>
                    )}
                    {gerandoFeedback && <AnimacaoFeedback />}
                </div>
            </div>
        </LocalStorageChecker>
    );
};

export default Treino;