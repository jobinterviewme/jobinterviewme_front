import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";


//componentes
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import Icono from '../../components/Icono/Icono.component';
import Cargando from 'components/Cargando/Cargando.component'

//ANTD
import { Table, Tag, Tooltip } from 'antd';

//PrimeReact
import { addLocale } from 'primereact/api';
import { Calendar } from "primereact/calendar";

//style
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import './ProfilePage.styles.scss'
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

//Conexión BBDD
import { urlProfesional } from "configuracion/constantes";
import AxiosConexionConfig from "conexion/AxiosConexionConfig";

//redux
import * as authAction from "../../store/actions/authAction"
import { connect } from "react-redux";
import { linkpreparadoredit } from "configuracion/constantes";


const useStyles = makeStyles(styles);

const ProfilePage = (props) => {

  const [date15, setDate15] = useState(null);

  const id = props.location.search.split("?")[1]

  addLocale('es', {
    firstDayOfWeek: 1,
    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    today: 'Hoy',
    clear: 'Claro'
  });


  const classes = useStyles();
  const { ...rest } = props;
  const [usuario, setUsuario] = useState(props.global.usuario)
  const [usserName, setUsseName] = useState(props.global)
  const [agenda, setAgenda] = useState([]);

  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  useEffect(() => {
    RefreshUsuario()
  }, []);

  async function RefreshUsuario() {
    const url = urlProfesional + "/" + id + "/profesional-agenda";
    try {
      const respuesta1 = await AxiosConexionConfig.get(url);
      setAgenda(respuesta1.data);
      //setUsuario(props.global.usuario)
      setUsseName(props.global)
      //console.log(props.global)
    } catch (e) {
      console.log(e);
    }
  }

  const invalidDates = () => {
    const array = props.global.usuario.fechasnulas?.split(",");
    const array2 = []
    array.map((a) => {
      array2.push(new Date(a));
    })
    return array2;
  }

  const invalidDays = () => {
    const invday = [];
    agenda.map((agd, idex) => {
      if (agd.horainicio === "null") {
        switch (agd.diasemana) {
          case "Lunes": invday.push(1);
            break;
          case "Martes": invday.push(2);
            break;
          case "Miércoles": invday.push(3);
            break;
          case "Jueves": invday.push(4);
            break;
          case "Viernes": invday.push(5);
            break;
          case "Sábado": invday.push(6);
            break;
          case "Domingo": invday.push(0);

            break;
        }
      }
    })

    return invday;
  }


  const columns1 = [
    {
      title: 'Día de la semana',
      dataIndex: 'diasemana',
      key: 'diasemana',
    },
    {
      title: 'Hora Inicio',
      dataIndex: 'horainicio',
      key: 'hInicio',
      render: hInicio => (
        <>
          {hInicio !== "null" ? (
            <Tag color='green' key={hInicio}>
              {hInicio.toUpperCase()}
            </Tag>
          ) :
            (
              <Tag color='volcano' key="no">
                {("No disponible").toUpperCase()}
              </Tag>
            )}
        </>
      ),
    },

    {
      title: 'Hora fin',
      key: 'hFin',
      dataIndex: 'horafin',
      render: horaFin => (
        <>
          {horaFin !== "null" ? (
            <Tag color='green' key={horaFin}>
              {horaFin.toUpperCase()}
            </Tag>
          ) :
            (
              <Tag color='volcano' key="no">
                {("No disponible").toUpperCase()}
              </Tag>
            )}
        </>
      ),
    },
  ];

  const sectoresA = (atributo, index, clase) => {
    return (
      (index === 0) ? <div className={clase} key={index}>{atributo}</div> : <div className={clase} key={index}>{", " + atributo}</div>
    )
  }

  const header = () => {
    return (
      <Header
        color="white"
        brand=""
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
        {...rest}
      />
    )
  }
  const parallax = () => {
    return (
      <Parallax id="sombra" small filter color="headerGreen" >

        <div className={classes.container + " headerNameTitle"}>
          <GridContainer justify="flex-end">

            <GridItem xs={12} sm={12} md={6}>
              <h3 className={classes.title + " nameTitle"}>{usuario !== null ? usserName.nombre + " " + usserName.apellidos : ""}</h3>
            </GridItem>

            <GridItem xs={12} sm={12} md={2}>
            </GridItem>

          </GridContainer>
        </div>
      </Parallax>
    )
  }

  const body = () => {
    //console.log(usuario)
    return (
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>

            <GridContainer>

              <GridItem xs={12} sm={12} md={4}>
                <div className={classes.profile}>

                  <div>
                    <img src={usuario.imagen} alt={usuario.nombreperfil} className={imageClasses + " imagenProfile"} />
                  </div>

                  <Link to={linkpreparadoredit}>
                    <Tooltip title="Editar perfil">
                      <i className="editarUsserIcon pi pi-user-edit p-mr-2"></i>
                    </Tooltip>
                  </Link>

                  <div className={classes.name}>

                    <div id="banderasList">
                      {
                        usuario.idiomas.split(",").map((idioma, index) => {
                          return (
                            <Icono codigo={idioma} tipo="bandera" key={index} nombre={idioma} id={index} />
                          )
                        })
                      }
                    </div>

                    <div className="precio">
                      <span className="precioText">{usuario.tarifa + "€ / " + usuario.duracion + '’ entrevista'}</span>
                    </div>

                  </div>
                </div>
              </GridItem>

              <GridItem xs={12} sm={12} md={8}><div className={classes.description}>

                <div className="experiencia">
                  <p> {usuario.annosexperiencia} años de experiencia en el(los) sector(es):
                    <div className="sectores">
                      {usuario.sectores.split(",").map((sector, index) => {
                        return (
                          sectoresA(sector, index, "sectores")
                        )
                      })}
                    </div>
                  </p>
                </div>
              </div>

                <div className={classes.description + " wrap"}>
                  <p>{usuario.experiencia}</p>
                </div>



                {usuario.hashtags !== "" ?
                  <div className={classes.description}>
                    <div className="hashtags">
                      {usuario.hashtags.split(",").map((hashtag, index) => {
                        return (
                          sectoresA(hashtag, index, "hashtags")
                        )
                      })}

                    </div>
                  </div> : <></>}




                <div className="contenedor">
                  <div className="canalesSection">
                    <p>Canales:
                    {usuario?.canales !== null ?
                        usuario.canales.split(",").map((canal, index) => {
                          return (
                            <Icono codigo={canal} tipo="canal" key={index} nombre={canal} id={index} />
                          )
                        }) : <Fragment></Fragment>
                      }</p>
                  </div></div>
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h4 className="horarioTitle">Horarios disponibles</h4>
                <Table id="tabla" columns={columns1} dataSource={agenda} pagination={false} />
              </GridItem>

              <GridItem id="calendario1" xs={12} sm={12} md={6}>

                <h4>Calendario de disponibilidad</h4>
                <Calendar className="usuarioCliente" locale="es" value={date15} minDate={new Date()} disabledDates={props.global.usuario?.fechasnulas ? invalidDates() : null} disabledDays={invalidDays()} inline />
              </GridItem>
              <div className="margen"></div>
            </GridContainer>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div>

      {header()}
      {parallax()}

      {usuario !== null ? body() :

        <Fragment>
          <div className={classNames(classes.main, classes.mainRaised)}>
            <div>
              <div className={classes.container}>
                <Cargando />
              </div>
            </div>
          </div>
        </Fragment>}

    </div>
  );
}

const mapStateToProps = (rootReducer) => {
  return { global: rootReducer.auth };
};

export default connect(mapStateToProps, authAction)(ProfilePage);
