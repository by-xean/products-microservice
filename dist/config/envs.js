"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config");
const joi = require("joi");
const envsSchema = joi.object({
    HOST: joi.string().required(),
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required()
}).unknown(true);
const { error, value } = envsSchema.validate(process.env);
if (error)
    throw new Error(`.env validation error: ${error.message}`);
const environmentVariables = value;
exports.envs = {
    host: environmentVariables.HOST,
    port: environmentVariables.PORT,
    databaseUrl: environmentVariables.DATABASE_URL
};
//# sourceMappingURL=envs.js.map