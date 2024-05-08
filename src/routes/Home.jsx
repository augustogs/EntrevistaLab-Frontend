import Header from '../components/Header/Header';

import '../styles/Home.css';

import { Link } from 'react-router-dom';

const Home = () => {
    return (
      <>
        <Header />
        <div className="container">
            <div className='conteudo'>
              <p>Uma maneira rápida de se preparar para a sua próxima entrevista</p>
              <p>
                Refine suas habilidades ao abordar questões cruciais, ganhe novos entendimentos sobre suas 
                respostas e sinta-se mais seguro durante entrevistas. 
              </p>
              <Link to="/login" className="praticar">Praticar</Link>
            </div>
        </div>
      </>
    );
};

export default Home;