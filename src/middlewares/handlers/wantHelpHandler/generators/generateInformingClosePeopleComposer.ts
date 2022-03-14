import { Composer } from 'telegraf';
import { getKeyboard } from '../../utils';
import { Posts } from '../../../../db/Posts';
import { REDIS_PREFIX, wrappedHandle } from '../../../../db';

export async function generateInformingClosePeopleComposer(mainAction: string) {
	const handleComposer = new Composer();

	const replyKeyboard = getKeyboard(`${REDIS_PREFIX}.${mainAction}`);
	const post = await Posts.getPostByActionName('informingClosePeople');
	const innerText = post!.innerText || '';
	handleComposer.action(
		'informingClosePeople',
		wrappedHandle(ctx => {
			ctx.reply(innerText, replyKeyboard);
		}),
	);

	return handleComposer;
}
