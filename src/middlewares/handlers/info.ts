import { Composer, Markup } from 'telegraf';
import { buttons as welcomeButtons } from '../../db/welcome.json';
import infoData from '../../db/info.json';

export const infoComposer = new Composer();

const { methodName: mainAction } = welcomeButtons['info'];
const inlineKeyboardButtons = Object.entries(infoData.info).map(([key, value]) => [
	Markup.button.callback(value.label, key),
]);
inlineKeyboardButtons.push([Markup.button.callback('Вернуться в главное меню', '/start')]);
infoComposer.action(mainAction, ctx => {
	ctx.reply('Выберите информацию какую хотите узнать', Markup.inlineKeyboard(inlineKeyboardButtons));
});

//wheretogetnews
infoComposer.action('whereToGetNews', ctx => {
	const data = infoData.info.whereToGetNews;
	const inlineKeyboardButtons = data.innerObjects.map(obj => [Markup.button.callback(obj.label, obj.name)]);
	inlineKeyboardButtons.push([Markup.button.callback('Назад', mainAction)]);

	ctx.reply(data.label, Markup.inlineKeyboard(inlineKeyboardButtons));
});

infoComposer.action('notTrust', ctx => {
	const data = infoData.info.whereToGetNews.innerObjects[0];
	ctx.reply(
		data.innerText,
		Markup.inlineKeyboard([
			[Markup.button.callback('Назад', 'whereToGetNews')],
			[Markup.button.callback('Вернуться в главное меню', '/start')],
		]),
	);
});
infoComposer.action('trustedSources', ctx => {
	const data = infoData.info.whereToGetNews.innerObjects[1];
	ctx.reply(
		data.innerText,
		Markup.inlineKeyboard([
			[Markup.button.callback('Назад', 'whereToGetNews')],
			[Markup.button.callback('Вернуться в главное меню', '/start')],
		]),
	);
});

//ukraineHasWarProof
infoComposer.action('ukraineHasWarProof', ctx => {
	const data = infoData.info.ukraineHasWarProof;
	const inlineKeyboardButtons = data.innerObjects.map(obj => [Markup.button.callback(obj.label, obj.name)]);
	inlineKeyboardButtons.push([Markup.button.callback('Назад', mainAction)]);
	inlineKeyboardButtons.push([Markup.button.callback('Вернуться в главное меню', '/start')]);

	ctx.reply(data.label, Markup.inlineKeyboard(inlineKeyboardButtons));
});

infoComposer.action('warCrimes', ctx => {
	const data = infoData.info.ukraineHasWarProof.innerObjects[0];
	const inlineKeyboardButtons = data.innerObjects.map(obj => [Markup.button.callback(obj.label, obj.name)]);
	inlineKeyboardButtons.push([Markup.button.callback('Назад', 'ukraineHasWarProof')]);
	inlineKeyboardButtons.push([Markup.button.callback('Вернуться в главное меню', '/start')]);

	ctx.reply(data.label, Markup.inlineKeyboard(inlineKeyboardButtons));
});

infoComposer.action('distractions', ctx => {
	const data = infoData.info.ukraineHasWarProof.innerObjects[0].innerObjects[0];
	ctx.reply(
		data.innerText,
		Markup.inlineKeyboard([
			[Markup.button.callback('Назад', 'warCrimes')],
			[Markup.button.callback('Вернуться в главное меню', '/start')],
		]),
	);
});
infoComposer.action('victims', ctx => {
	const data = infoData.info.ukraineHasWarProof.innerObjects[0].innerObjects[1];
	ctx.reply(
		data.innerText,
		Markup.inlineKeyboard([
			[Markup.button.callback('Назад', 'warCrimes')],
			[Markup.button.callback('Вернуться в главное меню', '/start')],
		]),
	);
});
infoComposer.action('atomic', ctx => {
	const data = infoData.info.ukraineHasWarProof.innerObjects[0].innerObjects[2];
	ctx.reply(
		data.innerText,
		Markup.inlineKeyboard([
			[Markup.button.callback('Назад', 'warCrimes')],
			[Markup.button.callback('Вернуться в главное меню', '/start')],
		]),
	);
});

infoComposer.action('attractionRussianMilitary', ctx => {
	const data = infoData.info.ukraineHasWarProof.innerObjects[1];
	const inlineKeyboardButtons = data.innerObjects.map(obj => [Markup.button.callback(obj.label, obj.name)]);
	inlineKeyboardButtons.push([Markup.button.callback('Назад', 'ukraineHasWarProof')]);
	inlineKeyboardButtons.push([Markup.button.callback('Вернуться в главное меню', '/start')]);

	ctx.reply(data.label, Markup.inlineKeyboard(inlineKeyboardButtons));
});

infoComposer.action('audioCapture', ctx => {
	const data = infoData.info.ukraineHasWarProof.innerObjects[1].innerObjects[0];
	ctx.reply(
		data.innerText,
		Markup.inlineKeyboard([
			[Markup.button.callback('Назад', 'attractionRussianMilitary')],
			[Markup.button.callback('Вернуться в главное меню', '/start')],
		]),
	);
});
infoComposer.action('prisoners', ctx => {
	const data = infoData.info.ukraineHasWarProof.innerObjects[1].innerObjects[1];
	ctx.reply(
		data.innerText,
		Markup.inlineKeyboard([
			[Markup.button.callback('Назад', 'attractionRussianMilitary')],
			[Markup.button.callback('Вернуться в главное меню', '/start')],
		]),
	);
});

//sanctions
infoComposer.action('sanctions', ctx => {
	const data = infoData.info.sanctions;
	const inlineKeyboardButtons = data.innerObjects.map(obj => [Markup.button.callback(obj.label, obj.name)]);
	inlineKeyboardButtons.push([Markup.button.callback('Назад', mainAction)]);

	ctx.reply(data.label, Markup.inlineKeyboard(inlineKeyboardButtons));
});

infoComposer.action('delusionSanctions', ctx => {
	const data = infoData.info.sanctions.innerObjects[0];
	ctx.reply(
		data.innerText,
		Markup.inlineKeyboard([
			[Markup.button.callback('Назад', 'sanctions')],
			[Markup.button.callback('Вернуться в главное меню', '/start')],
		]),
	);
});

infoComposer.action('sanctionsList', ctx => {
	const data = infoData.info.sanctions.innerObjects[1];
	ctx.reply(
		data.innerText,
		Markup.inlineKeyboard([
			[Markup.button.callback('Назад', 'sanctions')],
			[Markup.button.callback('Вернуться в главное меню', '/start')],
		]),
	);
});

//how to find solders
infoComposer.action('howToFindSolders', ctx => {
	const data = infoData.info.howToFindSolders;
	ctx.reply(data.innerText, Markup.inlineKeyboard([Markup.button.callback('Назад', mainAction)]));
});
