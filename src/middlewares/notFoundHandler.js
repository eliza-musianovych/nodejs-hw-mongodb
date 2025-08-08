import { HttpError } from 'http-errors';

export const notFoundHandler = (err, req, res, next) => {
    if (err instanceof HttpError) {
        res.status(404).json({
          status: 404,
          message: err.message,
          data: err,
        });
    }

    res.status(404).json({
        message: 'Route not found.',
        data: err.message,
    });
};
