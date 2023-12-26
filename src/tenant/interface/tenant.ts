import {UserRole} from './user-role';
import {GENDER} from '../enum/gender';
import {USER_ROLE} from '../enum/user-role';
import {NVerseTenant} from 'bmx-nverse-ts';

export interface Tenant extends NVerseTenant<USER_ROLE, UserRole> {
	Uid: string;
	name: string;
	contactNumber: string;
	contactNumberVerified: boolean;
	decryptedEmail: string;
	emailVerified: boolean;
	creationTime: number;
	lastAccessTime: number;
	profileImageUrl: string;
	gender: GENDER;
}
