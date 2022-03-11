import welcomeData from '../../db/welcome.json';
import { Markup } from 'telegraf';

export const startPage = ctx => {
	const { label: welcomeLabel, buttons } = welcomeData;
	const markUpButtons = Object.values(buttons).map(button => Markup.button.callback(button.label, button.methodName));
	ctx.reply(welcomeLabel, Markup.inlineKeyboard(markUpButtons));
};
