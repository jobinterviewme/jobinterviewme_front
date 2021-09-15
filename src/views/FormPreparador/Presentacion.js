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

const Presentacion = (props) => {

    const [sectores, setSectores] = useState([]);
    const [idiomas, setIdiomas] = useState(null)
    const [nombrePerfil, setNombrePerfil] = useState(props.valores.nombrePerfil)
    const [imgPefil, setImgPerfil] = useState(props.valores.imagenperfil !== "" ? props.valores.imagenperfil : null)
    const [selectedSectores, setSelectedSectores] = useState(props.valores.sectores !== "" ? props.valores.sectores : null);
    const [selectedIdiomas, setSelectedIdiomas] = useState(props.valores.idiomas !== "" ? props.valores.idiomas : null);
    const [valoresIniciales, setValoresInicioales] = useState(props.valores)

    const [fileList, setFileList] = useState(props.valores.imagenperfil ? [
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: props.valores.imagenperfil,
        }] : []
    );

    useEffect(() => {
        setSectores(sectorJSON.sectores);
        setIdiomas(idiomasJSON.idiomas)
    }, []);

    useEffect(() => {

        setValoresInicioales(props.valores)
    }, [props.valores]);


    const handleSubmit = (values) => {


        let bandera = true

        values.imagenperfiles = fileList;

        if (bandera) {
            if (values.perfiles === '' || values.perfiles === undefined) {
                values.perfiles = valoresIniciales.perfiles
            }
            if (values.sectores === '' || values.sectores === undefined) {
                values.sectores = valoresIniciales.sectores
            }
            if (values.idiomas === '' || values.idiomas === undefined) {
                values.idiomas = valoresIniciales.idiomas
            }
            if (values.experiencia === '' || values.experiencia === undefined) {
                values.experiencia = valoresIniciales.experiencia
            }
            if (values.annosExperiencia === '' || values.annosExperiencia === undefined) {
                values.annosExperiencia = valoresIniciales.annosExperiencia
            }

            if (values.nombrePerfil === undefined) {
                values.nombrePerfil = nombrePerfil
            }
            if (values.imagenperfiles === undefined) {
                values.imagenperfiles = valoresIniciales.imagenperfil

            }

            props.primerosValores(values)
            props.goToStep(3);
        } else {
            setSubmitting(false);
        }
    }


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
        <Form layout="vertical" className="register-form" name="formPresent" onFinish={(values) => handleSubmit(values)} autoComplete="off">
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
                            required: valoresIniciales.annosExperiencia === "" ? true : false,
                            message: 'Por favor introduzca los años de experiencia',
                        },]}
                    >
                        <InputNumber defaultValue={valoresIniciales.annosExperiencia} value={valoresIniciales.annosExperiencia} name="annosExperiencia" min={0} max={70} placeholder={3} />
                    </Form.Item>

                    <Form.Item
                        label="Tu experiencia (máx. 250 caracteres)"
                        name="experiencia"
                        rules={[{
                            required: valoresIniciales.experiencia === "" ? true : false,
                            message: 'Por favor introduzca los años de experiencia',
                        },]}
                    >
                        <TextArea showCount rows={6} defaultValue={valoresIniciales.experiencia} maxlength={250} value={valoresIniciales.experiencia} maxLength={250} id="experiencia" name="experiencia" aria-describedby="username2-help" />
                    </Form.Item>

                </div>
                <div span={12} className="p-col-12 p-md-12 p-lg-6 OfertaCol1">

                    <Form.Item
                        label="Imagen de perfil"
                        name="imagenperfiles"
                        defaultValue={imgPefil}
                        value={imgPefil}
                    >
                        <ImgCrop rotate>
                            <Upload
                                fileList={fileList}
                                onChange={onChange}
                                onPreview={onPreview}
                                listType="picture-card"
                                name="imagenperfiles"
                                id="imagenperfil"
                                defaultValue={imgPefil}
                                value={imgPefil}
                            >

                                {fileList.length < 1 && '+ Añade tu foto de perfil'}
                            </Upload>
                        </ImgCrop>
                    </Form.Item>
                    <Form.Item
                        label="Sectores"
                        name="sectores"
                        rules={[{
                            required: true,
                            message: 'Por favor introduzca los sectores',
                        },]}
                    >
                        <Select mode="tags" value={selectedSectores} defaultValue={valoresIniciales.sectores} style={{ width: '100%' }} placeholder="Sectores" onChange={(e) => setSelectedSectores(e.value)}>
                            {sectoresOptions}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Perfiles"
                        name="perfiles"
                        rules={[{
                            required: true,
                            message: 'Por favor introduzca el perfil',
                        },]}
                    >
                        <Select id="perfiles" mode="tags" style={{ width: '100%' }} defaultValue={valoresIniciales.perfiles} placeholder="Perfiles" >
                            {perfilesOptions}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Idiomas"
                        name="idiomas"
                        rules={[{
                            required: true,
                            message: 'Por favor introduzca los idiomas',
                        },]}
                    >
                        <Select mode="tags" value={selectedIdiomas} style={{ width: '100%' }} placeholder="Idiomas" defaultValue={valoresIniciales.idiomas} onChange={(e) => setSelectedIdiomas(e.value)}>
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
export default Presentacion;

