import { Composer, Markup } from 'telegraf';
import { BACK_BUTTON_LABEL } from '../../utils';

export function generateHowToFindSoldiersComposer(mainAction: string, data) {
	const handleComposer = new Composer();

	const defaultReplyKeyboard = Markup.inlineKeyboard([Markup.button.callback(BACK_BUTTON_LABEL, mainAction)]);
	handleComposer.action('howToFindSolders', ctx => {
		ctx.reply(data.innerText, defaultReplyKeyboard);
	});

	return handleComposer;
}
