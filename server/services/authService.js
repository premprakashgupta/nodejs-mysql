const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const saltRounds = 10;
const jwtSecret = 'your_jwt_secret_key'; // Ideally, use environment variables
const tokenExpiry = '1h';

class AuthService {
  static async register(userData) {
    const { username, password, role } = userData;
    const hashedPassword = await this.hashPassword(password);
    const user = await User.create({ username, password: hashedPassword, role });
    return { id: user.id, username: user.username, role: user.role };
  }

  static async login(username, password) {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await this.comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }
    const token = this.generateToken({ id: user.id, username: user.username, role: user.role });
    return { token, user: { id: user.id, username: user.username, role: user.role } };
  }

  static generateToken(payload) {
    return jwt.sign(payload, jwtSecret, { expiresIn: tokenExpiry });
  }

  static async hashPassword(password) {
    return await bcrypt.hash(password, saltRounds);
  }

  static async comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
  static async signout(req) {
    return await req.logout();
  }
}

module.exports = AuthService;
