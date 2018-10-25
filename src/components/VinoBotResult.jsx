import React, { Component } from "react";
import { Loading } from "react-simple-chatbot";
import axios from "axios";
import env from "../env";
import WineDisplay from "./WineDisplay";
import { CardBody, Card, CardImg, Button } from "reactstrap";
const ENV = env.dev;

const Wines = props => {
  let { result, getMoreWine } = props;
  return (
    <div className="flexBox-column">
      <h3>Vinbuddies' recommendation</h3>
      <ul className="wine-list">
        {Array.isArray(result) &&
          result.map((wine, i) => (
            <li key={i}>
              <Card>
                <CardImg
                  top={true}
                  style={{
                    objectFit: "contain",
                    width: "auto",
                    height: "200px"
                  }}
                  src={wine.picture}
                  alt={wine.wine_name.split(",")[0]}
                />
                <CardBody>
                  <WineDisplay wineInfo={wine} />
                </CardBody>
              </Card>
            </li>
          ))}
      </ul>
      <Button
        style={{ backgroundColor: "#B74E55" }}
        onClick={getMoreWine.bind(null, result.length)}
      >
        More wines
      </Button>
    </div>
  );
};

export class VinoBotResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      result: [],
      trigger: false,
      tags: []
    };

    this.triggetNext = this.triggetNext.bind(this);
    this.searchWine = this.searchWine.bind(this);
    this.getMoreWine = this.getMoreWine.bind(this);
  }

  async searchWine(tags, offset) {
    const token = localStorage.getItem("token");
    return await axios({
      method: "GET",
      url: `${ENV.api_server}/wine/meta?tags=${tags.join(
        "+"
      )}&offset=${offset || 0}&limit=3`,
      headers: { Authorization: `Bearer ${token}` }
    }).then(data => data.data);
  }

  async getMoreWine(offset) {
    let searchResult = await this.searchWine(this.state.tags, offset);
    this.setState({
      result: this.state.result.concat(searchResult)
    });
  }

  async componentDidMount() {
    const { steps } = this.props;
    let tags = Object.keys(steps).reduce((cummulator, key) => {
      if (/^options[0-9]+/.test(key)) {
        cummulator.push(steps[key].value);
      }
      return cummulator;
    }, []);

    let searchResult = await this.searchWine(tags);

    this.setState({
      tags: tags,
      result: searchResult,
      loading: false,
      tirgger: true
    });
  }

  triggetNext() {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep();
    });
  }

  render() {
    const { trigger, loading, result } = this.state;

    return (
      <div>
        {loading ? (
          <Loading />
        ) : (
          <Wines result={result} getMoreWine={this.getMoreWine} />
        )}
        {!loading && (
          <div
            style={{
              textAlign: "center",
              marginTop: 20
            }}
          >
            {!trigger && (
              <Button color="success" onClick={() => this.triggetNext()}>
                Search again
              </Button>
            )}
          </div>
        )}
      </div>
    );
  }
}
