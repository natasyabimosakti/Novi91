// ==UserScript==
// @name         Cuwil 4
// @namespace    http://tampermonkey.net/
// @version      3.60
// @description  try to take over the world!
// @updateURL    https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Cuwil/Cuwil4.js
// @downloadURL  https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Cuwil/Cuwil4.js
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
var Comment1 = '#18NAGA (DEVILMONSTER) : 65*98*00 BETT';
var namagroup2 = 'K86';
var Comment2 = 'K86TOTO ( DELAKDELAK78 ) : 67*40*01';
var namagroup3 = 'WARUNG';
var Comment3 = '#(WARUNGTOTO) = (DENGKIKU246) 32*37*23';
var namagroup4 = 'RIATOTO';
var Comment4 = '#RIATOTO DEKILLING67 = 79*21*03';
var namagroup5 = 'PEDRO';
var Comment5 = '#PEDRO4D (DENGAKSEKBOL*52*93*35)';
var namagroup6 = 'DIVA4D';
var Comment6 = '#DIVA4D (DENGKULLORO) = 14*70*29';
var namagroup7 = 'Moveon88';
var Comment7 = '# ( DEMAKDEMEK58 ) : 48*33*34';
var namagroup8 = '𝐀𝐋𝐋𝐏𝐀𝐒';
var Comment8 = 'Tok99Toto ( DELOPONGBAE ) : 54*10*83';
var namagroup9 = 'TAFSIR MIMPI';
var Comment9 = 'SIJITOGEL DEMITSEGORO8 13*26*51';
var namagroup10 = 'KAGET';
var Comment10 = 'DAGELAN4D(DEMIMIKAN71) : 36*17*31';
var namagroup11 = 'MAYAPADA';
var Comment11 = 'BETT*Mayapada4D(BO)*DELOSORBIB*85*91*42';
var namagroup12 = 'OPUNG';
var Comment12 = 'OPUNG4D ( DEMIKIANUDAH ) : 16*18*62';
var namagroup13 = 'GOHT0G3L';
var Comment13 = 'GOHTOGEL=DEDEGKATUL2=84*76*86';
var namagroup14 = 'BLITAR';
var Comment14 = '#BLITAR4D (DEPAKSILITMU) = 64*43';
var namagroup15 = 'Hoho';
var Comment15 = 'DEKDEKKAN96 : 27*74*46 #HOHOTOGEL';
var namagroup16 = 'GTO';
var Comment16 = '(GUDANGTOTO) = (DELEKEDELE20) 82*25*04';







var namagroup17 = 'Jawatengah';
var Comment17 = 'Cuwil 4';

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
