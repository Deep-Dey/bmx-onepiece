import {Tenant} from '../interface/tenant.js';
import {TenantModel} from '../orm/tenant-orm.js';
import {NVerseEmailEncoder, NverseTenantDaoController} from 'bmx-nverse-ts';
import {alfredLog} from 'bmx-alfred-ts';

export class TenantDaoController extends NverseTenantDaoController<Tenant> {

	private _emailEncoder: NVerseEmailEncoder =
		new NVerseEmailEncoder(process.env.NVERSE_AES_KEY || '', process.env.NVERSE_AES_IV || '');

	public retrieveUserByEncryptedEmail = async (email: string): Promise<Tenant> => {
		try {

			return await TenantModel
				.findOne({email: email})
				.populate('roles')
				.exec();

		} catch (e) {
			alfredLog.error(e.message, e.stack);
		}
	}

	public retrieveUserByEmail = async (email: string): Promise<Tenant> => {
		try {

			email = this._emailEncoder.encode(email);
			return await TenantModel
				.findOne({email: email})
				.populate('roles')
				.exec();

		} catch (e) {
			alfredLog.error(e.message, e.stack);
		}
	}
}
