import { Markup } from 'telegraf';

interface MappedKeyboardObject {
	label: string;
	name: string;
}
export const getKeyboard = (backAction: string, keyboardObjects?: MappedKeyboardObject[]) => {
	const mainButtons =
		keyboardObjects?.map(keyboardObj => [Markup.button.callback(keyboardObj.label, keyboardObj.name)]) ?? [];
	mainButtons.push([Markup.button.callback('Назад', backAction)]);
	mainButtons.push([Markup.button.callback('Вернуться в главное меню', '/start')]);

	return Markup.inlineKeyboard(mainButtons);
};
