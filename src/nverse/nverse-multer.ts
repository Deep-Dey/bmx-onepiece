import multer from 'multer';

const nverseMulter = (
	destination: string = process.env.MULTER_PATH || './uploaded-temp-files',
	limit: number = 5
): multer => {
	return multer({
		dest: destination,
		limits: {
			fileSize: 1048576 * limit // Defined in bytes (5 Mb)
		},
	}).any();
}

export default nverseMulter;
