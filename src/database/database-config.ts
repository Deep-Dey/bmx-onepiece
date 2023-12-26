import mongoose from 'mongoose';

export const initDatabase = async (): Promise<void> => {
	try {
		await mongoose.connect(process.env.DB_URI || '');
		console.log('MongoDB connected ...');
	} catch (e: any) {
		console.log(e.message);
	}
}
