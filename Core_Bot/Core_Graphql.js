

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
    var EXPIRATION_MS = 5 * 60 * 1000;
    var now = Date.now();
    var typevariable = "Grup";
    var groups = [];
    var presesmintadata = false; // Flag untuk mencegah tumpang tindih proses mintaData()
    var stopsemua = false; // Flag untuk menghentikan semua proses jika diperlukan  













    let ws;
    let waktuReconnect = 2000;
    let timerTungguServer; // Variabel penampung timer 5 detik
    const idChrome = Math.floor(Math.random() * 9999);

    function hubungkanKeServer() {
        // PENCEGAHAN GANDA
        if (ws && (ws.readyState === WebSocket.CONNECTING || ws.readyState === WebSocket.OPEN)) {
            return;
        }

        console.log("🔄 Mencoba terhubung ke server lokal (ws://localhost:9015)...");
        ws = new WebSocket('ws://localhost:9015');

        ws.onopen = () => {
            console.log(`🟢 [ID: ${idChrome}] Terhubung jaringan. Meminta konfirmasi server...`);

            // 1. Kirim ID Chrome ke server
            ws.send(`MSUK|${idChrome}`);

            // 2. Mulai hitung mundur 5 detik (5000 ms)
            timerTungguServer = setTimeout(() => {
                console.warn("⏳ Server lambat/tidak membalas dalam 5 detik. Mengulang koneksi...");
                ws.close(); // Ini akan otomatis memicu ws.onclose -> hubungkanKeServer()
            }, 5000);
        };

        ws.onmessage = (event) => {
            const pesanMasuk = event.data;
            const parts = pesanMasuk.split('|');

            // 3. Cek apakah ini balasan konfirmasi dari server
            if (parts[0] === "OK" && parts[1] == idChrome) {
                console.log(`✅ [BERHASIL] Konfirmasi diterima! Senjata Siap!`);
                clearTimeout(timerTungguServer); // Matikan timer 5 detik agar koneksi tidak diputus
                return; // Hentikan eksekusi di sini agar tidak lanjut ke logika bawah
            }

            console.log(`📥 [PESAN MASUK] ${pesanMasuk}`);

            // Format: EXEC|ID_POST|DOC_ID|COMMENT_TEXT|GROUP_NAME|GROUP_ID
            if (parts[0] === "EXEC") {
                const TARGET_FEEDBACK = parts[1];
                const docId = doc_idkomentar;
                const IdPemosting = parts[2];
                const commentText = COMMENT_TEXT;

                const groupName = parts[3] || window.groupName;
                const groupIDs = parts[4] || GROUP_ID;

                console.log(`⚡ [EKSEKUSI REMOTE] Komentari ${TARGET_FEEDBACK}...`);
                AmbildataKomentar();
                Komentari(TARGET_FEEDBACK, docId, IdPemosting, commentText, groupIDs);
            }
        };

        ws.onclose = (event) => {
            clearTimeout(timerTungguServer); // Bersihkan timer untuk mencegah kebocoran memori
            console.warn(`🔴 Koneksi terputus. Mencoba ulang dalam ${waktuReconnect / 1000} detik...`);
            setTimeout(hubungkanKeServer, waktuReconnect);
        };

        ws.onerror = (error) => {
            clearTimeout(timerTungguServer); // Bersihkan timer
            console.error("❌ Terjadi kesalahan pada WebSocket.");
            ws.close();
        };
    }

    // Eksekusi awal
    if (document.readyState === 'complete') {
        hubungkanKeServer();
    } else {
        window.addEventListener('load', hubungkanKeServer);
    }
    

    // TOMBOL TEMBAK MANUAL
    window.TembakPerintah = function (FEEDBACK, IdPemostingnya, namagoupkotor, Group_ID) {
        if (ws && ws.readyState === 1) {
            // Mengirim perintah mentah ke server
            if (document.location.href.includes(Group_ID)) {
                ws.send(`EXEC|${FEEDBACK}|${IdPemostingnya}|${namagoupkotor}|${Group_ID}`); // Format yang sama dengan yang diterima server
                console.log(`🚀 [KOMANDO DIKIRIM]: Komentari ${FEEDBACK} dengan teks "${commentText}"`); // Log perintah yang dikirim   
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

        // --- TAMBAHKAN INI JIKA BELUM ADA ---
        // Misalnya kita set kedaluwarsa 24 Jam (dalam milidetik)
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
                    console.error(`❌ Gagal menyimpan data untuk grup ${groupId}:`, error);
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
            console.log(`%c💬 Komentar : ${COMMENT_TEXT}`, "color: blue; font-weight: bold; font-size: 14px;");
            console.log(`%c💬 Group : ${grouptToPost}`, "color: blue; font-weight: bold; font-size: 14px;");

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
            console.log(`%c✅ Nama Group: ${groupName}`, "color: red; font-weight: bold; font-size: 14px;");
            console.log(`%c✅ ID Group: ${groupID}`, "color: red; font-weight: bold; font-size: 14px;");
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

        // Set untuk mencegah duplikasi pencetakan log di console
        const processedPosts = new Set();
        const processedCache = new Map();
        // Fungsi inti untuk menyisir objek JSON mencari data postingan
        function extractFromJSON(jsonObj, rawString) {
            // Abaikan komponen header atau pembatas halaman
            if (rawString.includes('"GroupsSectionHeaderUnit"')) {
                return;
            }

            let currentGroupId = "Tidak ditemukan";

            let fallbackTimeMatch = /"(?:creation_time|publish_time)"\s*:\s*(\d+)/.exec(rawString);
            let fallbackTime = fallbackTimeMatch ? parseInt(fallbackTimeMatch[1], 10) : null;

            // Fungsi pencarian ke dalam (rekursif)
            function deepSearch(obj) {
                if (!obj || typeof obj !== 'object') return;

                // Tangkap ID Group
                if (obj.associated_group && obj.associated_group.id) {
                    currentGroupId = obj.associated_group.id;
                }

                // Ciri khas postingan/komentar yang valid
                if (obj.feedback && (obj.message || obj.body || obj.text)) {

                    let feedbackId = obj.feedback.id ||
                        (obj.feedback.story && obj.feedback.story.feedback_context?.feedback?.id) ||
                        null;

                    if (feedbackId && feedbackId.length <= 40) {
                        processedPosts.add(feedbackId);
                        // 1. Ekstraksi Teks
                        let isiTeks = "Tanpa teks (Hanya foto/video/share link)";
                        if (obj.message && obj.message.text) isiTeks = obj.message.text;
                        else if (obj.body && obj.body.text) isiTeks = obj.body.text;
                        else if (obj.text) isiTeks = obj.text;

                        // 2. Ekstraksi Identitas Pemosting
                        let authorObj = obj.author || obj.actor ||
                            (obj.story_header?.story?.actor) ||
                            (obj.actors && obj.actors[0] ? obj.actors[0] : null) ||
                            obj.owning_profile;

                        let pemostingName = authorObj?.name || "Tidak ditemukan";
                        let pemostingId = authorObj?.id || "Tidak ditemukan";

                        if (pemostingId === currentGroupId) {
                            pemostingName = "Tidak ditemukan";
                            pemostingId = "Tidak ditemukan";
                        }

                        // 3. Ekstraksi Waktu (Menggunakan Fallback jika tidak ada di cabang ini)
                        let rawTime = obj.creation_time || obj.created_time || obj.publish_time ||
                            (obj.story_header?.story?.creation_time) || fallbackTime;

                        let waktuPost = "Tidak ditemukan";
                        if (rawTime) {
                            waktuPost = new Date(rawTime * 1000).toLocaleString('id-ID', {
                                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                                hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short'
                            }) + ' WIB';
                        }
                        const dataPostingan = {
                            currentGroupId,
                            feedbackId,
                            pemostingName: (pemostingName || "").trim(),
                            pemostingId,
                            waktuPost,
                            rawTime, // Pastikan ini tidak undefined di sumbernya
                            isiTeks: (isiTeks || "").trim()
                        };
                        const lolosFilter = parsePost(dataPostingan);
                        if (lolosFilter) {
                            TembakPerintah(feedbackId, pemostingId, groupName);
                            // === HANYA DIEKSEKUSI JIKA LOLOS SEMUA FILTER ===
                            Komentari(feedbackId, doc_idkomentar, pemostingId, COMMENT_TEXT, groupID);

                            //window.TembakPerintah = function (FEEDBACK, IdPemostingnya,namagoupkotor) {

                            console.log(`%c[POSTINGAN LOMBA]`, 'background: #1a1a1a; color: #a80d0d; font-weight: bold; padding: 5px 10px; border-radius: 5px; font-size: 15px;');
                            console.log(`%c ├─ ID Group    : ${currentGroupId}`, 'color: #3d028b; font-weight: bold; font-size: 12px; ');
                            console.log(`%c ├─ Feedback ID : ${feedbackId}`, 'color: #3d028b; font-weight: bold; font-size: 12px; ');
                            console.log(`%c ├─ Pemosting   : ${pemostingName} (ID: ${pemostingId})`, 'color: #3d028b; font-weight: bold; font-size: 12px; ');
                            console.log(`%c ├─ Waktu Post  : ${waktuPost}  ( ${dataPostingan.selisihMs} ms ) ${dataPostingan.selisihTeks} menit yang lalu`, 'color: #3d028b; font-weight: bold; font-size: 12px; ');
                            console.log(`%c └─ Isi Teks    : "${isiTeks}"`, 'color: #3d028b; font-weight: bold; font-size: 12px; ');
                            console.log(`%c--------------------------------------------------`, 'color: #555');

                        } else {
                            console.log(`%c[POSTINGAN DIABAIKAN] ${pemostingName} - ${waktuPost}`, 'color: #888; font-style: italic;');
                        }
                    }
                }

                for (let key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        deepSearch(obj[key]);
                    }
                }
            }

            deepSearch(jsonObj);
        }

        function extractPostData(rawText) {
            if (!rawText) return;

            // Bersihkan prefix keamanan bawaan Facebook (misal: "for (;;);")
            const cleanText = rawText.replace(/^for\s*\(\s*;\s*;\s*\)\s*;\s*/, '');

            try {
                const jsonObj = JSON.parse(cleanText);
                extractFromJSON(jsonObj, cleanText);
            } catch (e) {
                // Parsing untuk GraphQL JSONL stream
                const lines = cleanText.split('\n');
                for (const line of lines) {
                    if (line.trim()) {
                        try {
                            const parsedLine = JSON.parse(line);
                            extractFromJSON(parsedLine, line);
                        } catch (err) { }
                    }
                }
            }
        }

        // ==========================================
        // INTERCEPT NETWORK INTERFACE (XHR + FETCH)
        // ==========================================
        const originalOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function (method, url, ...args) {
            this._url = url;
            return originalOpen.apply(this, [method, url, ...args]);
        };

        const originalSend = XMLHttpRequest.prototype.send;
        XMLHttpRequest.prototype.send = function (body) {
            this.addEventListener('readystatechange', function () {
                if ((this.readyState === 3 || this.readyState === 4) && this._url && this._url.includes('/api/graphql/')) {
                    if (this.responseText) {
                        extractPostData(this.responseText);
                    }
                }
            });
            return originalSend.apply(this, arguments);
        };

        const originalFetch = window.fetch;
        window.fetch = async function (...args) {
            const url = args[0];
            const response = await originalFetch.apply(this, args);

            if (typeof url === 'string' && url.includes('/api/graphql/')) {
                const clone = response.clone();
                clone.text().then(text => {
                    extractPostData(text);
                }).catch(() => { });
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

            console.log(`[SKRIP KONSOL] Permintaan selesai dengan status: ${response.status} ${response.statusText}`);

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
                    presesmintadata = false; // Reset flag setelah berhasil
                    console.log("%c[SKRIP KONSOL] SUKSES! Data feed berhasil didapatkan.", "color: green; font-weight: bold;");

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

        styleEl.innerHTML = `
        /* Posisi dikunci di kiri bawah */
        #toast-container { position: fixed; bottom: 5px; left: 5px; display: flex; flex-direction: column; gap: 10px; z-index: 999999; pointer-events: none; }
        
        /* Desain simpel model pertama dengan font diperbesar */
        .toast { 
            font-size: 18px; 
            min-width: 300px; 
            padding: 20px 10px; 
            border-radius: 5px; 
            font-weight: bold;
            background-color: #333; 
            color: white; 
            font-family: Impact, fantasy; 
            box-shadow: 0 5px 10px rgba(0,0,0,0.1); 
            opacity: 0; 
            transform: translateY(20px); 
            transition: opacity 0.3s ease, transform 0.3s ease; 
            pointer-events: auto; 
        }
        .toast.show { opacity: 1; transform: translateY(0); }
        
        /* Garis indikator di sebelah kiri */
        .toast.success { border-left: 10px solid #4CAF50; }
        .toast.error { border-left: 10px solid #F44336; }
    `;

        // 2. Buat kontainer jika belum ada dan simpan ke variabel
        let container = document.getElementById('toast-container');
        if (!container) {
            // AMAN: Gunakan body jika ada, jika tidak gunakan documentElement
            const targetElement = document.body || document.documentElement;
            targetElement.insertAdjacentHTML('beforeend', '<div id="toast-container"></div>');
            container = document.getElementById('toast-container'); // Ambil referensinya
        }

        // --- LOGIKA BARU: BATAS MAKSIMAL 5 TOAST ---
        // Cari semua toast yang sedang aktif (tidak sedang dalam proses menghilang)
        const activeToasts = container.querySelectorAll('.toast:not(.hiding)');

        // Jika jumlah toast aktif sudah 5 atau lebih, hapus yang paling atas (paling lama)
        if (activeToasts.length >= 5) {
            const oldestToast = activeToasts[0];
            oldestToast.classList.add('hiding'); // Beri penanda agar tidak dihitung ganda jika tombol dispam
            oldestToast.classList.remove('show'); // Picu animasi mundur/hilang

            // Hapus elemen dari DOM setelah animasi CSS selesai (300ms)
            setTimeout(() => {
                oldestToast.remove();
            }, 300);
        }
        // -------------------------------------------

        // 3. Buat dan tampilkan toast baru
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerText = message;

        container.appendChild(toast);

        // 4. Jalankan animasi masuk
        setTimeout(() => toast.classList.add('show'), 10);
    }












    var panggilanKomentar = false; // Variabel global untuk mencegah duplikasi panggilan    


    async function Komentari(A_TARGET_FEEDBACK_ID = "", A_doc_idkomentar = "", A_MEMBER_ID = "", A_COMMENT_TEXT = "", A_GROUP_ID = "") {
        if (panggilanKomentar) {
            console.warn("[SKRIP KOMENTAR] Panggilan komentar sudah berjalan. Mohon tunggu hingga selesai sebelum memanggil lagi.");
            return;
        }
        stopsemua = true; // Set flag untuk menghentikan proses lain jika diperlukan
        panggilanKomentar = true; // Set flag untuk menandakan bahwa fungsi sedang berjalan
        console.time("Komentari");
        console.log(`[SKRIP KOMENTAR] Memulai ${A_TARGET_FEEDBACK_ID}, ${A_doc_idkomentar}, ${A_MEMBER_ID}, ${A_COMMENT_TEXT} ,${A_GROUP_ID}`);

        let fb_dtsg, scale;
        try {
            // HAPUS kata 'await' di sini
            ({ fb_dtsg, scale } = initDynamicVars());
        } catch (error) {
            console.error("[SKRIP KOMENTAR] Gagal mendapatkan fb_dtsg:", error);
            return;
        }

        const variables = {
            "feedLocation": "GROUP",
            "feedbackSource": 0,
            "groupID": A_GROUP_ID,
            "input": {
                "client_mutation_id": Math.floor(Math.random() * 10).toString(), // Biasanya bernilai kecil pendek di web asli
                "attachments": null,
                "feedback_id": A_TARGET_FEEDBACK_ID,
                "formatting_style": null,
                "message": {
                    "ranges": [],
                    "text": A_COMMENT_TEXT
                },
                "attribution_id_v2": `CometGroupDiscussionRoot.react,comet.group,via_cold_start,${Date.now()},529686,2361831622,,`,
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

        // PERBAIKAN 2: WAJIB gunakan URLSearchParams, BUKAN FormData
        const payload = new URLSearchParams();

        // Parameter Identitas Utama
        payload.append('av', dataUser.__user); // Sesuai payload manual asli Anda
        payload.append('__user', dataUser.__user);
        payload.append('__a', '1');
        payload.append('__req', '1l'); // Menandakan alur request pertama/live

        // Token & Keamanan
        payload.append('fb_dtsg', fb_dtsg);
        payload.append('jazoest', dataUser.jazoest);
        payload.append('lsd', tokenLSD);

        // Metadata Halaman & Spin (Gunakan data terbaru atau fallback manual asli)
        payload.append('__hsi', dataUserdt?.e);
        payload.append('__spin_r', '1041843449');
        payload.append('__spin_b', 'trunk');
        payload.append('__spin_t', Math.floor(Date.now() / 1000).toString()); // Detik timestamp

        // GraphQL Data
        payload.append('fb_api_caller_class', 'RelayModern');
        payload.append('fb_api_req_friendly_name', 'useCometUFICreateCommentMutation');
        payload.append('doc_id', A_doc_idkomentar);
        payload.append('variables', JSON.stringify(variables));
        payload.append('server_timestamps', 'true');

        console.log("[SKRIP KOMENTAR] Mengirim permintaan untuk mempublikasikan komentar...");
        console.timeEnd("Komentari");

        try {
            // Gunakan URL Absolut dan tambahkan Headers wajib Facebook
            const response = await fetch('/api/graphql', {
                method: 'POST',
                mode: "same-origin",
                credentials: 'include', // WAJIB BAWA COOKIE LOGIN
                keepalive: true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-ASBD-ID': '129477',
                    'X-FB-Friendly-Name': 'useCometUFICreateCommentMutation'
                },
                body: payload,
            });

            // Tangani respons "for (;;);" khas Facebook agar JSON.parse tidak error
            let textResult = await response.text();
            textResult = textResult.replace(/^for\s*\(\s*;\s*;\s*\)\s*;\s*/, '');

            // Parsing baris pertama saja (karena FB sering kirim NDJSON)
            const responseData = JSON.parse(textResult.split('\n')[0]);

            // LOGIKA BARU: Pengecekan Respons
            if (responseData?.errors && responseData.errors.length > 0) {
                // Kondisi 1: Gagal karena diblokir oleh Facebook (ada array "errors")
                const errorSummary = responseData.errors[0]?.summary || "Terjadi Kesalahan Server";
                showToast('Komentar Diblokir oleh Facebook', 'error');

            } else if (responseData?.data?.comment_create) {
                showToast('Komentar Berhasil Dikirim', 'success');
                const groupId = responseData.data.comment_create.feedback?.associated_group?.id;
                if (groupId) {
                    console.log(`[SKRIP KOMENTAR] Berhasil komentar di Grup ID: ${groupId}`);
                }
            } else {
                // Kondisi 3: Respons tidak terduga (bukan sukses dan bukan error API standar)
                showToast('Komentar Gagal Dikirim', 'error');
                console.warn("%c[SKRIP KOMENTAR] PERINGATAN: Respons dari server tidak dikenali.", "color: orange; font-weight: bold;");
                console.log("Isi Respons:", responseData);
            }

            // Log Variabel Parameter
            console.log(`%c[SKRIP KOMENTAR] Target Feedback ID: ${A_TARGET_FEEDBACK_ID}`, "color: blue;");
            console.log(`%c[SKRIP KOMENTAR] Doc ID: ${A_doc_idkomentar}`, "color: blue;");
            console.log(`%c[SKRIP KOMENTAR] Member ID: ${A_MEMBER_ID}`, "color: blue;");
            console.log(`%c[SKRIP KOMENTAR] Comment Text: ${A_COMMENT_TEXT}`, "color: blue;");
            GM.setValue("group_" + grouptToPost, true)
            GM.setValue("group_" + grouptToPost + "_expire", Date.now() + EXPIRATION_MS)
        } catch (error) {
            console.error("[SKRIP KOMENTAR] Terjadi error saat memproses fetch:", error);
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

        console.log("[SKRIP KONSOL] Menunggu PAGINATION_QUERY_DOC_ID...");
        console.log("[SKRIP KONSOL] PAGINATION_QUERY_DOC_ID siap:", PAGINATION_QUERY_DOC_ID);



        async function jalankanLooping() {
            try {
                // Jika sedang tidak ada proses, jalankan
                if (presesmintadata == false && stopsemua == false) {
                    await mintaData();

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
