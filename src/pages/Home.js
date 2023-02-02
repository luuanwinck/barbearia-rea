import Header from '../Components/Header';
import Footer from '../Components/Footer';
import '../pages/Home.css';
import Button from '../Components/Button'

const Home = () => {

  // const HandleAgendamento = () => {

  // }


  return (

    <div className="home1">
      <Header />
      <div className="container">
        <div className="titulohome">
          <h1>Los Ramos Barbershop 1998 </h1>
        </div>
        <div className="titulo2home">
          <h2> Qualidade existe quando de ATENTA <br />
            Aos mínimos DETALHES.</h2>
        </div>
        {/* <div className="botao">
          <button onClick={HandleAgendamento}>Agendamento</button>
        </div> */}
        <Button/>
      </div>

      <Footer />
    </div>
  );
}



export default Home; 
