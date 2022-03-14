import { Composer, Context } from 'telegraf';
import { startPage } from '../utils';
import { handleUser } from '../../db/User';
import { REDIS_PREFIX, removeLastMessage, wrappedHandle } from '../../db';

export const commandComposer = new Composer();

commandComposer.start(
	wrappedHandle(ctx => {
		handleUser(ctx);
		startPage(ctx);
	}),
);

commandComposer.action(new RegExp(`^${REDIS_PREFIX}`), async (ctx, next) => {
	if (ctx.update?.callback_query?.message?.message_id) ctx.update.callback_query.message.message_id = NaN;
	// @ts-ignore
	ctx.update.callback_query.data = ctx.update.callback_query.data.replace(`${REDIS_PREFIX}.`, '');
	await removeLastMessage(ctx, true);
	next();
});

commandComposer.action(
	'/mainPage',
	wrappedHandle(ctx => {
		startPage(ctx);
	}),
);

commandComposer.help((ctx: Context) => {
	ctx.reply('This is help section');
});
