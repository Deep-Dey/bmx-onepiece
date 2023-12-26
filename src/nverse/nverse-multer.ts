import {RequestHandler} from 'express';
import multer from 'multer';

const nverseMulter = (
	destination: string = process.env.MULTER_PATH || './temp-files',
	limit: number = 5
): RequestHandler => {
	return multer({
		dest: destination,
		limits: {
			fileSize: 1048576 * limit // Defined in bytes (5 Mb)
		},
	}).any();
}

export default nverseMulter;
