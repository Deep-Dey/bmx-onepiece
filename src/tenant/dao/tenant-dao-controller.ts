import {Tenant} from '../interface/tenant.js';
import {TenantModel} from '../odm/tenant-odm.js';
import {NVerseEmailEncoder, NverseTenantDaoController} from 'bmx-nverse-ts';
import {alfredLog} from 'bmx-alfred-ts';
import {BmxQueryResponse} from '../../nverse/interface/bmx-query-response.js';

export class TenantDaoController extends NverseTenantDaoController<Tenant> {

	private _emailEncoder: NVerseEmailEncoder =
		new NVerseEmailEncoder(process.env.NVERSE_AES_KEY || '', process.env.NVERSE_AES_IV || '');

	public retrieveUserByEncryptedEmail = async (email: string): Promise<Tenant> => {
		try {

			const existTenant: BmxQueryResponse<Tenant> = await TenantModel
				.findOne({email: email})
				.populate('roles')
				.exec();

			return <Tenant>existTenant;

		} catch (e: any) {
			alfredLog.error(e.message, e.stack);
			return {} as Tenant;
		}
	}

	public retrieveUserByEmail = async (email: string): Promise<Tenant> => {
		try {

			const existTenant: BmxQueryResponse<Tenant> = await TenantModel
				.findOne({email: this._emailEncoder.encode(email)})
				.populate('roles')
				.exec();

			return <Tenant>existTenant;

		} catch (e: any) {
			alfredLog.error(e.message, e.stack);
			return {} as Tenant;
		}
	}
}
