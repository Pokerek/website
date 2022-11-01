import { cleanEnv, str, port } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    DB_USER: str(),
    DB_PASSWORD: str(),
    DB_PATH: str(),
    PORT: port(),
    JWT_SECRET: str()
  });
};

export default validateEnv;
