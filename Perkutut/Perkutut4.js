// ==UserScript==
// @name         Perkutut4
// @namespace    http://tampermonkey.net/
// @version      3.216
// @description  try to take over the world!
// @updateURL    https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Perkutut/Perkutut4.js
// @downloadURL  https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Perkutut/Perkutut4.js
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
var Comment1 = '#18NAGA (PLECIKUS1) : 63*73*41 BETT';
var namagroup2 = 'K86';
var Comment2 = 'K86TOTO ( PLECIKAWAT ) : 86*07*43';
var namagroup3 = 'WARUNG';
var Comment3 = '#(WARUNGTOTO) = (PLECUAN) 90*44*55';
var namagroup4 = 'RIATOTO';
var Comment4 = '#RIATOTO PLECICIAK = 19*00*05';
var namagroup5 = 'PEDRO';
var Comment5 = '#PEDRO4D (PLECIKICIK**46*72#1)';
var namagroup6 = 'DIVA4D';
var Comment6 = '#DIVA4D (PLECIAHAH) = 15*51*49';
var namagroup7 = 'Moveon88';
var Comment7 = '# ( PLECIKICIK ) : 93*99*54';
var namagroup8 = '𝐀𝐋𝐋𝐏𝐀𝐒';
var Comment8 = 'Tok99Toto ( PLECIKLUK ) : 98*64*12';
var namagroup9 = 'TAFSIR MIMPI';
var Comment9 = 'SIJITOGEL PLECIKICIK 36*28*71';
var namagroup10 = 'KAGET';
var Comment10 = 'DAGELAN4D(PLECIKAN) : 97*38*53';
var namagroup11 = 'MAYAPADA';
var Comment11 = 'BETT*Mayapada4D(BO)*PLECISAN*60*33*06';
var namagroup12 = 'OPUNG';
var Comment12 = 'OPUNG4D ( PLECIANS ) : 82*03*70';
var namagroup13 = 'GOHT0G3L';
var Comment13 = 'GOHTOGEL=PLECIKI21=39*81*66';
var namagroup14 = 'BLITAR';
var Comment14 = '#BLITAR4D (PLECIAHAH) = 88*83';
var namagroup15 = 'Hoho';
var Comment15 = 'PLECICILAN : 23*18*14 #HOHOTOGEL';
var namagroup16 = 'GTO';
var Comment16 = '(GUDANGTOTO) = (PLECIKAWAT) 01*26*47';



var namagroup17 = 'Jawatengah';
var Comment17 = 'Baru Perkutut 4';


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
