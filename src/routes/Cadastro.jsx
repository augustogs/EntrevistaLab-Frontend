import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Header from '../components/Header/Header';

import '../styles/Cadastro.css';

const RegisterForm = () => {

  const navigate = useNavigate();

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
      const response = await fetch('https://entrevistalab-backend.vercel.app/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        alert("Usuário já cadastrado!")
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      alert("Usuário criado com sucesso!!");
      navigate("/login");
      
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className='container-cadastro'>
      <form onSubmit={handleSubmit}>
        <div className='form-cadastro'>
          <h2>Criar uma conta</h2>
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
          <button type="submit">Cadastrar</button>
          <Link to={'/login'} className="logar">Já possui uma conta? Faça login</Link>
        </div>
      </form>
    </div>
    </>
  );
};

export default RegisterForm;
