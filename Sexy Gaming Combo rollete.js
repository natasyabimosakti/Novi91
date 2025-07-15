// ==UserScript==
// @name         Roulette Auto Bet v7 Final
// @namespace    http://tampermonkey.net/
// @version      7.0
// @description  Auto bet roulette lengkap + protektor + konfirmasi + logika dozen/column
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
        const NON_MUNCUL_LIMIT = 8;

        const fib = [1, 2, 4, 8, 16, 32, 64];
        let fibIndexDozen = 0;
        let fibIndexColumn = 0;
        let lastLoggedSaldo = null;
        let isBetting = false;
        let lastResult = null;
        let protektorAktif = false;

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
                if (menang) {
                    bet.amount = START_BET;
                    bet.streakLose = 0;
                } else {
                    bet.streakLose++;
                    bet.amount = Math.min(Math.pow(2, bet.streakLose), MAX_BET);
                }
                log(`📊 ${cat} => ${bet.option} | Hasil: ${winNum} => ${menang ? '✅' : '❌'}`);
            });

            const d = getDozen(winNum);
            const c = getColumn(winNum);
            if ([1,2,3].includes(d)) fibIndexDozen = 0; else fibIndexDozen++;
            if ([1,2,3].includes(c)) fibIndexColumn = 0; else fibIndexColumn++;
        }

        function clickMultiple(el, times) {
            for (let i = 0; i < times; i++) {
                setTimeout(() => el.click(), i * 80);
            }
        }

        function placeDozenAndColumnIfNeeded() {
            const history = getHistory().slice(0, NON_MUNCUL_LIMIT + 5);
            const dozenCount = [0, 0, 0];
            const columnCount = [0, 0, 0];

            history.forEach(n => {
                const d = getDozen(n);
                const c = getColumn(n);
                if (d) dozenCount[d - 1]++;
                if (c) columnCount[c - 1]++;
            });

            const targetDozen = dozenCount.findIndex(v => v === 0);
            const targetColumn = columnCount.findIndex(v => v === 0);

            if (targetDozen === -1 && targetColumn === -1) return;

            if (targetDozen !== -1) {
                const btn = document.querySelector(`.${DOZEN_CLASS[targetDozen + 1]}`);
                if (btn) clickMultiple(btn, fib[fibIndexDozen]);
            }

            if (targetColumn !== -1) {
                const btn = document.querySelector(`#${COLUMN_ID[targetColumn + 1]}`);
                if (btn) clickMultiple(btn, fib[fibIndexColumn]);
            }
        }

        function placeBet(category) {
            const bet = state.bets[category];
            const id = idMap[category][bet.option];
            const el = document.getElementById(id);
            if (el) {
                for (let i = 0; i < bet.amount; i++) {
                    setTimeout(() => el.click(), i * 50);
                }
            }
        }

        function klikConfirm() {
            setTimeout(() => {
                const btn = document.getElementById("btnBetConfirm") || document.querySelector(".btnConfirm, .bet-confirm-btn");
                if (btn) {
                    btn.click();
                    log("✅ Tombol Confirm diklik");
                } else {
                    log("❌ Tombol Confirm tidak ditemukan");
                }
            }, 1000);
        }

        function resetMartingale() {
            Object.values(state.bets).forEach(b => {
                b.amount = START_BET;
                b.streakLose = 0;
            });
            fibIndexDozen = 0;
            fibIndexColumn = 0;
            log("🔄 Reset Martingale");
        }

        function createPopup() {
            if (!document.getElementById("countdownDL"))return;
            const box = document.createElement("div");
            box.id = "popupMonitor";
            box.style.cssText = `
                position: fixed; bottom: 10px; left: 10px;
                background: rgba(0,0,0,0.8); color: #0f0;
                padding: 10px; font-size: 12px; font-family: monospace;
                border-radius: 6px; z-index: 9999; line-height: 1.4;
            `;
            box.innerHTML = "⌛ Loading...";
            document.body.appendChild(box);
        }

        function updatePopup() {
            const el = document.getElementById("popupMonitor");
            if (!el) return;
            el.innerHTML = `
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
                                log("💰 Saldo:", saldoBaru);
                            }
                        }
                    }
                }
            }, 1000);
        }

        function loopMain() {
            const cd = document.getElementById("countdown");
            const time = cd?.querySelector("p")?.textContent.trim();
            const spinning = time === "Spinning";

            if (protektorAktif && state.saldo < SALDO_RESET) {
                protektorAktif = false;
                resetMartingale();
                log("🛡 Protektor DINONAKTIFKAN");
            } else if (!protektorAktif && state.saldo >= SALDO_PROTEK) {
                protektorAktif = true;
                log("🛡 Protektor DIAKTIFKAN");
            }

            if (protektorAktif) return setTimeout(loopMain, 1000);

            const resultNow = getHistory()[0];
            if (resultNow && resultNow !== state.lastPeriode) {
                state.lastPeriode = resultNow;
                evaluateAll(resultNow);
                analyzeNextBets();
                updatePopup();
                isBetting = false;
            }

            if (!spinning && !isBetting) {
                isBetting = true;
                analyzeNextBets();
                ['size', 'parity', 'color'].forEach(placeBet);
                placeDozenAndColumnIfNeeded();
                klikConfirm();
                updatePopup();
            }

            setTimeout(loopMain, 1000);
        }

        createPopup();
        updateSaldoRealtime();
        loopMain();
    }, 3000);
})();
