import { cleanEnv, str, port, email } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    DB_USER: str(),
    DB_PASSWORD: str(),
    DB_PATH: str(),
    PORT: port(),
    JWT_SECRET: str(),
    EMAIL: email(),
    EMAIL_PASSWORD: str(),
    UPLOAD_TEMP_DIR: str(),
    UPLOAD_DIR: str(),
  });
};

export default validateEnv;
