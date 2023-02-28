import { Bot } from "grammy"
import env from "./env";
import OpenAi from "./OpenAi";

const bot = new Bot(env.BotToken());

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
bot.on('message:text', async (ctx) => {
    const loadingProcess = await loadingMessage(ctx.chat.id)
    const response = await OpenAi.generate(ctx.message.text)
    const message = loadingProcess.message()
    bot.api.editMessageText(ctx.chat.id, message.message_id, response)
})
bot.start()
bot.catch((e) => {
    console.log(e);
})


async function loadingMessage(chatId: number) {
    let message = await bot.api.sendMessage(chatId, ".")
    let dotCount = 1
    let intervelProcess = setInterval(() => {
        switch (dotCount) {
            case 1:
                bot.api.editMessageText(chatId, message.message_id, "..")
                dotCount++
                break;
            case 2:
                bot.api.editMessageText(chatId, message.message_id, "...")
                dotCount++
                break;
            case 3:
                bot.api.editMessageText(chatId, message.message_id, ".")
                dotCount =1
                break;

            default:
                break;
        }
    }, 1000);

    return {
        message: () => {
            clearInterval(intervelProcess)
            return message
        }
    }
}
