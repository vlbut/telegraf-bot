import { Composer, Markup } from 'telegraf';
import { buttons as welcomeButtons } from '../../../db/welcome.json';
import infoData from '../../../db/info.json';
import {
	generateHowToFindSoldiersComposer,
	generateSanctionsComposer,
	generateUkraineHasWarComposer,
	generateWhereToGetNewsComposer,
} from './generateComposers';
import { MAIN_MENU_BUTTON_LABEL } from '../utils';

export const infoComposer = new Composer();

const { methodName: mainAction } = welcomeButtons['info'];
//generate keyboard
const inlineKeyboardButtons = Object.entries(infoData.info).map(([key, value]) => [
	Markup.button.callback(value.label, key),
]);
inlineKeyboardButtons.push([Markup.button.callback(MAIN_MENU_BUTTON_LABEL, '/start')]);
//add action handler
infoComposer.action(mainAction, ctx => {
	ctx.reply('Выберите информацию какую хотите узнать', Markup.inlineKeyboard(inlineKeyboardButtons));
});

const { howToFindSolders, sanctions, ukraineHasWarProof, whereToGetNews } = infoData.info;
//import child handlers
infoComposer.use(
	generateHowToFindSoldiersComposer(mainAction, howToFindSolders),
	generateSanctionsComposer(mainAction, sanctions),
	generateUkraineHasWarComposer(mainAction, ukraineHasWarProof),
	generateWhereToGetNewsComposer(mainAction, whereToGetNews),
);
