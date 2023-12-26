import mongoose from 'mongoose';

export type BmxQueryResponse<T> =
	(mongoose.Document<unknown, {}, T> & T & Required<{_id: string;}>) | null;
