import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import StepWizard from 'react-step-wizard';
import { ErrorMessage, Formik, Field } from "formik";
import * as yup from "yup";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import './FormPreparador.styles.scss'
import Presentacion from "./Presentacion";
import AxiosConexionConfig from "conexion/AxiosConexionConfig";
import { urlProfesional, urlUsuarios } from "configuracion/constantes";
import LoginPage from "views/LoginPage/LoginPage";
import Oferta1 from "./Oferta1";
import { useHistory } from "react-router";
import { linkperfilpor } from "../../configuracion/constantes"

import * as authAction from "../../store/actions/authAction"
import { connect } from "react-redux";

const useStyles = makeStyles(styles);

const FormPrepador = (props) => {
  const classes = useStyles();
  const { ...rest } = props;
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nombrePerfil, setNombrePerfil] = useState("")
  const [annosExperiencia, setannosExperiencia] = useState("")
  const [experiencia, setexperiencia] = useState("")
  const [imagenperfil, setimagenperfil] = useState("")
  const [sectores, setsectores] = useState([])
  const [perfiles, setperfiles] = useState([])
  const [idiomas, setidiomas] = useState([])
  const [tipoPreparación, settipoPreparación] = useState("")
  const [duracion, setduracion] = useState("")
  const [canales, setcanales] = useState([])
  const [hashtags, setHashtags] = useState("")
  const [tarifa, settarifa] = useState(0)
  const [idusuario, setidUsuario] = useState("")
  const [agenda, setAgenda] = useState(null)
  const [diasNulos, setDiasNulos] = useState(null)

  const [existe, setExiste] = useState(false)
  const [cargando, setCargando] = useState(false)

  const usuario = {
    nombre: nombre,
    apellido: apellido,
    email: email,
    password: password
  }

  const valoresIniciales = {
    nombrePerfil: nombre,
    annosExperiencia: annosExperiencia,
    experiencia: experiencia,
    imagenperfil: imagenperfil,
    sectores: sectores,
    perfiles: perfiles,
    idiomas: idiomas,
    hashtags: hashtags
  }
  const valoresSecundarios = {
    tarifa: tarifa,
    tipoPreparación: tipoPreparación,
    canales: canales,
    duracion: duracion,
    agenda: agenda,
    hashtags: hashtags,
    diasNulos: diasNulos
  }

  const setValoresUsuarios = (valores) => {
    setNombre(valores.nombre)
    setApellido(valores.apellido)
    setEmail(valores.email)
    setidUsuario(valores.idusuario)
    BuscarUsuarioPorEmail(valores.email)
  }

  const primerosValores = (valores) => {
    setNombrePerfil(valores.nombrePerfil)
    setannosExperiencia(valores.annosExperiencia)
    setexperiencia(valores.experiencia)
    setimagenperfil(valores.imagenperfiles)
    setsectores(valores.sectores)
    setperfiles(valores.perfiles)
    setidiomas(valores.idiomas)
  }

  const segundosValoresSinBD = (valores) => {
    settarifa(valores.tarifa)
    settipoPreparación(valores.tipoPreparacion)
    setcanales(valores.canales)
    setduracion(valores.duracion)
    setAgenda(valores.agenda)
    setHashtags(valores.hashtags)
    setDiasNulos(valores.calendario)
  }


  async function segundosValores(valores) {

    setCargando(true)

    settarifa(valores.tarifa)
    settipoPreparación(valores.tipoPreparacion)
    setcanales(valores.canales)
    setduracion(valores.duracion)
    setAgenda(valores.agenda)
    setHashtags(valores.hashtags)
    setDiasNulos(valores.calendario)

    if (idusuario !== "") {
      const dataValue = {
        idusuario: idusuario,
        nombreperfil: nombrePerfil,
        annosexperiencia: annosExperiencia,
        experiencia: experiencia,
        imagen: (imagenperfil.length !== 0 && imagenperfil[0] ? imagenperfil[0].thumbUrl : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXz8/TR0tTOz9Ly8vPT1Nbv7/DW19nf3+Hc3N7l5uft7e7Oz9Hi4+Tm5+jq6uzY2dvJw9RkAAAD2ElEQVR4nO3cf5OcIAwG4EPFX7i73//bVs56Wle9BWIS7Pv8cdPZTjubAUKIeF9fAAAAAAAAAAAAAAAAAAAAAAAAAAAAQM/2j6atjfNM3TaP3kp/JUp28MGZNR/mcJMgbfcyR15d/kHapnaHAY5DWTd5x2ib6iS8SZVxjGX3e3yjouqkv2kke7z+tl5ZDuNnAzhP1QyHcQiIzxukv3Cg8vMZOnuV0l86RNmebRH7XJtRiBEjmNcoxoxgXqPYRMXnNdJf/TND3Ah+j2IWGfUZsg9uVU/pr/87WycEaEytv7qJX4QT9UvxmRigMcrnadkmR6h8y+iSAzRGdxGekkdnlXQQZ57xW+HCaV6J6avQa6XDONZTTNJxmvbSgRwaCpIIC721W9yh6d1LOpAjliLPeE5r6UaxGU60bok0mdRTmk3LtFPFWq2zciPaKzyl+0XS0XcToc6y5kEWoDEP6WB2hXa5z+jc8+8fYWr/Yk1nLwMRIkL9Ed4/09w/QrqjhdbDxf2rtvtX3vc/Pd3/BPwfdDF6mmaiMU7nMhxRLcRaOpBDVHu+zv3eI9oRle6GXuRNoS3NN4c6kqdrWjPpt9s/ISXJNXrzjBdwL/iI9vvC6U1Tna3SldRBVPvs8EfiGUrpuekfafNU/Rz1moTblzp7bFsJlY3mamYt+gJmBlcv/7Jx2abKJsAxocaMYp1BGl1ETNR8pugk+KKp8mule8JC1NpdO2S70GlaZ/XCbDmcvhq7z9VDLhPVDrGlaZXH291dxPgt49ipH8c+9fSkfFcsKZ50N4qH8UnUTdTaLy0TXlr7l9OZVQlel1lorHAInwB7+roZD9oAxxCV9TMob5rMVHWGrwhQVYiU973W1PSlrgpQzShS3oXaUvGg7coAVYRIeNdrj/wTb+KNfidE4a2f6Mn9GeE++HVpdCG6Z1C+RHJMsH67fBFOBJci5XnpjFgz9dqdcE1oV0z8LSYhhJ5pcOTRmUg+JXuv+RMi7z5zpZmJQLK5uB7dEqhPeYdQYBB7zlXosd/95h5C9kFkqtfWmGu3a5pr51ibNgzHwnesB0WS35YUivW3K3EWbAvG0q3kzzNexTdNmeuZnwj5pqnMJGWcpiKZ1GPLppGXK9OxXc98SOwVnuPqukktQ76FyNef2eJ69VIsQGN4AuwFI+Q5X/C08vfxpBqJk9OM5wQll0q5kil/A2PB0sogvb8WHCFH3SZWlXoslSnjA5l3LI9oEOENIqycc4Wbfyx/LPzPzWdu+qw4+Ce7f/32364+y+n1NgAAAAAAAAAAAAAAAAAAAAAAAAAAABF/AJFUOXlopSvSAAAAAElFTkSuQmCC"),
        sectores: sectores.toString(),
        perfiles: perfiles.toString(),
        idiomas: idiomas.toString(),
        tipopreparacion: valores.tipoPreparacion,
        duracion: valores.duracion,
        hashtags: valores.hashtags.toString(),
        canales: valores.canales.toString(),
        tarifa: valores.tarifa,
        fechasnulas: valores.calendario,
      }

      const rols = {
        rol: 2
      }
      const url = urlProfesional;
      const urlAgenda = '/profesional-agenda'
      const urlUsuario = urlUsuarios + '/' + idusuario;

      try {
        const respuesta = await AxiosConexionConfig.post(url, JSON.stringify(dataValue));
        const updateRol = await AxiosConexionConfig.patch(urlUsuario, JSON.stringify(rols));
        //email registro profesional

        let valoresMail = {
          correoCliente: " ",
          correoPreparador: email,
          clienteNombre: " ",
          preparadorNombre: nombrePerfil,
          fecha: "0"
        }

        console.log(valoresMail)

        //email registro usuario
        AxiosConexionConfig.post("/sendMailClienteRegsitrado", JSON.stringify(valoresMail));


        const array = valores.agenda;

        const respuest1 = await AxiosConexionConfig.post(urlAgenda, JSON.stringify(array[0]));
        const respuest2 = await AxiosConexionConfig.post(urlAgenda, JSON.stringify(array[1]));
        const respuest3 = await AxiosConexionConfig.post(urlAgenda, JSON.stringify(array[2]));
        const respuest4 = await AxiosConexionConfig.post(urlAgenda, JSON.stringify(array[3]));
        const respuest5 = await AxiosConexionConfig.post(urlAgenda, JSON.stringify(array[4]));
        const respuest6 = await AxiosConexionConfig.post(urlAgenda, JSON.stringify(array[5]));
        const respuest7 = await AxiosConexionConfig.post(urlAgenda, JSON.stringify(array[6]));


        if (respuesta.status === 200 && respuest1 && respuest2 && respuest3 && respuest4 && respuest5 && respuest6 && respuest7 && updateRol) {
          dataValue.agenda = valores.agenda;
          props.setUsuario(dataValue)
          history.push(linkperfilpor + "?" + idusuario)
        }

        setCargando(false)

      } catch (e) {
        setCargando(false)
      }
    }
  }

  const history = useHistory()


  async function UploadUsuario() {
    const dataValue = {
      correo: email,
      nombre: nombrePerfil
    }
    const url = urlUsuarios;
    try {
      const respuesta = await AxiosConexionConfig.post(url, JSON.stringify(dataValue));
      if (respuesta.status === 200) {
        setidUsuario(respuesta.data.idusuario)
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function BuscarUsuarioPorEmail(usuarioEmail) {
    const condisiones = JSON.stringify({ where: { correo: { like: '%' + usuarioEmail + '%' } } })
    const url = urlUsuarios + "?filter=" + encodeURIComponent(condisiones);
    try {
      const respuesta = await AxiosConexionConfig.get(url);
      if (respuesta.data.length > 0) {
        setExiste(true)

      }
    } catch (e) {
      console.log(e);
    }
  }

  async function uploadData() {
    const dataValue = {
      idusuario: idusuario,
      nombreperfil: nombrePerfil,
      annosexperiencia: annosExperiencia,
      experiencia: experiencia,
      imagen: (imagenperfil !== undefined && imagenperfil[0] !== undefined ? imagenperfil[0].thumbUrl : null),
      sectores: sectores.toString(),
      perfiles: perfiles.toString(),
      idiomas: idiomas.toString(),
      tipopreparacion: tipoPreparación,
      duracion: duracion,
      hashtags: hashtags,
      canales: canales.toString(),
      tarifa: tarifa
    }
    const url = urlProfesional;
    try {
      const respuesta = await AxiosConexionConfig.post(url, JSON.stringify(dataValue));
      if (respuesta.status === 200) {
        props.setUsuario(dataValue)
        history.push(linkperfilpor + "?" + idusuario)
      }
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div>
      <Header
        fixed
        color="white"
        brand=""
        rightLinks={<HeaderLinks />}
        {...rest}
      />

      <Parallax small color="headerGreen" >

        <div className={classes.container + " headerNameTitle"}>
          <GridContainer justify="flex-end">

            <GridItem xs={12} sm={12} md={6}>
              <h3 className={classes.title + " nameTitle"}>Presentación</h3>
            </GridItem>


          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <StepWizard isLazyMount={true}>
          <LoginPage usuario={usuario} setValoresUsuarios={(valores) => { setValoresUsuarios(valores) }} />
          <Presentacion valores={valoresIniciales} primerosValores={(valores) => { primerosValores(valores) }} />
          <Oferta1 cargando={cargando} valores={valoresSecundarios} segundosValoresSinBD={(valores) => { segundosValoresSinBD(valores) }} segundosValores={(valores) => { segundosValores(valores) }} />
        </StepWizard>
      </div>
    </div>
  );
}
const mapStateToProps = (rootReducer) => {
  return { global: rootReducer.auth };
};

export default connect(mapStateToProps, authAction)(FormPrepador);

