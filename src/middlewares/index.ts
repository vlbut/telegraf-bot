import { Composer } from 'telegraf';
import { commandComposer } from './commands';
import { infoComposer, wantHelpComposer } from './handlers';

const middlewareComposer = new Composer();

middlewareComposer.use(commandComposer, infoComposer, wantHelpComposer);

export default middlewareComposer;
