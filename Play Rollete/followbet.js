// ==UserScript==
// @name         Auto Bet Roulette v8.9.2.1 (fixed)
// @namespace    http://tampermonkey.net/
// @version      8.9.2.1
// @description  Auto bet roulette dengan strategi zigzag & cold dozen/column, martingale penuh, klik cepat, popup dan log debug. Final patch dengan DOM ready fix dan interval aman.
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const ID = {
        dozen: ['index-800', 'index-801', 'index-802'],
        column: ['index-700', 'index-701', 'index-702'],
        red: 'index-903',
        black: 'index-902',
        odd: 'index-904',
        even: 'index-901',
        small: 'index-900',
        big: 'index-900',
    };

    const state = {
        martingale: {
            red: 1, black: 1, odd: 1, even: 1, small: 1, big: 1,
            dozen: [1, 1, 1], column: [1, 1, 1]
        },
        saldoTertinggi: 0,
        lastWinLose: '-',
        lastResult: null,
        lastResultClicked: null,
        dozenHistory: [],
        columnHistory: [],
        zigzagDozen: 0,
        zigzagColumn: 0
    };

    function getCurrentResult() {
        const resEl = document.getElementsByClassName("ervzci33")[0];
        if (!resEl) return null;
        for (let i = 0; i < resEl.children.length; i++) {
            const num = parseInt(resEl.children[i].textContent.trim());
            if (!isNaN(num)) return num;
        }
        return null;
    }

    function getAllResults() {
        const el = document.getElementsByClassName("ervzci33")[0];
        if (!el) return [];
        return [...el.children].map(e => parseInt(e.textContent.trim())).filter(n => !isNaN(n));
    }

    function isBettingOpen() {
        return document.querySelector('[data-e2e="betting-timer"]') !== null;
    }

    function getBalance() {
        const el = document.querySelector('[data-e2e="balance-value"]');
        if (!el) return 0;
        const str = el.textContent.replace('$', '').replace(',', '').trim();
        return parseFloat(str);
    }

    function clickById(id) {
        const el = document.getElementById(id);
        if (el) el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }

    function resetMartingale() {
        Object.keys(state.martingale).forEach(key => {
            if (Array.isArray(state.martingale[key])) {
                state.martingale[key] = state.martingale[key].map(() => 1);
            } else {
                state.martingale[key] = 1;
            }
        });
        console.log("🔁 Martingale reset karena saldo tertinggi tercapai.");
    }

    function updateSaldoTertinggi() {
        const s = getBalance();
        if (s > state.saldoTertinggi) {
            state.saldoTertinggi = s;
            console.log("📈 Saldo tertinggi baru:", s);
            resetMartingale();
        }
    }

    function getDozen(n) {
        if (n >= 1 && n <= 12) return 0;
        if (n >= 13 && n <= 24) return 1;
        if (n >= 25 && n <= 36) return 2;
        return -1;
    }

    function getColumn(n) {
        if (n < 1 || n > 36) return -1;
        return (n - 1) % 3;
    }

    function updateZigzagHistory(current, history) {
        const prev = history[0];
        history.unshift(current);
        if (history.length > 10) history.pop();
        return prev !== undefined && prev !== current;
    }

    function bet() {
        console.log("🔄 Menjalankan fungsi bet pada:", new Date().toLocaleTimeString());
        if (!isBettingOpen()) return;

        const result = getCurrentResult();
        console.log("🎯 Hasil result terbaca:", result);

        const results = getAllResults();
        updateSaldoTertinggi();
        if (result == null || result === state.lastResultClicked) return;

        state.lastResultClicked = result;
        state.lastResult = result;

        const isEven = result % 2 === 0;
        const isSmall = result <= 18;
        const isRed = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(result);

        clickById(isRed ? ID.red : ID.black);
        clickById(isEven ? ID.even : ID.odd);
        clickById(isSmall ? ID.small : ID.big);

        state.martingale.red = isRed ? Math.min(state.martingale.red * 2, 128) : 1;
        state.martingale.black = !isRed ? Math.min(state.martingale.black * 2, 128) : 1;
        state.martingale.even = isEven ? Math.min(state.martingale.even * 2, 128) : 1;
        state.martingale.odd = !isEven ? Math.min(state.martingale.odd * 2, 128) : 1;
        state.martingale.small = isSmall ? Math.min(state.martingale.small * 2, 128) : 1;
        state.martingale.big = !isSmall ? Math.min(state.martingale.big * 2, 128) : 1;

        const doz = getDozen(result);
        if (doz >= 0) {
            const isZigzag = updateZigzagHistory(doz, state.dozenHistory);
            if (isZigzag) state.zigzagDozen++; else state.zigzagDozen = 1;
            const counts = [0, 0, 0];
            state.dozenHistory.slice(0, 5).forEach(d => counts[d]++);
            const coldIndex = counts.indexOf(0);

            if (state.zigzagDozen >= 5) {
                clickById(ID.dozen[doz]);
                state.martingale.dozen[doz] = Math.min(state.martingale.dozen[doz] * 2, 128);
                state.martingale.dozen.forEach((v, i) => { if (i !== doz) state.martingale.dozen[i] = 1; });
                state.zigzagDozen = 0;
            } else if (coldIndex >= 0) {
                clickById(ID.dozen[coldIndex]);
                state.martingale.dozen[coldIndex] = Math.min(state.martingale.dozen[coldIndex] * 2, 128);
                state.martingale.dozen.forEach((v, i) => { if (i !== coldIndex) state.martingale.dozen[i] = 1; });
            }
        }

        const col = getColumn(result);
        if (col >= 0) {
            const isZigzag = updateZigzagHistory(col, state.columnHistory);
            if (isZigzag) state.zigzagColumn++; else state.zigzagColumn = 1;
            const counts = [0, 0, 0];
            state.columnHistory.slice(0, 8).forEach(c => counts[c]++);
            const coldIndex = counts.indexOf(0);

            if (state.zigzagColumn >= 8) {
                clickById(ID.column[col]);
                state.martingale.column[col] = Math.min(state.martingale.column[col] * 2, 128);
                state.martingale.column.forEach((v, i) => { if (i !== col) state.martingale.column[i] = 1; });
                state.zigzagColumn = 0;
            } else if (coldIndex >= 0) {
                clickById(ID.column[coldIndex]);
                state.martingale.column[coldIndex] = Math.min(state.martingale.column[coldIndex] * 2, 128);
                state.martingale.column.forEach((v, i) => { if (i !== coldIndex) state.martingale.column[i] = 1; });
            }
        }

        updatePopup();

        console.log("🎯 Result:", result);
        console.log("📣 Status:", state.lastWinLose);
        console.log("🔁 Martingale:", JSON.stringify(state.martingale));
        console.log("💰 Saldo:", getBalance(), "| Saldo Tertinggi:", state.saldoTertinggi);
        console.log("📊 Zigzag Dozen:", state.zigzagDozen, ", Zigzag Column:", state.zigzagColumn);
    }

    function createPopup() {
        const box = document.createElement("div");
        box.id = "autoPopupStatus";
        box.style.cssText = `
            position: fixed;
            bottom: 10px;
            left: 10px;
            background: #000;
            color: #0f0;
            padding: 10px;
            font-family: monospace;
            font-size: 12px;
            z-index: 9999;
            border-radius: 6px;
            line-height: 1.5;
        `;
        box.innerHTML = 'Loading...';
        document.body.appendChild(box);
    }

    function updatePopup() {
        const el = document.getElementById("autoPopupStatus");
        if (!el) return;
        el.innerHTML = `
        💰 Saldo: $${getBalance().toFixed(2)}<br>
        📈 Saldo Tertinggi: $${state.saldoTertinggi.toFixed(2)}<br>
        🎯 Result Terakhir: ${state.lastResult}<br>
        🔁 Martingale:<br>
        - Red: x${state.martingale.red} | Black: x${state.martingale.black}<br>
        - Even: x${state.martingale.even} | Odd: x${state.martingale.odd}<br>
        - Small: x${state.martingale.small} | Big: x${state.martingale.big}<br>
        - Dozen: [${state.martingale.dozen.join(', ')}]<br>
        - Column: [${state.martingale.column.join(', ')}]<br>
        📊 Zigzag Dozen: ${state.zigzagDozen}<br>
        📊 Zigzag Column: ${state.zigzagColumn}<br>
        `;
    }

    function waitUntilReady(callback) {
        const check = () => {
            if (document.body && document.getElementsByClassName("ervzci33")[0]) {
                callback();
            } else {
                setTimeout(check, 1000);
            }
        };
        check();
    }

    waitUntilReady(() => {
        createPopup();
        console.log("🔁 DOM terdeteksi");

        setInterval(() => {
            try {
                bet();
            } catch (e) {
                console.error("❌ ERROR saat eksekusi bet():", e);
            }
        }, 3000);

        console.log("🔁 Script Di Jalankan");
    });
})();
