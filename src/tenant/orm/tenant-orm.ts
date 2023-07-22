import mongoose, {Model, Schema} from 'mongoose';
import {Tenant} from '../interface/tenant.js';
import {GENDER} from '../enum/gender.js';
import {CollectionName} from '../../database/collection-name.js';
import {NVerseEmailEncoder} from 'bmx-nverse-ts';

const emailValidator = new NVerseEmailEncoder(process.env.NVERSE_AES_KEY || '', process.env.NVERSE_AES_IV || '');

const TenantSchema: Schema = new mongoose.Schema<Tenant>({
	id: {
		type: Number,
		index: true
	},
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		index: true
	},
	emailVerified: {
		type: Boolean,
		default: false
	},
	contactNumber: {
		type: String,
		required: true,
		minlength: 10,
		unique: true,
		index: true
	},
	contactNumberVerified: {
		type: Boolean,
		default: false
	},
	password: {
		type: String,
		required: true
	},
	roles: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: CollectionName.USER_ROLE,
		required: true
	}],
	gender: {
		type: String,
		enum: [GENDER.MALE, GENDER.FEMALE, GENDER.OTHER, GENDER.UNDEFINED],
		default: GENDER.UNDEFINED
	},
	isActive: {
		type: Boolean,
		default: true
	},
	isDeleted: {
		type: Boolean,
		default: false
	},
	isSuspended: {
		type: Boolean,
		default: false
	},
	profileImageUrl: {
		type: String,
		default: ''
	},
}, {
	timestamps: true,
	toJSON: {
		virtuals: true,
		transform: function (doc: any, ret: Record<string, any>): void {
			delete ret.__v;
			delete ret._id;
		}
	},
	virtuals: {
		Uid: {
			get(): string {
				return this._id;
			}
		},
		decryptedEmail: {
			get(): string {
				return emailValidator.decode(this.email);
			}
		}
	}
});


TenantSchema.pre('validate', function (next: any): void {
	if (this.isNew) {
		TenantModel.count().then((res: number): void => {
			this.id = res + 1;
		}).finally(next);
	} else {
		this.__v += 1;
		next();
	}
});

const TenantModel: Model<Tenant> = mongoose.model<Tenant>(
	CollectionName.TENANT, TenantSchema, CollectionName.TENANT
);

export {TenantSchema, TenantModel};
