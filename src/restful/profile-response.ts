import {Tenant} from "../tenant/interface/tenant.js";
import {RaintreeResponse} from 'bmx-raintree-ts';
import {BehemothResponse} from 'bmx-behemoth-ts';

export class ProfileResponse extends BehemothResponse<Tenant> {

	public buildEntity(entity: Tenant): RaintreeResponse {
		return this.prepareEntity(entity, 'tenant');
	}

	public buildList(list: Tenant[]): RaintreeResponse {
		return this.prepareList(list, 'tenantList');
	}

}
