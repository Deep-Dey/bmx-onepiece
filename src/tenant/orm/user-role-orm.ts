import mongoose, {Model, Schema} from 'mongoose';
import {UserRole} from '../interface/user-role.js';
import {USER_ROLE} from '../enum/user-role.js';
import {CollectionName} from '../../database/collection-name.js';

const UserRoleSchema: Schema = new mongoose.Schema<UserRole>({
	id: {type: Number},
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
	toJSON: {
		virtuals: true,
		transform: function (doc: any, ret: Record<string, any>): void {
			delete ret.__v;
			delete ret._id;
		}
	}
});

UserRoleSchema.pre('validate', function (next: any): void {
	if (this.isNew) {
		UserRoleModel.count().then((res: number): void => {
			this.id = res + 1;
		}).finally(next);
	} else {
		this.__v += 1;
		next();
	}
});

const UserRoleModel: Model<UserRole> = mongoose.model<UserRole>(
	CollectionName.USER_ROLE, UserRoleSchema, CollectionName.USER_ROLE
);

export {UserRoleSchema, UserRoleModel};
