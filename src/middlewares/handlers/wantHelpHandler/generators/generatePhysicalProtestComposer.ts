import { Composer } from 'telegraf';
import { getKeyboard } from '../../utils';
import { Posts } from '../../../../db/Posts';

export async function generatePhysicalProtestComposer(mainAction: string) {
	const handleComposer = new Composer();

	const replyKeyboard = getKeyboard(mainAction);
	const post = await Posts.getPostByActionName('physicalProtest');
	const innerText = post!.innerText || '';
	handleComposer.action('physicalProtest', ctx => {
		ctx.reply(innerText, replyKeyboard);
	});

	return handleComposer;
}
