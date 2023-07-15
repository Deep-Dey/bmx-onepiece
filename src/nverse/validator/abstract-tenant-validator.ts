import {Tenant} from "../../tenant/interface/tenant.js";
import {NVerseValidator} from 'bmx-nverse-ts';

export abstract class AbstractTenantValidator implements NVerseValidator<Tenant> {

	public validate(entity: Tenant) {
		// TODO: implement
		return true;
	}

}
