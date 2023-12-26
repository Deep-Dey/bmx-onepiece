import {Request} from 'express';
import {Tenant} from '../../tenant/interface/tenant';
import {BmxQueryResponse} from './bmx-query-response';

export interface AuthorizedRequest extends Request {
	tenant: BmxQueryResponse<Tenant>;
}
