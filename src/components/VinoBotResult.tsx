import { Loading } from 'react-simple-chatbot';
import * as React from 'react';
import axios from 'axios';
import env from '../env';
import WineDisplay from './WineDisplay';
import { CardBody, Card, CardImg } from 'reactstrap';
const ENV = env.dev;

const Wines = (props: any) => {
    let { result, getMoreWine } = props;
    return (
        <div>
            <h3>Vinbuddies' recommendation</h3>
            <ul className="wine-list">
                {Array.isArray(result) && result.map((wine: any, i: number) => (
                    <li key={i}>
                        <Card>
                            <CardImg
                                top={true}
                                style={{
                                    objectFit: 'contain',
                                    width: 'auto',
                                    height: '200px'
                                }}
                                src={wine.picture}
                                alt={wine.wine_name.split(',')[0]}
                            />
                            <CardBody>
                                <WineDisplay wineInfo={wine} />
                            </CardBody>
                        </Card>
                    </li>
                ))}
            </ul>
            <button onClick={getMoreWine.bind(null, result.length)}>More wines</button>
        </div>
    );
};

export class VinoBotResult extends React.Component<any, any> {
    constructor(props: any) {
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

    async searchWine(tags: string[], offset?: number) {
        const token = localStorage.getItem('token');
        return await axios({
            method: 'GET',
            url: `${ENV.api_server}/wine/meta?tags=${tags.join('+')}&offset=${offset || 0}`,
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(data => data.data);

    }

    async getMoreWine(offset: number) {
        let searchResult = await this.searchWine(this.state.tags, offset);
        this.setState({
            result: this.state.result.concat(searchResult)
        });
    }

    async componentDidMount() {
        const { steps } = this.props;
        let tags = Object.keys(steps).reduce(
            (cummulator: any[], key: any) => {
                if (/^options[0-9]+/.test(key)) {
                    cummulator.push(steps[key].value);
                }
                return cummulator;
            },
            []);

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
                {loading ? <Loading /> : <Wines result={result} getMoreWine={this.getMoreWine} />}
                {
                    !loading &&
                    <div
                        style={{
                            textAlign: 'center',
                            marginTop: 20
                        }}
                    >
                        {
                            !trigger &&
                            <button
                                onClick={() => this.triggetNext()}
                            >
                                Search Again
                            </button>
                        }
                    </div>
                }
            </div>
        );
    }
}