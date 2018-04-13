import * as React from 'react';
import '../../css/eventPreview.css';
import Slider from 'react-slick';
import { ImageFile } from 'react-dropzone';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Card,
    CardImg,
    CardBody,
    CardText
} from 'reactstrap';
import * as Moment from 'moment';

export class EventPreview extends React.Component<any, any> {
    setting: {
        dots: boolean;
        infinite: boolean;
        speed: number;
        slidesToShow: number;
        slidesToScroll: number;
        initialSlide: number;
    };
    constructor(props: any) {
        super(props);
        this.state = {
            modal: false
        };
        this.setting = {
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 0
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    getIds = (formValues: Event, key: RegExp) => {
        let ids: ({ number: number, id: string | number, label: string })[] = [];
        for (const fields in formValues) {
            if (key.test(fields) && formValues[fields]) {
                ids.push({
                    number: +fields.replace('wine', ''),
                    id: formValues[fields].id,
                    label: formValues[fields].label
                });
            }
        }
        return ids.sort((a, b) => a.number - b.number).map(e => e.label);
    }

    render() {
        const { formValues, handleSubmit } = this.props;
        const wines = this.getIds(formValues, /^wine[0-9]+$/);
        return (
            <div>
                <Button color="primary" onClick={this.toggle}>Preview</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Event Preview</ModalHeader>
                    <ModalBody>
                        <label>Title</label>
                        <p>{formValues.title}</p>
                        <hr />
                        <label>Participants</label>
                        {formValues.participants &&
                            <p>
                                {formValues.participants.map((e: any, i: number) => e.label).join(', ')}
                            </p>
                        }
                        <hr />
                        <label>Date</label>
                        {formValues.date && <p>{Moment(formValues.date._d).format('LLL')}</p>}
                        <hr />
                        <label>Description</label>
                        <p>{formValues.description}</p>
                        <hr />
                        <label>Gallery</label>
                        {formValues.photos && (<Slider {...this.setting} className="slider">
                            {formValues.photos.map((f: ImageFile, i: number) =>
                                (<div key={i}>
                                    <div className="galleryContainer">
                                        <img className="galleryThumbnail" src={f.preview} alt={f.name} />
                                    </div>
                                </div>))}
                        </Slider>)}
                        <hr />
                        <label>Wines</label>
                        {formValues.winePhotos && (
                            <div className="d-flex">
                                {formValues.winePhotos.map((photos: ImageFile, i: number) => (
                                    <Card key={i} className="preview-wine-card">
                                        <CardImg
                                            className="preview-wine-image"
                                            top={true}
                                            src={photos.preview}
                                            alt={photos.name}
                                        />
                                        <CardBody className="text-center">
                                            <CardText>
                                                {wines[i]}
                                            </CardText>
                                        </CardBody>
                                    </Card>
                                ))}
                            </div>
                        )}
                        <hr />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Close</Button>
                        <Button color="success" onClick={handleSubmit}>Submit</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}