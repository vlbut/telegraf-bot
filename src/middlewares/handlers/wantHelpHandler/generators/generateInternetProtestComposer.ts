import { Composer } from 'telegraf';
import { getKeyboard } from '../../utils';
import { Posts } from '../../../../db/Posts';

export async function generateInternetProtestComposer(mainAction: string) {
	const handleComposer = new Composer();

	const replyKeyboard = getKeyboard(mainAction);
	const post = await Posts.getPostByActionName('internetProtest');
	const innerText = post!.innerText || '';
	handleComposer.action('internetProtest', ctx => {
		ctx.reply(innerText, replyKeyboard);
	});

	return handleComposer;
}
