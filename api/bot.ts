import { Bot } from "grammy";

const bot = new Bot(process.env.TELEGRAM_TOKEN!);

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

// // Обработчик inline сообщений
// bot.on("inline_query", async (ctx) => {
// 	const originalText = ctx.inlineQuery.query;
// 	const emojiText = addEmojis(originalText);
	
// 	const result = InlineQueryResultBuilder.article("")
// });

// Обработчик ошибок
bot.catch((err) => {
	console.error("Ошибка в боте:", err);
});

// Для локальной разработки
bot.start();
