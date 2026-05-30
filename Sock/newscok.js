// ==UserScript==
// @name         FB-Universal-Decoder-v62.1-FullView
// @match        https://*.facebook.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const toSafeChar = (byte) => (byte >= 32 && byte <= 126) ? String.fromCharCode(byte) : "·";

    const humanize = async (data, direction) => {
        if (!data) return;

        let buffer;
        if (data instanceof Blob) buffer = await data.arrayBuffer();
        else if (data instanceof ArrayBuffer) buffer = data;
        else if (ArrayBuffer.isView(data)) buffer = data.buffer;
        else {
            // Filter untuk data berupa string murni
            if (typeof data === 'string' && data.toLowerCase().includes("index")) {
                console.log(`%c${direction === "SEND" ? "⬆️" : "⬇️"} [STR] : ${data}`, "color: #888");
            }
            return;
        }

        const view = new Uint8Array(buffer);
        const hex = Array.from(view).map(b => b.toString(16).padStart(2, '0')).join(" ");
        const chars = Array.from(view).map(toSafeChar).join("");

        // Filter: Hanya lanjutkan jika terdapat kata "index" (case-insensitive)
        if (!chars.toLowerCase().includes("index")) return;

        // TRIGGER BOT: Gunakan CustomEvent agar logika bot terpisah dari decoder
        // Menggunakan setTimeout 0 agar memberikan kesempatan engine browser 
        // memproses task network sebelum menjalankan logika pencarian DOM
        window.dispatchEvent(new CustomEvent('fb_socket_new_data', { detail: { direction } }));


        // Ekstraksi Metadata
        let session = view.length >= 11 ? Array.from(view.slice(3, 11)).map(b => b.toString(16).padStart(2, '0')).join("") : "N/A";
        let syncSeq = view.length >= 15 ? `Sync: ${view[12].toString(16)} | Seq: ${view[14].toString(16)}` : "N/A";

        // Cari Pesan Khusus (Marker 01 04 00)
        let msgExtracted = "";
        let metaPart = "";
        let gwtDetected = "";

        for (let i = 0; i < view.length - 3; i++) {
            if (view[i] === 0x01 && view[i+1] === 0x04 && view[i+2] === 0x00) {
                let len = view[i+3];
                msgExtracted = chars.substring(i + 4, i + 4 + len);

                // Ekstraksi GWT Header (dari index 15 sampai marker 01 04 00)
                let gwtHeaderArray = Array.from(view.slice(15, i + 3));
                gwtDetected = gwtHeaderArray.map(b => "0x" + b.toString(16).padStart(2, '0')).join(", ");

                // Ambil 5-10 byte setelah pesan sebagai kandidat Meta Point
                let metaStart = i + 4 + len + 14; // Melompat ke setelah FF FF FF FF
                if (view.length > metaStart + 5) {
                    metaPart = Array.from(view.slice(metaStart, metaStart + 5)).map(b => b.toString(16).padStart(2, '0')).join(" ");
                }
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

        if (gwtDetected) {
            console.log(`%c🛠️ NEW GWT HEADER DETECTED! %cCopy this to your script:`, "color:#9b59b6; font-weight:bold;", "color:#888;");
            console.log(`%cconst gwtHeader = [${gwtDetected}];`, "color:#fffa77; background:#333; padding:5px; font-family:monospace;");
        }

        if (metaPart) {
            console.log(`%c🎯 META POINT : %c${metaPart}`, "color:#f1c40f; font-weight:bold;", "color:#ddd;");
        }

        // Tampilkan HEX dan STRING secara langsung (Maksimal 500 karakter agar tidak memenuhi console)
        const displayHex = hex.length > 500 ? hex.substring(0, 100000) + "..." : hex;
        const displayChars = chars.length > 500 ? chars.substring(0, 100000) + "..." : chars;

        console.log(`%c📜 HEX : %c${displayHex}`, "color:#888; font-size:10px;", "color:#aaa; font-family:monospace;");
        console.log(`%c🔤 TXT : %c${displayChars}`, "color:#888; font-size:10px;", "color:#ddd; font-family:monospace;");

        // Garis pemisah antar paket agar tidak bingung
        console.log("%c" + "-".repeat(50), "color: #333");
    };

    // --- HOOKS (Sama seperti sebelumnya namun lebih stabil) ---
    const orgSend = WebSocket.prototype.send;
    WebSocket.prototype.send = function(data) {
        humanize(data, "SEND");
        return orgSend.apply(this, arguments);
    };

    const orgAddEvent = WebSocket.prototype.addEventListener;
    WebSocket.prototype.addEventListener = function(type, listener, options) {
        if (type === 'message') {
            const wrapped = function(event) {
                humanize(event.data, "RECV");
                return listener.apply(this, arguments);
            };
            return orgAddEvent.call(this, type, wrapped, options);
        }
        return orgAddEvent.apply(this, arguments);
    };

    const desc = Object.getOwnPropertyDescriptor(WebSocket.prototype, 'onmessage');
    if (desc && desc.set) {
        Object.defineProperty(WebSocket.prototype, 'onmessage', {
            set: function(cb) {
                const wrapped = function(e) { humanize(e.data, "RECV"); return cb.apply(this, arguments); };
                desc.set.call(this, wrapped);
            },
            get: function() { return desc.get.call(this); },
            configurable: true
        });
    }

    console.log("%c✔️ Full-View Decoder Active. Data akan langsung tampil tanpa klik.", "color:black; background:yellow; padding:5px; font-weight:bold;");
})();
