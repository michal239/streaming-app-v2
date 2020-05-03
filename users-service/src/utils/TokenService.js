import jwt from 'jsonwebtoken';
import config from '../config';


class TokenService {
  constructor(secret) {
    if (!secret) throw new Error('No token passed');
    this.JWT_SECRET = secret;
  }
  sign(payload) {
    return jwt.sign(payload, this.JWT_SECRET);
  }

}

export default new TokenService(config.JWT_SECRET);