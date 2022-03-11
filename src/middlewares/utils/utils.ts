import welcomeData from '../../db/welcome.json';
import { Markup } from 'telegraf';

export const startPage = ctx => {
	//get welcome text
	const { label: welcomeLabel, buttons } = welcomeData;
	const markUpButtons = Object.values(buttons).map(button => Markup.button.callback(button.label, button.methodName));
	// reply welcome text with user name
	ctx.reply(welcomeLabel, Markup.inlineKeyboard(markUpButtons));
};
