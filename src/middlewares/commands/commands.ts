import { Composer, Context, Markup } from 'telegraf';
import { startPage } from '../utils';

export const commandComposer = new Composer();

commandComposer.start(ctx => {
	startPage(ctx);
});

commandComposer.action('/start', ctx => {
	startPage(ctx);
});

commandComposer.help((ctx: Context) => {
	ctx.reply('This is help section');
});
