// ==UserScript==
// @name         NEW Untung 2
// @namespace    http://tampermonkey.net/
// @version      3.63
// @description  try to take over the world!
// @updateURL    https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Untung/Untung2.js
// @downloadURL  https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Untung/Untung2.js
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
var Comment1 = '#18NAGA (FILTER51) : 88*82*99 BETT';
var namagroup2 = 'K86';
var Comment2 = 'K86TOTO ( FORMULA52 ) : 29*33*32';
var namagroup3 = 'WARUNG';
var Comment3 = '#(WARUNGTOTO) = (FOSIL53) 09*38*66';
var namagroup4 = 'RIATOTO';
var Comment4 = '#RIATOTO FONDASI54 = 05*83*55';
var namagroup5 = 'PEDRO';
var Comment5 = '#PEDRO4D (FRAMBOS56*61*30*93)';
var namagroup6 = 'DIVA4D';
var Comment6 = '#DIVA4D (FLAMBOYAN57) = 95*42*36';
var namagroup7 = 'Moveon88';
var Comment7 = '# ( FRESTEA58 ) : 06*76*46';
var namagroup8 = '𝐀𝐋𝐋𝐏𝐀𝐒';
var Comment8 = 'Tok99Toto ( FERMEN59 ) : 26*56*97';
var namagroup9 = 'TAFSIR MIMPI';
var Comment9 = 'SIJITOGEL FERDA60 59*78*39';
var namagroup10 = 'KAGET';
var Comment10 = 'DAGELAN4D(FASIH61) : 21*57*13';
var namagroup11 = 'MAYAPADA';
var Comment11 = 'BETT*Mayapada4D(BO)*FASIK62*10*81*34';
var namagroup12 = 'OPUNG';
var Comment12 = 'OPUNG4D ( FISIK63 ) : 77*80*19';
var namagroup13 = 'GOHT0G3L';
var Comment13 = 'GOHTOGEL=FINAL64=71*11*45';
var namagroup14 = 'BLITAR';
var Comment14 = '#BLITAR4D (FINIS65) = 44*17';
var namagroup15 = 'Hoho';
var Comment15 = 'FIRAUN67 : 07*75*63 #HOHOTOGEL';
var namagroup16 = 'GTO';
var Comment16 = '(GUDANGTOTO) = (FIRMA68) 49*40*28';






var namagroup17 = 'Jawatengah';
var Comment17 = 'Baru Untung 2';

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
