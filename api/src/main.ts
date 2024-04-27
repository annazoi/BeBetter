import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/v1");
  app.enableCors({ origin: "*" });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );
  const config = new DocumentBuilder()
    .setTitle("BeBetter API")
    .setDescription("The BeBetter API description")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);
  await app.listen(3333);
}
bootstrap();
