import mongoose from 'mongoose';

export const initDatabase = async () => {
	try {
		await mongoose.connect(process.env.DB_URI || '');
		console.log('MongoDB connected ...');
	} catch (e) {
		console.log(e.message);
	}
}
