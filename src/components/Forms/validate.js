export const validate = (values) => {
    const errors = {};
    if (!values.title) {
        errors.title = 'Required';
    }
    if (!values.description) {
        errors.description = 'Required';
    }
    if (!values.date) {
        errors.date = 'Required';
    }
    if (!values.participants) {
        errors.participants = 'Required';
    }
    return errors;
};
