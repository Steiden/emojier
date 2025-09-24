import GigaChat from "gigachat";
import { jsonrepair } from "jsonrepair";

const GIGA_BASE_MODEL = "GigaChat-2-Pro";
const gigaToken = process.env.GIGACHAT_API_TOKEN;

if (!gigaToken) {
	throw new Error("GIGACHAT_API_TOKEN environment variable not found.");
}

export async function addEmojis(message: string): Promise<string[]> {
	try {
		const giga = new GigaChat({
			credentials: gigaToken,
		});

		const models = await giga.getModels();
		let baseModel = models.data.find((m) => m.id === GIGA_BASE_MODEL);

		if (!baseModel) baseModel = models.data[0];

		const response = await giga.chat({
			messages: [
				{
					role: "system",
					content: `
						Ты помощник, который добавляет релевантные эмодзи к тексту.
						На каждое третье слово не больше одного эмодзи.
						Напиши 3 варианта.
						Не меняй смысл первого варианта, только добавляй эмодзи в подходящие места.
						Во втором и третьем варианте можешь изменять формулировку сообщения так,
							чтобы суть исходного текста не менялась.
						Ответь только одним валидным JSON объектом, без дополнительных комментариев.
						JSON объект должен быть следующего вида:
							{messages:["вариант_1","вариант_2","вариант_3"]}`,
				},
				{
					role: "user",
					content: message,
				},
			],
		});

		if (response.choices[0].finish_reason !== "stop") {
			console.log("Ошибка при обращении к Gigachat", response);
			return [];
		}

		const responseMessage = response.choices[0].message.content;
		if (!responseMessage) return [];

		try {
			const variants = JSON.parse(jsonrepair(responseMessage));
			console.log("Сообщение в ответе:" + jsonrepair(responseMessage));

			return variants.messages;
		} catch (e) {
			console.log(
				"Ошибка парсинга ответа от Gigachat: ",
				e,
				"Ответ от Gigachat: " + response + "\n\n",
				"Сообщение в ответе: " + responseMessage + "\n\n",
				"Исправленное сообщение в ответе: " + jsonrepair(responseMessage)
			);
			return [];
		}
	} catch (e) {
		console.log("Произошла непредвиденная ошибка", e);
		throw new Error("Произошла непредвиденная ошибка");
	}
}
