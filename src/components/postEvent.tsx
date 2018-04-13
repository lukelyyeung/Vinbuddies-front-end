import * as React from 'react';
import axios from 'axios';
import { ImageFile } from 'react-dropzone';
import base64Convertor from '../helpers/promisedFileReader';
import env from '../env';
import { WizardEventForm } from './Forms/WizardEventForm';
const ENV = env.dev;

interface Options {
    label: string;
    value: string;
    id: (string | number);
}

interface Event {
    title: string;
    description: string;
    participants: Options[];
    date: any;
    photos: ImageFile[];
    winePhotos: ImageFile[];
    [x: string]: any | Options;
}

export const PostEvent = (props: any) => {

    const getIds = (event: Event, key: RegExp) => {
        let ids: ({ number: number, id: string | number })[] = [];
        for (const detail in event) {
            if (key.test(detail)) {
                ids.push({
                    number: +detail.replace('wine', ''),
                    id: event[detail].id
                });
            }
        }
        return ids.sort((a, b) => a.number - b.number).map(e => e.id) || [];
    };

    const ImageToBase64 = async (imageFiles: ImageFile[]) => {
        let convertedImages = [];
        if (Array.isArray(imageFiles)) {
            for (const imageFile of imageFiles) {
                convertedImages.push(await base64Convertor(imageFile));
            }
        }
        return convertedImages;
    };

    const submit = async (e: Event) => {
        const token = localStorage.getItem('token');
        let photos = await ImageToBase64(e.photos);
        let winePhotos = await ImageToBase64(e.winePhotos);
        let event = {
            title: e.title,
            participants: (e.participants ? e.participants.map((p: Options) => p.id) : []),
            date: e.date ? e.date._d : new Date(),
            description: e.description,
            photos: [],
            winePhotos: [],
            tags: (e.tags ? e.tags.map((t: Options) => t.id) : []),
            wines: getIds(e, /^wine[0-9]+$/)
        };

        return axios({
            method: 'POST',
            url: `${ENV.api_server}/upload/event`,
            data: {
                winePhotos: winePhotos,
                photos: photos
            },
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(data => {
                event.winePhotos = data.data.winePhotos || [];
                event.photos = data.data.photos || [];
                return axios({
                    method: 'POST',
                    url: `${ENV.api_server}/event`,
                    data: event,
                    headers: { Authorization: `Bearer ${token}` }
                });
            })
            .then(data => (data.data))
            .catch(data => alert(data.error));
    };

    return (
        <WizardEventForm onSubmit={submit} />
    );
};