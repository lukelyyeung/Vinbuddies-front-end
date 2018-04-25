import * as React from 'react';
import '../css/vinobot.css';
import { RenderWineInput } from './Forms/renderDropzone';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Button, Row, Col } from 'reactstrap';
import axios from 'axios';
import env from '../env';
import { Loading } from 'react-simple-chatbot';
import { connect } from 'react-redux';
const ENV = env.dev;

const PureSearchInput = (props: any) => {
    const submitHandler = (event: any) => {
        event.preventDefault();
        props.triggerNextStep();
    };
    return (
        <form
            className="d-flex justify-content-center"
            style={{ width: '100%' }}
            onSubmit={submitHandler}
        >
            <Field
                style={{ width: '100%', height: '100%' }}
                name="name"
                mutli={false}
                component={RenderWineInput}
                placeholder="Input the wine name"
            />
            <Button color="success">Enter</Button>
        </form>);
};

export const SearchInput: any = reduxForm({
    form: 'vinobot-wineName',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true
})(PureSearchInput);

const WineShop = (props: any) => {
    {
        return props.result.map((r: any, i: number) => (
            <Row key={i} className="wine-offers">
                <Col md="3">
                    {r.shopName}
                    <div>Country: {r.country}</div>
                </Col>
                <Col md="9">
                    <Row>
                        <Col md="6">
                            {r.wineName}
                        </Col>
                        <Col md="3">
                            <div>{r.curreny}</div>
                            <div>{r.price}</div>
                        </Col>
                        <Col md="3" className="flexBox-Row">
                            <Button
                                color="info"
                                onClick={() => window.open(r.link)}
                            >
                                Go to shop >
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        ));
    }
};

class PureSearchResult extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            loading: true,
            result: [],
            trigger: false,
        };

        this.triggetNext = this.triggetNext.bind(this);
        this.searchWine = this.searchWine.bind(this);
    }

    async searchWine() {
        if (!this.props.formValues) {
            return [];
        }
        return await axios({
            method: 'POST',
            url: `${ENV.api_server.replace('/api/v1', '')}/webscrapy`,
            data: { name: this.props.formValues.value.split(' ').join('+') }
        })
            .then(data => {
                console.log(data.data);
                return data;
            })
            .then(data => data.data);

    }

    async componentDidMount() {
        let searchResult = await this.searchWine();

        this.setState({
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
                {loading ? <Loading /> : <WineShop result={result} />}
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
                            <Button
                                color="success"
                                onClick={() => this.triggetNext()}
                            >
                                Search again
                            </Button>
                        }
                    </div>
                }
            </div>
        );
    }
}

const selector = formValueSelector('vinobot-wineName');
export const SearchResult: any = connect(state => {
    const formValues = selector(
        state, 'name');
    return { formValues };
})(PureSearchResult);