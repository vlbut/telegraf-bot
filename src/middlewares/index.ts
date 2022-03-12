import { Composer } from 'telegraf';
import { commandComposer } from './commands';
import { infoComposer, wantHelpComposer } from './handlers';
import { startPage } from './utils';

const middlewareComposer = new Composer();

middlewareComposer.use(commandComposer, infoComposer, wantHelpComposer);
middlewareComposer.on('text', ctx => {
	ctx.reply('Извини, я не понимаю тебя 😔\nВоспользуйся кнопками для общения со мной ⤵️️');
	startPage(ctx);
});

export default middlewareComposer;
