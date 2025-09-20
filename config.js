const fs = require('fs');
const path = require('path');
const { getConfig } = require("./lib/configdb");

if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    // ===== BOT CORE SETTINGS =====
 SESSION_ID: process.env.SESSION_ID || "Nebula~eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidU1ieWdFenI3VnhVbVVSQ2d4eG9sUGZ3SGc4Z2Ivdmh6NlkvN0NHV3BXOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUdML1Z2VHNZNlRJK3hFMm5Oa2FLMlY5NVlQWEFMdHN3RjJ4M0lPbEN5ND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlQ0tKZ2pZekJaSUFyMkRybzV0dnhrLzlab1dGTGplVlorTVRjTUloa1hnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzdUh0NnR5S1h0RVdTTUlyQ0pGWVAzVVFoUlZXaHZnM3VuZFZSWGlNVG4wPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZFWStwL2N0VU1BUHAxMElaa1NYVjdlR0FKem1qN095d0J3RUFEbUoxM0k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhESVlyK0xzRUl2cDFodUFvUDZyV09xYVVuSjVRNUZybFdPSDE5YW1YalE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUhibWdhY09YaHNJemZoSExIS0duMVN3UXNTSUllTWcrMlpoVUZEU3ZuUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQWIraVhvMDBlQzhUUUtGSFZIcUNKSEJoUHgwV1VaVlRTSnZvN2RQanYxaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNLMHVjYTBndnFrR2FOY1lqNWlnRVJZNmFJYnFLeTY1eTQvcWFJZjdoSGVPYm94Vmt6TDY5cHVEdXVweTJtQ0QvaWQydzZRMFFTUFQ0bWRjcXpnNUNnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTcsImFkdlNlY3JldEtleSI6InM2aWd1aEhQV2kwcUl1M3JPV2t0N25wd29JVVFoTU5wZnFWOEo2ckZZMUU9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IkJMTkxBNzlZIiwibWUiOnsiaWQiOiIyNTY3NDI2MzQwODk6MjhAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIxODY1Mzk2NTcxOTU2NTM6MjhAbGlkIiwibmFtZSI6IlJpZHogQ29kZXIifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0ozSDNxNEhFT2J4dDhZR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InhRS0N3eFEzMUZXbk8xRE90R2ZZdHNzSmwrYmp0N1JUSnJqNjBtSGNJa2s9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjZjdHh4QXhVallnbDlZWVhmMm5Rd0FaT1pxdkNUNDBqbmJtQnQ5bHlYTitBSlNDWHU3VjBFYnQxQ0RIL2syRXlPdUo4Vys3ckVhRHVjN2JhL2xBZERBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJrUU5xVG12ZDlYUlVTUHhJUnJMaEo1OFZSUndLM0lCa2pGNnhUNmlzRGdUdCtER3B5eGJLN0RvYTRpKzd1ZGdlOWxUaGkwb3d4YTJidWtmU2FOUnpDUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1Njc0MjYzNDA4OToyOEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJjVUNnc01VTjlSVnB6dFF6clJuMkxiTENaZm00N2UwVXlhNCt0SmgzQ0pKIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQVVJQ0E9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTgzMjkwNjUsImxhc3RQcm9wSGFzaCI6IjJHNEFtdSIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRnRnIn0=",
  PREFIX: getConfig("PREFIX") || ".",
    CHATBOT: getConfig("CHATBOT") || "on", 
    BOT_NAME: process.env.BOT_NAME || getConfig("BOT_NAME") || "NEBULA-MD",
    MODE: getConfig("MODE") || process.env.MODE || "public", 
    REPO: process.env.REPO || "https://github.com/Ridz-coder01/NEBULA-MD", 
    BAILEYS: process.env.BAILEYS || "@whiskeysockets/baileys", 
    OWNER_NUMBER: process.env.OWNER_NUMBER || "263714732501",
    OWNER_NAME: process.env.OWNER_NAME || getConfig("OWNER_NAME") || "Rɪᴅᴢ Cᴏᴅᴇʀ",           // Owner's name
    DEV: process.env.DEV || "263714732501",                     // Developer's contact number
    DEVELOPER_NUMBER: '263714732501@s.whatsapp.net',            // Developer's WhatsApp ID

    // ===== AUTO-RESPONSE SETTINGS =====
    AUTO_REPLY: process.env.AUTO_REPLY || "false",              // Enable/disable auto-reply
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "false",// Reply to status updates?
    AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*NEBULA MD VIEWED YOUR STATUS 🤖*",  // Status reply message
    READ_MESSAGE: process.env.READ_MESSAGE || "false",          // Mark messages as read automatically?
    REJECT_MSG: process.env.REJECT_MSG || "*📞 ᴄαℓℓ ɴσт αℓℓσωє∂ ιɴ тнιѕ ɴᴜмвєʀ уσυ ∂σɴт нανє ᴘєʀмιѕѕισɴ 📵*",
    // ===== REACTION & STICKER SETTINGS =====
    AUTO_REACT: process.env.AUTO_REACT || "false",              // Auto-react to messages?
    OWNER_REACT: process.env.OWNER_REACT || "false",              // Auto-react to messages?
    CUSTOM_REACT: process.env.CUSTOM_REACT || "false",          // Use custom emoji reactions?
    CUSTOM_REACT_EMOJIS: getConfig("CUSTOM_REACT_EMOJIS") || process.env.CUSTOM_REACT_EMOJIS || "🍨,🍿,",  // set custom reacts
    STICKER_NAME: process.env.STICKER_NAME || "Rɪᴅᴢ-Cᴏᴅᴇʀ",     // Sticker pack name
    AUTO_STICKER: process.env.AUTO_STICKER || "false",          // Auto-send stickers?
    // ===== MEDIA & AUTOMATION =====
    AUTO_RECORDING: process.env.AUTO_RECORDING || "false",      // Auto-record voice notes?
    AUTO_TYPING: process.env.AUTO_TYPING || "false",            // Show typing indicator?
    MENTION_REPLY: process.env.MENTION_REPLY || "false",   // reply on mentioned message 
    MENU_IMAGE_URL: getConfig("MENU_IMAGE_URL") || "https://i.ibb.co/T5Dn1HM/20250919-224319.png",  // Bot's "alive" menu mention image

    // ===== SECURITY & ANTI-FEATURES =====
    ANTI_DELETE: process.env.ANTI_DELETE || "true", // true antidelete to recover deleted messages 
    ANTI_CALL: process.env.ANTI_CALL || "false", // enble to reject calls automatically 
    ANTI_BAD_WORD: process.env.ANTI_BAD_WORD || "false",    // Block bad words?
    ANTI_LINK: process.env.ANTI_LINK || "true",    // Block links in groups
    ANTI_VV: process.env.ANTI_VV || "true",   // Block view-once messages
    DELETE_LINKS: process.env.DELETE_LINKS || "false",          // Auto-delete links?
    ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "same", // inbox deleted messages (or 'same' to resend)
    ANTI_BOT: process.env.ANTI_BOT || "true",
    PM_BLOCKER: process.env.PM_BLOCKER || "true",

    // ===== BOT BEHAVIOR & APPEARANCE =====
    DESCRIPTION: process.env.DESCRIPTION || "*© ᴘᴏᴡᴇʀᴇᴅ ʙʏ Rɪᴅᴢ Cᴏᴅᴇʀ*",  // Bot description
    PUBLIC_MODE: process.env.PUBLIC_MODE || "true",              // Allow public commands?
    ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "false",        // Show bot as always online?
    AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "true", // React to status updates?
    AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN || "true", // VIEW to status updates?
    AUTO_BIO: process.env.AUTO_BIO || "false", // ture to get auto bio 
    WELCOME: process.env.WELCOME || "false", // true to get welcome in groups 
    GOODBYE: process.env.GOODBYE || "false", // true to get goodbye in groups 
    ADMIN_ACTION: process.env.ADMIN_ACTION || "false", // true if want see admin activity 
};
        
