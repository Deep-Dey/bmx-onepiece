import {AbstractTenantValidator} from './abstract-tenant-validator';
import {Tenant} from '../../tenant/interface/tenant';

export class NewTenantValidator extends AbstractTenantValidator {

	public validate(entity: Tenant): boolean {
		return super.validate(entity);
	}
}
