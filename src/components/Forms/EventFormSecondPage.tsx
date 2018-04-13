import * as React from 'react';
import { Button } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { renderGalleryDrop } from './renderGalleryDrop';
// import { validate } from './validate';

const PureEventFormSecondPage = (props: any) => {
    const {handleSubmit, previousPage} = props;
    return (
        <form onSubmit={handleSubmit}>
            <Field name="photos" component={renderGalleryDrop} placeholder="Photos" />
            <Button color="secondary" onClick={previousPage}>Previous Page</Button>
            <Button color="success" type="sumbit">Next Page</Button>
        </form>
    );
};

const EventFormSecondPage: any = reduxForm({
    form: 'event',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    // validate
})(PureEventFormSecondPage as any);

export default EventFormSecondPage;