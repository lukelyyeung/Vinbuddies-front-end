import * as React from 'react';
import { Container, Form, FormGroup, Label, Input } from 'reactstrap';

interface EventFormProps {
    previewEvent: () => Promise<void>;
    confirmSubmit: () => Promise<void>;
    removePhoto: () => Promise<void>;
    goBack: () => void;
}

interface EventFormState {
    title: string;
    description: string;
    date: Date;
    pariticipants: Array<string | number>;
    wineName: string[];
    gallery: string[];
    winePhotos: string[];
    tags: string[];
}
type fieldProperty = 'title' | 'date';
export class PureEventForm extends React.Component<EventFormProps, EventFormState> {
    constructor(props: EventFormProps) {
        super(props);
        this.state = {
            title: '',
            description: '',
            date: new Date(),
            pariticipants: [],
            wineName: [],
            gallery: [],
            winePhotos: [],
            tags: []
        };
    }

    previewEvent = async () => {
        this.props.previewEvent();
    }

    confirmSubmit = async () => {
        this.props.confirmSubmit();
    }

    removePhoto = async () => {
        this.props.removePhoto();
    }

    goBack = async () => {
        this.props.goBack();
    }

    onChangeField = (field: fieldProperty, e: React.FormEvent<HTMLInputElement>) => {
        let state = {};
        state[field] = e.currentTarget.value;
        this.setState(state);
    }

    render() {
        return (
            <div className="modalBox">
                <Container>
                    <Form>
                        <FormGroup>
                            <Label>Event title</Label>
                            <Input
                                type="text"
                                value={this.state.title}
                                onChange={this.onChangeField.bind(this, 'title')}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Description</Label>
                            <Input
                                type="textarea"
                                value={this.state.description}
                                onChange={this.onChangeField.bind(this, 'description')}
                            />
                        </FormGroup>
                    </Form>
                </Container>
            </div >
        );
    }
}
