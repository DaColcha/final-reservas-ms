import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  RESERVAS_MS_PORT: number;
  RESERVAS_MS_HOST: string;
  AUTH_MS_PORT: number;
  AUTH_MS_HOST: string;
  MENU_MS_PORT: number;
  MENU_MS_HOST: string;
  MESA_MS_PORT: number;
  MESA_MS_HOST: string;
}

const envVarsSchema = joi
  .object({
    PORT: joi.number().required(),
    RESERVAS_MS_PORT: joi.number().required(),
    RESERVAS_MS_HOST: joi.string().required(),
    AUTH_MS_PORT: joi.number().required(),
    AUTH_MS_HOST: joi.string().required(),
    MENU_MS_PORT: joi.number().required(),
    MENU_MS_HOST: joi.string().required(),
    MESA_MS_PORT: joi.number().required(),
    MESA_MS_HOST: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  reservasMsPort: envVars.RESERVAS_MS_PORT,
  reservasMsHost: envVars.RESERVAS_MS_HOST,
  authMsPort: envVars.AUTH_MS_PORT,
  authMsHost: envVars.AUTH_MS_HOST,
  menuMsPort: envVars.MENU_MS_PORT,
  menuMsHost: envVars.MENU_MS_HOST,
  mesaMsPort: envVars.MESA_MS_PORT,
  mesaMsHost: envVars.MESA_MS_HOST,
};
