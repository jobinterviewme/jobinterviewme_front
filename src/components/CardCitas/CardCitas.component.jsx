import React, { useState } from 'react';

import { Tooltip } from 'antd';
import { makeStyles, Icon} from '@material-ui/core';
import styles from "../../assets/jss/material-kit-react/tooltipsStyle.js";
import './CardCitas.style.scss';
import Button from "components/CustomButtons/Button.js";
import DialogCard from 'components/DialogCard/DialogCard.component.jsx';

const useStyles = makeStyles(styles);

const CardCitas = (props) => {

const {nombre, toolTipsText, confirmada, fecha, lugar}= props;
const cita=props.cita;

let tipo = props.tipo;
const today = new Date();

const [Modal1Visible, setModal1Visible] = useState(false);

if(tipo!=="deshabilitado"){
    
if(confirmada === "true"   ){
    tipo = "aceptado";
}else{
    if(confirmada === "false" && (fecha-today<(2*86400000))  ){
        
       tipo = "warning"}
        else{
            tipo = "pendiente";
        }
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

            {tipo!=="deshabilitado"?
                tipo==="warning"?(<span id="alerta">¡Cita próxima sin confirmación!</span>)
            :(<></>):(<></>)}

            </Button>

            <DialogCard cita={cita} setReload={(value)=>props.setReload(value)} modal1Visible={Modal1Visible} setModal1Visible={(value)=>setModal1Visible(value)}/>
        </>
    );
}

export default CardCitas