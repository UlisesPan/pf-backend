import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Campus Lite API')
    .setDescription('Documentación de la API de Campus Lite')
    .setVersion('1.0')
    .addBearerAuth() // 👈 habilita el botón "Authorize" para probar rutas con JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // disponible en /api
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
