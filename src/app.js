require("dotenv").config();
const express = require("express");
const TelegramBot = require('node-telegram-bot-api');

const PORT = process.env.PORT || 1203;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Bot Is Working")
});


try {
    app.listen(PORT, () => {
        console.log(`Server Connected on Port: ${PORT}`);
    });
} catch (error) {
    console.log(`Can't connected to the server: ${error.message}`);
}

const TOKEN = process.env.TOKEN;
const CHANNEL_USERNAME = 'KashurTek';
const bot = new TelegramBot(TOKEN, { polling: true });


bot.on('message', async (message) => {
    let chat_id = message.chat.id;
    if (message.text === '/start') {
        try {
            const chatMember = await bot.getChatMember(`@${CHANNEL_USERNAME}`, message.from.id);
            if (chatMember.status === 'left' || chatMember.status === 'kicked') {
                bot.sendMessage(chat_id, "Please join @KashurTek to continue: [Join Channel](https://t.me/KashurTek)", { parse_mode: 'Markdown', "reply_markup": { "inline_keyboard": buttons } });
            } else {
                bot.sendMessage(chat_id, "I am shahid nabi", {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: 'Open web app', web_app: { url: `https://5343-122-161-240-237.ngrok-free.app?id=${chat_id}` } }]
                        ]
                    }

                });

            }
        } catch (error) {
            console.log(error);
        }
    } else {
        bot.sendMessage(chat_id, `Hello ${message.from.first_name}, Welcome to Kashur Tek Bot. \nPlease use this command /start`);
    }
});
