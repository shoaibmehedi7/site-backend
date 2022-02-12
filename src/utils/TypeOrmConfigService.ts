import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
class TypeOrmConfigService implements TypeOrmOptionsFactory {

    constructor(private configService: ConfigService) {}


    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: 'dev-mehedi.clmk8pebidwd.us-east-2.rds.amazonaws.com',
            port: 5432,
            username: 'dev_mehedi',
            password: '11111111',
            database: 'sites',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
        };
    }
}