// ==UserScript==
// @name         FB-Universal-Decoder-v62.1-FullView
// @match        https://*.facebook.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';

    const toSafeChar = (byte) => (byte >= 32 && byte <= 126) ? String.fromCharCode(byte) : "·";
    const decoder = new TextDecoder(); // Jauh lebih cepat daripada manual map

    const humanize = (data, direction) => {
        if (!data) return;

        // JALUR INSTAN (Synchronous): Hindari async/await jika data sudah berupa Buffer
        if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
            processBuffer(data instanceof ArrayBuffer ? data : data.buffer, direction);
        } else if (data instanceof Blob) {
            // Blob terpaksa async, tapi biasanya socket FB menggunakan ArrayBuffer untuk data real-time
            data.arrayBuffer().then(buf => processBuffer(buf, direction));
        } else if (typeof data === 'string') {
            if (/index/i.test(data)) {
                window.dispatchEvent(new CustomEvent('fb_socket_new_data', { detail: { direction, isString: true } }));
            }
        }
    };

    const processBuffer = (buffer, direction) => {
        const view = new Uint8Array(buffer);

        // Gunakan decode hanya jika diperlukan atau langsung tembak trigger 
        // jika paket memiliki karakteristik ukuran tertentu (opsional).
        const rawText = decoder.decode(view);
        if (!/index/i.test(rawText)) return;

        // 1. TRIGGER INSTAN (Synchronous) - TETAP DI LUAR setTimeout
        window.dispatchEvent(new CustomEvent('fb_socket_new_data', {
            detail: { direction, timestamp: Date.now() }
        }));
        window.addEventListener('fb_socket_new_data', (e) => {
            // JANGAN gunakan setTimeout di sini jika ingin lari dari throttle.
            // Langsung scan DOM:
            const elements = document.querySelectorAll("[data-tracking-duration-id]");
            if (elements.length > 0) {
               console.log(elements.length)
            }
        });
        // 2. LOGGING BERAT (Didefer menggunakan setTimeout)
        // Kita pindahkan logging ke task queue berikutnya agar tidak menghambat 
        // bot yang sedang melakukan querySelectorAll di thread utama.
        setTimeout(() => {
            const hex = Array.from(view).map(b => b.toString(16).padStart(2, '0')).join(" ");
            const chars = Array.from(view).map(toSafeChar).join("");
            const session = view.length >= 11 ? Array.from(view.slice(3, 11)).map(b => b.toString(16).padStart(2, '0')).join("") : "N/A";
            const syncSeq = view.length >= 15 ? `Sync: ${view[12].toString(16)} | Seq: ${view[14].toString(16)}` : "N/A";

            const color = direction === "SEND" ? "#0087ff" : "#00ff41";
            const label = direction === "SEND" ? "⬆️ SENDING" : "⬇️ RECEIVING";

            console.log(`%c${label} [${view.length} bytes] %c Session: ${session} | ${syncSeq}`,
                `color: ${color}; font-weight: bold; font-size: 11px;`,
                `color: #aaa; font-size: 10px;`);

            const displayHex = hex.length > 1000 ? hex.substring(0, 1000) + "..." : hex;
            const displayChars = chars.length > 1000 ? chars.substring(0, 1000) + "..." : chars;

            console.log(`%c📜 HEX : %c${displayHex}`, "color:#888; font-size:10px;", "color:#aaa; font-family:monospace;");
            console.log(`%c🔤 TXT : %c${displayChars}`, "color:#888; font-size:10px;", "color:#ddd; font-family:monospace;");
            console.log("%c" + "-".repeat(50), "color: #333");
        }, 0);
    };

    // --- HOOKS (Sama seperti sebelumnya namun lebih stabil) ---
    const orgSend = WebSocket.prototype.send;
    WebSocket.prototype.send = function (data) {
        humanize(data, "SEND");
        return orgSend.apply(this, arguments);
    };

    const orgAddEvent = WebSocket.prototype.addEventListener;
    WebSocket.prototype.addEventListener = function (type, listener, options) {
        if (type === 'message') {
            const wrapped = function (event) {
                humanize(event.data, "RECV"); // Eksekusi langsung di thread utama
                return listener.apply(this, arguments);
            };
            return orgAddEvent.call(this, type, wrapped, options);
        }
        return orgAddEvent.apply(this, arguments);
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

    console.log("%c✔️ Full-View Decoder Active. Data akan langsung tampil tanpa klik.", "color:black; background:yellow; padding:5px; font-weight:bold;");
})();
