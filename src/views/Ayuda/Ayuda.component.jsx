import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {  Tabs as Tabss }  from 'antd';
import Header from 'components/Header/Header';
import HeaderLinks from 'components/Header/HeaderLinks';
import './Ayuda.style.scss'
import { makeStyles } from "@material-ui/core";
import styles1 from "../../assets/jss/material-kit-react/views/profilePage.js";
import { Theme, useTheme } from '@material-ui/core/styles';

const { TabPane } = Tabss;
const useStyles = makeStyles(styles1);

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 800,
    },
});

const Ayuda = (props) => {

    const theme = useTheme();    

    function TabContainer({ children, dir }) {
        return (
          <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
          </Typography>
        );
      }
      
      TabContainer.propTypes = {
        children: PropTypes.node.isRequired,
        dir: PropTypes.string.isRequired,
      };      
      
    const [value1,setValue1]=useState(0); 
    const [value2,setValue2]=useState(0); 
    const [index, setIndex] = useState(0)

    const handleChange = (event, value) => {
        setIndex( value );
    };
  
    const handleChangeIndex = index1 => {
        setIndex( index1 );
    };

    const classes1 = useStyles();

    const styles = {
      tabs: {
        background: '#fff',
      },
      slide: {
        padding: 15,
        minHeight: 100,
        color: '#fff',
      }      
    };
    
    return (
    <div>
      <Header
        fixed
        color="white"
        brand=""
        rightLinks={<HeaderLinks />}
      />

    <div className={classes1.container + " ojo" }>

      <div> 
          <Tabs value={index} fullWidth onChange={(e,index) => handleChange(e,index)} style={styles.tabs}            
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab className="tabUsuario" label="Usuario" />
            <Tab className="tabPreparador" label="Preparador" />
          </Tabs>

        <SwipeableViews index={index} onChangeIndex={(index1) => handleChangeIndex(index1)}>

          <div className = "UsuarioBlock" style={Object.assign({}, styles.slide)}>
          <TabContainer dir={theme.direction}>          
            <Tabss tabPosition='left'>
                <TabPane tab="¿Cómo funciona JobInterviewMe?" key="1">
                <p>Para preparar tu entrevista con un profesional de recursos humanos, solo debes seguir estos 3 pasos:</p>
                    <ol>Buscar al preparador que mejor se adapte a tus necesidades(sector, cargo, idioma, etc.)</ol>
                    <ol> Reservar una fecha de preparación</ol>
                   <ol> Sigue los consejos de tu preparador para ir seguro a tu entrevista</ol>

                </TabPane>
                <TabPane tab="¿Cómo contacto con mi preparador?" key="2">
                <p>Una vez reservada la sesión con tu preparador, el preparador se pondrá en contacto contigo vía e-mail 
Durante el proceso de preparación podréis seguir en contacto mediante la vía que os sea más cómoda para ambos, por ejemplo: e-mail, whatsapp, LinkedIn, etc. </p>
<ol><i className="pi pi-arrow-right" style={{'color': '#60a7e8'}}></i>   Desde JobInterviewMe estamos trabajando en un chat interno para que la comunicación entre ambos sea más cómoda, pero mientras seguimos trabajando… no queremos poner límites a vuestra preparación con los profesionales.
</ol>
                </TabPane>
                <TabPane tab="¿Cuáles son los métodos de pago?" key="3">
                <p>Actualmente en JobinterviewMe no disponemos de plataforma de pago. De modo que el método de pago se acordará en cada caso entre el preparador y el usuario. 
                </p>
<p>Si surgiese algún inconveniente no dudes en ponerte en contacto con nuestro equipo de atención al cliente, escribiendo al correo jobinterviewme@gmail.com o llamando al número 619862979.
</p>
                </TabPane>
                <TabPane tab="¿Existe algún tipo de garantía en la preparación?" key="4">
               <p> En JobInterviewMe creemos en un sistema de valoración sincero y eficaz que te permitirá valorar la sesión de manera que la garantía de los perfiles de la plataforma se construirá con la trayectoria de cada uno. Tus valoraciones ayudaran a otras personas a elegir al mejor preparador. 
                 </p>
<p>Además, en JobInterviewMe queremos garantizar la calidad de nuestros servicios. De modo, que en caso de no estar satisfecho con la preparación recibida solo debes escribirnos al correo jobinterviewme@gmail.com o llamarnos al número 619862979 y analizaremos la problemática detenidamente. 
En caso de mala praxis del entrevistador, te devolveremos el dinero de forma inmediata y se expedientará al preparador.</p>

                </TabPane>
                <TabPane tab="¿Cómo puedo cancelar una reserva?" key="5">
               <p> En tu Área personal encontraras todas las reservas pendientes por confirmar, realizar o ya realizadas. Haciendo clic en ellas podrás modificar su estatus actual. De modo que, por ejemplo, una cita ya aceptada se puede cancelar hasta 24 horas antes de la preparación. 
               </p>
               <p>De todas formas, como tendrás contacto directo con el preparador, se recomienda contactar antes con él para aplazar la cita en caso de indisposición. 
               </p>
                </TabPane>
                <TabPane tab="¿Qué puedo hacer si el preparador no me responde?" key="6">
                <p>En caso de no respuesta del preparador, puedes ponerte en contacto con nosotros a través del correo jobinterviewme@gmail.com o llamarnos al número 619862979. </p>
                </TabPane>
            </Tabss>
          </TabContainer>
          </div>
          <div className = "ProfesionalBlock" style={Object.assign({}, styles.slide)}>
          <TabContainer dir={theme.direction}>
          <Tabss tabPosition='left'>
                <TabPane tab="¿Cómo funciona JobInterviewMe?" key="1">
                <p>En JobInterviewMe queremos ser una plataforma que te lo pone fácil. Creemos que puedes ayudar a muchas personas a triunfar y dar una buena impresión en sus entrevistas de trabajo.
                </p><p>Para ello solo debes:</p>
                    <ol>Crear tu perfil de preparador</ol>
                    <ol>Indicar la disponibilidad de horas que quieres / puedes dedicar</ol>
                    <ol>Confirmar las reservas que te soliciten los usuarios </ol>
                    <ol>¡Preparar a los candidatos para conseguir el trabajo de sus sueños! </ol>

                </TabPane>
                <TabPane tab="¿Cómo contacto con los usuarios / candidatos?" key="2">
               <p> Una vez aceptes la sesión que haya reservado el candidato, te llegará un email con la confirmación y sus datos para que contactes con él/ella por e-mail. 
Durante el proceso de preparación podréis seguir en contacto mediante la vía que os sea más cómoda para ambos, por ejemplo: e-mail, whatsapp, LinkedIn, etc. </p>
<ol><i className="pi pi-arrow-right" style={{'color': '#60a7e8'}}></i> Desde JobInterviewMe estamos trabajando en un chat interno para que la comunicación entre ambos sea más cómoda, pero mientras seguimos trabajando… no queremos poner límites a vuestras relaciones para poder empezar con la preparación. 
</ol>
                </TabPane>
                <TabPane tab="¿Cuáles son los métodos de pago?" key="3">
                <p>Actualmente en JobinterviewMe no disponemos de plataforma de pago. De modo que el método de pago se acordará en cada caso entre el preparador y el usuario. 
                Si surgiese algún inconveniente no duden en ponerse en contacto con nuestro equipo de atención al cliente, escribiendo al correo jobinterviewme@gmail.com o llamando al número 619862979. 
                </p><ol><i className="pi pi-arrow-right" style={{'color': '#60a7e8'}}></i> Desde JobInterviewMe estamos trabajando en un sistema de pago interno para garantizar el pago, facilitar el proceso y alejaros de complicaciones. De momento, no queremos poner limites a vuestro trabajo y por eso dejamos que vosotros como profesionales gestionéis el pago como consideréis. 
                </ol>
                </TabPane>
                <TabPane tab="¿Existe algún tipo de garantía en la preparación?" key="4">
                <p>En JobInterviewMe creemos en un sistema de valoración sincero y eficaz que permitirá al preparador y al usuario valorar la sesión de manera que la garantía de los perfiles de la plataforma se construirá con la trayectoria de cada uno. </p>
<p>Además, en JobInterviewMe queremos garantizar la calidad de nuestros servicios. De modo, que en caso de recibir una reclamación por parte de algún usuario analizaremos la problemática detenidamente. En caso de mala praxis del preparador, se expedientará al preparador.
</p>
                </TabPane>
                <TabPane tab="¿Cómo puedo cancelar una reserva?" key="5">
               <p> En tu Área personal encontraras todas las reservas pendientes por confirmar, realizar o ya realizadas. Haciendo clic en ellas podrás modificar su estatus actual. De modo que, por ejemplo, una cita ya aceptada se puede cancelar hasta 24 horas antes de la preparación. 
               </p>
               <p>De todas formas, se recomienda contactar antes con el usuario para aplazar la cita en caso de indisposición. 
               </p>
                </TabPane>
                <TabPane tab="¿Qué puedo hacer si el preparador no me responde?" key="6">
                <p>En caso de no respuesta del usuario, puedes ponerte en contacto con nosotros a través del correo jobinterviewme@gmail.com o llamarnos al número 619862979. </p>
                </TabPane>
            </Tabss>
          </TabContainer>
          </div>
        </SwipeableViews>
      </div>
      </div>
      </div>
    );
  
}

Ayuda.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default (Ayuda);