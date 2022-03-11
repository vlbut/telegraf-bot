import { Composer } from 'telegraf';
import { buttons as welcomeButtons } from '../../db/welcome.json';

const { methodName: mainAction } = welcomeButtons['info'];

export const infoComposer = new Composer();

infoComposer.action(mainAction, ctx => {
	ctx.reply('How can i help?');
});
