// ==UserScript==
// @name         MALBORO 1
// @namespace    http://tampermonkey.net/
// @version      3.188
// @description  try to take over the world!
// @updateURL    https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Malboro/Malboro1.js
// @downloadURL  https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Malboro/Malboro1.js
// @author       You
// @match        http*://*/*
// @run-at       document-end
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        window.close
// @connect      api.telegram.org
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// ==/UserScript==



var namagroup1 = 'shio';
var Comment1 = '#shiokelinci4d*ANANDA122*36*80';
var namagroup2 = 'BUKU';
var Comment2 = 'IYATOTO ANAKCODA83 37*15*50';
var namagroup3 = 'TIKTAK';
var Comment3 = 'Tiktaktogel / ASUKAU348 / 14 , 57 , 42';
var namagroup4 = 'G41B';
var Comment4 = 'GAIB4D=ANJANI48=65*56*48';
var namagroup5 = 'KEITOGEL';
var Comment5 = '#keitogel = (ANITI348) = 47*54*49';
var namagroup6 = 'Papuatoto';
var Comment6 = '#PAPUATOTO=(ARAKROH57)=17-95';
var namagroup7 = '453P VIP';
var Comment7 = 'ASEPTOGEL ANJLOK549 55*90*06';
var namagroup8 = 'MENARA';
var Comment8 = '#MENARA4D=ANUNTU284= 51*35';
var namagroup9 = 'G1LA';
var Comment9 = 'GILA4D=ANALOH49=78*46*77';
var namagroup10 = 'GROUP LOMBA ANGKA';
var Comment10 = '#JNETOTO(ALORJI3)*71*96*75';
var namagroup11 = 'TOYIB';
var Comment11 = '#TOYIBSLOT ( AMBOH45 ) : 12*86*68';
var namagroup12 = 'MASTER KUY';
var Comment12 = 'TOGELKUY AMARE45 33*92*66';
var namagroup13 = 'KOI';
var Comment13 = '#KOITOTO ( AMBOH45 ) 11*20';
var namagroup14 = 'ANGKER';
var Comment14 = 'ANGKER4D=ANUNTU284=58*88*41';
var namagroup15 = 'VESPA';
var Comment15 = 'VESPATOGEL (AMITAMI4) 02*09*38';
var namagroup16 = 'NEMO';
var Comment16 = 'NEMO4D (ANANDA122) : 67*98*38';
var namagroup17 = 'KIKO';
var Comment17 = '#KIKOTOTO (ANAKCODA83) = 05*60';
  
var namagroup18 = 'Jawatengah';
var Comment18 = 'Group Malb 1';



var refresh = 40;
var URLADMIN = "https://raw.githubusercontent.com/natasyabimosakti/ADMIN/main/Lama.son"
var keyword = ["ROOM","𝗥𝗢𝗢𝗠","LOMBA","𝗟𝗢𝗠𝗕𝗔","𝐋𝐎𝐌𝐁𝐀","LIMBA","ROM","R00M","login","𝐑𝐎𝐎𝐌","HONGKONG","SINGAPUR","nemo","l0mb4","lomb4","l0mba","𝗥𝟬𝟬𝗠","𝗟𝟬𝗠𝗕𝗔"]
var Backlist =["pemenang lomba","rekap","natidulu","room lomba freebet","prediksi","result","juara lomba","r3k4p","r3kap","rek4p","undang" ]
var isCommenting = false;
var EXPIRATION_MS = 8 * 60 * 1000; // 5 minutes
var now = Date.now();
// ✅ Daftar grup dan nilai default
const groupNames = [
    namagroup1, namagroup2, namagroup3, namagroup4, namagroup5, namagroup6,
    namagroup7, namagroup8, namagroup9, namagroup10, namagroup11, namagroup12,
    namagroup13, namagroup14, namagroup15, namagroup16, namagroup17, namagroup18
];
var commentToPost = '';
var grouptToPost = '';
let myObserver = null;
var forceOffRefresh = false;
var cekTombolUrutkan = true;
let adminList = [];
let adminListReady = false;
let kondisiStop;
const LOCAL_KEY = "cachedAdminList";
const VERSION_KEY = "cachedAdminVersion";

let sedangScroll = false;
let scrollUlang = false;
let scrollPerCycle = 5;

function scrollLoop5x() {
    if (document.location.href.includes("group")) {
        if (sedangScroll) return;
        sedangScroll = true;
        let count = 0;
        function scrollNext() {
            if (count >= scrollPerCycle) {
                sedangScroll = false;
                return;
            }
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            count++;
            setTimeout(scrollNext, 2000);
        }
        scrollNext();
    }
}
setInterval(() => {
    if (window.scrollY <5000 && !sedangScroll) {
        scrollLoop5x();
    }
}, 2000);

function isAdmin(name) {
    if (!adminListReady || !name) return false;
    return adminList.some(admin => name.toLowerCase().includes(admin.toLowerCase()));
}

function loadLocalAdmin() {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) {
        try {
            adminList = JSON.parse(stored);
            adminListReady = true;
            console.log("✅ Admin list loaded from localStorage:", adminList.length, "names");
        } catch (e) {
            console.error("❌ Failed to parse local admin list:", e);
        }
    }
}
var groups = groupNames.map(groupId => ({ groupId, defaultValue: false }));
const datakomenArray = await Promise.all(
    groupNames.map(name => GM.getValue(`group_${name}`))
);
function fetchAdminListFromGitHub() {
    GM_xmlhttpRequest({
        method: "GET",
        url: URLADMIN,
        onload: function(response) {
            try {
                const data = JSON.parse(response.responseText);
                const latestVersion = data.version;
                const admins = data.admins;

                const currentVersion = localStorage.getItem(VERSION_KEY);
                if (currentVersion !== latestVersion) {
                    console.log("⬆️ New admin version found:", latestVersion);
                    localStorage.setItem(LOCAL_KEY, JSON.stringify(admins));
                    localStorage.setItem(VERSION_KEY, latestVersion);
                    adminList = admins;
                    adminListReady = true;
                } else {
                    console.log("⏩ Admin list is up-to-date (version:", currentVersion + ")");
                }
            } catch (e) {
                console.error("❌ Failed to parse remote admin list:", e);
            }
        },
        onerror: function(err) {
            console.error("❌ Failed to load admin list from GitHub:", err);
        }
    });
}
loadLocalAdmin();
fetchAdminListFromGitHub();

function getCommentForGroup() {
    let commentMap = {
        [namagroup1]: Comment1,
        [namagroup2]: Comment2,
        [namagroup3]: Comment3,
        [namagroup4]: Comment4,
        [namagroup5]: Comment5,
        [namagroup6]: Comment6,
        [namagroup7]: Comment7,
        [namagroup8]: Comment8,
        [namagroup9]: Comment9,
        [namagroup10]: Comment10,
        [namagroup11]: Comment11,
        [namagroup12]: Comment12,
        [namagroup13]: Comment13,
        [namagroup14]: Comment14,
        [namagroup15]: Comment15,
        [namagroup16]: Comment16,
        [namagroup17]: Comment17,
        [namagroup18]: Comment18
    };
    var ceknamagroup = document.getElementsByClassName("fixed-container")[0]?.textContent || '';
    var ceknamagroup1 = document.getElementsByClassName('native-text')[5]?.textContent || '';
    var ceknamagroup2 = document.getElementsByClassName('native-text')[6]?.textContent || '';
    var ceknamagroup3 = document.getElementsByClassName('native-text')[7]?.textContent || '';
    var ceknamagroup4 = document.getElementsByClassName('native-text')[8]?.textContent || '';
    const allGroups = [ceknamagroup, ceknamagroup1, ceknamagroup2, ceknamagroup3, ceknamagroup4];

    for (let groupName in commentMap) {
        if (allGroups.some(text => text.includes(groupName))) {
            return { groupName, comment: commentMap[groupName] };
        }
    }
    return null;
}

function tungguGroup() {
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType !== 1) continue;
                const container = node.querySelector?.('.fixed-container');
                if (container) {
                    const result = getCommentForGroup();
                    if (result) {
                        commentToPost = result.comment;
                        grouptToPost = result.groupName;
                        console.log("✅ Nama grup : " + grouptToPost + " | Comment : " +commentToPost );
                        manageGroups();
                    }
                }
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}
tungguGroup()
let countA = 0;
if(document.location.href.includes("group")){
    myObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType !== 1) continue; // Bukan elemen
                const text = node.textContent || "";
                if (text.includes("Aktivitas terbaru")) {
                    const tombol = node.querySelectorAll("[role='button']");
                    if (tombol.length >= 2) {
                        cekTombolUrutkan = false;
                        tombol.forEach(btn => {
                            if (countA < 3) {
                                if (btn.textContent.includes("Postingan baru")) {
                                    btn.click();
                                    countA++;
                                }
                            } else {
                                setTimeout(() => {
                                    if (btn.textContent.includes("Aktivitas terbaru")) {
                                        btn.click();
                                        countA = 0;
                                    }
                                }, 100);
                            }
                        });
                    }
                }
            }
        }
    });
    myObserver.observe(document.body, { childList: true, subtree: true });
}

var sudahDiPanggil = false
async function manageGroups() {
    if(grouptToPost.length <= 1){
        return;
    }

    for (const { groupId, defaultValue } of groups) {
        const key = `group_${groupId}`;
        const expireKey = `${key}_expire`;
        const expireAt = await GM.getValue(expireKey, 0);

        if (now > expireAt) {
            await GM.setValue(key, defaultValue);
            await GM.setValue(expireKey, now + EXPIRATION_MS);
        }
    }
    const groupKey = `group_${grouptToPost}`;
    const sudahKomentar = await GM.getValue(groupKey,false);
    if (sudahKomentar) {
        console.log(`❌ Diblok Grup ${grouptToPost} sudah DIKOMENTARI`);
        kondisiStop =true;
        sudahDiPanggil = true
        location.href = "about:blank";
        return;

    }else{
        if(sudahDiPanggil)return;
        sudahDiPanggil = true
        botArticle(savedMutations1)
        botKoment(savedMutations2);
    }
}

let sedangKlikTextbox = false;
function CekBacklist(postinganBL) {
    for (const DataBacklist of Backlist) {
        const kata = DataBacklist.toLowerCase();
        if (postinganBL.toLowerCase().includes(kata)) {
            console.log(`❌ Diblok karena mengandung: "${kata}"`);
            return true;
        }
    }
    return false;
}

function CekKeyword(postingan) {
    console.log("🔍 CekKeyword untuk:", postingan);
    for (const DataKeyword of keyword) {
        const kata = DataKeyword.toLowerCase();
        if (postingan.toLowerCase().includes(kata)) {
            console.log(`✅ Keyword ditemukan: "${kata}"`);
            return true;
        }
    }
    return false;
}
var observercontetn;
var observercomment
let savedMutations1 = []
let savedMutations2 = []


async function cekArticle() {
    if (document.location.href.includes("group")) {
        observercontetn = new MutationObserver((mutationsList) => {

            savedMutations1 = mutationsList;
            if(sudahDiPanggil){
                botArticle(mutationsList)
            }

        });

        observercontetn.observe(document.body, { childList: true, subtree: true });
        console.log('cekArticle Aktif')
    }
}

function tungguMentionsContainer() {

    observercomment = new MutationObserver((mutationsList) => {

        savedMutations2 = mutationsList;
        if(sudahDiPanggil){
            botKoment(mutationsList)
        }

    });
    observercomment.observe(document.body, {
        childList: true,
        subtree: true
    });
    console.log('tungguMentionsContainer Aktif')
}


async function botKoment(mutatin) {

    for (const mutation of mutatin) {
        for (const node of mutation.addedNodes) {
            if (node.nodeType !== 1&&!kondisiStop) continue; // Skip jika bukan elemen
            const container = node.querySelector?.('.mentions-shadow-container');
            if (container) {
                console.log("TextBox Untuk komentar Telah Muncul");

                if (isCommenting) return;

                console.log("Cex");
                const textarea = document.querySelector(".multi-line-floating-textbox");
                const sendBtn = document.querySelector(".textbox-submit-button");
                if (textarea && sendBtn) {
                    textarea.focus();
                    textarea.value = commentToPost;
                    sendBtn.disabled = false;
                    const clickEvent = document.createEvent("MouseEvents");
                    clickEvent.initEvent("mousedown", true, true);
                    sendBtn.dispatchEvent(clickEvent);


                    console.log("✅ Komentar DIKIRIM (via dispatch):", commentToPost);

                    isCommenting = true;

                    kondisiStop = true
                    observercomment.disconnect();
                    if(document.querySelector("[role='dialog']")){
                        if(document.querySelector("[role='dialog']").textContent.includes("Ada Masalah")){
                            return;
                        }
                    }

                    GM.setValue("group_" + grouptToPost, true);
                    GM.setValue("group_"+grouptToPost+"_expire", Date.now() + EXPIRATION_MS);
                    showNotification("Komentar Sudah Terkirim : " + commentToPost);
                    startAutoTask();

                    break;
                } else {
                    showNotification("❌ Textarea atau tombol kirim tidak ditemukan");
                    isCommenting = false;
                    kondisiStop = false
                }

                return;
            }
        }
    }

}

async function botArticle(mutatin) {
    if(kondisiStop)return;
    for (const mutation of mutatin) {
        for (const node of mutation.addedNodes) {
            if (node.nodeType !== 1) continue;
            // Lewati jika ada role dialog
            if (node.closest?.('[role="dialog"]')) continue;
            const artikelBaruSet = new Set();
            if (node.matches?.('[data-tracking-duration-id]')) {
                artikelBaruSet.add(node);
            }
            const descendants = node.querySelectorAll?.('[data-tracking-duration-id]');
            if (descendants) {
                descendants.forEach(el => artikelBaruSet.add(el));
            }
            artikelBaruSet.forEach((artikel) => {
                const text = artikel.textContent || "";
                if (/(\bBaru saja\b|\b[1-5] menit\b)/.test(text)) {
                    const namafb = artikel.getElementsByTagName("span")[0];
                    const isadminer = artikel.querySelector("[data-focusable]");
                    const ThePost = artikel;
                    const commentbox = artikel.getElementsByClassName('native-text');
                    if (CekBacklist(ThePost.textContent.toLowerCase())) return;
                    if (!CekKeyword(ThePost.textContent.toLowerCase())) return;
                    const author = namafb?.textContent?.toLowerCase() || "";

                    if (isAdmin(author) || isadminer?.textContent?.toLowerCase().includes("admin") || isadminer?.textContent?.toLowerCase().includes("moderator")) {
                        const tombolKirim = Array.from(commentbox).find(el => {
                            const t = el.textContent.toLowerCase();
                            return t.includes("jawab") || t.includes("tulis") || t.includes("komentari") || t.includes("postingan") || t.includes("beri");
                        });
                        console.log(`✅ "Admin Di Temukan`);
                        if (tombolKirim ) {
                            console.log("TextBox komentar ditemukan:", tombolKirim);
                            function klikTextboxJikaSiap() {
                                tombolKirim.click();
                                const textbox = document.querySelector(".multi-line-floating-textbox");
                                if (textbox) {
                                    stopRefresh()
                                    myObserver.disconnect();
                                    observercontetn.disconnect();
                                    console.log("✅ TextBox komentar Telah DI Klik & Muncul");
                                    forceOffRefresh = true;
                                    return;
                                }
                                requestAnimationFrame(klikTextboxJikaSiap);
                            }
                            klikTextboxJikaSiap();
                        }
                    }
                }
            });
        }
    }
}
cekArticle()
tungguMentionsContainer()

function stopRefresh() {
    if (myrefresh !== null) {
        clearInterval(myrefresh);
        myrefresh = null;
    }
}

let myrefresh = null;
function mulaiRefresh() {
    if (myrefresh !== null) return; // Hindari duplikat interval

    myrefresh = setInterval(function () {
        var urutkan = document.querySelectorAll("[data-mcomponent='ServerTextArea']");
        var waktupost = document.getElementsByClassName("native-text");

        if (!document.querySelectorAll("[role='presentation']")[0]) {
            if (document.readyState === "complete") {
                for (var cok = 0; cok < urutkan.length; cok++) {
                    if (urutkan[cok].textContent.includes("URUTKAN")) {
                        cekTombolUrutkan = true;
                        if (forceOffRefresh === true) {
                            clearInterval(myrefresh);
                            myrefresh = null;
                            return;
                        }
                        urutkan[cok].click();
                    }
                }
            }
        }
    }, refresh * 10);
}

function showNotification(message) {
    const notif = document.createElement("div");
    notif.textContent = message;
    notif.style.position = "fixed";
    notif.style.bottom = "20px";
    notif.style.right = "20px";
    notif.style.padding = "10px 20px";
    notif.style.backgroundColor = "#4caf50";
    notif.style.color = "white";
    notif.style.borderRadius = "5px";
    notif.style.zIndex = 9999;
    notif.style.fontSize = "16px";
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 15000);
}

setTimeout(() => {
    mulaiRefresh()
}, 5000);

function startAutoTask() {
    let myObservere = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType !== 1) continue; // Bukan elemen
                if (node.nodeType === 1 && node.textContent.toLowerCase().includes('diposting')||node.textContent.toLowerCase().includes('berhasil')) {
                    location.href = "about:blank";
                }
            }
        }
    });
    myObservere.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => {
        location.href = "about:blank";
    }, 10000);
}

var SCRIPT_NAME = Comment18
var TELEGRAM_TOKEN = '7479985104:AAF-ISIxbf18g_mOasLoubBwBKgkfSFzzAw'; // GANTI
var TELEGRAM_CHAT_ID = '983068551'; // GANTI

let lastMessageSent = ""; // lokal per tab/browser
var sudahkirim = false
function normalizeText(text) {
    return text
        .trim()
        .replace(/\s+/g, ' ') // ubah tab/newline menjadi satu spasi
        .toLowerCase(); // biar lebih toleran
}

// Fungsi menghitung jarak Levenshtein
function levenshtein(a, b) {
    const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
    for (let j = 1; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b[i - 1] === a[j - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // substitusi
                    matrix[i][j - 1] + 1,// tambah
                    matrix[i - 1][j] + 1 // hapus
                );
            }
        }
    }
    return matrix[b.length][a.length];
}

// Kirim ke Telegram, dengan deteksi spam berbasis kemiripan
async function sendToTelegram(message) {
    if (sudahkirim) return;
    const fullMessage = `📡 [${SCRIPT_NAME}]\n${message}`;
    const normalizedMessage = normalizeText(fullMessage);

    const lastSent = await GM.getValue("lastTelegramMessage", "");
    const normalizedLast = normalizeText(lastSent);

    const lastTime = await GM.getValue("lastTelegramTime", 0);
    const now = Date.now();
    const COOLDOWN = 5 * 60 * 1000; // 5 menit

    const distance = levenshtein(normalizedMessage, normalizedLast);
    const similarity = 1 - distance / Math.max(normalizedMessage.length, normalizedLast.length);

    const SIMILARITY_THRESHOLD = 0.95; // 95% mirip → dianggap sama

    if (similarity >= SIMILARITY_THRESHOLD && (now - lastTime < COOLDOWN)) {
        console.log("⏱️ Duplikat dicegah (mirip & <5 menit):", similarity);
        return;
    }

    GM_xmlhttpRequest({
        method: "GET",
        url: `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(fullMessage)}`,
        onload: function (res) {
            sudahkirim = true
            console.log("✅ Telegram terkirim:", res.responseText);
            GM.setValue("lastTelegramMessage", fullMessage);
            GM.setValue("lastTelegramTime", now);
            GM.setValue("lastTelegramSame", now);
        },
        onerror: function (err) {
            console.error("❌ Gagal kirim ke Telegram:", err);
        }
    });
}

async function cekMasalah() {
    try {
        const now = Date.now();
        const COOLDOWNPostingan = 60 * 60 * 1000; // 5 menit
        const lastTimepost = await GM.getValue("lastTelegramSame", 0);

        if ((now - lastTimepost < COOLDOWNPostingan)) {
             console.log("⏱️ sudah dikirim sse jam yang lalu");
            return;
        }else{
             GM.setValue("lastTelegramSame", 0);
        }

        const elem = document.querySelectorAll("[data-screen-key-action-ids]")[1];
        if (!elem) return;

        const dialog = elem.getElementsByClassName("dialog-vscroller")[0];
        if (!dialog) return;

        const isi = dialog.textContent.toLowerCase();
        if (isi.includes("masalah")) {
            const cleanText = dialog.textContent.trim();
            await sendToTelegram(`🛑 Ada "masalah":\n\n${cleanText}`);
            startAutoTask()

        }
    } catch (e) {
        console.warn("❌ Error saat cek masalah:", e);
    }
}

async function cekLogout() {
    try {
        const logoutScreen = document.getElementsByClassName("wbloks_1");
        if (logoutScreen.length > 0) {
            await sendToTelegram("⚠️ Facebook LOGOUT.");
        }
    } catch (e) {
        console.warn("❌ Error saat cek logout:", e);
    }
}
const observer = new MutationObserver(() => {
    cekMasalah();
    cekLogout();
});

observer.observe(document.body, { childList: true, subtree: true });
