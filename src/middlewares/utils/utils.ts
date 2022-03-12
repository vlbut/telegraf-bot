import welcomeData from '../../db/welcome.json';
import { Context, Markup } from 'telegraf';

export const startPage = (ctx: Context) => {
	const { label: welcomeLabel, buttons } = welcomeData;
	const markUpButtons = Object.values(buttons).map(button => Markup.button.callback(button.label, button.methodName));
	ctx.reply(welcomeLabel, Markup.inlineKeyboard(markUpButtons));
};
