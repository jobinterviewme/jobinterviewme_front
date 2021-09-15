import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
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
import '../ProfilePage/ProfilePage.styles.scss'

import './AreaPersonal.style.scss'
import CardCitas from "components/CardCitas/CardCitas.component";

import { PrimeIcons } from 'primereact/api';

//conexion BBDD
import AxiosConexionConfig from "conexion/AxiosConexionConfig";
import { urlUsuarios } from "configuracion/constantes";
import { urlProfesional } from "configuracion/constantes";
import { urlCitas } from "configuracion/constantes";

import { Link } from "react-router-dom";

import * as authAction from "../../store/actions/authAction"
import { connect } from "react-redux";
import { Tooltip } from "antd";

const useStyles = makeStyles(styles);


const AreaPersonal=(props)=> {
  const classes = useStyles();
  const { ...rest } = props;

  const [usuario, setUsuario] = useState(null)
  const [profesional, setProfesional] = useState(null)
  const [citasPendiente, setCitasPendiente] = useState(null)
  const [reload,setReload] = useState(true);
  const [id, setId] = useState(false);
  const fechaHoy = new Date();
  let is1 = "";

    if(props.global.usuario!==null){
      is1 = props.global.usuario.idusuario;
    }

    useEffect(() => {
      
      if(props.global.idusuario!==""){
        const Usuarioo = {        
          nombre:props.global.nombre,
          apellidos:props.global.apellidos,
          correo: props.global.email,
          idusuario: props.global.usuario.idusuario
        } 
        setUsuario(Usuarioo);
      }     
    }, [props.global.idusuario]);

    useEffect(() => {
      if(reload){
        RefreshUsuario()
        setReload(false);
      }      
    }, [reload]);

    useEffect(() => {
      setCitasPendiente(null)    
    }, [props.global.usuario]);  

  async function RefreshUsuario() {    
    const citasProfesionalURL = "/citas?filter="
    
    const otro = {
      where:{
      idprofesional: is1       
      },  
      include: [{
        relation: "CitaUsuario"
      }]
    }    
   
    try {
      const citasProfesional = await AxiosConexionConfig.get(citasProfesionalURL + encodeURIComponent(JSON.stringify(otro)));
      console.log(citasProfesional.data)
      setCitasPendiente(citasProfesional.data);

      if(props.global.usuario){
        setProfesional(props.global.usuario);
      }
      
     
       //console.log(props)
    } catch (e) {
      console.log(e);
    }
  }
        

  return (
    <div>
      <Header
        color="white"
        brand=""
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
        {...rest}
      />

      <Parallax id="sombra" small filter color="headerGreen" >
        <div className={classes.container + " headerNameTitle"}>
          <GridContainer justify="flex-end">
          
              <GridItem xs={12} sm={12} md={12}>
              <Link to={"/perfilpro?"+(usuario !== null ? usuario.idusuario : "")}>
                <h3 className={classes.title + " nameTitle"}>{usuario !== null ? usuario.nombre +" "+ usuario.apellidos +" ": ""}
                  <Tooltip title="Ver perfil">
                    <i className="iconoVerPerfil pi pi-user p-mr-2"></i>
                  </Tooltip>
                </h3>
                </Link>

              </GridItem>

            

            <GridItem xs={12} sm={12} md={2}>
            </GridItem>

          </GridContainer>
        </div>
      </Parallax>

      

      <div className={"contenedorBlanco " + classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
          <Link className="DivIcon" to={"/area-cliente"}>

          <GridItem xs={12} sm={12} md={5}>
              <Tooltip title="Citas con profesionales">
                <div className="pasarCitas" >
                  <i className="iconPasarCitas pi pi-chevron-left p-mr-1"></i>
                  <h4>Citas con otros profesionales</h4>
                </div>
              </Tooltip>
          </GridItem>
          </Link>
            <GridContainer>
           
            
              <GridItem xs={12} sm={12} md={4}>
                <div className={classes.container + " contenedorGris"}>
                   <h4>Próximas citas</h4>

                   {citasPendiente !== null ?
                      citasPendiente.map((cita, index) => {

                        const fechaA = cita.fecha.split("-");
                        //const horaA = cita.hora.split(":");
                        const fechaCita =new Date(cita.fecha /*fechaA[0],fechaA[1]-1,fechaA[2]/*,horaA[0],horaA[1]*/);

                        if(fechaCita >= fechaHoy&&cita.confirmada!="decline"){
                          return(
                            <CardCitas cita={cita} setReload={(value)=>setReload(value)} tipo={null} confirmada={cita.confirmada} lugar="activa" fecha={new Date(cita.fecha)} nombre={cita.CitaUsuario.nombre} toolTipsText="Confirmar Cita"></CardCitas>
                          )
                        }else{
                          return (<></>);
                        }
                      }                  
                      ) : <></>
                    } 

                   
                </div>               
              </GridItem>

              <GridItem xs={12} sm={12} md={4}>  
              <div className={classes.container + " contenedorGris"}>
                   <h4>Historial</h4> 
                   {citasPendiente !== null ?
                      citasPendiente.map((cita, index) => {

                        const fechaA = cita.fecha.split("-");
                        //const horaA = cita.hora.split(":");
                        const fechaCita =new Date(cita.fecha/*fechaA[0],fechaA[1]-1,fechaA[2],/*horaA[0],horaA[1]*/);

                        if(fechaCita < fechaHoy&&cita.confirmada==="true"){
                          return(
                            <CardCitas cita={cita} setReload={(value)=>setReload(value)} tipo="deshabilitado" confirmada={cita.confirmada} lugar="activa" fecha={new Date(cita.fecha)} nombre={cita.CitaUsuario.nombre} toolTipsText="Confirmar Cita"></CardCitas>
                          )
                        }else{
                          return (<></>);
                        }
                      }                  
                      ) : <></>
                    } 
                   
                </div>              
                
              </GridItem>

              <GridItem xs={12} sm={12} md={4}>   
                <div className={classes.container + " contenedorGris"}>
                   <h4>Información de contacto</h4> 
                   <div><h6>{usuario !== null ? usuario.nombre : ""}</h6></div>
                   <div><h6>{usuario !== null ? usuario.apellidos : ""}</h6></div>
                   <div><h6>{usuario !== null ? usuario.correo : ""}</h6></div>            

                </div>    
              </GridItem>
            </GridContainer>

            
          </div>
        </div>
      </div>
    </div >
  );
}

const mapStateToProps = (rootReducer) => {
  return { global: rootReducer.auth };
};

export default connect(mapStateToProps, authAction)(AreaPersonal);

