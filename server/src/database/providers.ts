import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './database.config';

export const typeORMConfigProvider = [
	TypeOrmModule.forRoot({
		...databaseConfig
	}),
];
