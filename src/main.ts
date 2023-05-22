import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/v1')//Se usa para agregar un prefijo a todas las rutas de la aplicación en este caso '/api/v1' es el prefijo obligatorio para todas las rutas

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,//Se usa para que el validador ignore los campos que no estén definidos en el DTO
      forbidNonWhitelisted: true,//Se usa para que el validador arroje un error cuando se envíe un campo que no esté definido en el DTO
    })
  )

  await app.listen(3000);
}
bootstrap();
