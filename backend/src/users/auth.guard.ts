import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";


@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        let request = context.switchToHttp().getRequest()
        const authHeader = request.headers["authorization"]

        if (authHeader == "secret") {
            return true
        }else {
            throw new UnauthorizedException("HAHAHAH")
        }
    }
}