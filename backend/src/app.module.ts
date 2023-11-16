import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrandsModule } from './brands/brands.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'brands-dev',
      entities: [], // Add your entities here
      synchronize: true, // Set to false in production
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoLoadEntities: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BrandsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
