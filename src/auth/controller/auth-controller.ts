import {AuthDAOController} from '../dao/auth-dao-controller.js';

export class AuthController {

	private _authDAOController = new AuthDAOController();

	public login = (req, res, next): void => {
		this._authDAOController.login(req.body).then(next).catch(next);
	}

	public authResolver = (req, res, next): void => {
		this._authDAOController.authResolver(req).then(next).catch(next);
	}

	public register = (req, res, next): void => {
		this._authDAOController.register(req.body).then(next).catch(next);
	}
}
