import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { generateSmsCode } from 'src/utils/main-func'
import * as dotenv from 'dotenv'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Nexmo = require('nexmo')

dotenv.config()

const nexmo = new Nexmo({
    apiKey: process.env.NEXMO_API_KEY,
    apiSecret: process.env.NEXMO_API_SECRET,
})

@Injectable()
export class AppService {
    async ping() {
        return 'ping'
    }

    async sendSms(phone: string) {
        const code = generateSmsCode()

        const from = 'Chat'
        const to = phone
        const text = `Your code: ${code}`
        // nexmo.message.sendSms(from, to, text, function (error, result) {
        //     if (error) {
        //         throw new HttpException(error.message, HttpStatus.NOT_FOUND)
        //     }
        //     if (result.messages[0]['status'] !== '0') {
        //         // eslint-disable-next-line no-console
        //         console.log(`Message failed with error: ${result.messages[0]['error-text']}`)

        //     }
        // })
        return code
    }
}
