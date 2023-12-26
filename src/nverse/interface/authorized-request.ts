import {Request} from 'express';
import {Tenant} from '../../tenant/interface/tenant.js';

export interface AuthorizedRequest extends Request {
	tenant: Tenant;
}
