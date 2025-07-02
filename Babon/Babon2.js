// ==UserScript==
// @name         Babon 2
// @namespace    http://tampermonkey.net/
// @version      3.41
// @description  try to take over the world!
// @updateURL    https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Babon/Babon2.js
// @downloadURL  https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Babon/Babon2.js
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
var Comment1 = '#18NAGA (PEMPEK12) : 73*04*81 BETT';
var namagroup2 = 'K86';
var Comment2 = 'K86TOTO ( PIALADIGILIR ) : 85*08*60';
var namagroup3 = 'WARUNG';
var Comment3 = '#(WARUNGTOTO) = (PAKUAN28) 19*17*33';
var namagroup4 = 'RIATOTO';
var Comment4 = '#RIATOTO PIMPINAN = 37*89*61';
var namagroup5 = 'PEDRO';
var Comment5 = '#PEDRO4D (PURARA23*70*14*67)';
var namagroup6 = 'DIVA4D';
var Comment6 = '#DIVA4D (PAPIPU56) = 88*32*57';
var namagroup7 = 'Moveon88';
var Comment7 = '# ( PEMBODONG ) : 79*74*51';
var namagroup8 = '𝐀𝐋𝐋𝐏𝐀𝐒';
var Comment8 = 'Tok99Toto ( PINGGULGEDE ) : 37*89*24';
var namagroup9 = 'TAFSIR MIMPI';
var Comment9 = 'SIJITOGEL PUNDAKLAH 03*40*64';
var namagroup10 = 'KAGET';
var Comment10 = 'DAGELAN4D(PRAWANKOTA) : 71*48*25';
var namagroup11 = 'MAYAPADA';
var Comment11 = 'BETT*Mayapada4D(BO)*PELANGAIR*39*84*92';
var namagroup12 = 'OPUNG';
var Comment12 = 'OPUNG4D ( PIMAKU28 ) : 59*95*87';
var namagroup13 = 'GOHT0G3L';
var Comment13 = 'GOHTOGEL=PUBERDAYA=72*45*27';
var namagroup14 = 'BLITAR';
var Comment14 = '#BLITAR4D (PELANGI77) = 03*40';
var namagroup15 = 'Hoho';
var Comment15 = 'PARLENTE : 18*28*38 #HOHOTOGEL';
var namagroup16 = 'GTO';
var Comment16 = '(GUDANGTOTO) = (PAKUKUTARA) 13*36*58';


var namagroup17 = 'Jawatengah';
var Comment17 = 'Baru Babon 2';

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
