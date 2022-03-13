import { Composer } from 'telegraf';
import { getKeyboard } from '../../utils';
import { Posts } from '../../../../db/Posts';

export async function generateLawProtestComposer(mainAction: string) {
	const handleComposer = new Composer();

	const replyKeyboard = getKeyboard(mainAction);
	const post = await Posts.getPostByActionName('lawProtest');
	const innerText = post!.innerText || '';
	handleComposer.action('lawProtest', ctx => {
		ctx.reply(innerText, replyKeyboard);
	});

	return handleComposer;
}
