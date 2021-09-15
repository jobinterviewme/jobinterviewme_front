import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Space, Select, TimePicker, Row, Col, Tag, InputNumber } from 'antd';
import canalesJSON from "../../assets/json/canales.json"
import './Oferta.style.scss';
import Calendario from '../../components/Calendario/Calendario.component';
import { Calendar } from 'primereact/calendar';
import { Chips } from 'primereact/chips';
import * as authAction from "../../store/actions/authAction"
import { connect } from "react-redux";
import 'primeflex/primeflex.css';
import carga from 'assets/img/carga.gif'


const Oferta1 = (props) => {    

    const [tipoPreparación, settipoPreparación]=useState(props.valores.tipoPreparación)
    const [duracionX, setDuracionX]=useState(props.valores.duracion)
    const [agenda, setAgenda]=useState(props.valores.agenda)
    const [tarifa, settarifa]=useState(props.valores.tarifa)
    const [canales, setcanales]=useState(props.valores.canales)
    const [hashtags, setHashtag] = useState(props.valores.hashtags);
    const [calendario, setCalendario] = useState([]);
    

    const [lunes, setLunes] = useState(agenda!==null?agenda[0].horainicio===null?null:new Date(0,0,0,agenda[0].horainicio.split(":")[0],agenda[0].horainicio.split(":")[1]):null);
    const [lunes1, setLunes1] = useState(agenda!==null?agenda[0].horafin===null?null:new Date(0,0,0,agenda[0].horafin.split(":")[0],agenda[0].horafin.split(":")[1]):null);
    const [martes, setMartes] = useState(agenda!==null?agenda[1].horainicio===null?null:new Date(0,0,0,agenda[1].horainicio.split(":")[0],agenda[1].horafin.split(":")[1]):null);
    const [martes1, setMartes1] = useState(agenda!==null?agenda[1].horafin===null?null:new Date(0,0,0,agenda[1].horafin.split(":")[0],agenda[1].horafin.split(":")[1]):null);
    const [miercoles, setMiercoles] = useState(agenda!==null?agenda[2].horainicio===null?null:new Date(0,0,0,agenda[2].horainicio.split(":")[0],agenda[2].horainicio.split(":")[1]):null);
    const [miercoles1, setMiercoles1] = useState(agenda!==null?agenda[2].horafin===null?null:new Date(0,0,0,agenda[2].horafin.split(":")[0],agenda[2].horafin.split(":")[1]):null);
    const [jueves, setJueves] = useState(agenda!==null?agenda[3].horainicio===null?null:new Date(0,0,0,agenda[3].horainicio.split(":")[0],agenda[3].horainicio.split(":")[1]):null);
    const [jueves1, setJueves1] = useState(agenda!==null?agenda[3].horafin===null?null:new Date(0,0,0,agenda[3].horafin.split(":")[0],agenda[3].horafin.split(":")[1]):null);
    const [viernes, setViernes] = useState(agenda!==null?agenda[4].horainicio===null?null:new Date(0,0,0,agenda[4].horainicio.split(":")[0],agenda[4].horainicio.split(":")[1]):null);
    const [viernes1, setViernes1] = useState(agenda!==null?agenda[4].horafin===null?null:new Date(0,0,0,agenda[4].horafin.split(":")[0],agenda[4].horafin.split(":")[1]):null);
    const [sabado, setSabado] = useState(agenda!==null?agenda[5].horainicio===null?null:new Date(0,0,0,agenda[5].horainicio.split(":")[0],agenda[5].horainicio.split(":")[1]):null);
    const [sabado1, setSabado1] = useState(agenda!==null?agenda[5].horafin===null?null:new Date(0,0,0,agenda[5].horafin.split(":")[0],agenda[5].horafin.split(":")[1]):null);
    const [domingo, setDomingo] = useState(agenda!==null?agenda[6].horainicio===null?null:new Date(0,0,0,agenda[6].horainicio.split(":")[0],agenda[6].horainicio.split(":")[1]):null);
    const [domingo1, setDomingo1] = useState(agenda!==null?agenda[6].horafin===null?null:new Date(0,0,0,agenda[6].horafin.split(":")[0],agenda[6].horafin.split(":")[1]):null);
    
    const cargando = props.cargando;

    const onFinish = values => {
        let valores={}
        valores.tipoPreparacion=tipoPreparación
        valores.duracion=duracionX
        valores.canales=canales
        valores.tarifa=tarifa
        valores.agenda=llenarAgenda()
        valores.hashtags= hashtags===undefined?"":hashtags
        valores.calendario=llenarCal();
        props.segundosValores(valores)      
    };

    const initialValue={
        duracion:duracionX,
        tipoPreparación:tipoPreparación,
        tarifa:tarifa,
        canales:canales,
        agenda:agenda,
        hashtags:hashtags
    }
    const onAbort=()=>{
        let values={}
        values.tipoPreparacion=tipoPreparación
        values.duracion=duracionX
        values.canales=canales
        values.tarifa=tarifa
        values.agenda = llenarAgenda()
        values.hashtags= hashtags===undefined?"":hashtags
        values.calendario=calendario;
        props.segundosValoresSinBD(values)
        props.goToStep(1)
    }

    const children = [];
    
    canalesJSON.canales.map((canal)=>{
        children.push(<Option key={canal.nombre}>{canal.nombre}</Option>);
    })

    function handleChange(value) {
        setcanales(value)
    }

    function onChangeHashtag(value){
        setHashtag(value);
    }

    function onChangeDuracion(value) {
        setDuracionX(value);
    }

      
    const llenarCal = () =>{
        let array="";
        calendario.map(cal=>{
            array += cal?.year + "-" + cal.month + "-" + cal.day + ","
        })
        return array;        
    }

    const llenarAgenda = () =>{

        let array=[];

        array.push( {
            idprofesional: props.global.idusuario,
            diasemana:"Lunes",
            horainicio:(lunes&&lunes1!==null)?(lunes.getHours().toString() + ":" + (lunes.getMinutes()!== 0?lunes.getMinutes().toString():"00")):"null",
            horafin:(lunes1&&lunes!==null)?(lunes1.getHours().toString() + ":" + (lunes1.getMinutes()!== 0?lunes1.getMinutes().toString():"00")):"null"
        })
       
        array.push({
            idprofesional: props.global.idusuario,
            diasemana:"Martes",    
            horainicio:(martes&&martes1!==null)?(martes.getHours().toString() + ":" + (martes.getMinutes()!== 0?martes.getMinutes().toString():"00")):"null",
            horafin:(martes1&&martes!==null)?(martes1.getHours().toString() + ":" + (martes1.getMinutes()!== 0?martes1.getMinutes().toString():"00")):"null"
        })
        array.push( {
            idprofesional: props.global.idusuario,
            diasemana:"Miércoles",
            horainicio:(miercoles&&miercoles1!==null)?(miercoles.getHours().toString() + ":" + (miercoles.getMinutes()!== 0?miercoles.getMinutes().toString():"00")):"null",
            horafin:(miercoles1&&miercoles!==null)?(miercoles1.getHours().toString() + ":" + (miercoles1.getMinutes()!== 0?miercoles1.getMinutes().toString():"00")):"null"
        })
        array.push({
            idprofesional: props.global.idusuario,
            diasemana:"Jueves",
            horainicio:(jueves&&jueves1!==null)?(jueves.getHours().toString() + ":" + (jueves.getMinutes()!== 0?jueves.getMinutes().toString():"00")):"null",
            horafin:(jueves1&&jueves!==null)?(jueves1.getHours().toString() + ":" + (jueves1.getMinutes()!== 0?jueves1.getMinutes().toString():"00")):"null"
        })
        array.push( {
            idprofesional: props.global.idusuario,
            diasemana:"Viernes",
            horainicio:(viernes&&viernes1!==null)?(viernes.getHours().toString() + ":" + (viernes.getMinutes()!== 0?viernes.getMinutes().toString():"00")):"null",
            horafin:(viernes1&&viernes!==null)?(viernes1.getHours().toString() + ":" + (viernes1.getMinutes()!== 0?viernes1.getMinutes().toString():"00")):"null"
        })
        array.push({
            idprofesional: props.global.idusuario,
            diasemana:"Sábado",
            horainicio:(sabado&&sabado1!==null)?(sabado.getHours().toString() + ":" + (sabado.getMinutes()!== 0?sabado.getMinutes().toString():"00")):"null",
            horafin:(sabado1&&sabado!==null)?(sabado1.getHours().toString() + ":" + (sabado1.getMinutes()!== 0?sabado1.getMinutes().toString():"00")):"null"
        })
        array.push( {
            idprofesional: props.global.idusuario,
            diasemana:"Domingo",
            horainicio:(domingo&&domingo1!==null)?(domingo.getHours().toString() + ":" + (domingo.getMinutes()!== 0?domingo.getMinutes().toString():"00")):"null",
            horafin:(domingo1&&domingo!==null)?(domingo1.getHours().toString() + ":" + (domingo1.getMinutes()!== 0?domingo1.getMinutes().toString():"00")):"null"
        })
        
        return array;
    }

    const validaLunes = () => {
        if(lunes>lunes1&&lunes1!=null&&lunes1!=undefined){
            setLunes1(lunes);
            setLunes(lunes1)
        }
    }
    const validaMartes = () => {
        if(martes>martes1&&martes1!=null&&martes1!=undefined){
            setMartes1(martes);
            setMartes(martes1)
        }
    }
    const validaMiercoles = () => {
        if(miercoles>miercoles1&&miercoles1!=null&&miercoles1!=undefined){
            setMiercoles1(miercoles);
            setMiercoles(miercoles1)
        }
    }
    const validaJueves = () => {
        if(jueves>jueves1&&jueves1!=null&&jueves1!=undefined){
            setJueves1(jueves);
            setJueves(jueves1)
        }
    }
    const validaViernes = () => {
        if(viernes>viernes1&&viernes1!=null&&viernes1!=undefined){
            setViernes1(viernes);
            setViernes(viernes1)
        }
    }
    const validaSabado = () => {
        if(sabado>sabado1&&sabado1!=null&&sabado1!=undefined){
            setSabado1(sabado);
            setSabado(sabado1)
        }
    }
    const validaDomingo = () => {
        if(domingo>domingo1&&domingo1!=null&&domingo1!=undefined){
            setDomingo1(domingo);
            setDomingo(domingo1)
        }
    }   
  
    return (       
        <Form  layout="vertical" name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off"
        initialvalue={initialValue}>
            
            <div className="p-grid OfertaFrom">
                <div span={12} className="p-col-12 p-md-12 p-lg-6 OfertaCol1">
                    <h4>Definición del servicio</h4>
                    <Form.Item
                        label="Tipo de preparación"
                        name="tipoPreparación"
                        rules={[{
                            required: tipoPreparación === "" ? true : false,
                            message: 'Por favor inserte el tipo de preparación',
                        },]}
                    >
                        <Input defaultValue={tipoPreparación} value={tipoPreparación} onChange={(e)=>settipoPreparación(e.target.value)} 
                        placeholder="Simulación de entrevista real, preparación de CV, preguntas frecuentes ..."/>
                    </Form.Item>

                   
                    <Form.Item
                        name="canales"
                        label="Canales"
                        rules={[
                        {
                            required: canales === ""||canales === null||canales === undefined || canales.length===0 ? true : false,
                            message: 'Por favor inserte los canales de su preparación',

                        },
                        ]}
                    >
                        <Select mode="tags" style={{ width: '100%' }} placeholder="Canales" defaultValue={canales} onChange={handleChange}>
                            {children}
                        </Select>
                    </Form.Item>

                    <label className="hashtagg">Hashtags</label>
                    <Chips value={hashtags[0]===""?null:hashtags} className={"lleno"} onChange={(e) => onChangeHashtag(e.value)} separator="," 
                    placeholder="#hashtag (Pulsar Enter para introducir)"/>
                    
                    <div className="espacioError"></div>

                    {console.log(duracionX)}

                    <Form.Item
                        name="duracion"
                        label="Duración"
                        rules={[
                        {
                            required: duracionX === "" ||duracionX === null||duracionX === undefined? true : false,
                            message: 'Por favor inserte la duración de su preparación',
                        },
                        ]}
                    >

                        <Select                    
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Duración"
                            optionFilterProp="children"
                            onChange={onChangeDuracion}
                            defaultValue={duracionX}
                            filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="30 minutos">30 minutos</Option>
                            <Option value="1 hora">1 hora</Option>
                            <Option value="2 horas">2 horas</Option>
                            <Option value="3 horas">3 horas</Option>
                            <Option value="Medio día">Medio día</Option>
                            <Option value="Día completo">Día completo</Option>
                            <Option value="Semana">Semana</Option>
                            <Option value="Mes">Mes</Option>

                        </Select>
                    </Form.Item>


                    <Form.Item
                        name="tarifa"
                        label="Tarifa"
                        rules={[
                        {
                            required: props.valores.tarifa === "" ? true : false,
                            message: 'Por favor inserte la tarifa de su preparación',
                        },
                        ]}
                    >
                        <InputNumber
                            onChange={(e)=>{settarifa(e)}}
                            defaultValue={tarifa}
                            formatter={value => `${value} €`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        />
                    </Form.Item>

                   

                </div>

                <div span={12} className="p-col-12 p-md-12 p-lg-6 OfertaCol1">            
                    <h4>Agenda</h4>
                    <div className="ant-col ant-form-item-label">
                        <label htmlFor="dynamic_form_nest_item_tipoPreparación" className="ant-form-item-required" title="Adiciona días de la semana disponibles">
                            Selecciona el horario disponible para que puedan contratar tus servicios:
                        </label>
                    </div>
                    <Row>
                        <Col span={5} className="LabelDias">
                            <label>Lunes</label>
                            <label>Martes</label>
                            <label>Miércoles</label> 
                            <label>Jueves</label> 
                            <label>Viernes</label>
                            <label>Sábado</label> 
                            <label>Domingo</label>
                        </Col>

                        <Col span={8} className="InputDias">
                            <Calendar onBlur={(e)=>validaLunes(e.value)} value={lunes} timeOnly onChange={(e) => setLunes(e.value)} />
                            <Calendar onBlur={(e)=>validaMartes(e.value)} value={martes} timeOnly onChange={(e) => setMartes(e.value)} />
                            <Calendar onBlur={(e)=>validaMiercoles(e.value)} value={miercoles} timeOnly onChange={(e) => setMiercoles(e.value)} />
                            <Calendar onBlur={(e)=>validaJueves(e.value)} value={jueves} timeOnly onChange={(e) => setJueves(e.value)} />
                            <Calendar onBlur={(e)=>validaViernes(e.value)} value={viernes} timeOnly onChange={(e) => setViernes(e.value)} />
                            <Calendar onBlur={(e)=>validaSabado(e.value)} value={sabado} timeOnly onChange={(e) => setSabado(e.value)} />
                            <Calendar onBlur={(e)=>validaDomingo(e.value)} value={domingo} timeOnly onChange={(e) => setDomingo(e.value)} />
                        </Col>

                        <Col span={8} className="InputDias">
                            <Calendar onBlur={(e)=>validaLunes(e.value)} value={lunes1} timeOnly onChange={(e) => setLunes1(e.value)} />
                            <Calendar onBlur={(e)=>validaMartes(e.value)} value={martes1} timeOnly onChange={(e) => setMartes1(e.value)} />
                            <Calendar onBlur={(e)=>validaMiercoles(e.value)} value={miercoles1} timeOnly onChange={(e) => setMiercoles1(e.value)} />
                            <Calendar onBlur={(e)=>validaJueves(e.value)} value={jueves1} timeOnly onChange={(e) => setJueves1(e.value)} />
                            <Calendar onBlur={(e)=>validaViernes(e.value)} value={viernes1} timeOnly onChange={(e) => setViernes1(e.value)} />
                            <Calendar onBlur={(e)=>validaSabado(e.value)} value={sabado1} timeOnly onChange={(e) => setSabado1(e.value)} />
                            <Calendar onBlur={(e)=>validaDomingo(e.value)} value={domingo1} timeOnly onChange={(e) => setDomingo1(e.value)} />
                        </Col>
                    </Row>
                
                    <div className="p-col-10">
                        <label htmlFor="dynamic_form_nest_item_tipoPreparación" title="Tipo de preparación">
                            No te preocupes si te surgen planes, dispones de un calendario donde especificar los días que no vas a estar disponible.
                            <Calendario id="idCal" calendario={calendario} setCalendario={(value)=>setCalendario(value)}/>        
                        </label>
                    </div>

                   
                

                </div>

                <div className="botonBottom1" >

                {cargando?
                    <img className="carga cargaOferta" src={carga}/>
                        :
                        <Button className="bottomButon" type="primary" htmlType="submit">
                        Finalizar
                    </Button>
                }

                   
                    {/*
                    <Button className="bottomButon" onClick={() => {onAbort();}}>
                        Anterior
                    </Button>
                    */}
                     
                </div>
                
            </div>
            
        </Form>
    );
  };

  const mapStateToProps = (rootReducer) => {
    return { global: rootReducer.auth };
  };
  
  export default connect(mapStateToProps, authAction)(Oferta1);
