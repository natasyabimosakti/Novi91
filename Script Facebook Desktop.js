// ==UserScript==
// @name         NEW UJI
// @namespace    http://tampermonkey.net/
// @version      3.270
// @description  try to take over the world!
// @updateURL    https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Manyut/Manyut1.js
// @downloadURL  https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Manyut/Manyut1.js
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



var namagroup1 = 'TOYIB';
var Comment1 = 'Semangat';
var namagroup2 = 'BUKU';
var Comment2 = 'IYATOTO HONOS112 17*84*50';
var namagroup3 = 'TIKTAK';
var Comment3 = 'Tiktaktogel / HORESU14 / 08 , 14 , 33';
var namagroup4 = 'G41B';
var Comment4 = 'GAIB4D=HONDANG41=29*74*04';
var namagroup5 = 'KEITOGEL';
var Comment5 = '#keitogel = (HOMOGEN12) = 96*83*68';
var namagroup6 = 'Papuatoto';
var Comment6 = '#PAPUATOTO=(HOCIANG12)=19-59';
var namagroup7 = '453P VIP';
var Comment7 = 'ASEPTOGEL HORE713 25*85*67';
var namagroup8 = 'MENARA';
var Comment8 = '#MENARA4D=HOPRET303= 01*44';
var namagroup9 = 'G1LA';
var Comment9 = 'GILA4D=HONOS112=56*58*49';
var namagroup10 = 'GROUP LOMBA ANGKA';
var Comment10 = '#JNETOTO(HOMOGEN12)*18*52*36';
var namagroup11 = 'TOYIB';
var Comment11 = '#TOYIBSLOT ( HOJOL134 ) : 00*20*30';
var namagroup12 = 'MASTER KUY';
var Comment12 = 'TOGELKUY HONANI41 94*43*12';
var namagroup13 = 'KOI';
var Comment13 = '#KOITOTO ( HOJOL134 ) 40*92';
var namagroup14 = 'ANGKER';
var Comment14 = 'ANGKER4D=HOPRET303=11*45*66';
var namagroup15 = 'VESPA';
var Comment15 = 'VESPATOGEL (HOKINANN) 05*48*91';
var namagroup16 = 'NEMO';
var Comment16 = 'NEMO4D (HOPRET303) : 70*54*91';
var namagroup17 = 'KIKO';
var Comment17 = '#KIKOTOTO (HONOS112) = 57*07';

var namagroup18 = 'Jawatengah';
var Comment18 = 'Group Manyut 1';


var refresh = 40;
var URLADMIN = "https://raw.githubusercontent.com/natasyabimosakti/ADMIN/main/Admin_group_Lama.json"
var keyword = ["ROOM","𝗥𝗢𝗢𝗠","LOMBA","𝗟𝗢𝗠𝗕𝗔","𝐋𝐎𝐌𝐁𝐀","LIMBA","ROM","R00M","login","𝐑𝐎𝐎𝐌","HONGKONG","SINGAPUR","nemo","l0mb4","lomb4","l0mba"]
var Backlist =["pemenang lomba","rekap","natidulu","room lomba freebet","prediksi","result","juara lomba","r3k4p","r3kap","rek4p"]
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
var berhasilKomentar = false;

async function scrollLoop5x() {
    let feeds;

    // Tunggu maksimal 3 detik hingga feed muncul
    for (let i = 0; i < 60; i++) {
        feeds = document.querySelector('[role="feed"]');
        if (feeds) break;
        await new Promise(r => setTimeout(r, 50));
    }

    if (!feeds) {
        console.warn("❌ [role='feed'] tidak ditemukan!");
        return;
    }

    // Tunggu hingga postingan di dalam feed muncul
    for (let i = 0; i < 60; i++) {
        if (feeds.querySelectorAll("[aria-posinset]").length > 0) {
            break;
        }
        await new Promise(r => setTimeout(r, 50));
    }

    for (let i = 0; i < 60; i++) {
        feeds = document.querySelector('[role="feed"]');
        if (document.location.href.includes("groups")) {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
        if (feeds.querySelectorAll("[aria-posinset]").length > 1) {
            if (!berhasilKomentar) {
                location.reload();
            }

            break;
        }
        await new Promise(r => setTimeout(r, 50));
    }


}
scrollLoop5x()

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
                    loadLocalAdmin();
                    tungguGroupPastiCepat();
                } else {
                    console.log("⏩ Admin list is up-to-date (version:", currentVersion + ")");
                    loadLocalAdmin();
                    tungguGroupPastiCepat();
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

fetchAdminListFromGitHub();

function getCommentForGroup() {
    const ceknamagroup = document.querySelector(".html-h1")?.textContent || '';
    const commentMap = {
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

    for (let groupName in commentMap) {
        if (ceknamagroup.includes(groupName)) {
            return { groupName, comment: commentMap[groupName] };
        }
    }
    return null;
}

function tungguGroupPastiCepat() {
    const interval = setInterval(() => {
        const el = document.querySelector(".html-h1");
        const text = el?.textContent?.trim() || '';

        if (text.length > 3) {
            const result = getCommentForGroup();
            if (result) {
                commentToPost = result.comment;
                grouptToPost = result.groupName;
                console.log("✅ Nama grup : " + grouptToPost + " | Comment : " + commentToPost);
                clearInterval(interval); // stop polling
                manageGroups()
            } else {
                console.log("⏳ Nama grup belum cocok:", text);
            }
        }
    }, 1); // cek tiap 200ms
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
        location.href = "about:blank";
        return;

    }else{
        GasKomment()
    }
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


function isAdmin(name) {
    console.log("Cek Admin");
    if (!adminListReady || !name) return false;
    return adminList.some(admin => name.toLowerCase().includes(admin.toLowerCase()));
}



function cariLabelDalamProps(obj, visited = new Set()) {
    if (!obj || typeof obj !== "object") return null;
    if (visited.has(obj)) return null;
    visited.add(obj);

    try {
        if (typeof obj.label === "string") {
            return obj.label;
        }

        if (Array.isArray(obj)) {
            for (const item of obj) {
                const hasil = cariLabelDalamProps(item, visited);
                if (hasil) return hasil;
            }
        } else {
            const keys = Object.keys(obj);
            for (const key of keys) {
                const val = obj[key];
                if (typeof val === "object") {
                    const hasil = cariLabelDalamProps(val, visited);
                    if (hasil) return hasil;
                }
            }
        }
    } catch (e) {}

    return null;
}

function ambilLabelDariReactFiber(el) {
    for (const key in el) {
        if (key.startsWith("__reactFiber$")) {
            const fiber = el[key];
            const props = fiber?.memoizedProps;
            const label = cariLabelDalamProps(props);
            if (label && /^(Baru saja|\b[1-5]\s*(menit|mnt)\b)/i.test(label)) {
                return label;
            }
        }
    }
    return null;
}

function GasKomment(){

    let scrollCount = 0;
    const MAX_SCROLL = 5; // Maksimal scroll ke bawah
    var feed = document.querySelector('[role="feed"]');
    if(feed) {
        // Scroll otomatis untuk load lebih banyak postingan
        if (scrollCount < MAX_SCROLL) {
            window.scrollBy(0, 600); // Scroll ke bawah
            scrollCount++;
            console.log(`🔽 Scroll ke-${scrollCount} untuk load postingan tambahan...`);
        }

        for (let i = 0; i < feed.children.length; i++) {
            const postChild = feed.children[i];

            let sudahCetak = false;

            postChild.querySelectorAll("span").forEach(el => {
                if (sudahCetak) return; // Skip kalau sudah ditampilkan
                const label = ambilLabelDariReactFiber(el);
                if (label) {
                    const isi = postChild.querySelector("[data-ad-rendering-role='story_message']")?.textContent?.toLowerCase();
                    const adminnya = postChild.querySelector("[data-ad-rendering-role='profile_name']")?.textContent?.toLowerCase();
                    console.log(`⏱️ [${i}] Waktu ditemukan:`, label);
                    console.log(`⏱️ [${i}] Admin:`, adminnya);
                    console.log(`⏱️ [${i}] Postingan:`, isi);
                    sudahCetak = true; // Supaya tidak cetak berulang
                    console.log("Akan Comment",commentToPost,"dan Index", i);



                    console.log("Cek Backlist");
                    if (CekBacklist( isi)) return;
                    console.log("Cek Keyword");
                    if (!CekKeyword( isi)) return;
                    if (isAdmin(adminnya)){
                        console.log("Admin di temukan dalam list");
                        pasteTextToFacebookComment(commentToPost,i-1);
                        SaveStat()
                        berhasilKomentar = true;
                    }
                }
            });
        }

    }
}

async function SaveStat(){
    await GM.setValue("group_" + grouptToPost, true);
    await GM.setValue("group_"+grouptToPost+"_expire", Date.now() + EXPIRATION_MS);
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



async function pasteTextToFacebookComment(text,index) {
    let commentBox = null;
    for (let i = 0; i < 30; i++) {
        await new Promise(r => setTimeout(r, 100));
        const boxes = document.querySelectorAll('[contenteditable="true"]');
        if (boxes.length > index) {
            commentBox = boxes[index];
            break;
        }
    }

    var commentinset = document.querySelectorAll("[data-ad-rendering-role='comment_button']")[index]
    for (let i = 0; i < 30; i++) {
        await new Promise(r => setTimeout(r, 50));
        if (commentBox || commentinset) break;
    }
    if (!commentBox && commentinset ) {
        console.log("Comment box not found gunakan cara klik");
        commentinset.click()
        return;
    }
    console.log("Comment box Di temukan dan comment ",text, "index ", index);

    // Buat event paste manual dengan data yang ingin dipaste
    console.log("Mulai dispatchEvent Paste")
    for (let i = 0; i < 30; i++) {
        console.log(commentBox);
        await new Promise(r => setTimeout(r, 50));
        if (commentBox) break;
    }
    commentBox.focus();
    commentBox.click();
    var clipboardData = new DataTransfer();
    clipboardData.setData('text/plain', text);

    var pasteEvent = new ClipboardEvent('paste', {
        bubbles: true,
        cancelable: true,
        clipboardData: clipboardData
    });

    commentBox.dispatchEvent(pasteEvent);
    await new Promise(r => setTimeout(r, 5));
    //tampilkan Tombol
    // 1. Fokus dan klik agar React mengenali interaksi
    commentBox.focus();
    commentBox.click();
    commentBox.dispatchEvent(new Event("focus", { bubbles: true }));
    // Tunggu UI update
    await new Promise(r => setTimeout(r, 1));

    //Klik Tombol Kirim
    var sendBtn = document.querySelector('#focused-state-composer-submit [role="button"][tabindex="0"]');
    if (sendBtn) {
        sendBtn.click();
        console.log('Komentar terkirim!');
        showNotification("Komentar di kirim "+text)
        setTimeout(() => {
            location.href = "about:blank";
        }, 8000);
        return;
    } else {
        console.log('Tombol kirim tidak ditemukan');
    }
}



async function InsertComment(text) {
    const observer = new MutationObserver(() => {
        console.log("✅ Ditemukan: html-h2 mengandung 'postingan'");
        const target1 = document.querySelector(".__fb-light-mode");
        const target2 = target1.querySelector("[role='dialog']");
        if (target2) {
            const allEditors = target2.querySelectorAll("[data-lexical-editor]");
            const lastEditor = allEditors[allEditors.length - 1];
            if (lastEditor) {
                lastEditor.focus();
                const clipboardData = new DataTransfer();
                clipboardData.setData('text/plain', text);

                const pasteEvent = new ClipboardEvent('paste', {
                    bubbles: true,
                    cancelable: true,
                    clipboardData: clipboardData
                });

                lastEditor.dispatchEvent(pasteEvent);
                lastEditor.focus();
                lastEditor.click();
                const sendBtn = target2.querySelector('#focused-state-composer-submit');

                if (sendBtn) {
                    observer.disconnect();
                    const intervalId = setInterval(() => {
                        sendBtn.click()
                        console.log("✅ caek");
                        const sendBtn2 = document.querySelector('#focused-state-composer-submit [role="button"][tabindex="0"]');
                        if (sendBtn2) {
                            sendBtn2.click()
                            showNotification("Komentar di kirim "+text)
                            clearInterval(intervalId)
                            setTimeout(() => {
                                location.href = "about:blank";
                            }, 8000);
                        }
                    }, 1);
                }
                console.log("✅ Paste dilakukan ke editor terakhir");
            }
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}
