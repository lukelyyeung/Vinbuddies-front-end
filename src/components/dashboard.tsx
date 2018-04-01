import { Button, Row, Container, Col } from 'reactstrap';
import * as React from 'react';

export const dashboard = () => (
    <div className="modalBox">
        <Container>
            <Row className="flexBox-row">
                <Col sm="6" className="flexBox-row">
                    <Button color="info" className="square">FUCK</Button>
                </Col>
                <Col sm="6" className="flexBox-row">
                    <Button color="info" className="square">YOU</Button>
                </Col>
            </Row>
            <Row className="flexBox-row">
                <Col sm="6" className="flexBox-row">
                    <Button color="info" className="square">SHITTY</Button>
                </Col>
                <Col sm="6"className="flexBox-row">
                    <Button color="info" className="square">REACT</Button>
                </Col>
            </Row>
        </Container>   
    </div>
);