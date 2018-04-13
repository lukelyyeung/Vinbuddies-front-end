import * as React from 'react';
import { Button } from 'reactstrap';

export const DetailEvent = (props: any) => {
    const { match, history } = props;
    return (
        <div>
            <p>details {match.params.eventId} works</p>
            <Button onClick={history.goBack}>Previous</Button>
        </div>
    );
};