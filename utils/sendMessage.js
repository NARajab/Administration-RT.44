const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");

const client = new Client({
  authStrategy: new LocalAuth(),
  // webVersionCache: {
  //   type: "remote",
  //   remotePath:
  //     "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
  // },
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

const sendTextMessage = async (phoneNumber, message) => {
  try {
    let phoneNumberNew;

    if (phoneNumber.startsWith("0")) {
      phoneNumberNew = phoneNumber.substring(1);
      const chat = await client.getChatById(`62${phoneNumberNew}@c.us`);
      await chat.sendMessage(message);
    } else {
      phoneNumberNew = phoneNumber;
      const chat = await client.getChatById(`${phoneNumberNew}@c.us`);
      await chat.sendMessage(message);
    }

    console.log(`Pesan terkirim ke ${phoneNumber}: ${message}`);
  } catch (error) {
    console.error("Gagal mengirim pesan:", error);
  }
};

const sendWelcomeMessage = async (phoneNumber) => {
  const welcomeMessage = "Hai selamat datang! Kenalin Aku Cika bot RT.44";
  await sendTextMessage(phoneNumber, welcomeMessage);
};
const sendSuccessMessageForgotePassword = async (phoneNumber) => {
  const welcomeMessage = "Perubahan kata sandi anda berhasil";
  await sendTextMessage(phoneNumber, welcomeMessage);
};
const sendSuccessMessageUpdateProfile = async (phoneNumber) => {
  const welcomeMessage = "Profil anda telah diperbaharui";
  await sendTextMessage(phoneNumber, welcomeMessage);
};

module.exports = {
  client,
  sendTextMessage,
  sendWelcomeMessage,
  sendSuccessMessageForgotePassword,
  sendSuccessMessageUpdateProfile,
};
