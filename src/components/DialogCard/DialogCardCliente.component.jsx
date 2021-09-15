import React, { useEffect, useState } from 'react';
import {  Button, Modal  } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import AxiosConexionConfig from 'conexion/AxiosConexionConfig';

const { confirm } = Modal;

const DialogCardCliente = (props) => {

  const [cita,setCita] = useState(props.cita);

  useEffect(() => {
    setCita(props.cita);
    console.log(props.cita);
  }, [props.cita]);


  

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
    props.setReload(true);
    props.setModal1Visible(false)
  }
  
  const botonFooter = () => {
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

    const enunciado = () => {
      console.log(new Date(cita.fecha))
      console.log(new Date())
      if(cita!==undefined && cita.confirmada==="false"){
        return <p>Tiene una solicitud de cita con {cita!==undefined?props.nombre  + " el día " + cita.fecha.split(" ")[2] + "-" + cita.fecha.split(" ")[1] + "-" + cita.fecha.split(" ")[3] :""}
        . <br></br>La reunión deberá realizarse por {cita.canales}</p>
      }else{
        if(new Date(cita.fecha) < new Date()){
          return <p>Tuvo una cita con {cita!==undefined?props.nombre  + " el día " + cita.fecha.split(" ")[2] + "-" + cita.fecha.split(" ")[1] + "-" + cita.fecha.split(" ")[3] :""}
          . <br></br>La reunión se realizó por {cita.canales}</p>
        }else{
          return <p>Tiene una cita concertada con {cita!==undefined?props.nombre  + " el día " + cita.fecha.split(" ")[2] + "-" + cita.fecha.split(" ")[1] + "-" + cita.fecha.split(" ")[3] :""}
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
export default DialogCardCliente;
