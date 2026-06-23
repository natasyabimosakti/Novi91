

window.initBabonLogic = function (namagroup18, Comment18) {










    var GROUP_ID = "1121229279202731";
    var MEMBER_ID = "61550121298009"
    var TARGET_FEEDBACK_ID = "ZmVlZGJhY2s6MTY3NjEwOTQyMDM4MTM3OA=="; // tugas akhir cari dari respon graph
    var groupName = null; //Nama Group mentah yang akan digabung dengan nama user, diambil dari judul tab atau script tag
    var doc_idkomentar = null; //require("useCometUFICreateCommentMutation_facebookRelayOperation")

    //AmbildataKomentar()
    //Komentari(A_TARGET_FEEDBACK_ID, doc_idkomentar, A_MEMBER_ID, COMMENT_TEXT) tinggal isi A_TARGET_FEEDBACK_ID, dan A_MEMBER_ID


    // Tugas akhin pasang interval buat panggil mintaData()






    var URLGROUP = `https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Comment/${Comment18}.json`;
    var keyword = ["ROOM", "R**M", "𝗥𝗢𝗢𝗠", "LOMBA", "𝗟𝗢𝗠𝗕𝗔", "𝐋𝐎𝐌𝐁𝐀", "LIMBA", "ROM", "R00M", "login", "𝐑𝐎𝐎𝐌", "HONGKONG", "SINGAPUR", "nemo", "l0mb4", "lomb4", "l0mba", "𝗥𝟬𝟬𝗠", "𝗟𝟬𝗠𝗕𝗔", "𝘙𝘖𝘖𝘔", "hatori", "klikh4tori001", "🅻🅾🅼🅱🅰"]
    var Backlist = ["pemenang lomba", "rekap", "natidulu", "room lomba freebet", "prediksi", "result", "juara lomba", "r3k4p", "r3kap", "rek4p", "undang"]
    var URLADMIN = "https://raw.githubusercontent.com/natasyabimosakti/ADMIN/refs/heads/main/Admin_group_Baru.json"
    var TELEGRAM_TOKEN = '8841941027:AAGt1LTI8GCVAOb2EAQzaQTP33n-qJTrFa4';
    var TELEGRAM_CHAT_ID = '-1002717306025';
    let adminList = [];
    var SCRIPT_NAME = Comment18
    var limitwaktu = 15; // dalam menit, untuk filter postingan baru
    var grouptToPost = '';
    var groupID = null; // 
    var COMMENT_TEXT = "Cobakan";
    var cachedFbDtsg = null;
    var cachedScale = null;
    var PAGINATION_QUERY_DOC_ID = ""; // require("ProfileCometContextualProfileGroupPostsFeedPaginationQuery_facebookRelayOperation");
    var tokenLSD = null;
    var groupNames = [];
    var CommentList = [];
    const LOCAL_KEY = "cachedAdminList";
    const VERSION_KEY = "cachedAdminVersion";
    var EXPIRATION_MS = 2 * 60 * 1000;
    var now = Date.now();
    var typevariable = "Grup";
    var groups = [];
    var presesmintadata = false; // Flag untuk mencegah tumpang tindih proses mintaData()
    var stopsemua = false; // Flag untuk menghentikan semua proses jika diperlukan  





    // Fungsi untuk membuat dan memperbarui indikator status Socket di kiri atas
    function updateStatusSocket(status) {
        let statusEl = document.getElementById('bejo-socket-status');

        // Jika elemen belum ada, buat baru
        if (!statusEl) {
            statusEl = document.createElement('div');
            statusEl.id = 'bejo-socket-status';

            // CSS untuk memaksa posisi di Kiri Atas dan tembus UI Facebook
            statusEl.style.position = 'fixed';
            statusEl.style.top = '5px';
            statusEl.style.left = '5px';
            statusEl.style.padding = '8px 15px';
            statusEl.style.borderRadius = '5px';
            statusEl.style.color = '#fff';
            statusEl.style.fontWeight = 'bold';
            statusEl.style.fontSize = '14px';
            statusEl.style.fontFamily = 'Arial, sans-serif';
            statusEl.style.zIndex = '2147483647'; // Nilai absolut maksimal
            statusEl.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3)';
            statusEl.style.pointerEvents = 'none'; // Agar tidak mengganggu klik mouse
            statusEl.style.transition = 'background-color 0.3s ease';

            document.body.appendChild(statusEl);
        }

        // Perbarui warna dan teks berdasarkan status
        if (status === 'CONNECTING') {
            statusEl.style.backgroundColor = '#FF9800'; // Oranye
            statusEl.innerText = '🔌 Socket: Menyambung...';
        } else if (status === 'CONNECTED') {
            statusEl.style.backgroundColor = '#4CAF50'; // Hijau
            statusEl.innerText = '🟢 Socket: Terhubung';
        } else if (status === 'DISCONNECTED') {
            statusEl.style.backgroundColor = '#F44336'; // Merah
            statusEl.innerText = '🔴 Socket: Terputus';
        }
    }




    function buatDashboardUI() {
        const uiId = 'bejo-terminal-dashboard';
        if (document.getElementById(uiId)) return; // Jangan buat dua kali

        // Container Utama
        const dash = document.createElement('div');
        dash.id = uiId;
        dash.style.position = 'fixed';
        dash.style.bottom = '100px';
        dash.style.left = '5px';
        dash.style.width = '350px';
        dash.style.backgroundColor = 'rgba(15, 15, 15, 0.95)';
        dash.style.color = '#00ff00';
        dash.style.fontFamily = 'Consolas, monospace';
        dash.style.fontSize = '12px';
        dash.style.borderRadius = '8px';
        dash.style.border = '1px solid #333';
        dash.style.zIndex = '2147483646'; // Sedikit di bawah Toast Anda
        dash.style.boxShadow = '0 5px 15px rgba(0,0,0,0.6)';
        dash.style.display = 'flex';
        dash.style.flexDirection = 'column';
        dash.style.transition = 'all 0.3s ease';

        // Header
        const header = document.createElement('div');
        header.style.backgroundColor = '#222';
        header.style.padding = '8px 12px';
        header.style.borderTopLeftRadius = '8px';
        header.style.borderTopRightRadius = '8px';
        header.style.fontWeight = 'bold';
        header.style.color = '#fff';
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.borderBottom = '1px solid #444';
        header.innerHTML = `<span>🖥️ Monitor Script</span><span id="bejo-toggle" style="cursor:pointer; padding:0 5px;">[ - ]</span>`;
        dash.appendChild(header);

        // Area Log (Tempat teks berjalan)
        const content = document.createElement('div');
        content.id = 'bejo-log-content';
        content.style.height = '250px';
        content.style.overflowY = 'auto';
        content.style.padding = '10px';
        content.style.display = 'flex';
        content.style.flexDirection = 'column';
        content.style.gap = '5px';
        dash.appendChild(content);

        document.body.appendChild(dash);

        // Fungsi Minimize/Maximize Jendela
        document.getElementById('bejo-toggle').addEventListener('click', function () {
            if (content.style.display === 'none') {
                content.style.display = 'flex';
                this.innerText = '[ - ]';
                dash.style.width = '350px';
            } else {
                content.style.display = 'none';
                this.innerText = '[ + ]';
                dash.style.width = '150px';
            }
        });
    }

    // ==========================================
    // FUNGSI PENCETAK LOG KE DASHBOARD
    // ==========================================
    function cetakLog(pesan, tipe = 'info') {
        const content = document.getElementById('bejo-log-content');
        if (!content) return;

        let warna = '#eee05e'; // Default hijau (info)
        if (tipe === 'error') warna = '#ff4444'; // Merah
        if (tipe === 'warning') warna = '#ca9911'; // Oranye
        if (tipe === 'success') warna = '#66ff00'; // Cyan

        const logLine = document.createElement('div');
        const waktu = new Date().toLocaleTimeString('id-ID');

        // Membersihkan pesan dari format %c bawaan console.log lama Anda jika terbawa
        const pesanBersih = pesan.replace(/%c/g, '');

        logLine.innerHTML = `<span style="color:#666;">[${waktu}]</span> <span style="color:${warna};">${pesanBersih}</span>`;
        content.appendChild(logLine);

        // Auto-scroll ke paling bawah
        content.scrollTop = content.scrollHeight;

        // Batasi maksimal 80 baris agar RAM browser tidak penuh
        if (content.childNodes.length > 40) {
            content.removeChild(content.firstChild);
        }

        // Opsional: Tetap buang ke console bawaan sebagai backup
        // console.log(`[Script] ${pesanBersih}`); 
    }



    let ws;
    let timerWatchdog; // Ubah nama agar fungsinya lebih jelas sebagai penjaga
    const idChrome = Math.floor(Math.random() * 9999);

    function dapatkanWaktuReconnect() {
        return 2000 + Math.floor(Math.random() * 2000);
    }

    function hubungkanKeServer() {
        // 1. PENCEGAHAN GANDA
        if (ws && (ws.readyState === WebSocket.CONNECTING || ws.readyState === WebSocket.OPEN)) {
            return;
        }
        updateStatusSocket('CONNECTING');
        // 2. Bersihkan sisa timer sebelumnya jika ada
        clearTimeout(timerWatchdog);

        ws = new WebSocket('ws://localhost:9015');

        // 🚨 KUNCI PERBAIKAN: Mulai hitung mundur 5 detik TEPAT SETELAH soket dibuat!
        // Jika onopen tidak pernah terpicu karena Chrome memblokir tab background, timer ini akan membunuhnya.
        timerWatchdog = setTimeout(() => {
            console.warn("⏳ Soket menggantung (Connecting) atau Server lambat. Memaksa reset...");
            if (ws) ws.close(); // Menutup paksa akan memicu ws.onclose -> mencoba ulang otomatis
        }, 5000);

        ws.onopen = () => {
            console.log(`🟢 [ID: ${idChrome}] Terhubung jaringan. Meminta konfirmasi server...`);
            // Kirim ID Chrome ke server
            ws.send(`MSUK|${idChrome}`);
            // Biarkan timerWatchdog tetap berjalan. Ia akan bertugas ganda menunggu balasan "OK".
        };

        ws.onmessage = (event) => {
            const pesanMasuk = event.data;

            // PERBAIKAN FATAL: Bersihkan spasi di awal dan akhir setiap elemen array
            const parts = pesanMasuk.split('|').map(item => item.trim());

            // 3. Cek apakah ini balasan konfirmasi dari server
            if (parts[0] === "OK" && parts[1] == idChrome) {
                console.log(`✅ [BERHASIL] Konfirmasi diterima! Senjata Siap!`);
                updateStatusSocket('CONNECTED');
                clearTimeout(timerWatchdog);
                return;
            }

            console.log(`📥 [PESAN MASUK] ${pesanMasuk}`);

            if (parts[0] === "EXEC") {
                if (typeof showToast === "function") showToast(`📥 [PESAN MASUK] ${pesanMasuk}`, "info");

                const TARGET_FEEDBACK = parts[1];
                const IdPemosting = parts[2];
                const groupName = parts[3] || window.groupName;
                const groupIDs = parts[4] || GROUP_ID;

                // PERINGATAN SCOPE: Pastikan variabel doc_idkomentar dan COMMENT_TEXT 
                // benar-benar tersedia secara global sebelum dipanggil di sini.
                // Jika tidak, skrip akan terhenti (ReferenceError).
                const docId = typeof doc_idkomentar !== "undefined" ? doc_idkomentar : "";
                const commentText = typeof COMMENT_TEXT !== "undefined" ? COMMENT_TEXT : "";
                console.log(`⚡[EKSEKUSI REMOTE] Komentari ${TARGET_FEEDBACK}...`);
                if (typeof AmbildataKomentar === "function") AmbildataKomentar();
                Komentari(TARGET_FEEDBACK, docId, IdPemosting, commentText, groupIDs);

            }
        };

        ws.onclose = (event) => {
            clearTimeout(timerWatchdog); // Pastikan watchdog mati
            ws = null; // Kosongkan variabel agar bisa membuat koneksi baru dari nol
            updateStatusSocket('DISCONNECTED');
            const delay = dapatkanWaktuReconnect();
            setTimeout(hubungkanKeServer, delay);
        };

        ws.onerror = (error) => {
            clearTimeout(timerWatchdog);
            updateStatusSocket('DISCONNECTED');
            // Tutup manual jika terjadi error agar segera masuk ke fungsi onclose
            if (ws && ws.readyState !== WebSocket.CLOSED) {
                ws.close();
            }
        };
    }

    // Eksekusi awal
    if (document.readyState === 'complete') {
        hubungkanKeServer();
    } else {
        window.addEventListener('load', hubungkanKeServer);
    }


    // TOMBOL TEMBAK MANUAL
    function TembakPerintah(FEEDBACK = "", IdPemostingnya = "", namagoupkotor = "", Group_ID = "") {
        if (ws && ws.readyState === 1) {
            if (document.location.href.includes(Group_ID)) {
                // PERBAIKAN: Spasi di sekitar tanda '|' dihapus total
                ws.send(`EXEC|${FEEDBACK}|${IdPemostingnya}|${namagoupkotor}|${Group_ID}`);
            }
        }
    };









    // Fungsi pembantu untuk menunggu sampai groupNames terisi data
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

    async function manageGroups() {
        if (!groupNames || groupNames.length === 0) {
            console.log("⏳ Menunggu aliran data masuk ke groupNames...");
            await tungguGroupNames();
        }

        const now = Date.now();
        const groups = groupNames.map(groupId => ({ groupId, defaultValue: false }));
        console.log(`✅ Data siap! groups berisi: ${groups.length} item.`);

        for (const { groupId, defaultValue } of groups) {
            const key = `group_${groupId}`;
            const expireKey = `${key}_expire`;
            const expireAt = await GM.getValue(expireKey, 0);

            console.log(`🔹 Grup: ${groupId} | now: ${now} | expireAt: ${expireAt}`);

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
        const groupKey = `group_${grouptToPost}`;
        if (groupKey === "group_") {
            return;
        }

        const sudahKomentar = await GM.getValue(groupKey, false);
        if (sudahKomentar) {
            console.log(`Sudah Komentar ${now}`);
            location.href = "about:blank";
            return;
        }
    }






    async function fetchGroupsFromGitHub() {
        const commentMap = {};

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


                        AmbildataKomentar()


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


    function AmbildataKomentar() {
        var textDariWeb = groupName || "";
        var textWebLower = textDariWeb.toLowerCase();
        var matchedIndex = groupNames.findIndex(kataKunci => textWebLower.includes(kataKunci));

        if (matchedIndex !== -1) {
            // Jika matchedIndex bukan -1, artinya kata kunci ditemukan
            COMMENT_TEXT = Random(CommentList[matchedIndex]);
            grouptToPost = groupNames[matchedIndex];
            console.log(`%c💬 Komentar: ${COMMENT_TEXT} `, "color: blue; font-weight: bold; font-size: 14px;");
            console.log(`%c💬 Group: ${grouptToPost} `, "color: blue; font-weight: bold; font-size: 14px;");

        } else {
            // Jika -1, artinya tidak ada satupun kata kunci di groupNames yang ada di teks web
            console.log("❌ Tidak ada kata kunci yang cocok di dalam kalimat tersebut.");
        }
        initDynamicVars()
        console.log("✅ Group list berhasil diambil (GitHub + Lokal):", groupNames, CommentList);


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

    async function fetchAdminListFromGitHub() {
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
                        console.log("%c👥 Daftar Admin Berhasil Dimuat:", "color: #fffa77; font-weight: bold;", adminList);
                        resolve(adminList); // ✅ resolve setelah data siap
                    } catch (e) {
                        cetakLog(`❌ Failed to parse remote admin list`, 'error');

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











    async function otomatisEkstrakDataGrup() {
        let namagurpuser = "";
        let namaGrupMentah = "";

        console.log("⏳ Memulai pencarian data grup & user (Maksimal 10 detik)...");

        // Loop berjalan maksimal 10 kali (Jeda 1 detik tiap putaran)
        for (let i = 0; i < 10; i++) {

            // 1. CEK ELEMEN NAMA USER TERLEBIH DAHULU
            const elemenUser = document.querySelector('[data-ad-rendering-role="profile_name"]');

            if (elemenUser) {
                namagurpuser = (elemenUser.textContent || "").trim();
                console.log(`✨ Elemen nama user langsung ditemukan: "${namagurpuser}"`);

                // JIKA USER KETEMU, LANGSUNG AMBIL NAMA GRUP DARI JUDUL TAB (Cepat & Akurat)
                let docTitle = document.title;
                namaGrupMentah = docTitle.replace(/^\(\d+\)\s*/, '').replace(/\s*\|\s*Facebook\s*/g, '').trim();

                // Coba ambil ID dari URL sekalian jika ada
                const urlMatch = window.location.href.match(/\/groups\/(\d+)/);
                if (urlMatch) groupID = urlMatch[1];

                // Jika ID juga langsung didapat dari URL, kita bisa langsung keluar dari Loop Utama
                if (groupID) {
                    console.log("🚀 Semua data langsung didapat tanpa memindai script tag!");
                    break;
                }
            }

            // 2. KONDISI JIKA USER BELUM KETEMU ATAU ID URL BELUM SIAP (Metode Cadangan: Scan Script)
            const semuaScript = document.querySelectorAll('script[type="application/json"]');
            for (let script of semuaScript) {
                const teksData = script.textContent || script.innerHTML;

                // Cari ID Group jika belum ada
                if (!groupID) {
                    const matchIdBaru = teksData.match(/"groupID":"(\d+)"/);
                    const matchIdLama = teksData.match(/"__typename":"Group","id":"(\d+)"/);

                    if (matchIdBaru) groupID = matchIdBaru[1];
                    else if (matchIdLama) groupID = matchIdLama[1];
                }

                // Cari Nama Group Mentah lewat script (hanya jika judul tab belum berhasil diambil)
                if (!namaGrupMentah) {
                    const matchNamaBaru = teksData.match(/"meta":\{"title":"([^"]+)"\}/);

                    if (matchNamaBaru && matchNamaBaru[1] !== "Facebook") {
                        try { namaGrupMentah = JSON.parse('"' + matchNamaBaru[1] + '"'); } catch (e) { namaGrupMentah = matchNamaBaru[1]; }
                    } else if (groupID) {
                        const regexLama = new RegExp('"id":"' + groupID + '","name":"([^"]+)"');
                        const matchNamaLama = teksData.match(regexLama);
                        if (matchNamaLama) {
                            try { namaGrupMentah = JSON.parse('"' + matchNamaLama[1] + '"'); } catch (e) { namaGrupMentah = matchNamaLama[1]; }
                        }
                    }
                }
            }

            // Cek apakah data sudah lengkap di putaran ini
            if (groupID && namaGrupMentah && namagurpuser) {
                break;
            }

            // Jeda 1 detik jika data belum siap
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        // ==========================================
        // VALIDASI CADANGAN AKHIR (Jika loop selesai tapi ada yang kosong)
        // ==========================================
        if (!groupID) {
            const urlMatch = window.location.href.match(/\/groups\/(\d+)/);
            if (urlMatch) groupID = urlMatch[1];
        }

        if (!namaGrupMentah) {
            let docTitle = document.title;
            namaGrupMentah = docTitle.replace(/^\(\d+\)\s*/, '').replace(/\s*\|\s*Facebook\s*/g, '').trim();
        }

        // ==========================================
        // PROSES GABUNG AKHIR
        // ==========================================
        if (namaGrupMentah) {
            groupName = (namaGrupMentah.trim() + " " + namagurpuser).trim();
        }

        // 3. Output hasil akhir dan teruskan ke script bawahnya
        if (groupID && groupName) {
            console.log("%c✅ Target Grup Berhasil Diekstrak!", "color: green; font-weight: bold; font-size: 14px;");
            console.log(`%c✅ Nama Group: ${groupName} `, "color: red; font-weight: bold; font-size: 14px;");
            console.log(`%c✅ ID Group: ${groupID} `, "color: red; font-weight: bold; font-size: 14px;");
            GROUP_ID = groupID; // Sinkronisasi variabel global
        }
    }

    // Jalankan fungsinya


    // Deklarasi variabel global

    // HAPUS kata 'async', ubah menjadi fungsi biasa
    function initDynamicVars() {
        // 1. Jika sudah ada di cache, langsung kembalikan (0.01 ms)
        if (cachedFbDtsg && cachedScale !== null) {
            return { fb_dtsg: cachedFbDtsg, scale: cachedScale };
        }

        // 2. Jika belum ada, baru ambil dari memori internal Facebook
        const fb_dtsg = require("DTSGInitialData").token;
        const scale = window.devicePixelRatio;

        if (!fb_dtsg) {
            throw new Error("'fb_dtsg' tidak ditemukan. Pastikan Anda sudah login.");
        }

        // 3. Simpan ke variabel global untuk pemanggilan berikutnya
        cachedFbDtsg = fb_dtsg;
        cachedScale = scale;

        const elemenScript = document.getElementById('__eqmc');

        if (elemenScript) {
            const dataJson = JSON.parse(elemenScript.textContent);
            // Ambil string URL dari properti "u"
            const urlU = dataJson.u;

            // Ekstrak parameter URL-nya secara otomatis
            const infoUser = Object.fromEntries(new URLSearchParams(urlU.split('?')[1]));

            // Simpan ke window agar bisa kamu panggil kapan saja di konsol
            window.dataUser = infoUser;
            window.dataUserdt = dataJson;
        }
        // 1. Ambil semua elemen script application/json di halaman
        const semuaScript = document.querySelectorAll('script[type="application/json"]');

        // 2. Loop setiap script untuk mencari yang berisi data LSD
        for (const script of semuaScript) {
            if (script.textContent.includes('"LSD"')) {
                // 3. Jika ketemu, langsung tembak menggunakan Regex
                const polaRegex = /"LSD"\s*,\s*\[\]\s*,\s*\{\s*"token"\s*:\s*"([^"]+)"\}/;
                const hasilCocok = script.textContent.match(polaRegex);

                if (hasilCocok && hasilCocok[1]) {
                    tokenLSD = hasilCocok[1];
                    break; // Hentikan loop karena token sudah ketemu
                }
            }
        }

        // 4. Output hasilnya
        if (tokenLSD) {
            window.tokenLSD = tokenLSD; // Simpan ke variabel global
            console.log("%c[SUKSES] Token LSD Ditemukan!", "color: green; font-weight: bold;");
            console.log("Nilai Token:", tokenLSD);
        } else {
            console.log("%c[GAGAL] Token LSD tidak ditemukan di script mana pun.", "color: red;");
        }

        cachedFbDtsg = dataUserdt.f || fb_dtsg;
        return { fb_dtsg, scale };
    }

    async function capturePcket() {
        'use strict';

        const processedPosts = new Set();

        // 1. EXTREME SKIP LIST: 'comet_sections' DIHAPUS dari sini agar teks bisa terbaca!
        // 'extensions' tetap diblokir karena berisi data analitik raksasa yang membebani CPU.
        const IGNORED_KEYS = {
            'extensions': 1, 'plugins': 1, 'ghl_label': 1,
            'text_format_metadata': 1, 'attachments': 1, 'action_links': 1,
            'top_reactions': 1, 'reaction_display_config': 1, 'profile_picture': 1,
            'actor_photo': 1, 'context_layout': 1, 'layout': 1, 'header': 1,
            'shareable_from_perspective_of_feed_ufi': 1
        };

        function processObject(jsonObj, fallbackTime) {
            let currentGroupId = "Tidak ditemukan";

            function deepSearch(obj) {
                if (!obj || typeof obj !== 'object') return false;

                // Tangkap ID Grup
                if (obj.associated_group && obj.associated_group.id) {
                    currentGroupId = obj.associated_group.id;
                }

                // Validasi keberadaan Feedback ID (ZmV... dsb)
                let feedbackId = obj.feedback?.id || obj.feedback?.story?.feedback_context?.feedback?.id || null;

                // Jika ID ada dan belum pernah diproses
                if (feedbackId && feedbackId.length <= 40 && feedbackId.startsWith('ZmV')) {

                    // Cari Teks (Menjangkau lebih dalam jika ada di comet_sections)
                    let isiTeks = obj.message?.text || obj.body?.text || obj.text ||
                        obj.comet_sections?.message?.story?.message?.text || null;

                    // Jika teks ketemu, kita eksekusi!
                    if (isiTeks !== null && !processedPosts.has(feedbackId)) {
                        processedPosts.add(feedbackId);

                        let authorObj = obj.author || obj.actor || obj.story_header?.story?.actor ||
                            (obj.actors && obj.actors[0]) || obj.owning_profile;

                        let pemostingName = authorObj?.name || "Tidak ditemukan";
                        let pemostingId = authorObj?.id || "Tidak ditemukan";
                        if (pemostingId === currentGroupId) {
                            pemostingName = "Tidak ditemukan";
                            pemostingId = "Tidak ditemukan";
                        }

                        let rawTime = obj.creation_time || obj.created_time || obj.publish_time ||
                            obj.story_header?.story?.creation_time || fallbackTime;

                        let waktuPost = "Tidak ditemukan";
                        if (rawTime) {
                            waktuPost = new Date(rawTime * 1000).toLocaleString('id-ID', {
                                hour: '2-digit', minute: '2-digit', second: '2-digit'
                            }) + ' WIB';
                        }

                        const dataPostingan = { currentGroupId, feedbackId, pemostingName, pemostingId, waktuPost, rawTime, isiTeks: isiTeks.trim() };

                        try {
                            if (parsePost(dataPostingan)) {

                                Komentari(feedbackId, doc_idkomentar, pemostingId, COMMENT_TEXT, groupID);
                                // 3. Eksekusi fungsi tambahan SETELAH payload utama meluncur
                                try {
                                    TembakPerintah(feedbackId, pemostingId, groupName, groupID);
                                } catch (error) {
                                    console.error("[SKRIP KOMENTAR] Gagal tembak perintah tambahan:", error);
                                }
                                cetakLog(`📫 [ POSTINGAN DITEMUKAN ]`, 'success');
                                cetakLog(`--------------------------`, 'success');
                                cetakLog(`📌Nama Group  : ${grouptToPost}`, 'success');
                                cetakLog(`● ID Group    : ${groupID}`, 'success');
                                cetakLog(`👤Postingan   : ${pemostingName}`, 'success');
                                cetakLog(`● ID Pemosting: ${pemostingId}`, 'success');
                                cetakLog(`>_FeedID      : ${feedbackId}`, 'success');
                                cetakLog(`🕒Waktu       : ${waktuPost}`, 'success');

                                console.log(`%c[LOMBA] 🎯 DITEMUKAN! | ID: ${feedbackId} | Waktu: ${waktuPost}`, 'color: #00ff00; font-weight: bold; font-size: 13px; background: #111; padding: 3px;');
                            } else {
                                console.log(`%c[LOMBA] Tidak memenuhi kriteria filter parsePost()`, 'color: #ffaa00; font-style: italic;');
                            }
                        } catch (e) {
                            console.error("Error di parsePost atau Komentari:", e);
                        }

                        return true;
                    }
                }

                // Traversing cabang
                if (Array.isArray(obj)) {
                    for (let i = 0; i < obj.length; i++) {
                        if (deepSearch(obj[i])) return true;
                    }
                } else {
                    for (let key in obj) {
                        if (IGNORED_KEYS[key] === 1) continue;
                        if (obj.hasOwnProperty(key)) {
                            if (deepSearch(obj[key])) return true;
                        }
                    }
                }
                return false;
            }

            return deepSearch(jsonObj);
        }

        function extractPostData(rawText) {
            if (!rawText || rawText.indexOf('"feedback"') === -1) return;

            const startTime = performance.now();
            let itemsFound = 0;

            let cleanText = rawText.startsWith('for (;;);') ? rawText.slice(9) : rawText;

            let fallbackTime = null;
            const timeIdx = cleanText.indexOf('"creation_time":');
            if (timeIdx !== -1) {
                fallbackTime = parseInt(cleanText.substring(timeIdx + 16, timeIdx + 26), 10);
            }

            let startIdx = 0;
            const len = cleanText.length;

            while (startIdx < len) {
                let endIdx = cleanText.indexOf('\n', startIdx);
                if (endIdx === -1) endIdx = len;

                if (endIdx - startIdx > 100) {
                    const line = cleanText.substring(startIdx, endIdx);

                    if (line.indexOf('"feedback"') !== -1) {
                        try {
                            const jsonObj = JSON.parse(line);
                            if (processObject(jsonObj, fallbackTime)) itemsFound++;
                        } catch (err) { }
                    }
                }
                startIdx = endIdx + 1;
            }

        }

        const originalOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function (method, url, ...args) {
            this._url = url;
            return originalOpen.apply(this, [method, url, ...args]);
        };

        const originalSend = XMLHttpRequest.prototype.send;
        XMLHttpRequest.prototype.send = function (body) {
            this.addEventListener('readystatechange', function () {
                if ((this.readyState === 3 || this.readyState === 4) && this._url && this._url.indexOf('/api/graphql/') !== -1) {
                    if (this.responseText) extractPostData(this.responseText);
                }
            });
            return originalSend.apply(this, arguments);
        };

        const originalFetch = window.fetch;
        window.fetch = async function (...args) {
            const url = args[0];
            const response = await originalFetch.apply(this, args);
            if (typeof url === 'string' && url.indexOf('/api/graphql/') !== -1) {
                const clone = response.clone();
                clone.text().then(text => extractPostData(text)).catch(() => { });
            }
            return response;
        };
    }


    // 1. Tambahkan parameter limitwaktu dengan nilai default 5
    // Terima langsung objek 'artikels'
    function isPostinganBaruRaw(artikels) {
        const timestamp = parseInt(artikels.rawTime, 10);
        const waktuPostMs = timestamp * 1000;
        const waktuSekarangMs = Date.now();

        // 1. Dapatkan selisih dalam milidetik murni
        const selisihMs = waktuSekarangMs - waktuPostMs;
        const selisihMenit = selisihMs / 60000;

        // 2. Titipkan kedua nilainya ke dalam object
        artikels.selisihMs = selisihMs; // Tambahan baru untuk ms
        artikels.selisihTeks = selisihMenit.toFixed(1);

        return selisihMenit >= 0 && selisihMenit < limitwaktu;
    }

    function parsePost(artikels) {
        const texts = (artikels.isiTeks || "").toLowerCase();
        const author = (artikels.pemostingName || "").toLowerCase();

        const isAdmins = isAdminFast(author);
        if (!isAdmins) return false;

        // Kirim seluruh objek 'artikels', bukan cuma rawTime-nya
        if (!isPostinganBaruRaw(artikels, 5)) return false;

        if (CekBacklist(texts)) return false;
        if (!CekKeyword(texts)) return false;

        return true;
    }




    function CekBacklist(postinganBL) {
        for (const DataBacklist of Backlist) {
            const kata = DataBacklist.toLowerCase()
            if (postinganBL.toLowerCase().includes(kata)) {
                cetakLog(`⚠️  Postingan di backlist ${postinganBL}`, 'info');
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

































    async function mintaData() {
        presesmintadata = true;
        initDynamicVars()
        let fb_dtsg, scale;
        try {
            ({ fb_dtsg, scale } = await initDynamicVars());
        } catch (error) {
            console.error("[SKRIP KONSOL] Gagal mengambil variabel dinamis:", error);
            presesmintadata = false;
            return;
        }

        siapkanPeluruKomentar()

        // 1. Simpan data JSON ke dalam variabel object
        const variablesUser = {
            "feedLocation": "GROUP_MEMBER_BIO_FEED",
            "feedbackSource": null,
            "focusCommentID": null,
            "memberID": MEMBER_ID,
            "postsToLoad": 1,
            "privacySelectorRenderLocation": "COMET_STREAM",
            "referringStoryRenderLocation": null,
            "renderLocation": "group_bio",
            "sortingSetting": "CHRONOLOGICAL",
            "scale": scale,
            "useDefaultActor": false,
            "id": GROUP_ID,

            // Variabel internal Relay Facebook (dikumpulkan menggunakan ...internalRelay di bawah)
            "__relay_internal__pv__GHLShouldChangeAdIdFieldNamerelayprovider": true,
            "__relay_internal__pv__GHLShouldChangeSponsoredDataFieldNamerelayprovider": true,
            "__relay_internal__pv__CometFeedStory_enable_reactor_facepilerelayprovider": false,
            "__relay_internal__pv__CometFeedStory_enable_social_bubblesrelayprovider": false,
            "__relay_internal__pv__CometFeedStory_enable_post_permalink_white_space_clickrelayprovider": false,
            "__relay_internal__pv__CometUFICommentActionLinksRewriteEnabledrelayprovider": false,
            "__relay_internal__pv__CometUFICommentAvatarStickerAnimatedImagerelayprovider": false,
            "__relay_internal__pv__IsWorkUserrelayprovider": false,
            "__relay_internal__pv__TestPilotShouldIncludeDemoAdUseCaserelayprovider": false,
            "__relay_internal__pv__FBReels_deprecate_short_form_video_context_gkrelayprovider": true,
            "__relay_internal__pv__FBReels_enable_view_dubbed_audio_type_gkrelayprovider": true,
            "__relay_internal__pv__CometFeedShareMedia_shouldPrefetchShareImagerelayprovider": false,
            "__relay_internal__pv__CometImmersivePhotoCanUserDisable3DMotionrelayprovider": false,
            "__relay_internal__pv__WorkCometIsEmployeeGKProviderrelayprovider": false,
            "__relay_internal__pv__IsMergQAPollsrelayprovider": false,
            "__relay_internal__pv__FBReelsMediaFooter_comet_enable_reels_ads_gkrelayprovider": true,
            "__relay_internal__pv__CometUFIReactionsEnableShortNamerelayprovider": false,
            "__relay_internal__pv__CometUFICommentAutoTranslationTyperelayprovider": "AUTO_TRANSLATE",
            "__relay_internal__pv__CometUFIShareActionMigrationrelayprovider": true,
            "__relay_internal__pv__CometUFISingleLineUFIrelayprovider": true,
            "__relay_internal__pv__relay_provider_comet_ufi_ssr_seo_deferrelayprovider": true,
            "__relay_internal__pv__CometUFI_dedicated_comment_routable_dialog_gkrelayprovider": true,
            "__relay_internal__pv__ReelsIFUCard_reelsIFULikeCountrelayprovider": false,
            "__relay_internal__pv__FBReelsIFUTileContent_reelsIFUPlayOnHoverrelayprovider": true,
            "__relay_internal__pv__GroupsCometGYSJFeedItemHeightrelayprovider": 206,
            "__relay_internal__pv__ShouldEnableBakedInTextStoriesrelayprovider": false,
            "__relay_internal__pv__StoriesShouldIncludeFbNotesrelayprovider": true
        };











        const variables = {
            "count": 5,
            "cursor": null,
            "feedLocation": "GROUP",
            "feedType": "DISCUSSION",
            "feedbackSource": 0,
            "focusCommentID": null,
            "privacySelectorRenderLocation": "COMET_STREAM",
            "referringStoryRenderLocation": null,
            "renderLocation": "group",
            "scale": scale,
            "sortingSetting": "CHRONOLOGICAL",
            "stream_initial_count": 1,
            "useDefaultActor": false,
            "id": GROUP_ID,
            "__relay_internal__pv__GHLShouldChangeAdIdFieldNamerelayprovider": true,
            "__relay_internal__pv__GHLShouldChangeSponsoredDataFieldNamerelayprovider": true,
            "__relay_internal__pv__CometFeedStory_enable_reactor_facepilerelayprovider": false,
            "__relay_internal__pv__CometFeedStory_enable_social_bubblesrelayprovider": false,
            "__relay_internal__pv__CometFeedStory_enable_post_permalink_white_space_clickrelayprovider": false,
            "__relay_internal__pv__CometUFICommentActionLinksRewriteEnabledrelayprovider": false,
            "__relay_internal__pv__CometUFICommentAvatarStickerAnimatedImagerelayprovider": false,
            "__relay_internal__pv__IsWorkUserrelayprovider": false,
            "__relay_internal__pv__TestPilotShouldIncludeDemoAdUseCaserelayprovider": false,
            "__relay_internal__pv__FBReels_deprecate_short_form_video_context_gkrelayprovider": true,
            "__relay_internal__pv__FBReels_enable_view_dubbed_audio_type_gkrelayprovider": true,
            "__relay_internal__pv__CometFeedShareMedia_shouldPrefetchShareImagerelayprovider": false,
            "__relay_internal__pv__CometImmersivePhotoCanUserDisable3DMotionrelayprovider": false,
            "__relay_internal__pv__WorkCometIsEmployeeGKProviderrelayprovider": false,
            "__relay_internal__pv__IsMergQAPollsrelayprovider": false,
            "__relay_internal__pv__FBReelsMediaFooter_comet_enable_reels_ads_gkrelayprovider": true,
            "__relay_internal__pv__CometUFIReactionsEnableShortNamerelayprovider": false,
            "__relay_internal__pv__CometUFICommentAutoTranslationTyperelayprovider": "AUTO_TRANSLATE",
            "__relay_internal__pv__CometUFIShareActionMigrationrelayprovider": true,
            "__relay_internal__pv__CometUFISingleLineUFIrelayprovider": true,
            "__relay_internal__pv__relay_provider_comet_ufi_ssr_seo_deferrelayprovider": true,
            "__relay_internal__pv__CometUFI_dedicated_comment_routable_dialog_gkrelayprovider": true,
            "__relay_internal__pv__ReelsIFUCard_reelsIFULikeCountrelayprovider": false,
            "__relay_internal__pv__FBReelsIFUTileContent_reelsIFUPlayOnHoverrelayprovider": true,
            "__relay_internal__pv__GroupsCometGYSJFeedItemHeightrelayprovider": 206,
            "__relay_internal__pv__ShouldEnableBakedInTextStoriesrelayprovider": false,
            "__relay_internal__pv__StoriesShouldIncludeFbNotesrelayprovider": true
        };

        const payload = new URLSearchParams();
        payload.append('fb_dtsg', fb_dtsg);
        payload.append('doc_id', PAGINATION_QUERY_DOC_ID);
        if (typevariable === "Profil") {
            payload.append('variables', JSON.stringify(variablesUser));
        } else {
            payload.append('variables', JSON.stringify(variables));
        }
        payload.append('fb_api_caller_class', 'RelayModern');
        payload.append('fb_api_req_friendly_name', 'GroupsCometFeedRegularStoriesPaginationQuery');
        try {
            const response = await fetch('/api/graphql/', { // 1. URL ABSOLUT
                method: 'POST',
                mode: "same-origin",
                credentials: 'include', // 2. WAJIB BAWA COOKIE LOGIN
                keepalive: true,
                headers: {
                    // 3. HEADER WAJIB FACEBOOK RELAY
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-ASBD-ID': '129477', // Konstanta internal FB
                    'X-FB-Friendly-Name': 'GroupsCometFeedRegularStoriesPaginationQuery'
                },
                body: payload, // Pastikan ini adalah URLSearchParams, BUKAN FormData
            });

            console.log(`[SKRIP KONSOL] Permintaan selesai dengan status: ${response.status} ${response.statusText} `);

            if (response.ok) {
                // 1. Baca sebagai teks
                let textResult = await response.text();

                if (!textResult || textResult.trim() === "") {
                    showToast('Minta data Error', 'error');
                    return;
                }

                // 2. BERSIHKAN PROTEKSI FACEBOOK (Hapus awalan 'for (;;);' jika ada)
                // Ini wajib karena sering membuat parse error di karakter pertama
                textResult = textResult.replace(/^for\s*\(\s*;\s*;\s*\)\s*;\s*/, '');

                // 3. Pecah teks berdasarkan baris baru (NDJSON)
                const lines = textResult.split('\n');

                let result = null;
                let node = null;

                // 4. Cari JSON yang benar di antara tumpukan baris
                for (const line of lines) {
                    if (!line.trim()) continue; // Lewati baris kosong

                    try {
                        const parsedLine = JSON.parse(line);

                        // Cek apakah baris JSON ini adalah data GraphQL yang kita cari
                        if (parsedLine?.data?.node) {
                            result = parsedLine;
                            node = parsedLine.data.node;
                            break; // Langsung hentikan pencarian jika sudah ketemu
                        }
                    } catch (err) {
                        // Abaikan diam-diam jika ada baris yang memang bukan JSON
                        continue;
                    }
                }

                // 5. Cek apakah setelah dicari-cari, 'node'-nya tetap tidak ada
                if (!node) {
                    showToast('Data node tidak ditemukan', 'error');
                    presesmintadata = false; // Reset flag jika data tidak ditemukan
                    return;
                }

                // 6. Validasi struktur
                const isGroup = node?.__typename === "Group";
                const hasFeed = node?.group_feed?.edges || node?.group_member_feed?.edges;

                if (isGroup && hasFeed) {
                    cetakLog(`Respond  : Suksess`, 'success');

                    presesmintadata = false; // Reset flag setelah berhasil
                } else {
                    showToast('minta data Error struktur bukan Group Feed', 'error');
                    console.warn("%c[SKRIP KONSOL] GAGAL! HTTP Sukses, tapi struktur bukan Group Feed.", "color: orange; font-weight: bold;");
                    console.warn("[SKRIP KONSOL] Detail Node yang ditangkap:", node);
                }

            }
        } catch (error) {
            // Menangkap error jaringan, atau error saat JSON.parse (jika format server kacau)
            showToast('Terjadi error saat memproses permintaan', 'error');
            presesmintadata = false; // Reset flag jika terjadi error
            console.error("%c[SKRIP KONSOL] GAGAL! Terjadi error saat memproses permintaan.", "color: red; font-weight: bold;", error);
        }
    }












    function showToast(message, type = 'success') {
        // 1. Timpa CSS dengan desain model pertama (Dark Mode klasik)
        let styleEl = document.getElementById('toast-styles');
        if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = 'toast-styles';
            document.head.appendChild(styleEl);
        }

        // PERBAIKAN FATAL: Seluruh spasi pada properti CSS dihapus
        // Menggunakan z-index absolut tertinggi: 2147483647
        styleEl.innerHTML = `
        #toast-container { position: fixed; bottom: 5px; left: 5px; display: flex; flex-direction: column; gap: 10px; z-index: 2147483647; pointer-events: none; }
        .toast {
            font-size: 18px;
            min-width: 300px;
            padding: 20px 10px;
            border-radius: 5px;
            font-weight: bold;
            background-color: #333;
            color: white;
            font-family: Impact, fantasy;
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.3s ease, transform 0.3s ease;
            pointer-events: auto;
        }
        .toast.show { opacity: 1; transform: translateY(0); }
        .toast.success { border-left: 10px solid #4CAF50; }
        .toast.error { border-left: 10px solid #F44336; }
        .toast.info { border-left: 10px solid #e8f800; }
    `;

        // 2. Buat kontainer jika belum ada
        let container = document.getElementById('toast-container');
        if (!container) {
            const targetElement = document.body || document.documentElement;
            targetElement.insertAdjacentHTML('beforeend', '<div id="toast-container"></div>');
            container = document.getElementById('toast-container');
        }

        // 3. LOGIKA BATAS MAKSIMAL 5 TOAST
        const activeToasts = container.querySelectorAll('.toast:not(.hiding)');

        if (activeToasts.length >= 5) {
            const oldestToast = activeToasts[0];
            oldestToast.classList.add('hiding');
            oldestToast.classList.remove('show');

            setTimeout(() => {
                oldestToast.remove();
            }, 300);
        }

        // 4. Buat dan tampilkan toast baru (Perbaikan spasi ekstra pada class)
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerText = message;

        container.appendChild(toast);

        // 5. Jalankan animasi masuk
        setTimeout(() => toast.classList.add('show'), 10);


    }









    let templatePayload = new URLSearchParams();
    let templateVariables = {};
    function siapkanPeluruKomentar() {
        let siteData = {};

        try {
            // Gunakan unsafeWindow untuk mengakses fungsi require bawaan Facebook dari dalam userscript
            const fbRequire = (typeof unsafeWindow !== 'undefined') ? unsafeWindow.require : window.require;
            if (fbRequire) {
                siteData = fbRequire("SiteData");
            }
        } catch (e) {
            console.warn("[SKRIP KOMENTAR] Gagal membaca SiteData secara dinamis, menggunakan data cadangan.");
        }

        let fb_dtsg, scale;
        try {
            ({ fb_dtsg, scale } = initDynamicVars());
        } catch (error) {
            console.error("[SKRIP KOMENTAR] Gagal mendapatkan fb_dtsg:", error);
            panggilanKomentar = false; // Reset sebelum return agar tidak deadlock
            return;
        }
        const mutationId = crypto.randomUUID();

        // Parameter Identitas Utama
        templatePayload.append('av', dataUser.__user); // Sesuai payload manual asli Anda
        templatePayload.append('__user', dataUser.__user);
        templatePayload.append('__a', '1');
        templatePayload.append('__req', '1l'); // Menandakan alur request pertama/live

        // Token & Keamanan
        templatePayload.append('fb_dtsg', fb_dtsg);
        templatePayload.append('jazoest', dataUser.jazoest);
        templatePayload.append('lsd', tokenLSD);

        // Metadata Halaman & Spin (Gunakan data terbaru atau fallback manual asli)
        templatePayload.append('__hsi', siteData.hsi || dataUserdt?.e || '');
        templatePayload.append('__spin_r', siteData.__spin_r || siteData.server_revision || '');
        templatePayload.append('__spin_t', siteData.__spin_t || Math.floor(Date.now() / 1000).toString());
        templatePayload.append('__spin_b', siteData.__spin_b || 'trunk');
        // GraphQL Data
        templatePayload.append('fb_api_caller_class', 'RelayModern');
        templatePayload.append('fb_api_req_friendly_name', 'useCometUFICreateCommentMutation');
        templatePayload.append('server_timestamps', 'true');


        templateVariables = {
            "feedLocation": "GROUP",
            "feedbackSource": 0,
            "input": {
                "client_mutation_id": mutationId, // Biasanya bernilai kecil pendek di web asli
                "attachments": null,
                "formatting_style": null,
                "message": {
                    "ranges": [],
                },
                "attribution_id_v2": `CometGroupDiscussionRoot.react, comet.group, via_cold_start, ${Date.now()}, 529686, 2361831622,,`,
                "vod_video_timestamp": null,
                "is_tracking_encrypted": true, // WAJIB TRUE mengikuti payload asli manual
                "tracking": [
                    // Catatan: Jika gagal, isi array ini dengan string tracking asli yang kamu dapat dari DOM post tersebut
                    "{\"assistant_caller\":\"comet_above_composer\",\"conversation_guide_session_id\":null,\"conversation_guide_shown\":null}"
                ],
                "feedback_source": "PROFILE",
                "idempotence_token": `client:${crypto.randomUUID()}`,
                "session_id": crypto.randomUUID()
            },
            "inviteShortLinkKey": null,
            "renderLocation": null,
            "scale": scale || 1,
            "useDefaultActor": false,
            "focusCommentID": null,
            "translationType": "AUTO_TRANSLATE",
            "canUseNicknameOnComet": false,
            "__relay_internal__pv__groups_comet_use_glvrelayprovider": false,
            "__relay_internal__pv__CometUFICommentActionLinksRewriteEnabledrelayprovider": false,
            "__relay_internal__pv__CometUFICommentAvatarStickerAnimatedImagerelayprovider": false,
            "__relay_internal__pv__IsWorkUserrelayprovider": false,
            "__relay_internal__pv__CometUFICommentAutoTranslationTyperelayprovider": "AUTO_TRANSLATE"
        };

    }

    var panggilanKomentar = false;

    // Dibuat tanpa async di awal deklarasi utama jika memungkinkan, tapi tetap async untuk await response nanti
    async function Komentari(A_TARGET_FEEDBACK_ID = "", A_doc_idkomentar = "", A_MEMBER_ID = "", A_COMMENT_TEXT = "", A_GROUP_ID = "") {
        if (panggilanKomentar) {
            console.warn("[SKRIP KOMENTAR] Panggilan komentar sudah berjalan.");
            return;
        }
        cetakLog(`⌯⌲ [ KIRIM KOMENTAR ]`, 'info');

        stopsemua = true;
        panggilanKomentar = true;

        // 1. Siapkan Payload Secepat Mungkin (Tanpa await atau fungsi eksternal yang berat)
        templateVariables.groupID = A_GROUP_ID;
        templateVariables.input.feedback_id = A_TARGET_FEEDBACK_ID;
        templateVariables.input.message.text = A_COMMENT_TEXT;
        templateVariables.input.client_mutation_id = crypto.randomUUID();
        templateVariables.input.idempotence_token = `client:${crypto.randomUUID()}`;
        templateVariables.input.session_id = crypto.randomUUID();

        let payload = new URLSearchParams(templatePayload);
        payload.set('doc_id', A_doc_idkomentar);
        payload.set('variables', JSON.stringify(templateVariables));

        // 2. TEMBAK SEKARANG JUGA! (Simpan promise-nya, jangan langsung di-await agar tidak memblokir timer)
        const fetchPromise = fetch('/api/graphql/', {
            method: 'POST',
            mode: "cors",
            credentials: 'include',
            keepalive: true,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-ASBD-ID": "129477",
                "X-FB-Friendly-Name": "useCometUFICreateCommentMutation"
            },
            body: payload,
        });


        try {
            const response = await fetchPromise; // Sekarang kita tunggu hasil jaringannya
            let textResult = await response.text();
            textResult = textResult.replace(/^for\s*\(\s*;\s*;\s*\)\s*;\s*/, '');

            const responseData = JSON.parse(textResult.split('\n')[0]);
            console.log("[SKRIP KOMENTAR] Respons Mentah Server:", responseData);

            if (responseData?.errors && responseData.errors.length > 0) {
                cetakLog(`[ ❌ KOMENTAR DITOLAK ]`, 'warning');
                cetakLog(`[ ❌ Akun Terblokir   ]`, 'warning');

                console.error("[SKRIP KOMENTAR] KOMENTAR DITOLAK SERVER:", responseData.errors[0]?.summary || responseData.errors);
                if (typeof showToast === "function") showToast('Komentar Diblokir oleh Facebook', 'error');
            } else if (responseData?.data?.comment_create) {
                cetakLog(`[ ✅ KOMENTAR BERHASIL TERKIRIM ]`, 'success');
                cetakLog(`[ 📨 ${A_COMMENT_TEXT} ]`, 'success');

                console.log("%c[SKRIP KOMENTAR] KOMENTAR SUKSES MASUK!", "color: #00ff00; font-weight: bold;");
                if (typeof showToast === "function") showToast('Komentar Berhasil Dikirim', 'success');
            } else {
                console.warn("[SKRIP KOMENTAR] PERINGATAN: Respons server tidak dikenali.", responseData);
                cetakLog(`[ ⚠️ KOMENTAR TERKIRIM ]`, 'warning');
                cetakLog(`[ ❓ RESPON TIDAK DI KETAHUI ]`, 'warning');
                cetakLog(`[ SILAHKAN CEK AKUN FACEBOOK ]`, 'warning');


            }

            GM.setValue("group_" + grouptToPost, true);
            GM.setValue("group_" + grouptToPost + "_expire", Date.now() + EXPIRATION_MS);

        } catch (error) {
            cetakLog(`[ 🚨 Function KOMENTAR Error ]`, 'error');
            console.error("[SKRIP KOMENTAR] Terjadi error saat memproses fetch:", error);
        } finally {
        }
    }

    // Fungsi untuk menangkap/menunggu variabel dengan Promise
    function waitForPaginationId() {
        return new Promise((resolve) => {
            const check = setInterval(() => {
                // Di dalam setInterval(..., waktu) kamu:

                try {
                    const mod_komentar = require("useCometUFICreateCommentMutation_facebookRelayOperation")
                    if (mod_komentar) {
                        doc_idkomentar = mod_komentar;
                    }
                    const mod = require("GroupsCometFeedRegularStoriesPaginationQuery_facebookRelayOperation");
                    // Cukup gunakan if (mod) untuk mengecek apakah datanya ada
                    if (mod) {
                        PAGINATION_QUERY_DOC_ID = mod;
                        typevariable = "Grup";
                        clearInterval(check);
                        resolve(); // Melanjutkan ke baris berikutnya
                        return; // PENTING: Hentikan fungsi di sini agar tidak mengeksekusi mod2
                    }
                } catch (e) {
                    // Abaikan error diam-diam. Ini wajar jika modul belum dirender oleh Facebook.
                }

                try {
                    const mod_komentar = require("useCometUFICreateCommentMutation_facebookRelayOperation")
                    if (mod_komentar) {
                        doc_idkomentar = mod_komentar;
                    }
                    const mod2 = require("ProfileCometContextualProfileGroupPostsFeedPaginationQuery_facebookRelayOperation");
                    if (mod2) {
                        PAGINATION_QUERY_DOC_ID = mod2;
                        typevariable = "Profil";
                        clearInterval(check);
                        resolve();
                        return;
                    }
                } catch (e) {
                    // Abaikan error
                }
            }, 1000);
        });
    }



    (async function () {
        unsafeWindow.mintaData = mintaData;
        unsafeWindow.Komentari = Komentari;
        unsafeWindow.AmbildataKomentar = AmbildataKomentar;


        // 1. Ambil data dari GitHub secara paralel (ini tidak masalah bersamaan)

        while (!groupName || !groupID) {
            await otomatisEkstrakDataGrup();
            if (!groupName || !groupID) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                console.log("[SKRIP KONSOL] groupName belum ada, mencoba lagi...");
            }
        }

        initDynamicVars()

        var urlAsli = window.location.href;

        // 1. Lakukan pencocokan (tampung dulu ke variabel, jangan langsung ditarik [1]-nya)
        var matchUrl = urlAsli.match(/\/user\/(\d+)/);
        var tek = require("CurrentUserInitialData").USER_ID
        // 2. Cek apakah kecocokan berhasil ditemukan
        if (tek) {
            MEMBER_ID = tek; // Update global variabel
        } else {
            if (matchUrl) {
                var memberId = matchUrl[1]; // Aman diambil karena matchUrl bukan null
                console.log("✅ ID saja:", memberId);
                MEMBER_ID = memberId; // Update global variabel
            }
        }



        await Promise.all([
            fetchGroupsFromGitHub(),
            fetchAdminListFromGitHub(),
            waitForPaginationId(),
            manageGroups()
        ]);

        await capturePcket();
        buatDashboardUI()

        console.log("[SKRIP KONSOL] Menunggu PAGINATION_QUERY_DOC_ID...");
        console.log("[SKRIP KONSOL] PAGINATION_QUERY_DOC_ID siap:", PAGINATION_QUERY_DOC_ID);



        async function jalankanLooping() {
            try {
                // Jika sedang tidak ada proses, jalankan
                if (presesmintadata == false && stopsemua == false) {
                    await mintaData();
                    cetakLog(`Send : Minta Data`, 'info');
                }
            } catch (error) {
                console.error("Terjadi kesalahan saat meminta data:", error);
                presesmintadata = false; // Pastikan kunci dibuka jika terjadi error
            } finally {
                setTimeout(jalankanLooping, 700);
            }
        }

        // Mulai jalankan
        jalankanLooping();

    })();

};
