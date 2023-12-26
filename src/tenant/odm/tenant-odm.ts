import mongoose, {Model, Schema} from 'mongoose';
import {Tenant} from '../interface/tenant';
import {GENDER} from '../enum/gender';
import {CollectionName} from '../../database/collection-name';
import {NVerseEmailEncoder} from 'bmx-nverse-ts';

const emailValidator = new NVerseEmailEncoder(
	process.env.NVERSE_AES_KEY || '', process.env.NVERSE_AES_IV || '');

const TenantSchema: Schema = new mongoose.Schema<Tenant>({
	Uid: {
		type: String,
		required: true,
		unique: true,
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
	versionKey: false,
	toJSON: {
		virtuals: true
	},
	id: false,
	virtuals: {
		decryptedEmail: {
			get(): string {
				//TODO: need to find a fix for this
				// @ts-ignore
				return emailValidator.decode(this.email);
			}
		}
	}
});

const TenantModel: Model<Tenant> = mongoose.model<Tenant>(
	CollectionName.TENANT, TenantSchema, CollectionName.TENANT
);

export {TenantSchema, TenantModel};
