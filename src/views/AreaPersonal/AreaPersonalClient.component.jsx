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
import { Tooltip } from "antd";

import Button from "components/CustomButtons/Button.js";




import styles from "assets/jss/material-kit-react/views/profilePage.js";
import '../ProfilePage/ProfilePage.styles.scss'

import './AreaPersonal.style.scss'

//conexion BBDD
import AxiosConexionConfig from "conexion/AxiosConexionConfig";


import * as authAction from "../../store/actions/authAction"
import { connect } from "react-redux";
import CardCitasCliente from "components/CardCitas/CardCitasCliente.component";

import { Link } from "react-router-dom";
import { Redirect, useHistory } from "react-router";


import { linkSearchPage } from "configuracion/constantes";
import carga from 'assets/img/carga.gif'



const useStyles = makeStyles(styles);

const AreaPersonalCiente=(props)=> {
  const classes = useStyles();
  const { ...rest } = props;

  const [usuario, setUsuario] = useState(null)
  const [profesional, setProfesional] = useState(null)
  const [citas, setCitas] = useState(null)
  const [reload,setReload] = useState(true);
  const [id, setId] = useState(false);
  const [cargando, setCargando] = useState(false)

  const fechaHoy = new Date();
  const history=useHistory()


  let is1 = "";

   /* if(props.global.usuario!==null){
      is1 = props.global.usuario.idusuario;
    }*/

    useEffect(() => {
     
        RefreshUsuario()
            
    }, [props.global.email]);

    useEffect(() => {
     // setCitas(null)    
    }, [props.global.usuario]);  

    useEffect(() => {
      if(reload){
        RefreshUsuario()
        setReload(false);
      }      
    }, [reload]);

  async function RefreshUsuario() {    

    const whereCorreo = {
      where:{
        correo: props.global.email       
      },  
      include: [{
        relation: "UsuarioCitas",
        scope:{
          include: [{
            relation:"CitaProfesional"
            }]}
        }]
      }      

    const UsuarioURL = "/usuarios?filter="
  
    try {
      const Usuario = await AxiosConexionConfig.get(UsuarioURL + encodeURIComponent(JSON.stringify(whereCorreo)));
      console.log(Usuario.data[0].UsuarioCitas);
  
      if(Usuario.data[0]?.UsuarioCitas!==null && Usuario.data[0]?.UsuarioCitas!==undefined) {
       setCitas(Usuario.data[0].UsuarioCitas);
      }

       
    } catch (e) {
      console.log(e);
    }
  }

  const goToBusqueda=()=>{
    history.push(linkSearchPage)
    
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

      <Parallax id="sombra" small filter color="orange" >
        <div className={classes.container + " headerNameTitle "}>
          <GridContainer >            
              <GridItem xs={12} sm={12} md={12}>
                <h3 className={classes.title + " nameTitle"}>{usuario !== null ? usuario.nombre +" "+ usuario.apellidos +" ": ""}
                
                  {props.global?.nombre + " " + props.global?.apellidos} 
                </h3>
              </GridItem>

            <GridItem xs={12} sm={12} md={2}>
            </GridItem>

          </GridContainer>
        </div>
      </Parallax>

      

      <div className={"contenedorBlanco " + classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            {(props.global.usuario!==null)?(
              <GridContainer className="este" justify="flex-end">
              <Link className="DivIconR" to={"/area-profesional"}>

              <GridItem xs={12} sm={12} md={12}>
                  <Tooltip title="Mis citas">
                    <div className="pasarCitas" >                  
                      <h4>Mis citas</h4>
                      <i className="iconPasarCitas pi pi-chevron-right p-mr-1"></i>
                    </div>
                  </Tooltip>
              </GridItem>
              </Link>
              </GridContainer>
            ):(
              <></>
            )}
          
            
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <div className={classes.container + " contenedorGris"}>
                   <h4>Próximas citas</h4>

                    <Button
                      size="lg"
                      href=""
                      target="_self"
                      className="buttonN"
                      rel="noopener noreferrer" 
                      onClick={()=>goToBusqueda()}
                    >Buscar mi preparador
                    </Button>

                   {citas !== null ?
                      citas.map((cita, index) => {

                        const fechaA = cita?.fecha.split("-");
                        //const horaA = cita?.hora.split(":");
                        const fechaCita =new Date(cita.fecha/*,horaA[0],horaA[1]*/);

                        if(fechaCita >= fechaHoy&&cita.confirmada!="decline"){
                          return(
                            <CardCitasCliente cita={cita} setReload={(value)=>setReload(value)} tipo={null} confirmada={cita.confirmada} lugar="activa" fecha={new Date(cita.fecha)} nombre={cita.CitaProfesional.nombreperfil} ></CardCitasCliente>
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
                   {citas !== null ?
                      citas.map((cita, index) => {

                        const fechaA = cita?.fecha.split("-");
                       const fechaCita =new Date(cita.fecha);

                        if(fechaCita < fechaHoy&&cita?.confirmada==="true"){
                          return(
                            <CardCitasCliente cita={cita} setReload={(value)=>setReload(value)} tipo="deshabilitado" confirmada={cita.confirmada} lugar="activa" fecha={new Date(cita.fecha)} nombre={cita.CitaProfesional.nombreperfil} ></CardCitasCliente>
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
                  <div>
                  <h6>{props.global?.nombre}</h6>
                  </div>
                  <div>
                  <h6>{props.global?.apellidos}</h6>  
                  </div> 
                  <div> 
                    <h6>{props.global?.email}</h6>
                  </div>             

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

export default connect(mapStateToProps, authAction)(AreaPersonalCiente);

