// ==UserScript==
// @name         Roulette Auto Bet v6.8 - Fix Evaluasi Result dan Deteksi Countdown
// @namespace    http://tampermonkey.net/
// @version      6.8
// @description  Evaluasi hasil saat awal countdown (p keluar angka), bukan saat Spinning hilang. Fix result tidak muncul dan evaluasi tidak jalan.
// @match        http*://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    setTimeout(() => {
        const START_BET = 1;
        const MAX_BET = 64;
        const fib = [1, 2, 4, 8, 16, 32, 64];
        let fibIndexDozen = 0;
        let fibIndexColumn = 0;
        let lastTargetDozen = [];
        let lastTargetColumn = [];
        let isBetting = false;
        let lastLoggedSaldo = null;
        let lastResultText = "";

        const redNumbers = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
        const DOZEN_CLASS = { 1: 'dozen1st', 2: 'dozen2nd', 3: 'dozen3rd' };
        const COLUMN_ID = { 1: 'COLUMN1', 2: 'COLUMN2', 3: 'COLUMN3' };

        const state = {
            saldo: 0,
            lastPeriode: null,
            bets: {
                size: { option: null, amount: START_BET, streakLose: 0 },
                parity: { option: null, amount: START_BET, streakLose: 0 },
                color: { option: null, amount: START_BET, streakLose: 0 }
            }
        };

        const idMap = {
            size: { big: "BIG", small: "SMALL" },
            parity: { odd: "ODD", even: "EVEN" },
            color: { red: "RED", black: "BLACK" }
        };

        function log(...args) {
            console.log("[🎯 ROULETTE]", ...args);
        }

        function parseRupiah(text) {
            const raw = text.replace(/[.,]/g, '').replace(/[^\d]/g, '');
            const intVal = parseInt(raw, 10);
            return isNaN(intVal) ? null : Math.floor(intVal / 100);
        }

        function getDozen(num) {
            if (num >= 1 && num <= 12) return 1;
            if (num >= 13 && num <= 24) return 2;
            if (num >= 25 && num <= 36) return 3;
            return 0;
        }

        function getColumn(num) {
            if (num < 1 || num > 36) return 0;
            return ((num - 1) % 3) + 1;
        }

        function getTwoColdest(history, type = "dozen") {
            const count = [0, 0, 0];
            const mapper = type === "dozen" ? getDozen : getColumn;
            history.slice(0, 20).forEach(num => {
                const val = mapper(num);
                if (val > 0) count[val - 1]++;
            });
            const sorted = count.map((v, i) => ({ idx: i + 1, v })).sort((a, b) => a.v - b.v);
            return [sorted[0].idx, sorted[1].idx];
        }

        function clickMultiple(el, times, cb) {
            let i = 0;
            function loop() {
                if (i < times) {
                    el.click();
                    i++;
                    setTimeout(loop, 80);
                } else {
                    if (cb) setTimeout(cb, 200);
                }
            }
            loop();
        }

        function placeDozenAndColumn(history) {
            lastTargetDozen = getTwoColdest(history, "dozen");
            lastTargetColumn = getTwoColdest(history, "column");
            log("🎯 BET Dozen:", lastTargetDozen);
            log("🎯 BET Column:", lastTargetColumn);

            const amountDozen = fib[fibIndexDozen];
            const amountColumn = fib[fibIndexColumn];
            const dozenBtns = lastTargetDozen.map(d => document.querySelector(`.${DOZEN_CLASS[d]}`));
            const columnBtns = lastTargetColumn.map(c => document.querySelector(`#${COLUMN_ID[c]}`));

            if (dozenBtns.includes(null) || columnBtns.includes(null)) return;

            let doneCount = 0;
            const tryConfirmIfDone = () => {
                doneCount++;
                if (doneCount >= 4) {
                    const btn = document.getElementById("btnBetConfirm") || document.querySelector(".btnConfirm");
                    if (btn) {
                        btn.click();
                        log("✅ Konfirmasi klik selesai (Dozen + Column)");
                    }
                }
            };

            dozenBtns.forEach(btn => clickMultiple(btn, amountDozen, tryConfirmIfDone));
            columnBtns.forEach(btn => clickMultiple(btn, amountColumn, tryConfirmIfDone));
        }

        function placeBet(category) {
            const bet = state.bets[category];
            const optionId = idMap[category][bet.option];
            const tombol = document.getElementById(optionId);
            if (!optionId || !tombol) return;
            for (let i = 0; i < bet.amount; i++) {
                setTimeout(() => tombol.click(), i * 30);
            }
            log(`🎲 ${category.toUpperCase()} => ${bet.option} x${bet.amount}`);
        }

        function analyzeNextBets() {
            const rand = arr => arr[Math.floor(Math.random() * arr.length)];
            state.bets.size.option = rand(['big', 'small']);
            state.bets.parity.option = rand(['odd', 'even']);
            state.bets.color.option = rand(['red', 'black']);
        }

        function evaluateAll(winNum) {
            ['size', 'parity', 'color'].forEach(cat => {
                const bet = state.bets[cat];
                let menang = false;
                if (cat === 'size') menang = winNum !== 0 && ((bet.option === 'big' && winNum >= 19) || (bet.option === 'small' && winNum <= 18));
                if (cat === 'parity') menang = winNum !== 0 && ((bet.option === 'odd' && winNum % 2 === 1) || (bet.option === 'even' && winNum % 2 === 0));
                if (cat === 'color') menang = winNum !== 0 && ((bet.option === 'red' && redNumbers.includes(winNum)) || (bet.option === 'black' && !redNumbers.includes(winNum)));
                log(`📊 ${cat} => ${bet.option} | Hasil: ${winNum} => ${menang ? '✅' : '❌'}`);
                if (menang) {
                    bet.amount = START_BET;
                    bet.streakLose = 0;
                } else {
                    bet.streakLose++;
                    bet.amount = Math.min(Math.pow(2, bet.streakLose), MAX_BET);
                }
            });

            const d = getDozen(winNum);
            const c = getColumn(winNum);
            if (lastTargetDozen.includes(d)) fibIndexDozen = 0; else fibIndexDozen++;
            if (lastTargetColumn.includes(c)) fibIndexColumn = 0; else fibIndexColumn++;
        }

        function getHistory() {
            const el = document.querySelector("#resultHistory");
            if (!el || el.children.length === 0) return [];
            return Array.from(el.children).map(c => parseInt(c.textContent.trim())).filter(n => !isNaN(n));
        }

        function createPopup() {
             if(!document.querySelector('[id="countdownDL"]')) return;
            const box = document.createElement("div");
            box.id = "popupMonitor";
            box.style.cssText = `
                position: fixed;
                bottom: 10px;
                left: 10px;
                background: rgba(0,0,0,0.8);
                color: #0f0;
                font-family: monospace;
                padding: 10px;
                font-size: 12px;
                border-radius: 6px;
                z-index: 999999;
                line-height: 1.4;
            `;
            box.innerHTML = "⌛ Loading...";
            document.body.appendChild(box);
        }

        function updatePopup() {
            const box = document.getElementById("popupMonitor");
            if (!box) return;
            box.innerHTML = `
💰 Saldo: ${state.saldo ? state.saldo.toLocaleString("id-ID") : '❓'}
📉 Size: ${state.bets.size.streakLose}x
📉 Parity: ${state.bets.parity.streakLose}x
📉 Color: ${state.bets.color.streakLose}x
🎯 Dozen: ${lastTargetDozen.join(', ')} (${fib[fibIndexDozen]})
🎯 Column: ${lastTargetColumn.join(', ')} (${fib[fibIndexColumn]})
`;
        }

        function updateSaldoRealtime() {
            setInterval(() => {
                for (const host of document.querySelectorAll('*')) {
                    const shadow = host.shadowRoot;
                    if (shadow) {
                        const el = shadow.querySelector('.menu-info__balance__title.menu-info__balance__title--mr-16');
                        if (el && el.textContent.trim()) {
                            const saldoBaru = parseRupiah(el.textContent.trim());
                            if (!isNaN(saldoBaru) && saldoBaru !== lastLoggedSaldo) {
                                lastLoggedSaldo = saldoBaru;
                                state.saldo = saldoBaru;
                                updatePopup();
                            }
                        }
                    }
                }
            }, 1000);
        }

        function loopMain() {
            const cd = document.getElementById("countdown");
            if (!cd) return setTimeout(loopMain, 1000);
            const countdownText = cd.querySelector("p")?.textContent.trim() || "";

            const resultNow = getHistory()[0];
            if (resultNow !== lastResultText) {
                lastResultText = resultNow;
                if (resultNow && resultNow !== state.lastPeriode) {
                    log('🎯 New Result:', resultNow);
                    state.lastPeriode = resultNow;
                    evaluateAll(resultNow);
                    analyzeNextBets();
                    updatePopup();
                    isBetting = false;
                }
            }

            if (!isBetting && countdownText !== 'Spinning') {
                isBetting = true;
                analyzeNextBets();
                ['size', 'parity', 'color'].forEach(placeBet);
                placeDozenAndColumn(getHistory());
                updatePopup();
            }

            setTimeout(loopMain, 500);
        }

        createPopup();
        updateSaldoRealtime();
        loopMain();
    }, 3000);
})();
