import {AuthRequest} from '../interface/auth-request.js';
import {Tenant} from '../../tenant/interface/tenant.js';
import {UserRole} from '../../tenant/interface/user-role.js';
import {ProfileResponse} from '../../restful/profile-response.js';
import {AuthorityTokenResponse} from '../../restful/authority-token-response.js';
import {TenantDaoController} from '../../tenant/dao/tenant-dao-controller.js';
import {TenantModel} from '../../tenant/orm/tenant-orm.js';
import {USER_ROLE} from '../../tenant/enum/user-role.js';
import {UserRoleModel} from '../../tenant/orm/user-role-orm.js';
import {NVerseAuthorityResolver, NVerseEmailEncoder, NverseJwtService, NversePasswordEncoder} from 'bmx-nverse-ts';
import {RaintreeActionCode, RaintreeResponse} from 'bmx-raintree-ts';
import {alfredLog} from 'bmx-alfred-ts';

export class AuthDAOController {

	private _response = new ProfileResponse();
	private _authResponse = new AuthorityTokenResponse();
	private _nverseAuthorityResolver = new NVerseAuthorityResolver<Tenant, USER_ROLE, UserRole>();
	private _tenantDaoController = new TenantDaoController();
	private _jwtService = new NverseJwtService();
	private _emailEncoder = new NVerseEmailEncoder(process.env.NVERSE_AES_KEY || '', process.env.NVERSE_AES_IV || '');
	private _passwordEncoder = new NversePasswordEncoder(process.env.NVERSE_PASSWORD_KEY || '');

	public login = async (authRequest: AuthRequest): Promise<RaintreeResponse> => {

		if (!authRequest.username || !authRequest.password) {
			return this._response.prepareActionResponse(RaintreeActionCode.INCORRECT_INFORMATION);
		}

		let tenant: Tenant = await this._tenantDaoController.retrieveUserByEmail(authRequest.username);

		if (!tenant) {
			return this._response.prepareActionResponse(RaintreeActionCode.INCORRECT_INFORMATION);
		}
		if (!this._passwordEncoder.matches(authRequest.password, tenant.password)) {
			return this._response.prepareActionResponse(RaintreeActionCode.INCORRECT_INFORMATION);
		}

		return {
			actionCode: RaintreeActionCode.FETCH_SUCCESS,
			success: true,
			message: RaintreeActionCode.message(RaintreeActionCode.FETCH_SUCCESS),
			jwt: this._jwtService.generateToken(tenant.email),
		};
	}

	public authResolver = async (req: any): Promise<RaintreeResponse> => {
		let tenant: Tenant = await this._nverseAuthorityResolver
			.resolveUserInformationFromAuthorizationToken(
				req.headers.authorization.split(' ')[1] || '',
				this._tenantDaoController.retrieveUserByEncryptedEmail
			)
		return this._authResponse.buildList(tenant.roles);
	}

	public register = async (tenant: Tenant): Promise<RaintreeResponse> => {

		tenant.email = this._emailEncoder.encode(tenant.email);
		let existTenant: Tenant = await TenantModel.findOne(
			{
				'$or': [
					{email: tenant.email},
					{contactNumber: tenant.contactNumber}
				]
			}
		).exec();

		if (existTenant) {
			return this._response.prepareActionResponse(RaintreeActionCode.NOT_UNIQUE);
		}
		try {
			const roles: UserRole[] = await UserRoleModel.insertMany([{
				role: USER_ROLE.NORMAL_USER
			}]);

			tenant.password = this._passwordEncoder.encode(tenant.password);
			tenant.roles = roles.map((role: UserRole) => role['_id']);

			// TODO: handle profile picture
			// TODO: req.files contains all images with key names

			await TenantModel.create(tenant);
		} catch (e) {
			alfredLog.error(e.message, e.stack);
			return this._response.prepareActionResponse(RaintreeActionCode.INSERT_FAILURE);
		}

		return this._response.prepareActionResponse(RaintreeActionCode.INSERT_SUCCESS);
	}
}
