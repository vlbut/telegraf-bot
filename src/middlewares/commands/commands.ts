import { Composer, Context, Markup } from 'telegraf';
import welcomeData from '../../db/welcome.json';

export const commandComposer = new Composer();

commandComposer.start(ctx => {
	//get welcome text
	const { label: welcomeLabel, buttons } = welcomeData;
	const markUpButtons = Object.values(buttons).map(button => Markup.button.callback(button.label, button.methodName));
	// reply welcome text with user name
	ctx.reply(welcomeLabel, Markup.inlineKeyboard(markUpButtons));
});

commandComposer.help((ctx: Context) => {
	ctx.reply('This is help section');
});
