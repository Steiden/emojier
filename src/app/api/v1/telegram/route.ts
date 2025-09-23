import { Bot, webhookCallback } from "grammy";
import { NextRequest, NextResponse } from "next/server";

// Создаём экземпляр бота
const bot = new Bot(process.env.TELEGRAM_TOKEN as string);

// Логика добавления эмодзи
const addEmojis = (text: string): string => {
	const emojis = ["😀", "😂", "🤩", "🚀", "🌟", "🍕", "🎉"];
	return text
		.split(" ")
		.map((word) => {
			const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
			return `${word}${randomEmoji}`;
		})
		.join(" ");
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

// Для локальной разработки (опционально, polling)
if (process.env.NODE_ENV === "development") {
	bot.start();
	console.log("Бот запущен в режиме polling для dev");
}

// Экспорт для webhook
export const POST = await webhookCallback(bot, "next-js");
