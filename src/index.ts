import { Context, Telegraf } from 'telegraf';
import middlewares from './middlewares';

const token = String(process.env.BOT_TOKEN).trim();
if (!token) throw new Error('Token not set');

const bot = new Telegraf<Context>(token);
bot.use(middlewares);

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
