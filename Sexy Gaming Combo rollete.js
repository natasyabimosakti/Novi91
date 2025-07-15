// ==UserScript==
// @name         Roulette Auto Bet v7.4 - Protektor, Confirm, Monitor
// @namespace    http://tampermonkey.net/
// @version      7.4
// @description  Auto-bet roulette lengkap dengan protektor, martingale, confirm klik, dan popup saldo
// @match        http*://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    setTimeout(() => {
        const START_BET = 1;
        const MAX_BET = 64;
        const SALDO_PROTEK = 1500000;
        const SALDO_RESET = 1000000;
        const redNumbers = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];

        const fib = [1, 2, 4, 8, 16, 32, 64];
        let fibIndexDozen = 0;
        let fibIndexColumn = 0;
        let lastResult = null;
        let lastLoggedSaldo = null;
        let protektorAktif = false;
        let isBetting = false;
        let historyStack = [];
        let lastTargetDozen = [];
        let lastTargetColumn = [];

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
            return Math.floor(parseInt(raw || '0') / 100);
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

        function getHistory() {
            const el = document.querySelector("#resultHistory");
            if (!el || el.children.length === 0) return [];
            return Array.from(el.children).map(c => parseInt(c.textContent.trim())).filter(n => !isNaN(n));
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

        function placeDozenAndColumnIfNeeded(cb) {
            const hist = getHistory();
            if (hist.length < 10) return cb && cb();

            const last10 = hist.slice(0, 10);
            const countDozen = [0, 0, 0];
            const countColumn = [0, 0, 0];
            last10.forEach(num => {
                const d = getDozen(num);
                const c = getColumn(num);
                if (d) countDozen[d - 1]++;
                if (c) countColumn[c - 1]++;
            });

            const targetDozen = countDozen.findIndex(c => c === 0) + 1;
            const targetColumn = countColumn.findIndex(c => c === 0) + 1;

            const btnDozen = document.querySelector(`.${DOZEN_CLASS[targetDozen]}`);
            const btnColumn = document.querySelector(`#${COLUMN_ID[targetColumn]}`);
            let clickCount = 0;

            if (targetDozen && btnDozen) {
                lastTargetDozen = [targetDozen];
                for (let i = 0; i < fib[fibIndexDozen]; i++) {
                    setTimeout(() => btnDozen.click(), i * 60);
                }
                clickCount++;
            }

            if (targetColumn && btnColumn) {
                lastTargetColumn = [targetColumn];
                for (let i = 0; i < fib[fibIndexColumn]; i++) {
                    setTimeout(() => btnColumn.click(), i * 60);
                }
                clickCount++;
            }

            setTimeout(() => {
                const btn = document.getElementById("btnBetConfirm") || document.querySelector(".btnConfirm");
                if (btn) {
                    btn.click();
                    log("✅ Konfirmasi diklik");
                }
                cb && cb();
            }, 1000 + clickCount * 80);
        }

        function resetMartingale() {
            Object.values(state.bets).forEach(b => {
                b.amount = START_BET;
                b.streakLose = 0;
            });
            fibIndexDozen = 0;
            fibIndexColumn = 0;
            log("🔁 Martingale Reset");
        }

        function createPopup() {
             if (!document.getElementById("countdownDL"))return;
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
💰 Saldo: ${state.saldo.toLocaleString("id-ID")}
📉 Size: ${state.bets.size.streakLose}x
📉 Parity: ${state.bets.parity.streakLose}x
📉 Color: ${state.bets.color.streakLose}x
🛡 Protektor: ${protektorAktif ? '✅ Aktif' : '❌ Mati'}
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
                                log("💰 Saldo:", saldoBaru.toLocaleString("id-ID", { minimumFractionDigits: 2 }));
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

            if (!protektorAktif && state.saldo >= SALDO_PROTEK) {
                protektorAktif = true;
                log("🛡 Protektor AKTIF");
            } else if (protektorAktif && state.saldo < SALDO_RESET) {
                protektorAktif = false;
                resetMartingale();
                log("🛡 Protektor NON-AKTIF & Reset Martingale");
            }

            const resultNow = getHistory()[0];
            if (resultNow && resultNow !== lastResult) {
                lastResult = resultNow;
                evaluateAll(resultNow);
                analyzeNextBets();
                updatePopup();
                isBetting = false;
            }

            if (!isBetting && countdownText !== 'Spinning') {
                isBetting = true;
                analyzeNextBets();
                ['size', 'parity', 'color'].forEach(placeBet);
                placeDozenAndColumnIfNeeded(() => {
                    // Fallback confirm jika tidak ada dozen/column
                    setTimeout(() => {
                        const btn = document.getElementById("btnBetConfirm") || document.querySelector(".btnConfirm");
                        if (btn) btn.click();
                    }, 500);
                });
            }

            setTimeout(loopMain, 1000);
        }

        createPopup();
        updateSaldoRealtime();
        loopMain();
    }, 3000);
})();
