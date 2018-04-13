import { CardHeader, Jumbotron, Button, Card, CardBody } from 'reactstrap';
import * as React from 'react';
import '../css/homePage.css';

export const Home = () => (
    <div>
        <Jumbotron className="flexBox-row">
            <div className="bg" />
            <div className="flexBox-column">
                <h5 className="text-center"> This website has no application related to wine</h5>
                <h2>Vinbuddies</h2>
                <Button className="hero-button">Null</Button>
            </div>

        </Jumbotron>
        <div className="d-flex justify-content-around">
            <Card>
                <CardHeader>Test UI</CardHeader>
                <CardBody>Test UI</CardBody>
            </Card>
            <Card>
                <CardHeader>Test UI</CardHeader>
                <CardBody>Test UI</CardBody>
            </Card>
            <Card>
                <CardHeader>Test UI</CardHeader>
                <CardBody>Test UI</CardBody>
            </Card>
        </div>
    </div>
);