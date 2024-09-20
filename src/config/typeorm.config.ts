import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private config: ConfigService) { }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        switch (process.env.NODE_ENV) {
            case 'development':
                return {
                    type: this.config.get<any>('DB_TYPE'),
                    synchronize: JSON.parse(this.config.get<string>('SYNCHRONIZE')),
                    database: this.config.get<string>('DB_NAME'),
                    autoLoadEntities: true,
                };
            case 'test':
                return {
                    type: this.config.get<any>('DB_TYPE'),
                    synchronize: JSON.parse(this.config.get<string>('SYNCHRONIZE')),
                    database: this.config.get<string>('DB_NAME'),
                    autoLoadEntities: true,
                    migrationsRun: JSON.parse(this.config.get<string>('MIGRATIONS_RUN')),
                };
            case 'production':
                const obj = {
                    type: this.config.get<any>('DB_TYPE'),
                    // synchronize: false,
                    synchronize: JSON.parse(this.config.get<string>('SYNCHRONIZE')),
                    url: process.env.DATABASE_URL,
                    autoLoadEntities: true,
                    // migrationsRun: JSON.parse(this.config.get<string>('MIGRATIONS_RUN')),
                    // ssl: {
                    //     rejectUnauthorized: JSON.parse(this.config.get<string>('SSL')),
                    // },
                };
            
                return obj;
        }
    }
}