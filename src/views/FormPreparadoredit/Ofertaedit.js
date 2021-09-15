import React, { useEffect, useState } from "react";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { Calendar } from 'primereact/calendar';
import 'primeflex/primeflex.css';
import classNames from "classnames";
import { ErrorMessage, Formik, Field } from "formik";
import * as yup from "yup";
import { Button } from 'primereact/button';
import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Horas from '../../assets/json/horas.json';
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import canalesJSON from "../../assets/json/canales.json"
import { MultiSelect } from "primereact/multiselect";
import WeekDayTime from "components/WeekDaysTime/WeekDaysTime.component";
import { addLocale } from 'primereact/api';

const Oferta = (props) => {
    const valoresIniciales = {
        tpreparación: "",
        duracion: 0,
        canales: "",
        hashtags: "",
        tarifa: 0
    }

    const duracionSelect = [
        { label: '30 min', value: '30 min' },
        { label: '1 h', value: '1 h' },
        { label: '2 h', value: '2 h' },
        { label: '3 h', value: '3 h' },
        { label: 'Medio día', value: 'Medio día' },
        { label: 'Día completo', value: 'Día completo' },
        { label: 'Semana', value: 'Semana' },
        { label: 'Mes', value: 'Mes' }
    ];

    const [selectedProducts3, setSelectedProducts3] = useState(null);
    const [horas, setHoras] = useState(null);
    const [deshabilitado, setDeshabilitado] = useState(true);
    const [hora, setHora] = useState(null);
    const [tipoPreparacion, setTipoPreparacion] = useState('');
    const [duracion, setDuracion] = useState('');
    const [canales, setCanales] = useState(null);
    const [tarifa, setTarifa] = useState(null);

    const [lunes1, setLunes1] = useState(null);
    const [lunes2, setLunes2] = useState(null);
    const [martes1, setMartes1] = useState(null);
    const [martes2, setMartes2] = useState(null);
    const [miercoles1, setMiercoles1] = useState(null);
    const [miercoles2, setMiercoles2] = useState(null);
    const [jueves1, setJueves1] = useState(null);
    const [jueves2, setJueves2] = useState(null);
    const [viernes1, setViernes1] = useState(null);
    const [viernes2, setViernes2] = useState(null);
    const [sabado1, setSabado1] = useState(null);
    const [sabado2, setSabado2] = useState(null);
    const [domingo1, setDomingo1] = useState(null);
    const [domingo2, setDomingo2] = useState(null);

    const [calendar, setCalendar] = useState([]);

    const [weekDays, setWeekDays] = useState([]);

    addLocale('es', {
        firstDayOfWeek: 1,
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Claro'
    });
    let minDate = new Date();

    const onWeekDaysChange = (e) => {
        let selectedCities = [...weekDays];
        if (e.checked)
            selectedCities.push(e.value);
        else
            selectedCities.splice(selectedCities.indexOf(e.value), 1);

        setWeekDays(selectedCities);
    }

    const OnSetCalendar = (e) => {
        let selected = [...calendar];

        if (selected.some(function (f) {
            return (f.getTime() === e.getTime())
        })) {
            selected.map((sel, index) => {
                if (sel.getTime() === e.getTime()) {
                    selected.splice(index, 1);
                }
            })

        }

        else
            selected.push(e);

        console.log(selected);



        setCalendar(selected);
    }


    const horaInicioEditor = (productKey, props) => {
        return inputTextEditor(productKey, props, 'horainicio');

    }

    const inputTextEditor = (productKey, props, field) => {
        return <Calendar type="text" value={props.rowData[field]} onChange={(e) => onEditorValueChange(productKey, props, e.target.value)} />;
    }

    const onEditorValueChange = (productKey, props, value) => {
        let updatedProducts = [...props.value];
        updatedProducts[props.rowIndex][props.field] = value;
        dataTableFuncMap[`${productKey}`](updatedProducts);
    }

    const dataTableFuncMap = {
        'horas': setHoras
    };

    useEffect(() => {
        setHoras(Horas.data);
    }, []);

    const setSelectedProducts33 = (value) => {
        console.log(value);
        setSelectedProducts3(value)
    }

    const handleSubmit = (values) => {
        console.log(values)
        //props.goToStep(1);
        props.segundosValores(values)
    }

    const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado", "Domingo"];

    const conteiner = (dia, index) => {
        //console.log(dia)
        return (
            <GridContainer key={index} className="marginbottom0px">
                <GridItem xs={12} sm={12} md={4}>
                    <label htmlFor={"sectores"} className="text textMarca">{dia}</label>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <Field id="sectores" name="sectores" type="text" className="with100" />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <Field id="sectores" name="sectores" type="text" className="with100" />
                </GridItem>
            </GridContainer>
        )
    }

    return (

        <div>

            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <div className="card">
                        <div className="p-fluid p-grid">


                            <div className="p-field p-col-12 p-md-12">
                                <h4>Oferta</h4>
                                <span>Definición del servicio</span>
                                <span className="p-float-label">
                                    <InputText id="inputtext" value={tipoPreparacion} onChange={(e) => setTipoPreparacion(e.target.value)} />
                                    <label htmlFor="inputtext">Tipo de preparación</label>
                                </span>
                            </div>

                            <div className="p-field p-col-12 p-md-12">
                                <span className="p-float-label">
                                    <Dropdown value={duracion} options={duracionSelect} onChange={(e) => setDuracion(e.value)} placeholder="Duración" />
                                    <label htmlFor="inputnumber">Duración</label>
                                </span>
                            </div>

                            <div className="p-field p-col-12 p-md-12">
                                <span className="p-float-label">
                                    <MultiSelect id="multiselect" value={canales} options={canalesJSON.canales} onChange={(e) => setCanales(e.value)} optionLabel="nombre" />
                                    <label htmlFor="multiselect">Canales</label>
                                </span>
                            </div>

                            <div className="p-field p-col-12 p-md-12">
                                <span className="p-float-label">
                                    <InputNumber value={tarifa} onValueChange={(e) => setTarifa(e.value)} showButtons suffix={" / " + duracion} mode="currency" currency="EUR" />
                                    <label htmlFor="multiselect">Tarifa</label>
                                </span>
                            </div>
                        </div>
                    </div >
                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                    <WeekDayTime dia="Lunes" array={weekDays} onArrayChange={onWeekDaysChange} value1={lunes1} setValue1={setLunes1} value2={lunes2} setValue2={setLunes2} />
                    <WeekDayTime dia="Martes" array={weekDays} onArrayChange={onWeekDaysChange} value1={martes1} setValue1={setMartes1} value2={martes2} setValue2={setMartes2} />
                    <WeekDayTime dia="Miércoles" array={weekDays} onArrayChange={onWeekDaysChange} value1={miercoles1} setValue1={setMiercoles1} value2={miercoles2} setValue2={setMiercoles2} />
                    <WeekDayTime dia="Jueves" array={weekDays} onArrayChange={onWeekDaysChange} value1={jueves1} setValue1={setJueves1} value2={jueves2} setValue2={setJueves2} />
                    <WeekDayTime dia="Viernes" array={weekDays} onArrayChange={onWeekDaysChange} value1={viernes1} setValue1={setViernes1} value2={viernes2} setValue2={setViernes2} />
                    <WeekDayTime dia="Sábado" array={weekDays} onArrayChange={onWeekDaysChange} value1={sabado1} setValue1={setSabado1} value2={sabado2} setValue2={setSabado2} />
                    <WeekDayTime dia="Domingo" array={weekDays} onArrayChange={onWeekDaysChange} value1={domingo1} setValue1={setDomingo1} value2={domingo2} setValue2={setDomingo2} />
                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                    <Calendar value={calendar} onChange={(e) => OnSetCalendar(e.value)} inline numberOfMonths={2} disabledDays={[0, 6]} readOnlyInput minDate={minDate} locale="es" />
                </GridItem>
            </GridContainer>

            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <div xs={12} sm={12} md={10} className={"left40px margintop50px"}>
                        <Formik initialValues={valoresIniciales} onSubmit={handleSubmit}
                            validationSchema={validationSchema}>
                            {({ handleSubmit }) => (
                                <form onSubmit={handleSubmit} className="register-form">
                                    <GridContainer className="marginbottom10px">
                                        <GridItem xs={12} sm={12} md={5}>
                                            <h3>Definición del servicio </h3>
                                            <div className="p-col-12" >
                                                <label htmlFor={"tpreparación"} className="text textMarca">Tipo de preparación</label>
                                                <div>
                                                    <Field id="tpreparación" name="tpreparación" type="text" className="with100" />
                                                </div>
                                                <div><ErrorMessage name={"tpreparación"} className="invalid-feedback">{message => <div><small className="p-error p-d-block">{message}</small></div>}</ErrorMessage></div>
                                            </div>
                                            <div className="p-col-12">
                                                <label htmlFor={"duracion"} className="text textMarca">Duración </label>
                                                <div>
                                                    <Field id="duracion" name="duracion" type="number" className="with100" />
                                                </div>
                                                <div><ErrorMessage name={"duracion"} className="invalid-feedback">{message => <div><small className="p-error">{message}</small></div>}</ErrorMessage></div>
                                            </div>
                                            <div className="p-col-12">
                                                <label htmlFor={"canales"} className="text textMarca">Canales</label>
                                                <div>
                                                    <Field type="text" id="canales" name="canales" aria-describedby="username2-help" className="with100 p-invalid p-d-block" />
                                                </div>
                                                <div><ErrorMessage name={"canales"} className="invalid-feedback">{message => <div><small className="p-error">{message}</small></div>}</ErrorMessage></div>
                                            </div>
                                            <div className="p-col-12">
                                                <label htmlFor={"tarifa"} className="text textMarca">Tarifa</label>
                                                <div>
                                                    <Field type="number" id="tarifa" name="tarifa" aria-describedby="username2-help" className="with100 p-invalid p-d-block" />
                                                </div>
                                                <div><ErrorMessage name={"tarifa"} className="invalid-feedback">{message => <div><small className="p-error">{message}</small></div>}</ErrorMessage></div>
                                            </div>
                                            <div className="p-col-12">
                                                <label htmlFor={"hashtags"} className="text textMarca">Hashtags</label>
                                                <div>
                                                    <Field type="text" id="hashtags" name="hashtags" aria-describedby="username2-help" className="with100 p-invalid p-d-block" />
                                                </div>
                                                <div><ErrorMessage name={"hashtags"} className="invalid-feedback">{message => <div><small className="p-error">{message}</small></div>}</ErrorMessage></div>
                                            </div>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={5}>
                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={12}>
                                                    Agenda<br />
                                                Selecciona el horario disponible para que puedan contratar tus servicios.
                                                No te preocupes si te surgen planes, lo podrás modificar en cualquier momento.

                                          </GridItem>
                                                <GridItem xs={12} sm={12} md={12}>

                                                    {dias.map(function (dia, index) {
                                                        return (conteiner(dia, index))
                                                    })}
                                                    <div><ErrorMessage name={"sectores"} className="invalid-feedback">{message => <div><small className="p-error">{message}</small></div>}</ErrorMessage></div>
                                                </GridItem>

                                                <div className="card">
                                                    <h5>Checkbox</h5>

                                                    <DataTable value={horas} selection={selectedProducts3} onSelectionChange={e => setSelectedProducts33(e.value)} dataKey="id">
                                                        <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                                                        <Column field="dia" header="Día"></Column>
                                                        <Column editor={(props) => horaInicioEditor('horas', props)} field="horainicio" header="Hora Inicio"></Column>
                                                        <Column field="horafin" header="Hora Fin" ></Column>
                                                    </DataTable>

                                                    <Calendar id="time24" value={hora} onChange={(e) => setHora(e.value)} timeOnly hourFormat="24" />

                                                </div>

                                            </GridContainer>
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={2}>
                                            <div className="p-field p-col p-md-6 p-col-12" >
                                                <div className={"center"} >
                                                    <Button label="Submit" icon="pi pi-check" />
                                                </div>
                                            </div>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={2}>
                                            <div className="p-field p-col p-md-6 p-col-12" >
                                                <div className={"center"} >
                                                    <Button label="Anterior" onClick={(e) => { props.goToStep(1) }} icon="pi pi-check" />
                                                </div>
                                            </div>
                                        </GridItem>
                                    </GridContainer>
                                </form>
                            )}
                        </Formik>
                    </div>
                </GridItem>
            </GridContainer>
        </div >

    )
};
export default Oferta;

const validationSchema = yup.object().shape({
    tarifa: yup.string().required("Tarifa requerido."),
    tpreparación: yup.string().required("Tipo de preparación requerido."),
    duracion: yup.string().required("Duración requerido."),
    canales: yup.string().required("Canales requerido.")
});