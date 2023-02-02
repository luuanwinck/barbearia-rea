import React from 'react';
import '../pages/Sobre.css';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

export const Sobre = () => {
  return (
    <div className='sobre1'>
    <Header/>  
      <div className='conte1'>
      <div className='titulo'>
        <h1> Quem nós somos</h1>
      </div>
      <div className='conte2'>
      <div className='foto'>
        <img src="/foto-cosmetico.jpeg" alt="cosmetico" /> 
      </div>
    <div className='paragrafo1'>
          <h4>
          Queremos oferecer o melhor serviço de <br></br> cuidados com o cabelo e a barba
          do homem moderno, favorecendo sua autoestima com sofisticação e elegância.<br></br>
          Nosso objetivo é ser a barbearia de referencia para Zona Norte, como a melhor <br></br>
          opção pela qualidade de serviço e relacionamento. Cada cliente é único <br></br>
          e ser a sua preferência no momento da sua escolha é algo que valorizamos muito.
          </h4>
      </div>    
    </div>
    </div>
    <Footer/>
    </div>

   
  )


};
export default Sobre;
