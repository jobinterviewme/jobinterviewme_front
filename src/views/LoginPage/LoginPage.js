import React, { useEffect } from "react";

//styles
import { makeStyles } from "@material-ui/core/styles";
import './LoginPage.style.scss';
import styles from "assets/jss/material-kit-react/views/loginPage.js";

//componentes
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Texto from '../../components/LogTextCards/Texto.component.jsx';
import LogUpCard from "../../components/LogTextCards/LogUpCard.component";

//redux
import * as authAction from "../../store/actions/authAction"
import { connect } from "react-redux";
import AxiosConexionConfig from "conexion/AxiosConexionConfig";
import { urlUsuarios } from "configuracion/constantes";
import { linkperfilpor } from "configuracion/constantes";
import { useHistory } from "react-router";

const useStyles = makeStyles(styles);

function LoginPage(props) {
  const history = useHistory()
  //console.log(props)
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  const classes = useStyles();
  const { ...rest } = props;

  useEffect(() => {
    if (props.global.email !== "") {
      if (props.global.usuario !== null) {
        history.push(linkperfilpor + "?" + props.global.usuario.idusuario)
      } else {
        const usuario = {
          nombre: props.global.nombre,
          apellido: props.global.apellidos,
          email: props.global.email,
          idusuario: props.global.idusuario
        }
        props.setValoresUsuarios(usuario)
        props.goToStep(2)
      }
    }
  }, [props.global.usuario, props.global.email]);

  async function BuscarUsuarioPorEmail(usuarioEmail) {
    const condisiones = JSON.stringify({ where: { correo: { like: '%' + usuarioEmail + '%' } } })
    const url = urlUsuarios + "?filter=" + encodeURIComponent(condisiones);
    try {
      const respuesta = await AxiosConexionConfig.get(url);
      console.log(respuesta.data[0].idusuario)
      if (respuesta.data.length > 0) {

        //history.push(linkperfilpor + "?" + idusuario)
        //props.goToStep(2)
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundColor: "white",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container + " contenedorLogin"}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={5}>
              <Texto hidden={false} />
            </GridItem>

            <GridItem xs={12} sm={12} md={5}>
              <LogUpCard link="serPreparador" page="preparador" handleCancel={() => console.log("inscripcion formPreparador")} animation={cardAnimaton} />
            </GridItem>
          </GridContainer>


        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (rootReducer) => {
  return { global: rootReducer.auth };
};

export default connect(mapStateToProps, authAction)(LoginPage);