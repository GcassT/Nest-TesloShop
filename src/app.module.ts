import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD, 
      autoLoadEntities: true, //Se usa para que TypeORM pueda encontrar las entidades
      synchronize: true,// Se usa para que TypeORM pueda sincronizar las entidades con la base de datos (En producción se recomienda desactivar)
    }),

    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
