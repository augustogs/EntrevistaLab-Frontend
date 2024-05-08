import { useNavigate, Link } from "react-router-dom";

import './Nav.css';

const Nav = (props) => {

    const navigate = useNavigate();

    const { usuario } = props;

    const handleMinhasEntrevistas = () => {
        navigate('/perfil/entrevistas');
    }

    const handleSair = () => {
        localStorage.removeItem('username');
        navigate('/');
    }

    return (
        <div className="barra-esquerda">
            <div className="nav">
                <Link to={'/perfil'} className="link-perfil">Usuário: {usuario}</Link>
                <button onClick={handleMinhasEntrevistas}>Minhas entrevistas</button>
                <button onClick={handleSair}>Sair</button>
            </div>
        </div>
    );
}

export default Nav;