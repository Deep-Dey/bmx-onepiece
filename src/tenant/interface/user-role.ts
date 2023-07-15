import {USER_ROLE} from "../enum/user-role.js";
import {BehemothInterface} from 'bmx-behemoth-ts';

export interface UserRole extends BehemothInterface {
	role: USER_ROLE;
}
