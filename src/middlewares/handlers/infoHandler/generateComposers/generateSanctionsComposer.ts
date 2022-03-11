import { Composer, Markup } from 'telegraf';
import { getKeyboard } from '../../utils/getKeyboard';

export function generateSanctionsComposer(mainAction: string, data) {
	const handlerComposer = new Composer();

	const inlineKeyboardButtons = data.innerObjects.map(obj => [Markup.button.callback(obj.label, obj.name)]);
	inlineKeyboardButtons.push([Markup.button.callback('Назад', mainAction)]);
	const defaultKeyboard = getKeyboard(mainAction, data.innerObjects);

	handlerComposer.action('sanctions', ctx => {
		ctx.reply(data.label, defaultKeyboard);
	});

	const delusionSanctionsLabel = data.innerObjects[0].innerText;
	const sanctionsChildKeyboard = getKeyboard('sanctions');
	handlerComposer.action('delusionSanctions', ctx => {
		ctx.reply(delusionSanctionsLabel, sanctionsChildKeyboard);
	});

	const sanctionsListInnerText = data.innerObjects[1].innerText;
	handlerComposer.action('sanctionsList', ctx => {
		ctx.reply(sanctionsListInnerText, sanctionsChildKeyboard);
	});

	return handlerComposer;
}
