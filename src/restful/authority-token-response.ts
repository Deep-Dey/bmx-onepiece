import {UserRole} from '../tenant/interface/user-role.js';
import {USER_ROLE} from '../tenant/enum/user-role.js';
import {Authority} from 'bmx-nverse-ts';
import {RaintreeActionCode, RaintreeResponse} from 'bmx-raintree-ts';
import {BehemothResponse} from 'bmx-behemoth-ts';

export class AuthorityTokenResponse extends BehemothResponse<UserRole> {

	public buildEntity(entity: UserRole): RaintreeResponse {
		return {
			actionCode: RaintreeActionCode.INCORRECT_INFORMATION,
			success: false,
			message: RaintreeActionCode.message(RaintreeActionCode.INCORRECT_INFORMATION),
		};
	}

	public buildList(userRoles: UserRole[]): RaintreeResponse {
		let authority: Authority = {
			superUser: userRoles.some(r => r.role === USER_ROLE.SUPER_USER),
			admin: userRoles.some(r => r.role === USER_ROLE.ADMIN),
			normalUser: userRoles.some(r => r.role === USER_ROLE.NORMAL_USER),
		}
		return this.prepareEntity<Authority>(authority, 'authority');
	}

}
