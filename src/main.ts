import { NestFactory } from "@nestjs/core";
import { Logger, ValidationPipe } from "@nestjs/common";
import { AppModule } from "@/app.module";
import { envs } from "@/config";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

const logger = new Logger('Main')

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,{
    transport: Transport.TCP,
    options: {
      port: envs.port,
      host: envs.host
    }
  })

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }))

  await app.listen()
}
bootstrap().then(() => logger.log(`Products Microservice is running on http://${envs.host}:${envs.port}`))
