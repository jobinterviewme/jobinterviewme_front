import { makeStyles } from "@material-ui/core";
import styles from "../../assets/jss/material-kit-react/views/profilePage.js";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Header from "components/Header/Header";
import HeaderLinks from "components/Header/HeaderLinks";
import Parallax from "components/Parallax/Parallax";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as authAction from "../../store/actions/authAction"
import classNames from "classnames";
import './Verificar.scss';
import AxiosConexionConfig from "conexion/AxiosConexionConfig.js";
import { useHistory } from "react-router";
import Cargando from "../../components/Cargando/Cargando.component"


const useStyles = makeStyles(styles);

const Mensaje = (props) => {

    const history = useHistory();
    const classes = useStyles();
    

return (
    <div>
      <Header
        fixed
        color="white"
        brand=""
        rightLinks={<HeaderLinks />}
      />

      <Parallax small color="headerGreen" >

        <div className={classes.container + " headerNameTitle"}>
          <GridContainer justify="flex-end">

            <GridItem xs={12} sm={12} md={6}>
              <h3 className={classes.title + " nameTitle"}>Verificación del correo</h3>
            </GridItem>


          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)+ " verificadoDiv"}>
         <h6 className="verificado">Acceda su correo electrónico para verificar que sus datos son válidos.</h6>

      </div>
    </div>
  );
}
const mapStateToProps = (rootReducer) => {
  return { global: rootReducer.auth };
};

export default connect(mapStateToProps, authAction)(Mensaje);

