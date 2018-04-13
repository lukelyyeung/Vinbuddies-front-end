import * as React from 'react';
import * as FA from 'react-fontawesome';
import 'react-select/dist/react-select.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../css/renderGalleryDrop.css';
import Dropzone, { ImageFile } from 'react-dropzone';
import Slider from 'react-slick';
import { Row, Col, Container } from 'reactstrap';
export const renderGalleryDrop = (props: any) => {
    const { input: { value: files, name } } = props;
    const onDropHandler = (accepted: ImageFile[]) =>
        props.input.onChange(
            Array.isArray(files) ? files.concat(accepted) :
                accepted
        );

    const deleteHandler = (i: number, e: any) => {
        e.preventDefault();
        if (files.length > 1) {
            const copy = files.slice();
            copy.splice(i, 1);
            props.input.onChange(copy);
        }
        return;
    };

    const settingFor1 = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
    };
    
    const settingFor2 = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 0,
    };
    return (
        <div>

            <label>{props.placeholder}</label>
            <Container className="gallery">
                <Row className="galleryZone">
                    <Col md="4" className="sigh">
                        <div className="dropBoxGalleryOverlay flexBox-column">
                            <FA className="flexBox-row" size="4x" name="camera" />
                            <p>Drag or drop or<br />click to upload</p>
                        </div>
                        <Dropzone
                            name={name}
                            className="dropBoxGallery"
                            accept="image/jpeg, image/png"
                            onDrop={onDropHandler}
                        />
                    </Col>
                    <Col md="8" className="flexBox-row justify-content-center">
                        {files && Array.isArray(files) && (
                            <Slider {...files.length <= 2 ? settingFor1 : settingFor2} className="slider">
                                {files.map((f, i) =>
                                    (<div key={i}>
                                        <div className="galleryContainer">
                                            <img className="galleryThumbnail" src={f.preview} alt={f.name} />
                                            <button
                                                className="delete"
                                                onClick={deleteHandler.bind(deleteHandler, i)}
                                            >
                                                X
                                            </button>
                                        </div>
                                    </div>))}
                            </Slider>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};