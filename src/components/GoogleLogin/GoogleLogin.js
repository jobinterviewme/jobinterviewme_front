import React from 'react';
import GoogleLogin from 'react-google-login';

import * as authAction from "../../store/actions/authAction"
import { connect } from "react-redux";
import { Button } from 'antd';
import AxiosConexionConfig from 'conexion/AxiosConexionConfig';
import { useHistory } from 'react-router';
import { linkAreaPersonalProfesional } from 'configuracion/constantes'
import { linkContratarCita } from 'configuracion/constantes';
import { linkAreaPersonalCliente, linkpreparador } from 'configuracion/constantes';

const GoogleLoginComponent = (props) => {

  const { link, texto, idusuario } = props;

  const definirLink = (prof) => {

    if (link === "areaPersonal") {
      if (prof) {
        return linkAreaPersonalProfesional
      } else {
        return linkAreaPersonalCliente
      }
    } else {
      if (link === "contratar") {
        return linkContratarCita + "?" + idusuario
      } else {
        if (link == "serPreparador") {
          if (prof) {
            return linkAreaPersonalProfesional
          } else {
            return linkpreparador
          }
        }
      }
    }
  }

  const failureGoogle = (response) => {
    console.log(response);
  }

  const responseGoogle = (response) => {
    let usuario = {
      nombre: response.profileObj.givenName,
      apellidos: response.profileObj.familyName,
      email: response.profileObj.email,
      login: true,
      rol: 1
    }
    Profesional(usuario);
  }

  const history = useHistory()

  async function Profesional(usuario) {
    const UsuarioURL = "/usuarios?filter[where][correo]=" + usuario.email;
    const ProfesionalURL = "/profesionals?filter[where][idusuario]=";

    try {
      AxiosConexionConfig.get(UsuarioURL).then((usser) => {

        //si no existe el usuario en la BD
        if (usser.data.length === 0) {
          let valores = {
            nombre: usuario.nombre,
            apellidos: usuario.apellidos,
            correo: usuario.email,
            rol: 1
          }
          //se crea el usuario
          AxiosConexionConfig.post("/usuarios", JSON.stringify(valores));

          let valoresMail = {
            correoCliente: usuario?.email,
            correoPreparador: "",
            clienteNombre: usuario?.nombre,
            preparadorNombre: "",
            fecha: "0"
          }

          //email registro usuario
          AxiosConexionConfig.post("/sendMailClienteRegistrado", JSON.stringify(valoresMail));

          //no es profesional
          const LinkFinal = definirLink(false);
          history.push(LinkFinal)

        } else {
          AxiosConexionConfig.get(ProfesionalURL + usser.data[0].idusuario).then((prof) => {

            let LinkFinal = "";
            //si es profesional
            if (prof.data.length > 0) {
              //llenamos el redux
              props.setUsuario(prof.data[0]);

              //sí es profesional
              LinkFinal = definirLink(true);
            } else {
              //no es profesional
              LinkFinal = definirLink(false);
            }
            history.push(LinkFinal)
          })
        }


        let urlCondicion = {
          where: {
            correo: usuario.email
          }
        }
        AxiosConexionConfig.get("/usuarios?filter=" + decodeURI(JSON.stringify(urlCondicion))).then((respuesta) => {
          usuario.idusuario = respuesta.data[0].idusuario;
          usuario.rol = respuesta.data[0].rol;
          props.setUsuarioValues(usuario);
        })

      }
      )
    } catch (e) {
      console.log(e);
    }
  }


  return (
    <GoogleLogin
      clientId="100585179204-fuunmalqpjh4et30isc4odk64jmuj41v.apps.googleusercontent.com"
      //redirectUri="https://jobinterviewme.com"
      buttonText="Login"
      render={renderProps => (
        <>
          <Button
            justIcon
            href="#pablo"
            target="_blank"
            type="primary"
            className="login-form-button"
            onClick={renderProps.onClick}
          >
            {texto}
          </Button>

        </>
      )}
      onSuccess={responseGoogle}
      onFailure={failureGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
}

const mapStateToProps = (rootReducer) => {
  return { global: rootReducer.auth };
};

export default connect(mapStateToProps, authAction)(GoogleLoginComponent);
