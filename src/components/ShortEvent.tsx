import * as React from 'react';
import * as moment from 'moment';
import { Card, CardBody, Col, Button, Row } from 'reactstrap';
import env from '../env';
import { Link } from 'react-router-dom';
const ENV = env.dev;
const image = ENV.api_server.replace('/api/v1', '') + '/static';
const excessPath = '/mnt/c/vinbuddies@alvin/back-end/store/';

export const ShortEvent = (props: any) => {
    const { events, match } = props;
    {
        return events.map((e: any, i: number) => (
            <Col key={i} sm="12">
                <Card className="event-bar">
                    <Row>
                        <Col md="3" className="flexBox-row">
                            <img
                                className="shortEvent-img"
                                src={e.gallery ?
                                    `${image}/${e.gallery[0].photo_path.replace(excessPath, '')}` :
                                    ''
                                }
                                alt={'gallery'}
                            />
                        </Col>
                        <Col md="9" className="flexBox-row">
                            <CardBody className="d-flex flex-column">
                                <h5>{e.event_title}</h5>
                                <Row>
                                    <Col md="6">
                                        <p>Creator: {e.creator[0].username}</p>
                                        <p>Date: {moment(e.date).format('LLL')}</p>
                                    </Col>
                                    <Col md="6">
                                        <p>
                                            Participants: {e.participants.map((p: any) => p.username).join(',')}
                                        </p>
                                        <p>Tags: {e.tags && e.tags.map((t: any) => t.tag_name).join(',')}</p>
                                    </Col>
                                </Row>
                            </CardBody>
                            <Button>
                                <Link to={`${match.url}/${e.event_id}`}>
                                    Details
                                </Link>
                            </Button>
                        </Col>
                    </Row>
                </Card>
            </Col>
        ));
    }
};