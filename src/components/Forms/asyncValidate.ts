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

export const asyncValidate = async(event: Event) => {
    if (!event.photos) {
      throw { photos: `Required.`};
    }
    if (!event.winePhotos) {
        throw { winePhotos: `Required.`};
      }
};