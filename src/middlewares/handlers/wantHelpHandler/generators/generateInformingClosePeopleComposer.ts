import { Composer } from 'telegraf';
import { getKeyboard } from '../../utils';
import { Posts } from '../../../../db/Posts';

export async function generateInformingClosePeopleComposer(mainAction: string) {
	const handleComposer = new Composer();

	const replyKeyboard = getKeyboard(mainAction);
	const post = await Posts.getPostByActionName('informingClosePeople');
	const innerText = post!.innerText || '';
	handleComposer.action('informingClosePeople', ctx => {
		ctx.reply(innerText, replyKeyboard);
	});

	return handleComposer;
}
