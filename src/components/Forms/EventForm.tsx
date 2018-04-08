import * as React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { Button } from 'reactstrap';
import { renderInput, renderTextArea, RenderUserInput, renderDatePicker, renderDropZone } from './renderField';

const PureEventForm = (props: InjectedFormProps) => {
    const { handleSubmit } = props;
    return (
        <form onSubmit={handleSubmit}>
            <Field name="title" type="text" component={renderInput} placeholder="Title" />
            <Field name="description" type="textarea" component={renderTextArea} placeholder="Decription" />
            <Field 
                name="user" 
                className="userTag" 
                placeholder="Participants" 
                multi={true} 
                component={RenderUserInput} 
            />
            <Field name="date" component={renderDatePicker} />
            <Field name="photos" component={renderDropZone} />
            <Button type="submit">Preview</Button>
        </form>
    );
};

export let EventForm = reduxForm({
    form: 'event'
    // validate: validate
})(PureEventForm);