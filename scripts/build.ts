import { bot } from "../src/bot";

const { VERCEL_URL: host, WEBHOOK: webhook = `https://${host}/api/webhook` } = process.env;

void bot.api.setWebhook(webhook);
