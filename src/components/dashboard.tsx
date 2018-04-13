import { Button, Row, Container, Col } from 'reactstrap';
import * as React from 'react';
import { Link, Route } from 'react-router-dom';
import '../css/dashboard.css';
import { EventJournal } from './EventJournal';

const home = (props: any) => {
    const { match } = props;
    return (
        <div>
            <Row>
                <Col xs="12" className="user-bar d-flex align-items-center justify-content-around">
                    <div className="user-propic"><img src="" alt="" /></div>
                    <Button color="info" className="square">FUCK</Button>
                    <Button color="info" className="square">YOU</Button>
                    <Button color="info" className="square">SHITTY</Button>
                </Col>
            </Row>
            <Row className="d-flex">
                <Button color="info" className="square">
                    <Link to={`${match.url}/eventjournal`} >FUCK</Link>
                </Button>
                <Button color="info" className="square">1</Button>
                <Button color="info" className="square">2</Button>
                <Button color="info" className="square">3</Button>
                <Button color="info" className="square">4</Button>
                <Button color="info" className="square">5</Button>
                <Button color="info" className="square">6</Button>
                <Button color="info" className="square">7</Button>
            </Row>
        </div>
    );
};

export const dashboard = (props: any) => {
    const { match } = props;
    return (
        <Container className="dashboard">
            <Route exact={true} path={match.url} component={home} />
            <Route path={`${match.url}/eventjournal`} component={EventJournal} />
        </Container>
    );
};