import * as React from 'react';
import * as FA from 'react-fontawesome';
import * as moment from 'moment';
import axios from 'axios';
import { AsyncCreatable } from 'react-select';
import 'react-select/dist/react-select.css';
import { Field } from 'redux-form';
import { InputGroup, Input, Button, Card, CardImg, CardBody } from 'reactstrap';
import Dropzone, { ImageFile } from 'react-dropzone';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import env from '../../env';
const ENV = env.dev;

export const renderInput = (props: any) => {
    return (
        <div>
            <InputGroup className="inputArea">
                <Input {...props.input} {...props} />
            </InputGroup>
            {(props.meta.touched && props.meta.error) ?
                (<div className="warn">
                    <FA className="left-hand-icon" name="exclamation-circle" />
                    {props.meta.error}
                </div>) : null}
        </div>
    );
};

export const renderTextArea = (props: any) => {
    return (
        <div>
            <InputGroup className="inputArea">
                <Input {...props} {...props.input} style={{ height: '400px' }} placeholder={props.placeholder} />
            </InputGroup>
            {(props.meta.touched && props.meta.error) ?
                (<div className="warn">
                    <FA className="left-hand-icon" name="exclamation-circle" />
                    {props.meta.error}
                </div>) : null}
        </div>
    );
};

export class DatePickerInput extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }
    render() {

        return (
            <Button
                color="primary"
                onClick={this.props.onClick}
            >
                {this.props.value}
            </Button>
        );
    }
}

export const renderDatePicker = (props: any) => {
    const { input: { value: date } } = props;
    const changeHandler = (newDate: moment.Moment) => props.input.onChange(newDate);
    return (
        <DatePicker
            customInput={<DatePickerInput />}
            onChange={changeHandler}
            showTimeSelect={true}
            dateFormat="LLL"
            timeFormat="HH:mm"
            todayButton={'Today'}
            selected={date !== '' ? date : moment()}
            withPortal={true}
            shouldCloseOnSelect={false}
        />
    );
};

export const RenderUserInput = (props: any) => {
    const { input, id } = props;
    const token = localStorage.getItem('token');
    const getOptions = async (value: string) => {
        if (value === '') {
            return { options: [] };
        }
        let options = await axios({
            method: 'GET',
            url: `${ENV.api_server}/user/alluser?name=${value}&orderby=username`,
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(data => data.data.map((user: any) => ({
                label: user.username,
                value: user.id
            })));

        return { options: options };
    };

    return (
        <AsyncCreatable
            {...props}
            id={id}
            value={input.value}
            autosize={false}
            onChange={(value: any) => input.onChange(value)}
            onBlur={() => input.onBlur(input.value)}
            loadOptions={getOptions}
            noResultsText="No user found."
            promptTextCreator={() => null}
            newOptionCreator={({ label }) => ({ label: label, value: label })}
        />
    );
};

export const RenderWineInput = (props: any) => {
    const { input } = props;
    const token = localStorage.getItem('token');
    const getOptions = async (value: string) => {
        if (value === '') {
            return { options: [] };
        }
        let options = await axios({
            method: 'GET',
            url: `${ENV.api_server}/user/alluser?name=${value}&orderby=username`,
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(data => data.data.map((user: any) => ({
                label: user.username,
                value: user.id
            })));
        return { options: options };
    };

    return (
        <AsyncCreatable
            {...props}
            value={input.value}
            autosize={false}
            onChange={(value: any) => input.onChange(value)}
            onBlur={() => input.onBlur(input.value)}
            loadOptions={getOptions}
            noResultsText="No wine found."
            promptTextCreator={() => null}
            newOptionCreator={({ label }) => ({ label: label, value: label })}
        />
    );
};

export const renderDropZone = (props: any) => {
    const { input: { value: files } } = props;
    const onDropHandler = (accepted: ImageFile[]) =>
        props.input.onChange(
            Array.isArray(files) ? files.concat(accepted) :
                accepted
        );

    const deleteHandler = (i: number) => {
        const copy = files.slice();
        copy.splice(i, 1);
        props.input.onChange(copy);
    };

    return (
        <section className="flexBox-column">
            <div className="dropzone">
                <Dropzone
                    name={props.name}
                    className="dropBox"
                    accept="image/jpeg, image/png"
                    onDrop={onDropHandler}
                />
                {files && Array.isArray(files) && (
                    <ul className="flexBox-row preview">
                        {files.map((f, i) =>
                            (<li key={i}>
                                <Card className="wine">
                                    <CardImg 
                                        className="img-thumbnail thumbnail"
                                        top={true} 
                                        width="100%" 
                                        src={f.preview} 
                                        alt={f.name} 
                                    />
                                    <CardBody>
                                            <Field 
                                                name={`wine${i}`} 
                                                mutli={false}
                                                component={RenderWineInput} 
                                                placeholder="Wine name" 
                                            />
                                        <button className="delete" onClick={deleteHandler.bind(null, i)}>X</button>
                                    </CardBody>
                                </Card>
                            </li>))}
                    </ul>
                )}
            </div>
        </section>
    );
};