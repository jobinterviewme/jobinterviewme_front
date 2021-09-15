import { Modal } from 'antd';
import React from 'react';
import './Login.style.scss'


import GoogleLogin from "components/GoogleLogin/GoogleLogin"
import { makeStyles } from "@material-ui/core";
import styles from "../../../assets/jss/material-kit-react/views/loginPage.js";
import LogUpCard from '../../LogTextCards/LogUpCard.component';

const useStyles = makeStyles(styles);

const LogUpPopUp = (props) => {

  const classes = useStyles();

  const onFinish = values => {
    console.log(values);
  };


    return (
      <>       
        <Modal           
          visible={props.visibleUp}
          onCancel={()=>props.handleCancel()}
          footer={null}
          closable={false}
         >

          <LogUpCard link= {props.link} page="cliente" handleCancel={()=>props.handleCancel()} animation="" />
        </Modal>
      </>
    );
  }
  


export default LogUpPopUp;