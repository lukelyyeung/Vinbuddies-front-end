import * as React from 'react';
import Dropzone, { ImageFile } from 'react-dropzone';
import Axios from 'axios';
import env from '../env';
import { Button } from 'reactstrap';
// import { SlideShow } from './Corusel';
const ENV = env.dev;

interface AcceptState {
    accepted: ImageFile[];
    rejected: ImageFile[];
}

export class Accept extends React.Component<{}, AcceptState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            accepted: [],
            rejected: []
        };
    }

    upload = async () => {
        const headers = { Authorization: 'bearer ' + localStorage.getItem('token') };
        let bodyFormData = new FormData();
        let {accepted} = this.state;
        accepted.forEach((file, index) => {
            bodyFormData.append('photos', file);
        });
        await Axios({
            method: 'post',
            url: `${ENV.api_server}/event`,
            data: bodyFormData,
            headers: headers
        })
            .then(response => console.log(response))
            .catch(err => console.log(err.response.error));
    }

    delete = (index: number) => {
        console.log(index);
        let accpetedUpdate = this.state.accepted.slice();
        accpetedUpdate.splice(index, 1);
        this.setState({ accepted: accpetedUpdate });
    }

    render() {
        return (
            <section className="flexBox-column">
                <div className="dropzone">
                    <Dropzone
                        className="dropBox"
                        accept="image/jpeg, image/png"
                        onDrop={(accepted, rejected) => {
                            this.setState({
                                accepted: this.state.accepted.concat(accepted),
                                rejected: this.state.rejected.concat(rejected)
                            });
                            // this.upload(accepted[0]);
                        }}
                    />
                    <ul className="flexBox-row preview">
                        {this.state.accepted.map((f, i) =>
                            (<li key={i}>
                                <button className="delete" onClick={this.delete.bind(this, i)}>X</button>
                                <img className="img-fluid img-thumbnail thumbnail" src={f.preview} alt={f.name} />
                            </li>)
                        )}
                    </ul>
                </div>
                <Button color="success" onClick={this.upload}>Submit</Button>
            </section>
        );
    }
}