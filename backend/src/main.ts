import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TypeOrmExceptionFilter } from './db/typeorm-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new TypeOrmExceptionFilter())
  app.enableCors({
    origin: ['http://localhost:5173'], 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',                  
    credentials: true,                                     
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
