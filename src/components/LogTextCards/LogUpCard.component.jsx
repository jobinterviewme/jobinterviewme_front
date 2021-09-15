import React, { useEffect, useState, useRef } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import GoogleLogin from "components/GoogleLogin/GoogleLogin"
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import './LogUpCard.styles.scss';
import { Link, useHistory } from "react-router-dom";

import { Form, Input, Space, Select, TimePicker, Row, Col, Tag, InputNumber } from 'antd';
import AxiosConexionConfig from "conexion/AxiosConexionConfig";
import { Messages } from 'primereact/messages';
import md5 from 'md5';
import carga from 'assets/img/carga.gif'

const useStyles = makeStyles(styles);


const LogUpCard = (props) => {

  const history = useHistory();
  const classes = useStyles();
   
  const [cargando, setCargando] = useState(false)
  const [requerido, setRequerido] = useState(true)

  const onFinish = (values) => {
    signUp(values);
  };

  async function signUp(values) {
    const signUpURL = "/signUp";

    let valores = {
      nombre: values.nombre,
      apellidos: values.apellido,
      correo: values.email,
      password: md5(values.password),
      link: "https://jobinterviewme.com/verificar?"+props.page+"&&"
    }
    setCargando(true)
    try {
      AxiosConexionConfig.post(signUpURL, JSON.stringify(valores)).then((usser) => {
        if(usser.data){
          props.handleCancel();
          history.push("/mensaje")
        }else{
          msgs1.current.show([
            { severity: 'error', summary: '', life: 30000, detail: 'El usuario ya existe' }
          ]);
        }
        setCargando(false)
      })
    }catch (e) {
      setCargando(false)
      throw console(eee);
    }
  }

  const msgs1 = useRef(null);

  return (

<Card className={classes[props.animation]}>
  <Form layout="vertical" name="dynamic_form_nest_item" onFinish={onFinish}>
    
    <CardHeader color="primary" className={classes.cardHeader}>
      <h4 className="blanco">Crea tu perfil</h4>
    </CardHeader>

    <Messages ref={msgs1} />
    <div className={classes.socialLine}>
      <GoogleLogin link={props.link} texto="Inscripción con Google" />
    </div>

    <CardBody>
      <Form.Item
        label="Nombre(s)"
        name="nombre"
        rules={[{
          required: requerido,
          message: 'Por favor inserte su nombre',
        },]}
      >
        <Input placeholder="Nombre" />
      </Form.Item>

      <Form.Item
        label="Apellido(s)"
        name="apellido"
        rules={[{
          required: requerido,
          message: 'Por favor inserte sus apellidos',
        },]}
      >
        <Input  placeholder="Apellido" />
      </Form.Item>


      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'Por favor inserte una dirección de correo válida',
          },
          {
            required: requerido,
            message: 'Por favor inserte su dirección de correo',
          },
        ]}
      >
        <Input placeholder="E-mail" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Contraseña"
        rules={[
          {
            required: requerido,
            message: 'Por favor inserte su contraseña',
          },
        ]}
        hasFeedback
      >
        <Input.Password placeholder="Contraseña" />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirmar contraseña"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: requerido,
            message: 'Por favor confirme su contraseña',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('Estas contraseñas no coinciden'));
            },
          }),
        ]}
      >
        <Input.Password placeholder="Contraseña"/>
      </Form.Item>


    </CardBody>

    <CardFooter className={classes.cardFooter}>
        {cargando?
            <img className="carga" src={carga}/>
        :
        <Button simple type="submit" color="primary" size="lg">
        Inscríbete
      </Button>
      }
    </CardFooter>
  </Form>

</Card>
)}
export default LogUpCard;