import React from 'react';
import { Button } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { renderGalleryDrop } from './renderGalleryDrop';
// import { validate } from './validate';

const PureEventFormSecondPage = (props) => {
    const {handleSubmit, previousPage} = props;
    return (
        <form className="eventForm" onSubmit={handleSubmit}>
            <Field name="photos" component={renderGalleryDrop} placeholder="Photos" />
            <Button color="secondary" onClick={previousPage}>Previous Page</Button>
            <Button color="success" type="sumbit">Next Page</Button>
        </form>
    );
};

const EventFormSecondPage = reduxForm({
    form: 'event',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    // validate
})(PureEventFormSecondPage);

export default EventFormSecondPage;
