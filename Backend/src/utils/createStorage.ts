import fs from 'fs';

const createStorage = (paths: string[]) => {
  paths.forEach((path) => {
    if (!fs.existsSync(path)) fs.mkdirSync(path);
  });
};

export default createStorage;
