import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class LoggerMiddlware implements NestMiddleware{
    use(req: any, res: any, next: (error?: any) => void) {
        console.log(`- ${new Date().toLocaleTimeString()} [${req.method}]: ${req.originalUrl}`)
        next()
    }
}