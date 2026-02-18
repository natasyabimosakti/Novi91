// ==UserScript==
// @name         NEW CURUT2
// @namespace    http://tampermonkey.net/
// @version      3.247
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
// @connect      api.telegram.org
// @connect      raw.githubusercontent.com
// ==/UserScript==



var namagroup18 = 'Jawatengah';
var Comment18 = 'curut2';



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
var EXPIRATION_MS = 5 * 60 * 1000; // 5 minutes
var URLINI = "";
// Global arrays / variabel yang sebelumnya hardcode
var groupNames = [];
var CommentList = [];
var intervalURUTKAN = null;
var commentDone = false;
var groups = [];
var observersudahjalam = false;
var observers = null
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
    let ceknamagroup = "";
    let ceknamagroup1 = "";
    let ceknamagroup2 = "";
    let ceknamagroup3 = "";
    let ceknamagroup4 = "";
    for (let i = 0; i < groupNames.length; i++) {
        commentMap[groupNames[i]] = normalizeToBasicLatin(CommentList[i]);
    }
    if (document.location.href.includes("user")) {
        ceknamagroup = document.querySelectorAll("[data-action-id][role='link'][data-focusable='true']")[0]?.textContent || '';
        ceknamagroup1 = document.querySelectorAll("[data-action-id][role='link']")[0]?.textContent || '';
        ceknamagroup2 = document.querySelectorAll("[data-action-id][role='link'][data-focusable='true']")[1]?.textContent || '';
        ceknamagroup3 = document.querySelectorAll("[data-action-id][role='link'][data-focusable='true']")[2]?.textContent || '';
        ceknamagroup4 = document.querySelectorAll("[data-action-id][role='link'][data-focusable='true']")[3]?.textContent || '';
    } else {
        ceknamagroup = document.getElementsByClassName("fixed-container")[0]?.textContent || '';
        ceknamagroup1 = document.getElementsByClassName('native-text')[5]?.textContent || '';
        ceknamagroup2 = document.getElementsByClassName('native-text')[6]?.textContent || '';
        ceknamagroup3 = document.getElementsByClassName('native-text')[7]?.textContent || '';
        ceknamagroup4 = document.getElementsByClassName('native-text')[8]?.textContent || '';

    }


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
function simulateHumanPullToRefresh(distance = 700) {
    console.log("🚀 Menjalankan simulasi tarik layar...");
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    // Gunakan penamaan variabel yang sangat unik agar tidak bentrok
    const _startX = window.innerWidth / 2;
    const _startY = 150;
    const _steps = 25;
    const _duration = 600;
    const _identifier = Date.now();

    // 1. Fungsi pembantu untuk membuat Touch Event
    const createTouchEvent = (type, x, y) => {
        const touchObj = new Touch({
            identifier: _identifier,
            target: document.body,
            clientX: x,
            clientY: y,
            pageY: y,
            radiusX: 2.5,
            radiusY: 2.5,
            force: 0.5,
        });

        return new TouchEvent(type, {
            cancelable: true,
            bubbles: true,
            touches: [touchObj],
            targetTouches: [touchObj],
            changedTouches: [touchObj]
        });
    };

    // 2. Kirim Touch Start
    document.dispatchEvent(createTouchEvent('touchstart', _startX, _startY));

    // 3. Jalankan Gerakan Menarik (Interval)
    let _currentStep = 0;
    const _moveInterval = setInterval(() => {
        _currentStep++;

        // Kalkulasi posisi Y saat ini (makin besar makin ke bawah)
        const _currentY = _startY + (distance * (_currentStep / _steps));

        document.dispatchEvent(createTouchEvent('touchmove', _startX, _currentY));

        // Jika sudah mencapai jarak target
        if (_currentStep >= _steps) {
            clearInterval(_moveInterval);

            // 4. Kirim Touch End
            document.dispatchEvent(createTouchEvent('touchend', _startX, _currentY));
            console.log("✅ Simulasi Pull-to-Refresh Selesai.");
            Mutation_cekArticle()
        }
    }, _duration / _steps);
}



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
    if (!isAdmins) return false;
    if (!(isBaru || isMenit)) return false;
    if (CekBacklist(postingan.toLowerCase())) {
        console.log("❌ ada Backlist")
        return false;
    }
    if (!CekKeyword(postingan.toLowerCase())) return false;

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
    if (window.isManaging) return;
    window.isManaging = true;
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
    if (groupKey === "group_") {
        window.isManaging = false;
        return;
    }
    const sudahKomentar = await GM.getValue(groupKey, false);
    if (sudahKomentar) {
        window.isManaging = false;
        console.log(`Sudah Komentar  ${now}`)
        location.href = "about:blank";
        return;
    }
    window.isManaging = false; // Buka kunci jika proses selesai
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

    const regexTombol = /jawab|tulis|komentari|postingan|beri/i;
    artikelBaruSet.clear();
    observersudahjalam = true;
    observercontetn = new MutationObserver(async (mutationsList) => {
        if (commentDone) return;
        await waitNoDialog();
        for (const mutation of mutationsList) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType !== 1) continue;
                if (node.matches?.('[data-tracking-duration-id]')) {
                    artikelBaruSet.add(node);
                    if (parsePost(node)) {
                        setTimeout(() => {
                            const textComponents = node.querySelectorAll('[data-type="text"]');
                            if (textComponents.length > 0) {
                                const target = textComponents[textComponents.length - 1];
                                if (target) {
                                    target.click();
                                    console.time("⚡ Scan-to-Click");
                                }
                            }
                        }, 0);
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
        if (document.location.href.includes("user")) {
            simulateHumanPullToRefresh()
        } else {
            klikTombolByText("URUTKAN");

        }
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

const siapkanTeks = (teks) => {
    const el = document.createElement('textarea');
    el.value = teks;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

// Panggil segera sebelum observer mulai
const fastOpts = { bubbles: true, cancelable: true };
const mDown = new MouseEvent("mousedown", fastOpts);
const mUp = new MouseEvent("mouseup", fastOpts);
async function komentari() {
    ObserverCekMasalah();
    let myObservere = new MutationObserver((mutations) => {
        if (commentDone) return;
        // Gunakan getElementById jika ada, atau keep querySelector jika hanya ini yang unik
        for (const mutation of mutations) {

            for (const node of mutation.addedNodes) {
                // Pastikan ini adalah element (nodeType 1)
                if (commentDone || node.nodeType !== 1) continue;
                // Langsung cari di dalam node yang baru muncul saja (scoping)
                // Ini jauh lebih cepat daripada document.querySelector
                const textarea = node.classList?.contains("multi-line-floating-textbox")
                    ? node
                    : node.querySelector(".multi-line-floating-textbox");

                const sendBtn = node.querySelector(".textbox-submit-button");

                if (textarea && sendBtn) {
                    commentDone = true;
                    myObservere.disconnect();
                    console.timeEnd("⚡ Scan-to-Click");
                    console.time("⚡ Koment");
                    // 1. Sinkronisasi Fokus & Isi (Tanpa jeda)
                    textarea.value = commentToPost;
                    sendBtn.disabled = false;
                    sendBtn.dispatchEvent(mDown);
                    sendBtn.click();
                    clearInterval(intervalURUTKAN);
                    console.timeEnd("⚡ Koment");

                    // Timer berakhir tepat setelah perintah kirim keluar

                    if (window.runBypassTurbo) window.runBypassTurbo();
                    handlePostSuccess();
                    return;
                }

            }
            if (commentDone) break;
        }
    });

    myObservere.observe(document.body, { childList: true, subtree: true });
}


// Pisahkan fungsi pengecekan agar tidak membebani Observer
function handlePostSuccess() {
    // Cari snackbar atau tanda berhasil
    // Simpan data GM secara asinkron
    Promise.all([
        GM.setValue("group_" + grouptToPost, true),
        GM.setValue("group_" + grouptToPost + "_expire", Date.now() + EXPIRATION_MS)
    ]).then(() => {
        console.log("✅ SESSION SAVED");
        setTimeout(() => {
            location.href = "about:blank";
        }, 5000);
    });

}




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
    var TELEGRAM_TOKEN = '8396728370:AAHblTLr220NEd9PwS7BzzS5VWGcxix9RK8'; // GANTI
    var TELEGRAM_CHAT_ID = '-1002717306025'; // GANTI
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
    if (sudahkirim) return;
    const dialog = document.querySelector("[role='dialog']");
    if (!dialog) return;

    const isi = dialog?.textContent?.toLowerCase() || "";
    const cleanText = isi.trim();

    if (isi.includes("masalah")) {
        MsgError(SCRIPT_NAME)
        observers.disconnect()
        await sendToTelegram(`😫 Ada "Masalah":\n\n${cleanText}`);
        setTimeout(() => {
            location.href = "https://m.facebook.com/bookmarks/"
        }, 2000);

    }
}
// --- 1. FUNGSI EKSEKUSI TURBO (Keluarkan dari Optimisasi) ---
// Panggil window.runBypassTurbo() tepat setelah Anda melakukan klik kirim
window.runBypassTurbo = function () {
    try {
        // A. Bypass GWT Scheduler & RunAsync (Memotong antrean internal)
        const gwt = window.GWT || window.$gwt;
        if (gwt) {
            gwt.scheduleDeferred = (task) => {
                if (typeof task === 'function') task();
                else if (task && typeof task.execute === 'function') task.execute();
            };
            gwt.runAsync = (id, cb) => { if (cb && cb.onSuccess) cb.onSuccess(); };


            if (typeof gwt.flushDeferredCommands === 'function') {
                gwt.flushDeferredCommands();
            }
        }
        if (window.WebLitePipe && typeof WebLitePipe.setFlushComplete === 'function') {
            WebLitePipe.setFlushComplete(0);
        }
        // B. Bypass Validasi Teks (Source 1)
        if (typeof window.FKc === "function") window.FKc = (a) => a;

        // C. Force Socket Flush (Source 1 & 3)
        const dispatcher = window.Dispatcher || window.AppDispatcher;
        if (dispatcher && typeof dispatcher.flush === 'function') {
            dispatcher.flush();
        }

        // D. Kill Logger agar bandwidth fokus ke socket komentar
        const logger = window.WebLiteClientLogger || window.MarauderLogger;
        if (logger) logger.logEvent = () => null;

        console.log("⚡ Turbo Triggered: Verifikasi dibypass & Socket dipaksa flush!");
    } catch (e) {
        console.error("⚠️ Turbo Error (Handled):", e);
    }
};

// --- 2. FUNGSI SETUP GLOBAL (Dijalankan Sekali) ---
function Optimisasi() {
    console.log("⚡ Memulai Global Setup (Safe Mode)...");
    // BAGIAN INI CUKUP 1X
    if (window.WebLitePipe) {
        // Memaksa FB mengabaikan waktu render layar (Source 5)
        window.WebLitePipe.callAfterScreenRendered = function (f) { f(); };
        const lockSesi = (val) => console.log("🔒 Session Locked");
        window.WebLitePipe.setLoginId = lockSesi;
        window.WebLitePipe.setPreSessionId = lockSesi;
        // Menipu sistem agar menganggap inisialisasi sudah selesai 100%
        window.WebLitePipe.setFirstResponseComplete();

        // Membungkam pelaporan log agar tidak terdeteksi spam (Source 5)

    }
    if (typeof envFlush === 'function') {
        envFlush({
            "dss": false, // Matikan penghemat data agar socket kencang
            "pfs": true,  // Aktifkan prefetch untuk jalur data
            "staticContentOnly": true
        });
    }
    if (window.WebLiteClientLogger) {
        window.WebLiteClientLogger.logEvent = function () { return null; };
    }


    // B. BYPASS PROMISE (Mencegah penundaan async loading)
    const originalThen = Promise.prototype.then;
    Promise.prototype.then = function (onF, onR) {
        const str = onF ? onF.toString() : "";
        if (str.includes('Progress') || str.includes('Overlay') || str.includes('Loading')) {
            if (typeof onF === 'function') {
                setTimeout(() => onF(), 0);
                return this;
            }
        }
        return originalThen.apply(this, arguments);
    };



    // F. SPOOFING
    Object.defineProperty(navigator, 'deviceMemory', { get: () => 1 });
    Object.defineProperty(navigator, 'hardwareConcurrency', { get: () => 1 });
}

// Inisialisasi Setup
Optimisasi();

async function cekMasalah2() {
    // 1. Cek flag di awal agar tidak double report
    if (sudahkirim) return;

    const elem = document.querySelectorAll("[data-long-click-action-id]");
    if (!elem || elem.length === 0) return;

    // 2. Gunakan .find() daripada .forEach() untuk efisiensi
    // Mencari elemen pertama yang mengandung kata "Menunggu"
    const targetEl = Array.from(elem).find(el => el.textContent?.includes("Menunggu"));

    if (targetEl) {
        // 3. SEGERA set flag true & matikan observer
        sudahkirim = true;
        if (typeof observers !== 'undefined' && observers) {
            observers.disconnect();
        }

        // 4. Ambil teks secara aman
        const text = targetEl.textContent;
        const before = text.split("Menunggu")[0].trim() || "Seseorang";

        // 5. Eksekusi pelaporan
        MsgError(SCRIPT_NAME);
        console.log(`⚠️ Masalah terdeteksi: Menunggu persetujuan ${before}`);

        await sendToTelegram(`💩 Menunggu Persetujuan ${before}`);
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
    // Simpan instance ke variabel yang sudah disiapkan
    observers = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                cekMasalah();
                cekMasalah2();
                cekLogout();

                if (node.nodeType === 1 && (node.textContent?.toLowerCase().includes('diposting') || node.textContent?.toLowerCase().includes('berhasil'))) {
                    setTimeout(() => {
                        stopObserver(); // Memanggil fungsi stop
                        location.href = "about:blank";
                    }, 5000);
                }
            }
        }
    });

    observers.observe(document.body, { childList: true, subtree: true });
}

function stopObserver() {
    if (observers) {
        observers.disconnect();
        observers = null; // Bersihkan memori
        console.log("🛑 Observer berhasil dihentikan dari luar.");
    }
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
        if (document.location.href.includes("user")) {
            simulateHumanPullToRefresh()
        } else {
            observeAktivitas();
            klikTombolByText("URUTKAN");


        }
        intervalURUTKAN = setInterval(() => {
            const nowurl = location.href;
            if (nowurl !== URLINI) {
                URLINI = nowurl;
                if (document.location.href.includes("user")) {
                    simulateHumanPullToRefresh()
                } else {
                    klikTombolByText("URUTKAN");

                }
                console.log("jalan");
            }
        }, 1000);



    } catch (e) {
        console.error("❌ Tidak bisa memulai bot karena gagal fetch admin list:", e);
    }




})();
