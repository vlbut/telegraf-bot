import { Composer, Context } from 'telegraf';
import { startPage } from '../utils';
import { handleUser } from '../../db/User';
import { REDIS_PREFIX, wrappedHandle } from '../../db';

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
	ctx.update.callback_query.data = ctx.update.callback_query.data.replace(`${REDIS_PREFIX}`, '');
	next();
});

commandComposer.action(
	'/mainPage',
	wrappedHandle(ctx => {
		startPage(ctx);
	}),
);

commandComposer.help(
	wrappedHandle(async ctx => {
		await ctx.reply(
			'Да поможет нам Бог узнать правду 🙏\n\nПросто выбирай секцию о которой хочешь узнать с помощью кнопок.\nНенужные сообщения будут удаляться.',
		);
		startPage(ctx);
	}),
);
