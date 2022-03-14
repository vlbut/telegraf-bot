import { Markup } from 'telegraf';
import { BACK_BUTTON_LABEL, MAIN_MENU_BUTTON_LABEL } from './buttonLabels';

interface MappedKeyboardObject {
	buttonLabel: string;
	actionName: string;
}
export const getKeyboard = ({
	prefix = '',
	backAction,
	keyboardObjects,
}: {
	prefix?: string;
	backAction: string;
	keyboardObjects?: MappedKeyboardObject[];
}) => {
	const mainButtons = getMappedKeyboard(keyboardObjects);
	mainButtons.push([Markup.button.callback(BACK_BUTTON_LABEL, `${prefix}${backAction}`)]);
	mainButtons.push([Markup.button.callback(MAIN_MENU_BUTTON_LABEL, `${prefix}/mainPage`)]);
	return Markup.inlineKeyboard(mainButtons);
};

function getMappedKeyboard(buttons) {
	return buttons?.map(b => [Markup.button.callback(b.buttonLabel, b.actionName)]) ?? [];
}
