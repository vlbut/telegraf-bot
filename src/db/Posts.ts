import mongoose from 'mongoose';

export interface Post {
	actionName: string;
	innerText: string;
	buttons?: {
		actionName: string;
		buttonLabel: string;
	}[];
	images: string[];
	videos: string[];
}

const postScheme = new mongoose.Schema<Post>({
	actionName: {
		type: String,
		required: true,
	},
	innerText: {
		type: String,
		required: true,
	},
	buttons: {
		type: [
			{
				actionName: String,
				buttonLabel: String,
			},
		],
		required: false,
	},
	images: {
		type: [String],
		required: false,
	},
	videos: {
		type: [String],
		required: false,
	},
});

const posts = mongoose.model('post', postScheme);

export const Posts = new (class Post {
	getPostByActionName(actionName: string) {
		return posts.findOne({ actionName });
	}
})();
