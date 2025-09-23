import { Bot, InlineQueryResultBuilder } from "grammy";

const { TELEGRAM_TOKEN: token = "" } = process.env;
if (!token) throw new Error("Missing TELEGRAM_TOKEN in environment variables");

export const bot = new Bot(token);

bot.on("inline_query", async (ctx) => {
	const queryText = ctx.inlineQuery.query || "🌟";
	const messageWithEmoji = `🤖 ${queryText} 🚀`;
	const result = InlineQueryResultBuilder.article("emojier", "emojier").text(messageWithEmoji);

	await ctx.answerInlineQuery([result], { cache_time: 30 * 24 * 3600 });
});

bot.on("message", (ctx) => {
	ctx.reply("ХААХАХАХАХАХ");
});
