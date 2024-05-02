import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';

import '../styles/Feedback.css';

const Feedback = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const perguntas = location.state?.perguntas;
    const respostas = location.state?.respostas;
    const textoFeedback = location.state?.textoFeedback;

    const reiniciarTreino = () => {
        navigate('/areas');
    }
       
    return (
        <>
            <Header />
            <div className='feedback'>
                <h2>Feedback</h2>
                {textoFeedback && (
                    <div>
                        <ul className='feedback-list'>
                            {perguntas.map((pergunta, index) => (
                                <li key={index} className='feedback-item'>
                                    <p>Pergunta {index+1}: {pergunta}</p>
                                    <p>Resposta: {respostas[index]}</p>
                                    <p style={{fontWeight: 450}}>{textoFeedback[index]}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {!textoFeedback && <p>Não há dados de feedback disponíveis.</p>}
                <button onClick={reiniciarTreino}>Reiniciar treino</button>
            </div>
        </>
    );
};

export default Feedback;
