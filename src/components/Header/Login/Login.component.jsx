import { Modal, Form, Input, Space, Select, TimePicker, Row, Col, Tag, InputNumber } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import './Login.style.scss'

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import GoogleLogin from "components/GoogleLogin/GoogleLogin"
import { makeStyles } from "@material-ui/core";
import styles from "../../../assets/jss/material-kit-react/views/loginPage.js";
import Button from "components/CustomButtons/Button.js";
import md5 from "md5";
import AxiosConexionConfig from 'conexion/AxiosConexionConfig';
import { connect } from 'react-redux';
import * as authAction from "../../../store/actions/authAction"
import { useHistory } from 'react-router';
import { Messages } from 'primereact/messages';
import carga from 'assets/img/carga.gif'



const useStyles = makeStyles(styles);

const LoginPopUp = (props) => {

  const history = useHistory()

  const [cargando, setCargando] = useState(false)


  const classes = useStyles();

  const onFinish = values => {
    Login(values.email ,md5(values.password));
  };

  async function Login(user, password) {
    const loginURL = "/login";
    const ProfesionalURL = "/profesionals?filter[where][idusuario]=";

    let valores = {
      username: user,
      password: password,
    }
    setCargando(true)

    try {
      AxiosConexionConfig.post(loginURL, JSON.stringify(valores)).then((usser) => {
        let usuario = {
          idusuario: usser.data.data.idusuario,
          nombre: usser.data.data.nombre,
          apellidos: usser.data.data.apellidos,
          email: usser.data.data.correo,
          rol: usser.data.data.rol,
          login: true,
          token: usser.data.token
        }

        if(usser.data.data.rol === 2){
          props.setUsuarioValues(usuario);
          AxiosConexionConfig.get(ProfesionalURL + usser.data.data.idusuario).then((a) => {
          props.setUsuario(a.data[0]);
          history.push("/area-profesional")})
        }
        else{if(usser.data.data.rol === 1){
          props.setUsuarioValues(usuario); 
          history.push("/area-cliente") 
        }else{
          if(usser.data.data === "no verificado"){
            msgs1.current.show([
              { severity: 'error', summary: '', life: 30000, detail: 'Acceda a su correo para validarlo' }
            ]);
          } else{
            if(usser.data.data === "no autenticado"){
              msgs1.current.show([
                { severity: 'error', summary: '', life: 30000, detail: 'Usuario o contraseña inválidos' }
              ]);
            }
          }         
        }}
        setCargando(false)
      })
    }catch (e) {
      setCargando(false)
      console.log(e)
    }
  }

  const msgs1 = useRef(null);

    return (
      <>       
        <Modal 
          style={{ top: 150 }}
          visible={props.visible}
          onCancel={()=>props.handleCancel()}
          footer={null}
          closable={false}
         >
          <Card>
            <Form layout="vertical" name="dynamic_form_nest_item" onFinish={onFinish}>
              
              <CardHeader color="primary" className={classes.cardHeader}>
                <h4 className="blanco">Iniciar Sesión</h4>
              </CardHeader>  

              <Messages ref={msgs1} />

              <CardBody> 
                <div className={classes.socialLine}>
                  <GoogleLogin link={props.link} idusuario={props.idusuario} texto="Inicia sesión con Google"/>
                </div>                 
                <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      type: 'email',
                      message: 'Inserte una dirección de correo válida',
                    },
                    {
                      required: true,
                      message: 'Por favor inserte su correo',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor inserte su contraseña',
                    },
                  ]}                    
                >
                  <Input.Password />
                </Form.Item> 
              </CardBody>

              <CardFooter className={classes.cardFooter}>
                <Button simple color="primary" size="lg" onClick={()=>props.handleCancel()}>
                  Cancelar
                </Button>
                
                {cargando?
                    <img className="carga" src={carga}/>
                :
                <Button simple type="submit" color="primary" size="lg">
                  Iniciar Sesión
              </Button>
      }
                
                          
              </CardFooter>
            </Form>
          </Card>
        </Modal>
      </>
    );
  }


  const mapStateToProps = (rootReducer) => {
    return { global: rootReducer.auth };
  };
  
  export default connect(mapStateToProps, authAction)(LoginPopUp);
