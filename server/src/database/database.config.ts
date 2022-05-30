import * as dotenv from 'dotenv'

dotenv.config()

const databaseConfig: any = {
    type: process.env.DATABASE_CONNECTION,
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    synchronize: true,
    logging: false,
    entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
    migrationsTableName: 'migration',
    migrations: ['dist/database/migrations/*.js'],
    cli: {
        migrationsDir: 'src/database/migrations',
    },
}

module.exports = databaseConfig
