import { Composer, Markup } from 'telegraf';
import { BACK_BUTTON_LABEL, MAIN_MENU_BUTTON_LABEL } from '../../utils';

export function generateHowToFindSoldiersComposer(mainAction: string, data) {
	const handleComposer = new Composer();

	const defaultReplyKeyboard = Markup.inlineKeyboard([
		[Markup.button.callback(BACK_BUTTON_LABEL, mainAction)],
		[Markup.button.callback(MAIN_MENU_BUTTON_LABEL, '/start')],
	]);
	const mainInnerText = data.innerText;
	handleComposer.action('howToFindSolders', ctx => {
		ctx.reply(mainInnerText, defaultReplyKeyboard);
	});

	return handleComposer;
}
