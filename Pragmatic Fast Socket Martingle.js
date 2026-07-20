// ==UserScript==
// @name         Pragmatic Socet Rollete Fast
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  8 Model, Martingle, Follow, Waiting Strategy
// @author       Antigravity
// @match        *://*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
var waitDozen = 8;
var waitCol = 8;
var FollowDozen = 8;
var FollowCol = 8;
var minimumBet = 5000;
// Ganti Sesuai Code Meja Untuk Taruhan data-bet-code=
var tableDozen1 = 43;
var tableDozen2 = 44;
var tableDozen3 = 45;
var tableCol1 = 40;
var tableCol2 = 41;
var tableCol3 = 42;
(function () {
    'use strict';
    async function bypassClick(el) {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        const eventParams = {
            clientX: x, clientY: y,
            view: window, bubbles: true, cancelable: true,
            pointerId: 1, width: 1, height: 1, pressure: 0.5,
            pointerType: "mouse", isPrimary: true
        };

        el.dispatchEvent(new PointerEvent('pointerover', eventParams));
        el.dispatchEvent(new PointerEvent('pointerenter', eventParams));
        await new Promise(r => setTimeout(r, 100));

        el.dispatchEvent(new PointerEvent('pointerdown', eventParams));
        el.dispatchEvent(new MouseEvent('mousedown', { ...eventParams, buttons: 1 }));
        await new Promise(r => setTimeout(r, 50));

        el.dispatchEvent(new PointerEvent('pointerup', eventParams));
        el.dispatchEvent(new MouseEvent('mouseup', { ...eventParams, buttons: 1 }));
        el.dispatchEvent(new MouseEvent('click', { ...eventParams, buttons: 1 }));
    }

    const targetNode = document.body;
    const config = { childList: true, subtree: true };
    let isClicking = false;
    const callback = async function (mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {

                const button = document.querySelector('button[data-testid="inactivity-popup-button"]');
                if (button && !isClicking) {
                    console.log("Tombol popup ditemukan. Mengeksekusi bypass click...");

                    isClicking = true;
                    await bypassClick(button);
                    console.log("Bypass click selesai dieksekusi.");
                    setTimeout(() => {
                        isClicking = false;
                    }, 1000);
                }
            }
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
    console.log("Observer aktif memantau popup dengan bypassClick...");

    const OriginalWebSocket = window.WebSocket;
    const OriginalWorker = window.Worker;
    window.Pragmatic = window.Pragmatic || {
        socket: null,
        tableId: null,
        gameId: null,
        userId: null
    };
    // Ganti Sesuai Code Meja Untuk Taruhan
    window.BetModels = window.BetModels || {
        w_d1: { name: "WAIT D1", active: false, step: 0, code: tableDozen1 },
        w_d2: { name: "WAIT D2", active: false, step: 0, code: tableDozen2 },
        w_d3: { name: "WAIT D3", active: false, step: 0, code: tableDozen3 },
        w_c1: { name: "WAIT C1", active: false, step: 0, code: tableCol1 },
        w_c2: { name: "WAIT C2", active: false, step: 0, code: tableCol2 },
        w_c3: { name: "WAIT C3", active: false, step: 0, code: tableCol3 },
        f_doz: { name: "FOLLOW DOZ", active: false, step: 0, code: null },
        f_col: { name: "FOLLOW COL", active: false, step: 0, code: null }
    };

    if (OriginalWorker) {
        window.Worker = new Proxy(OriginalWorker, {
            construct(target, args) {
                console.warn('%c[!] Game membuat Web Worker. Jika socket di dalam worker, bypass khusus diperlukan!', 'color: #ff0000; font-weight: bold;', args[0]);
                return new target(...args);
            }
        });
    }
    window.WebSocket = new Proxy(OriginalWebSocket, {
        construct(target, args) {
            const ws = new target(...args);
            console.info('%c[+] WebSocket Created (Proxy): ' + args[0], 'color: #00ff00; font-weight: bold; background: #222; padding: 2px;');
            return ws;
        }
    });
    const decoder = new TextDecoder('utf-8');
    function parseData(data) {
        if (data instanceof ArrayBuffer) {
            try {
                const text = decoder.decode(data);
                // Cek secara cepat apakah ini teks yang valid (misal diawali dengan { atau <)
                if (text.startsWith('{') || text.startsWith('<') || text.startsWith('[')) {
                    return text;
                }
                return `[Binary Data ${data.byteLength} bytes]`;
            } catch (e) {
                return `[Binary Decode Error]`;
            }
        }
        return data; // Jika sudah string, biarkan saja
    }

    // Kata kunci target URL
    const TARGET_URL_KEYWORD = "game?JSESSIONID";

    // Fungsi untuk mengecek apakah socket ini adalah target kita
    function isTargetSocket(ws) {
        try {
            return ws && ws.url && ws.url.includes(TARGET_URL_KEYWORD);
        } catch (e) {
            return false;
        }
    }

    const nativeSend = OriginalWebSocket.prototype.send;
    OriginalWebSocket.prototype.send = function (data) {
        if (isTargetSocket(this)) {
            window.Pragmatic.socket = this;
            const parsed = parseData(data);
        }
        return nativeSend.apply(this, arguments);
    };
    function processAndEmitData(textData) {
        if (typeof textData === 'string' && textData.startsWith('{')) {
            try {
                const jsonObj = JSON.parse(textData);
                window.dispatchEvent(new CustomEvent('BotSocketData', { detail: jsonObj }));
                if (jsonObj.gameresult) window.LastGameResult = jsonObj.gameresult;
                if (jsonObj.timer) window.LastGameTimer = jsonObj.timer;

            } catch (e) {
            }
        }
    }

    const nativeAddEventListener = OriginalWebSocket.prototype.addEventListener;
    OriginalWebSocket.prototype.addEventListener = function (type, listener, options) {
        if (type === 'message') {
            const wrappedListener = function (event) {
                if (isTargetSocket(event.target)) {
                    const parsed = parseData(event.data);
                    console.info('%c⬇️ Received:', 'color: #00bfff; font-weight: bold; background: #222; padding: 2px;', parsed);
                    processAndEmitData(parsed);
                }
                return listener.apply(this, arguments);
            };
            return nativeAddEventListener.call(this, type, wrappedListener, options);
        }
        return nativeAddEventListener.call(this, type, listener, options);
    };

    const nativeMessageDesc = Object.getOwnPropertyDescriptor(OriginalWebSocket.prototype, 'onmessage');
    if (nativeMessageDesc && nativeMessageDesc.set) {
        Object.defineProperty(OriginalWebSocket.prototype, 'onmessage', {
            set: function (listener) {
                const wrappedListener = function (event) {
                    if (isTargetSocket(event.target)) {
                        const parsed = parseData(event.data);
                        processAndEmitData(parsed);
                    }
                    if (listener) return listener.apply(this, arguments);
                };
                return nativeMessageDesc.set.call(this, wrappedListener);
            },
            get: function () {
                return nativeMessageDesc.get ? nativeMessageDesc.get.call(this) : undefined;
            }
        });
    }

    window.BotStats = window.BotStats || {
        cur: { red: 0, black: 0, d1: 0, d2: 0, d3: 0, c1: 0, c2: 0, c3: 0, odd: 0, even: 0, small: 0, big: 0 },
        max: { red: 0, black: 0, d1: 0, d2: 0, d3: 0, c1: 0, c2: 0, c3: 0, odd: 0, even: 0, small: 0, big: 0 },
        follow: { dozMiss: 0, dozMissMax: 0, dozLast: null, colMiss: 0, colMissMax: 0, colLast: null }
    };

    function initBotUI() {
        const existingUI = document.getElementById('bot-ui-panel');
        if (existingUI) {
            if (!document.getElementById('bot-table') || !document.getElementById('bot-game') || !document.getElementById('bot-user')) {
                existingUI.remove();
                uiEls = null;
            } else {
                return;
            }
        }

        const ui = document.createElement('div');
        ui.id = 'bot-ui-panel';
        ui.innerHTML = `
            <div class="bot-header" id="bot-drag-handle" style="cursor: grab; display: flex; justify-content: space-between; align-items: center;">
                <span style="flex: 1; text-align: center; margin-left: 15px;">🤖 Pragmatic Bot UI</span>
                <span id="bot-minimize" style="cursor: pointer; font-size: 14px; font-weight: bold; padding: 0 5px;" title="Minimize">_</span>
            </div>
            <div id="bot-content-wrap">
            <div class="bot-row"><span class="bot-label">STATUS</span><span id="bot-status" class="bot-val bot-closed">WAITING</span></div>
            <div class="bot-row"><span class="bot-label">TABLE ID</span><span id="bot-table" class="bot-val" style="color: #00ffcc; font-size: 10px;">-</span></div>
            <div class="bot-row"><span class="bot-label">GAME ID</span><span id="bot-game" class="bot-val" style="color: #00ffcc; font-size: 10px;">-</span></div>
            <div class="bot-row"><span class="bot-label">USER ID</span><span id="bot-user" class="bot-val" style="color: #00ffcc; font-size: 10px;">-</span></div>
            <div class="bot-row"><span class="bot-label">RESULT</span><span id="bot-result" class="bot-val">-</span></div>

            <div class="bot-header" style="margin-top: 15px; font-size: 12px; color: #fbbf24;">📊 STATISTIK DELAY</div>

            <div class="stat-box">
                <div class="sb-title">COLOR</div>
                <div class="sb-row">
                    <div class="sb-col"><span class="sb-sub">RED</span><span id="s-red" class="sb-val bot-red">0</span></div>
                    <div class="sb-col"><span class="sb-sub">BLACK</span><span id="s-blk" class="sb-val bot-black">0</span></div>
                </div>
            </div>

            <div class="stat-box">
                <div class="sb-title">DOZEN</div>
                <div class="sb-row">
                    <div class="sb-col"><span class="sb-sub">1ST</span><span id="s-d1" class="sb-val">0</span></div>
                    <div class="sb-col"><span class="sb-sub">2ND</span><span id="s-d2" class="sb-val">0</span></div>
                    <div class="sb-col"><span class="sb-sub">3RD</span><span id="s-d3" class="sb-val">0</span></div>
                </div>
            </div>

            <div class="stat-box">
                <div class="sb-title">COLUMN</div>
                <div class="sb-row">
                    <div class="sb-col"><span class="sb-sub">1ST</span><span id="s-c1" class="sb-val">0</span></div>
                    <div class="sb-col"><span class="sb-sub">2ND</span><span id="s-c2" class="sb-val">0</span></div>
                    <div class="sb-col"><span class="sb-sub">3RD</span><span id="s-c3" class="sb-val">0</span></div>
                </div>
            </div>

            <div class="stat-box">
                <div class="sb-title">PARITY (O/E & B/S)</div>
                <div class="sb-row">
                    <div class="sb-col"><span class="sb-sub">ODD</span><span id="s-odd" class="sb-val">0</span></div>
                    <div class="sb-col"><span class="sb-sub">EVEN</span><span id="s-even" class="sb-val">0</span></div>
                    <div class="sb-col"><span class="sb-sub">SMALL</span><span id="s-sml" class="sb-val">0</span></div>
                    <div class="sb-col"><span class="sb-sub">BIG</span><span id="s-big" class="sb-val">0</span></div>
                </div>
            </div>

            <div class="stat-box" style="border-color: rgba(239,68,68,0.3); background: rgba(239,68,68,0.1);">
                <div class="sb-title" style="color: #ef4444; font-size: 10px;">FOLLOW LOSE STREAK</div>
                <div class="sb-row">
                    <div class="sb-col"><span class="sb-sub">DOZEN STREAK</span><span id="s-str-doz" class="sb-val" style="color:#ef4444;">0</span></div>
                    <div class="sb-col"><span class="sb-sub">COLUMN STREAK</span><span id="s-str-col" class="sb-val" style="color:#ef4444;">0</span></div>
                </div>
            </div>
            </div>
        `;

        const style = document.createElement('style');
        style.textContent = `
            #bot-ui-panel {
                position: fixed; top: 80px; right: 20px; width: 220px;
                background: rgba(15, 23, 42, 0.85);
                backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
                border: 1px solid rgba(0, 255, 204, 0.2);
                border-radius: 8px; padding: 10px; color: #fff;
                font-family: 'Inter', 'Segoe UI', sans-serif;
                z-index: 999999; box-shadow: 0 6px 24px rgba(0, 0, 0, 0.5);
                pointer-events: auto; /* Bisa diklik agar bisa digeser */
            }
            .bot-header {
                font-weight: 800; font-size: 11px; text-align: center;
                margin-bottom: 8px; color: #00ffcc; text-transform: uppercase;
                letter-spacing: 0.5px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 6px;
            }
            .bot-row { display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 11px; align-items: center; }
            .bot-label { color: #94a3b8; font-weight: 600; }
            .bot-val { font-weight: 700; color: #f8fafc; text-shadow: 0 1px 2px rgba(0,0,0,0.8); }

            /* Merged Box Styles */
            .stat-box { background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.05); border-radius: 4px; padding: 4px; margin-bottom: 4px; box-shadow: inset 0 1px 3px rgba(0,0,0,0.2); }
            .sb-title { font-size: 9px; color: #00ffcc; font-weight: 700; margin-bottom: 4px; text-align: center; letter-spacing: 0.5px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 2px; }
            .sb-row { display: flex; justify-content: space-between; gap: 3px; }
            .sb-col { flex: 1; text-align: center; background: rgba(255,255,255,0.03); border-radius: 3px; padding: 2px; }
            .sb-sub { display: block; font-size: 7px; color: #94a3b8; font-weight: 700; margin-bottom: 1px; }
            .sb-val { display: block; font-size: 13px; font-weight: 800; color: #facc15; text-shadow: 0 1px 2px rgba(0,0,0,0.9); }
            .sb-max { display: block; font-size: 8px; color: #64748b; font-weight: 600; margin-top: 1px;}

            .bot-open { color: #4ade80 !important; }
            .bot-warn { color: #fbbf24 !important; }
            .bot-closed { color: #f87171 !important; }
            .bot-red { color: #ef4444 !important; }
            .bot-black { color: #cbd5e1 !important; }
            .bot-green { color: #22c55e !important; }
        `;

        const attachUI = () => {
            if (!document.body) return setTimeout(attachUI, 100);
            document.body.appendChild(ui);
            document.head.appendChild(style);
        };
        attachUI();

        // --- DRAG & MINIMIZE LOGIC ---
        const dragHandle = ui.querySelector('#bot-drag-handle');
        const minBtn = ui.querySelector('#bot-minimize');
        const contentWrap = ui.querySelector('#bot-content-wrap');

        let isMinimized = false;
        minBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            isMinimized = !isMinimized;
            contentWrap.style.display = isMinimized ? 'none' : 'block';
            minBtn.textContent = isMinimized ? '□' : '_';
        });

        let isDragging = false, startX, startY, initialX, initialY;

        dragHandle.addEventListener('mousedown', (e) => {
            if (e.target === minBtn) return;
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            const rect = ui.getBoundingClientRect();
            initialX = rect.left;
            initialY = rect.top;
            dragHandle.style.cursor = 'grabbing';
            e.preventDefault(); // Mencegah blok teks terblokir saat drag
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            ui.style.left = (initialX + dx) + 'px';
            ui.style.top = (initialY + dy) + 'px';
            ui.style.bottom = 'auto'; // Hapus property asli
            ui.style.right = 'auto';  // Hapus property asli
        });

        window.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                dragHandle.style.cursor = 'grab';
            }
        });
        // -----------------------------
    }
    let uiEls = null;
    function updateUI(key, val, className = '') {
        if (!uiEls) {
            if (!document.getElementById('bot-ui-panel')) return;
            uiEls = {
                status: document.getElementById('bot-status'),
                table: document.getElementById('bot-table'),
                game: document.getElementById('bot-game'),
                user: document.getElementById('bot-user'),
                result: document.getElementById('bot-result'),
                's-red': document.getElementById('s-red'),
                's-blk': document.getElementById('s-blk'),
                's-d1': document.getElementById('s-d1'),
                's-d2': document.getElementById('s-d2'),
                's-d3': document.getElementById('s-d3'),
                's-c1': document.getElementById('s-c1'),
                's-c2': document.getElementById('s-c2'),
                's-c3': document.getElementById('s-c3'),
                's-odd': document.getElementById('s-odd'),
                's-even': document.getElementById('s-even'),
                's-sml': document.getElementById('s-sml'),
                's-big': document.getElementById('s-big'),
                's-str-doz': document.getElementById('s-str-doz'),
                's-str-col': document.getElementById('s-str-col')
            };
        }
        if (uiEls[key]) {
            uiEls[key].innerHTML = val;
            if (className) uiEls[key].className = 'sb-val ' + className;
            if (['status', 'timer', 'result', 'dozen', 'col'].includes(key)) {
                uiEls[key].className = 'bot-val ' + (className || '');
            }
        }
    }
    function processRouletteMath(score, colorStr) {
        const num = parseInt(score, 10);
        let cClass = 'bot-green';
        if (colorStr.toLowerCase() === 'red') cClass = 'bot-red';
        else if (colorStr.toLowerCase() === 'black') cClass = 'bot-black';

        updateUI('result', score + ' ' + colorStr.toUpperCase(), cClass);

        if (isNaN(num)) return;
        const isZero = (num === 0);
        const dozen = isZero ? '-' : Math.ceil(num / 12);
        const col = isZero ? '-' : ((num % 3 === 0) ? 3 : (num % 3));

        updateUI('dozen', dozen);
        updateUI('col', col);
        const s = window.BotStats;
        const isRed = (colorStr.toLowerCase() === 'red');
        const isBlack = (colorStr.toLowerCase() === 'black');
        const isD1 = (!isZero && num >= 1 && num <= 12);
        const isD2 = (!isZero && num >= 13 && num <= 24);
        const isD3 = (!isZero && num >= 25 && num <= 36);
        const isC1 = (!isZero && num % 3 === 1);
        const isC2 = (!isZero && num % 3 === 2);
        const isC3 = (!isZero && num % 3 === 0);
        const isOdd = (!isZero && num % 2 !== 0);
        const isEven = (!isZero && num % 2 === 0);
        const isSmall = (!isZero && num >= 1 && num <= 18);
        const isBig = (!isZero && num >= 19 && num <= 36);
        s.cur.red = isRed ? 0 : s.cur.red + 1;
        s.cur.black = isBlack ? 0 : s.cur.black + 1;
        s.cur.d1 = isD1 ? 0 : s.cur.d1 + 1;
        s.cur.d2 = isD2 ? 0 : s.cur.d2 + 1;
        s.cur.d3 = isD3 ? 0 : s.cur.d3 + 1;
        s.cur.c1 = isC1 ? 0 : s.cur.c1 + 1;
        s.cur.c2 = isC2 ? 0 : s.cur.c2 + 1;
        s.cur.c3 = isC3 ? 0 : s.cur.c3 + 1;
        s.cur.odd = isOdd ? 0 : s.cur.odd + 1;
        s.cur.even = isEven ? 0 : s.cur.even + 1;
        s.cur.small = isSmall ? 0 : s.cur.small + 1;
        s.cur.big = isBig ? 0 : s.cur.big + 1;
        for (let key in s.cur) {
            if (s.cur[key] > s.max[key]) s.max[key] = s.cur[key];
        }
        if (s.follow.dozLast !== null) {
            if (dozen !== '-' && dozen === s.follow.dozLast) s.follow.dozMiss = 0;
            else s.follow.dozMiss++;
        }
        if (dozen !== '-') s.follow.dozLast = dozen;
        if (s.follow.dozMiss > s.follow.dozMissMax) s.follow.dozMissMax = s.follow.dozMiss;

        if (s.follow.colLast !== null) {
            if (col !== '-' && col === s.follow.colLast) s.follow.colMiss = 0; // Win (Repeat)
            else s.follow.colMiss++;
        }
        if (col !== '-') s.follow.colLast = col;
        if (s.follow.colMiss > s.follow.colMissMax) s.follow.colMissMax = s.follow.colMiss;

        const fmt = (c, m) => `${c}<span class="sb-max">MAX: ${m}</span>`;
        updateUI('s-red', fmt(s.cur.red, s.max.red), 'bot-red');
        updateUI('s-blk', fmt(s.cur.black, s.max.black), 'bot-black');
        updateUI('s-d1', fmt(s.cur.d1, s.max.d1));
        updateUI('s-d2', fmt(s.cur.d2, s.max.d2));
        updateUI('s-d3', fmt(s.cur.d3, s.max.d3));
        updateUI('s-c1', fmt(s.cur.c1, s.max.c1));
        updateUI('s-c2', fmt(s.cur.c2, s.max.c2));
        updateUI('s-c3', fmt(s.cur.c3, s.max.c3));
        updateUI('s-odd', fmt(s.cur.odd, s.max.odd));
        updateUI('s-even', fmt(s.cur.even, s.max.even));
        updateUI('s-sml', fmt(s.cur.small, s.max.small));
        updateUI('s-big', fmt(s.cur.big, s.max.big));

        updateUI('s-str-doz', fmt(s.follow.dozMiss, s.follow.dozMissMax));
        updateUI('s-str-col', fmt(s.follow.colMiss, s.follow.colMissMax));
        evaluateBetModels(dozen, col);
    }

    function getBetCode(type, val) {
        if (type === 'doz') {
            if (val === 1) return tableDozen1;
            if (val === 2) return tableDozen2;
            if (val === 3) return tableDozen3;
        } else if (type === 'col') {
            if (val === 1) return tableCol1;
            if (val === 2) return tableCol2;
            if (val === 3) return tableCol3;
        }
        return null;
    }

    function evaluateBetModels(doz, col) {
        const bm = window.BetModels;
        const s = window.BotStats;
        for (let key in bm) {
            let m = bm[key];
            if (m.active) {
                let won = false;
                if (m.code >= 43 && m.code <= 45) {
                    if (doz === (m.code - 42)) won = true;
                } else if (m.code >= 40 && m.code <= 42) {
                    if (col === (m.code - 39)) won = true;
                }

                if (won) {
                    m.active = false;
                    m.step = 0;
                    console.log(`%c[BOT] Model ${m.name} MENANG! Reset Martingale.`, 'color:#22c55e;font-weight:bold;');
                } else {
                    m.step++;
                    console.log(`%c[BOT] Model ${m.name} KALAH! Naik ke Step ${m.step}`, 'color:#ef4444;font-weight:bold;');
                    if (key === 'f_doz' && doz !== 0 && doz !== '-') {
                        m.code = getBetCode('doz', doz);
                    } else if (key === 'f_col' && col !== 0 && col !== '-') {
                        m.code = getBetCode('col', col);
                    }
                }
            }
        }

        if (!bm.w_d1.active && s.cur.d1 >= waitDozen) { bm.w_d1.active = true; bm.w_d1.step = 0; }
        if (!bm.w_d2.active && s.cur.d2 >= waitDozen) { bm.w_d2.active = true; bm.w_d2.step = 0; }
        if (!bm.w_d3.active && s.cur.d3 >= waitDozen) { bm.w_d3.active = true; bm.w_d3.step = 0; }

        if (!bm.w_c1.active && s.cur.c1 >= waitCol) { bm.w_c1.active = true; bm.w_c1.step = 0; }
        if (!bm.w_c2.active && s.cur.c2 >= waitCol) { bm.w_c2.active = true; bm.w_c2.step = 0; }
        if (!bm.w_c3.active && s.cur.c3 >= waitCol) { bm.w_c3.active = true; bm.w_c3.step = 0; }
        if (!bm.f_doz.active && s.follow.dozMiss >= FollowDozen && s.follow.dozLast !== null) {
            bm.f_doz.active = true;
            bm.f_doz.step = 0;
            bm.f_doz.code = getBetCode('doz', s.follow.dozLast);
        }

        if (!bm.f_col.active && s.follow.colMiss >= FollowCol && s.follow.colLast !== null) {
            bm.f_col.active = true;
            bm.f_col.step = 0;
            bm.f_col.code = getBetCode('col', s.follow.colLast);
        }
    }

    function placeBets() {
        const P = window.Pragmatic;
        if (!P.socket || !P.tableId || !P.gameId || !P.userId) return;

        const startBet = minimumBet;
        let ts = Date.now();
        let betsXml = "";
        let betCount = 0;

        const fiboSteps = [5, 5, 10, 15, 25, 40, 65, 105, 210, 420, 840, 1680];

        for (let key in window.BetModels) {
            let m = window.BetModels[key];
            if (m.active && m.code) {
                let currentStepVal = (m.step < fiboSteps.length) ? fiboSteps[m.step] : fiboSteps[fiboSteps.length - 1];
                let amt = currentStepVal * 1000;

                betsXml += `<bet amt="${amt}" bc="${m.code}" ck="${ts}"/>`;
                betCount++;
                console.log(`%c[BOT] MENYIAPKAN BET: ${m.name} | Step: ${m.step} | Amount: ${amt} | Code: ${m.code}`, 'color:#a855f7;font-weight:bold;');
            }
        }

        if (betCount > 0) {
            let xml = `<command channel="table-${P.tableId}"><lpbet gm="roulette_desktop" gId="${P.gameId}" uId="${P.userId}" ck="${ts}">${betsXml}</lpbet></command>`;
            setTimeout(() => {
                console.log(`%c[BOT] MENGIRIM BATCH BET (${betCount} Taruhan Dikumpulkan)...`, 'color:#22c55e;font-weight:bold;font-size:14px;');
                try {
                    P.socket.send(xml);
                } catch (e) {
                    console.error("[BOT] Gagal mengirim bet:", e);
                }
            }, 2000);
        }
    }

    window.addEventListener('BotSocketData', (e) => {
        initBotUI();

        const data = e.detail;

        if (data.betsopen) {
            updateUI('status', 'BETS OPEN', 'bot-open');
            if (data.betsopen.table) {
                updateUI('table', data.betsopen.table);
                window.Pragmatic.tableId = data.betsopen.table;
            }
            if (data.betsopen.game) {
                updateUI('game', data.betsopen.game);
                window.Pragmatic.gameId = data.betsopen.game;
            }

            const ppPromo = document.querySelector('pp-promotions');
            if (ppPromo && ppPromo.getAttribute('user_id')) {
                updateUI('user', ppPromo.getAttribute('user_id'));
                window.Pragmatic.userId = ppPromo.getAttribute('user_id');
            }

            placeBets();
        }
        else if (data.betsclosingsoon) updateUI('status', 'CLOSING SOON', 'bot-warn');
        else if (data.betsclosed) updateUI('status', 'BETS CLOSED', 'bot-closed');
        else if (data.startDealing) updateUI('status', 'DEALING', 'bot-warn');

        if (data.timer) updateUI('timer', data.timer.value + 's');

        if (data.gameresult) processRouletteMath(data.gameresult.score, data.gameresult.color);
    });

})();
