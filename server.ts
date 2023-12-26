import {initDatabase} from './src/database/database-config';
import app from './app';

const PORT: number = +(process.env.PORT || 3000);

const startServer = async (): Promise<void> => {
	try {
		await initDatabase();
		app.listen(PORT, (): void => {
			console.log(`Server is listening on port ${PORT}...`)
		});
	} catch (e: any) {
		console.log(e.message);
	}
}

startServer().then((value: void): void => {});


