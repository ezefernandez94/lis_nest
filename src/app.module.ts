import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { ComponentsModule } from './components/components.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { CustomLoggerModule } from './custom-logger/custom-logger.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    SuppliersModule,
    ComponentsModule,
    ThrottlerModule.forRoot([{
      name: 'short',
      ttl: 1000, //ms
      limit: 3, //no of requests from the same client
    },{
      name: 'long',
      ttl: 60000,
      limit: 100,
    }]),
    CustomLoggerModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  }],
})
export class AppModule {}
