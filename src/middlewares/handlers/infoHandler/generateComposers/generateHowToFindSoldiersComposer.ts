import { Composer, Markup } from 'telegraf';
import { BACK_BUTTON_LABEL, MAIN_MENU_BUTTON_LABEL } from '../../utils';
import { REDIS_PREFIX, wrappedHandle } from '../../../../db';

export function generateHowToFindSoldiersComposer(mainAction: string, data) {
	const handleComposer = new Composer();

	const defaultReplyKeyboard = Markup.inlineKeyboard([
		[Markup.button.callback(BACK_BUTTON_LABEL, `${REDIS_PREFIX}${mainAction}`)],
		[Markup.button.callback(MAIN_MENU_BUTTON_LABEL, `${REDIS_PREFIX}/mainPage`)],
	]);
	const mainInnerText = data.innerText;
	handleComposer.action(
		'howToFindSolders',
		wrappedHandle(ctx => {
			ctx.reply(mainInnerText, defaultReplyKeyboard);
		}),
	);

	return handleComposer;
}
