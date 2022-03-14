import { getUserId } from '../middlewares/utils';

export const wrappedHandle = callback => {
	return async (ctx, next) => {
		const userId = getUserId(ctx);
		if (userId) {
			const { message_id: lastMessageId } = ctx.update?.message || ctx.update?.callback_query?.message || {};
			if (Number(lastMessageId)) {
				await ctx.deleteMessage(lastMessageId);
			}
		}
		callback(ctx, next);
	};
};

export const REDIS_PREFIX = 'payload.';
