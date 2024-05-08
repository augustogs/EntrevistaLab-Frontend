import { useNavigate } from "react-router-dom";

import Header from "../components/Header/Header";
import Nav from "../components/Nav/Nav";
import LocalStorageChecker from "../components/LocalStorageChecker/LocalStorageChecker";

import '../styles/Perfil.css';

const Perfil = () => {
    const navigate = useNavigate();

    const storedUsername = localStorage.getItem('username');
    console.log(storedUsername);

    const handleNavigation = () => {
        navigate("/areas");
    };
    return (
        <LocalStorageChecker>
            <Header />
            <div className="perfil-container">
                <div className="nav">
                    <Nav usuario={storedUsername}/>
                </div>
                <div className="content">
                    <h2>Simular Entrevista</h2>
                    <button onClick={handleNavigation} className="iniciar">Iniciar</button>
                </div>
            </div>
        </LocalStorageChecker>
    );    
}

export default Perfil;