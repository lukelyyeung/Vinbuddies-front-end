import React from "react";
import * as moment from "moment";
import { Card, CardBody, Col, Button, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { CardBox } from "./Forms/wineInfoBox";

const {REACT_API_SERVER} = process.env;
const image = REACT_API_SERVER.replace("/api/v1", "") + "/static";

export const ShortEvent = props => {
  const { events, match } = props;
  return events.map((e, i) => (
      <Col key={i} sm="12">
        <Card className="event-bar">
          <Row>
            <Col md="3">
              <div className="event-img-wrapper">
                <img
                  className="shortEvent-img"
                  src={
                    e.gallery
                      ? `${image}/${e.gallery[0].photo_path}`
                      : "/noImage.jpg"
                  }
                  alt={"gallery"}
                />
              </div>
            </Col>
            <Col md="9" className="flexBox-row event-info-container">
              <CardBody className="d-flex flex-column">
                <h5>{e.event_title}</h5>
                <Row>
                  <Col md="2">
                    <CardBox
                      image={e.creator[0].picture || "/guestuser.jpg"}
                      title={e.creator[0].username}
                    />
                  </Col>
                  <Col md="10">
                    <Row>
                      <Col md="12 flexBox-row">
                        <div
                          className="datePicker datePicker-journal flexBox-row"
                          style={{
                            backgroundColor: "#B74E55",
                            borderRadius: "10px",
                            color: "#fff"
                          }}
                        >
                          {moment(e.date).format("LLL")}
                        </div>
                        <Link to={`${match.url}/${e.event_id}`}>
                          <Button color="info">Details</Button>
                        </Link>
                        <Button color="danger">Reject</Button>
                      </Col>
                      <Col md="12">
                        <label>Participants: </label>
                        {e.participants &&
                          e.participants.map((p, num) => (
                            <Button key={num} color="success">
                              {p.username}
                            </Button>
                          ))}
                      </Col>
                      <Col md="12">
                        <label>Tags: </label>
                        {e.tags &&
                          e.tags.map((t, num) => (
                            <Button key={num} color="info">
                              {t.tag_name}
                            </Button>
                          ))}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardBody>
            </Col>
          </Row>
        </Card>
      </Col>
    ));
};
