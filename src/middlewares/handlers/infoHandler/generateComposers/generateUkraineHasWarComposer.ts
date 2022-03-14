import { Composer, Markup } from 'telegraf';
import { getKeyboard } from '../../utils';
import { Post, Posts } from '../../../../db/Posts';
import { REDIS_PREFIX, wrappedHandle } from '../../../../db';

export async function generateUkraineHasWarComposer(mainAction: string, post: Post | null) {
	if (!(post && post.buttons)) throw new Error(`ukraineHasWarProof importing failed`);

	const handleComposer = new Composer();

	const defaultKeyboard = getKeyboard(mainAction, post?.buttons);
	const mainInnerText = post.innerText;
	handleComposer.action(
		'ukraineHasWarProof',
		wrappedHandle(ctx => {
			ctx.reply(mainInnerText, defaultKeyboard);
		}),
	);

	const warCrimesPost = await Posts.getPostByActionName('warCrimes');
	const warCrimesKeyboard = getKeyboard('ukraineHasWarProof', warCrimesPost?.buttons);
	const warCrimesLabel = warCrimesPost?.innerText || '';
	handleComposer.action(
		'warCrimes',
		wrappedHandle(ctx => {
			ctx.reply(warCrimesLabel, warCrimesKeyboard);
		}),
	);

	const warCrimesChildKeyboard = getKeyboard(`${REDIS_PREFIX}.warCrimes`);
	const distractionsPost = await Posts.getPostByActionName('distractions');
	const distractionsInnerText = distractionsPost?.innerText || '';
	handleComposer.action(
		'distractions',
		wrappedHandle(ctx => {
			ctx.reply(distractionsInnerText, warCrimesChildKeyboard);
		}),
	);

	const victimsPost = await Posts.getPostByActionName('victims');
	const victimsInnerText = victimsPost?.innerText || '';
	handleComposer.action(
		'victims',
		wrappedHandle(ctx => {
			ctx.reply(victimsInnerText, warCrimesChildKeyboard);
		}),
	);

	const atomicPost = await Posts.getPostByActionName('atomic');
	const atomicInnerText = atomicPost?.innerText || '';
	handleComposer.action(
		'atomic',
		wrappedHandle(ctx => {
			ctx.reply(atomicInnerText, warCrimesChildKeyboard);
		}),
	);

	const attractionRussianMilitaryPost = await Posts.getPostByActionName('attractionRussianMilitary');
	const attractionRussianMilitaryKeyboard = getKeyboard('ukraineHasWarProof', attractionRussianMilitaryPost?.buttons);
	const attractionRussianMilitaryInnerText = attractionRussianMilitaryPost?.innerText || '';
	handleComposer.action(
		'attractionRussianMilitary',
		wrappedHandle(ctx => {
			ctx.reply(attractionRussianMilitaryInnerText, attractionRussianMilitaryKeyboard);
		}),
	);

	const attractionRussianMilitaryChildKeyboard = getKeyboard(`${REDIS_PREFIX}.attractionRussianMilitary`);
	const audioCapturePost = await Posts.getPostByActionName('audioCapture');
	const audioCaptureInnerText = audioCapturePost?.innerText || '';
	handleComposer.action(
		'audioCapture',
		wrappedHandle(ctx => {
			ctx.reply(audioCaptureInnerText, attractionRussianMilitaryChildKeyboard);
		}),
	);

	const prisonersPost = await Posts.getPostByActionName('prisoners');
	const prisonersInnerText = prisonersPost?.innerText || '';
	handleComposer.action(
		'prisoners',
		wrappedHandle(ctx => {
			ctx.reply(prisonersInnerText, attractionRussianMilitaryChildKeyboard);
		}),
	);

	return handleComposer;
}
