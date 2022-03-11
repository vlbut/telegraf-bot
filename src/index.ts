import { Context, Telegraf } from 'telegraf';
import middlewares from './middlewares';

//create telegram bot
// const token = process.env.BOT_TOKEN;
const token = '5071193841:AAGddeZ2gDHRvqrL-u_vRvCPnztJ_IUknE8';
if (!token) throw new Error('Token not set');

const bot = new Telegraf<Context>(token);
//adding all middlewares commands and hears(handlers)
bot.use(middlewares);

//launch
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
