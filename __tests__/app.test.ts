import request from 'supertest';
import app from '../app';

describe('Test app.ts', () => {
	test('Server is up', async () => {
		const res = await request(app).get('/ping');
		expect(res.body).toEqual({message: 'Server is running...'});
	});
});
