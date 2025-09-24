export const dynamic = "force-dynamic"; // Обеспечивает динамическую обработку (важно для serverless)
export const fetchCache = "force-no-store"; // Отключает кэширование

import { addEmojis } from "@/shared/lib";
import { Bot, webhookCallback } from "grammy";
import { InlineQueryResult } from "grammy/types";

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
	throw new Error("TELEGRAM_BOT_TOKEN environment variable not found.");
}

const bot = new Bot(token);

// Обработчик inline-запросов
bot.on("inline_query", async (ctx) => {
	const query = ctx.inlineQuery.query.trim(); // Получаем текст запроса

	if (!query) {
		return await ctx.answerInlineQuery([]); // Если запрос пустой, возвращаем пустой результат
	}

	// Здесь ваша логика добавления эмодзи к тексту (замените на свою функцию)
	const messageWithEmojis = await addEmojis(query); // Пример: функция, которую вы напишете

	// Формируем результат: статья с модифицированным текстом
	const results: InlineQueryResult[] = [
		{
			type: "article",
			id: "1", // Уникальный ID (можно генерировать динамически)
			title: messageWithEmojis,
			input_message_content: {
				message_text: messageWithEmojis,
				parse_mode: "Markdown", // Или 'HTML', если нужно
			},
		},
	];

	await ctx.answerInlineQuery(results);
});

// Экспортируем webhook-handler для POST-запросов от Telegram
export const POST = webhookCallback(bot, "std/http");
