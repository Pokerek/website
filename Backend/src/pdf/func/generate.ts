import ejs from 'ejs';
import path from 'path';
import { createHtmlFile, applyStyleFromFile } from './fileHelpers';

const generate = (cvData: any, projectData: any, name = 'page.ejs') => {
  const filePath = path.join(__dirname, '../start', name);
  const style = applyStyleFromFile('style.css');

  ejs.renderFile(filePath, { cv: data, cvStyle: style }).then((result) => {
    createHtmlFile('cv.html', result);
  });
};

export default generate;
