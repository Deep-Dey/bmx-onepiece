import mongoose, {Model, Schema} from 'mongoose';
import {UserRole} from '../interface/user-role.js';
import {USER_ROLE} from '../enum/user-role.js';
import {CollectionName} from '../../database/collection-name.js';

const UserRoleSchema: Schema = new mongoose.Schema<UserRole>({
	role: {
		type: String,
		enum: [
			USER_ROLE.NORMAL_USER,
			USER_ROLE.ADMIN,
			USER_ROLE.SUPER_USER,
			USER_ROLE.GOD_MODE
		],
		required: true
	},
}, {
	timestamps: true,
	versionKey: false,
	toJSON: {
		virtuals: true
	}
});

const UserRoleModel: Model<UserRole> = mongoose.model<UserRole>(
	CollectionName.USER_ROLE, UserRoleSchema, CollectionName.USER_ROLE
);

export {UserRoleSchema, UserRoleModel};
