
import { Configuration, OpenAIApi } from 'openai';
import env from "./env"

let openai: OpenAIApi = new OpenAIApi(new Configuration({
    apiKey: env.ApiKey()
}));

export default {
    image:async (text:string)=>{
        const response = await openai.createImage({
  prompt: text,
  n: 1,
  size: "1024x1024",
});
image_url = response.data.data[0].url;
       return image_url 
    },
    generate: async (prompt: string) => {
        const completion = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 1024,
            n:1
        });
        if (completion.data.choices[0].text!=null) {
            return completion.data.choices[0].text
        }else{
            return "An error occured. try again"
        }
    }
}




