import {Router} from "express";
import {RequestMapper} from "../request-mapper.js";
import {AuthController} from "./controllers/auth-controller.js";
import {AuthHandler} from './handlers/auth-handler.js';
import nverseMulter from '../nverse/nverse-multer.js';

const router: Router = Router();

const authController = new AuthController();
const authHandler = new AuthHandler();

router
	.post(
		RequestMapper.LOGIN,
		[authHandler.loginHandler],
		authController.login
	)
	.get(
		RequestMapper.GET_AUTHORITY_TOKEN,
		[authHandler.authResolveHandler],
		authController.authResolver
	)
	.post(
		RequestMapper.REGISTER,
		[authHandler.registrationHandler, nverseMulter()],
		authController.register
	);

export default router;