import '../pages/Servicos.css';
import Header from '../Components/Header';
import Footer from '../Components/Footer';


const Servicos = () => {

    return (
        <div className="global">
             <Header />
            <div className='ser'>
               
                <div className='seer'>
                    <div className='titulo2ser'><h1 className='h1ser'>Meus Serviços</h1></div>
            
                        <div className='box-info'>
                            <div className='foto2'><img src="/cabelobarba.png" alt="iconecabeloebarba" /></div>
                            <div className='artigos'><h3>Cabelo e Barba</h3></div>
                        </div>
                        <div class="box-info">
                            <div className='foto2'><img src="/diadonoivo.png" alt="iconediadonoivo" /></div>
                            <div className='artigos'><h3>Dia do Noivo</h3></div>
                        </div>
                        <div class="box-info">
                            <div className='foto2'><img src="/pomada.png" alt="iconepomadafixadora" /></div>
                            <div className='artigos'><h3>Pomada Fixadora</h3></div>
                        </div>
                        <div class="box-info">
                            <div className='foto2'><img src="/quimica.png" alt="iconequimica" /></div>
                            <div className='artigos'><h3>Química Capilar</h3></div>
                    </div>
                </div>
               
            </div>
            <Footer />
        </div>

    )


};

export default Servicos; 
