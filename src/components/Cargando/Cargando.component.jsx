import React from "react";
import { ProgressSpinner } from 'primereact/progressspinner';
import './Cargando.style.scss';

const Cargando = () => {

    return(
        <div className="cargando">
            <ProgressSpinner/>
            <h4>Cargando... </h4>
        </div>
    )
}

export default Cargando;