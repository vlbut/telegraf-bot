import { Composer, Markup } from 'telegraf';
import { getKeyboard } from '../../utils';
import { Posts } from '../../../../db/Posts';

export async function generateWhereToGetNewsComposer(mainAction: string, data) {
	const handlerComposer = new Composer();

	const defaultKeyboard = getKeyboard(mainAction, data.buttons);
	const mainInnerText = data.innerText;
	handlerComposer.action('whereToGetNews', ctx => {
		ctx.reply(mainInnerText, defaultKeyboard);
	});

	const whereToGetNewsChildKeyboard = getKeyboard('whereToGetNews');
	const notTrustPost = await Posts.getPostByActionName('notTrust');
	const notTrustInnerText = notTrustPost!.innerText || '';
	handlerComposer.action('notTrust', ctx => {
		ctx.reply(notTrustInnerText, whereToGetNewsChildKeyboard);
	});

	const trustedSourcesPost = await Posts.getPostByActionName('trustedSources');
	const trustedSourcesInnerText = trustedSourcesPost!.innerText || '';
	handlerComposer.action('trustedSources', ctx => {
		ctx.reply(trustedSourcesInnerText, whereToGetNewsChildKeyboard);
	});

	return handlerComposer;
}
