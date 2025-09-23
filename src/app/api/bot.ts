import { Bot } from "grammy";

// Создаём экземпляр бота
const bot = new Bot(process.env.TELEGRAM_TOKEN as string);

// Логика добавления эмодзи
const addEmojis = (text: string): string => {
	return text + "😀";
};

// Обработчик текстовых сообщений
bot.on("message:text", async (ctx) => {
	const originalText = ctx.message.text;
	const emojiText = addEmojis(originalText);
	await ctx.reply(emojiText);
});

// Обработчик ошибок
bot.catch((err) => {
	console.error("Ошибка в боте:", err);
});

bot.start();
