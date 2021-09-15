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
import './Buzon.styles.scss';
import { Link, useHistory } from "react-router-dom";

import { Form, Input, Space, Select, TimePicker, Row, Col, Tag, InputNumber } from 'antd';
import AxiosConexionConfig from "conexion/AxiosConexionConfig";
import { Messages } from 'primereact/messages';
import md5 from 'md5';
import carga from 'assets/img/carga.gif'
import Header from "components/Header/Header";
import Parallax from "components/Parallax/Parallax";
import HeaderLinks from "components/Header/HeaderLinks";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

const useStyles = makeStyles(styles);


const Buzon = (props) => {

  const history = useHistory();
  const classes = useStyles();
   
  const [cargando, setCargando] = useState(false)
  const [requerido, setRequerido] = useState(true)

  const onFinish = (values) => {
    EnviarMsjAdmin(values);
  };

  async function EnviarMsjAdmin(values) {
    const signUpURL = "/enviarAdmin";

    let valores = {
      nombre: values.nombre,
      apellidos: values.apellido,
      correo: values.email,
      mensaje: values.mensaje
    }
    setCargando(true)
    try {
      AxiosConexionConfig.post(signUpURL, JSON.stringify(valores)).then((e) => {
        if(e.data){
          console.log(e)
        }else{
          msgs1.current.show([
            { severity: 'error', summary: '', life: 30000, detail: 'Error al enviar el mensaje' }
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

<div>
      <Header
        fixed
        color="white"
        brand=""
        rightLinks={<HeaderLinks />}
      />

     <div className="buzonDiv">
<Card className={classes[props.animation]}>
  <Form layout="vertical" name="dynamic_form_nest_item" onFinish={onFinish}>
    
    <CardHeader color="primary" className={classes.cardHeader}>
      <h4 className="blanco">Envíanos tus comentarios</h4>
    </CardHeader>

    <Messages ref={msgs1} />
    

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
        name="mensaje"
        label="Mensaje"
        rules={[
          {
            required: requerido,
            message: 'Por favor inserte su mensaje',
          },
        ]}
        
      >
        <Input.TextArea />
      </Form.Item> 


    </CardBody>

    <CardFooter className={classes.cardFooter}>
        {cargando?
            <img className="carga" src={carga}/>
        :
        <Button simple type="submit" color="primary" size="lg">
        Enviar
      </Button>
      }
    </CardFooter>
  </Form>

</Card>
</div>
</div>
)}
export default Buzon;