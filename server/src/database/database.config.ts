const databaseConfig : any = {
    type: process.env.DATABASE_CONNECTION,
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    synchronize: true,
    logging: true,
    entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
};

export default databaseConfig;
