//import libraries
import { Context, Telegraf } from 'telegraf';

//create telegram bot
const token = process.env.BOT_TOKEN;
if (!token) throw new Error('Token not set');

const bot = new Telegraf<Context>(token);
//adding all middlewares commands and hears(handlers)
bot.use();

//launch

// Enable graceful stop
