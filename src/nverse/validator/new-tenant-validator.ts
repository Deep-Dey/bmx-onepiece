import {AbstractTenantValidator} from "./abstract-tenant-validator.js";
import {Tenant} from '../../tenant/interface/tenant.js';

export class NewTenantValidator extends AbstractTenantValidator {

	public validate(entity: Tenant): boolean {
		return super.validate(entity);
	}
}
