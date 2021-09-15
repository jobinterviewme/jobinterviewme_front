import React, { useEffect, useState } from "react";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { Button } from 'primereact/button';
import sectorJSON from '../../assets/json/sectores.json';
import perfilJSON from '../../assets/json/perfiles.json';

import idiomasJSON from '../../assets/json/idiomas.json';
import { Form, Input, Upload, Space, Select, TimePicker, Row, Col, Tag, InputNumber } from 'antd';
import ImgCrop from 'antd-img-crop';
import TextArea from "antd/lib/input/TextArea";
import { Option } from "antd/lib/mentions";
import { connect } from "react-redux";
import * as authAction from "../../store/actions/authAction"


const Presentacion = (props) => {

    { console.log(props.valores) }

    const [sectores, setSectores] = useState([]);
    const [idiomas, setIdiomas] = useState(null)
    const [nombreImagen, setNombreImagen] = useState("")

    const [imgPefil, setImgPerfil] = useState(props.valores.imgPefil !== "" ? props.valores.imgPefil : null)
    const [selectedSectores, setSelectedSectores] = useState(props.valores.sectores !== "" ? props.valores.sectores : null);
    const [filteredSectores, setFilteredSectores] = useState(null);
    const [selectedIdiomas, setSelectedIdiomas] = useState(props.valores.idiomas !== "" ? props.valores.idiomas : null);
    const [filteredIdiomas, setFilteredIdiomas] = useState(null);



    const [nombrePerfil, setNombrePerfil] = useState(props.valores.nombrePerfil === "" ? props.global.usuario.nombreperfil : props.valores.nombrePerfil)
    const [annos, setannos] = useState(props.valores.annosExperiencia === "" ? props.global.usuario.annosexperiencia : props.valores.annosExperiencia)
    const experiencia = props.global.usuario.experiencia
    const [imagen, setimagen] = useState(props.valores.imagenperfil)
    const [sectores1, setsectores1] = useState(props.valores.sectores === "" ? props.global.usuario.sectores.split(",") : props.valores.sectores)
    const [perfiles, setperfiles] = useState(props.valores.perfiles === "" ? props.global.usuario.perfiles.split(",") : props.valores.perfiles)
    const [idiomas1, setidiomas1] = useState(props.valores.idiomas === "" ? props.global.usuario.idiomas.split(",") : props.valores.idiomas)
    const [fileList, setFileList] = useState(props.valores.imagenperfil === "" ? props.global.usuario?.imagen ? [
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: props.global.usuario.imagen,
        }] : [] :
        props.valores?.imagenperfil.length !== 0 ? [
            {
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: props.valores.imagenperfil[0].thumbUrl,
            }] : []
    );
    useEffect(() => {
        setSectores(sectorJSON.sectores);
        setIdiomas(idiomasJSON.idiomas)
    }, []);

    useEffect(() => {

        setValoresInicioales(props.valores)
    }, [props.valores]);

    { console.log(experiencia) }


    const searchSector = (event) => {
        setTimeout(() => {
            let _filteredSectores;
            if (!event.query.trim().length) {
                _filteredSectores = [...sectores];
            }
            else {
                _filteredSectores = sectores.filter((sector) => {
                    return sector.name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            setFilteredSectores(_filteredSectores);
        }, 250);
    }


    const handleSubmit = (values) => {
        let bandera = true
        if (bandera) {

            if (values.nombrePerfil === undefined) {
                values.nombrePerfil = nombrePerfil
            }
            if (values.imagenperfil === undefined) {
                values.imagenperfil = fileList
            }
            if (values.annosExperiencia === undefined) {
                values.annosExperiencia = annos
            }
            if (values.experiencia === undefined) {
                values.experiencia = experiencia
            }
            if (values.sectores === undefined) {
                values.sectores = sectores1.toString()
            }
            if (values.perfiles === undefined) {
                values.perfiles = perfiles
            }
            if (values.idiomas === undefined) {
                values.idiomas = idiomas1
            }
            { console.log(values) }
            props.primerosValores(values)
            props.goToStep(2);
        } else {
            setSubmitting(false);
        }
    }

    const [valoresIniciales, setValoresInicioales] = useState(props.valores)



    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        setImgPerfil(newFileList);

    };



    const sectoresOptions = [];
    sectorJSON.sectores.map((sector) => {
        sectoresOptions.push(<Option key={sector.name}>{sector.name}</Option>);
    });

    const perfilesOptions = [];
    perfilJSON.perfiles.map((perfil) => {
        perfilesOptions.push(<Option key={perfil.name}>{perfil.name}</Option>);
    });

    const idiomasOptions = [];
    idiomasJSON.idiomas.map((idioma) => {
        idiomasOptions.push(<Option key={idioma.nombre}>{idioma.nombre}</Option>);
    });

    return (

        <Form layout="vertical" className="register-form" name="formPresent" onFinish={handleSubmit} autoComplete="off">
            <div className="p-grid OfertaFrom">
                <div span={12} className="p-col-12 p-md-12 p-lg-6 OfertaCol1">
                    <Form.Item
                        label="Nombre de tu perfil"
                        name="nombrePerfil"

                        rules={[{
                            required: nombrePerfil === "" ? true : false,
                            message: 'Por favor introduzca el nombre de su perfil',
                        },]}
                    >
                        <Input
                            defaultValue={nombrePerfil}
                            id="in"
                            value={nombrePerfil}
                            placeholder="Nombre de tu perfil"
                            onChange={(e) => { setNombrePerfil(e.target.value) }}
                            name="nombrePerfil"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Años de experiencia en RRHH"
                        name="annosExperiencia"
                        rules={[{
                            required: annos === "" ? true : false,
                            message: 'Por favor introduzca los años de experiencia',
                        },]}
                    >
                        <InputNumber name="annosExperiencia" min={0} max={70} value={annos} defaultValue={annos} />
                    </Form.Item>

                    <Form.Item
                        label="Tu experiencia (máx. 250 caracteres)"
                        name="experiencia"
                        rules={[{
                            required: experiencia === "" ? true : false,
                            message: 'Por favor introduzca los años de experiencia',
                        },]}
                    >
                        <TextArea showCount rows={6} maxlength={250} maxLength={250} defaultValue={experiencia} value={experiencia} id="experiencia" name="experiencia" aria-describedby="username2-help" />
                    </Form.Item>

                </div>

                <div span={12} className="p-col-12 p-md-12 p-lg-6 OfertaCol1">

                    <Form.Item
                        label="Imagen de perfil"
                        name="imagenperfil"
                        defaultValue={imagen}
                        value={imagen}
                    >

                        <ImgCrop rotate>
                            <Upload
                                fileList={fileList}
                                onChange={onChange}
                                onPreview={onPreview}
                                listType="picture-card"
                                name="imagenperfil"
                                id="imagenperfil"
                                defaultValue={imagen}
                                value={imagen}

                            >
                                {fileList.length < 1 && '+ Añade tu foto de perfil'}
                            </Upload>
                        </ImgCrop>
                    </Form.Item>

                    <Form.Item
                        label="Sectores"
                        name="sectores"
                        rules={[{
                            required: sectores === "" ? true : false,
                            message: 'Por favor introduzca los sectores',
                        },]}
                    >
                        <Select mode="tags" value={sectores1} defaultValue={sectores1} style={{ width: '100%' }} placeholder="Sectores" onChange={(e) => setSelectedSectores(e.value)}>
                            {sectoresOptions}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Perfiles"
                        name="perfiles"
                        rules={[{
                            required: perfiles === "" ? true : false,
                            message: 'Por favor introduzca el perfil',
                        },]}
                    >
                        <Select id="perfiles" mode="tags" style={{ width: '100%' }} defaultValue={perfiles} placeholder="Perfiles" >
                            {perfilesOptions}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Idiomas"
                        name="idiomas"
                        rules={[{
                            required: idiomas === "" ? true : false,
                            message: 'Por favor introduzca los idiomas',
                        },]}
                    >
                        <Select mode="tags" value={selectedIdiomas} style={{ width: '100%' }} defaultValue={idiomas1} placeholder="Idiomas" onChange={(e) => setSelectedIdiomas(e.value)}>
                            {idiomasOptions}
                        </Select>
                    </Form.Item>

                </div>

                <div className="botonBottom" >
                    <Button label="Siguiente" type="submit" icon="pi pi-check" />
                </div>

            </div>


        </Form >


    )
};

const mapStateToProps = (rootReducer) => {
    return { global: rootReducer.auth };
};

export default connect(mapStateToProps, authAction)(Presentacion);



