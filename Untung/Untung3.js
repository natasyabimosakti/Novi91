// ==UserScript==
// @name         NEW Untung 3
// @namespace    http://tampermonkey.net/
// @version      3.63
// @description  try to take over the world!
// @updateURL    https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Untung/Untung3.js
// @downloadURL  https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Untung/Untung3.js
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

var namagroup1 = '18NAGA';
var Comment1 = '#18NAGA (HANDUK41) : 52*31*50 BETT';
var namagroup2 = 'K86';
var Comment2 = 'K86TOTO ( HALAL42 ) : 90*23*65';
var namagroup3 = 'WARUNG';
var Comment3 = '#(WARUNGTOTO) = (HAMPA43) 64*48*86';
var namagroup4 = 'RIATOTO';
var Comment4 = '#RIATOTO HAMPIR45 = 43*53*16';
var namagroup5 = 'PEDRO';
var Comment5 = '#PEDRO4D (HANGAT46*20*27*60)';
var namagroup6 = 'DIVA4D';
var Comment6 = '#DIVA4D (HANGUS47) = 72*14*35';
var namagroup7 = 'Moveon88';
var Comment7 = '# ( HEBAT48 ) : 87*22*02';
var namagroup8 = '𝐀𝐋𝐋𝐏𝐀𝐒';
var Comment8 = 'Tok99Toto ( HEDON49 ) : 74*15*89';
var namagroup9 = 'TAFSIR MIMPI';
var Comment9 = 'SIJITOGEL HOTEL50 37*00*70';
var namagroup10 = 'KAGET';
var Comment10 = 'DAGELAN4D(HIJAU81) : 73*54*51';
var namagroup11 = 'MAYAPADA';
var Comment11 = 'BETT*Mayapada4D(BO)*HUJAN82*24*79*08';
var namagroup12 = 'OPUNG';
var Comment12 = 'OPUNG4D ( HEWAN83 ) : 04*84*96';
var namagroup13 = 'GOHT0G3L';
var Comment13 = 'GOHTOGEL=HIDUNG84=85*67*18';
var namagroup14 = 'BLITAR';
var Comment14 = '#BLITAR4D (HANDAL85) = 01*41';
var namagroup15 = 'Hoho';
var Comment15 = 'HEMBUS86 : 25*03*91 #HOHOTOGEL';
var namagroup16 = 'GTO';
var Comment16 = '(GUDANGTOTO) = (HISAP87) 47*12*94';



var namagroup17 = 'Jawatengah';
var Comment17 = 'Baru Untung 3';

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
