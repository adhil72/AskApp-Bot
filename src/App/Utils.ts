import { Tesseract } from "tesseract.ts";


function extractTextFromImage(image: any) {
    return new Promise((r) => {
        Tesseract
            .recognize(image)
            .then((res: any) => {
                let text = filter(res.text)
                r(text)
            })
            .catch(() => { r('') });
    })
}
function filter(text: string) {
    let scrs = ["!", "@", "#", "$", "%", "^", "&", "*", "_", "+", "-", "=", ",", ".", "/", "?", "<", ">", ";", ":", "'", '"', "\\", "|", "[", "]", "{", "}", "`", "~"]
    let filterText = text.split('\n').filter((v) => {
        if (!scrs.includes(v[0]) && v[0] != '') {
            return v
        } else {
            return null
        }
    })
    return filterText.join(' ')

}

function extractTextFromAudio(audio: any) {
    const audioContext = new AudioContext();
    const audioElement = new Audio('audio.mp3');
    const sourceNode = audioContext.createMediaElementSource(audioElement);

}

export default { extractTextFromImage }