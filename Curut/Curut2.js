// ==UserScript==
// @name         NEW CURUT2
// @namespace    http://tampermonkey.net/
// @version      3.192
// @description  try to take over the world!
// @updateURL    https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Curut/Curut2.js
// @downloadURL  https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Curut/Curut2.js
// @author       You
// @match        http*://*/*
// @run-at       document-end
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        window.close
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// ==/UserScript==



var namagroup1 = 'SHIOKELINCI';
var Comment1 = '#shiokelinci4d*BOCHOK52*71*96'; 

var namagroup2 = 'BUKU';
var Comment2 = 'IYATOTO BOCHI92 78*46*77'; 

var namagroup3 = 'TIKTAK';
var Comment3 = 'Tiktaktogel / BODAR17 / 67 , 98 , 05'; 

var namagroup4 = 'GAIB';
var Comment4 = 'GAIB4D=BOCHOK36=02*09*60'; 

var namagroup5 = 'KEITOGEL';
var Comment5 = '#keitogel = (BONTIR36) = 58*88*41'; 

var namagroup6 = 'KIOS';
var Comment6 = 'KIOSTOTO=BROTO15=11*20*83'; 

var namagroup7 = '453P VIP';
var Comment7 = 'ASEPTOGEL BOMER14 33*92*66'; 

var namagroup8 = 'MENARA';
var Comment8 = '#MENARA4D=BOMER14= 12*86'; 

var namagroup9 = 'GIL4';
var Comment9 = 'GILA4D=BOLET25=12*86*68'; 

var namagroup10 = 'JNE';
var Comment10 = '#JNETOTO(BOSIOM19)*33*92*66'; 

var namagroup11 = 'TOYIB';
var Comment11 = '#TOYIBSLOT ( BOKONG71 ) : 11*20*38'; 

var namagroup12 = 'MASTER KUY';
var Comment12 = 'TOGELKUY BORAK16 58*88*38'; 

var namagroup13 = 'KOI';
var Comment13 = '#KOITOTO ( BOKONG71 ) 02*09'; 

var namagroup14 = 'ANGKER';
var Comment14 = 'ANGKER4D=BONTOK69=67*98*05'; 

var namagroup15 = 'VESPA';
var Comment15 = 'VESPATOGEL (BOCHO19) 78*46*77'; 

var namagroup16 = 'Nemo';
var Comment16 = 'NEMO4D (BOSIOM19) : 71*96*75'; 

var namagroup17 = 'KIKO';
var Comment17 = '#KIKOTOTO (BORATU19) = 41*83';

var namagroup18 = 'Jawatengah';
var Comment18 = 'Group Cur 2';



var refresh = 40;
var URLADMIN = "https://raw.githubusercontent.com/natasyabimosakti/ADMIN/main/Admin_group_Lama.json"
var keyword = ["ROOM","𝗥𝗢𝗢𝗠","LOMBA","𝗟𝗢𝗠𝗕𝗔","𝐋𝐎𝐌𝐁𝐀","LIMBA","ROM","R00M","login","𝐑𝐎𝐎𝐌","HONGKONG","SINGAPUR","nemo"]
var Backlist =["pemenang lomba","rekap","natidulu","room lomba freebet","prediksi","result","juara lomba"]
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

                    GM.setValue("group_" + grouptToPost, true);
                    GM.setValue("group_"+grouptToPost+"_expire", Date.now() + EXPIRATION_MS);
                    console.log("✅ Komentar DIKIRIM (via dispatch):", commentToPost);
                    showNotification("Komentar Sudah Terkirim : " + commentToPost);
                    isCommenting = true;

                    kondisiStop = true
                    observercomment.disconnect();
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
