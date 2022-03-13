import { Composer, Context } from 'telegraf';
import { startPage } from '../utils';
import { User, Users } from '../../db/User';

export const commandComposer = new Composer();

commandComposer.start(ctx => {
	const ctxUser = ctx.update?.message?.from;
	const user: User = {
		fullName: `${ctxUser.first_name} ${ctxUser.last_name}`,
		nickName: ctxUser.username || 'username not set',
		userId: ctxUser.id,
	};
	Users.addUser(user);
	startPage(ctx);
});

commandComposer.action('/mainPage', ctx => {
	startPage(ctx);
});

commandComposer.help((ctx: Context) => {
	ctx.reply('This is help section');
});
