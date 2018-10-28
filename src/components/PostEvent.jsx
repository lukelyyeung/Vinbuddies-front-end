import React from "react";
import axios from "axios";
import base64Convertor from "../helpers/promisedFileReader";
import { WizardEventForm } from "./Forms/WizardEventForm";

const { REACT_API_SERVER } = process.env;
export const PostEvent = props => {
  const getIds = (event, key) => {
    let ids = [];
    for (const detail in event) {
      if (key.test(detail)) {
        ids.push({
          number: +detail.replace("wine", ""),
          id: event[detail].id
        });
      }
    }
    return ids.sort((a, b) => a.number - b.number).map(e => e.id) || [];
  };

  const ImageToBase64 = async imageFiles => {
    let convertedImages = [];
    if (Array.isArray(imageFiles)) {
      for (const imageFile of imageFiles) {
        convertedImages.push(await base64Convertor(imageFile));
      }
    }
    return convertedImages;
  };

  const submit = async e => {
    const token = localStorage.getItem("token");
    let photos = await ImageToBase64(e.photos);
    let winePhotos = await ImageToBase64(e.winePhotos);
    let event = {
      title: e.title,
      participants: e.participants ? e.participants.map(p => p.id) : [],
      date: e.date ? e.date._d : new Date(),
      description: e.description,
      photos: [],
      winePhotos: [],
      tags: e.tags ? e.tags.map(t => t.id) : [],
      wines: getIds(e, /^wine[0-9]+$/)
    };

    return axios({
      method: "POST",
      url: `${REACT_API_SERVER}/upload/event`,
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
          method: "POST",
          url: `${REACT_API_SERVER}/event`,
          data: event,
          headers: { Authorization: `Bearer ${token}` }
        });
      })
      .then(data => data.data)
      .catch(data => data.error);
  };

  return (
    <div className="non-homepage">
      <WizardEventForm onSubmit={submit} />
    </div>
  );
};
