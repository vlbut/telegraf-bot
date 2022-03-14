import { Composer } from 'telegraf';
import { getKeyboard } from '../../utils';
import { Posts } from '../../../../db/Posts';
import { createImageFromBase64 } from '../../utils/imageHandler';
import fs from 'fs';
import { REDIS_PREFIX, wrappedHandle } from '../../../../db';

export async function generateLawProtestComposer(mainAction: string) {
	const handleComposer = new Composer();

	const post = await Posts.getPostByActionName('lawProtest');
	if (!(post && post.buttons)) throw new Error(`lawProtest importing failed`);

	const replyKeyboard = getKeyboard(mainAction, post.buttons);
	const innerText = post!.innerText || '';
	handleComposer.action(
		'lawProtest',
		wrappedHandle(ctx => {
			ctx.reply(innerText, replyKeyboard);
		}),
	);

	const lawChildKeyboard = getKeyboard(`${REDIS_PREFIX}.lawProtest`);
	const whereToWritePost = await Posts.getPostByActionName('law.whereToWrite');
	if (!(whereToWritePost && whereToWritePost.images)) throw new Error(`law.whereToWrite importing failed`);

	const whereToWriteInnerText = whereToWritePost?.innerText || '';
	handleComposer.action(
		'law.whereToWrite',
		wrappedHandle(async ctx => {
			await ctx.reply('Загружаю ответ...');
			//parse array of images
			const imagePaths = whereToWritePost.images.map(imageBase64 => createImageFromBase64(imageBase64));
			const mediaGroup = imagePaths.map(imgPath => {
				const image = fs.readFileSync(imgPath);
				return { media: { source: image }, type: 'photo' };
			});

			// @ts-ignore
			await ctx.replyWithMediaGroup(mediaGroup);
			ctx.reply(whereToWriteInnerText, lawChildKeyboard);
			//remove images
			imagePaths.map(imgPath => fs.unlink(imgPath, _ => {}));
		}),
	);

	return handleComposer;
}
