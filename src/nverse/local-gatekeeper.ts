import {Tenant} from '../tenant/interface/tenant.js';
import {USER_ROLE} from '../tenant/enum/user-role.js';
import {UserRole} from '../tenant/interface/user-role.js';
import {NverseGatekeeper} from 'bmx-nverse-ts';

//TODO: This is the implemented class
export class LocalGatekeeper extends NverseGatekeeper<Tenant, USER_ROLE, UserRole> {

	public static readonly CODE_SU: number = 1;
	public static readonly CODE_AD: number = 2;
	public static readonly CODE_NU: number = 3;
	public static readonly CODE_ADNU: number = 5;

	private roleSU = (user: Tenant): boolean => {
		return user.roles.some(r => r.role === USER_ROLE.SUPER_USER);
	}

	private roleAD = (user: Tenant): boolean => {
		return this.roleSU(user)
			|| user.roles.some(r => r.role === USER_ROLE.ADMIN);
	}

	private roleNU = (user: Tenant): boolean => {
		return this.roleSU(user)
			|| user.roles.some(r => r.role === USER_ROLE.NORMAL_USER);
	}

	private roleADNU = (user: Tenant): boolean => {
		return this.roleAD(user)
			|| this.roleNU(user);
	}

	public userHasAppropriateAuthority = (user: Tenant, code: number): boolean => {
		switch (code) {
			case LocalGatekeeper.CODE_SU:
				return this.roleSU(user);
			case LocalGatekeeper.CODE_AD:
				return this.roleAD(user);
			case LocalGatekeeper.CODE_NU:
				return this.roleNU(user);
			case LocalGatekeeper.CODE_ADNU:
				return this.roleADNU(user);
			default:
				return false;
		}
	}
}
