import * as React from 'react';
import axios from 'axios';
import * as FA from 'react-fontawesome';
import env from '../../env';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col } from 'reactstrap';
import { WineAttribute, AwardsList } from './wineInfoBox';
import '../../css/wineDisplay.css';
const ENV = env.dev;

export class GravatarOption extends React.Component<any, any> {

    constructor(props: any, private gravatarStyle: React.CSSProperties) {
        super(props);
        this.gravatarStyle = {
            borderRadius: 50,
            display: 'inline-block',
            marginRight: 10,
            position: 'relative',
            top: -2,
            verticalAlign: 'middle',
            width: '30px',
            height: '30px',
            objectFit: 'cover'
        };
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
    }

    handleMouseDown(event: any) {
        event.preventDefault();
        event.stopPropagation();
        this.props.onSelect(this.props.option, event);
    }

    handleMouseEnter(event: any) {
        this.props.onFocus(this.props.option, event);
    }

    handleMouseMove(event: any) {
        if (this.props.isFocused) {
            return;
        }
        this.props.onFocus(this.props.option, event);
    }

    render() {
        return (
            <div
                className={this.props.className}
                onMouseDown={this.handleMouseDown}
                onMouseEnter={this.handleMouseEnter}
                onMouseMove={this.handleMouseMove}
                title={this.props.option.title}
            >
                <img src={this.props.option.picture} style={this.gravatarStyle} />
                {this.props.children}
            </div>
        );
    }
}

export class GravatarValueWine extends React.Component<any, any> {

    private gravatarStyle: React.CSSProperties;
    constructor(props: any) {
        super(props);
        this.state = {
            modal: false,
            wineInfo: {}
        };

        this.gravatarStyle = {
            borderRadius: 50,
            display: 'inline-block',
            marginRight: 10,
            position: 'relative',
            top: -2,
            verticalAlign: 'middle',
            width: '30px',
            height: '30px',
            objectFit: 'cover'
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        const { modal, wineInfo } = this.state;
        if (!(/[0-9]+/.test(this.props.value.id))) {
            return this.setState(this.state);
        }

        if (Object.keys(wineInfo).length > 0) {
            return this.setState({
                modal: !modal
            });
        }

        let token = localStorage.getItem('token');
        return axios({
            method: 'GET',
            url: `${ENV.api_server}/wine?id=${this.props.value.id}`,
            headers: { Authorization: `bearer ${token}` }
        })
            .then(data => this.setState({
                modal: !modal,
                wineInfo: data.data[0]
            }))
            .catch(err => alert(err));
    }

    render() {
        const {
            wineInfo: {
                wine_name,
                picture,
                country,
                producer,
                average_user_rating,
                food_suggestion,
                alcohol_content,
                grape_blend,
                awards }
        } = this.state;

        return (
            <div
                className="Select-value"
                title={this.props.value.title}
                onClick={this.toggle}
            >
                <span className="Select-value-label">
                    <img src={this.props.value.picture} style={this.gravatarStyle} />
                    {this.props.children}
                </span>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    size="lg"
                >
                    <ModalHeader toggle={this.toggle}>{wine_name}</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col md="3">
                                <div className="wineImg-wrapper">
                                    <img className="wineImg" src={`${picture}`} alt={`${wine_name}`} />
                                </div>
                            </Col>
                            <Col md="9">
                                <Row>
                                    <Col md="12" className="outline"><h3>Infomartion</h3></Col>
                                    <Col md="4">
                                        <div className="country-wrapper">
                                            <img
                                                className="countryImg"
                                                src={`${country && country.toLowerCase()}.png`}
                                                alt={`${country}`}
                                            />
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <WineAttribute
                                            children={<p>{producer}</p>}
                                            header="Producer"
                                        />
                                    </Col>
                                    <Col md="4">
                                        <WineAttribute
                                            children={[1, 2, 3, 4, 5].map(i => {
                                                if (i <= +average_user_rating) {
                                                    return <FA key={i} size="2x" name="star" />;
                                                }
                                                return <FA key={i} size="2x" name="star-o" />;
                                            })}
                                            header="Rating"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="4">
                                        <WineAttribute
                                            header="Grape"
                                            children={<p>{grape_blend || 'Not Infomartion'}</p>}
                                        />
                                    </Col>
                                    <Col md="4">
                                        <WineAttribute
                                            header="Alocohol Content"
                                            children={<p>{alcohol_content || 'Not Infomartion'}</p>}
                                        />
                                    </Col>
                                    <Col md="4">
                                        <WineAttribute
                                            header="Food Suggestion"
                                            children={<p>{food_suggestion || 'Not Infomartion'}</p>}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12" className="outline"><h3>Award</h3></Col>
                                    {awards && Object.keys(awards).map((e: string, i: number) => (
                                        <Col md="4" key={i}>
                                            <AwardsList
                                                header={e.split(',')[0]}
                                                year={e.split(',')[1]}
                                                trophy={awards[e]}
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>);
    }
}

export class GravatarValue extends React.Component<any, any> {

    private gravatarStyle: React.CSSProperties;
    constructor(props: any) {
        super(props);
        this.gravatarStyle = {
            borderRadius: 50,
            display: 'inline-block',
            marginRight: 10,
            position: 'relative',
            top: -2,
            verticalAlign: 'middle',
            width: '30px',
            height: '30px',
            objectFit: 'cover'
        };

    }

    render() {
        return (
            <div
                className="Select-value"
                title={this.props.value.title}
            >
                <span className="Select-value-label">
                    <img src={this.props.value.picture} style={this.gravatarStyle} />
                    {this.props.children}
                </span>
            </div>);
    }
}