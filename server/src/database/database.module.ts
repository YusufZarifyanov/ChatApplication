import { Module } from "@nestjs/common";
import { typeORMConfigProvider } from "./providers";

@Module({
    imports:[
        ...typeORMConfigProvider
    ]
})
export class DatabaseModule {}