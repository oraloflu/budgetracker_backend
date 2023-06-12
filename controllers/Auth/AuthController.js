import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../../errors/index.js';
import UserModel from '../../models/UserModel.js';
import { attachCookiesToResponse } from '../../utils/helpers/jwt.js';
import createTokenUser from '../../utils/helpers/createTokenUser.js';
import UnauthenticatedError from '../../errors/unauthenticated.js';

export class AuthController {
    static async register(req, res) {
        try {
            const { firstname, lastname, email, password } = req.body;
            if (!firstname || !lastname || !email || !password) {
                throw new BadRequestError(
                    'Please provide firstname, lastname, email and password!'
                );
            }

            const emailAlreadyExists = await UserModel.findOne({ email });
            if (emailAlreadyExists) {
                throw new BadRequestError('Email already exists');
            }

            const user = await UserModel.create({ firstname, lastname, email, password });
            const tokenUser = createTokenUser(user);

            attachCookiesToResponse({ res, user: tokenUser });
            res.status(StatusCodes.CREATED).json({ user: tokenUser });
        } catch (e) {
            console.log(e);
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw new BadRequestError('Please provide email and password');
            }

            const user = await UserModel.findOne({ email });

            if (!user) {
                throw new UnauthenticatedError('Invalid Credentials');
            }

            const isPasswordCorrect = await user.comparePassword(password);
            if (!isPasswordCorrect) {
                throw new UnauthenticatedError('Invalid Credentials');
            }

            const tokenUser = createTokenUser(user);

            attachCookiesToResponse({ res, user: tokenUser });

            res.status(StatusCodes.OK).json({ user: tokenUser });
        } catch (e) {
            console.log(e);
        }
    }

    static async logout(req, res) {
        try {
            res.cookie('token', 'logout', {
                httpOnly: true,
                expires: new Date(Date.now() + 1000)
            });

            res.status(StatusCodes.OK).json({ message: 'User logged out!' });
        } catch (e) {
            console.log(e);
        }
    }

    static async updateUser(req, res) {
        try {
            const { email, firstname, lastname } = req.body;
            if (!email || !firstname || !lastname) {
                throw new BadRequestError('Please provide all values');
            }
            const user = await UserModel.findOne({ _id: req.user.userId });
            user.email = email;
            user.firstname = firstname;
            user.lastname = lastname;

            await user.save();
            const tokenUser = createTokenUser(user);
            attachCookiesToResponse({ res, user: tokenUser });

            res.status(StatusCodes.OK).json({ user: tokenUser });
        } catch (e) {
            console.log(e);
        }
    }

    static async getCurrentUser(req, res) {
        try {
            const id = req.user.userId;
            if (id) {
              res.status(StatusCodes.OK).json({ user: req.user });
            }
            res.status(StatusCodes.BAD_REQUEST).json({
                message: 'User has not been found! Try again later'
            });
        } catch (e) {
            console.log(e);
        }
    }
}
