window.initBabonLogic = function (namagroup19, Comment19) {
    var GROUP_ID = "KOSONG";
    var MEMBER_ID = "KOSONG";
    var groupName = null;
    var doc_idkomentar = null;
    var PAGINATION_QUERY_DOC_ID = "";
    var keyword = ["ROOM", "R**M", "𝗥𝗢𝗢𝗠", "LOMBA", "𝗟𝗢𝗠𝗕𝗔", "𝐋𝐎𝐌𝐁𝐀", "LIMBA", "ROM", "R00M", "login", "𝐑𝐎𝐎𝐌", "HONGKONG", "SINGAPUR", "nemo", "l0mb4", "lomb4", "l0mba", "𝗥𝟬𝟬𝗠", "𝗟𝟬𝗠𝗕𝗔", "𝘙𝘖𝘖𝘔", "hatori", "klikh4tori001", "🅻🅾🅼🅱🅰"]
    var Backlist = ["pemenang lomba", "rekap", "natidulu", "room lomba freebet", "prediksi", "result", "juara lomba", "r3k4p", "r3kap", "rek4p", "undang"]
    var portingsock = 9015;
    var baseURL = `http://127.0.0.1:8080/${Comment19}.json`;
    var URLGROUP = baseURL;

    if (typeof pasar !== 'undefined') {
        if (pasar === "SG") {
            URLGROUP = `http://127.0.0.1:8080/${Comment19}_SG.json`;
        } else if (pasar === "SD") {
            URLGROUP = `http://127.0.0.1:8080/${Comment19}_SD.json`;
        }
    }
    var URLADMIN = "http://127.0.0.1:8080/Admin_group_Baru.json";

    let adminList = [];
    let isAdminListReady = false;
    var SCRIPT_NAME = Comment19;
    var limitwaktu = 15;
    var grouptToPost = '';
    var COMMENT_TEXT = "Cobakan";
    var cachedFbDtsg = null;
    var cachedScale = null;
    var tokenLSD = null;
    var groupNames = [];
    var CommentList = [];
    var siteData = {};
    var EXPIRATION_MS = 2 * 60 * 1000;
    var now = Date.now();
    const LOCAL_KEY = "cachedAdminList";
    const VERSION_KEY = "cachedAdminVersion";
    let ws;
    let timerWatchdog;
    const idChrome = Math.floor(Math.random() * 9999);
    var cookieDewa = ""
    var userAgentAsli = ""

    function tungguAmunisiSakti() {
        return new Promise((resolve, reject) => {
            // 1. Jika memori lokal sudah ada cookie, langsung resolve
            if (typeof cookieDewa !== 'undefined' && cookieDewa) {
                return resolve({ cookieDewa, userAgentAsli });
            }

            // 2. CEK FISIK DOM TERLEBIH DAHULU (Penting!)
            // Jika Playwright lebih cepat dari Tampermonkey, elemen ini sudah ada
            const elemenAmunisiAwal = document.getElementById('wadah-amunisi-node');
            if (elemenAmunisiAwal && elemenAmunisiAwal.value) {
                try {
                    const dataAmunisi = JSON.parse(elemenAmunisiAwal.value);
                    console.log("🎯 Tampermonkey: Cookie Sakti sudah standby di DOM!");

                    cookieDewa = dataAmunisi.cookie_sakti;
                    userAgentAsli = dataAmunisi.user_agent_asli;
                    elemenAmunisiAwal.value = ""; // Kosongkan agar tidak dobel

                    return resolve({ cookieDewa, userAgentAsli });
                } catch (err) {
                    // Lanjut ke listener jika gagal parsing
                }
            }

            // 3. JIKA BELUM ADA, BARU DAFTARKAN LISTENER
            console.log("⏳ Tampermonkey: Menunggu injeksi Cookie dari Node.js...");

            document.addEventListener('amunisi_siap', function handler() {
                const elemenAmunisi = document.getElementById('wadah-amunisi-node');

                if (elemenAmunisi && elemenAmunisi.value) {
                    try {
                        const dataAmunisi = JSON.parse(elemenAmunisi.value);
                        console.log("🎯 Tampermonkey berhasil menangkap event Cookie Sakti!");

                        cookieDewa = dataAmunisi.cookie_sakti;
                        userAgentAsli = dataAmunisi.user_agent_asli;
                        elemenAmunisi.value = "";

                        document.removeEventListener('amunisi_siap', handler);
                        resolve({ cookieDewa, userAgentAsli });

                    } catch (err) {
                        console.error("Gagal membaca amunisi dari DOM", err);
                        reject(err);
                    }
                }
            });
        });
    }
    // ==========================================
    // UI DASHBOARD & STATUS PENGINTAI
    // ==========================================
    function updateStatusSocket(status) {
        let statusEl = document.getElementById('bejo-socket-status');
        if (!statusEl) {
            statusEl = document.createElement('div');
            statusEl.id = 'bejo-socket-status';
            Object.assign(statusEl.style, {
                position: 'fixed', top: '5px', left: '5px', padding: '8px 15px',
                borderRadius: '5px', color: '#fff', fontWeight: 'bold', fontSize: '14px',
                zIndex: '2147483647', pointerEvents: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
            });
            document.body.appendChild(statusEl);
        }

        if (status === 'CONNECTING') {
            statusEl.style.backgroundColor = '#FF9800'; statusEl.innerText = '🔌 Intel: Mencari Node.js...';
        } else if (status === 'CONNECTED') {
            statusEl.style.backgroundColor = '#4CAF50'; statusEl.innerText = '🟢 Intel: Terhubung ke Markas';
        } else if (status === 'DISCONNECTED') {
            statusEl.style.backgroundColor = '#F44336'; statusEl.innerText = '🔴 Intel: Terputus dari Node.js';
        }
    }

    function buatDashboardUI() {
        // (Sama seperti sebelumnya, hanya untuk log visual)
        const uiId = 'bejo-terminal-dashboard';
        if (document.getElementById(uiId)) return;
        const dash = document.createElement('div');
        Object.assign(dash.style, {
            position: 'fixed', bottom: '100px', left: '5px', width: '350px',
            backgroundColor: 'rgba(15, 15, 15, 0.95)', color: '#00ff00', fontFamily: 'monospace',
            fontSize: '12px', borderRadius: '8px', zIndex: '2147483646', display: 'flex', flexDirection: 'column'
        });
        dash.innerHTML = `<div style="background:#222; padding:8px; border-bottom:1px solid #444; font-weight:bold; color:#fff;">🖥️ Intel Sniper Log</div>
                          <div id="bejo-log-content" style="height:250px; overflow-y:auto; padding:10px; display:flex; flex-direction:column; gap:5px;"></div>`;
        document.body.appendChild(dash);
    }

    function cetakLog(pesan, tipe = 'info') {
        const content = document.getElementById('bejo-log-content');
        if (!content) return;
        let warna = tipe === 'error' ? '#ff4444' : tipe === 'success' ? '#66ff00' : '#eee05e';
        const logLine = document.createElement('div');
        logLine.innerHTML = `<span style="color:#666;">[${new Date().toLocaleTimeString('id-ID')}]</span> <span style="color:${warna};">${pesan.replace(/%c/g, '')}</span>`;
        content.appendChild(logLine);
        content.scrollTop = content.scrollHeight;
        if (content.childNodes.length > 40) content.removeChild(content.firstChild);
    }

    // ==========================================
    // PENGUMPULAN DATA (AMUNISI)
    // ==========================================
    function initDynamicVars() {
        if (cachedFbDtsg && cachedScale !== null) return { fb_dtsg: cachedFbDtsg, scale: cachedScale };

        const fb_dtsg = require("DTSGInitialData").token;
        const scale = window.devicePixelRatio;
        if (!fb_dtsg) throw new Error("'fb_dtsg' tidak ditemukan.");

        cachedFbDtsg = fb_dtsg;
        cachedScale = scale;

        const elemenScript = document.getElementById('__eqmc');
        if (elemenScript) {
            const dataJson = JSON.parse(elemenScript.textContent);
            window.dataUser = Object.fromEntries(new URLSearchParams(dataJson.u.split('?')[1]));
            window.dataUserdt = dataJson;
        }

        const semuaScript = document.querySelectorAll('script[type="application/json"]');
        for (const script of semuaScript) {
            if (script.textContent.includes('"LSD"')) {
                const hasilCocok = script.textContent.match(/"LSD"\s*,\s*\[\]\s*,\s*\{\s*"token"\s*:\s*"([^"]+)"\}/);
                if (hasilCocok && hasilCocok[1]) {
                    tokenLSD = hasilCocok[1];
                    break;
                }
            }
        }

        // Ambil SiteData untuk Meta Spin (dibutuhkan payload komentar)
        try {
            const fbRequire = (typeof unsafeWindow !== 'undefined') ? unsafeWindow.require : window.require;
            if (fbRequire) siteData = fbRequire("SiteData") || {};
        } catch (e) { }

        return { fb_dtsg, scale };
    }

    // Fungsi otomatis ekstrak ID & Nama Grup (Persis seperti aslimu)
    async function otomatisEkstrakDataGrup() {
        let namagurpuser = ""; let namaGrupMentah = "";
        for (let i = 0; i < 10; i++) {
            const elemenUser = document.querySelector('[data-ad-rendering-role="profile_name"]');
            if (elemenUser) {
                namagurpuser = (elemenUser.textContent || "").trim();
                namaGrupMentah = document.title.replace(/^\(\d+\)\s*/, '').replace(/\s*\|\s*Facebook\s*/g, '').trim();
                const urlMatch = window.location.href.match(/\/groups\/(\d+)/);
                if (urlMatch) GROUP_ID = urlMatch[1];
                if (GROUP_ID) break;
            }
            await new Promise(r => setTimeout(r, 1000));
        }
        if (namaGrupMentah) groupName = (namaGrupMentah.trim() + " " + namagurpuser).trim();
    }

    function waitForPaginationId() {
        return new Promise((resolve) => {
            const check = setInterval(() => {
                try {
                    const mod_komentar = require("useCometUFICreateCommentMutation_facebookRelayOperation");
                    if (mod_komentar) doc_idkomentar = mod_komentar;

                    const mod = require("GroupsCometFeedRegularStoriesPaginationQuery_facebookRelayOperation");
                    if (mod) {
                        PAGINATION_QUERY_DOC_ID = mod;
                        clearInterval(check);
                        resolve();
                        return;
                    }
                } catch (e) { }
            }, 1000);
        });
    }
    async function tungguGroupNames() {
        return new Promise(resolve => {
            const cekInterval = setInterval(() => {
                if (groupNames && groupNames.length > 0) {
                    clearInterval(cekInterval);
                    resolve();
                }
            }, 500);
        });
    }

    // (Dummy function agar variabel tidak error)
    async function manageGroups() {
        if (!groupNames || groupNames.length === 0) {
            console.log("⏳ Menunggu aliran data masuk ke groupNames...");
            await tungguGroupNames();
        }

        const now = Date.now();

        // --- TAMBAHKAN INI JIKA BELUM ADA ---
        // Misalnya kita set kedaluwarsa 24 Jam (dalam milidetik)
        const groups = groupNames.map(groupId => ({ groupId, defaultValue: false }));
        console.log(`✅ Data siap! groups berisi: ${groups.length} item.`);

        for (const { groupId, defaultValue } of groups) {
            const key = `group_${groupId} `;
            const expireKey = `${key} _expire`;
            const expireAt = await GM.getValue(expireKey, 0);

            console.log(`🔹 Grup: ${groupId} | now: ${now} | expireAt: ${expireAt} `);

            if (now > expireAt) {
                try {
                    await GM.setValue(key, defaultValue);
                    await GM.setValue(expireKey, now + EXPIRATION_MS);
                } catch (error) {
                    console.error(`❌ Gagal menyimpan data untuk grup ${groupId}: `, error);
                }
            }
        }

        // Lanjut pengecekan komentar
        const groupKey = `group_${grouptToPost} `;
        if (groupKey === "group_") {
            return;
        }

        const sudahKomentar = await GM.getValue(groupKey, false);
        if (sudahKomentar) {
            console.log(`Sudah Komentar ${now} `);
            location.href = "about:blank";
            return;
        }
    }






    async function fetchGroupsFromGitHub() {
        return new Promise((resolve, reject) => {
            function loadGroup(urlToFetch) {
                GM_xmlhttpRequest({
                    method: "GET",
                    url: urlToFetch,
                    onload: function (response) {
                        // Cek HTTP status code untuk fallback (contoh: 404 Not Found)
                        if (response.status !== 200 && urlToFetch !== baseURL) {
                            console.log("⚠️ Fallback ke baseURL karena " + urlToFetch + " tidak ditemukan.");
                            return loadGroup(baseURL);
                        }

                        try {
                            const data = JSON.parse(response.responseText);

                            data.forEach((item) => {
                                if (item.group && item.comment) {
                                    groupNames.push(normalizeToBasicLatin(item.group).toLowerCase());
                                    CommentList.push(item.comment);
                                }
                            });

                            if (namagroup19 && Comment19) {
                                groupNames.push(normalizeToBasicLatin(namagroup19).toLowerCase());
                                CommentList.push(Comment19);
                            }

                            console.log("✅ Group list berhasil diambil dari " + urlToFetch + ":", groupNames.length);
                            AmbildataKomentar();
                            resolve();

                        } catch (e) {
                            if (urlToFetch !== baseURL) {
                                console.log("⚠️ JSON invalid dari " + urlToFetch + ", fallback ke baseURL.");
                                return loadGroup(baseURL);
                            }
                            console.error("❌ Gagal parse JSON grup:", e);
                            reject(e);
                        }
                    },
                    onerror: function (err) {
                        if (urlToFetch !== baseURL) {
                            console.log("⚠️ Error jaringan dari " + urlToFetch + ", fallback ke baseURL.");
                            return loadGroup(baseURL);
                        }
                        console.error("❌ Gagal ambil grup:", err);
                        reject(err);
                    }
                });
            }

            // Mulai fetch dari URL utama
            loadGroup(URLGROUP);
        });
    }


    function getCommentForGroup() {
        const commentMap = {};
        for (let i = 0; i < groupNames.length; i++) {
            commentMap[groupNames[i]] = normalizeToBasicLatin(CommentList[i]);
        }

        const cekurlutama = window.location.href;
        let ceknamagroup = document.title.replace(/^\(\d+\)\s*/, '').replace(/\s*\|\s*Facebook\s*/g, '').trim();
        let ceknamagroup1 = document.querySelector('[data-ad-rendering-role="profile_name"]')?.textContent || '';
        let ceknamagroup2 = "";
        let ceknamagroup3 = "";
        let ceknamagroup4 = "";
        let ceknamagroup5 = "";
        let combinedDesktop = (groupName || (ceknamagroup + " " + ceknamagroup1)).trim();

        if (cekurlutama.includes("user")) {
            ceknamagroup2 = document.querySelectorAll("[data-action-id][role='link'][data-focusable='true']")[0]?.textContent || '';
            ceknamagroup3 = document.querySelectorAll("[data-action-id][role='link']")[0]?.textContent || '';
            ceknamagroup4 = document.querySelectorAll("[data-action-id][role='link'][data-focusable='true']")[1]?.textContent || '';
            ceknamagroup5 = document.querySelectorAll("[data-action-id][role='link'][data-focusable='true']")[2]?.textContent || '';
        } else {
            ceknamagroup2 = document.getElementsByClassName("fixed-container")[0]?.textContent || '';
            ceknamagroup3 = document.getElementsByClassName('native-text')[5]?.textContent || '';
            ceknamagroup4 = document.getElementsByClassName('native-text')[6]?.textContent || '';
            ceknamagroup5 = document.querySelectorAll("[data-action-id][role='link'][data-focusable='true']")[0]?.textContent || '';
        }

        const allGroups = [
            normalizeToBasicLatin(combinedDesktop).toLowerCase(),
            normalizeToBasicLatin(ceknamagroup).toLowerCase(),
            normalizeToBasicLatin(ceknamagroup1).toLowerCase(),
            normalizeToBasicLatin(ceknamagroup2).toLowerCase(),
            normalizeToBasicLatin(ceknamagroup3).toLowerCase(),
            normalizeToBasicLatin(ceknamagroup4).toLowerCase(),
            normalizeToBasicLatin(ceknamagroup5).toLowerCase()
        ];

        for (let gName in commentMap) {
            if (allGroups.some(text => text.includes(gName))) {
                return { groupName: gName, comment: commentMap[gName] };
            }
        }
        return null;
    }

    function AmbildataKomentar() {
        const res = getCommentForGroup();

        if (res && res.comment && res.groupName) {
            COMMENT_TEXT = Random(res.comment);
            grouptToPost = res.groupName;
            window.commentToPost = COMMENT_TEXT;
            console.log(`%c💬 Komentar: ${COMMENT_TEXT} `, "color: blue; font-weight: bold; font-size: 14px;");
            console.log(`%c💬 Group: ${grouptToPost} `, "color: blue; font-weight: bold; font-size: 14px;");
        } else {
            console.log("❌ Tidak ada kata kunci yang cocok di dalam kalimat tersebut.");
        }
        initDynamicVars();
        console.log("✅ Group list berhasil diambil (Lokal):", groupNames, CommentList);
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

    function cleanName(s) {
        if (!s) return "";
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

                        isAdminListReady = true;
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


    // ==========================================
    // WEBSOCKET: KIRIM AMUNISI KE NODE.JS
    // ==========================================
    function hubungkanKeServer() {
        if (ws && (ws.readyState === WebSocket.CONNECTING || ws.readyState === WebSocket.OPEN)) return;
        updateStatusSocket('CONNECTING');

        ws = new WebSocket(`ws://localhost:${portingsock}`);

        ws.onopen = () => {
            updateStatusSocket('CONNECTED');
            cetakLog(`🟢 Terhubung ke Markas Node.js!`, 'success');

            // SAAT TERHUBUNG, LANGSUNG KIRIM SELURUH DATA KE NODE.JS
            kirimAmunisiKeNode();
        };

        ws.onmessage = (event) => {
            const pesanMasuk = event.data;
            // Jika Node.js mengirim laporan balik ke Chrome (opsional untuk monitoring)
            if (pesanMasuk.startsWith("LOG|")) {
                cetakLog(pesanMasuk.replace("LOG|", ""), 'info');
            }
        };

        ws.onclose = () => {
            updateStatusSocket('DISCONNECTED');
            setTimeout(hubungkanKeServer, 3000);
        };
        ws.onerror = () => { if (ws) ws.close(); };
    }

    function kirimAmunisiKeNode() {

        cetakLog(`📦 Merakit paket amunisi...`, 'warning');

        // Merakit JSON Payload
        const payloadSniper = {
            action: "REGISTER_INSTANCE",
            idChrome: idChrome,
            auth: {
                userId: window.dataUser.__user || MEMBER_ID,
                cookie: cookieDewa, // Node.js butuh cookie mentah ini
                fb_dtsg: cachedFbDtsg,
                lsd: tokenLSD,
                jazoest: window.dataUser.jazoest,
                userAgent: userAgentAsli // 👈 TAMBAHKAN INI
            },
            metaData: {
                hsi: siteData.hsi || window.dataUserdt?.e || '',
                spin_r: siteData.__spin_r || siteData.server_revision || '',
                spin_t: siteData.__spin_t || Math.floor(Date.now() / 1000).toString(),
                spin_b: siteData.__spin_b || 'trunk',
                scale: cachedScale || 1
            },
            targetData: {
                groupId: GROUP_ID,
                groupName: groupName,
                commentText: COMMENT_TEXT,
                queryDocId: PAGINATION_QUERY_DOC_ID,
                commentDocId: doc_idkomentar
            },
            rules: { //Variable Global , Hanya di kirim sekali saja dari salah satu chrome, jika sudah ada abaikan.
                adminList: adminList,
                limitWaktu: limitwaktu,
                Backlists: Backlist,
                Keywords: keyword
            }
        };

        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(payloadSniper));
            cetakLog(`🚀 Amunisi berhasil dikirim ke Node.js!`, 'success');
            cetakLog(`✅ Chrome sekarang memasuki Mode Siaga.`, 'success');
        }
    }
    // ==========================================
    // EKSEKUSI AWAL
    // ==========================================
    (async function () {
        buatDashboardUI();
        cetakLog(`🕵️‍♂️ Memulai operasi pengintaian...`, 'info');

        while (!groupName || !GROUP_ID) {
            await otomatisEkstrakDataGrup();
            if (!groupName) await new Promise(r => setTimeout(r, 1000));
        }


        await Promise.all([
            tungguAmunisiSakti(),
            fetchGroupsFromGitHub(),
            fetchAdminListFromGitHub(),
            manageGroups()
        ]);
        console.log(cookieDewa)

        initDynamicVars();
        AmbildataKomentar();

        cetakLog(`⏳ Menunggu Dokumen ID dari Facebook...`, 'warning');
        await waitForPaginationId();

        cetakLog(`✅ Semua amunisi terkumpul! Menghubungi Markas...`, 'success');

        // Setelah semua data siap, panggil socket
        hubungkanKeServer();

        // CHROME SEKARANG BERHENTI DI SINI. TIDAK ADA LAGI LOOPING MINTADATA!
    })();
};
