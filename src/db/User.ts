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

const Users = new (class CUser {
	async addUser(user: User) {
		return userModel.findOneAndUpdate({ userId: user.userId }, user, {
			upsert: true,
			new: true,
			setDefaultsOnInsert: true,
		});
	}
})();

export const handleUser = ctx => {
	const ctxUser = ctx.update?.message?.from;
	const user: User = {
		fullName: `${ctxUser.first_name} ${ctxUser.last_name}`,
		nickName: ctxUser.username || 'username not set',
		userId: ctxUser.id,
	};
	Users.addUser(user);
};
