import express, {Express} from 'express';
import cors from 'cors';
import authRoutes from './auth/auth.route.js';
import {initDatabase} from './database/database-config.js';
import {Raintree} from 'bmx-raintree-ts';

//----------- start configuration ----------------//

const app: Express = express();
const PORT: number = +process.env.PORT || 3000;
app.use(cors({
	credentials: (process.env.CREDENTIALS || 'true') === 'true',
	origin: (process.env.ORIGIN || 'localhost:4200').split(','),
}));

app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({limit: '20mb', extended: false}));

//----------- end configuration ----------------//
//----------- route configuration ----------------//

app.get('/ping', [], (req, res): void => {
	res.status(200).json({
		success: true,
		message: 'Server is running!',
	});
});

app.use('/api/v1/auth', authRoutes);
app.use(Raintree);

//----------- end route configuration ----------------//
//----------- start server ----------------//

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
