import { Composer, Context } from 'telegraf';
import { startPage } from '../utils';
import { handleUser } from '../../db/User';

export const commandComposer = new Composer();

commandComposer.start(ctx => {
	handleUser(ctx);
	startPage(ctx);
});

commandComposer.action('/mainPage', ctx => {
	startPage(ctx);
});

commandComposer.help((ctx: Context) => {
	ctx.reply('This is help section');
});
