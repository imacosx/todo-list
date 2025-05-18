import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const dataBaseConfig = ( config: ConfigService ): TypeOrmModuleOptions => ({
    type:'mysql',
    host: config.get<string>('DATABASE_HOST'),
    port: Number(config.get<number>('DATABASE_PORT')),
    username: config.get<string>('DATABASE_USER'),
    password: config.get<string>('DATABASE_PASSWORD'),
    database: config.get<string>('DATABASE_NAME'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
})