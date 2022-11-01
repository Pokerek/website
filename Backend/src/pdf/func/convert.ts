import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import HttpException from '../../exceptions/HttpException';

const newFormData = (filename: string) => {
  const formData = new FormData();
  formData.append(
    'instructions',
    JSON.stringify({
      parts: [
        {
          html: filename,
          layout: {
            size: 'A4'
          }
        }
      ]
    })
  );
  const readPath = path.join(__dirname, '../public', filename);
  formData.append(filename, fs.createReadStream(readPath));
  return formData;
};

const convert = () => {
  const formData = newFormData('cv.html');
  axios
    .post('https://api.pspdfkit.com/build', formData, {
      headers: formData.getHeaders({
        Authorization: `Bearer ${process.env.PDF_KEY}`
      }),
      responseType: 'stream'
    })
    .then((response) => {
      const resultPath = path.join(__dirname, '../public', 'cv.pdf');
      response.data.pipe(fs.createWriteStream(resultPath));
    })
    .catch(() => new HttpException(409, 'Convert failed!'));
};

export default convert;
