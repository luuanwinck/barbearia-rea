import '../Components/Header.css'
import '../pages/Home';
import '../pages/Servicos';
import '../pages/Cadastro';
import '../pages/Sobre';

import { Link } from 'react-router-dom'


const Header = () => {

    return (

    <div className="header">
        <nav>

        <Link ClassName="navega"to="/">HOME</Link>
        <Link ClassName="navega" to="/Servicos">SERVIÇOS</Link>
        <Link ClassName="navega"to= "/Sobre">SOBRE</Link>
        <Link ClassName="navega"to= "/Cadastro">AGENDAMENTO</Link>
       

        </nav>
        
    </div>
    );
};

export default Header; 
