import ReactDOM from 'react-dom/client'
import './index.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Home from './routes/Home.jsx';
import AreaAtuacao from './routes/AreaAtuacao.jsx';
import Treino from './routes/Treino.jsx';
import Feedback from './routes/Feedback.jsx';
import Cadastro from './routes/Cadastro.jsx';
import Login from './routes/Login.jsx';
import Perfil from './routes/Perfil.jsx';
import Entrevistas from './routes/Entrevistas.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "areas",
    element: <AreaAtuacao />
  },
  {
    path: "treino",
    element: <Treino />
  },
  {
    path: "feedback",
    element: <Feedback />
  },
  {
    path: "cadastro",
    element: <Cadastro />
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "perfil",
    element: <Perfil />
  },
  {
    path: "/perfil/entrevistas",
    element: <Entrevistas />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
