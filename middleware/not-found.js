import { StatusCodes } from 'http-status-codes';

const notFound = (req, res) =>
    res.status(StatusCodes.NOT_FOUND).send('route does not exist');

export default notFound;
