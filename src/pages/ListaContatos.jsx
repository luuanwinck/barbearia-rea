import React from 'react'
import { v4 as chave } from "uuid";

function ListaContatos({listaContatos}) {
    return (
        <>
                {listaContatos.map(contato => {
                    return (
                      <div className='lista-contato' key={chave()}>
                        {contato.name + "-" + contato.phone}
                      </div>
                    );
                })}
        </>
    )
}

export default ListaContatos