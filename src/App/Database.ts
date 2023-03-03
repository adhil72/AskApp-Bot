import fs from "fs";

interface TelegramMessage {
    text: string;
    chatId: number;
}

// Function to save a Telegram message to a JSON file
function saveMessage(message: TelegramMessage): void {
    // Read the existing messages from the file
    const messages = readMessages();

    // Add the new message to the array
    messages.push(message);

    // Write the updated array back to the file
    fs.writeFileSync("messages.json", JSON.stringify(messages));
}

// Function to get all Telegram messages from the JSON file
function readMessages(): TelegramMessage[] {
    try {
        const messagesString = fs.readFileSync("messages.json", "utf-8");
        return JSON.parse(messagesString);
    } catch (error) {
        // If the file doesn't exist or can't be read, return an empty array
        return [];
    }
}

function clear(id: number) {
    // Read all messages from the file
    const messages = readMessages();

    // Filter the messages by the chat ID
    const filteredMessages = messages.filter(
        (message) => message.chatId !== id
    )

    fs.writeFileSync("messages.json", JSON.stringify(filteredMessages));

}

// Function to get the last 3 messages sent by a specific chat ID
function getLastMessagesByChatId(chatId: number): string {
    // Read all messages from the file
    const messages = readMessages();

    // Filter the messages by the chat ID
    const filteredMessages = messages.filter(
        (message) => message.chatId === chatId
    ).slice(0, 3)

    let message = ''
    filteredMessages.map((m) => {
        message += m.text
    })



    return message
}

export default {
    save: saveMessage,
    read: getLastMessagesByChatId,
    clear:clear
}


