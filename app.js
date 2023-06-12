import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

import AuthRoutes from './routes/Auth/AuthRoutes.js';
import TransactionRoutes from './routes/Transaction/TransactionRoutes.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import notFoundMiddleware from './middleware/not-found.js';

// https://www.behance.net/gallery/65608331/Expense-Tracker-Dashboard-%28With-live-demo%29
export class App {
    static app = express();
    static PORT = process.env.PORT || 5000;

    constructor() {
        App.routerHandler();
    }

    static routerHandler() {
        App.app.use(express.json());
        App.app.use(bodyParser.urlencoded({ extended: true }));
        App.app.use(cookieParser(process.env.JWT_SECRET));

        App.app.set('trust proxy', 1);
        App.app.use(
            rateLimit({
                windowMs: 15 * 60 * 1000,
                max: 60
            })
        );
        App.app.use(helmet());
        App.app.use(cors());
        App.app.use(xss());
        App.app.use(mongoSanitize());
        App.app.use(morgan('tiny'));

        App.app.get('/api/v1', (req, res) => {
            res.send("It's alive!!!");
        });

        App.app.use('/api/v1/auth', AuthRoutes);
        App.app.use('/api/v1/transaction', TransactionRoutes);

        // middlewares
        App.app.use(errorHandlerMiddleware);
        App.app.use(notFoundMiddleware);
    }

    listen() {
        App.app.listen(App.PORT, () =>
            console.log(`Server is listening on port ${App.PORT}...`)
        );
    }
}
