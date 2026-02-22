import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { MongooseModule } from "@nestjs/mongoose";
import { APP_GUARD } from "@nestjs/core";
import { AuthModule } from "./api/auth/auth.module";
import { ActivityModule } from "./api/activities/activities.module";
import { AppController } from "./app.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: parseInt(process.env.UPLOAD_RATE_TTL),
        limit: parseInt(process.env.UPLOAD_RATE_LIMIT),
      },
    ]),
    MongooseModule.forRoot(process.env.DB_CONNECTION),
    AuthModule,
    ActivityModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  controllers: [AppController],
})
export class AppModule { }
