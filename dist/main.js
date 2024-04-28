"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const config_1 = require("./config");
const microservices_1 = require("@nestjs/microservices");
const logger = new common_1.Logger('Main');
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            port: config_1.envs.port,
            host: config_1.envs.host
        }
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true
    }));
    await app.listen();
}
bootstrap().then(() => logger.log(`Products Microservice is running on http://${config_1.envs.host}:${config_1.envs.port}`));
//# sourceMappingURL=main.js.map