import * as React from 'react';
import EventFormFirstPage from './EventFormFirstPage';
import EventFormSecondPage from './EventFormSecondPage';
import EventFormThirdPage from './EventFormThirdPage';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import '../../css/eventForm.css';
import '../../css/renderGalleryDrop.css';
import { Redirect } from 'react-router';
import { validate } from './validate';

class PureWizardEventForm extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.customOnSubmit = this.customOnSubmit.bind(this);
        this.state = {
            page: 1,
            submitted: false
        };
    }

    async customOnSubmit(e: any) {
        e.preventDefault();
        let response = await this.props.handleSubmit(e);
        if (response.err) {
            return alert(response.err);
        }
        if (confirm(response.status)) {
            await this.props.destroy();
            return this.setState({ submitted: true });
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
            return <Redirect to="/" />;
        }
        return (
            <div>
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
            </div>
        );
    }
}

const ReduxWizardEventForm: any = reduxForm({
    form: 'event',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate
})(PureWizardEventForm as any);

const selector = formValueSelector('event');
export const WizardEventForm: any = connect(state => {
    const formValues = selector(
        state, 'title', 'description', 'date', 'winePhotos', 'photos',
        'participants', 'tags', 'wine0', 'wine1', 'wine2', 'wine3', 'wine', 'isPreview');
    return { formValues };
})(ReduxWizardEventForm);