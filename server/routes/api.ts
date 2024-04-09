import { Request, Response } from 'express';
import Router from 'express-promise-router';
import bodyParser from 'body-parser';

const router = Router();
const jsonParser = bodyParser.json(); // Create JSON parser

const getRandomDelay = () => Math.floor(Math.random() * 1000) + 1;

const delayResponse = (req: Request, res: Response, next: Function) => {
	const delay = getRandomDelay();
	setTimeout(next, delay);
};

router.post(
	'/api',
	jsonParser,
	delayResponse,
	(req: Request, res: Response) => {
		const { index } = req.body;
		res.status(200).json({ index });
	}
);

export default router;
