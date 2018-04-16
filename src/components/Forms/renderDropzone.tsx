import * as React from 'react';
import * as FA from 'react-fontawesome';
import { AsyncCreatable } from 'react-select';
import { Field } from 'redux-form';
import { Card, CardImg, CardBody, Row, Col, Container } from 'reactstrap';
import Dropzone, { ImageFile } from 'react-dropzone';
import axios from 'axios';
import numberSuffix from '../../helpers/numberSuffix';
import 'react-select/dist/react-select.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/renderDropzone.css';
import env from '../../env';
import { GravatarValue, GravatarOption } from './Gravator';
const ENV = env.dev;

export const RenderWineInput = (props: any) => {
    const { input } = props;
    const token = localStorage.getItem('token');
    const arrowRender = () => (<span>+</span>);
    const getOptions = async (value: string) => {
        if (value === '') {
            return { options: [] };
        }
        let options = await axios({
            method: 'GET',
            url: `${ENV.api_server}/wine?name=${value}`,
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(data => data.data.map((wine: any) => ({
                label: wine.wine_name,
                value: wine.wine_name,
                id: wine.wine_id,
                picture: wine.picture
            })));
        console.log(options);
        return { options: options };
    };

    return (
        <AsyncCreatable
            {...props}
            value={input.value}
            autosize={false}
            onChange={(value: any) => input.onChange(value)}
            onBlur={() => input.onBlur(input.value)}
            loadOptions={getOptions}
            noResultsText="No wine found."
            promptTextCreator={(value) => `Finding wine ${value}`}
            valueComponent={GravatarValue}
            optionComponent={GravatarOption}
            arrowRenderer={arrowRender}
            newOptionCreator={({ label }) => ({ label: label, value: label, id: label, picture: 'wine.png' })}
        />
    );
};

export const renderDropZone = (props: any) => {
    const { input: { value: files, name } } = props;
    const onDropHandler = (accepted: ImageFile[]) =>
        props.input.onChange(
            Array.isArray(files) ? files.concat(accepted) :
                accepted
        );

    const deleteHandler = (i: number) => {
        const copy = files.slice();
        copy.splice(i, 1);
        props.input.onChange(copy);
    };
    return (
        <section className="wineDropZone">
            <label>{props.placeholder}</label>
            <div className="dropzone galleryZone">
                <div className="dropBoxOverlay flexBox-column">
                    <FA className="flexBox-row" size="4x" name="glass"/>
                    <h5>Drag or drop or click to upload</h5>
                </div>
                <Dropzone
                    name={name}
                    className="dropBox"
                    accept="image/jpeg, image/png"
                    onDrop={onDropHandler}
                />
                {files && Array.isArray(files) && (
                    <ul className="d-flex justify-content-center preview">
                        {files.map((f, i) =>
                            (<li key={i}>
                                <Card className="wine">
                                    <CardImg
                                        className="img-thumbnail thumbnail"
                                        top={true}
                                        width="100%"
                                        src={f.preview}
                                        alt={f.name}
                                    />
                                    <CardBody>
                                        <button className="delete" onClick={deleteHandler.bind(null, i)}>X</button>
                                    </CardBody>
                                </Card>
                            </li>))}
                    </ul>
                )}
                {files && Array.isArray(files) && (
                    <Container className="wineInputContainer">
                        <Row>
                            {files.map((f, i) =>
                                (<Col className="input" key={i} md="6">
                                    <Field
                                        number={i}
                                        name={`wine${i}`}
                                        mutli={false}
                                        component={RenderWineInput}
                                        placeholder={`${numberSuffix(i + 1)} wine`}
                                    />
                                </Col>)
                            )}
                        </Row>
                    </Container>
                )}
            </div>
        </section>
    );
};