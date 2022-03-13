import { Composer, Markup } from 'telegraf';
import { getKeyboard } from '../../utils';
import { Post, Posts } from '../../../../db/Posts';

export async function generateUkraineHasWarComposer(mainAction: string, post: Post | null) {
	if (!(post && post.buttons)) throw new Error(`ukraineHasWarProof importing failed`);

	const handleComposer = new Composer();

	const defaultKeyboard = getKeyboard(mainAction, post?.buttons);
	const mainInnerText = post.innerText;
	handleComposer.action('ukraineHasWarProof', ctx => {
		ctx.reply(mainInnerText, defaultKeyboard);
	});

	const warCrimesPost = await Posts.getPostByActionName('warCrimes');
	const warCrimesKeyboard = getKeyboard('ukraineHasWarProof', warCrimesPost?.buttons);
	const warCrimesLabel = warCrimesPost?.innerText || '';
	handleComposer.action('warCrimes', ctx => {
		ctx.reply(warCrimesLabel, warCrimesKeyboard);
	});

	const warCrimesChildKeyboard = getKeyboard('warCrimes');
	const distractionsPost = await Posts.getPostByActionName('distractions');
	const distractionsInnerText = distractionsPost?.innerText || '';
	handleComposer.action('distractions', ctx => {
		ctx.reply(distractionsInnerText, warCrimesChildKeyboard);
	});

	const victimsPost = await Posts.getPostByActionName('victims');
	const victimsInnerText = victimsPost?.innerText || '';
	handleComposer.action('victims', ctx => {
		ctx.reply(victimsInnerText, warCrimesChildKeyboard);
	});

	const atomicPost = await Posts.getPostByActionName('atomic');
	const atomicInnerText = atomicPost?.innerText || '';
	handleComposer.action('atomic', ctx => {
		ctx.reply(atomicInnerText, warCrimesChildKeyboard);
	});

	const attractionRussianMilitaryPost = await Posts.getPostByActionName('attractionRussianMilitary');
	const attractionRussianMilitaryKeyboard = getKeyboard('ukraineHasWarProof', attractionRussianMilitaryPost?.buttons);
	const attractionRussianMilitaryInnerText = attractionRussianMilitaryPost?.innerText || '';
	handleComposer.action('attractionRussianMilitary', ctx => {
		ctx.reply(attractionRussianMilitaryInnerText, attractionRussianMilitaryKeyboard);
	});

	const attractionRussianMilitaryChildKeyboard = getKeyboard('attractionRussianMilitary');
	const audioCapturePost = await Posts.getPostByActionName('audioCapture');
	const audioCaptureInnerText = audioCapturePost?.innerText || '';
	handleComposer.action('audioCapture', ctx => {
		ctx.reply(audioCaptureInnerText, attractionRussianMilitaryChildKeyboard);
	});

	const prisonersPost = await Posts.getPostByActionName('prisoners');
	const prisonersInnerText = prisonersPost?.innerText || '';
	handleComposer.action('prisoners', ctx => {
		ctx.reply(prisonersInnerText, attractionRussianMilitaryChildKeyboard);
	});

	return handleComposer;
}
