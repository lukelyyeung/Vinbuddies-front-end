import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderInput } from './renderInput';
import { Row, Col, Button } from 'reactstrap';
import { RenderUserInput } from './renderUserInput';
import { renderDatePicker } from './renderDatePicker';
import { RenderTagInput } from './renderTagInput';
import { renderTextArea } from './renderTextArea';

const PureEventFormFirstPage = (props) => {
    const {handleSubmit} = props;
    return (
            <form onSubmit={handleSubmit} className="eventForm">
                <Field name="title" type="text" component={renderInput} placeholder="Title" />
                <Row>
                    <Col md="6">
                        <Field
                            name="participants"
                            placeholder="Participants"
                            multi={true}
                            component={RenderUserInput}
                        />
                    </Col>
                    <Col md="6">
                        <Field name="date" component={renderDatePicker} placeholder="Date" />
                    </Col>
                </Row>
                <Field name="tags" multi={true} component={RenderTagInput} placeholder="Event tags" />
                <Field name="description" type="textarea" component={renderTextArea} placeholder="Description" />
                <Button color="success" type="submit">Next Page</Button>
            </form>
            );
};

const EventFormFirstPage = reduxForm({
    form: 'event',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    // validate
})(PureEventFormFirstPage);

export default EventFormFirstPage;
