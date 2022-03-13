import { Composer } from 'telegraf';
import { getKeyboard } from '../../utils';
import { Posts } from '../../../../db/Posts';

export async function generateMaterialAidComposer(mainAction: string) {
	const handleComposer = new Composer();

	const replyKeyboard = getKeyboard(mainAction);
	const post = await Posts.getPostByActionName('materialAid');
	const innerText = post!.innerText || '';
	handleComposer.action('materialAid', ctx => {
		ctx.reply(innerText, replyKeyboard);
	});

	return handleComposer;
}
