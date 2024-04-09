import type { Options } from 'express-rate-limit';

export const config_limiter = {
	windowMs: 1000,
	max: 50,
	message: 'Too many requests, please try again later.',
} as Partial<Options> | undefined;
