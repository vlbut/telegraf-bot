import { Context, Markup } from 'telegraf';
import { Posts } from '../../db/Posts';

export const startPage = async (ctx: Context) => {
	const mainMenuPost = await Posts.getPostByActionName('/mainPage');

	const replyText = mainMenuPost?.innerText || 'Главное меню';
	const markUpButtons = (mainMenuPost?.buttons || []).map(button =>
		Markup.button.callback(button.buttonLabel, button.actionName),
	);
	ctx.reply(replyText, Markup.inlineKeyboard(markUpButtons));
};
