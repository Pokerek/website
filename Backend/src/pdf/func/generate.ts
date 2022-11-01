import ejs from 'ejs';
import path from 'path';
import createHtmlFile from './createHtmlFile';

const generate = (data: object, name = 'page.ejs') => {
  const filePath = path.join(__dirname, '../start', name);
  ejs.renderFile(filePath, { cv: data }).then((result) => {
    createHtmlFile('cv.html', result);
  });
};

export default generate;
