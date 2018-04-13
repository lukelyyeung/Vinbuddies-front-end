import * as React from 'react';
import { CardImg, Card, CardBody, CardText, CardTitle, CardSubtitle, Col, Button } from 'reactstrap';
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
                    <CardImg
                        className=""
                        top={true}
                        src={e.gallery ? 
                                `${image}/${e.gallery[0].photo_path.replace(excessPath, '')}` : 
                                ''
                            }
                        alt={'gallery'}
                    />
                    <CardBody className="">
                        <CardTitle>{e.event_title}</CardTitle>
                        <CardSubtitle>
                            {e.participants && e.participants.map((p: any) => p.username).join(',')}
                        </CardSubtitle>
                        <Button>
                            <Link to={`${match.url}/${e.event_id}`}>
                                Details
                            </Link>
                        </Button>
                        <CardText />
                    </CardBody>
                </Card>
            </Col>
        ));
    }
};