import React from "react";


const ListaDesordenada = (props) => {
   const {lista}=props

    const listaDesordenada = (array) => {
        return(
            array.map((element,index)=>(
                <li key={index}>{element}</li>
            ))
        )
      }
    
    return(
        <div className="cargando">
            <ul>{listaDesordenada(lista)}</ul>
        </div>
    )
    
}

export default ListaDesordenada;