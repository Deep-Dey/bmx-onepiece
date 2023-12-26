import mongoose from 'mongoose';

export type BmxQueryList<T> =
	(mongoose.Document<unknown, {}, T> & T & Required<{_id: string;}>)[];
