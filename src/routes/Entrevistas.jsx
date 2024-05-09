import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import { IoArrowBackSharp, IoArrowForwardSharp } from "react-icons/io5";

import Header from '../components/Header/Header';
import Nav from '../components/Nav/Nav';
import LocalStorageChecker from '../components/LocalStorageChecker/LocalStorageChecker';

import '../styles/Entrevistas.css';

const Entrevistas = () => {

    const usuario = localStorage.getItem('username');
    const [entrevistas, setEntrevistas] = useState([]);
    const [detalhesEntrevista, setDetalhesEntrevista] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [indiceDetalhe, setIndiceDetalhe] = useState(0);

    useEffect(() => {
        const buscarEntrevistas = async () => {
          try {
            const response = await fetch(`https://entrevistalab-backend.vercel.app/entrevistas/${usuario}`);
            if (!response.ok) {
              throw new Error('Erro ao buscar entrevistas');
            }
            const data = await response.json();
            setEntrevistas(data);
          } catch (error) {
            console.error('Erro:', error);
          }
        };
        buscarEntrevistas();
      }, [usuario]);

    const proximaDetalhe = () => {
        setIndiceDetalhe(prevIndice => Math.min(prevIndice + 1, detalhesEntrevista.perguntas.length - 1));
    };

    const detalheAnterior = () => {
        setIndiceDetalhe(prevIndice => Math.max(prevIndice - 1, 0));
    };

    const exibirDetalhesEntrevista = (entrevista) => {
        setDetalhesEntrevista(entrevista);
        setShowPopup(true);
    };

    const fecharDetalhesEntrevista = () => {
        setDetalhesEntrevista(null);
        setShowPopup(false);
    };

    return (
        <LocalStorageChecker>
            <Header />
            <div className="entrevistas-container">
                <div className="nav-entrevistas">
                    <Nav usuario={usuario}/>
                </div>
                <div className="content-entrevistas">
                   <h2>Entrevistas realizadas</h2>
                   <ul className="entrevistas-list">
                      {entrevistas.map(entrevista => (
                          <li key={entrevista.id} className="entrevista-item">
                            <div className="entrevista-info" onClick={() => exibirDetalhesEntrevista(entrevista)}>
                                <p>Área de Atuação: {entrevista.area.replace(/['"]+/g, '')}</p>
                                <p>Data: {entrevista.data}</p>
                            </div>
                          </li>
                        ))}
                    </ul>
                </div>
                {showPopup && detalhesEntrevista && (
                    <div className="detalhes-entrevista-group">
                        <h3>Entrevista {detalhesEntrevista.id}</h3>
                        <h3>Área: {detalhesEntrevista.area.replace(/['"]+/g, '')}</h3>
                        <ul>
                            <li>
                                <p>Pergunta {indiceDetalhe + 1}: {detalhesEntrevista.perguntas[indiceDetalhe]}</p>
                                <p>Resposta {indiceDetalhe + 1}: {detalhesEntrevista.respostas[indiceDetalhe]}</p>
                                <p style={{fontWeight: 450}}>Feedback: {detalhesEntrevista.feedback[indiceDetalhe]}</p>
                            </li>
                        </ul>
                        <div className="botoes-navegacao">
                            <button onClick={detalheAnterior} disabled={indiceDetalhe === 0}>
                                <IoArrowBackSharp />
                            </button>
                            <button onClick={proximaDetalhe} disabled={indiceDetalhe === detalhesEntrevista.perguntas.length - 1}>
                                <IoArrowForwardSharp />
                            </button>
                        </div>
                        <button onClick={fecharDetalhesEntrevista}>Fechar</button>
                    </div>
                )}
            </div>
        </LocalStorageChecker>
    );
}

export default Entrevistas;
