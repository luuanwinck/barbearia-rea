import './App.css';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Cadastro from './pages/Cadastro';
import Servicos from './pages/Servicos';
import {BrowserRouter ,Routes, Route} from 'react-router-dom';




function App() {
  return (
      <BrowserRouter>

       <Routes>
        <Route exact path= '/' element={<Home/>} />
        <Route exact path='/Sobre' element= {<Sobre/>}/>
        <Route exact path='/Cadastro' element={<Cadastro/>}/>
        <Route exact path='/Servicos' element={<Servicos/>} />
       </Routes>
      </BrowserRouter>
  );
}

export default App;
