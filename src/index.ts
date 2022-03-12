import { Context, Telegraf } from 'telegraf';
import middlewares from './middlewares';

if (String(process.env.NODE_ENV).trim() === 'development') {
	console.log('Running in development mode...');
	require('dotenv').config();
}

const token = process.env.BOT_TOKEN;
if (!token) throw new Error('Token not set');

const bot = new Telegraf<Context>(token);
bot.use(middlewares);

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
