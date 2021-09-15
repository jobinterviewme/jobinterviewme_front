import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import './LandingPage.scss';

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";
import WorkSection from "./Sections/WorkSection.js";
import image from '../../assets/img/landing-bg.jpg';
import { Link } from "@material-ui/core";
import { Redirect, useHistory } from "react-router";
import { linkSearchPage } from "configuracion/constantes";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const history = useHistory()
  const classes = useStyles();
  const { ...rest } = props;

  const goToBusqueda = () => {
    history.push(linkSearchPage)
  }



  return (
    <div>

      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Material Kit React"
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />

      <Parallax id="landingImg" filter image={image}>

        <div className={classes.container}>
          <GridContainer className="primerGrid">
            <GridItem xs={12} sm={12} md={6} lg={6}>
              <h1 className={classes.title}> Descubre como se prepara una entrevista profesional</h1>
            </GridItem>

            <GridItem xs={12} sm={12} md={6} lg={6} className="segundoItem">
              <Button
                size="lg"
                href=""
                target="_self"
                className="buttonN"
                rel="noopener noreferrer"
                onClick={() => goToBusqueda()}
              >Buscar mi preparador
              </Button>
            </GridItem>
          </GridContainer>


        </div>
      </Parallax>

      <div className={"divLanding " + classNames(classes.main, classes.mainRaised)}>

        <div className={classes.container}>
          <ProductSection />

        </div>
      </div>
    </div>
  );
}
