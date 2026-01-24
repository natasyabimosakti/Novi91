// ==UserScript==
// @name         JAGO 1
// @namespace    http://tampermonkey.net/
// @version      3.73
// @description  try to take over the world!
// @updateURL    https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Jago/Jago1.js
// @downloadURL  https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Jago/Jago1.js
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



var namagroup18 = 'Jawatengah';
var Comment18 = 'jago1';



var URLGROUP = `https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Comment/${Comment18}.json`;
var SCRIPT_NAME = Comment18
var refresh = 20;
var URLADMIN = "https://raw.githubusercontent.com/natasyabimosakti/ADMIN/refs/heads/main/Admin_group_Baru.json"
var keyword = ["ROOM", "𝗥𝗢𝗢𝗠", "LOMBA", "𝗟𝗢𝗠𝗕𝗔", "𝐋𝐎𝐌𝐁𝐀", "LIMBA", "ROM", "R00M", "login", "𝐑𝐎𝐎𝐌", "HONGKONG", "SINGAPUR", "nemo", "l0mb4", "lomb4", "l0mba", "𝗥𝟬𝟬𝗠", "𝗟𝟬𝗠𝗕𝗔", "𝘙𝘖𝘖𝘔", "hatori", "klikh4tori001"]
var Backlist = ["pemenang lomba", "rekap", "natidulu", "room lomba freebet", "prediksi", "result", "juara lomba", "r3k4p", "r3kap", "rek4p", "undang"]
let adminPrefixSet = null;

let countA = 0;
let sedangProsesAktivitas = false;
let ObserverKlikAktitas = null;
let sedangProses = false;
let sedangKlikUrutkan = false;
let adminList = [];
const LOCAL_KEY = "cachedAdminList";
const VERSION_KEY = "cachedAdminVersion";
var commentToPost = '';
var grouptToPost = '';
var now = Date.now();
var EXPIRATION_MS = 1 * 60 * 1000; // 5 minutes
var URLINI = "";
// Global arrays / variabel yang sebelumnya hardcode
var groupNames = [];
var CommentList = [];
var intervalURUTKAN = null;
var commentDone = false;
var groups = [];
var observersudahjalam = false;
// Fungsi ambil data grup
async function fetchGroupsFromGitHub() {
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: "GET",
            url: URLGROUP,
            onload: function (response) {
                try {
                    const data = JSON.parse(response.responseText);

                    // --- Ambil data dari GitHub ---
                    data.forEach((item, index) => {
                        const groupVarName = `namagroup${index + 1}`;
                        const commentVarName = `Comment${index + 1}`;

                        window[groupVarName] = item.group;
                        window[commentVarName] = item.comment;

                        groupNames.push(normalizeToBasicLatin(item.group).toLowerCase());
                        CommentList.push(item.comment);
                    });

                    // --- Data lokal hardcode ---
                    const localGroups = [
                        { group: namagroup18, comment: Comment18 }
                    ];

                    localGroups.forEach((item, idx) => {
                        const localIndex = data.length + idx + 1;
                        const groupVarName = `namagroup${localIndex}`;
                        const commentVarName = `Comment${localIndex}`;

                        window[groupVarName] = item.group;
                        window[commentVarName] = item.comment;

                        // --- Push ke array global supaya bisa dipakai observer ---
                        groupNames.push(normalizeToBasicLatin(item.group).toLowerCase());
                        CommentList.push(item.comment);
                    });

                    console.log("✅ Group list berhasil diambil (GitHub + Lokal):", groupNames.length);

                    // --- Tunggu observer menemukan grup ---
                    tungguGroupAsync().then(res => {
                        if (res) {
                            console.log("✅ Comment siap untuk grup:", res.grouptToPost, res.commentToPost);
                        } else {
                            console.warn("⚠️ Tidak ada grup ditemukan dalam 15 detik.");
                        }
                        resolve();
                    });

                } catch (e) {
                    console.error("❌ Gagal parse JSON grup:", e);
                    reject(e);
                }
            },
            onerror: function (err) {
                console.error("❌ Gagal ambil grup dari GitHub:", err);
                reject(err);
            }
        });
    });
}


// ===== Fungsi klik tombol by text sederhana =====


function getCommentForGroup() {
    const commentMap = {};
    for (let i = 0; i < groupNames.length; i++) {
        commentMap[groupNames[i]] = normalizeToBasicLatin(CommentList[i]);
    }

    const ceknamagroup = document.getElementsByClassName("fixed-container")[0]?.textContent || '';
    const ceknamagroup1 = document.getElementsByClassName('native-text')[5]?.textContent || '';
    const ceknamagroup2 = document.getElementsByClassName('native-text')[6]?.textContent || '';
    const ceknamagroup3 = document.getElementsByClassName('native-text')[7]?.textContent || '';
    const ceknamagroup4 = document.getElementsByClassName('native-text')[8]?.textContent || '';

    const allGroups = [
        normalizeToBasicLatin(ceknamagroup).toLowerCase(),
        normalizeToBasicLatin(ceknamagroup1).toLowerCase(),
        normalizeToBasicLatin(ceknamagroup2).toLowerCase(),
        normalizeToBasicLatin(ceknamagroup3).toLowerCase(),
        normalizeToBasicLatin(ceknamagroup4).toLowerCase()
    ];

    for (let groupName in commentMap) {
        if (allGroups.some(text => text.includes(groupName))) {

            return { groupName, comment: commentMap[groupName] };
        }
    }
    return null;
}

function normalizeToBasicLatin(str) {
    return str.replace(/[\u{1D400}-\u{1D7FF}]/gu, (ch) => {
        const boldA = 0x1D400;
        const normalA = 0x41; // ASCII A
        let code = ch.codePointAt(0);
        if (code >= boldA && code <= boldA + 25) {
            return String.fromCharCode(normalA + (code - boldA));
        }
        return ch;
    });
}

function addLocalGroups() {
    // ambil semua variabel lokal yang ada pola namagroupX / CommentX
    for (let i = 17; i <= 18; i++) {
        const groupVarName = normalizeToBasicLatin(`namagroup${i}`);
        const commentVarName = `Comment${i}`;

        const group = window[groupVarName];
        const comment = window[commentVarName];

        if (group && comment) {
            groupNames.push(normalizeToBasicLatin(group).toLowerCase());
            CommentList.push(comment);
        }
    }
}

function normalizeFB(t) {
    return t
        .normalize("NFKD")
        .replace(/\p{Diacritic}/gu, '')
        .replace(/[\u200B-\u200F\u202A-\u202E]/g, '')
        .replace(/[\uE000-\uF8FF]/g, '')
        .replace(/\s+/g, ' ')
        // ⬇️ fix boundary facebook
        .replace(/([a-z])(?=(baru|menit|detik|jam|hari)\b)/gi, '$1 ')
        .trim()
        .toLowerCase();
}




function loadLocalAdmin() {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) {
        try {
            adminList = JSON.parse(stored);
            console.log("✅ Admin list loaded from localStorage:", adminList.length, "names");
        } catch (e) {
            console.error("❌ Failed to parse local admin list:", e);
        }
    }
}

function fetchAdminListFromGitHub() {
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: "GET",
            url: URLADMIN,
            onload: function (response) {
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
                    } else {
                        console.log("⏩ Admin list is up-to-date (version:", currentVersion + ")");
                        adminList = JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];
                    }

                    resolve(adminList); // ✅ resolve setelah data siap
                } catch (e) {
                    console.error("❌ Failed to parse remote admin list:", e);
                    reject(e);
                }
            },
            onerror: function (err) {
                console.error("❌ Failed to load admin list from GitHub:", err);
                reject(err);
            }
        });
    });
}


async function getAdminsUntilSuccess() {
    while (true) {
        try {
            const admins = await fetchAdminListFromGitHub();
            if (admins && admins.length > 0) {
                console.log("Admin list berhasil diambil:", admins);
                return admins; // selesai
            }
        } catch (e) {
            console.warn("Gagal ambil admin list, coba lagi...");
        }

        await new Promise(res => setTimeout(res, 3000)); // tunggu 3 detik sebelum retry
    }
}

// penggunaan:
const admins = await getAdminsUntilSuccess();



function klikTombolByText(teks) {
    if (commentDone) return;

    if (sedangProses) return false; // jangan klik kalau dialog muncul
    if (sedangKlikUrutkan) return false;
    const tombol = Array.from(document.querySelectorAll('[role="button"], [tabindex="0"]'))
        .find(el => el.textContent.trim() === teks);
    if (tombol) {
        tombol.click();
        console.log(`✅ Klik tombol "${teks}"`);
        Mutation_cekArticle()

        return true;
    }
    return false;
}

// ===== Tunggu tombol URUTKAN muncul =====



// ===== Observasi tombol Aktivitas terbaru / Postingan baru =====
function handleAktivitasNode(node) {
    if (commentDone) return;

    if (sedangProsesAktivitas) return;
    sedangProsesAktivitas = true;

    // Klik Postingan Baru hingga countA < 3
    let clicked = false;
    const tombol = node.querySelectorAll("[role='button']");
    for (const btn of tombol) {
        if (countA < 3 && btn.textContent.includes("Postingan baru") && btn.offsetParent !== null) {
            btn.click();
            countA++;
            clicked = true;
            break;
        }
    }

    // Jika sudah 3 klik, klik Aktivitas Terbaru
    if (!clicked) {
        setTimeout(() => {
            const t = [...node.querySelectorAll("[role='button']")].find(b => b.textContent.includes("Aktivitas terbaru") && b.offsetParent !== null);
            if (t) {
                t.click();
                countA = 0;
            }
            sedangProsesAktivitas = false;
        }, 500);
    } else {
        // tunggu minimal 300ms sebelum bisa klik lagi
        setTimeout(() => {
            sedangProsesAktivitas = false;
        }, 300);
    }

}

// ===== Observasi Aktivitas terbaru =====
function observeAktivitas() {

    let myObserver = null;
    myObserver = new MutationObserver((mutations) => {
        if (commentDone) return;

        if (document.location.href.includes("group")) {
            for (const mutation of mutations) {
                for (const node of mutation.addedNodes) {
                    if (node.nodeType !== 1) continue; // Bukan elemen
                    const text = node.textContent || "";
                    if (text.includes("Aktivitas terbaru")) {
                        const tombol = node.querySelectorAll("[role='button']");
                        if (tombol.length >= 2) {
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
        }
    });
    myObserver.observe(document.body, { childList: true, subtree: true });

}



// ===== Pantau dialog =====
function observeDialog() {
    const dialogObserver = new MutationObserver(() => {
        const dialog = document.querySelector('[role="dialog"]');
        const pesentation = document.querySelector('[role="presentation"]');
        const dailog2 = document.querySelector(".dialog-vscroller");
        if (pesentation || dailog2) {
            sedangKlikUrutkan = true; // dialog muncul, jangan klik URUTKAN
        } else {
            sedangKlikUrutkan = false; // dialog hilang, bisa klik URUTKAN lagi
        }
        if (dialog) {
            sedangProses = true; // dialog muncul, jangan klik URUTKAN
        } else {
            sedangProses = false; // dialog hilang, bisa klik URUTKAN lagi
        }

    });
    dialogObserver.observe(document.body, { childList: true, subtree: true });
}

function Random(comment) {
    const numberRegex = /\d{2}/g;
    const rawNumbers = [...comment.matchAll(numberRegex)];

    // Saring hanya angka yang tidak melekat dengan huruf di kiri atau kanan
    const validNumbers = rawNumbers.filter(match => {
        const i = match.index;
        const before = comment[i - 1] || '';
        const after = comment[i + 2] || '';
        return !(/[a-z0-9]/i.test(before)) && !(/[a-z]/i.test(after));
    });

    if (validNumbers.length < 2) return comment;

    const lastCount = Math.min(3, validNumbers.length);
    const lastNums = validNumbers.slice(-lastCount);
    const separators = [];
    for (let i = 0; i < lastCount - 1; i++) {
        separators.push(comment.slice(lastNums[i].index + 2, lastNums[i + 1].index));
    }

    const angka = lastNums.map(x => x[0]);

    function shuffleArray(arr) {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    const rotated = lastCount === 2
        ? [angka[1], angka[0]]
        : shuffleArray(angka);

    const start = comment.slice(0, lastNums[0].index);
    const end = comment.slice(lastNums[lastCount - 1].index + 2);

    let result = start;
    for (let i = 0; i < lastCount; i++) {
        result += rotated[i];
        if (i < lastCount - 1) result += separators[i];
    }
    result += end;

    return result;
}

function closeDialogFast() {
    const css = `
    .loading-overlay.revamped {
      display: none !important;
      opacity: 0 !important;
      pointer-events: none !important;
      visibility: hidden !important;
    }
  `;
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
    const closeBtn = document.querySelector('[role="dialog"]');
    if (closeBtn) {
        closeBtn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        closeBtn.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
        closeBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        return true;
    }
    return false;
}


function waitCommentReady(callback) {
    function check() {
        if (commentToPost && commentToPost.trim().length > 0) {
            callback(commentToPost);
        } else {
            requestAnimationFrame(check);
        }
    }
    check();
}



function parsePost(artikels) {
    if (commentDone) return;

    console.log("Cek Content")

    const postingan = artikels.textContent || "";
    const texts = postingan
    const namafb = artikels.getElementsByTagName("span")[0];
    const author = namafb?.textContent?.toLowerCase() || "";
    const isadminer = artikels.querySelector("[data-focusable]");
    const adminText = isadminer?.textContent?.toLowerCase() || "";
    const isBaru = texts.includes("Baru saja") || texts.includes("Baru");
    const isMenit = /\b[0-9]\s*menit\b/.test(texts);





    const isAdmins = isAdminFast(author) || adminText.includes("admin") || adminText.includes("moderator");

    console.log(commentToPost);
    console.log("﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌")
    if (!isAdmins) return false;
    console.log("✅admin Benar")
    if (!(isBaru || isMenit)) return false;
    console.log("✅ Jam Baru Ditemukan")
    if (CekBacklist(postingan.toLowerCase())) {
        console.log("❌ ada Backlist")
        return false;
    }
    console.log("✅Tidak ada Backlist")
    if (!CekKeyword(postingan.toLowerCase())) return false;
    console.log("✅Keywoard di temukan")
    console.log("💗᪲᪲᪲ Pengecekan Suksess")
    console.log("﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌")

    return true;
}
async function tungguGroupAsync() {
    const start = Date.now();
    while (Date.now() - start < 15000) { // 15 detik timeout
        const result = getCommentForGroup();
        if (result) {
            commentToPost = Random(result.comment);
            grouptToPost = result.groupName;
            console.log("✅ Nama grup : " + grouptToPost + " | Comment : " + commentToPost);
            groups = groupNames.map(groupId => ({ groupId, defaultValue: false }));
            await manageGroups();
            return { commentToPost, grouptToPost };
        }
        await new Promise(r => setTimeout(r, 500));
    }
    console.warn("⚠️ Timeout tunggu grup.");
    return null;
}




var sudahDiPanggil = false
async function manageGroups() {
    const now = Date.now(); // update timestamp terbaru
    for (const { groupId, defaultValue } of groups) {
        const key = `group_${groupId}`;
        const expireKey = `${key}_expire`;
        const expireAt = await GM.getValue(expireKey, 0);

        console.log(`🔹 Grup: ${groupId} | now: ${now} | expireAt: ${expireAt}`);

        if (now > expireAt) {
            await GM.setValue(key, defaultValue);
            await GM.setValue(expireKey, now + EXPIRATION_MS);
        }
    }

    const groupKey = `group_${grouptToPost}`;
    if (groupKey === "group_") return;
    const sudahKomentar = await GM.getValue(groupKey, false);
    if (sudahKomentar) {
        console.log(`Sudah Komentar  ${now}`)
        location.href = "about:blank";
        return;
    }
}

function CekBacklist(postinganBL) {
    for (const DataBacklist of Backlist) {
        const kata = DataBacklist.toLowerCase()
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
        const kata = DataKeyword.toLowerCase()
        if (postingan.toLowerCase().includes(kata)) {
            console.log(`✅ Keyword ditemukan: "${kata}"`);
            return true;
        }
    }
    return false;
}
function cleanName(s) {
    return s
        .normalize("NFKD")
        .replace(/\p{Diacritic}/gu, '')
        .replace(/[\u200B-\u200F\u202A-\u202E]/g, '')
        .replace(/[\uE000-\uF8FF]/g, '')
        .replace(/\s+/g, '')
        .toLowerCase();
}



function isAdminFast(name) {
    const cleanedName = cleanName(name);
    return adminList.some(a => cleanedName.includes(cleanName(a)));
}


let artikelBaruSet = new Set();
let observercontetn = null;
let timeoutCollect = null;

async function Mutation_cekArticle() {
    if (!document.location.href.includes("group") || observersudahjalam) return;


    artikelBaruSet.clear();
    observersudahjalam = true;
    observercontetn = new MutationObserver(async (mutationsList) => {
        if (commentDone) return;
        await waitNoDialog();
        for (const mutation of mutationsList) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType !== 1) continue;
                if (document.querySelector(".multi-line-floating-textbox")) continue;
                if (node.matches?.('[data-tracking-duration-id]')) {
                    artikelBaruSet.add(node);
                    if (!parsePost(node)) continue; // ini SKIP hanya artikel ini

                    clearInterval(intervalURUTKAN);
                    const commentbox = node.getElementsByClassName('native-text');
                    const tombolKirim = Array.from(commentbox).find(el => {
                        const t = el.textContent.toLowerCase();
                        return t.includes("jawab") || t.includes("tulis") || t.includes("komentari") || t.includes("postingan") || t.includes("beri");
                    });
                    if (tombolKirim) {
                        tombolKirim.click();
                        console.log("Klik Untuk Komentar")
                        return;
                    }
                }

                const descendants = node.querySelectorAll?.('[data-tracking-duration-id]');
                if (descendants) {
                    descendants.forEach(el => artikelBaruSet.add(el));
                }
            }
        }

        // reset timer
        if (timeoutCollect) clearTimeout(timeoutCollect);

        timeoutCollect = setTimeout(() => {

            // scan ulang just in case FB modify innerHTML
            document.querySelectorAll('[data-tracking-duration-id]')
                .forEach(el => artikelBaruSet.add(el));

            console.log("📦 koleksi sementara:", artikelBaruSet.size);

            // belum memenuhi syarat, jangan stop observer
            if (artikelBaruSet.size < 2) {
                console.log("⏳ artikel kurang, menunggu...");
                return; // biarkan observer lanjut
            }

            console.log("🟢 artikel siap:", artikelBaruSet.size);
            observercontetn.disconnect();
            observersudahjalam = false;
            cek_artikel(artikelBaruSet);

        }, 20); // 200ms supaya batch DOM stabil
    });

    observercontetn.observe(document.body, { childList: true, subtree: true });
    console.log("🟢 Mutation_cekArticle aktif");
}

function waitNoDialog() {
    return new Promise(resolve => {
        function cek() {
            const dialog = document.querySelector('[role="dialog"], .loading-overlay');
            if (!dialog) return resolve();
            requestAnimationFrame(cek);
        }
        cek();
    });
}
async function cek_artikel(setArtikel) {
    if (commentDone) return;

    var found_artikle = false
    for (const artikel of setArtikel) {
        if (!parsePost(artikel)) continue; // ini SKIP hanya artikel ini
        found_artikle = true;
    }


    if (!found_artikle) {
        console.log("Tidak ada artikel valid, tunggu dialog hilang lalu klik URUTKAN...");
        await waitNoDialog();
        klikTombolByText("URUTKAN");
    }
}


function autoCloseRelevanDialog() {
    const closeBtn = document.querySelector('[aria-label="Tutup"]');
    if (closeBtn) {
        console.log("🔴 Close relevan dialog");
        closeBtn.click();
        return true;
    }
    return false;
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
async function komentari() {
    let myObservere = new MutationObserver((mutations) => {

        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (commentDone) return;
                if (node.nodeType !== 1) continue; // Bukan elemen
                const textarea = node.querySelector(".multi-line-floating-textbox");
                const sendBtn = node.querySelector(".textbox-submit-button");
                if (textarea && sendBtn) {
                    clearInterval(intervalURUTKAN);
                    waitCommentReady((commentToPost) => {
                        textarea.focus();
                        textarea.value = commentToPost;
                        sendBtn.disabled = false;
                        const clickEvent = document.createEvent("MouseEvents");
                        clickEvent.initEvent("mousedown", true, true);
                        sendBtn.dispatchEvent(clickEvent);
                        console.log("✅ klik Kirim")
                        var cekout = 0;
                        var cekkiment = setInterval(() => {
                            cekout++
                            if (cekout >= 100) location.reload()

                            if (document.querySelector(".snackbar-container, .loading-overlay")) {
                                clearInterval(cekkiment);
                                showNotification("Komentar Sudah Terkirim : " + commentToPost);
                                commentDone = true;
                                observercontetn.disconnect();
                                observersudahjalam = false;
                                myObservere.disconnect();
                                GM.setValue("group_" + grouptToPost, true);
                                GM.setValue("group_" + grouptToPost + "_expire", Date.now() + EXPIRATION_MS);
                                console.log("✅ Komentar DIKIRIM (via dispatch):", commentToPost);
                                ObserverCekMasalah()
                                waitNoDialog();
                                setTimeout(() => {
                                    location.href = "about:blank";

                                }, 10000);
                            }

                        }, 100)
                    });

                }

            }
        }

    });
    myObservere.observe(document.body, { childList: true, subtree: true });

}


var TELEGRAM_TOKEN = '8396728370:AAHblTLr220NEd9PwS7BzzS5VWGcxix9RK8'; // GANTI
var TELEGRAM_CHAT_ID = '-1002717306025'; // GANTI

let lastMessageSent = ""; // lokal per tab/browser
var sudahkirim = false
function normalizeText(text) {
    return text
        .trim()
        .replace(/\s+/g, ' ') // ubah tab/newline menjadi satu spasi
        .toLowerCase(); // biar lebih toleran
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
    sudahkirim = true
    const fullMessage = `? [${SCRIPT_NAME}]\n${message}`;
    const normalizedMessage = normalizeText(fullMessage);

    const lastSent = await GM.getValue("lastTelegramMessage", "");
    const normalizedLast = normalizeText(lastSent);

    const lastTime = await GM.getValue("lastTelegramTime", 0);
    const now = Date.now();
    const COOLDOWN = 5 * 60 * 1000; // 5 menit

    const distance = levenshtein(normalizedMessage, normalizedLast);
    const similarity = 1 - distance / Math.max(normalizedMessage.length, normalizedLast.length);

    const SIMILARITY_THRESHOLD = 0.95; // 95% mirip ? dianggap sama

    if (similarity >= SIMILARITY_THRESHOLD && (now - lastTime < COOLDOWN)) {
        console.log("?? Duplikat dicegah (mirip & <5 menit):", similarity);
        return;
    }

    GM_xmlhttpRequest({
        method: "GET",
        url: `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(fullMessage)}`,
        onload: function (res) {

            console.log("? Telegram terkirim:", res.responseText);
            GM.setValue("lastTelegramMessage", fullMessage);
            GM.setValue("lastTelegramTime", now);
            GM.setValue("lastTelegramSame", now);
        },
        onerror: function (err) {
            console.error("? Gagal kirim ke Telegram:", err);
        }
    });
}

async function cekLogout() {
    try {

        setTimeout(() => {
            if (document.getElementsByTagName("div").length < 10) {
                sendToTelegram("?? Facebook BLANK.");
            }
        }, 2000)
    } catch (e) {
        console.warn("? Error saat cek logout:", e);
    }
}
async function cekMasalah() {

    try {
        if (sudahkirim) return;
        const now = Date.now();
        const COOLDOWNPostingan = 60 * 60 * 1000; // 5 menit
        const lastTimepost = await GM.getValue("lastTelegramSame", 0);



        const elem = document.querySelectorAll("[data-screen-key-action-ids]")[1];
        if (!elem) return;

        const dialog = elem.getElementsByClassName("dialog-vscroller")[0];
        if (!dialog) return;

        const isi = dialog.textContent.toLowerCase();

        if ((now - lastTimepost < COOLDOWNPostingan)) {
            if (isi.includes("masalah")) {
                await sendToTelegram(`😫 Ada "Masalah":\n\n${cleanText}`);
                location.href = "https://m.facebook.com/bookmarks/"
            }
            return;
        } else {
            GM.setValue("lastTelegramSame", 0);
        }
        if (isi.includes("masalah")) {
            const cleanText = dialog.textContent.trim();
            MsgError(SCRIPT_NAME)
            await sendToTelegram(`😫 Ada "Masalah":\n\n${cleanText}`);
            location.href = "https://m.facebook.com/bookmarks/"
        }
    } catch (e) {
        console.warn("? Error saat cek masalah:", e);
    }
}

async function cekMasalah2() {
    try {
        if (sudahkirim) return;
        const now = Date.now();
        const COOLDOWNPostingan = 60 * 60 * 1000; // 5 menit
        const lastTimepost = await GM.getValue("lastTelegramSame", 0);

        if ((now - lastTimepost < COOLDOWNPostingan)) {
            return;
        } else {
            GM.setValue("lastTelegramSame", 0);
        }

        const elem = document.querySelectorAll("[data-long-click-action-id]")
        if (!elem) return;

        const adaMenunggu = Array.from(elem).some(el => el.textContent.includes("Menunggu"));

        Array.from(elem).forEach(el => {
            const text = el.textContent;
            if (text.includes("Menunggu")) {
                const before = text.split("Menunggu")[0].trim();
            }
        });



        if (adaMenunggu) {
            var before
            Array.from(elem).forEach(el => {
                const text = el.textContent;
                if (text.includes("Menunggu")) {
                    before = text.split("Menunggu")[0].trim();
                }
            });
            MsgError(SCRIPT_NAME)
            await sendToTelegram(`💩 Menunggu Persetujuan ${before}`);

        }

    } catch (e) {
        console.warn("? Error saat cek masalah:", e);
    }
}
function MsgError(message) {
    const notif = document.createElement("div");
    notif.textContent = message;
    notif.style.position = "fixed";
    notif.style.bottom = "20px";
    notif.style.left = "20px";
    notif.style.padding = "10px 20px";
    notif.style.backgroundColor = "black";
    notif.style.color = "white";
    notif.style.borderRadius = "5px";
    notif.style.zIndex = 9999;
    notif.style.fontSize = "16px";
    document.body.appendChild(notif);
    ;
}
function ObserverCekMasalah() {
    const observers = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType === 1 && node.textContent.toLowerCase().includes('diposting') || node.textContent.toLowerCase().includes('berhasil')) {
                    cekMasalah();
                    cekMasalah2();
                    cekLogout()
                    setTimeout(() => {
                        location.href = "about:blank";

                    }, 2000);
                }
            }
        }
    });

    observers.observe(document.body, { childList: true, subtree: true });
}
// ===== MAIN FLOW =====
(async () => {
    try {
        await fetchGroupsFromGitHub();

        const admins = await getAdminsUntilSuccess();
        manageGroups()
        console.log("✅ Admin list ready:", admins);
        console.log("💬 Ready to comment:", commentToPost, grouptToPost);
        URLINI = document.URL;
        loadLocalAdmin()
        closeDialogFast()
        Mutation_cekArticle()
        komentari();
        observeDialog();
        observeAktivitas();
        klikTombolByText("URUTKAN");
        intervalURUTKAN = setInterval(() => {
            const nowurl = location.href;
            if (nowurl !== URLINI) {
                URLINI = nowurl;
                klikTombolByText("URUTKAN");
                console.log("jalan");
            }
        }, 1000);



    } catch (e) {
        console.error("❌ Tidak bisa memulai bot karena gagal fetch admin list:", e);
    }




})();
