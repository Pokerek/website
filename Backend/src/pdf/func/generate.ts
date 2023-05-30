import ejs from 'ejs';
import path from 'path';
import { createHtmlFile, applyStyleFromFile } from './fileHelpers';
import { CV } from '../cv.model';
import { Project } from '../../database/model/projectsModel';

const generateHTML = (
  cvData: CV,
  projectData: Project[],
  name = 'page.ejs'
) => {
  const filePath = path.join(__dirname, '../../public/template', name);
  const style = applyStyleFromFile('style.css');

  ejs
    .renderFile(filePath, { cv: cvData, projects: projectData, cvStyle: style })
    .then((result) => {
      createHtmlFile(`${cvData.firstName}_${cvData.lastName}_cv.html`, result);
    });
};

export default generateHTML;
