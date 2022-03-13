import mongoose from 'mongoose';

export interface User {
	fullName: string;
	nickName: string;
	userId: number;
}

const userScheme = new mongoose.Schema<User>({
	fullName: {
		type: String,
		required: true,
	},
	nickName: {
		type: String,
		required: true,
	},
	userId: {
		type: Number,
		required: true,
	},
});

const userModel = mongoose.model('user', userScheme);

export const Users = new (class CUser {
	async addUser(user: User) {
		return userModel.findOneAndUpdate({ userId: user.userId }, user, {
			upsert: true,
			new: true,
			setDefaultsOnInsert: true,
		});
	}
})();
