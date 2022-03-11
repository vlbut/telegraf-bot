import { Composer, Markup } from 'telegraf';
import { getKeyboard } from './utils/getKeyboard';

export function generateWhereToGetNewsComposer(mainAction: string, data) {
	const handlerComposer = new Composer();

	const defaultKeyboard = getKeyboard(mainAction, data.innerObjects);
	handlerComposer.action('whereToGetNews', ctx => {
		ctx.reply(data.label, defaultKeyboard);
	});

	const whereToGetNewsChildKeyboard = getKeyboard('whereToGetNews');
	const notTrustInnerText = data.innerObjects[0].innerText;
	handlerComposer.action('notTrust', ctx => {
		ctx.reply(notTrustInnerText, whereToGetNewsChildKeyboard);
	});

	const trustedSourcesInnerText = data.innerObjects[1].innerText;
	handlerComposer.action('trustedSources', ctx => {
		ctx.reply(trustedSourcesInnerText, whereToGetNewsChildKeyboard);
	});

	return handlerComposer;
}
