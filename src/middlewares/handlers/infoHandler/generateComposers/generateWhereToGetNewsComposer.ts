import { Composer, Markup } from 'telegraf';
import { getKeyboard } from '../../utils';
import { Posts } from '../../../../db/Posts';
import { REDIS_PREFIX, wrappedHandle } from '../../../../db';

export async function generateWhereToGetNewsComposer(mainAction: string, data) {
	const handlerComposer = new Composer();

	const defaultKeyboard = getKeyboard(mainAction, data.buttons);
	const mainInnerText = data.innerText;
	handlerComposer.action(
		'whereToGetNews',
		wrappedHandle(ctx => {
			ctx.reply(mainInnerText, defaultKeyboard);
		}),
	);

	const whereToGetNewsChildKeyboard = getKeyboard(`${REDIS_PREFIX}.whereToGetNews`);
	const notTrustPost = await Posts.getPostByActionName('notTrust');
	const notTrustInnerText = notTrustPost!.innerText || '';
	handlerComposer.action(
		'notTrust',
		wrappedHandle(ctx => {
			ctx.reply(notTrustInnerText, whereToGetNewsChildKeyboard);
		}),
	);

	const trustedSourcesPost = await Posts.getPostByActionName('trustedSources');
	const trustedSourcesInnerText = trustedSourcesPost!.innerText || '';
	handlerComposer.action(
		'trustedSources',
		wrappedHandle(ctx => {
			ctx.reply(trustedSourcesInnerText, whereToGetNewsChildKeyboard);
		}),
	);

	return handlerComposer;
}
