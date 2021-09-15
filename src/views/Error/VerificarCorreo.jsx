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
import { linkpreparador } from "configuracion/constantes.js";


const useStyles = makeStyles(styles);

const VerificarCorreo = (props) => {

    const history = useHistory();
    const classes = useStyles();
    const [tokenDes, setTokenDes] = useState([]);

    const token = {
        token: props.location.search.split("?")[1].split("&&")[1]
    }

    const page = props.location.search.split("?")[1].split("&&")[0]

    const URL= "/verificar-token"
    const rol = {
        rol: 1
    }
    const UsuarioURL = "/usuarios/"

    useEffect(() => {
        TokenVerified()
    }, [])

    async function Login(respuesta1) {
        try {         
            let usuario = {
              idusuario: respuesta1?.data?._id,
              nombre: respuesta1?.data?.nombre,
              apellidos: respuesta1?.data?.apellidos,
              email: respuesta1?.data?.correo,
              rol: 1,
              login: true,
              token: token.token
            }    
              props.setUsuarioValues(usuario).then(()=>{
                if(page==="cliente"){
                  history.push("/area-cliente")
                }else{
                  history.push(linkpreparador)
                }
              })

        }catch (e) {
          console.log(e);
        }
      }
    

    async function TokenVerified() {
        
        try {
          const respuesta1 = await AxiosConexionConfig.post(URL,JSON.stringify(token));
           setTokenDes(respuesta1);
           if(respuesta1!==null){
            await AxiosConexionConfig.patch(UsuarioURL+respuesta1.data._id,JSON.stringify(rol));
            //email registro usuario
            let valoresMail = {
              correoCliente: respuesta1?.data?.correo,
              correoPreparador: "",
              clienteNombre: respuesta1?.data?.nombre,
              preparadorNombre: "",
              fecha: "0"
            }
              
            //email registro usuario
            const e = AxiosConexionConfig.post("/sendMailClienteRegistrado", JSON.stringify(valoresMail));
  
            Login(respuesta1);
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
         <div className="verificado"><Cargando/></div>
      </div>
    </div>
  );
}
const mapStateToProps = (rootReducer) => {
  return { global: rootReducer.auth };
};

export default connect(mapStateToProps, authAction)(VerificarCorreo);

