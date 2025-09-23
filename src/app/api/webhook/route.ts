import { bot } from "../../../bot";
import { webhookCallback } from "grammy";

export const POST = webhookCallback(bot, "std/http");
