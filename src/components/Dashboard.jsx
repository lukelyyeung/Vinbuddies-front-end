import React, { Component } from "react";
import { Button, Row, Container, Col } from "reactstrap";
import { Link, Route } from "react-router-dom";
import { EventJournal } from "./EventJournal";
import { connect } from "react-redux";
import * as bodyStyle from "../settings/bodyStyle";

class PureHome extends Component {
  componentDidMount() {
    const root = document.querySelector("#root");
    for (const i of Object.keys(bodyStyle.dashboard)) {
      root.style[i] = bodyStyle.dashboard[i];
    }
  }

  componentWillUnmount() {
    const root = document.querySelector("#root");
    for (const i of Object.keys(bodyStyle.dashboard)) {
      root.style[i] = null;
    }
  }

  renderAvatar() {
    const { profile } = this.props;
    const src = profile.picture || "/common/guestuser.jpg";
    return <img className="user-propic" src={src} alt="avatar" />;
  }

  render() {
    const { match, profile } = this.props;
    return (
      <Row>
        <Col md="4" className="d-flex align-items-center">
          <Col xs="12" className="user-bar flexBox-column">
            {this.renderAvatar()}
            <h6>{profile.username}</h6>
            <Button color="info">Edit</Button>
          </Col>
        </Col>
        <Col md="8" className="d-flex align-items-center">
          <Row className="d-flex justify-content-center">
            <Link to={`${match.url}/eventjournal`}>
              <Button color="info" className="service-wrapper">
                <img
                  className="serviceImg"
                  src="/dashboard/eventjournal.png"
                  alt="eventjournal"
                />
              </Button>
            </Link>
            <Link to={`/postevent`}>
              <Button color="info" className="service-wrapper">
                <img
                  className="serviceImg"
                  src="/dashboard/postevent.png"
                  alt="postevent"
                />
              </Button>
            </Link>
            <Link to={`/vinobot`}>
              <Button color="info" className="service-wrapper">
                <img className="serviceImg" src="/robot.png" alt="vinobot" />
              </Button>
            </Link>
            <Button color="info" className="service-wrapper">
              <img
                className="serviceImg"
                src="/dashboard/image.png"
                alt="recognition"
              />
            </Button>
            <Button color="info" className="service-wrapper">
              <img
                className="serviceImg"
                src="/dashboard/social.png"
                alt="social"
              />
            </Button>
            <Button color="info" className="service-wrapper">
              <img
                className="serviceImg"
                src="/dashboard/mart.png"
                alt="mart"
              />
            </Button>
          </Row>
        </Col>
      </Row>
    );
  }
}

const Home = connect(state => ({ profile: state.profile }))(PureHome);

export const Dashboard = props => {
  const { match } = props;
  return (
    <Container className="dashboard non-homepage">
      <Route exact={true} path={match.url} component={Home} />
      <Route path={`${match.url}/eventjournal`} component={EventJournal} />
    </Container>
  );
};
