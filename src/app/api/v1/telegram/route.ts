import { Bot, webhookCallback } from "grammy";

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

// Для локальной разработки
if (process.env.NODE_ENV === "development") {
	bot.start();
	console.log("Бот запущен в режиме polling для dev");
}

export const POST = await webhookCallback(bot, "next-js");
