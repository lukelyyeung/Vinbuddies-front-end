import * as React from 'react';
import { Button, InputGroup } from 'reactstrap';
import { Field } from 'redux-form';
import { EventPreview } from './EventPreview';
import { renderDropZone } from './renderDropzone';

const EventFormThirdPage = (props: any) => {
    const { customOnSubmit, previousPage } = props;
    return (
        <form onSubmit={customOnSubmit}>
            <Field name="winePhotos" component={renderDropZone} placeholder="Wines" />
            <InputGroup className="flexBox-row">
                <Button color="secondary" onClick={previousPage}>Previous Page</Button>
                <EventPreview className="eventPreview" {...props} />
                <Button color="success" type="submit">Submit</Button>
            </InputGroup>
        </form>
    );
};

export default EventFormThirdPage;