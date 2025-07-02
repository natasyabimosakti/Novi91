// ==UserScript==
// @name         Sampoerna3
// @namespace    http://tampermonkey.net/
// @version      3.208
// @description  try to take over the world!
// @updateURL    https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Sampoerna/Sampoerna3.js
// @downloadURL  https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Sampoerna/Sampoerna3.js
// @author       You
// @match        http*://*/*
// @run-at       document-end
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        window.close
// @grant        GM_xmlhttpRequest
// @connect      api.telegram.org
// @connect      raw.githubusercontent.com
// ==/UserScript==



/*======================================================================Paste Script Tampermonkey di sini===============================================================*/


var namagroup1 = '18NAGA';
var Comment1 = '#18NAGA (YOREAN63) : 05*24*48 BETT';
var namagroup2 = 'K86';
var Comment2 = 'K86TOTO ( YONOBO74 ) : 36*59*02';
var namagroup3 = 'WARUNG';
var Comment3 = '#(WARUNGTOTO) = (YOWESBEN6) 63*92*65';
var namagroup4 = 'RIATOTO';
var Comment4 = '#RIATOTO YONOBO74 = 19*99*17';
var namagroup5 = 'PEDRO';
var Comment5 = '#PEDRO4D (YONOBO74*33*98*16)';
var namagroup6 = 'DIVA4D';
var Comment6 = '#DIVA4D (YONOBO74) = 27*01*82';
var namagroup7 = 'Moveon88';
var Comment7 = '# ( YONOBO74 ) : 06*18*75';
var namagroup8 = '𝐀𝐋𝐋𝐏𝐀𝐒';
var Comment8 = 'Tok99Toto ( YOBENWES3 ) : 52*46*47';
var namagroup9 = 'TAFSIR MIMPI';
var Comment9 = 'SIJITOGEL YONOBO74 91*85*64';
var namagroup10 = 'KAGET';
var Comment10 = 'DAGELAN4D(YONEKWIK37) : 53*44*79';
var namagroup11 = 'MAYAPADA';
var Comment11 = 'BETT*Mayapada4D(BO)*CRTI249*51*09*20';
var namagroup12 = 'OPUNG';
var Comment12 = 'OPUNG4D ( YOKOJO3 ) : 07*57*97';
var namagroup13 = 'GOHT0G3L';
var Comment13 = 'GOHTOGEL=YOKWIK47=49*12*08';
var namagroup14 = 'BLITAR';
var Comment14 = '#BLITAR4D (YONOBO74) = 69*10';
var namagroup15 = 'Hoho';
var Comment15 = 'YONOBO74 : 84*94*15 #HOHOTOGEL';
var namagroup16 = 'GTO';
var Comment16 = '(GUDANGTOTO) = (YOKWIK47) 04*11*13';




var namagroup17 = 'Jawatengah';
var Comment17 = 'Baru Sampo 3';

var namagroup18 = 'lajw';
var Comment18 = 'asek';


let lastMessageSent = ""; // lokal per tab/browser

function normalizeText(text) {
    return text
        .trim()
        .replace(/\s+/g, ' ')
        .toLowerCase();
}

function levenshtein(a, b) {
    const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
    for (let j = 1; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b[i - 1] === a[j - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    return matrix[b.length][a.length];
}

async function sendToTelegram(message) {
    const fullMessage = `📡 [${SCRIPT_NAME}]\n${message}`;
    const normalizedMessage = normalizeText(fullMessage);

    // ✅ Cek variabel lokal dulu
    if (normalizeText(lastMessageSent) === normalizedMessage) {
        console.log("🧠 Duplikat dicegah (lokal)");
        return;
    }

    const lastSent = await GM.getValue("lastTelegramMessage", "");
    const lastTime = await GM.getValue("lastTelegramTime", 0);
    const now = Date.now();
    const COOLDOWN = 5 * 60 * 1000;

    const normalizedLast = normalizeText(lastSent);
    const distance = levenshtein(normalizedMessage, normalizedLast);
    const similarity = 1 - distance / Math.max(normalizedMessage.length, normalizedLast.length);
    const SIMILARITY_THRESHOLD = 0.95;

    if (similarity >= SIMILARITY_THRESHOLD && (now - lastTime < COOLDOWN)) {
        console.log("⏱️ Duplikat dicegah (storage)");
        return;
    }

    // ✅ Update lokal dulu biar aman dari spam paralel
    lastMessageSent = fullMessage;

    GM_xmlhttpRequest({
        method: "GET",
        url: `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(fullMessage)}`,
        onload: function (res) {
            console.log("✅ Telegram terkirim:", res.responseText);
            GM.setValue("lastTelegramMessage", fullMessage);
            GM.setValue("lastTelegramTime", now);
        },
        onerror: function (err) {
            console.error("❌ Gagal kirim ke Telegram:", err);
        }
    });
}
