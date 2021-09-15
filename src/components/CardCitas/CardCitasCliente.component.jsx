import React, { useState } from 'react';

import { Tooltip } from 'antd';
import { makeStyles, Icon} from '@material-ui/core';
import styles from "../../assets/jss/material-kit-react/tooltipsStyle.js";
import './CardCitas.style.scss';
import Button from "components/CustomButtons/Button.js";
import DialogCardCliente from 'components/DialogCard/DialogCardCliente.component.jsx';

const useStyles = makeStyles(styles);

const CardCitasCliente = (props) => {

const {nombre, toolTipsText, confirmada, fecha, lugar}= props;
const cita=props.cita;

let tipo = props.tipo;
const today = new Date();

const [Modal1Visible, setModal1Visible] = useState(false);

if(tipo!=="deshabilitado"){
    
if(confirmada === "true"   ){
    tipo = "aceptado";
}else{
    if(confirmada === "false" ){
        
       tipo = "pendiente"}
        
}}

 const ConfirmarCita=(e)=>{
    e.preventDefault();
    setModal1Visible(true);
 }

    return (
        <>
            <Button 
                onClick={e => ConfirmarCita(e) }
                id={tipo}
                className="cardCitas"  
                tooltip="Enter your username" tooltipOptions={{position: 'right'}}         
            >

            {nombre}<br/>
            {tipo!=="deshabilitado"?<span id="alerta">{cita.confirmada==="true"?"Confirmada":"Pendiente de confirmación  "}
            </span>:<></>}
            </Button>

            <DialogCardCliente cita={cita} setReload={(value)=>props.setReload(value)} nombre={nombre} modal1Visible={Modal1Visible} setModal1Visible={(value)=>setModal1Visible(value)}/>
        </>
    );
}

export default CardCitasCliente