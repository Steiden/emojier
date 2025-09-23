import { bot } from "../src/bot.ts";

const { VERCEL_URL: host, WEBHOOK: webhook = `https://${host}/api/webhook` } = process.env;

void bot.api.setWebhook(webhook);
