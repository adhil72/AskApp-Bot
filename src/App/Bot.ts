import { Bot } from "grammy"
import env from "./env";
import OpenAi from "./OpenAi";
import database from "./Database"

const bot = new Bot(env.BotToken());

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
bot.command("clear",(ctx)=>{
    database.clear(ctx.chat.id)
    ctx.reply('chat cleared')
})
bot.on('message:text', async (ctx) => {
    const loadingProcess = await loadingMessage(ctx.chat.id)
    const prompt = `${database.read(ctx.chat.id)}\n\nUser:${ctx.message.text}\nBot:`
    console.log(prompt);
    const response = await OpenAi.generate(prompt)
    const message = loadingProcess.message()
    if (response=='') {
        return
    }
    if (pretty(response) != '') {
        bot.api.editMessageText(ctx.chat.id, message.message_id, pretty(response))
    } else {
        bot.api.editMessageText(ctx.chat.id, message.message_id, response)
    }
    database.save({ chatId: ctx.chat.id, text: `User: ${ctx.message.text}\nBot: ${pretty(response)}` })
})
bot.start()
bot.catch((e) => {
    console.log(e);
})

function pretty(paragraph: string): string {

    const lines = paragraph.split("\n");
    let i = 0;
    while (i < lines.length && lines[i].trim() !== "") {
        i++;
    }
    if (i < lines.length) {
        paragraph = lines.slice(i).join("\n");
    }

    return paragraph

}
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
                dotCount = 1
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
