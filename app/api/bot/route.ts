export const dynamic = "force-dynamic"; // Обеспечивает динамическую обработку (важно для serverless)
export const fetchCache = "force-no-store"; // Отключает кэширование

import { addEmojis } from "@/shared/lib";
import { Bot, webhookCallback } from "grammy";
import { InlineQueryResult } from "grammy/types";
import path from "path";

process.env.NODE_EXTRA_CA_CERTS = path.resolve(__dirname, "dir", "with", "certs");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
	throw new Error("TELEGRAM_BOT_TOKEN environment variable not found.");
}

const bot = new Bot(token);

bot.on("inline_query", async (ctx) => {
	const query = ctx.inlineQuery.query.trim(); // Получаем текст запроса

	if (!query) {
		return await ctx.answerInlineQuery([]);
	}

	const messagesWithEmojis = await addEmojis(query);

	// Формируем результат
	const results: InlineQueryResult[] = messagesWithEmojis?.map((message, i) => ({
		type: "article",
		id: String(Date.now()) + String(i),
		title: message,
		input_message_content: {
			message_text: message,
			parse_mode: "Markdown",
		},
	}));

	await ctx.answerInlineQuery(results, {
		cache_time: 600,
	});
});

bot.on("message", (ctx) => {
	let result = "";

	if (ctx.message.text) result = ctx.message.text + "👍";
	else result = "👍";

	ctx.reply(result);
});

// Экспортируем webhook-handler для POST-запросов от Telegram
export const POST = webhookCallback(bot, "std/http");
