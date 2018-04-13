import { ImageFile } from 'react-dropzone';

interface Options {
    label: string;
    value: string;
    id: (string | number);
}

interface Event {
    title: string;
    description: string;
    participants: Options[];
    tags: string[];
    date: any;
    photos: ImageFile[];
    winePhotos: ImageFile[];
}

interface EventError {
    title?: string;
    description?: string;
    date?: string;
    participants?: string;
    photos?: string;
    winePhotos?: string;
}

export const validate = (values: Event) => {
    const errors: EventError = {};
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