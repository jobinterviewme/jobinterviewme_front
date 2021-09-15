
import React from "react";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { makeStyles } from "@material-ui/core";
import styles from "../../assets/jss/material-kit-react/views/loginPage.js";
import './LogUpCard.styles.scss';

const useStyles = makeStyles(styles);




function Texto(props) {

    const classes = useStyles();


    //const [cardAnimaton3, setCardAnimation3] = React.useState("");

    let cardAnimation3 = ""

    props.hidden?
    cardAnimation3 = "cardHidden" : cardAnimation3 = "";

    /*props.hidden?
    setCardAnimation3(""):setCardAnimation3("cardHidden");*/

return (
    < >
        
        <h3 id="question">¿Quieres ayudar a triunfar?</h3>
              <div id="margen"></div>

              <h4 >Prepara a tu manera</h4>

              <li className="listaFormPreparador">Tú defines el precio</li>

              <li className="listaFormPreparador">Cuándo quieres trabajar</li>

              <li className="listaFormPreparador">El formato de tu preparación</li>

              <li className="listaFormPreparador">Cuéntanos un poco de tu experiencia</li>

              <li className="listaFormPreparador">En 3 minutos tu perfil estará listo</li>

              </>
)}
export default Texto;