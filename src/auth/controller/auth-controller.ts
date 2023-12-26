import {Request, Response, NextFunction} from 'express';
import {AuthDAOController} from '../dao/auth-dao-controller.js';
import {AuthorizedRequest} from '../../nverse/interface/authorized-request.js';

export class AuthController {

	private _authDAOController: AuthDAOController = new AuthDAOController();

	public login = (req: Request, res: Response, next: NextFunction): void => {
		this._authDAOController.login(req.body).then(next).catch(next);
	}

	public authResolver = (req: AuthorizedRequest, res: Response, next: NextFunction): void => {
		this._authDAOController.authResolver(req).then(next).catch(next);
	}

	public register = (req: Request, res: Response, next: NextFunction): void => {
		this._authDAOController.register(req.body).then(next).catch(next);
	}
}
