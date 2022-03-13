import { Composer, Markup } from 'telegraf';
import { MAIN_MENU_BUTTON_LABEL } from '../utils';
import { Posts } from '../../../db/Posts';
import { generatePhysicalProtestComposer } from './generators/generatePhysicalProtestComposer';
import { generateLawProtestComposer } from './generators/generateLawProtestComposer';
import { generateInternetProtestComposer } from './generators/generateInternetProtestComposer';
import { generateInformingClosePeopleComposer } from './generators/generateInformingClosePeopleComposer';
import { generateMaterialAidComposer } from './generators/generateMaterialAidComposer';

export const wantToHelpComposer = new Composer();
const mainAction = 'wantToHelp';
Posts.getPostByActionName(mainAction).then(async post => {
	if (!(post && post.buttons)) throw new Error(`${mainAction} importing failed`);
	//generate keyboard
	const inlineKeyboardButtons = post.buttons.map(button => [
		Markup.button.callback(button.buttonLabel, button.actionName),
	]);
	inlineKeyboardButtons.push([Markup.button.callback(MAIN_MENU_BUTTON_LABEL, '/mainPage')]);
	//add action handler
	const mainInnerText = post.innerText;
	wantToHelpComposer.action(mainAction, async ctx => {
		ctx.reply(mainInnerText, Markup.inlineKeyboard(inlineKeyboardButtons));
	});

	//import child handlers
	wantToHelpComposer.use(
		await generatePhysicalProtestComposer(mainAction),
		await generateLawProtestComposer(mainAction),
		await generateInternetProtestComposer(mainAction),
		await generateInformingClosePeopleComposer(mainAction),
		await generateMaterialAidComposer(mainAction),
	);
});
