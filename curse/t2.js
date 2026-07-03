const { TelegramClient, Api } = require("telegram");
const { StringSession } = require("telegram/sessions");
const { NewMessage } = require("telegram/events");
const { performance } = require("perf_hooks");
const fs = require("fs");
const path = require("path");

// ==========================================
// 1. PENGATURAN AWAL & VARIABEL
// ==========================================
const PID_FILE = path.join(__dirname, "bot.pid");
fs.writeFileSync(PID_FILE, process.pid.toString());
console.log(`\n🚀 MASTER BOT MENYALA (PID: ${process.pid})`);

process.on("SIGINT", () => {
    if (fs.existsSync(PID_FILE)) fs.unlinkSync(PID_FILE);
    process.exit();
});

// URL Github untuk database Admin
const URLADMIN = "https://raw.githubusercontent.com/natasyabimosakti/ADMIN/main/TargetID.json";
const DATABASE_FILE = path.join(__dirname, "database2.json");
let localDb = { daftar_akun: {}, format_komentar_per_grup: {} };

try {
    localDb = JSON.parse(fs.readFileSync(DATABASE_FILE, "utf8"));
} catch (error) {
    console.error("❌ Gagal membaca database.json. Pastikan file ada dan valid!");
    process.exit(1);
}

const keyword = ["room", "r**m", "𝗿𝗼𝗼𝗺", "lomba", "𝗹𝗼𝗺𝗯𝗮", "𝐥𝐨𝐦𝐛𝐚", "limba", "rom", "r00m", "login", "𝐫𝐨𝐨𝐦", "hongkong", "singapur", "nemo", "l0mb4", "lomb4", "l0mba", "𝗿𝟬𝟬𝗺", "𝗹𝟬𝗺𝗯𝗮", "𝘳𝘰oom", "hatori", "klikh4tori001", "🅻🅾🅼🅱🅰"];
const Backlist = ["pemenang lomba", "rekap", "natidulu", "room lomba freebet", "prediksi", "result", "juara lomba", "r3k4p", "r3kap", "rek4p", "undang"];

let adminList = [];
let hasResolvedIDs = false; // Flag penanda apakah data admin sudah diambil

// Fitur tambahan: Otomatis membaca ulang jika database.json Anda diubah
fs.watchFile(DATABASE_FILE, (curr, prev) => {
    try {
        localDb = JSON.parse(fs.readFileSync(DATABASE_FILE, "utf8"));
        console.log(`\n🔄 [DATABASE UPDATE] Format teks / data grup berhasil diperbarui secara live!`);
    } catch (e) { }
});

// ==========================================
// 2. FUNGSI AMBIL DATA ADMIN
// ==========================================
async function fetchConfigDataAndResolve(client) {
    console.log("⏳ Mengambil Database Admin dari GitHub...");
    try {
        const adminRes = await fetch(URLADMIN);
        const adminData = await adminRes.json();

        for (let admin of adminData.admins) {
            let adminStr = admin.toString().trim();
            if (adminStr.startsWith("@")) {
                try {
                    const entity = await client.getEntity(adminStr);
                    adminList.push(entity.id.toString());
                } catch (e) { }
            } else {
                adminList.push(adminStr);
            }
        }
        console.log(`✅ Database Siap! Terkunci pada ${adminList.length} Admin.\n`);
    } catch (error) {
        console.error("❌ Gagal membaca GitHub Admin.", error.message);
    }
}

// ==========================================
// 3. FUNGSI INTI: MENYALAKAN BOT
// ==========================================
function startBot(accountName, accountData, accountIndex) {
    return new Promise(async (resolve) => {
        try {
            const labelAkun = accountData.nama ? `${accountName} | ${accountData.nama}` : accountName;
            console.log(`\n⚙️ [${labelAkun}] Sedang menghubungkan...`);

            const apiId = accountData.api_id;
            const apiHash = accountData.api_hash;
            const sessionStr = accountData.session_token;

            if (!apiId || !apiHash || !sessionStr) {
                console.log(`⚠️ [${accountName}] DILEWATI: Data API ID / Hash / Session tidak lengkap.`);
                return resolve(null);
            }

            // OPTIMASI: Memaksa koneksi ke DC5 (Singapura)
            const dcId = 5;
            const serverAddress = "149.154.167.99"; // IP DC5 Singapura
            const port = 443;

            const client = new TelegramClient(
                new StringSession(sessionStr),
                Number(apiId),
                apiHash,
                {
                    connectionRetries: 1, // Hindari mengulang koneksi jika error
                    useWSS: false,        // Wajib false agar menggunakan TCP murni
                    dcId: dcId,           // Memaksa Data Center ID
                    serverAddress: serverAddress, // Memaksa IP Address DC
                    port: port
                }
            );

            // Sembunyikan log bawaan GramJS agar terminal tidak penuh
            client.setLogLevel("none");

            // Pasang Time-Out Manual (15 Detik). Jika hang, akan dilewati.
            const connectPromise = client.connect();
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Timeout/Hang saat koneksi ke Telegram")), 15000)
            );

            // Balapan: Mana yang lebih dulu, connect sukses atau timeout?
            await Promise.race([connectPromise, timeoutPromise]);

            // Verifikasi apakah benar-benar terhubung ke DC5
            const currentSession = client.session;
            console.log(`🟢 [${labelAkun}] Berhasil Login! (Terhubung ke DC: ${currentSession.dcId} - IP: ${currentSession.serverAddress})`);

            // Jika belum ada akun yang melacak admin database, tugaskan akun pertama
            if (!hasResolvedIDs) {
                hasResolvedIDs = true;
                await fetchConfigDataAndResolve(client);
            }

            // Radar Pemantau
            client.addEventHandler(async (event) => {
                const t0 = performance.now(); // Catat waktu MILIDETIK TEPAT saat pesan menyentuh bot

                const message = event.message;
                if (!message) return;

                const chatId = message.chatId ? message.chatId.toString() : null;
                const senderId = message.senderId ? message.senderId.toString() : null;

                if (!chatId) return;

                // Cek database pantauan
                let formatGrup = localDb.format_komentar_per_grup[chatId];
                if (!formatGrup && localDb.format_komentar_per_grup[chatId.replace("-100", "-")]) {
                    formatGrup = localDb.format_komentar_per_grup[chatId.replace("-100", "-")];
                }
                if (!formatGrup) return;

                const amunisi = formatGrup[accountName];
                if (!amunisi) return;

                // Mulai mengukur berapa lama waktu mengecek Admin & Keyword
                const t1 = performance.now();

                if (!senderId || !adminList.includes(senderId)) return;

                const teksPesan = message.message || message.text || "";
                const textMasuk = teksPesan.toLowerCase();
                if (Backlist.some(b => textMasuk.includes(b))) return;
                if (!keyword.some(k => textMasuk.includes(k))) return;

                // Selesai mengecek Admin & Keyword
                const t2 = performance.now();

                const delayMs = accountIndex * 0; // Jeda anti-spam

                const eksekusiTembakan = () => {
                    const t3 = performance.now(); // Mulai menembak ke server Telegram

                    try {
                        // OPTIMASI FINAL: Raw API Injection + Fire and Forget
                        // Bypass client.sendMessage() dan langsung panggil OS tanpa 'await'
                        client.invoke(
                            new Api.messages.SendMessage({
                                peer: message.peerId, // Langsung pakai raw entity dari pesan yang memicu!
                                message: amunisi,
                                randomId: BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)),
                                noWebpage: true // Jangan buang waktu merender preview link
                            })
                        ).catch(err => console.log(`❌ [${labelAkun}] Error Background: ${err.message}`));

                        const t4 = performance.now(); // Laporan sukses di-push ke antrean OS jaringan

                        const durasiVerifikasi = (t2 - t1).toFixed(3);
                        const durasiPersiapan = (t3 - t0 - (delayMs > 0 ? delayMs : 0)).toFixed(3);
                        const durasiDorongOS = (t4 - t3).toFixed(3);
                        const totalMurni = (parseFloat(durasiPersiapan) + parseFloat(durasiDorongOS)).toFixed(3);

                        console.log(`\n💥 [${labelAkun}] PELURU DITEMBAKKAN (Fire & Forget)!`);
                        console.log(`   ├ ⏱️ Waktu Cek Admin & Keyword : ${durasiVerifikasi} ms`);
                        console.log(`   ├ ⚡ Waktu Skrip Memproses     : ${durasiPersiapan} ms`);
                        console.log(`   ├ 🌐 Waktu Dorong ke Jaringan  : ${durasiDorongOS} ms (Tanpa tunggu resi)`);
                        console.log(`   └ 🚀 TOTAL REAKSI SCRIPT       : ${totalMurni} ms`);

                    } catch (err) {
                        console.log(`❌ [${labelAkun}] Gagal menembak: ${err.message}`);
                    }
                };

                // Bypass total setTimeout (antrean sistem) jika jeda = 0
                if (delayMs > 0) {
                    setTimeout(eksekusiTembakan, delayMs);
                } else {
                    eksekusiTembakan(); // Eksekusi langsung tanpa antrean setTimeout
                }
            }, new NewMessage({}));

            resolve(client); // Proses selesai, lanjut ke akun berikutnya

        } catch (error) {
            // JIKA GAGAL/HANG/ERROR (SESSION MATI):
            console.log(`❌ [${accountName}] DILEWATI: ${error.message}`);
            resolve(null); // Return null agar membiarkan loop berlanjut ke akun selanjutnya
        }
    });
}

// ==========================================
// 4. BOOTSTRAPPER SEMUA AKUN
// ==========================================
(async () => {
    try {
        const accountsData = Object.entries(localDb.daftar_akun);
        console.log(`🚀 Bersiap menyalakan ${accountsData.length} sniper dari database.json...`);

        // Nyalakan satu per satu
        for (let i = 0; i < accountsData.length; i++) {
            const [accountName, accountData] = accountsData[i];
            await startBot(accountName, accountData, i);
            // Jeda 1 detik antar akun saat login agar tidak terdeteksi spam koneksi
            await new Promise(r => setTimeout(r, 1000));
        }

        console.log("\n🎯 SEMUA PROSES LOGIN SELESAI. Menunggu pesan lomba dari Admin.");

    } catch (error) {
        console.error("❌ Gagal memulai bot", error.message);
        process.exit(1);
    }
})();
