import { EventForm } from './Forms/EventForm';
import * as React from 'react';

export class Accept extends React.Component<{}, {}> {
    submit(e: any) {
        console.log(e);
    }
    render() {
        return (
            <EventForm onSubmit={this.submit} />
        );
    }
}
// import * as React from 'react';
// import Dropzone, { ImageFile } from 'react-dropzone';
// import Axios from 'axios';
// import env from '../env';
// import { Button } from 'reactstrap';
// import base64Convertor from '../helpers/promisedFileReader';
// const ENV = env.dev;

// interface AcceptState {
//     accepted: ImageFile[];
//     rejected: ImageFile[];
// }

// export class Accept extends React.Component<{}, AcceptState> {
//     constructor(props: {}) {
//         super(props);
//         this.state = {
//             accepted: [],
//             rejected: []
//         };
//         this.ondropHandler.bind(this);
//     }

//     upload = async () => {
//         const headers = { Authorization: 'bearer ' + localStorage.getItem('token') };
//         const { accepted } = this.state;
//         let base64Files = await this.base64(accepted);
//         await Axios({
//             method: 'post',
//             url: `${ENV.api_server}/event/testUpload`,
//             data: { photos: base64Files },
//             headers: headers
//         })
//             .then(response => console.log(response))
//             .catch(err => console.log(err.response.error));
//     }

//     delete = (index: number) => {
//         let accpetedUpdate = this.state.accepted.slice();
//         accpetedUpdate.splice(index, 1);
//         this.setState({ accepted: accpetedUpdate });
//     }

//     async base64(files: ImageFile[]) {
//         let encodedFiles = [];
//         for (const file of files) {
//             let encoded = await base64Convertor(file);
//             encodedFiles.push(encoded);
//         }
//         return encodedFiles;
//     }

//     ondropHandler = (accepted: ImageFile[], rejected: ImageFile[]) => {
//         this.setState({
//             accepted: this.state.accepted.concat(accepted),
//             rejected: this.state.rejected.concat(rejected)
//         });
//         this.base64(accepted);
//         // this.upload(accepted[0]);
//     }
//     render() {
//         return (
//             <section className="flexBox-column">
//                 <div className="dropzone">
//                     <Dropzone
//                         className="dropBox"
//                         accept="image/jpeg, image/png"
//                         onDrop={this.ondropHandler}
//                     />
//                     <ul className="flexBox-row preview">
//                         {this.state.accepted.map((f, i) =>
//                             (<li key={i}>
//                                 <button className="delete" onClick={this.delete.bind(this, i)}>X</button>
//                                 <img className="img-fluid img-thumbnail thumbnail" src={f.preview} alt={f.name} />
//                             </li>)
//                         )}
//                     </ul>
//                 </div>
//                 <Button color="success" onClick={this.upload}>Submit</Button>
//             </section>
//         );
//     }
// }