import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';

import '../styles/Feedback.css';

const Feedback = () => {
    const location = useLocation();
    const navigate = useNavigate();
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
                            {textoFeedback.map((item, index) => (
                                <li key={index}>{`Resposta ${index + 1} - ${item}`}</li>
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
