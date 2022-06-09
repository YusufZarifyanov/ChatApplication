import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

import * as uuid from 'uuid'
import * as fs from 'fs'
import * as path from 'path'

@Injectable()
export class FileService {
    async createFile(file): Promise<string> {
        try {
            const fileName = uuid.v4() + '.jpg'
            const fielPath = path.resolve(__dirname, '..', '..', 'static')
            if (!fs.existsSync(fielPath)) {
                fs.mkdirSync(fielPath, { recursive: true })
            }
            fs.writeFileSync(path.join(fielPath, fileName), file.buffer)
            return fileName
        } catch (err) {
            throw new HttpException('Ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
