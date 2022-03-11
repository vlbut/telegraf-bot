import { Context, Telegraf } from 'telegraf';
import middlewares from './middlewares';

const token = '5071193841:AAGddeZ2gDHRvqrL-u_vRvCPnztJ_IUknE8';
if (!token) throw new Error('Token not set');

const bot = new Telegraf<Context>(token);
bot.use(middlewares);

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
