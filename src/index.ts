import { Context, Telegraf } from 'telegraf';
import { mongodbConnect, redisdbConnect } from './db';
import middlewares from './middlewares';

if (String(process.env.NODE_ENV).trim() === 'development') {
	console.log('Running in development mode...');
	require('dotenv').config();
}

const token = process.env.BOT_TOKEN;
if (!token) throw new Error('Token not set');

const bot = new Telegraf<Context>(token);

(async function () {
	await mongodbConnect();
	await redisdbConnect();

	bot.use(middlewares);
	await bot.launch();

	console.log('Bot launched...');
})();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
