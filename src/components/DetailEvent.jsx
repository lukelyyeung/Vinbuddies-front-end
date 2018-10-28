import React, { Component } from "react";
import { Button, Card, CardImg, CardBody, CardText } from "reactstrap";
import axios from "axios";
import env from "../env";
import Slider from "react-slick";
import * as Moment from "moment";
import * as bodyStyle from "./settings/bodyStyle";

const ENV = env.dev;
const imageurl = ENV.api_server.replace("/api/v1", "") + "/static";

export class DetailEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {}
    };
    this.setting = {
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0
    };
  }

  async componentDidMount() {
    for (const i of Object.keys(bodyStyle.eventDetails)) {
      document.body.style[i] = bodyStyle.eventDetails[i];
    }

    if (Object.keys(this.state.event).length > 0) {
      return;
    }

    let {
      match: {
        params: { eventId }
      }
    } = this.props;
    let token = localStorage.getItem("token");
    await axios({
      method: "GET",
      url: `${ENV.api_server}/event/${eventId}`,
      headers: { Authorization: `bearer ${token}` }
    }).then(data => this.setState({ event: data.data.event }));
  }

  async componentWillUnmount() {
    for (const i of Object.keys(bodyStyle.eventDetails)) {
      document.body.style[i] = null;
    }
  }

  render() {
    const { history } = this.props;
    const {
      event_title,
      date,
      description,
      gallery,
      wines,
      participants,
      tags
    } = this.state.event;

    return (
      <div>
        <label>Title</label>
        <Button
          style={{
            float: "right"
          }}
          onClick={history.goBack}
        >
          Previous
        </Button>
        <p>{event_title}</p>
        <hr />
        <label>Participants</label>
        {participants && (
          <p>
            {participants.map((p) => p.username).join(", ")}
          </p>
        )}
        <hr />
        <label>Date</label>
        {date && <p>{Moment(date._d).format("LLL")}</p>}
        <hr />
        <label>Description</label>
        <p>{description}</p>
        <hr />
        <label>Tags</label>
        {tags && (
          <p>{tags.map((t) => t.tag_name).join(", ")}</p>
        )}
        <hr />
        <label>Gallery</label>
        {gallery && (
          <Slider {...this.setting} className="slider">
            {gallery.map((f, i) => (
              <div key={i}>
                <div className="galleryContainer">
                  <img
                    className="galleryThumbnail"
                    src={`${imageurl}/${f.photo_path}`}
                  />
                </div>
              </div>
            ))}
          </Slider>
        )}
        <hr />
        <label>Wines</label>
        {wines && (
          <div className="d-flex">
            {wines.map((wine, i) => (
              <Card key={i} className="preview-wine-card">
                <CardImg
                  className="preview-wine-image"
                  top={true}
                  src={`${imageurl}/${wine.photo_path}`}
                  alt={wine.wine_name}
                />
                <CardBody className="text-center">
                  <CardText>{wine.wine_name}</CardText>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
        <hr />
        <Button onClick={history.goBack}>Previous</Button>
      </div>
    );
  }
}