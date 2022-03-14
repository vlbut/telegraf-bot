import { Composer, Markup } from 'telegraf';
import { getKeyboard } from '../../utils';
import { Post, Posts } from '../../../../db/Posts';
import { createImageFromBase64 } from '../../utils/imageHandler';
import fs from 'fs';
import { REDIS_PREFIX, wrappedHandle } from '../../../../db';

export async function generateSanctionsComposer(mainAction: string, post: Post | null) {
	if (!(post && post.buttons)) throw new Error(`sanctions importing failed`);

	const handlerComposer = new Composer();

	const defaultKeyboard = getKeyboard({ backAction: mainAction, keyboardObjects: post.buttons });
	handlerComposer.action(
		'sanctions',
		wrappedHandle(ctx => {
			ctx.reply(post.innerText, defaultKeyboard);
		}),
	);

	const sanctionsChildKeyboard = getKeyboard({ prefix: REDIS_PREFIX, backAction: 'sanctions' });
	const delusionSanctionsPost = await Posts.getPostByActionName('delusionSanctions');
	if (!(delusionSanctionsPost && delusionSanctionsPost.images)) throw new Error(`delusionSanctions importing failed`);

	const delusionSanctionsInnerText = delusionSanctionsPost?.innerText || '';
	handlerComposer.action(
		'delusionSanctions',
		wrappedHandle(async ctx => {
			await ctx.reply('Загружаю ответ...');
			//parse array of images
			const imagePaths = delusionSanctionsPost.images.map(imageBase64 => createImageFromBase64(imageBase64));
			const mediaGroup = imagePaths.map(imgPath => {
				const image = fs.readFileSync(imgPath);
				return { media: { source: image }, type: 'photo' };
			});

			// @ts-ignore
			await ctx.replyWithMediaGroup(mediaGroup);
			ctx.reply(delusionSanctionsInnerText, sanctionsChildKeyboard);
			//remove images
			imagePaths.map(imgPath => fs.unlink(imgPath, _ => {}));
		}),
	);

	const sanctionsListPost = await Posts.getPostByActionName('sanctionsList');
	const sanctionsListKeyboard = getKeyboard({ backAction: 'sanctions', keyboardObjects: sanctionsListPost?.buttons });
	const sanctionsListInnerText = sanctionsListPost?.innerText || '';
	handlerComposer.action(
		'sanctionsList',
		wrappedHandle(ctx => {
			ctx.reply(sanctionsListInnerText, sanctionsListKeyboard);
		}),
	);

	const firstSanctionPost = await Posts.getPostByActionName('firstSanctionList');
	const firstSanctionKeyboard = getKeyboard({ prefix: REDIS_PREFIX, backAction: 'sanctionsList' });
	const firstSanctionInnerText = firstSanctionPost?.innerText || '';
	handlerComposer.action(
		'firstSanctionList',
		wrappedHandle(ctx => {
			ctx.reply(firstSanctionInnerText, firstSanctionKeyboard);
		}),
	);

	const secondSanctionPost = await Posts.getPostByActionName('secondSanctionList');
	const secondSanctionKeyboard = getKeyboard({ prefix: REDIS_PREFIX, backAction: 'sanctionsList' });
	const secondSanctionInnerText = secondSanctionPost?.innerText || '';
	handlerComposer.action(
		'secondSanctionList',
		wrappedHandle(ctx => {
			ctx.reply(secondSanctionInnerText, secondSanctionKeyboard);
		}),
	);

	const thirdSanctionPost = await Posts.getPostByActionName('thirdSanctionList');
	const thirdSanctionKeyboard = getKeyboard({ prefix: REDIS_PREFIX, backAction: 'sanctionsList' });
	const thirdSanctionInnerText = thirdSanctionPost?.innerText || '';
	handlerComposer.action(
		'thirdSanctionList',
		wrappedHandle(ctx => {
			ctx.reply(thirdSanctionInnerText, thirdSanctionKeyboard);
		}),
	);

	return handlerComposer;
}
