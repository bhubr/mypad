import { expressjwt } from 'express-jwt';
import { jwtSecret } from '../settings';

const checkJwt = expressjwt({
  algorithms: ['HS256'],
  secret: jwtSecret,
  getToken: (req) => req.cookies.jwt,
});

export default checkJwt;
