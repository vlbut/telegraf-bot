import { Markup } from 'telegraf';
import { BACK_BUTTON_LABEL, MAIN_MENU_BUTTON_LABEL } from './buttonLabels';

interface MappedKeyboardObject {
	label: string;
	name: string;
}
export const getKeyboard = (backAction: string, keyboardObjects?: MappedKeyboardObject[]) => {
	const mainButtons = getMappedKeyboard(keyboardObjects);
	mainButtons.push([Markup.button.callback(BACK_BUTTON_LABEL, backAction)]);
	mainButtons.push([Markup.button.callback(MAIN_MENU_BUTTON_LABEL, '/start')]);
	return Markup.inlineKeyboard(mainButtons);
};

function getMappedKeyboard(keyboardObjects) {
	return keyboardObjects?.map(keyboardObj => [Markup.button.callback(keyboardObj.label, keyboardObj.name)]) ?? [];
}
