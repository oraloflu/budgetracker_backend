import jwt from 'jsonwebtoken';
import UnauthenticatedError from '../errors/unauthenticated.js';
import { isTokenValid } from '../utils/helpers/jwt.js';

const auth = async (req, res, next) => {
    let token;
    const authHeader = req.headers['x-access-token'] || req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
        // Remove Bearer from string
        token = authHeader.slice(7, authHeader.length);
    } else if (req.signedCookies?.token) {
        token = req.signedCookies.token;
    }

    if (!token) {
        throw new UnauthenticatedError('Authentication invalid');
    }
    try {
        const payload = isTokenValid(token);

        req.user = {
            userId: payload.user.userId
        };
        next();
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid');
    }
};

export default auth;
