import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import routes from './routes';
import { config_limiter } from './config';

const app = express();
app.use(morgan('dev'));

app.use('/', routes);

const limiter = rateLimit(config_limiter);

app.use(limiter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof Error && err.name === 'TooManyRequestsError') {
		res.status(429).send('Too Many Requests');
	} else {
		next(err);
	}
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port', port));
