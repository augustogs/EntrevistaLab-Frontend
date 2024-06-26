import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBackSharp } from "react-icons/io5";

import Header from "../components/Header/Header";
import Nav from '../components/Nav/Nav';
import LocalStorageChecker from '../components/LocalStorageChecker/LocalStorageChecker';

import "../styles/AreaAtuacao.css";

const AreaAtuacao = () => {
  const navigate = useNavigate();

  const storedUsername = localStorage.getItem('username');

  const handleAreaSelection = (areaAtuacao) => {
    navigate("/treino", { state: { areaAtuacao: areaAtuacao} });
  };

  return (
    <LocalStorageChecker>
      <Header />
      <div className="area-container">
        <div className="nav">
          <Nav usuario={storedUsername}/>
        </div>
        <div className="area-atuacao">
          <h3>Selecione uma área de atuação para a qual deseja praticar</h3>
          <button onClick={() => handleAreaSelection("Frontend")}>Frontend</button>
          <button onClick={() => handleAreaSelection("Backend")}>Backend</button>
          <button onClick={() => handleAreaSelection("Devops")}>DevOps</button>
          <button onClick={() => handleAreaSelection("QA")}>QA</button>
          <button onClick={() => handleAreaSelection("Dados")}>Dados</button>
          <Link to="/perfil" className="link-voltar">
            <IoArrowBackSharp className="arrow-icon" size={24}/>
          </Link>
        </div>
      </div>
    </LocalStorageChecker>
  );
};

export default AreaAtuacao;
