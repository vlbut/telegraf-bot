import { Composer } from 'telegraf';
import { getKeyboard } from '../../utils';
import { Posts } from '../../../../db/Posts';
import { REDIS_PREFIX, wrappedHandle } from '../../../../db';

export async function generateInternetProtestComposer(mainAction: string) {
	const handleComposer = new Composer();

	const replyKeyboard = getKeyboard({ prefix: REDIS_PREFIX, backAction: mainAction });
	const post = await Posts.getPostByActionName('internetProtest');
	const innerText = post!.innerText || '';
	handleComposer.action(
		'internetProtest',
		wrappedHandle(ctx => {
			ctx.reply(innerText, replyKeyboard);
		}),
	);

	return handleComposer;
}
