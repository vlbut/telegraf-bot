import fs from 'fs';
import { Composer } from 'telegraf';
import { getKeyboard } from '../../utils';
import { Posts } from '../../../../db/Posts';
import { createImageFromBase64, createVideoFromBase64 } from '../../utils/imageHandler';

export async function generatePhysicalProtestComposer(mainAction: string) {
	const handleComposer = new Composer();

	const post = await Posts.getPostByActionName('physicalProtest');
	if (!(post && post.buttons)) throw new Error(`physicalProtest importing failed`);

	const replyKeyboard = getKeyboard(mainAction, post.buttons);
	const innerText = post!.innerText || '';
	handleComposer.action('physicalProtest', ctx => {
		ctx.reply(innerText, replyKeyboard);
	});

	const physicalProtestChildKeyboard = getKeyboard('physicalProtest');
	const firedPost = await Posts.getPostByActionName('physicalProtest.fired');
	if (!(firedPost && firedPost.images)) throw new Error(`physicalProtest.fired importing failed`);
	const whereToWriteInnerText = firedPost?.innerText || '';
	handleComposer.action('physicalProtest.fired', async ctx => {
		await ctx.reply('Загружаю ответ...');
		//parse array of images
		const imagePaths = firedPost.images.map(imageBase64 => createImageFromBase64(imageBase64));
		const mediaGroup = imagePaths.map(imgPath => {
			const image = fs.readFileSync(imgPath);
			return { media: { source: image }, type: 'photo' };
		});

		// @ts-ignore
		await ctx.replyWithMediaGroup(mediaGroup);
		ctx.reply(whereToWriteInnerText, physicalProtestChildKeyboard);
		//remove images
		imagePaths.map(imgPath => fs.unlink(imgPath, _ => {}));
	});

	const prisonPost = await Posts.getPostByActionName('physicalProtest.whyNotPrison');
	if (!(prisonPost && prisonPost.videos)) throw new Error(`physicalProtest.whyNotPrison importing failed`);
	const prisonPostInnerText = prisonPost?.innerText || '';
	handleComposer.action('physicalProtest.whyNotPrison', async ctx => {
		await ctx.reply('Загружаю видео, нужно время...');
		await ctx.replyWithVideo({ source: fs.createReadStream(`${__dirname}/../files/whyNotPrison.mp4`) });
		ctx.reply(prisonPostInnerText, physicalProtestChildKeyboard);
	});

	return handleComposer;
}
