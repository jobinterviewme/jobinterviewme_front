/*eslint-disable*/
import React, { Fragment, useState } from "react";

// react components for routing our app without refresh
import { Link, useHistory } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// core components
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import './HeaderLink.styles.scss';
import { linkpreparador, linkAreaPersonalCliente } from "configuracion/constantes";
import { linklogout, linkAreaPersonalProfesional } from "configuracion/constantes";
import * as authAction from "../../store/actions/authAction"
import { connect } from "react-redux";


const useStyles = makeStyles(styles);

function HeaderLinks(props) {

  const classes = useStyles();

  const history = useHistory();


  const onChangeVisible = () => {
    props.setVisible();
    props.setMobileOpen()
  }

  const onChangeVisibleUp = () => {
    props.setVisibleUp();
    props.setMobileOpen()
  }

  const onClickAyuda = () => {
    history.push("/ayuda")
  }

  const onClickCerrarsesion = () => {
    history.push(linklogout)
  }

  const onClickAreaPersonalPROF = () => {
    history.push(linkAreaPersonalProfesional)
  }

  const onClickAreaPersonalcliente = () => {
    history.push(linkAreaPersonalCliente)
  }

  const onClickserPreparador = () => {
    history.push(linkpreparador)
  }

  const AreaPersonal = () => {
    if (props.global.email !== "") {
      if (props.global.usuario !== null) {
        return (
          <ListItem className={classes.listItem}>
            <Button
              color="transparent"
              target="_self"
              className={classes.navLink}
              onClick={() => onClickAreaPersonalPROF()}
            >
              Área personal
          </Button>
          </ListItem>)
      } else {
        return (
          <ListItem className={classes.listItem}>
            <Button
              color="transparent"
              target="_self"
              className={classes.navLink}
              onClick={() => onClickAreaPersonalcliente()}
            >
              Área personal
          </Button>
          </ListItem>)
      }
    } else {
      return (
        <Fragment></Fragment>)
    }
  }

  const SerPreparador = () => {
    if (props.global.usuario === null) {
      return (
        <ListItem className={classes.listItem}>
          <Button
            color="transparent"
            className={classes.navLink}
            onClick={() => onClickserPreparador()}>
            Ser Preparador
          </Button>
        </ListItem>
      )
    }
  }

  return (
    <List id="header" className={classes.list}>
      {SerPreparador()}
      {AreaPersonal()}

      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          target="_self"
          className={classes.navLink}
          onClick={() => onClickAyuda()}
        >
          Ayuda
        </Button>
      </ListItem>

      {props.global.login ?
        <ListItem className={classes.listItem}>
          <Button
            color="transparent"
            target="_self"
            className={classes.navLink}
            onClick={() => onClickCerrarsesion()}
          >
            Cerrar Sesión
          </Button>
        </ListItem> : (
          <>
            <ListItem className={classes.listItem}>

              <Button
                color="transparent"
                target="_self"
                className={classes.navLink}
                onClick={() => onChangeVisible()}
              >
                Conectarse
              </Button>

            </ListItem>

            <ListItem className={classes.listItem}>
              <Button
                color="transparent"
                className={classes.navLink}
                onClick={() => onChangeVisibleUp()}>
                Inscribirse
              </Button>

            </ListItem>
          </>
        )}
    </List>
  );
}


const mapStateToProps = (rootReducer) => {
  return { global: rootReducer.auth };
};

export default connect(mapStateToProps, authAction)(HeaderLinks);