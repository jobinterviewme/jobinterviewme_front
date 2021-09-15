import React, { useEffect, useState } from 'react';
import {  Button, Modal  } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import AxiosConexionConfig from 'conexion/AxiosConexionConfig';
import * as authAction from "../../store/actions/authAction"
import { connect } from "react-redux";

const { confirm } = Modal;

const DialogCard = (props) => {

  const [cita,setCita] = useState(props.cita);

  useEffect(() => {
    setCita(props.cita);
  }, [props.cita]);


  function ConfirmarCita() {

    const UrlModificarCita = "/citas/"+ cita.idcita
    const urlConfirm = '/sendMailCitaConfirmada';

    let valores = {
      correoCliente: cita.CitaUsuario.correo,
      correoPreparador: props.global.email,
      clienteNombre: cita.CitaUsuario.nombre,
      preparadorNombre: props.global.nombre,
      fecha: cita.fecha.split(" ")[2] + "-" + cita.fecha.split(" ")[1] + "-" + cita.fecha.split(" ")[3]
    }           

    setCita(props.cita);
    
    const jsonActivada={
      confirmada:"true"
    }    

    confirm({
      title: 'Confirmar Cita',
      icon: <ExclamationCircleOutlined />,
      content: 'Está seguro que desea confirmar esta cita?',
      onOk() {
        return new Promise((resolve, reject) => {
          AxiosConexionConfig.patch(UrlModificarCita,JSON.stringify(jsonActivada)).
            then(
              AxiosConexionConfig.post(urlConfirm, JSON.stringify(valores)).
                then(resolve).
                then(cerrarLosDos()).                
                catch(reject)
            ).catch(reject);
         
        }).catch((e) => console.log(e));
      },
       
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  

  function DeclinarCita() {

    const UrlModificarCita = "/citas/"+ cita.idcita

    const jsonDeclinar={
      confirmada:"decline"
    }    

    confirm({
      title: 'Declinar Cita',
      icon: <ExclamationCircleOutlined />,
      content: 'Está seguro que desea declinar esta cita?',
      okText: 'Sí',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        return AxiosConexionConfig.patch(UrlModificarCita,JSON.stringify(jsonDeclinar)).then(()=>cerrarLosDos() ).catch(() => console.log('Oops errores!'));
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  function EliminarCita() {

    const UrlModificarCita = "/citas/"+ cita.idcita

    const jsonDeclinar={
      confirmada:"deleted"
    }    

    confirm({
      title: 'Eliminar Cita del historial',
      icon: <ExclamationCircleOutlined />,
      content: 'Está seguro que desea eliminar esta cita de su historial?',
      okText: 'Sí',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        return AxiosConexionConfig.patch(UrlModificarCita,JSON.stringify(jsonDeclinar)).then(()=>cerrarLosDos() ).catch(() => console.log('Oops errores!'));
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const cerrarLosDos = () =>{
    props.setModal1Visible(false);
    props.setReload(true);
  }
  
  const botonFooter = () => {
    if(cita!==undefined && cita.confirmada==="false"){
    return(  [
        <Button key="back" onClick={() => props.setModal1Visible(false)}>
          Cancelar
        </Button>,
        <Button onClick={DeclinarCita} >Declinar Cita</Button>,
        <Button onClick={ConfirmarCita}>Confirmar Cita</Button>,            
      ])      
    }
    
    else{
      if(new Date(cita.fecha) < new Date()){
        return([
          <Button onClick={EliminarCita} >Eliminar Cita del historial</Button>,
          <Button key="back" onClick={() => props.setModal1Visible(false)}>
            Aceptar
          </Button>          
      ])}
      else{
        return( [
          <Button key="back" onClick={() => props.setModal1Visible(false)}>
            Aceptar
          </Button>,                   
        ])
      }    
    }
  }
  
    const enunciado = () => {
      if(cita!==undefined && cita.confirmada==="false"){
        return <p>Tiene una solicitud de cita con {cita!==undefined?cita.CitaUsuario.nombre + " " + cita.CitaUsuario.apellidos + " el día " + cita.fecha.split(" ")[2] + "-" + cita.fecha.split(" ")[1] + "-" + cita.fecha.split(" ")[3]:""}
        . <br></br>La reunión deberá realizarse por {cita.canales}</p>
      }else{
        if(new Date(cita.fecha) < new Date()){
          return <p>Tuvo una cita con {cita!==undefined?cita.CitaUsuario.nombre + " " + cita.CitaUsuario.apellidos + " el día " + cita.fecha.split(" ")[2] + "-" + cita.fecha.split(" ")[1] + "-" + cita.fecha.split(" ")[3]:""}
          . <br></br>La reunión se realizó por {cita.canales}</p>
        }else{
          return <p>Tiene una cita concertada con {cita!==undefined?cita.CitaUsuario.nombre + " " + cita.CitaUsuario.apellidos + " el día " + cita.fecha.split(" ")[2] + "-" + cita.fecha.split(" ")[1] + "-" + cita.fecha.split(" ")[3]:""}
          . <br></br>La reunión deberá realizarse por {cita.canales}</p>
        }
      }
    }
  
  return(<>
    
    <Modal
          title="Resumen de tu cita"
          visible={props.modal1Visible}
          onOk={() => props.setModal1Visible(false)}
          onCancel={() => props.setModal1Visible(false)}          
          width={750}
          
          footer={botonFooter()}>            
            {enunciado()}
            
            <p>Cualquier duda en relación a esta preparación, no dudes en contactar con: jobinterviewme@gmail.com</p>
      </Modal>  



    </>)

}

const mapStateToProps = (rootReducer) => {
  return { global: rootReducer.auth };
};

export default connect(mapStateToProps, authAction)(DialogCard);
