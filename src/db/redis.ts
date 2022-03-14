import { createClient } from 'redis';
import { getUserId } from '../middlewares/utils';

export const redisClient = createClient({ socket: { host: 'redis-server', port: 6379 } });
export async function redisdbConnect() {
	redisClient.on('error', err => console.log('Redis Client Error', err));
	redisClient.on('connect', () => {
		console.log('Redis connected successfully...');
	});
	await redisClient.connect();
}

export const wrappedHandle = callback => {
	return async (ctx, next) => {
		const { id: userId } = ctx.update?.message?.from || ctx.update?.callback_query?.from || {};
		if (userId) {
			await removeLastMessage(ctx, false);
			//insert message id
			const { message_id } = ctx.update?.message || ctx.update?.callback_query?.message || {};
			await redisClient.set(userId, message_id);
		}
		callback(ctx, next);
	};
};

export const removeLastMessage = async (ctx, shouldRemove?: boolean) => {
	const userId = getUserId(ctx);
	const lastMessageId = await redisClient.get(userId);
	// //remove message id
	if (Number(lastMessageId)) {
		await ctx.deleteMessage(lastMessageId);
		if (shouldRemove) {
			await redisClient.del(userId);
		}
	}
};

export const REDIS_PREFIX = 'redis';
