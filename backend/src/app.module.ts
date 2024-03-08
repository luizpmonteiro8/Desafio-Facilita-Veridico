import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { CustomerModule } from './customer/customer.module';
import { RoutesModule } from './routes/routes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    CustomerModule,
    RoutesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
