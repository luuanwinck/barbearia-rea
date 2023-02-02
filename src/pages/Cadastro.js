import React, { useState, useRef, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import './Cadastro.css';

const URL_API = "http://localhost:3333";

function Cadastro() {
  //states
  const [contato, setContato] = useState({ nome: "", telefone: "" });
  const [listaContatos, setListaContatos] = useState([]);
  const [parcialList, setParcialList] = useState(null);

  //useRef
  const inputNome = useRef();
  const inputTelefone = useRef();

  //métodos
  function definirNome(event) {
    setContato({ ...contato, nome: event.target.value });
  }

  function definirTelefone(event) {
    const newValue = sanetizeInputPhone(event.target.value);
    setContato({ ...contato, telefone: newValue });
  }

  function adicionarContato() {
    // validação dos campos obrigatórios]
    if (contato.nome === "") {
      inputNome.current.focus();
      return;
    }
    if (contato.telefone === "") {
      inputTelefone.current.focus()
      return;
    }

    //verificar se API á possui nome cadastrador
    const queryFetch = `${URL_API}/add?name=${contato.nome}&phone=${contato.telefone}`
    fetch(queryFetch, { method: 'POST' })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("ocorreu um error");
      })
      .then((res) => {
        setParcialList(res)
        if (!res.data) {

          console.warn(res.message); //poderia ser um popup de erro
        }
        else {
          setContato({ nome: "", telefone: "" });
          alert('Reserva efetuada com sucesso!')
          console.log(res.message); //poderia ser um popup de sucesso
        }

      })
      .catch((err) => {
        console.log(err);
        setParcialList(err)
      })
      .finally(() => {
        if (parcialList instanceof Error) {
          console.log("Erro na requisição à API");
        } else
          if (!parcialList || !parcialList.success) {
            console.log("Erro no consumo da API");
          } else
            if (parcialList.message.includes("name")) {
              inputNome.current.focus();
            } else
              if (parcialList.message.includes("phone")) {
                inputTelefone.current.focus();
              } else
                if (parcialList.data.length > 0) {
                  setListaContatos([])
                  // colocar focus no input nome
                  inputNome.current.focus();
                }
      })
  }

  function enterAdicionarContato(event) {
    if (event.code === "Enter") {
      adicionarContato();
    }
    else if ("Delete9)876-543(210Backspace".includes(event.key)) {
      const newValue = sanetizeInputPhone(event.target.value);
      setContato({ ...contato, telefone: newValue })
    }
  }


  //função ara sanetizarTelefone instantaneamente
  function sanetizeInputPhone(text) {
    text = text.replaceAll(/[^0-9]/gi, "").slice(0, 11)
    if (text.length > 10)
      text = text.replaceAll(/([0-9]{2})([0-9]{5})([0-9]{4})/gi, "($1) $2-$3")
    if (text.length > 6)
      text = text.replaceAll(/([0-9]{2})([0-9]{4})([0-9]{0,4})/gi, "($1) $2-$3")
    else if (text.length > 2)
      text = text.replaceAll(/([0-9]{2})([0-9]{0,4})/gi, "($1) $2")
    else
      text = text.replaceAll(/([0-9]{0,2})/gi, "$1")
    return text;
  }

  // carregar listaContatos da API
  useEffect(() => {
    const queryFetch = `${URL_API}/getall`
    fetch(queryFetch, { method: 'GET' })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("ocorreu um error");
      })
      .then((res) => { setListaContatos(res.data); })
      .catch((err) => { console.log(err); setParcialList(err) })
  }, [listaContatos])

  return (

    <div className="cad1">

      <Header />
      <div className="container-fluidtitulo">
        <h5 className="text-center">Faça seu Agendamento Aqui</h5>
      </div>
      <div className="container-fluidformulario">
        <div className="row">
          <div className="col p-3">
            <div className="row justify-content-center">
              <div className="col-10 col-sm-8 col-md-6 col-lg-4">
                <div className="mb-3">
                  <label className="form-label">Nome </label>
                  <br />
                  <input
                    type="text"
                    ref={inputNome}
                    onChange={definirNome}
                    value={contato.nome}
                    className='form-control'
                    placeholder="Digite o seu nome"
                  />
                </div>
                <div>
                  <label className="form-label">Telefone </label>
                  <br />
                  <input
                    type="text"
                    ref={inputTelefone}
                    onChange={definirTelefone}
                    onKeyUp={enterAdicionarContato}
                    value={contato.telefone}
                    className='form-control'
                    placeholder="telefone + DDD"
                    title="residencial: (xx)xxxx-xxxx ou movel: (xx)xxxxx-xxxx"
                  />
                </div>
              </div>
            </div>
            <button className='cont' onClick={adicionarContato}>Adicionar Contato</button>
          </div>
        </div>
        <div className="cont1">

          <a href="https://www.instagram.com/losramos.ofc/?hl=pt" target="_blank" rel="instagram">
            <img className='inst' src="/instagram.png" alt="iconeinstagram" /> </a>

          <a href="https://api.whatsapp.com/send/?phone=%2B5521983175307&text&type=phone_number&app_absent=0" target="_blank" rel="whatzap">
            <img className='what' src="/whatzap.png" alt="iconewhat" /></a>

        </div>
      </div>
      <Footer />
    </div>

  );
}

export default Cadastro;
