
import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class WineDisplay extends React.Component<any, any> {
    constructor(props: any) {
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
        const { wineInfo: {wine_name, picture} } = this.props;
        return (
            <div className="flexBox-row">
                <Button 
                    color="info"
                    style={{
                        width: '85%'
                    }} 
                    onClick={this.toggle}
                >
                    {wine_name.split(',')[0]}
                </Button>
                <Modal 
                    size="lg"
                    isOpen={this.state.modal} 
                    toggle={this.toggle}
                    className="wineDetail"
                >
                    <ModalHeader toggle={this.toggle}>{wine_name}</ModalHeader>
                    <ModalBody>
                        <img src={`${picture}`} alt={wine_name}/>
                        Test wine profile
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Return</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default WineDisplay;