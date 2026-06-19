// ==UserScript==
// @name         Experimental
// @namespace    http://tampermonkey.net/
// @version      9.1
// @description  Ekstrak ID Group, Feedback ID, Akun User, Waktu Post, dan Isi Teks Postingan FB
// @match        https://www.facebook.com/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// ==/UserScript==


var GROUP_ID = "1121229279202731";

var TARGET_FEEDBACK_ID = "ZmVlZGJhY2s6MTY3NjEwOTQyMDM4MTM3OA=="; // tugas akhir cari dari respon graph
var COMMENT_TEXT = "Cobakan";
var PAGINATION_QUERY_DOC_ID = "";
var cachedFbDtsg = null;
var cachedScale = null;

async function initDynamicVars() {
    if (cachedFbDtsg && cachedScale !== null) {
        return { fb_dtsg: cachedFbDtsg, scale: cachedScale };
    }

    const fb_dtsg = require("DTSGInitialData").token;
    const scale = window.devicePixelRatio;

    if (!fb_dtsg) {
        throw new Error("'fb_dtsg' tidak ditemukan. Pastikan Anda sudah login dan berada di halaman Facebook.");
    }

    cachedFbDtsg = fb_dtsg;
    cachedScale = scale;
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

                    // 4. Cetak ke Console
                    console.log(`%c[POSTINGAN TERDETEKSI]`, 'background: #1a1a1a; color: #00ffcc; font-weight: bold; padding: 3px 6px; border-radius: 3px;');
                    console.log(` ├─ ID Group    : ${currentGroupId}`);
                    console.log(` ├─ Feedback ID : ${feedbackId}`);
                    console.log(` ├─ Pemosting   : ${pemostingName} (ID: ${pemostingId})`);
                    console.log(` ├─ Waktu Post  : ${waktuPost}`);
                    console.log(` └─ Isi Teks    : "${isiTeks}"`);
                    console.log(`%c--------------------------------------------------`, 'color: #555');
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



async function mintaData() {
    console.log(`[SKRIP KONSOL] Memulai proses untuk Grup ID: ${GROUP_ID}`);

    let fb_dtsg, scale;
    try {
        console.log("[SKRIP KONSOL] Mengambil token 'fb_dtsg' dan 'scale'...");
        ({ fb_dtsg, scale } = await initDynamicVars());
        console.log(`[SKRIP KONSOL] Berhasil! fb_dtsg ditemukan, scale: ${scale}`);
    } catch (error) {
        console.error("[SKRIP KONSOL] Gagal mengambil variabel dinamis:", error);
        return;
    }

    console.log("[SKRIP KONSOL] Menyiapkan payload untuk permintaan GraphQL...");
    const PAGINATION_QUERY_DOC_ID = require("GroupsCometFeedRegularStoriesPaginationQuery_facebookRelayOperation");

    const variables = {
        "count": 3,
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

    const payload = new FormData();
    payload.append('fb_dtsg', fb_dtsg);
    payload.append('doc_id', PAGINATION_QUERY_DOC_ID);
    payload.append('variables', JSON.stringify(variables));
    payload.append('fb_api_caller_class', 'RelayModern');
    payload.append('fb_api_req_friendly_name', 'GroupsCometFeedRegularStoriesPaginationQuery');
    console.log("[SKRIP KONSOL] Mengirim permintaan 'fetch' ke /api/graphql/...");
    try {
        const response = await fetch('/api/graphql/', {
            method: 'POST',
            body: payload,
        });

        console.log(`[SKRIP KONSOL] Permintaan selesai dengan status: ${response.status} ${response.statusText}`);

        if (response.ok) {
            console.log("%c[SKRIP KONSOL] SUKSES! Permintaan berhasil.", "color: green; font-weight: bold;");
        } else {
            console.error("%c[SKRIP KONSOL] GAGAL! Server merespons dengan error.", "color: red; font-weight: bold;");
            const responseText = await response.text();
            console.error("[SKRIP KONSOL] Detail Respons Error:", responseText);
        }
    } catch (error) {
        console.error("%c[SKRIP KONSOL] GAGAL! Terjadi error saat mengirim permintaan fetch.", "color: red; font-weight: bold;", error);
    }
}


async function Komentari() {

    console.time("Komentari");
    console.log(`[SKRIP KOMENTAR] Menyiapkan untuk mengirim komentar ke Feedback ID: ${TARGET_FEEDBACK_ID}`);

    // 1. Mengambil variabel dinamis yang diperlukan (fb_dtsg dan scale)
    let fb_dtsg, scale;
    try {
        ({ fb_dtsg, scale } = await initDynamicVars());
        console.log("[SKRIP KOMENTAR] Token fb_dtsg berhasil didapatkan.");
    } catch (error) {
        console.error("[SKRIP KOMENTAR] Gagal mendapatkan fb_dtsg:", error);
        return;
    }

    // 2. Menyiapkan payload untuk mutasi GraphQL (Create Comment)
    const variables = {
        "feedLocation": "GROUP",
        "feedbackSource": 0,
        "input": {
            "actor_id": require("CurrentUserInitialData").USER_ID, // Mengambil ID pengguna saat ini
            "client_mutation_id": Math.floor(Math.random() * 100).toString(), // ID acak sederhana
            "feedback_id": TARGET_FEEDBACK_ID,
            "message": {
                "ranges": [],
                "text": COMMENT_TEXT
            },
            "is_tracking_encrypted": false, // Untuk kesederhanaan, kita tidak perlu enkripsi tracking
            "session_id": crypto.randomUUID(), // Membuat ID sesi acak
        },
        "scale": scale,
    };
    var dockomentar = require("useCometUFICreateCommentMutation_facebookRelayOperation")
    const payload = new FormData();
    payload.append('fb_dtsg', fb_dtsg);
    payload.append('variables', JSON.stringify(variables));
    payload.append('doc_id', dockomentar); // doc_id untuk membuat komentar
    payload.append('fb_api_caller_class', 'RelayModern');
    payload.append('fb_api_req_friendly_name', 'useCometUFICreateCommentMutation');

    // 3. Mengirim permintaan fetch untuk mempublikasikan komentar
    console.log("[SKRIP KOMENTAR] Mengirim permintaan untuk mempublikasikan komentar...");
    console.timeEnd("Komentari");

    try {
        const response = await fetch('/api/graphql/', {
            method: 'POST',
            body: payload,
        });

        const responseData = await response.json();

        if (response.ok && responseData.data.comment_create) {
            console.log("%c[SKRIP KOMENTAR] SUKSES! Komentar berhasil dikirim.", "color: green; font-weight: bold;");
            console.log("[SKRIP KOMENTAR] Cek postingan, komentar Anda seharusnya sudah muncul.");
        } else {
            console.error("%c[SKRIP KOMENTAR] GAGAL! Server merespons dengan error.", "color: red; font-weight: bold;");
            console.error("Detail Respons:", responseData);
        }
    } catch (error) {
        console.error("[SKRIP KOMENTAR] Terjadi error saat mengirim permintaan fetch:", error);
    }

}

// Fungsi untuk menangkap/menunggu variabel dengan Promise
function waitForPaginationId() {
    return new Promise((resolve) => {
        const check = setInterval(() => {
            try {
                // Mencoba mencari modul
                const mod = require("GroupsCometFeedRegularStoriesPaginationQuery_facebookRelayOperation");
                if (mod) {
                    PAGINATION_QUERY_DOC_ID = mod;
                    clearInterval(check);

                    resolve(); // Melanjutkan ke baris berikutnya
                }
            } catch (e) {
                // Terus mencoba sampai berhasil
            }
        }, 1000);
    });
}



(async function () {
    unsafeWindow.mintaData = mintaData;
    unsafeWindow.Komentari = Komentari;

    await capturePcket();

    console.log("[SKRIP KONSOL] Menunggu PAGINATION_QUERY_DOC_ID...");
    await waitForPaginationId();
    console.log("[SKRIP KONSOL] PAGINATION_QUERY_DOC_ID siap:", PAGINATION_QUERY_DOC_ID);
    await mintaData();

})();

// --- Helper Functions ---
