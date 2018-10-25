import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Row
} from "reactstrap";
import { AwardsList, WineAttribute } from "./Forms/wineInfoBox";
import * as FA from "react-fontawesome";

class WineDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
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
        awards
      }
    } = this.props;

    return (
      <div className="flexBox-row">
        <Button
          color="info"
          style={{
            width: "85%"
          }}
          onClick={this.toggle}
        >
          {wine_name.split(",")[0]}
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
          <ModalHeader toggle={this.toggle}>{wine_name}</ModalHeader>
          <ModalBody>
            <Row>
              <Col md="3">
                <div className="wineImg-wrapper">
                  <img
                    className="wineImg"
                    src={`${picture}`}
                    alt={`${wine_name}`}
                  />
                </div>
              </Col>
              <Col md="9">
                <Row>
                  <Col md="12" className="outline">
                    <h3>Infomartion</h3>
                  </Col>
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
                      children={<p>{grape_blend || "Not Infomartion"}</p>}
                    />
                  </Col>
                  <Col md="4">
                    <WineAttribute
                      header="Alocohol Content"
                      children={<p>{alcohol_content || "Not Infomartion"}</p>}
                    />
                  </Col>
                  <Col md="4">
                    <WineAttribute
                      header="Food Suggestion"
                      children={<p>{food_suggestion || "Not Infomartion"}</p>}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="12" className="outline">
                    <h3>Award</h3>
                  </Col>
                  {awards &&
                    Object.keys(awards).map((e, i) => (
                      <Col md="4" key={i}>
                        <AwardsList
                          header={e.split(",")[0]}
                          year={e.split(",")[1]}
                          trophy={awards[e]}
                        />
                      </Col>
                    ))}
                </Row>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default WineDisplay;
