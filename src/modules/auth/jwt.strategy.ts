import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'authToken') {
  constructor() {
    const JWT_SECRET = process.env.SECRET_KEY;
    if (!JWT_SECRET) {
      throw new Error('SECRET_KEY environment variable is not set');
    }
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          let token = null;
          if (req && req.cookies) {
            token = req.cookies['authToken'];
          }
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey:  JWT_SECRET, 
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, email: payload.email };
  }
}
