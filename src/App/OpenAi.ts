
import { Configuration, OpenAIApi } from 'openai';
import env from "./env"

let openai: OpenAIApi = new OpenAIApi(new Configuration({
    apiKey: env.ApiKey()
}));

export default {
    generate: async (prompt: string) => {
        const completion = await openai.createCompletion({
            model: 'text-davinci-002',
            prompt: prompt,
            max_tokens: 1024,
            n:2
        });
        if (completion.data.choices[1].text!=null) {
            return completion.data.choices[1].text
        }else{
            return "An error occured. try again"
        }
    }
}




