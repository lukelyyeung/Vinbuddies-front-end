export const asyncValidate = async(event) => {
    if (!event.photos) {
      throw { photos: `Required.`};
    }
    if (!event.winePhotos) {
        throw { winePhotos: `Required.`};
      }
};
