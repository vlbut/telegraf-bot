import { Composer, Markup } from 'telegraf';
import {
	generateHowToFindSoldiersComposer,
	generateSanctionsComposer,
	generateUkraineHasWarComposer,
	generateWhereToGetNewsComposer,
} from './generateComposers';
import { MAIN_MENU_BUTTON_LABEL } from '../utils';
import { Posts } from '../../../db/Posts';

export const infoComposer = new Composer();
const mainAction = 'info';
Posts.getPostByActionName(mainAction).then(async post => {
	if (!(post && post.buttons)) throw new Error(`${mainAction} importing failed`);
	//generate keyboard
	const inlineKeyboardButtons = post.buttons.map(button => [
		Markup.button.callback(button.buttonLabel, button.actionName),
	]);
	inlineKeyboardButtons.push([Markup.button.callback(MAIN_MENU_BUTTON_LABEL, '/mainPage')]);
	//add action handler
	const mainInnerText = post.innerText;
	infoComposer.action(mainAction, async ctx => {
		ctx.reply(mainInnerText, Markup.inlineKeyboard(inlineKeyboardButtons));
	});

	//get data from db
	const children = await Promise.all([
		Posts.getPostByActionName('howToFindSolders'),
		Posts.getPostByActionName('sanctions'),
		Posts.getPostByActionName('ukraineHasWarProof'),
		Posts.getPostByActionName('whereToGetNews'),
	]);
	const [howToFindSolders, sanctions, ukraineHasWarProof, whereToGetNews] = children;
	//import child handlers
	infoComposer.use(
		generateHowToFindSoldiersComposer(mainAction, howToFindSolders),
		await generateSanctionsComposer(mainAction, sanctions),
		await generateUkraineHasWarComposer(mainAction, ukraineHasWarProof),
		await generateWhereToGetNewsComposer(mainAction, whereToGetNews),
	);
});
