import React, { Component } from 'react';
import EventFormFirstPage from './EventFormFirstPage';
import EventFormSecondPage from './EventFormSecondPage';
import EventFormThirdPage from './EventFormThirdPage';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { toast } from 'react-toastify';
import * as bodyStyle from '../settings/bodyStyle';
import { Container } from 'reactstrap';

class PureWizardEventForm extends Component {
    constructor(props) {
        super(props);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.customOnSubmit = this.customOnSubmit.bind(this);
        this.state = {
            page: 1,
            submitted: false
        };
    }

    componentDidMount() {
        for (const i of Object.keys(bodyStyle.postEvent)) {
            document.body.style[i] = bodyStyle.postEvent[i];
        }
    }

    componentWillUnmount() {
        for (const i of Object.keys(bodyStyle.postEvent)) {
            document.body.style[i] = null;
        }
    }

    async customOnSubmit(e) {
        e.preventDefault();
        let response = await this.props.handleSubmit(e);
        if (response.status) {
            toast.success(response.status);
            await this.props.destroy();
            return this.setState({ submitted: true });
        }
        if (response.err) {
            toast.error(response.err);
        }
        return;
    }

    nextPage() {
        this.setState({ page: this.state.page + 1 });
    }

    previousPage() {
        this.setState({ page: this.state.page - 1 });
    }

    render() {
        const { page, submitted } = this.state;
        if (submitted) {
            return <Redirect to="/dashboard/eventjournal" />;
        }
        return (
            <Container className="dashboard eventForm">
                {page === 1 && <EventFormFirstPage onSubmit={this.nextPage} />}
                {page === 2 &&
                    <EventFormSecondPage
                        previousPage={this.previousPage}
                        onSubmit={this.nextPage}
                    />}
                {page === 3 &&
                    <EventFormThirdPage
                        previousPage={this.previousPage}
                        customOnSubmit={this.customOnSubmit}
                        {...this.props}
                    />}
            </Container>
        );
    }
}

const ReduxWizardEventForm = reduxForm({
    form: 'event',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    // validate
})(PureWizardEventForm);

const selector = formValueSelector('event');
export const WizardEventForm = connect(state => {
    const formValues = selector(
        state, 'title', 'description', 'date', 'winePhotos', 'photos',
        'participants', 'tags', 'wine0', 'wine1', 'wine2', 'wine3', 'wine', 'isPreview');
    return { formValues };
})(ReduxWizardEventForm);
