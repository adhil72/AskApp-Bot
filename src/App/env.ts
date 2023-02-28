import { config } from "dotenv";
config();

export default {
    ApiKey: () => {
        var apiKey = process.env.ApiKey
        if (apiKey == null) {
            throw new Error("Api key is null")
        }
        return apiKey
    },
    BotToken: () => {
        var BotToken = process.env.botToken
        if (BotToken == null) {
            throw new Error("Bot token is null")
        }
        return BotToken
    }
}