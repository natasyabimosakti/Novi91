// ==UserScript==
// @name         NEW Untung 3
// @namespace    http://tampermonkey.net/
// @version      3.150
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
// @grant        window.focus
// ==/UserScript==

var namagroup18 = 'Jawatengah';
var Comment18 = 'untung3';




// --- 1. ANTI-THROTTLE & KEEP-ALIVE (Solusi Tab Background) ---
(function () {
    // Memaksa properti visibility agar selalu 'visible'
    Object.defineProperty(document, 'visibilityState', { value: 'visible', writable: true });
    Object.defineProperty(document, 'hidden', { value: false, writable: true });
    Object.defineProperty(document, 'hasFocus', { value: () => true, writable: true });

    // Blokir event listener yang mencoba mendeteksi perpindahan tab
    const origAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function (type, listener, options) {
        if (['visibilitychange', 'blur', 'focus', 'pagehide', 'webkitvisibilitychange'].includes(type)) return;
        return origAddEventListener.call(this, type, listener, options);
    };

    setInterval(() => {
        if (document.hidden !== false) {
            Object.defineProperty(document, 'hidden', { value: false, writable: true });
            Object.defineProperty(document, 'visibilityState', { value: 'visible', writable: true });
            window.dispatchEvent(new Event('mousemove'));
        }
    }, 100); // Heartbeat stabil menjaga status 'visible' palsu
})();
var URLGROUP = `https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Comment/${Comment18}.json`;
var keyword = ["ROOM", "𝗥𝗢𝗢𝗠", "LOMBA", "𝗟𝗢𝗠𝗕𝗔", "𝐋𝐎𝐌𝐁𝐀", "LIMBA", "ROM", "R00M", "login", "𝐑𝐎𝐎𝐌", "HONGKONG", "SINGAPUR", "nemo", "l0mb4", "lomb4", "l0mba", "𝗥𝟬𝟬𝗠", "𝗟𝟬𝗠𝗕𝗔", "𝘙𝘖𝘖𝘔", "hatori", "klikh4tori001", "🅻🅾🅼🅱🅰"]
var Backlist = ["pemenang lomba", "rekap", "natidulu", "room lomba freebet", "prediksi", "result", "juara lomba", "r3k4p", "r3kap", "rek4p", "undang"]
var URLADMIN = "https://raw.githubusercontent.com/natasyabimosakti/ADMIN/refs/heads/main/Admin_group_Baru.json"
let adminList = [];
var SCRIPT_NAME = Comment18
let isAdminListReady = false; // Flag penanda kesiapan data
var refresh = 300; // Percepat durasi animasi tarik layar agar selesai dalam 200ms
let commentDone = false; // Flag untuk menghentikan aksi jika bot sudah selesai bertugas
let lastRefreshFeedState = "20"; // Menyimpan ID postingan terakhir untuk mendeteksi perubahan feed
let lastObservedUrl = location.href;
const LOCAL_KEY = "cachedAdminList";
const VERSION_KEY = "cachedAdminVersion";
let watchdogTimer = null; // Timer untuk mencegah bot macet jika refresh gagal
var commentToPost = ""; // Dikosongkan agar tidak mengirim komentar default sebelum data siap
let botObserver = null; // Observer utama untuk memantau feed
var grouptToPost = '';
var groupNames = [];
var CommentList = [];
let countA = 0;
let sedangProses = false;
let sedangKlikUrutkan = false;
let lastMessageSent = "";
var sudahkirim = false
var observersudahjalam = false;
var observers = null
var groups = [];
var now = Date.now();
var EXPIRATION_MS = 5 * 60 * 1000;
var currentFeedState = "";

const fastOpts = { bubbles: true, cancelable: true };
const mDown = new MouseEvent("mousedown", fastOpts);
const mUp = new MouseEvent("mouseup", fastOpts);
// 1. CACHE NATIVE SETTER: Pindahkan ke luar agar tidak dihitung dalam blok waktu komentari
const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set ||
    Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;

// 2. OPTIMISASI GLOBAL: Matikan logger Facebook agar proses click() menjadi instan (< 0.1ms)
function Optimisasi() {
    if (window.WebLiteClientLogger) window.WebLiteClientLogger.logEvent = () => null;
    if (window.MarauderLogger) window.MarauderLogger.logEvent = () => null;
    if (window.WebLitePipe) {
        window.WebLitePipe.callAfterScreenRendered = (f) => f();
        window.WebLitePipe.setFirstResponseComplete();
    }
    // Bypass GWT scheduler untuk mempercepat flush data socket
    const gwt = window.GWT || window.$gwt;
    if (gwt) gwt.scheduleDeferred = (task) => typeof task === 'function' ? task() : task?.execute?.();
}
Optimisasi();

let myObservere = null;
let masterObserver = null;
var obs3 = false;
function initMasterObserver() {
    if (obs3) return;
    obs3 = true;
    if (masterObserver) return;

    masterObserver = new MutationObserver((mutations) => {
        // 1. Logika Dialog (Selalu cek state elemen saat ini)
        const dialog = document.querySelector('[role="dialog"]');
        const presentation = document.querySelector('[role="presentation"]');
        const dialogVscroller = document.querySelector(".dialog-vscroller");

        sedangKlikUrutkan = !!(presentation || dialogVscroller);
        sedangProses = !!dialog;

        // 2. Logika Mutasi Nodes
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType !== 1) continue;

                // Cek Masalah & Status Post
                cekMasalah();
                cekMasalah2();
                cekLogout();

                if (node.textContent?.toLowerCase().includes('diposting') || node.textContent?.toLowerCase().includes('berhasil')) {
                    setTimeout(() => {
                        if (masterObserver) masterObserver.disconnect();
                        location.href = "about:blank";
                    }, 5000);
                }

                // Cek Aktivitas Terbaru (Hanya di halaman grup)
                if (!commentDone && location.href.includes("group")) {
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

    masterObserver.observe(document.body, { childList: true, subtree: true });
    console.log("🛠️ Master Observer diaktifkan.");
}

async function tungguGroupAsync() {
    const start = Date.now();
    while (Date.now() - start < 15000) { // 15 detik timeout
        const result = getCommentForGroup();
        if (result && result.comment && result.groupName) {
            commentToPost = Random(result.comment);
            grouptToPost = result.groupName;
            window.commentToPost = commentToPost; // Pastikan variabel global terupdate
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

function Random(comment) {
    const numberRegex = /\d{2}/g;
    const rawNumbers = [...comment.matchAll(numberRegex)];
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
    const rotated = lastCount === 2 ? [angka[1], angka[0]] : shuffleArray(angka);
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






async function fetchGroupsFromGitHub() {
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: "GET",
            url: URLGROUP,
            onload: function (response) {
                try {
                    const data = JSON.parse(response.responseText);

                    data.forEach((item) => {
                        if (item.group && item.comment) {
                            groupNames.push(normalizeToBasicLatin(item.group).toLowerCase());
                            CommentList.push(item.comment);
                        }
                    });

                    if (namagroup18 && Comment18) {
                        groupNames.push(normalizeToBasicLatin(namagroup18).toLowerCase());
                        CommentList.push(Comment18);
                    }

                    console.log("✅ Group list berhasil diambil (GitHub + Lokal):", groupNames.length);
                    resolve();

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










function getCommentForGroup() {
    const commentMap = {};
    let ceknamagroup = "";
    let ceknamagroup1 = "";
    let ceknamagroup2 = "";
    let ceknamagroup3 = "";
    let ceknamagroup4 = "";
    let ceknamagroup5 = "";
    for (let i = 0; i < groupNames.length; i++) {
        commentMap[groupNames[i]] = normalizeToBasicLatin(CommentList[i]);
    }
    if (document.location.href.includes("user")) {
        ceknamagroup = document.querySelectorAll("[data-action-id][role='link'][data-focusable='true']")[0]?.textContent || '';
        ceknamagroup1 = document.querySelectorAll("[data-action-id][role='link']")[0]?.textContent || '';
        ceknamagroup2 = document.querySelectorAll("[data-action-id][role='link'][data-focusable='true']")[1]?.textContent || '';
        ceknamagroup3 = document.querySelectorAll("[data-action-id][role='link'][data-focusable='true']")[2]?.textContent || '';
        ceknamagroup4 = document.querySelectorAll("[data-action-id][role='link'][data-focusable='true']")[3]?.textContent || '';
        ceknamagroup5 = document.querySelectorAll("[data-action-id][role='link'][data-focusable='true']")[4]?.textContent || '';

    } else {
        ceknamagroup = document.getElementsByClassName("fixed-container")[0]?.textContent || '';
        ceknamagroup1 = document.getElementsByClassName('native-text')[5]?.textContent || '';
        ceknamagroup2 = document.getElementsByClassName('native-text')[6]?.textContent || '';
        ceknamagroup3 = document.getElementsByClassName('native-text')[7]?.textContent || '';
        ceknamagroup4 = document.getElementsByClassName('native-text')[8]?.textContent || '';
        ceknamagroup5 = document.querySelectorAll("[data-action-id][role='link'][data-focusable='true']")[0]?.textContent || '';
    }


    const allGroups = [
        normalizeToBasicLatin(ceknamagroup).toLowerCase(),
        normalizeToBasicLatin(ceknamagroup1).toLowerCase(),
        normalizeToBasicLatin(ceknamagroup2).toLowerCase(),
        normalizeToBasicLatin(ceknamagroup3).toLowerCase(),
        normalizeToBasicLatin(ceknamagroup4).toLowerCase(),
        normalizeToBasicLatin(ceknamagroup5).toLowerCase()
    ];

    for (let groupName in commentMap) {
        if (allGroups.some(text => text.includes(groupName))) {

            return { groupName, comment: commentMap[groupName] };
        }
    }
    return null;
}

function klikTombolByText(teks) {
    const tombol = Array.from(document.querySelectorAll('[role="button"], [tabindex="0"]'))
        .find(el => el.textContent.trim() === teks);
    if (tombol) {
        currentFeedState = tombol.getAttribute("data-action-id")
        if (lastRefreshFeedState == currentFeedState) return;
        tombol.click();
        lastRefreshFeedState = currentFeedState
        return true;
    }
    return false;
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

                    isAdminListReady = true; // Set ke true setelah data berhasil diolah
                    console.log("%c👥 Daftar Admin Berhasil Dimuat:", "color: #fffa77; font-weight: bold;", adminList);
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






function parsePost(artikels) {


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
        return false;
    }
    if (!CekKeyword(postingan.toLowerCase())) return false;
    window.focus();
    return true;
}


function parsePost2(artikels) {

    const postingan = artikels.textContent || "";
    const texts = postingan
    const isBaru = texts.includes("Baru saja") || texts.includes("Baru");
    const isMenit = /\b[0-9]\s*menit\b/.test(texts);

    if (!(isBaru || isMenit)) return false;
    if (CekBacklist(postingan.toLowerCase())) {
        console.log("❌ ada Backlist")
        return false;
    }
    if (!CekKeyword(postingan.toLowerCase())) return false;

    return true;
}


function CekBacklist(postinganBL) {
    for (const DataBacklist of Backlist) {
        const kata = DataBacklist.toLowerCase()
        if (postinganBL.toLowerCase().includes(kata)) {
            return true;
        }
    }
    return false;
}

function CekKeyword(postingan) {
    for (const DataKeyword of keyword) {
        const kata = DataKeyword.toLowerCase()
        if (postingan.toLowerCase().includes(kata)) {
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


function simulateHumanPullToRefresh(distance = 700) {
    if (document.hidden) {
        window.scrollTo(0, 0); // Scroll instan jika di background untuk efisiensi
    } else {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    // Gunakan penamaan variabel yang sangat unik agar tidak bentrok
    const _startX = window.innerWidth / 2;
    const _startY = 150;
    const _steps = 25;
    const _duration = refresh;
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
    const performStep = () => {
        _currentStep++;
        const _currentY = _startY + (distance * (_currentStep / _steps));
        document.dispatchEvent(createTouchEvent('touchmove', _startX, _currentY));

        if (_currentStep < _steps) {
            // BYPASS THROTTLING: MessageChannel tidak dibatasi 1 detik di background
            const chan = new MessageChannel();
            chan.port1.onmessage = performStep;
            chan.port2.postMessage(null);
        } else {
            document.dispatchEvent(createTouchEvent('touchend', _startX, _currentY));
        }
    };
    performStep();
}




var skiper = false;
var obs4 = false;

function BOTMODE() {
    if (obs4) return;
    obs4 = true;
    if (skiper) return;
    const isUserPage = document.location.href.includes("user");

    if (!botObserver) {
        botObserver = new MutationObserver(async (mutationsList) => {

            for (const mutation of mutationsList) {
                for (const node of mutation.addedNodes) {
                    const descendants = document.querySelectorAll?.('[data-tracking-duration-id]');
                    if (!descendants || commentDone) return;


                    if (node.nodeType !== 1) continue;
                    if (descendants) {
                        for (let i = 0, len = descendants.length; i < len; i++) {
                            var el = descendants[i]
                            if (commentDone) return;
                            const isValid = isUserPage ? parsePost2(el) : parsePost(el);
                            const textComponents = el.querySelectorAll('[data-type="text"]');
                            if (isValid) {
                                skiper = true;
                                if (textComponents.length > 0) {
                                    const target = textComponents[textComponents.length - 1];
                                    if (target) {
                                        target.click();
                                    }
                                }
                                return;
                            }
                        }
                    }

                }
            }
        });

        botObserver.observe(document.body, { childList: true, subtree: true });
    }


}

// --- 2. BACKGROUND POLLER (Bypass Throttling) ---
const pollerChannel = new MessageChannel();
pollerChannel.port1.onmessage = () => { if (!commentDone) komentari(); };

const TXT_SEL = ".multi-line-floating-textbox, .internal-input";
const BTN_SEL = ".textbox-submit-button, [aria-label='Posting komentar']";

const tryPost = (root) => {
    if (commentDone) return true;

    // 1. Mencari textarea: Menggunakan matches lebih cepat daripada querySelector jika root adalah elemennya
    const textarea =
        (root.nodeType === 1 && root.matches?.(TXT_SEL) ? root : null) ||
        document.body.lastElementChild?.querySelector(TXT_SEL) ||
        (root.querySelector ? root.querySelector(TXT_SEL) : null);

    if (!textarea) return false;

    const sendBtn =
        textarea.parentElement?.querySelector('.textbox-submit-button') ||
        textarea.closest('[data-mcomponent="MContainer"]')?.querySelector('[aria-label="Posting komentar"]') ||
        (textarea.form ? textarea.form.querySelector(BTN_SEL) : null) ||
        document.body.lastElementChild?.querySelector(BTN_SEL) ||
        document.querySelector(BTN_SEL);

    if (textarea && sendBtn) {

        console.time("Kirim Komentar");

        // ATOMIC EXECUTION: Lewati focus() dan dispatchEvent manual yang menghambat eksekusi sinkron
        if (nativeSetter) nativeSetter.call(textarea, commentToPost);
        else textarea.value = commentToPost;
        sendBtn.dispatchEvent(mDown);
        sendBtn.click();
        commentDone = true;
        if (myObservere) { myObservere.disconnect(); myObservere = null; }
        botObserver.disconnect();
        handlePostSuccess()
        console.timeEnd("Kirim Komentar");
        console.timeEnd("Data Ditemukan Sampai Prosess")
        window.focus();
        if (window.runBypassTurbo) window.runBypassTurbo();
        return true;
    }
    return false;
};

function handlePostSuccess() {
    Promise.all([
        GM.setValue("group_" + grouptToPost, true),
        GM.setValue("group_" + grouptToPost + "_expire", Date.now() + EXPIRATION_MS)
    ]).then(() => {
        console.log("✅ SESSION SAVED");
        setTimeout(() => {
            location.href = "about:blank";
        }, 15000);
    });

}
var obs5 = false;
function komentari() {
    if (obs5) return;
    obs5 = true;
    if (commentDone || !commentToPost) return;

    // Cek DOM secara langsung untuk elemen yang sudah ada
    if (tryPost(document)) return;

    // Pasang observer untuk menangkap render elemen baru secara instan
    if (!myObservere) {
        myObservere = new MutationObserver((mutations) => {
            for (const m of mutations) {
                for (const node of m.addedNodes) {
                    if (node.nodeType === 1 && tryPost(node)) return;
                }
            }
        });
        myObservere.observe(document.body, { childList: true, subtree: true });
    }

    // --- HEARTBEAT BACKGROUND ---
    // MessageChannel melewati limitasi background throttling browser.
    // Ini memastikan bot tetap melakukan polling re-check meski tab tidak aktif.
    pollerChannel.port2.postMessage(null);
}

setInterval(async () => {
    if (location.href !== lastObservedUrl) {
        const oldUrl = lastObservedUrl;
        lastObservedUrl = location.href;
        const isTargetPage = lastObservedUrl.includes("group") || lastObservedUrl.includes("user");
        const wasTargetPage = oldUrl.includes("group") || oldUrl.includes("user");

        if (isTargetPage) {
            console.log("%c🔄 URL Berubah: Mencocokkan ulang commentToPost...", "color: #00ffff; font-weight: bold;");
            await start()

        } else if (wasTargetPage && !isTargetPage) {
            // Jika meninggalkan halaman grup, hentikan aktivitas bot
            commentToPost = "";
            console.log("%c⏹️ Meninggalkan Halaman Target.", "color: #ff4444;");
        }
    }
}, 1000); // Cek setiap 1 detik (sangat ringan dibandingkan per-packet)


function MsgError(message) {
    const notif = document.createElement("div");
    notif.textContent = message;
    notif.style.position = "fixed";
    notif.style.bottom = "30px";
    notif.style.left = "4px";
    notif.style.padding = "10px 20px";
    notif.style.backgroundColor = "green";
    notif.style.color = "white";
    notif.style.borderRadius = "5px";
    notif.style.zIndex = 9999;
    notif.style.fontSize = "16px";
    document.body.appendChild(notif);
    ;
}
async function cekMasalah() {
    if (sudahkirim) return;
    const dialog = document.querySelector("[role='dialog']");
    if (!dialog) return;

    const isi = dialog?.textContent?.toLowerCase() || "";
    const cleanText = isi.trim();

    if (isi.includes("masalah")) {
        MsgError(SCRIPT_NAME)
        if (masterObserver) masterObserver.disconnect();
        await sendToTelegram(`😫 Ada "Masalah":\n\n${cleanText}`);
        setTimeout(() => {
            location.href = "https://m.facebook.com/bookmarks/"
        }, 2000);

    }
}
window.runBypassTurbo = function () {
    try {
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
        if (window.WebLitePipe && typeof window.WebLitePipe.setFlushComplete === 'function') {
            window.WebLitePipe.setFlushComplete(0);
        }
        if (typeof window.FKc === "function") window.FKc = (a) => a;

        const dispatcher = window.Dispatcher || window.AppDispatcher;
        if (dispatcher && typeof dispatcher.flush === 'function') {
            dispatcher.flush();
        }

        const logger = window.WebLiteClientLogger || window.MarauderLogger;
        if (logger) logger.logEvent = () => null;

        console.log("⚡ Turbo Triggered: Verifikasi dibypass & Socket dipaksa flush!");
    } catch (e) {
        console.error("⚠️ Turbo Error (Handled):", e);
    }
};
async function cekMasalah2() {
    if (sudahkirim) return;

    const elem = document.querySelectorAll("[data-long-click-action-id]");
    if (!elem || elem.length === 0) return;

    const targetEl = Array.from(elem).find(el => el.textContent?.includes("Menunggu"));

    if (targetEl) {
        sudahkirim = true;
        if (masterObserver) {
            masterObserver.disconnect();
        }

        const text = targetEl.textContent;
        const before = text.split("Menunggu")[0].trim() || "Seseorang";

        MsgError(SCRIPT_NAME);
        console.log(`⚠️ Masalah terdeteksi: Menunggu persetujuan ${before}`);

        await sendToTelegram(`💩 Menunggu Persetujuan ${before}`);
    }
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

async function sendToTelegram(message) {
    var TELEGRAM_TOKEN = '8396728370:AAHblTLr220NEd9PwS7BzzS5VWGcxix9RK8';
    var TELEGRAM_CHAT_ID = '-1002717306025';
    if (sudahkirim) return;
    sudahkirim = true
    const fullMessage = `? [${SCRIPT_NAME}]\n${message}`;
    const normalizedMessage = normalizeText(fullMessage);

    const lastSent = await GM.getValue("lastTelegramMessage", "");
    const normalizedLast = normalizeText(lastSent);

    const lastTime = await GM.getValue("lastTelegramTime", 0);
    const now = Date.now();
    const COOLDOWN = 5 * 60 * 1000;

    const distance = levenshtein(normalizedMessage, normalizedLast);
    const similarity = 1 - distance / Math.max(normalizedMessage.length, normalizedLast.length);

    const SIMILARITY_THRESHOLD = 0.95;

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





async function manageGroups() {
    if (window.isManaging) return;
    window.isManaging = true;
    const now = Date.now();
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
    window.isManaging = false;
}







async function start() {


    // Mencegah inisialisasi jika bukan halaman target
    if (!document.location.href.includes("group") && !document.location.href.includes("user")) return;

    console.log("%c📡 Memulai sinkronisasi data...", "color: #00ffff; font-weight: bold;");

    // Tunggu admin list dan group list (yang juga mengisi commentToPost) selesai
    // Promise.all memastikan kedua proses berjalan secara paralel namun kita menunggu keduanya selesai

    await Promise.all([
        fetchAdminListFromGitHub(),
        fetchGroupsFromGitHub(),
        tungguGroupAsync()

    ]);
    initMasterObserver();

    // --- VALIDASI KETAT: Tunggu commentToPost benar-benar terisi sebelum lanjut ---
    if (!commentToPost) {
        console.log("%c⏳ Menunggu identitas grup terdeteksi untuk mengisi commentToPost...", "color: #ffa500;");
        while (!commentToPost) {
            const res = getCommentForGroup();
            if (res) {
                commentToPost = Random(res.comment);
                grouptToPost = res.groupName;
                window.commentToPost = commentToPost;
                await manageGroups()
                break;
            }
            await new Promise(r => setTimeout(r, 1000));
        }
    }

    console.log("%c✅ Inisialisasi Selesai. Data & Comment Siap: " + commentToPost, "color: #00ff00; font-weight: bold;");

    // 1. Tunggu sampai document.body tersedia dan tidak dalam status 'loading'
    while (document.readyState === 'loading') {
        await new Promise(r => setTimeout(r, 100));
    }

    // 2. Berikan jeda tambahan (Safety Buffer) sekitar 1.5 detik
    // Agar engine internal Facebook selesai melakukan binding event listener
    await new Promise(r => setTimeout(r, 1500));
    console.log("%c🚀 Memulai Trigger Awal (Refresh)...", "color: #00ff00; font-weight: bold;");

    // 1. Heartbeat Interaction: Klik/Refresh berkala agar proses tetap hidup


    BOTMODE(); // Trigger manual pertama kali
    komentari()
    MsgError(SCRIPT_NAME)

    setInterval(() => {
        // 1. Berhenti jika postingan ditemukan atau proses komentar sudah selesai
        if (commentDone || skiper) return;
        // 2. Deteksi Perubahan: Cukup bandingkan ID postingan teratas.
        // Karena setiap refresh ID akan berubah, ini cara tercepat untuk mendeteksi pembaruan data.
        const isUserPage = document.location.href.includes("user");

        if (isUserPage) {
            // Metode User: Pantau atribut postingan (berubah saat Pull-to-Refresh)
            const topPost1 = document.querySelector('[data-tracking-duration-id]');
            currentFeedState = topPost1?.querySelector("[data-fd-action]")?.getAttribute("data-fd-action");
            if (currentFeedState == lastRefreshFeedState) return;
        }

        if (document.querySelector(".loading-overlay")) {
            lastRefreshFeedState = "re"
            return;
        }

        if (isUserPage) {
            simulateHumanPullToRefresh();
        } else {
            klikTombolByText("URUTKAN");
        }

    }, 300); // Heartbeat cepat (300ms) dengan proteksi redundansi
}



// --- 3. INITIALIZATION FLOW ---
(async () => {
    start()

})();
