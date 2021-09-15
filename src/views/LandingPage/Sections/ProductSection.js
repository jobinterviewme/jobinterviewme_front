import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import uno from "../../../assets/img/001.png";
import dos from "../../../assets/img/002.png";
import tres from "../../../assets/img/003.png";
import "./ProductSection.scss"

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 id="uno" className={classes.title}>Quiénes somos</h2>
          <h5 className={classes.description}>
            Somos una Startup nacida para ayudarte a preparar entrevistas de trabajo.
            Nuestro objetivo es que exprimas todo tu potencial y que seas capaz de mostrarlo en un proceso de selección.
            Para ello queremos ofrecerte un amplio catálogo de profesionales con talento y ganas de ofrecerte una preparación.
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <div>


          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <img src={uno} />
            </GridItem>

            <GridItem xs={12} sm={12} md={8}>
              <h2 className={classes.title}>Escoge el preparador ideal</h2>
              <h5 className={classes.description}>
                Consulta libremente los perfiles y contacta con un fantástico profesional en recursos humanos
                que te puede guiar en tu próxima entrevista.
              Elígelo según tus criterios (tarifas, títulos, opiniones,…)</h5>
            </GridItem>
          </GridContainer>

          <GridContainer>
            <GridItem className="dosTexto" xs={12} sm={12} md={8}>
              <h2 id="dos" className={classes.title}>Haz un hueco en tu agenda</h2>
              <h5 className={classes.description}>
                Selecciona una fecha disponible para tu cita con el preparador y reserva-la</h5>
            </GridItem>

            <GridItem className="dosImg" xs={12} sm={12} md={4}>
              <img src={dos} />
            </GridItem>
          </GridContainer>

          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <img src={tres} />
            </GridItem>

            <GridItem xs={12} sm={12} md={8}>
              <h2 className={classes.title}>Disfruta del proceso</h2>
              <h5 className={classes.description}>
                Reúnete con el preparador para tener todas las herramientas para triunfar.
                Practica, traslada tus dudas, escucha, déjate asesorar y siéntete seguro en tu próxima entrevista
                </h5>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
