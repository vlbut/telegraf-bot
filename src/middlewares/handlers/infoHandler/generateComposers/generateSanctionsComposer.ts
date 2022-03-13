import { Composer, Markup } from 'telegraf';
import { getKeyboard } from '../../utils';
import { Post, Posts } from '../../../../db/Posts';
import { createImageFromBase64 } from '../../utils/imageHandler';
import fs from 'fs';

export async function generateSanctionsComposer(mainAction: string, post: Post | null) {
	if (!(post && post.buttons)) throw new Error(`sanctions importing failed`);

	const handlerComposer = new Composer();

	const defaultKeyboard = getKeyboard(mainAction, post.buttons);
	handlerComposer.action('sanctions', ctx => {
		ctx.reply(post.innerText, defaultKeyboard);
	});

	const sanctionsChildKeyboard = getKeyboard('sanctions');
	const delusionSanctionsPost = await Posts.getPostByActionName('delusionSanctions');
	if (!(delusionSanctionsPost && delusionSanctionsPost.images)) throw new Error(`delusionSanctions importing failed`);

	const delusionSanctionsInnerText = delusionSanctionsPost?.innerText || '';
	handlerComposer.action('delusionSanctions', async ctx => {
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
	});

	const sanctionsListPost = await Posts.getPostByActionName('sanctionsList');
	const sanctionsListKeyboard = getKeyboard('sanctions', sanctionsListPost?.buttons);
	const sanctionsListInnerText = sanctionsListPost?.innerText || '';
	handlerComposer.action('sanctionsList', ctx => {
		ctx.reply(sanctionsListInnerText, sanctionsListKeyboard);
	});

	const firstSanctionPost = await Posts.getPostByActionName('firstSanctionList');
	const firstSanctionKeyboard = getKeyboard('sanctionsList');
	const firstSanctionInnerText = firstSanctionPost?.innerText || '';
	handlerComposer.action('firstSanctionList', ctx => {
		ctx.reply(firstSanctionInnerText, firstSanctionKeyboard);
	});

	const secondSanctionPost = await Posts.getPostByActionName('secondSanctionList');
	const secondSanctionKeyboard = getKeyboard('sanctionsList');
	const secondSanctionInnerText = secondSanctionPost?.innerText || '';
	handlerComposer.action('secondSanctionList', ctx => {
		ctx.reply(secondSanctionInnerText, secondSanctionKeyboard);
	});

	const thirdSanctionPost = await Posts.getPostByActionName('thirdSanctionList');
	const thirdSanctionKeyboard = getKeyboard('sanctionsList');
	const thirdSanctionInnerText = thirdSanctionPost?.innerText || '';
	handlerComposer.action('thirdSanctionList', ctx => {
		ctx.reply(thirdSanctionInnerText, thirdSanctionKeyboard);
	});

	return handlerComposer;
}
