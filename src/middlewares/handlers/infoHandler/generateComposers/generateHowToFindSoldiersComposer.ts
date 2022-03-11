import { Composer, Markup } from 'telegraf';

export function generateHowToFindSoldiersComposer(mainAction: string, data) {
	const handleComposer = new Composer();

	const defaultReplyKeyboard = Markup.inlineKeyboard([Markup.button.callback('Назад', mainAction)]);
	handleComposer.action('howToFindSolders', ctx => {
		ctx.reply(data.innerText, defaultReplyKeyboard);
	});

	return handleComposer;
}
