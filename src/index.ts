import express, {Express} from 'express';
import cors from 'cors';
import authRoutes from './auth/auth.route.js';
import {initDatabase} from './database/database-config.js';
import {Raintree} from 'bmx-raintree-ts';


const app: Express = express();
const PORT: number = +process.env.PORT || 3000;

app.set('trust proxy', true)
	.use(express.json({limit: '20mb'}))
	.use(express.urlencoded({limit: '20mb', extended: false}))
	.use(cors({
		credentials: (process.env.CREDENTIALS || 'true') === 'true',
		origin: (process.env.ORIGIN || '').split(','),
	}))
	.use('/api/v1/auth', authRoutes)
	.use(Raintree);

const startServer = async (): Promise<void> => {
	try {
		await initDatabase();
		app.listen(PORT, (): void => {
			console.log(`Server is listening on port ${PORT}...`)
		});
	} catch (e) {
		console.log(e);
	}
}

startServer().then((value: void): void => {});
