import {UserRole} from './user-role.js';
import {GENDER} from '../enum/gender.js';
import {USER_ROLE} from '../enum/user-role.js';
import {NVerseTenant} from 'bmx-nverse-ts';

export interface Tenant extends NVerseTenant<USER_ROLE, UserRole> {
	Uid: string;
	contactNumber: string;
	contactNumberVerified: boolean;
	decryptedEmail: string;
	emailVerified: boolean;
	creationTime: number;
	lastAccessTime: number;
	profileImageUrl: string;
	gender: GENDER;
}
