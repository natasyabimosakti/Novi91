// ==UserScript==
// @name         Roulette Auto Bet v6.9 - Protektor + Smart Target + Confirm Fix
// @namespace    http://tampermonkey.net/
// @version      6.9
// @description  Protektor aktif saat saldo ≥ 1.500.000, reset saat < 1.000.000. Betting hanya pada dozen/column yang belum muncul 7x berturut, confirm otomatis.
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

        const fib = [1, 2, 4, 8, 16, 32, 64];
        let fibIndexDozen = 0;
        let fibIndexColumn = 0;
        let lastTargetDozen = [];
        let lastTargetColumn = [];
        let isBetting = false;
        let lastLoggedSaldo = null;
        let lastResultText = "";
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
            const intVal = parseInt(raw, 9);
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

        function clickMultiple(el, times) {
            for (let i = 0; i < times; i++) {
                setTimeout(() => el.click(), i * 80);
            }
        }

        function placeDozenAndColumn() {
            const history = getHistory().slice(0, 9); // 7 hasil terakhir
            const appearedDozens = new Set(history.map(getDozen).filter(d => d > 0));
            const appearedColumns = new Set(history.map(getColumn).filter(c => c > 0));

            const missingDozens = [1, 2, 3].filter(d => !appearedDozens.has(d));
            const missingColumns = [1, 2, 3].filter(c => !appearedColumns.has(c));

            if (missingDozens.length === 0 && missingColumns.length === 0) {
                log("⏸ Semua dozen dan column pernah muncul dalam 7 ronde terakhir. Skip bet.");
                lastTargetDozen = [];
                lastTargetColumn = [];
                return;
            }

            // Acak salah satu target dari dozen atau column saja
            if (missingDozens.length > 0 && (missingColumns.length === 0 || Math.random() < 0.5)) {
                const chosen = missingDozens[Math.floor(Math.random() * missingDozens.length)];
                lastTargetDozen = [chosen];
                const btn = document.querySelector(`.${DOZEN_CLASS[chosen]}`);
                if (btn) clickMultiple(btn, fib[fibIndexDozen]);
            } else if (missingColumns.length > 0) {
                const chosen = missingColumns[Math.floor(Math.random() * missingColumns.length)];
                lastTargetColumn = [chosen];
                const btn = document.querySelector(`#${COLUMN_ID[chosen]}`);
                if (btn) clickMultiple(btn, fib[fibIndexColumn]);
            }

            setTimeout(() => {
                const btn = document.getElementById("btnBetConfirm") || document.querySelector(".btnConfirm");
                if (btn) {
                    btn.click();
                    log("✅ Konfirmasi ditekan (otomatis timeout)");
                }
            }, 1500);
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

        function resetMartingale() {
            Object.values(state.bets).forEach(bet => {
                bet.amount = START_BET;
                bet.streakLose = 0;
            });
            fibIndexDozen = 0;
            fibIndexColumn = 0;
            log("🔁 Martingale reset!");
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
💰 Saldo: ${state.saldo.toLocaleString("id-ID")}
📉 Size: ${state.bets.size.streakLose}x
📉 Parity: ${state.bets.parity.streakLose}x
📉 Color: ${state.bets.color.streakLose}x
🎯 Dozen: ${lastTargetDozen.join(', ')} (${fib[fibIndexDozen]})
🎯 Column: ${lastTargetColumn.join(', ')} (${fib[fibIndexColumn]})
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
                log("🛡 Protektor AKTIF ‼️ Saldo mencapai:", state.saldo);
            } else if (protektorAktif && state.saldo < SALDO_RESET) {
                protektorAktif = false;
                resetMartingale();
                log("🛡 Protektor NON-AKTIF ‼️ Saldo turun di bawah:", state.saldo);
            }

            if (protektorAktif) return setTimeout(loopMain, 1000);

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
                placeDozenAndColumn();
                updatePopup();
            }

            setTimeout(loopMain, 500);
        }

        createPopup();
        updateSaldoRealtime();
        loopMain();
    }, 3000);
})();
