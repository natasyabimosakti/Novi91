window.initBabonLogic = function (namagroup18, Comment18) {




    'use strict';

    var keyword = ["ROOM", "R**M", "𝗥𝗢𝗢𝗠", "LOMBA", "𝗟𝗢𝗠𝗕𝗔", "𝐋𝐎𝐌𝐁𝐀", "LIMBA", "ROM", "R00M", "login", "𝐑𝐎𝐎𝐌", "HONGKONG", "SINGAPUR", "nemo", "l0mb4", "lomb4", "l0mba", "𝗥𝟬𝟬𝗠", "𝗟𝟬𝗠𝗕𝗔", "𝘙𝘖𝘖𝘔", "hatori", "klikh4tori001", "🅻🅾🅼🅱🅰"]
    var Backlist = ["pemenang lomba", "rekap", "natidulu", "room lomba freebet", "prediksi", "result", "juara lomba", "r3k4p", "r3kap", "rek4p", "undang"]
    var portingsock = 9015;
    var URLGROUP = `https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Comment/${Comment18}.json`;
    var URLADMIN = "https://raw.githubusercontent.com/natasyabimosakti/ADMIN/refs/heads/main/Admin_group_Baru.json"
    var packetLogs = [];
    var now = Date.now();
    var EXPIRATION_MS = 5 * 60 * 1000;
    var capturelog = false;
    var isLoggingEnabled = false;
    const MAX_LOGS = 50000;
    var grouptToPost = ""
    let dynamicSessionBytes = [0x66, 0x2F, 0x89, 0x79, 0xD2, 0x43, 0xF2, 0x83];
    let dynamicSyncBytes = [0x00, 0x6F, 0x00, 0x3C];
    let dynamicIdBytes = [0x00, 0x01, 0x00, 0x0D];
    let latestSequenceNum = 0x0199;
    let botState = "IDLE";
    let pendingCompIdBytes = null;
    let activeWs = null;
    let latestSubmitId = null;
    let latestSubmitActionId = null;
    let latestSubmitComment = "";
    let commentQueue = [];
    let isProcessingQueue = false;
    let queueTimeout = null;
    let currentGroupName = "Grup Tidak Diketahui";
    let currentPosterName = "Unknown Poster";
    var jedaSaatIni = 400;
    var komentarditemukan = false
    var LIMA_MENIT = 3 * 60 * 1000;
    var cekpaket = false;
    // State for dynamic config
    let adminList = [];
    var commentdone = false
    var refreshsiap = false;
    let capturedPacket = null;
    let activeWsConnection = null;
    let pendingLogs = [];
    let currentGlobalSeq = 0;
    let ceksimulasi = false;
    let isWaitingForReplayResponse = false;
    let replayTimeout = null;
    let emptySocketTimeout = null;
    let groupConfig = [];
    let isConfigLoaded = false;

    function fetchWithGM(url) {
        return new Promise((resolve, reject) => {
            if (typeof GM_xmlhttpRequest !== "undefined") {
                GM_xmlhttpRequest({
                    method: "GET",
                    url: url,
                    onload: function (response) {
                        if (response.status === 200) {
                            try {
                                resolve(JSON.parse(response.responseText));
                            } catch (e) {
                                reject(new Error("Invalid JSON response"));
                            }
                        } else {
                            reject(new Error("HTTP " + response.status));
                        }
                    },
                    onerror: function (err) {
                        reject(err);
                    }
                });
            } else {
                // Fallback ke fetch standar jika GM_xmlhttpRequest tidak ada
                fetch(url)
                    .then(res => res.json())
                    .then(data => resolve(data))
                    .catch(err => reject(err));
            }
        });
    }

    async function initBotData() {
        try {
            // Fetch Admin List
            let adminData = await fetchWithGM(URLADMIN);
            if (adminData && adminData.admins) {
                adminList = adminData.admins.map(a => a.toLowerCase());
                console.log(`%c[CONFIG] Loaded ${adminList.length} admins`, 'color: #00ffcc;');
            }

            // Fetch Group Comments
            let groupData = await fetchWithGM(URLGROUP);
            if (Array.isArray(groupData)) {
                // Terapkan fungsi random ke setiap komentar saat data diambil
                // Fungsi Random() sudah didefinisikan secara global dari Gabungkan.js
                groupConfig = groupData.map(item => {
                    return {
                        group: item.group,
                        comment: typeof Random === 'function' ? Random(item.comment) : item.comment
                    };
                });

                // Append local config
                if (namagroup18 && Comment18) {
                    let localComment = typeof Random === 'function' ? Random(Comment18) : Comment18;
                    groupConfig.push({ group: namagroup18, comment: localComment });
                }
                console.log(`%c[CONFIG] Loaded ${groupConfig.length} group configs (with randomizer applied)`, 'color: #00ffcc;');

            }
            isConfigLoaded = true;
        } catch (e) {
            console.log(`%c[ERROR] Failed to fetch bot config: ${e.message}`, 'color: red;');
            // Fallback to local config if fetch fails
            if (namagroup18 && Comment18) {
                let localComment = typeof Random === 'function' ? Random(Comment18) : Comment18;
                groupConfig.push({ group: namagroup18, comment: localComment });
            }
        }
    }

    // Initialize immediately
    initBotData();

    function toHexStr(u8) {
        return Array.from(u8).map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
    }

    function toHexStr(u8) {
        return Array.from(u8).map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
    }

    async function parseData(data) {
        let text = '';
        let u8 = null;
        if (typeof data === 'string') {
            text = data;
            u8 = new TextEncoder().encode(data);
        } else if (data instanceof ArrayBuffer) {
            u8 = new Uint8Array(data);
            text = new TextDecoder('utf-8', { fatal: false }).decode(u8);
        } else if (ArrayBuffer.isView(data)) {
            u8 = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
            text = new TextDecoder('utf-8', { fatal: false }).decode(u8);
        } else if (data instanceof Blob) {
            const buf = await data.arrayBuffer();
            u8 = new Uint8Array(buf);
            text = new TextDecoder('utf-8', { fatal: false }).decode(u8);
        } else {
            text = `[Tipe data alien]: ${Object.prototype.toString.call(data)}`;
            u8 = new Uint8Array(0);
        }
        return { textData: text, u8, hexStr: toHexStr(u8) };
    }

    function buildCommentPayload(actionBytes, text, submitId, compIdBytes) {
        let textBytes = new TextEncoder().encode(text);
        let tLen = textBytes.length;
        let totalLen = 57 + tLen;
        let u8 = new Uint8Array(totalLen);
        let offset = 0;

        const header = [0x00, totalLen - 2, 0x02];
        u8.set(header, offset); offset += header.length;
        u8.set(dynamicSessionBytes, offset); offset += dynamicSessionBytes.length;

        let seq = (latestSequenceNum + 1) & 0xFF;
        latestSequenceNum = seq;

        let syncBytes = [...dynamicSyncBytes];
        syncBytes[3] = seq;
        u8.set(syncBytes, offset); offset += syncBytes.length;
        u8.set(dynamicIdBytes, offset); offset += dynamicIdBytes.length;

        u8[offset++] = 0x00;
        u8[offset++] = actionBytes[0] !== undefined ? actionBytes[0] : 0x01;
        u8[offset++] = actionBytes[1] !== undefined ? actionBytes[1] : 0x01;
        u8[offset++] = actionBytes[2] !== undefined ? actionBytes[2] : 0x00;

        const filler = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x04, 0x00];
        u8.set(filler, offset); offset += filler.length;
        u8[offset++] = tLen;
        u8.set(textBytes, offset); offset += tLen;

        u8[offset++] = 0x40; u8[offset++] = 0x00; u8[offset++] = 0x00; u8[offset++] = 0x00;
        u8[offset++] = submitId;
        u8[offset++] = 0xFF; u8[offset++] = 0xFF; u8[offset++] = 0xFF; u8[offset++] = 0xFF;

        let ts = BigInt(Date.now());
        u8[offset++] = Number((ts >> 56n) & 0xFFn);
        u8[offset++] = Number((ts >> 48n) & 0xFFn);
        u8[offset++] = Number((ts >> 40n) & 0xFFn);
        u8[offset++] = Number((ts >> 32n) & 0xFFn);
        u8[offset++] = Number((ts >> 24n) & 0xFFn);
        u8[offset++] = Number((ts >> 16n) & 0xFFn);
        u8[offset++] = Number((ts >> 8n) & 0xFFn);
        u8[offset++] = Number(ts & 0xFFn);

        u8[offset++] = 0x0C;
        if (compIdBytes && compIdBytes.length === 2) {
            u8[offset++] = compIdBytes[0];
            u8[offset++] = compIdBytes[1];
        } else {
            u8[offset++] = 0x02;
            u8[offset++] = 0x5C;
        }

        u8[offset++] = 0x00;
        u8[offset++] = 0x04;
        u8[offset++] = 0x00;

        return u8;
    }

    function buildOpenFormPayload(trackingToken) {
        let tokenBytes = new TextEncoder().encode(trackingToken);
        let tokenLen = tokenBytes.length;
        let totalLen = 48 + tokenLen;
        let u8 = new Uint8Array(totalLen);
        let offset = 0;

        const header = [0x00, totalLen - 2, 0x07];
        u8.set(header, offset); offset += header.length;
        u8.set(dynamicSessionBytes, offset); offset += dynamicSessionBytes.length;

        let seq = (latestSequenceNum + 1) & 0xFF;
        latestSequenceNum = seq;
        let syncBytes = [...dynamicSyncBytes];
        syncBytes[3] = seq;
        u8.set(syncBytes, offset); offset += syncBytes.length;
        u8.set(dynamicIdBytes, offset); offset += dynamicIdBytes.length;

        u8[offset++] = 0x00; u8[offset++] = 0x00; u8[offset++] = 0x01; u8[offset++] = 0x9F;
        u8[offset++] = 0x11;
        u8[offset++] = Math.floor(Math.random() * 256);
        u8[offset++] = Math.floor(Math.random() * 256);
        u8[offset++] = Math.floor(Math.random() * 256);

        const exactFiller = [0x00, 0x00, 0x00, 0x00, 0x90, 0x3C, 0x03, 0x01, 0x01, 0x01, 0x07, 0x01, 0x01];
        u8.set(exactFiller, offset); offset += exactFiller.length;
        const padding = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
        u8.set(padding, offset); offset += padding.length;
        u8[offset++] = tokenLen;
        u8.set(tokenBytes, offset); offset += tokenLen;

        return u8;
    }

    function processCommentQueue() {
        if (commentQueue.length === 0) {
            isProcessingQueue = false;
            botState = "IDLE";
            return;
        }
        isProcessingQueue = true;

        let task = commentQueue.shift();
        console.log(`%c[🚀 BOT] Memproses antrian (${commentQueue.length} sisa). Token: ${task.token}`, 'background: #222; color: #ff9900;');

        botState = "WAITING_FOR_FORM_OPEN";
        latestSubmitId = null;
        latestSubmitActionId = task.actionId;
        latestSubmitComment = task.commentText;

        let openFormPayload = buildOpenFormPayload(task.token);
        openFormPayload.isBotGenerated = true;

        if (activeWs && activeWs.readyState === 1) {
            activeWs.send(openFormPayload);
        }

        clearTimeout(queueTimeout);
        queueTimeout = setTimeout(() => {
            if (botState === "WAITING_FOR_FORM_OPEN") {
                console.log('%c[⚠️ TIMEOUT] Form tidak terbuka, lanjut antrian berikutnya...', 'color: red;');
                processCommentQueue();
            }
        }, 8000);
    }


    function checkAndSendComment(startMs) {
        if (botState === "WAITING_FOR_FORM_OPEN" && latestSubmitId !== null && latestSubmitActionId !== null) {
            clearTimeout(queueTimeout);
            botState = "PROCESSING_COMMENT";
            let socketToUse = activeWs;

            if (socketToUse && socketToUse.readyState === 1) {
                let teks = latestSubmitComment;

                // Jika tidak ada komentar yang siap, abaikan dan lanjut
                if (!teks) {
                    console.log(`%c[⏭️ SKIP] Tidak ada konfigurasi komentar untuk grup: ${currentGroupName}`, 'color: orange;');
                    processCommentQueue();
                    return;
                }

                let generatedPayload = buildCommentPayload(latestSubmitActionId, teks, latestSubmitId, pendingCompIdBytes);
                generatedPayload.isBotGenerated = true;

                if (socketToUse && socketToUse.readyState === 1) {
                    socketToUse.send(generatedPayload);
                    let endMs = performance.now();
                    let diffMs = (endMs - startMs).toFixed(3);

                    console.log(`%c[✅ SUCCESS] Mengirim Komentar: ${teks} | Waktu Eksekusi: ${diffMs} ms`, 'color: #00ff00; font-weight: bold; font-size: 14px;');
                    setTimeout(processCommentQueue, 5000);
                    if (grouptToPost) {
                        GM.setValue(`group_${grouptToPost}`, true);
                        GM.setValue(`group_${grouptToPost}_expire`, Date.now() + EXPIRATION_MS);
                    }
                }
            }
        }
    }
    async function manageGroups() {
        const now = Date.now();

        for (const config of groupConfig) {
            if (!config.group) continue;
            const key = `group_${config.group}`;
            const expireKey = `${key}_expire`;
            const expireAt = await GM.getValue(expireKey, 0);

            if (now > expireAt) {
                await GM.setValue(key, false);
                await GM.setValue(expireKey, now + EXPIRATION_MS);
            }
        }

        if (!grouptToPost) return;

        const groupKey = `group_${grouptToPost}`;
        const sudahKomentar = await GM.getValue(groupKey, false);
        const expireAt = await GM.getValue(`${groupKey}_expire`, 0);

        console.log(`🔹 Grup: ${grouptToPost} | Komentar Aktif: ${sudahKomentar} | ExpireAt: ${expireAt}`);

        if (sudahKomentar && now < expireAt) {
            console.log(`⏳ Grup ini sedang masa cooldown (Sudah komentar sebelumnya). Keluar...`);
            location.href = "about:blank";
            return true;
        }
        return false;
    }

    async function logPacket(direction, rawData, ws) {
        let packetReceiveTime = performance.now();
        if (!isLoggingEnabled) return;
        if (ws) activeWs = ws;
        const { textData, hexStr, u8 } = await parseData(rawData);
        const timestamp = new Date().toISOString();
        let currentLogEntry = null;
        if (packetLogs.length <= MAX_LOGS) {
            currentLogEntry = { time: timestamp, direction: direction, byteLength: rawData.byteLength || rawData.size || textData.length, payload: textData, hexPayload: hexStr, botInfo: {} };
            packetLogs.push(currentLogEntry);
        }


        if (direction === 'OUTGOING' && u8 && u8.length >= 23) {
            dynamicSessionBytes = Array.from(u8.slice(3, 11));
            dynamicSyncBytes = Array.from(u8.slice(11, 15));
            if (u8.length >= 19) dynamicIdBytes = Array.from(u8.slice(15, 19));
            latestSequenceNum = u8[14];
        }

        if (direction === 'INCOMING' && u8 && u8.length === 13 && u8[0] === 0x80 && u8[1] === 0x0B && u8[2] === 0xA0 && u8[3] === 0x01) {
            latestSubmitId = u8[11];
            checkAndSendComment(packetReceiveTime);

        }

        // Lacak paket balasan untuk mengambil Action ID yang 100% akurat
        if (direction === 'INCOMING' && botState === "WAITING_FOR_FORM_OPEN" && u8 && u8.length > 50) {
            let updated = false;
            for (let j = 0; j < u8.length - 6; j++) {
                if (u8[j] === 0x54 && u8[j + 1] === 0x00 && u8[j + 2] === 0x09 && u8[j + 3] === 0x00) {
                    latestSubmitActionId = [u8[j + 4], u8[j + 5], u8[j + 6]];
                    updated = true;
                }
            }
            if (updated) {
                console.log(`%c[🔄 ACTION ID DIPERBARUI] ${latestSubmitActionId}`, 'background: #222; color: #00ffcc; font-weight: bold;');
            }
        }

        if (direction === 'INCOMING' && textData) {
            // Ekstrak Nama Grup jika belum ditemukan atau masih Unknown
            if (currentGroupName === "Grup Tidak Diketahui" || currentGroupName === "Unknown") {
                let foundGroup = false;

                // 1. Coba Ekstrak dari Payload
                let h1Match = textData.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
                if (h1Match) {
                    currentGroupName = h1Match[1].replace(/<[^>]+>/g, "").replace(/&nbsp;/g, "").trim();
                    foundGroup = true;
                } else {
                    let altMatch = textData.match(/Anggota\s*<\/span>\s*<span[^>]*>([\s\S]*?)<\/span>\s*<span[^>]*>\s*sejak/i);
                    if (altMatch) {
                        currentGroupName = altMatch[1].replace(/<[^>]+>/g, "").replace(/&nbsp;/g, "").trim();
                        foundGroup = true;
                    }
                }

                // 2. Jika tidak ditemukan di payload, coba ambil dari elemen DOM yang sedang tampil
                if (!foundGroup) {
                    let spans = document.querySelectorAll('span');
                    for (let i = 0; i < spans.length; i++) {
                        let span = spans[i];
                        if (span.textContent && span.textContent.trim() === 'Anggota') {
                            let nextSpan = span.nextElementSibling;
                            if (nextSpan && nextSpan.tagName.toLowerCase() === 'span') {
                                let thirdSpan = nextSpan.nextElementSibling;
                                if (thirdSpan && thirdSpan.textContent && thirdSpan.textContent.includes('sejak')) {
                                    currentGroupName = nextSpan.textContent.trim();
                                    foundGroup = true;
                                    break;
                                }
                            }
                        }
                    }

                    // 3. Coba cari dari elemen H1 DOM
                    if (!foundGroup) {
                        let h1s = document.querySelectorAll('h1');
                        if (h1s.length > 0 && h1s[0].textContent) {
                            let text = h1s[0].textContent.replace(/\u00A0/g, " ").trim();
                            if (text.length > 0) {
                                currentGroupName = text;
                                foundGroup = true;
                            }
                        }
                    }
                }

                // Validasi agar tidak salah menangkap elemen error Facebook
                if (foundGroup) {
                    let invalidNames = ["Browser ini tidak didukung", "This browser is not supported"];
                    let isInvalid = invalidNames.some(inv => currentGroupName.toLowerCase().includes(inv.toLowerCase()));
                    if (isInvalid) {
                        foundGroup = false;
                        currentGroupName = "Grup Tidak Diketahui";
                    }
                }

                if (foundGroup) {
                    console.log(`%c[INFO] Grup Name Ditemukan: ${currentGroupName}`, 'color: #00ffff; font-weight: bold;');
                    if (currentLogEntry) currentLogEntry.botInfo.parsedGroupName = currentGroupName;
                    let gNameLower = currentGroupName.toLowerCase();
                    manageGroups();
                    for (let config of groupConfig) {
                        if (config.group && gNameLower.includes(config.group.toLowerCase())) {
                            console.log(`%c[📝 KOMENTAR DISIAPKAN] Teks: ${config.comment}`, 'background: #222; color: #00ffff; font-weight: bold; padding: 4px;');
                            if (currentLogEntry) {
                                currentLogEntry.botInfo.preparedComment = config.comment;
                                currentLogEntry.botInfo.matchedGroupConfig = config.group;
                            }
                            break;
                        }
                    }
                }
            }

            // Buat regex dinamis dari array keyword (huruf kecil semua)
            let keywordPattern = keyword.map(k => k.toLowerCase().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|');
            // Hapus batas non-alphanumeric karena seringkali admin menulis "LOMBA2D" atau "ROOM2D" tanpa spasi!
            let targetRegex = new RegExp(`(${keywordPattern})`, 'i');

            if (targetRegex.test(textData)) {
                // Cek apakah grup sudah diketahui dan terdaftar di config
                let gNameLower = currentGroupName.toLowerCase();
                let isGroupInConfig = false;
                let preparedComment = "";

                if (currentGroupName !== "Grup Tidak Diketahui" && currentGroupName !== "Unknown") {
                    for (let config of groupConfig) {
                        if (config.group && gNameLower.includes(config.group.toLowerCase())) {
                            grouptToPost = config.group;
                            preparedComment = config.comment;
                            isGroupInConfig = true;
                            break;
                        }
                    }
                }

                if (!isGroupInConfig) {
                    // Diam saja jika grup belum diketahui atau tidak ada di list
                    return;
                }

                // Pisahkan chunk berdasarkan data-tracking-duration-id
                let trackingRegex = /data-tracking-duration-id/g;
                let trackingMatches = [...textData.matchAll(trackingRegex)];
                let chunks = [];
                trackingMatches.forEach((match, i) => {
                    let start = match.index;
                    let end = trackingMatches[i + 1] ? trackingMatches[i + 1].index : textData.length;
                    let chunk = textData.substring(start, end);
                    if (chunk.length > 11 || i === trackingMatches.length - 1) {
                        chunks.push(chunk);
                    }
                });

                // Cari semua Action ID dari `54 00 09 00` di binary tail
                let listID = [];
                for (let j = 0; j < u8.length - 6; j++) {
                    if (u8[j] === 0x54 && u8[j + 1] === 0x00 && u8[j + 2] === 0x09 && u8[j + 3] === 0x00) {
                        // Action ID selalu berada persis 4 byte setelah pattern 54 00 09 00
                        listID.push([u8[j + 4], u8[j + 5], u8[j + 6]]);
                    }
                }
                let targets = [];
                // Hapus "baru" karena bisa match "baju baru", "anggota baru". Hanya match "baru saja" atau "[1-5] menit"
                // Regex diperbaiki: Ditambah bahasa inggris (just now, min, mins) untuk jaga-jaga FB ganti bahasa otomatis
                let timeRegex = /\b(baru saja|baru|just now|[1-5]\s*(menit|mnt|m|min|mins))\b/i;

                for (let i = 0; i < chunks.length; i++) {
                    let chunkText = chunks[i];
                    let isBaru = timeRegex.test(chunkText);
                    let hasKeyword = targetRegex.test(chunkText);

                    let keywordMatches = chunkText.match(targetRegex);
                    let foundKeyword = keywordMatches ? keywordMatches[0] : null;

                    // Cek Blacklist
                    let isBlacklisted = false;
                    let lowerChunk = chunkText.toLowerCase();
                    for (let bl of Backlist) {
                        if (lowerChunk.includes(bl.toLowerCase())) {
                            isBlacklisted = true;
                            break;
                        }
                    }

                    if (currentLogEntry) {
                        if (!currentLogEntry.botInfo.chunks) currentLogEntry.botInfo.chunks = [];
                        currentLogEntry.botInfo.chunks.push({
                            chunkLength: chunkText.length,
                            hasKeyword: hasKeyword,
                            foundKeyword: foundKeyword,
                            isBaru: isBaru,
                            isBlacklisted: isBlacklisted,
                            chunkTextPreview: chunkText.length > 200 ? chunkText.substring(0, 200) + '...' : chunkText
                        });
                    }

                    if (hasKeyword && isBaru && !isBlacklisted) {
                        targets.push(i);
                    }
                }

                let foundNewTask = false;
                for (let roomChunkIndex of targets) {
                    let roomChunk = chunks[roomChunkIndex];
                    let trackingMatch = roomChunk.match(/data-tracking-duration-id=[\\\"&quot;]*([^\\\"&quot;\s>]+)/i);
                    let trackingToken = trackingMatch ? trackingMatch[1] : null;

                    if (trackingToken) {
                        let actionIdToUse = listID[roomChunkIndex] || listID[0] || null;
                        if (!actionIdToUse) {
                            console.log(`%c[⚠️ WARNING] Index ${roomChunkIndex} gagal mencari Action ID (len ${listID.length}), dilewati.`, 'color: orange;');
                            continue;
                        }

                        // Ekstrak nama pemosting dari chunk ini
                        let posterName = "Unknown Poster";
                        // Mencoba mengekstrak dari aria-label="Foto Profil [Nama]"
                        let posterMatch = roomChunk.match(/aria-label=(?:\\\"|\"|&quot;|')*Foto\s+profil\s+([\s\S]*?)(?=\\\"|\"|&quot;|')/i);
                        if (posterMatch) {
                            posterName = posterMatch[1].trim();
                        } else {
                            // Coba fallback dengan mencari nama dari teks langsung (heuristik)
                            let textMatch = /native-text rslh[^>]*><span class='f[1-2]'>([^<]+)<\/span>/.exec(roomChunk);
                            if (textMatch) {
                                let rawName = textMatch[1].trim();
                                if (!rawName.includes("Poin") && !rawName.includes("poin")) {
                                    // Ambil nama sebelum spasi jika ada lebih dari 3 kata (hanya heuristik kasar)
                                    let words = rawName.split(" ");
                                    if (words.length > 0) {
                                        posterName = rawName.replace(/&[a-z]+;/gi, "");
                                    }
                                }
                            }
                        }

                        // Validasi Admin
                        let lowerPoster = posterName.toLowerCase();
                        let isAdmin = false;

                        // Cek jika poster ada di list admin
                        if (adminList && adminList.length > 0) {
                            for (let admin of adminList) {
                                if (lowerPoster.includes(admin.toLowerCase())) {
                                    isAdmin = true;
                                    break;
                                }
                            }
                        } else {
                            // Jika API admin gagal dimuat, allow dulu sbg fallback
                            isAdmin = true;
                        }

                        if (currentLogEntry) {
                            currentLogEntry.botInfo.detectedPoster = posterName;
                            currentLogEntry.botInfo.posterIsAdmin = isAdmin;
                            currentLogEntry.botInfo.actionIdFound = actionIdToUse;
                        }

                        if (!isAdmin) {
                            console.log(`%c[⛔ REJECTED] Poster ${posterName} bukan Admin.`, 'color: red; font-weight: bold;');
                            if (currentLogEntry) currentLogEntry.botInfo.rejectReason = "Bukan Admin";
                            continue;
                        }
                        if (commentdone) {
                            if (currentLogEntry) currentLogEntry.botInfo.rejectReason = "Komentar Sudah Done";
                            return;
                        }
                        komentarditemukan = true;
                        let detectDiff = (performance.now() - packetReceiveTime).toFixed(3);
                        console.log(`%c[🎯 ROOM DETECTED] Poster: ${posterName} | Group: ${currentGroupName} | Index: ${roomChunkIndex} | Token: ${trackingToken} | Waktu Analisa: ${detectDiff} ms`, 'background: #222; color: #ff9900; font-weight: bold; padding: 4px;');
                        commentdone = true
                        currentPosterName = posterName;

                        commentQueue.push({
                            token: trackingToken,
                            actionId: actionIdToUse,
                            poster: posterName,
                            commentText: preparedComment
                        });
                        if (currentLogEntry) currentLogEntry.botInfo.taskPushed = true;
                        foundNewTask = true;
                    }
                }

                if (foundNewTask && !isProcessingQueue) {
                    processCommentQueue();
                }
            }
        }



        // Melacak Action ID "Kirim" saat Floating Textbox Terbuka
        if (direction === 'INCOMING' && textData.includes('Tulis komentar publik') && textData.includes('floating-textbox')) {
            console.log(`%c[🎯 FLOATING TEXTBOX DETECTED] Server merespon dengan kotak ketik!`, 'background: #4400cc; color: white; padding: 2px;');
            // Di sini kita bisa menambahkan regex untuk ekstrak action-id tombol kirim
        }

        if (direction === 'OUTGOING') {
            // Jika payload bukan qpl_event (telemetri)
            if (!textData.includes('qpl_event') && u8 && u8.length > 0) {
                // Mengekstrak karakter yang bisa dibaca (ASCII 32 - 126)
                let readableText = '';
                for (let i = 0; i < u8.length; i++) {
                    const charCode = u8[i];
                    if (charCode >= 32 && charCode <= 126) {
                        readableText += String.fromCharCode(charCode);
                    } else {
                        readableText += '.';
                    }
                }
                // Cari string yang panjangnya lebih dari 3 karakter (biasanya komentar)
                const possibleComments = readableText.match(/[a-zA-Z0-9\\s.,!?'"()\\-]{3,}/g);
            }
        }
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

    window.findActionMap = function (targetDomId) {
        console.log(`%c[🔍] Sedang mencari peta untuk ID DOM: ${targetDomId}...`, 'color: #ffcc00; font-weight: bold;');
        if (typeof require !== 'undefined') {
            try {
                // Modul internal FB (MStore, MActionMap, dll.)
                let keys = Object.keys(require.s || require.m || {});
                for (let i = 0; i < keys.length; i++) {
                    let key = keys[i];
                    try {
                        let mod = require(key);
                        if (mod && typeof mod === 'object') {
                            let strObj = JSON.stringify(mod);
                            if (strObj && strObj.includes(targetDomId.toString())) {
                                console.log(`%c[🎯] ID ${targetDomId} Ditemukan di modul: ${key}`, 'background: #222; color: #00ffcc; font-weight: bold;', mod);
                            }
                        }
                    } catch (err) { } // Abaikan modul yang tidak bisa di-load
                }
            } catch (e) {
                console.log("[❌] Gagal memindai require:", e);
            }
        }
        console.log(`%c[🏁] Pencarian memori selesai.`, 'color: #00cc44; font-weight: bold;');
    };


    // 1. Simpan fungsi tugas yang ingin dijalankan agar tidak menulis ulang
    function tugasKita() {
        if (komentarditemukan || commentdone || isWaitingForReplayResponse || !refreshsiap) return;
        kirimReplaySocket()
        isLoggingEnabled = true
    }

    // 2. Atur jeda awal (1000ms)
    let intervalKita = setInterval(tugasKita, jedaSaatIni);

    console.log("▶️ Interval dimulai dengan jeda 1000ms...");

    // 3. Atur timer mundur untuk 5 menit (5 menit = 300.000 ms)


    setTimeout(() => {
        // a. Hentikan interval yang lama
        clearInterval(intervalKita);

        // b. Ubah jeda menjadi 5000ms
        jedaSaatIni = 5000;
        console.log("⚠️ 5 menit berlalu! Mengubah jeda menjadi 5000ms...");

        // c. Mulai interval baru dengan jeda yang baru
        intervalKita = setInterval(tugasKita, jedaSaatIni);

    }, LIMA_MENIT);



    'use strict';




    function simulateHumanPullToRefresh(distance = 800) {
        if (ceksimulasi) return;
        ceksimulasi = true;

        if (document.hidden) {
            window.scrollTo(0, 0);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        const _startX = window.innerWidth / 2;
        const _startY = 150;
        const _steps = 25;
        const _identifier = Date.now();

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

        document.dispatchEvent(createTouchEvent('touchstart', _startX, _startY));

        let _currentStep = 0;
        const channel = new MessageChannel();

        const stepLoop = () => {
            _currentStep++;
            const _currentY = _startY + (distance * (_currentStep / _steps));
            document.dispatchEvent(createTouchEvent('touchmove', _startX, _currentY));

            if (_currentStep < _steps) {
                channel.port2.postMessage(null);
            } else {
                document.dispatchEvent(createTouchEvent('touchend', _startX, _currentY));
                addLog("🤖 Simulasi Auto-Pull Selesai. Menunggu paket...");
                refreshsiap = true;



            }
        };

        channel.port1.onmessage = stepLoop;
        channel.port2.postMessage(null);
        ceksimulasi = false;
    } // Menyimpan sequence terbaru



    window.addEventListener('load', () => {
        // Kontainer Utama
        const panel = document.createElement('div');
        Object.assign(panel.style, {
            position: 'fixed', bottom: '20px', right: '20px', zIndex: '999999',
            display: 'flex', flexDirection: 'column', gap: '10px',
            background: 'rgba(0, 0, 0, 0.8)', padding: '10px',
            borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.5)'
        });

        // Tombol Toggle Rekam
        const btnToggle = document.createElement('button');
        btnToggle.innerText = '▶️ MULAI REKAM';
        Object.assign(btnToggle.style, {
            padding: '10px 15px', background: '#00cc44', color: 'white',
            border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer'
        });

        // Tombol Download
        const btnDownload = document.createElement('button');
        btnDownload.innerText = `📥 Download Logs (0)`;
        Object.assign(btnDownload.style, {
            padding: '10px 15px', background: '#0088ff', color: 'white',
            border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer'
        });

        // Logika Toggle Rekam
        btnToggle.onclick = () => {
            capturelog = !capturelog;
            if (capturelog) {
                btnToggle.innerText = '⏹️ STOP REKAM';
                btnToggle.style.background = '#ff0055';
                console.log('%c[WS LOGGER] 🔴 PEREKAMAN DIMULAI...', 'color: #ff0055; font-weight: bold; font-size: 14px;');
            } else {
                btnToggle.innerText = '▶️ MULAI REKAM';
                btnToggle.style.background = '#00cc44';
                btnDownload.innerText = `📥 Download Logs (${packetLogs.length})`;
                console.log('%c[WS LOGGER] ⏹️ PEREKAMAN BERHENTI.', 'color: #00cc44; font-weight: bold; font-size: 14px;');
            }
        };

        // Logika Download
        btnDownload.onclick = () => {
            if (packetLogs.length === 0) {
                alert("Belum ada data WebSocket yang terekam.");
                return;
            }

            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(packetLogs, null, 2));
            const dlAnchorElem = document.createElement('a');
            dlAnchorElem.setAttribute("href", dataStr);
            dlAnchorElem.setAttribute("download", `fb_sniper_logs_${Date.now()}.json`);
            dlAnchorElem.click();
            dlAnchorElem.remove();

            // Opsional: Kosongkan memori setelah download
            // packetLogs.length = 0;
            // btnDownload.innerText = `📥 Download Logs (0)`;
        };

        panel.appendChild(btnToggle);
        panel.appendChild(btnDownload);
        document.body.appendChild(panel);
    });





    // GLOBAL FUNCTION UNTUK REPLAY
    unsafeWindow.kirimReplaySocket = function () {
        if (isWaitingForReplayResponse) {
            addLog(`⏳ Sabar, sedang menunggu respon server...`, 'warning');
            return;
        }

        if (activeWsConnection && capturedPacket) {
            if (emptySocketTimeout) {
                clearTimeout(emptySocketTimeout);
                emptySocketTimeout = null;
                addLog(`✅ Paket ditemukan! Timer reload dibatalkan.`, 'success');
            }
            try {
                let replayPacket = new Uint8Array(capturedPacket);
                if (komentarditemukan || commentdone) return;
                currentGlobalSeq++;
                if (replayPacket.length > 14) {
                    replayPacket[13] = (currentGlobalSeq >> 8) & 0xFF;
                    replayPacket[14] = currentGlobalSeq & 0xFF;
                }
                showToast("Request !", 'info');
                addLog(`🔄 Mengirim ulang (Seq: ${currentGlobalSeq})...`, 'success');

                activeWsConnection.send(replayPacket.buffer);
                addLog(`✅ Dikirim! Menunggu respon server...`);
                refreshsiap = true;

                isWaitingForReplayResponse = true;
                if (replayTimeout) {
                    clearTimeout(replayTimeout);
                }

                replayTimeout = setTimeout(async () => {
                    if (isWaitingForReplayResponse) {
                        addLog(`❌ Paket Basi! Melakukan Auto-Pull lagi...`, 'error');
                        isWaitingForReplayResponse = false;
                        capturedPacket = null; // Buang paket lama yang sudah basi
                        await manageGroups()
                        // Tarik layar otomatis untuk ambil paket baru
                        try {
                            let urlToLoad = JSON.parse(unsafeWindow.__wlsec.json_struct).requestedUrlFromWww;
                            if (urlToLoad) {
                                document.location.href = urlToLoad;
                            } else {
                                document.location.reload();
                            }
                        } catch (e) {
                            addLog(`⚠️ Fallback ke reload biasa karena json_struct tidak ditemukan.`, 'warning');
                            document.location.reload();
                        }
                    }
                }, 8000);

            } catch (e) {
                addLog(`❌ Gagal mengirim: ${e.message}`, 'error');
                isWaitingForReplayResponse = false;
            }
        } else {
            addLog(`❌ Socket tidak aktif atau paket kosong!`, 'error');

            // Coba simulasi pull-to-refresh sekali lagi untuk memancing packet keluar
            addLog(`🔄 Memancing paket dengan Pull-to-Refresh...`, 'info');
            if (!emptySocketTimeout) {
                addLog(`⚠️ Memulai timer 5 detik untuk reload halaman...`, 'warning');
                emptySocketTimeout = setTimeout(() => {
                    addLog(`⏳ Timeout! Halaman direload otomatis.`, 'error');
                    try {
                        let urlToLoad = JSON.parse(unsafeWindow.__wlsec.json_struct).httpReferrer;
                        if (urlToLoad) {
                            document.location.href = urlToLoad;
                        } else {
                            document.location.reload();
                        }
                    } catch (e) {
                        addLog(`⚠️ Fallback ke reload biasa karena json_struct tidak ditemukan.`, 'warning');
                        document.location.reload();
                    }
                }, 5000);
            }
        }
    };
    function showToast(message, type = 'info', duration = 3000) {
        const colors = {
            success: '#568f55',
            info: '#2196f3',
            error: '#f44336',
            warning: '#ff9800'
        };
        const bgColor = colors[type] || colors['info'];

        // 1. Cek apakah elemen toast sudah ada di halaman menggunakan ID
        let toast = document.getElementById('my-console-toast');

        // 2. Jika belum ada, buat elemen baru
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'my-console-toast'; // Berikan ID agar bisa dicari nanti

            Object.assign(toast.style, {
                position: 'fixed',
                bottom: '20px',
                left: '5px',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                zIndex: '9999',
                fontFamily: 'Arial, sans-serif',
                fontSize: '14px',
                fontWeight: 'bold',
                opacity: '0',
                // Tambahkan transisi untuk background-color agar pergantian warna terlihat halus
                transition: 'opacity 0.3s ease, transform 0.3s ease, background-color 0.3s ease',
                transform: 'translateY(20px)'
            });
            document.body.appendChild(toast);
        }

        // 3. Update teks dan warna (berlaku untuk elemen baru maupun yang digunakan ulang)
        toast.textContent = message;
        toast.style.backgroundColor = bgColor;

        // 4. Memicu animasi muncul
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        });

        // 5. Bersihkan timer lama jika toast ditimpa sebelum waktunya habis
        if (window.toastHideTimer) clearTimeout(window.toastHideTimer);
        if (window.toastRemoveTimer) clearTimeout(window.toastRemoveTimer);

        // 6. Setel timer baru untuk menyembunyikan toast
        window.toastHideTimer = setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';

            // Hapus elemen dari DOM setelah animasi menghilang selesai
            window.toastRemoveTimer = setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, duration);
    }
    function addLog(text, type = '') {
        const color = type === 'error' ? '#ff3b3b' : (type === 'warning' ? '#ffaa00' : '#00ffcc');
        console.log("%c[WS REPLAY] " + text, `color: ${color}; font-weight: bold;`);
    }

    const OriginalWebSocket = unsafeWindow.WebSocket || window.WebSocket;

    unsafeWindow.WebSocket = function (url, protocols) {
        console.log(`%c[WS] 🔌 Koneksi WebSocket dibuka: ${url}`, 'background: #111; color: #00e5ff; font-weight: bold; padding: 2px;');
        addLog(`🔌 WebSocket Connected: ${url}`);
        const ws = new OriginalWebSocket(url, protocols);
        activeWsConnection = ws;

        ws.addEventListener('message', function (event) {
            // [GABUNGAN] Logika dari Script 1
            logPacket('INCOMING', event.data, ws);

            // Logika dari Script 2
            let data = event.data;
            let cName = data && data.constructor ? data.constructor.name : typeof data;
            if (data instanceof ArrayBuffer || cName === 'ArrayBuffer') {
                let u8 = new Uint8Array(data);

                // Cek respon balasan Replay
                if (isWaitingForReplayResponse && u8.length > 300) {
                    // Cek isi respon
                    let ascii = new TextDecoder('utf-8', { fatal: false }).decode(u8);
                    if (ascii.includes('data-tracking-duration-id') || ascii.includes('Tulis komentar publik') || ascii.includes('META_POINT')) {
                        clearTimeout(replayTimeout);
                        isWaitingForReplayResponse = false;
                        showToast("Suksess!", 'success');
                    }
                }
            }
        });
        setTimeout(() => {
            if (!capturedPacket) {
                addLog("🤖 Menjalankan Simulasi Auto-Pull...");
                simulateHumanPullToRefresh();
            }
        }, 4000);

        const originalSend = ws.send;
        ws.send = function (data) {
            // [GABUNGAN] Logika dari Script 1
            logPacket('OUTGOING', data, this);

            let cName = data && data.constructor ? data.constructor.name : typeof data;

            if (data instanceof ArrayBuffer || data instanceof Uint8Array || data instanceof Int8Array || cName === 'ArrayBuffer' || cName === 'Uint8Array' || cName === 'Int8Array') {
                let u8 = new Uint8Array(data.buffer || data, data.byteOffset || 0, data.byteLength || data.length);

                if (u8.length >= 15) {
                    // Jika capturedPacket sudah ada, HANYA ambil sequence dari paket yang memiliki Session ID (byte 3-4) yang sama
                    let isSameStream = !capturedPacket || (u8[3] === capturedPacket[3] && u8[4] === capturedPacket[4]);

                    if (isSameStream) {
                        let seqExtracted = (u8[13] << 8) | u8[14];
                        // Hanya naikkan jika angkanya lebih besar (atau reset rollover)
                        if (seqExtracted > currentGlobalSeq || (currentGlobalSeq - seqExtracted > 60000)) {
                            currentGlobalSeq = seqExtracted;
                        }
                    }
                }

                let ascii = "";
                for (let i = 0; i < u8.length; i++) {
                    if (u8[i] >= 32 && u8[i] <= 126) ascii += String.fromCharCode(u8[i]);
                }

                if (ascii.includes('{"components":[]}')) {
                    if (!capturedPacket) {
                        capturedPacket = new Uint8Array(u8);
                        // [CRITICAL FIX] Paksa sinkronisasi sequence dari paket target asli!
                        if (u8.length >= 15) {
                            currentGlobalSeq = (u8[13] << 8) | u8[14];
                        }

                        addLog(`[TARGET] 🎯 Paket Refresh Terekam! (${u8.length} bytes | Seq Awal: ${currentGlobalSeq})`, 'success');
                        showToast("🎯 Target Paket Success!", 'success');

                        if (emptySocketTimeout) {
                            clearTimeout(emptySocketTimeout);
                            emptySocketTimeout = null;
                            addLog(`✅ Paket ditemukan dari jaringan! Timer reload dibatalkan.`, 'success');
                        }

                        // Hentikan timer lama jika ada
                        if (window.replayIntervalTimer) {
                            clearTimeout(window.replayIntervalTimer);
                        }

                        window.captureTime = Date.now(); // Catat waktu capture awal
                        showToast("Tarik Auto-Replay Tiap 1 Detik Dimulai!", 'info');

                        // Fungsi loop dinamis
                    }
                }
            }

            return originalSend.apply(this, arguments);
        };

        return ws;
    };

    unsafeWindow.WebSocket.prototype = OriginalWebSocket.prototype;
    unsafeWindow.WebSocket.CONNECTING = OriginalWebSocket.CONNECTING;
    unsafeWindow.WebSocket.OPEN = OriginalWebSocket.OPEN;
    unsafeWindow.WebSocket.CLOSING = OriginalWebSocket.CLOSING;
    unsafeWindow.WebSocket.CLOSED = OriginalWebSocket.CLOSED;

    if (window !== unsafeWindow) {
        window.WebSocket = unsafeWindow.WebSocket;
    }


}
