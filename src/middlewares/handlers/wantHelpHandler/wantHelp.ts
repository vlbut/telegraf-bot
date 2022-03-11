import { Composer, Markup } from 'telegraf';
import { buttons as welcomeButtons } from '../../../db/welcome.json';
import wantToHelpData from '../../../db/whatToHelp.json';
import { HowToHelpTypes, howToHelpMapper } from '../utils/HowToHelpTypes';

const prefix = 'wantToHelp';
export const wantHelpComposer = new Composer();

const { methodName: mainAction } = welcomeButtons[prefix];
const mainKeyboardButtons = Object.values(wantToHelpData['helpTypes']).map(helpType => {
	const actionName = `${prefix}.${helpType.type}`;
	return [Markup.button.callback(helpType.label, actionName)];
});

wantHelpComposer.action(mainAction, ctx => {
	const mainLabel = wantToHelpData['label'];
	ctx.reply(
		mainLabel,
		Markup.inlineKeyboard([...mainKeyboardButtons, [Markup.button.callback('Вернутся на главное меню', '/start')]]),
	);
});

const howToHelpMatcher = new RegExp(`^${prefix}`);
wantHelpComposer.action(howToHelpMatcher, (ctx, next) => {
	const howToHelpActionName = ctx.match?.input?.split('.')[1] as HowToHelpTypes;
	if (!howToHelpActionName) return next();

	const howToHelpHandler = howToHelpMapper[howToHelpActionName] || howToHelpMapper['default'];
	howToHelpHandler(ctx);
});
