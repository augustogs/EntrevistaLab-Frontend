import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import Header from "../components/Header/Header";

import '../styles/Login.css';

const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();
  
    const [formData, setFormData] = useState({
      username: '',
      password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('https://entrevistalab-backend.vercel.app/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
  
        if (!response.ok) {
          alert("Usuário ou senha inválidos!")
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        navigate("/perfil");
        localStorage.setItem('username', formData.username);        
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
  
    return (
      <>
        <Header />
        <div className='container-login'>
        <form onSubmit={handleSubmit}>
          <div className='form-login'>
            <h2>Fazer login</h2>
            <input
              type="text"
              id="username"
              name="username"
              placeholder='Nome de usuário'
              autoComplete='off'
              value={formData.username}
              onChange={handleChange}
              required
            />   
            <input
              type="password"
              id="password"
              name="password"
              autoComplete='off'
              placeholder='Senha'
              value={formData.password}
              onChange={handleChange}
              required
              />
            <button type="submit">Entrar</button>
            <Link to={'/cadastro'} className="cadastrar">Não tem uma conta? Cadastre-se</Link>
          </div>
        </form>
      </div>
      </>
    );
  };

export default Login;