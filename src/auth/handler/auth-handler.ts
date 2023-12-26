import {Request, Response, NextFunction} from 'express';
import {Tenant} from '../../tenant/interface/tenant.js';
import {USER_ROLE} from '../../tenant/enum/user-role.js';
import {UserRole} from '../../tenant/interface/user-role.js';
import {LocalGatekeeper} from '../../nverse/local-gatekeeper.js';
import {NewTenantValidator} from '../../nverse/validator/new-tenant-validator.js';
import {TenantSanitizer} from '../../nverse/sanitizer/tenant-sanitizer.js';
import {TenantDaoController} from '../../tenant/dao/tenant-dao-controller.js';
import {NVerseAuthorityResolver} from 'bmx-nverse-ts';
import {getEntityHandler, unAuthGetEntityHandler, unAuthPostEntityHandler} from 'bmx-behemoth-ts';
import {alfredLog} from 'bmx-alfred-ts';


export class AuthHandler {

	private _newTenantValidator = new NewTenantValidator();
	private _tenantSanitizer = new TenantSanitizer();
	private _gateKeeper = new LocalGatekeeper();
	private _nverseAuthorityResolver = new NVerseAuthorityResolver<Tenant, USER_ROLE, UserRole>();
	private _tenantDaoController = new TenantDaoController();

	public loginHandler = (req: Request, res: Response, next: NextFunction): void => {
		unAuthGetEntityHandler(
			req,
			res,
			'loginHandler'
		).then(next).catch(e => {
			alfredLog.error(e.message, e.stack);
			res.status(401).send({
				success: false,
				message: e.message
			});
		});
	}

	public authResolveHandler = (req: Request, res: Response, next: NextFunction): void => {
		getEntityHandler<Tenant, USER_ROLE, UserRole>(
			req,
			res,
			this._gateKeeper,
			this._nverseAuthorityResolver,
			'loginHandler',
			LocalGatekeeper.CODE_ADNU,
			'Error occurred. Please try again.',
			this._tenantDaoController.retrieveUserByEncryptedEmail
		).then(next).catch(e => {
			alfredLog.error(e.message, e.stack);
			res.status(401).send({
				success: false,
				message: e.message
			});
		});
	}

	public registrationHandler = (req: Request, res: Response, next: NextFunction): void => {
		unAuthPostEntityHandler(
			req,
			res,
			'registrationHandler',
			this._newTenantValidator,
			this._tenantSanitizer
		).then(next).catch(e => {
			alfredLog.error(e.message, e.stack);
			res.status(401).send({
				success: false,
				message: e.message
			});
		});
	}
}
