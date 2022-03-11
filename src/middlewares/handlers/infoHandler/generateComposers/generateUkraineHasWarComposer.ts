import { Composer, Markup } from 'telegraf';
import { getKeyboard } from '../../utils/getKeyboard';

export function generateUkraineHasWarComposer(mainAction: string, data) {
	const handleComposer = new Composer();

	const defaultKeyboard = getKeyboard(mainAction, data.innerObjects);
	handleComposer.action('ukraineHasWarProof', ctx => {
		ctx.reply(data.label, defaultKeyboard);
	});

	const warCrimesKeyboard = getKeyboard('ukraineHasWarProof', data.innerObjects[0].innerObjects);
	const warCrimesLabel = data.innerObjects[0].label;
	handleComposer.action('warCrimes', ctx => {
		ctx.reply(warCrimesLabel, warCrimesKeyboard);
	});

	const warCrimesChildKeyboard = getKeyboard('warCrimes');
	const distractionsInnerText = data.innerObjects[0].innerObjects[0].innerText;
	handleComposer.action('distractions', ctx => {
		ctx.reply(distractionsInnerText, warCrimesChildKeyboard);
	});

	const victimsInnerText = data.innerObjects[0].innerObjects[1].innerText;
	handleComposer.action('victims', ctx => {
		ctx.reply(victimsInnerText, warCrimesChildKeyboard);
	});

	const atomicInnerText = data.innerObjects[0].innerObjects[2].innerText;
	handleComposer.action('atomic', ctx => {
		ctx.reply(atomicInnerText, warCrimesChildKeyboard);
	});

	const attractionRussianMilitaryKeyboard = getKeyboard('ukraineHasWarProof', data.innerObjects[1].innerObjects);
	const attractionRussianMilitaryLabel = data.innerObjects[1].label;
	handleComposer.action('attractionRussianMilitary', ctx => {
		ctx.reply(attractionRussianMilitaryLabel, attractionRussianMilitaryKeyboard);
	});

	const attractionRussianMilitaryChildKeyboard = getKeyboard('attractionRussianMilitary');
	const audioCaptureInnerText = data.innerObjects[1].innerObjects[0].innerText;
	handleComposer.action('audioCapture', ctx => {
		ctx.reply(audioCaptureInnerText, attractionRussianMilitaryChildKeyboard);
	});

	const prisonersInnerText = data.innerObjects[1].innerObjects[1].innerText;
	handleComposer.action('prisoners', ctx => {
		ctx.reply(prisonersInnerText, attractionRussianMilitaryChildKeyboard);
	});

	return handleComposer;
}
