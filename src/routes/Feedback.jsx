import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Header from '../components/Header/Header';
import Nav from '../components/Nav/Nav';
import LocalStorageChecker from '../components/LocalStorageChecker/LocalStorageChecker';

import { IoArrowBackSharp, IoArrowForwardSharp } from "react-icons/io5";

import '../styles/Feedback.css';

const Feedback = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const storedUsername = localStorage.getItem('username');
    const perguntas = location.state?.perguntas || [];
    const respostas = location.state?.respostas || [];
    const textoFeedback = location.state?.textoFeedback || [];

    const [indiceFeedback, setIndiceFeedback] = useState(0);

    const proximoFeedback = () => {
        setIndiceFeedback(prevIndice => Math.min(prevIndice + 1, textoFeedback.length - 1));
    };

    const feedbackAnterior = () => {
        setIndiceFeedback(prevIndice => Math.max(prevIndice - 1, 0));
    };

    const reiniciarTreino = () => {
        navigate('/perfil');
    };

    return (
        <LocalStorageChecker>
            <Header />
            <div className='feedback'>
                <div className="nav-feedback">
                    <Nav usuario={storedUsername}/>
                </div>
                <div className="conteudo-feedback">
                    <h2>Feedback</h2>
                    {textoFeedback.length > 0 && (
                        <div>
                            <ul className='feedback-list'>
                                <li key={indiceFeedback} className='feedback-item'>
                                    <p>Pergunta {indiceFeedback + 1}: {perguntas[indiceFeedback]}</p>
                                    <p>Resposta: {respostas[indiceFeedback]}</p>
                                    <p style={{fontWeight: 450}}>Feedback: {textoFeedback[indiceFeedback]}</p>
                                </li>
                            </ul>
                        </div>
                    )}
                    {textoFeedback.length === 0 && <p>Não há dados de feedback disponíveis.</p>}
                    <div className="botoes-navegacao">
                        <button onClick={feedbackAnterior} disabled={indiceFeedback === 0}>
                            <IoArrowBackSharp />
                        </button>
                        <button onClick={proximoFeedback} disabled={indiceFeedback === textoFeedback.length - 1}>
                            <IoArrowForwardSharp />
                        </button>
                    </div>
                    <button onClick={reiniciarTreino} className='reiniciar-treino'>Reiniciar treino</button>
                </div>
            </div>
        </LocalStorageChecker>
    );
};

export default Feedback;
