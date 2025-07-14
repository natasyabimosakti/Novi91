// ==UserScript==
// @name         Roulette Auto Bet v6.2 - FIX Dozen & Column Evaluation
// @namespace    http://tampermonkey.net/
// @version      6.4
// @description  Auto-bet roulette dengan Martingale, protektor saldo, popup, dan perbaikan evaluasi dozen/column
// @match        http*://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    setTimeout(() => {
        const START_BET = 1;
        const MAX_BET = 64;
        const SALDO_RESET = 1_000_000;
        const SALDO_PROTEK = 1_500_000;

        const fib = [1, 2, 4, 8, 16, 32, 64];
        let fibIndexDozen = 0;
        let fibIndexColumn = 0;
        let lastTargetDozen = [];
        let lastTargetColumn = [];
        let isBetting = false;
        let protektorAktif = false;
        let lastLoggedSaldo = null;

        const redNumbers = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
        const DOZEN_CLASS = { 1: 'dozen1st', 2: 'dozen2nd', 3: 'dozen3rd' };
        const COLUMN_ID = { 1: 'COLUMN1', 2: 'COLUMN2', 3: 'COLUMN3' };

        const state = {
            saldo: 0,
            protektorPernahAktif: false,
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
            if (!text) return null;
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
                        log("✅ Konfirmasi selesai (dozen/column)");
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
            if (tombol) {
                for (let i = 0; i < bet.amount; i++) {
                    setTimeout(() => tombol.click(), i * 30);
                }
                log(`🎲 ${category.toUpperCase()} => ${bet.option} x${bet.amount}`);
            }
        }

        function analyzeNextBets() {
            const rand = arr => arr[Math.floor(Math.random() * arr.length)];
            state.bets.size.option = rand(['big', 'small']);
            state.bets.parity.option = rand(['odd', 'even']);
            state.bets.color.option = rand(['red', 'black']);
        }

        function evaluateBet(category, winNum) {
            const bet = state.bets[category];
            let menang = false;
            if (winNum === 0) {
                menang = false;
            } else if (category === 'size') {
                menang = (bet.option === 'big' && winNum >= 19) || (bet.option === 'small' && winNum <= 18);
            } else if (category === 'parity') {
                menang = (bet.option === 'odd' && winNum % 2 === 1) || (bet.option === 'even' && winNum % 2 === 0);
            } else if (category === 'color') {
                const isRed = redNumbers.includes(winNum);
                menang = (bet.option === 'red' && isRed) || (bet.option === 'black' && !isRed);
            }

            if (menang) {
                bet.amount = START_BET;
                bet.streakLose = 0;
            } else {
                bet.streakLose++;
                bet.amount = Math.min(Math.pow(2, bet.streakLose), MAX_BET);
            }
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
            box.innerHTML = "⌛ Memuat...";
            document.body.appendChild(box);
        }

        function updatePopup() {
            const box = document.getElementById("popupMonitor");
            if (!box) return;
            box.innerHTML = `
💰 Saldo: ${state.saldo >= 10000 ? state.saldo.toLocaleString("id-ID", {minimumFractionDigits: 2}) : '❓ Tidak terbaca'}
📈 Size: ${state.bets.size.streakLose}x
📈 Parity: ${state.bets.parity.streakLose}x
📈 Color: ${state.bets.color.streakLose}x
🛡 Protektor: ${state.protektorPernahAktif ? (protektorAktif ? "✅ Aktif" : "🕓 Sudah") : "❌ Belum"}
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
                                log("💰 Saldo:", saldoBaru);
                            }
                        }
                    }
                }
            }, 1000);
        }

        function loopMain() {
            const cd = document.getElementById("countdown");
            const isClosed = cd && cd.textContent.includes("Spinning");
            const result = getHistory()[0];

            if (!isClosed && !isBetting) {
                isBetting = true;
                if (!state.bets.size.option) analyzeNextBets();
                ['size', 'parity', 'color'].forEach(placeBet);
                placeDozenAndColumn(getHistory());
            }

            if (isClosed && isBetting) {
                setTimeout(() => {
                    const win = result;
                    if (win !== null && win !== state.lastPeriode) {
                        state.lastPeriode = win;
                        ['size', 'parity', 'color'].forEach(cat => evaluateBet(cat, win));

                        // ✅ Perbaikan evaluasi dozen & column
                        const winDozen = getDozen(win);
                        const winColumn = getColumn(win);

                        if (lastTargetDozen.includes(winDozen)) {
                            fibIndexDozen = 0;
                            log(`🎯 Dozen ${winDozen} MENANG`);
                        } else {
                            fibIndexDozen = Math.min(fibIndexDozen + 1, fib.length - 1);
                            log(`❌ Dozen ${winDozen} KALAH - ke ${fibIndexDozen}`);
                        }

                        if (lastTargetColumn.includes(winColumn)) {
                            fibIndexColumn = 0;
                            log(`🎯 Column ${winColumn} MENANG`);
                        } else {
                            fibIndexColumn = Math.min(fibIndexColumn + 1, fib.length - 1);
                            log(`❌ Column ${winColumn} KALAH - ke ${fibIndexColumn}`);
                        }

                        isBetting = false;
                        updatePopup();
                    }
                }, 1000);
            }
            setTimeout(loopMain, 1000);
        }

        createPopup();
        updateSaldoRealtime();
        log("🤖 AutoBet v6.2 AKTIF dengan evaluasi dozen/column FIX");
        loopMain();
    }, 3000);
})();
