import { ImageFile } from 'react-dropzone';

export default function base64Convertor(inputFile: ImageFile) {
    const fileReader = new FileReader();
  
    return new Promise((resolve, reject) => {
      fileReader.onerror = () => {
        fileReader.abort();
        reject(new DOMException('Problem parsing input file.'));
      };

      fileReader.readAsDataURL(inputFile);
  
      fileReader.onload = () => {
        resolve(fileReader.result.split(',')[1]);
      };
    });
  }