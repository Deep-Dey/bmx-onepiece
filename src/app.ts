import express, {Express} from 'express';
import cors from 'cors';
import authRoutes from './auth/auth.route';
import {Raintree} from 'bmx-raintree-ts';

const app: Express = express();

app.set('trust proxy', true)
	.use(express.json({limit: '20mb'}))
	.use(express.urlencoded({limit: '20mb', extended: false}))
	.use(cors({
		credentials: (process.env.CREDENTIALS || 'true') === 'true',
		origin: (process.env.ORIGIN || '').split(','),
	}))
	.get('/ping', (req, res) => {
		res.send({message: 'Server is running...'});
	})
	.use('/api/v1/auth', authRoutes)
	.use(Raintree);

export default app;
