// ==UserScript==
// @name         Script 2: Data Processing
// @version      3.5
// @match        https://*.facebook.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Sock/sockProcessing.js
// @downloadURL  https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Sock/sockProcessing.js
// @connect      api.telegram.org
// @connect      raw.githubusercontent.com
// ==/UserScript==








var captureSwitch = "on";
let socket = null;
let lastSession = null;
let lastSync = 0
let lastSeq = 0

// Variabel ID yang akan dicari dari paket masuk
let gwtheader = []; // Default0x01, 0x01, 0x40
let gwtHeaderFiller = [];//0x00, 0x01, 0x00, 0x0c
let filler1 = [0x40, 0x00, 0x00, 0x00];
let pengisi = []; //0x00
let filler2 = []; //0xff, 0xff, 0xff, 0xff, 0x00, 0x00, 0x01, 0x9c, 0x00, 0x00, 0x7d, 0x0a, 0x0c
let sync = []; //0x40, 0x00, 0x00, 0x00
let listID = [];
console.log("%c📡 v76.2: Automator + FG-Scanner + Receiver Aktif.", "color: #00ffff; font-weight: bold;");
const decoder = new TextDecoder();
let arrayData = [];
const pattern = [0x54, 0x00, 0x09, 0x00, 0x01];

var komentdone = false;
var keyword = ["ROOM", "𝗥𝗢𝗢𝗠", "LOMBA", "𝗟𝗢𝗠𝗕𝗔", "𝐋𝐎𝐌𝐁𝐀", "LIMBA", "ROM", "R00M", "login", "𝐑𝐎𝐎𝐌", "HONGKONG", "SINGAPUR", "nemo", "l0mb4", "lomb4", "l0mba", "𝗥𝟬𝟬𝗠", "𝗟𝟬𝗠𝗕𝗔", "𝘙𝘖𝘖𝘔", "hatori", "klikh4tori001"]
var Backlist = ["pemenang lomba", "rekap", "natidulu", "room lomba freebet", "prediksi", "result", "juara lomba", "r3k4p", "r3kap", "rek4p", "undang"]
var commentToPost = '';
var grouptToPost = '';
var groups = [];
var now = Date.now();
var groupNames = [];
var adminList = [];
var CommentList = [];
let observercontetn = null;
let cekkiment = null;
var observercontetAktivitas = null;
var EXPIRATION_MS = 1 * 60 * 1000; // 5 minutes
var observersudahjalam = false;
var kirimkomentar = false;
var sedangjalan = false
// var refresh
//          head                 session           sync & Seq     Kilk ID
//📜 HEX : 00 34 02    c4 1b a9 be e2 3d 28 85   00 a9 00 c0  00 01 02 09  00 01 02 12 00 00 00 00 00 00 00 00 40 00 00 00 18 ff ff ff ff 00 00 01 9c 20 dc 2f 44 0c 02 5c 00 04 00

var robotsock = "off";

////RUANG SOCKET
(function () {
    'use strict';
    ////////////////////////////////////////// ROBOT SOCK


    // --- HOOK WEBSOCKET UNTUK DATA MASUK & KELUAR ---
    const OriginalWebSocket = window.WebSocket;
    window.WebSocket = function (...args) {
        const ws = new OriginalWebSocket(...args);
        // Mencegat data MASUK (RECEIVING)
        ws.addEventListener('message', function (event) {
            let view = new Uint8Array(event.data);
            const contentStr = decoder.decode(view);

            if (event.data instanceof ArrayBuffer) {
                if (view.length < 100) {
                    if (contentStr.includes("diposting")) {
                        SuksessNotif("Telah Komentar")
                        window.location.href = "about:blank";
                    }
                    if (contentStr.includes("Harap") && contentStr.includes("coba")) {
                        SuksessNotif("ERRRORRRR")
                        window.location.href = "https://m.facebook.com/bookmarks/"
                    }
                }
                if (captureSwitch === "on") {

                    humanize(event.data, "RECV");
                }
                if (robotsock === "on") {

                    if (view.length > 1000) {
                        let tempStorage = []; // Simpan sementara di sini

                        for (let i = 1000; i <= view.length - 7; i++) {
                            if (view[i] === pattern[0] &&
                                view[i + 1] === pattern[1] &&
                                view[i + 2] === pattern[2] &&
                                view[i + 3] === pattern[3] &&
                                view[i + 4] === pattern[4]) {
                                let b2 = view[i + 5];
                                let b3 = view[i + 6];
                                tempStorage.push([0x01, b2, b3]);
                            }
                        }

                        // HANYA update listID jika di paket ini ditemukan pattern
                        if (tempStorage.length > 0) {
                            arrayData = [];
                            listID = tempStorage; // Data lama terhapus, diganti data terbaru
                            console.log(`LIST ID = ${listID.length}`)
                            let matches = [...contentStr.matchAll(/data-tracking-duration-id/g)];
                            sedangjalan = true
                            matches.forEach((match, i) => {
                                let start = match.index;
                                let end = matches[i + 1] ? matches[i + 1].index : contentStr.length;
                                let chunk = contentStr.substring(start, end);

                                // Simpan chunk jika memenuhi syarat
                                if (chunk.length > 11 || i === matches.length - 1) {
                                    arrayData.push(chunk);

                                }
                            });
                            starkirim()

                            console.log(`ARRAY data-tracking = ${arrayData.length}`)

                        } else {
                        }
                    }








                }
                starkirim()
            }


        });
        // Mencegat data KELUAR (SENDING)
        const originalSend = ws.send;
        ws.send = function (data) {
            if (robotsock === "on") {
                if (captureSwitch === "on") {
                    humanize(data, "SEND");
                }
                socket = this; // Simpan instance socket yang aktif
                let view = new Uint8Array(data);

                if (view.length > 50 && view.length < 200) {
                    try {
                        let strData = new TextDecoder().decode(view);
                        if (strData.includes("-fg")) {
                            gwtHeaderFiller = []
                            sync = []
                            lastSession = []
                            sync = view.slice(11, 15)

                            gwtHeaderFiller = view.slice(15, 20);
                            lastSession = view.slice(3, 11);
                        }
                    } catch (e) { }
                }


                const pattern2 = [0xff, 0xff, 0xff, 0xff, 0x00, 0x00, 0x01];
                // Loop berhenti 13 byte sebelum akhir paket agar i+12 selalu aman
                for (let i = 0; i <= view.length - 13; i++) {
                    if (view[i] === pattern2[0] &&
                        view[i + 1] === pattern2[1] &&
                        view[i + 2] === pattern2[2] &&
                        view[i + 3] === pattern2[3] &&
                        view[i + 4] === pattern2[4] &&
                        view[i + 5] === pattern2[5] &&
                        view[i + 6] === pattern2[6]) {
                        let byteBelakang = view[i - 1];
                        pengisi = [byteBelakang + 1]; // Simpan sebagai array agar mudah di .set()
                        // Ambil 13 byte sekaligus (7 pola + 6 data)
                        // Ini akan menghasilkan: ff ff ff ff 00 00 01 9c 17 05 45 02 0d
                        filler2 = Array.from(view.slice(i, i + 13));
                        filler2[10] = 0x00;
                        filler2[11] = 0x00;
                        filler2[12] = 0x0c;
                        sedangjalan = true
                        break;
                    }
                }
                if (lastSession && view.length > 20 && view.length < 1000) {
                    let foundOffset = -1;

                    // Scan paket untuk mencari posisi lastSession (biasanya ada di awal paket)
                    // Kita scan dari index 0 sampai 10 saja untuk menghemat CPU
                    for (let i = 0; i <= 15; i++) {
                        let match = true;
                        for (let j = 0; j < 8; j++) {
                            if (view[i + j] !== lastSession[j]) {
                                match = false;
                                break;
                            }
                        }
                        if (match) {
                            foundOffset = i;
                            break;
                        }
                    }

                    // Jika Session ditemukan di dalam paket ini
                    if (foundOffset !== -1) {
                        // Ambil Sync dan Seq berdasarkan posisi Session yang ditemukan (foundOffset)
                        // Jika session di i, maka Sync biasanya di i+9 dan Seq di i+11
                        lastSync = view[foundOffset + 9];
                        lastSeq = view[foundOffset + 11];
                    }
                }
                starkirim()
            };
            return originalSend.apply(this, arguments);

        }

        return ws;
    };




    const desc = Object.getOwnPropertyDescriptor(WebSocket.prototype, 'onmessage');
    if (desc && desc.set) {
        Object.defineProperty(WebSocket.prototype, 'onmessage', {
            set: function (cb) {
                const wrapped = function (e) { humanize(e.data, "RECV"); return cb.apply(this, arguments); };
                desc.set.call(this, wrapped);
            },
            get: function () { return desc.get.call(this); },
            configurable: true
        });
    }
    function starkirim() {
        if (!komentdone) {
            sedangjalan = true
            if (arrayData.length > 0 && listID.length > 0 && gwtHeaderFiller.length > 0 && pengisi.length > 0 && filler2.length > 0 && sync.length > 0) {
                for (let i = 0; i < arrayData.length; i++) {
                    // Cek jika chunk mengandung "room" dan belum pernah diproses
                    if (parsersock(arrayData[i].toLowerCase())) {
                        clearInterval(cekkiment);
                        gwtheader = listID[i]
                        komentdone = true;
                        tembak(commentToPost);
                        showNotification("Terkirim")
                        observercontetn.disconnect();

                        arrayData = [];
                        listID = [];
                        gwtHeaderFiller = [];
                        pengisi = [];
                        filler2 = [];
                        sync = [];
                        break;
                    }
                }
            }
        }
        sedangjalan = false
    }
    // 1000 ms = 1 detik
    // --- FUNGSI TEMBAK ---
    window.capture = function (onoff = "on") {
        captureSwitch = onoff;
    }
    window.tembak = function (pesan = "Minta Link") {

        if (!socket || !lastSession) return console.error("Koneksi belum siap. Klik/ketik di kolom komentar dulu!");
        // Sinkronisasi GWT Filler dari vercodList

        const msg = new TextEncoder().encode(pesan);
        let mySeq = lastSeq + 1;

        // Struktur konstanta
        const gwtHeaderFiller2 = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x04, 0x00];
        const tail = [0x02, 0x5c, 0x00, 0x04, 0x00];



        // Hitung total size
        const totalSize = 3 + 8 + 4 + gwtHeaderFiller.length + gwtheader.length + gwtHeaderFiller2.length + 1 + msg.length + filler1.length + 1 + filler2.length + tail.length;

        const packet = new Uint8Array(totalSize);
        let p = 0;
        packet.isPriority = true;
        packet.set([0x00, totalSize - 2, 0x02], p); p += 3;
        packet.set(lastSession, p); p += 8;
        packet.set([sync[0], lastSync, sync[2], mySeq], p); p += 4;
        packet.set(gwtHeaderFiller, p); p += gwtHeaderFiller.length;
        packet.set(gwtheader, p); p += gwtheader.length; // INI SUDAH DINAMIS SEKARANG
        packet.set(gwtHeaderFiller2, p); p += gwtHeaderFiller2.length;
        packet[p++] = msg.length;
        packet.set(msg, p); p += msg.length;
        packet.set(filler1, p); p += filler1.length;
        packet.set(pengisi, p); p += pengisi.length;
        packet.set(filler2, p); p += filler2.length;
        packet.set(tail, p);

        socket.send(packet);
        lastSeq = mySeq;
        console.log(`%c🚀 SENT: "${pesan}" | ID: ${gwtheader[1].toString(16)} ${gwtheader[2].toString(16)} | Seq: ${mySeq}`, "color: #2ecc71; font-weight: bold;");
    };

    const humanize = async (data, direction) => {
        if (!data) return;
        let buffer;
        if (data instanceof Blob) buffer = await data.arrayBuffer();
        else if (data instanceof ArrayBuffer) buffer = data;
        else if (ArrayBuffer.isView(data)) buffer = data.buffer;
        else {
            console.log(`%c${direction === "SEND" ? "⬆️" : "⬇️"} [STR] : ${data}`, "color: #888");
            return;
        }

        const view = new Uint8Array(buffer);
        const hex = Array.from(view).map(b => b.toString(16).padStart(2, '0')).join(" ");
        // Ekstraksi Metadata
        let session = view.length >= 11 ? Array.from(view.slice(3, 11)).map(b => b.toString(16).padStart(2, '0')).join("") : "N/A";
        let syncSeq = view.length >= 15 ? `Sync: ${view[12].toString(16)} | Seq: ${view[14].toString(16)}` : "N/A";

        // Cari Pesan Khusus (Marker 01 04 00)
        let msgExtracted = "";
        for (let i = 0; i < view.length - 3; i++) {
            if (view[i] === 0x01 && view[i + 1] === 0x04 && view[i + 2] === 0x00) {
                let len = view[i + 3];
                msgExtracted = new TextDecoder().decode(view).substring(i + 4, i + 4 + len);
                break;
            }
        }

        const color = direction === "SEND" ? "#0087ff" : "#00ff41";
        const label = direction === "SEND" ? "⬆️ SENDING" : "⬇️ RECEIVING";

        // --- TAMPILAN FULL (TANPA GROUP COLLAPSED) ---
        console.log(`%c${label} [${view.length} bytes] %c Session: ${session} | ${syncSeq}`,
            `color: ${color}; font-weight: bold; font-size: 11px;`,
            `color: #aaa; font-size: 10px;`);

        if (msgExtracted) {
            console.log(`%c💬 MESSAGE : %c"${msgExtracted}"`, "color:#00ff41; font-weight:bold;", "color:#fff; background:#222; padding:2px;");
        }

        // Tampilkan HEX dan STRING secara langsung (Maksimal 500 karakter agar tidak memenuhi console)
        const displayHex = hex.length > 500 ? hex.substring(0, 1000000) + "..." : hex;
        console.log(`%c📜 HEX : %c${displayHex}`, "color:#888; font-size:10px;", "color:#aaa; font-family:monospace;");
        console.log(`%c🔤 TXT : %c${new TextDecoder().decode(view)}`, "color:#888; font-size:10px;", "color:#ddd; font-family:monospace;");

        // Garis pemisah antar paket agar tidak bingung
        console.log("%c" + "-".repeat(50), "color: #333");
    };






})();
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
function SuksessNotif(message) {
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
function parsersock(artikels) {


    const postingan = artikels || "";
    const isBaru = artikels.includes("baru saja") || artikels.includes("baru");
    const isMenit = /\b[0-9]\s*menit\b/.test(artikels);
    const isAdmins = isAdminFast(artikels);
    if (!isAdmins) return false;
    if (!(isBaru || isMenit)) return false;
    if (CekBacklist(postingan.toLowerCase())) {
        return false;
    }
    if (!CekKeyword(postingan.toLowerCase())) return false;
    return true;
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
    for (const DataKeyword of keyword) {
        const kata = DataKeyword.toLowerCase()
        if (postingan.toLowerCase().includes(kata)) {
            console.log(`✅ Keyword ditemukan: "${kata}"`);
            return true;
        }
    }
    return false;
}

function isAdminFast(name) {
    const cleanedName = cleanName(name);
    return adminList.some(a => cleanedName.includes(cleanName(a)));
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
///////////////////////////////////////////////////////////////////////////////RUANG EKSEKUSI AWAL
async function cek_artikel() {
    cekkiment = setInterval(async () => {
        if (komentdone) return
        if (sedangjalan) return
        await waitNoDialog();
        let data = document.querySelectorAll('[data-tracking-duration-id]')
        var found_artikle = false
        for (const artikel of data) {
            const isiTeks = artikel.textContent ? artikel.textContent.trim() : "";
            if (!parsersock(isiTeks)) continue; // ini SKIP hanya artikel ini
            clearInterval(cekkiment);

            found_artikle = true;
        }


        if (!found_artikle) {
            await waitNoDialog();
            klikTombolByText("URUTKAN");
        }
    }, 20);


}

(async function () {

    const el = await tungguElemenAtauReload('.fixed-container', 20000);
    await tungguGroupAsync()
    if (el) {
        const tel = await cekPostinganAwal()
        if (!tel) {
            setTimeout(async () => {
                robotsock = "on"; // jalankan robot auto comment dengan menggunakan inject socket
                console.log("%c🤖 ROBOT SOCK: ON", "color: #00ffff; font-weight: bold;");
                await Mutation_Aktivitas()
                cek_artikel()
            }, 2000);
        }
    }








    ///////////////////////////////////////////////////////////////////////////////RUANG EKSEKUSI AWAL




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

    async function cek_artikel() {
        let cekkiment = setInterval(async () => {
            if (komentdone) return
            await waitNoDialog();
            let data = document.querySelectorAll('[data-tracking-duration-id]')
            var found_artikle = false
            for (const artikel of data) {
                const isiTeks = artikel.textContent ? artikel.textContent.trim() : "";
                if (!parsersock(isiTeks)) continue; // ini SKIP hanya artikel ini
                clearInterval(cekkiment);

                found_artikle = true;
            }


            if (!found_artikle) {
                await waitNoDialog();
                klikTombolByText("URUTKAN");
            }
        }, 20);


    }




    let countA = 0;
    async function Mutation_Aktivitas() {
        if (!document.location.href.includes("group") || komentdone) return;
        observercontetAktivitas = new MutationObserver(async (mutationsList) => {
            if (!document.location.href.includes("group") || komentdone) return;

            for (const mutation of mutationsList) {
                for (const node of mutation.addedNodes) {
                    if (node.nodeType !== 1) continue; // Bukan elemen
                    const text = node.textContent || "";
                    if (text.includes("Aktivitas terbaru")) {
                        const tombol = node.querySelectorAll("[role='button']");
                        if (tombol.length >= 2) {
                            tombol.forEach(btn => {
                                if (countA < 3) {
                                    setTimeout(() => {
                                        if (btn.textContent.includes("Postingan baru")) {
                                            btn.click();
                                            countA++;
                                        }
                                    }, 50);
                                } else {
                                    setTimeout(() => {
                                        if (btn.textContent.includes("Aktivitas terbaru")) {
                                            btn.click();
                                            countA = 0;
                                        }
                                    }, 50);
                                }
                            });
                        }
                    }

                }
            }
        });

        observercontetAktivitas.observe(document.body, { childList: true, subtree: true });
        console.log("🟢 Mutation_cekArticle aktif");
    }


    function klikTombolByText(teks) {
        if (!document.location.href.includes("group") || komentdone) return;
        const tombol = Array.from(document.querySelectorAll('[role="button"], [tabindex="0"]'))
            .find(el => el.textContent.trim() === teks);
        if (tombol) {
            tombol.click();
            console.log(`✅ Klik tombol "${teks}"`);
            return true;
        }
        return false;
    }


















    // Jalankan fungsi ini saat script socket dimulai
    function loadData() {
        const rawGroup = localStorage.getItem('groupList_Shared');
        const rawAdmin = localStorage.getItem('adminList_Shared');

        if (rawGroup) {
            const parsed = JSON.parse(rawGroup);
            groupNames = parsed.map(item => item.group.toLowerCase()); // Semua jadi kecil untuk deteksi
            CommentList = parsed.map(item => item.comment);
        }

        if (rawAdmin) {
            adminList = JSON.parse(rawAdmin);
        }

        console.log("🚀 Data Siap Digunakan di Socket!");
    }



    function tungguElemenAtauReload(selector, timeoutMs = 20000) {
        return new Promise((resolve) => {
            const startTime = Date.now();

            const interval = setInterval(() => {
                loadData()
                const rawAdmins = localStorage.getItem('adminList_Shared');
                adminList = rawAdmins ? JSON.parse(rawAdmins) : [];

                const el = document.querySelector(selector);

                // 1. Jika elemen ditemukan
                if (el && groupNames.length > 0 && adminList.length > 0 && CommentList.length > 0) {
                    clearInterval(interval);
                    resolve(el);
                    return;
                }

                // 2. Jika sudah lewat dari batas waktu (timeout)
                if (Date.now() - startTime > timeoutMs) {
                    clearInterval(interval);
                    console.error("⌛ Timeout: Elemen tidak ditemukan. Reloading...");
                    location.reload();
                }
            }, 100); // Cek setiap 1 detik agar sangat ringan
        });
    };

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

    async function tungguGroupAsync() {
        const start = Date.now();
        while (Date.now() - start < 150000) { // 15 detik timeout
            const result = getCommentForGroup();
            if (result) {
                commentToPost = Random(result.comment);
                grouptToPost = result.groupName;
                console.log("✅ Nama grup : " + grouptToPost + " | Comment : " + commentToPost);
                groups = groupNames.map(groupId => ({ groupId, defaultValue: false }));
                return { commentToPost, grouptToPost };
            }
            await new Promise(r => setTimeout(r, 500));
        }
        console.warn("⚠️ Timeout tunggu grup.");
        return null;
    }


    async function cekPostinganAwal() {
        var postingan = document.querySelectorAll('[data-tracking-duration-id]');
        var found = false;
        postingan.forEach((el) => {
            // Gunakan optional chaining (?.) atau cek manual
            let teks = el.textContent ? el.textContent.trim() : "";
            if (parsersock(teks)) {
                found = true;
                const commentbox = el.getElementsByClassName('native-text');
                const tombolKirim = Array.from(commentbox).find(ec => {
                    const t = ec.textContent.toLowerCase();
                    return t.includes("jawab") || t.includes("tulis") || t.includes("komentari") || t.includes("postingan") || t.includes("beri");
                });
                if (tombolKirim) {
                    tombolKirim.click();
                    console.log("Klik Untuk Komentar")
                    setTimeout(() => {
                        const textarea = document.querySelector(".multi-line-floating-textbox");
                        const sendBtn = document.querySelector(".textbox-submit-button");
                        if (textarea && sendBtn) {
                            textarea.focus();
                            document.execCommand('insertText', false, commentToPost);
                            const opts = { bubbles: true, cancelable: true };
                            sendBtn.disabled = false;

                            // Urutan 3 serangkai agar 2 paket (Komen + Validasi) keluar bareng
                            sendBtn.dispatchEvent(new MouseEvent("mousedown", opts));
                            sendBtn.dispatchEvent(new MouseEvent("mouseup", opts));
                            sendBtn.click(); // Kadang click() perlu sebagai trigger final
                            showNotification("KIRIM")
                            return true;
                        }

                    }, 500);
                }
            }
        });

        if (found) {
            return true;
        } else {
            return false;
        }


    }


})();
