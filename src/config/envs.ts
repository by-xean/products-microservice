import "dotenv/config";
import * as joi from "joi";

interface EnvironmentVariables {
  HOST: string
  PORT: number
  DATABASE_URL: string
}

const envsSchema = joi.object({
  HOST: joi.string().required(),
  PORT: joi.number().required(),
  DATABASE_URL: joi.string().required()
}).unknown(true)

const { error, value } = envsSchema.validate(process.env)

if (error) throw new Error(`.env validation error: ${error.message}`)

const environmentVariables: EnvironmentVariables = value

export const envs = {
  host: environmentVariables.HOST,
  port: environmentVariables.PORT,
  databaseUrl: environmentVariables.DATABASE_URL
}