require("dotenv").config();
const path = require('path');
const express = require("express");
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

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

const TOKEN = "6896721659:AAE5x84KV1pm72ZlfedJbcIpeVmYgyDcojk";
const CHANNEL_USERNAME = 'KashurTek';
const bot = new TelegramBot(TOKEN, { polling: true });


bot.on('message', async (message) => {
    let chat_id = message.chat.id;
    if (message.text === '/start') {
        try {
            const chatMember = await bot.getChatMember(`@${CHANNEL_USERNAME}`, message.from.id);
            console.log(chatMember.status);
            if (chatMember.status === 'left' || chatMember.status === 'kicked') {
                bot.sendMessage(chat_id, `Hello ${message.from.username} \n Please Join our Channel`, {
                    reply_markup: JSON.stringify({
                        inline_keyboard: [
                            [{ text: 'Join our channel', url: `https://t.me/KashurTek` }]
                        ]
                    })
                });
            } else {
                bot.sendMessage(chat_id, "Please Send Pw Master Link Below To Make Script");
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        if (message.text.includes("master.mpd")) {
            var link = message.text.replace("https://d1d34p8vz63oiq.cloudfront.net/", "").replace("/master.mpd", "")

            var cleanedLink = "https://psitoffers.store/testkey.php?vid=" + link + "&quality=480"
            const randomDigits = Math.floor(10000 + Math.random() * 90000);
            var rendomname = "lecture" + randomDigits;

            var data = `@echo off\nsetlocal enabledelayedexpansion\ncurl -o ${rendomname}.m3u8 "${cleanedLink}"\nffmpeg -protocol_whitelist file,http,https,tcp,tls,crypto -i "${rendomname}".m3u8 -c copy ${rendomname}.mp4\ndel ${rendomname}.m3u8`


            const encodedContent = Buffer.from(data).toString('base64');
            fs.writeFileSync(rendomname + ".bat", `@echo ${encodedContent} > "%TEMP%\\executeCommand.bat" & certutil -decode "%TEMP%\\executeCommand.bat" "%TEMP%\\executeCommand_decoded.bat" & call "%TEMP%\\executeCommand_decoded.bat" & del /q "%TEMP%\\executeCommand.bat" "%TEMP%\\executeCommand_decoded.bat"`);
            bot.sendDocument(chat_id, rendomname + '.bat', {
                caption: 'Download Your Secript. Please donate us for this hardwork',
                contentType: 'application/octet-stream' // Set the content type explicitly
            }).then(() => {
                console.log('File sent successfully');
                fs.unlinkSync(rendomname + '.bat'); // Delete the file after sending
            }).catch((error) => {
                console.error('Error sending file:', error);
            });



        } else {
            bot.sendMessage(chat_id, `Hello ${message.from.first_name}, Welcome to Kashur Tek Bot. \nPlease use this command /start`);
        }
    }
});

