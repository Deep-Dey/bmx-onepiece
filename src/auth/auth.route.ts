import {Router} from "express";
import {RequestMapper} from "../request-mapper.js";
import {AuthController} from "./controller/auth-controller.js";
import {AuthHandler} from './handler/auth-handler.js';
import nverseMulter from '../nverse/nverse-multer.js';
import { RequestHandler } from 'express';

const router: Router = Router();

const authController: AuthController = new AuthController();
const authHandler: AuthHandler = new AuthHandler();

router
	.post(
		RequestMapper.LOGIN,
		[authHandler.loginHandler],
		authController.login as RequestHandler
	)
	.get(
		RequestMapper.GET_AUTHORITY_TOKEN,
		[authHandler.authResolveHandler],
		authController.authResolver as RequestHandler
	)
	.post(
		RequestMapper.REGISTER,
		[authHandler.registrationHandler, nverseMulter()],
		authController.register as RequestHandler
	);

export default router;
