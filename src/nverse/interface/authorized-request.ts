import {Request} from 'express';
import {Tenant} from '../../tenant/interface/tenant';

export interface AuthorizedRequest extends Request {
	tenant: Tenant;
}
