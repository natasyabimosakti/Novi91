// ==UserScript==
// @name         Auto Bet Final v8.91
// @namespace    http://tampermonkey.net/
// @version      8.91
// @description  Auto Bet dengan protektor, martingale semua kategori, zigzag dozen, column delay, saldo akurat, dan confirm sinkron
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
        const DOZEN_CLASS = { 1: 'dozen1st', 2: 'dozen2nd', 3: 'dozen3rd' };
        const COLUMN_ID = { 1: 'COLUMN1', 2: 'COLUMN2', 3: 'COLUMN3' };
        const fib = [1, 2, 4, 8, 16, 32, 64];

        let zigzagCount = 0;
        let lastDozens = [];
        let lastResult = null;
        let targetDozen = null;
        let fibIndexDozen = 0;
        let fibIndexColumn = 0;
        let protektorAktif = false;
        let isBetting = false;
        let lastLoggedSaldo = null;

        let lastTargetColumn = [];
        let columnHistory = [];

        const state = {
            saldo: 0,
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

        function parseRupiah(text) {
            const cleaned = text.replace(/[^\d]/g, '');
            if (cleaned.length > 3) {
                return parseInt(cleaned.slice(0, -2), 10); // Koreksi jika ada 2 digit desimal semu
            }
            return parseInt(cleaned, 10);
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

        function clickMultiple(el, times) {
            return new Promise(resolve => {
                let i = 0;
                function loop() {
                    if (i < times) {
                        el.click();
                        i++;
                        setTimeout(loop, 80);
                    } else {
                        setTimeout(resolve, 200);
                    }
                }
                loop();
            });
        }

        async function placeBet(category) {
            const bet = state.bets[category];
            const optionId = idMap[category][bet.option];
            const tombol = document.getElementById(optionId);
            if (tombol && bet.amount > 0) {
                await clickMultiple(tombol, bet.amount);
                console.log(`[🎯] ${category.toUpperCase()} => ${bet.option} x${bet.amount}`);
            }
        }

        function evaluateBets(winNum) {
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
            });

            const d = getDozen(winNum);
            if (targetDozen) {
                if (d === targetDozen) {
                    targetDozen = null;
                    fibIndexDozen = 0;
                    zigzagCount = 0;
                } else {
                    fibIndexDozen = Math.min(fibIndexDozen + 1, fib.length - 1);
                }
            }

            lastDozens.unshift(d);
            if (lastDozens.length > 6) lastDozens.pop();
            if (lastDozens.length >= 2 && lastDozens[0] !== lastDozens[1]) {
                zigzagCount++;
            } else {
                zigzagCount = 0;
            }

            if (zigzagCount >= 6 && !targetDozen) {
                targetDozen = d;
                console.log("🎯 Zigzag Terdeteksi! Target Dozen:", d);
            }

            const c = getColumn(winNum);
            columnHistory.unshift(c);
            if (columnHistory.length > 20) columnHistory.pop();

            if (lastTargetColumn.length > 0 && lastTargetColumn.includes(c)) {
                fibIndexColumn = 0;
                lastTargetColumn = [];
            }
        }

        async function placeDozen() {
            if (!targetDozen) return;
            const btn = document.querySelector(`.${DOZEN_CLASS[targetDozen]}`);
            if (btn) await clickMultiple(btn, fib[fibIndexDozen]);
        }

        async function placeColumn() {
            const counts = [1, 2, 3].map(c => columnHistory.filter(v => v === c).length);
            const minCount = Math.min(...counts);
            if (minCount >= 8) {
                const target = counts.findIndex(c => c === minCount);
                const col = target + 1;
                lastTargetColumn = [col];
                const el = document.querySelector(`#${COLUMN_ID[col]}`);
                if (el) await clickMultiple(el, fib[fibIndexColumn]);
                fibIndexColumn = Math.min(fibIndexColumn + 1, fib.length - 1);
            }
        }

        function confirmBet() {
            const btn = document.getElementById("btnBetConfirm") || document.querySelector(".btnConfirm");
            if (btn) btn.click();
        }

        function analyzeNextBets() {
            const last = lastResult;
            state.bets.size.option = last >= 19 ? 'big' : 'small';
            state.bets.parity.option = last % 2 === 0 ? 'even' : 'odd';
            state.bets.color.option = redNumbers.includes(last) ? 'red' : 'black';
        }

        async function loopMain() {
            const el = document.querySelector("#countdown p");
            if (!el) return setTimeout(loopMain, 1000);
            const text = el.textContent.trim();

            const history = [...document.querySelectorAll("#resultHistory span")];
            if (!history.length) return setTimeout(loopMain, 1000);

            const result = parseInt(history[0].textContent.trim());
            if (result && result !== lastResult) {
                lastResult = result;
                evaluateBets(result);
                analyzeNextBets();
                updatePopup();
                isBetting = false;
            }

            if (!protektorAktif && state.saldo >= SALDO_PROTEK) protektorAktif = true;
            if (protektorAktif && state.saldo < SALDO_RESET) {
                protektorAktif = false;
                Object.values(state.bets).forEach(bet => {
                    bet.amount = START_BET;
                    bet.streakLose = 0;
                });
                fibIndexDozen = 0;
                fibIndexColumn = 0;
                targetDozen = null;
                console.log("🛡 Protektor RESET semua taruhan.");
            }

            if (!isBetting && text !== 'Spinning') {
                isBetting = true;
                for (const cat of ['size', 'parity', 'color']) {
                    await placeBet(cat);
                }
                await placeDozen();
                await placeColumn();
                confirmBet(); // ⏱️ HANYA setelah semua klik selesai
                updatePopup();
            }

            setTimeout(loopMain, 1000);
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

        function createPopup() {
            if (!document.getElementById("countdownDL")) return;
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
🎯 Zigzag: ${zigzagCount}x
🎯 Dozen: ${targetDozen ?? '-'} (${fib[fibIndexDozen] ?? '-'})
🎯 Column: ${lastTargetColumn.join(',') || '-'} (${fib[fibIndexColumn] ?? '-'})
🛡 Protektor: ${protektorAktif ? '✅ Aktif' : '❌ Mati'}
`;
        }

        createPopup();
        updateSaldoRealtime();
        loopMain();
    }, 3000);
})();
