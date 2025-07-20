// ==UserScript==
// @name         Auto Bet Final v8.91.12 (Parity,SIze,Color Speed)
// @namespace    http://tampermonkey.net/
// @version      3.5
// @description  Auto Bet dengan martingale per kategori, zigzag dozen & column, saldo akurat, follow result. Tidak pakai confirm tombol. DOM pakai index-id. Result sama & 0 tetap betting.
// @match        http*://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    setTimeout(() => {
        let highestSaldo = 0;
        const START_BET = 1;
        const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
        const DOZEN_ID = { 1: 'index-800', 2: 'index-801', 3: 'index-802' };
        const COLUMN_ID = { 1: 'index-702', 2: 'index-701', 3: 'index-700' };
        const MAX_BET = 2048;
        const fib = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];

        let zigzagCount = 0;
        let zigzagColumnCount = 0;
        let lastDozens = [];
        let lastColumns = [];
        let lastResult = null;
        let targetDozen = null;
        let targetColumn = null;
        let lastTargetColumn = [];
        let fibIndexDozen = 0;
        let fibIndexColumn = 0;
        let isBetting = false;
        let isEvaluated = false;
        let lastLoggedSaldo = null;

        const state = {
            saldo: 0,
            bets: {
                size: { option: null, amount: START_BET, streakLose: 0 },
                parity: { option: null, amount: START_BET, streakLose: 0 },
                color: { option: null, amount: START_BET, streakLose: 0 }
            }
        };

        const idMap = {
            size: { small: 'index-900', big: 'index-905' },
            parity: { odd: 'index-904', even: 'index-901' },
            color: { red: 'index-903', black: 'index-902' }
        };

        function parseRupiah(text) {
            let cleaned = text.replace(/Rp|\s/g, '').replace(/\.\d+$/, '').replace(/,/g, '');
            return parseInt(cleaned, 10) || 0;
        }

        function getDozen(num) {
            if (num >= 1 && num <= 12) return 1;
            if (num >= 13 && num <= 24) return 2;
            if (num >= 25 && num <= 36) return 3;
            return 0;
        }
        function resetAllMartingale() {
            // Reset Size, Parity, and Color
            ['size', 'parity', 'color'].forEach(cat => {
                state.bets[cat].amount = START_BET;
                state.bets[cat].streakLose = 0;
            });

            // Reset Dozen
            targetDozen = null;
            fibIndexDozen = 0;
            zigzagCount = 0;

            // Jika masih pakai Column
            fibIndexColumn = 0;
            lastTargetColumn = [];
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
                        el.dispatchEvent(new Event('click', { bubbles: true }));
                        i++;
                        requestAnimationFrame(loop);
                    } else {
                        setTimeout(resolve, 3);
                    }
                }
                loop();
            });
        }

        async function placeBet(category) {
            const bet = state.bets[category];
            const optionId = idMap[category][bet.option];
            const tombol = document.querySelector(`[id="${optionId}"]`);
            if (tombol && bet.amount > 0) {
                await clickMultiple(tombol, bet.amount);
            }
        }

        async function placeDozen() {
            if (!targetDozen) return;
            const btn = document.querySelector(`[id="${DOZEN_ID[targetDozen]}"]`);
            if (btn) await clickMultiple(btn, fib[fibIndexDozen]);
        }
        function autoClosePopup() {
            setInterval(() => {
                const closeBtn = document.querySelector('[data-e2e="btn-label-Close"]');
                const btnrecon = document.querySelector('[data-e2e="btn-label-Reconnect"]');
                if (closeBtn) {
                    closeBtn.dispatchEvent(new Event('click', { bubbles: true }));
                }
                if (btnrecon) {
                    btnrecon.dispatchEvent(new Event('click', { bubbles: true }));
                }
            }, 1000); // Cek tiap 1 detik
        }
        async function placeColumnZigzag() {
            if (!targetColumn) return;
            const btn = document.querySelector(`[id="${COLUMN_ID[targetColumn]}"]`);
            if (btn) await clickMultiple(btn, fib[fibIndexColumn]);
        }

        function analyzeFollowResult(result) {
            state.bets.size.option = result >= 19 ? 'big' : 'small';
            state.bets.parity.option = result % 2 === 0 ? 'even' : 'odd';
            state.bets.color.option = redNumbers.includes(result) ? 'red' : 'black';
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
            if (targetDozen !== null) {
                if (d === targetDozen) {
                    targetDozen = null;
                    fibIndexDozen = 0;
                    zigzagCount = 0;
                } else if (d > 0) {
                    fibIndexDozen = Math.min(fibIndexDozen + 1, fib.length - 1);
                    targetDozen = d;
                }
            }

            lastDozens.unshift(d);
            if (lastDozens.length > 6) lastDozens.pop();
            if (lastDozens.length >= 2 && lastDozens[0] !== lastDozens[1]) {
                zigzagCount++;
            } else {
                zigzagCount = 0;
            }
            if (zigzagCount >= 20 && !targetDozen && d > 0) {
                targetDozen = d;
            }

            const c = getColumn(winNum);
            if (targetColumn !== null) {
                if (c === targetColumn) {
                    targetColumn = null;
                    fibIndexColumn = 0;
                    zigzagColumnCount = 0;
                } else if (c > 0) {
                    fibIndexColumn = Math.min(fibIndexColumn + 1, fib.length - 1);
                    targetColumn = c;
                }
            }

            lastColumns.unshift(c);
            if (lastColumns.length > 10) lastColumns.pop();
            if (lastColumns.length >= 2 && lastColumns[0] !== lastColumns[1]) {
                zigzagColumnCount++;
            } else {
                zigzagColumnCount = 0;
            }
            if (zigzagColumnCount >= 3 && !targetColumn && c > 0) {
                targetColumn = c;
            }
        }

        async function loopMain() {
            autoClosePopup()
            const el = document.getElementsByClassName("seconds")[0];
            const open = !!el;

            const history = document.getElementsByClassName("ervzci33")[0]?.children;
            if (!history?.length) return setTimeout(loopMain, 1000);

            if (open) {
                const resultSpan = history[0];
                const result = parseInt(resultSpan.textContent.trim());

                if (!isNaN(result) && result !== lastResult) {
                    lastResult = result;
                    isEvaluated = false;
                    isBetting = false;
                }

                if (!isEvaluated && !isNaN(result)) {
                    evaluateBets(result);
                    analyzeFollowResult(result);
                    isEvaluated = true;
                    updatePopup(result);
                }

                if (!isBetting && !isNaN(result)) {
                    isBetting = true;
                    for (const cat of ['size', 'parity', 'color']) {
                        await placeBet(cat);
                    }
                    await placeDozen();
                    await placeColumnZigzag();
                    updatePopup(result);
                }
            } else {
                isBetting = false;
                isEvaluated = false;
            }
            setTimeout(loopMain, 1000);
        }

        function updateSaldoRealtime() {
            setInterval(() => {
                const el = document.querySelector("[data-e2e='balance-value']");
                if (el && el.textContent.trim()) {
                    const saldoBaru = parseRupiah(el.textContent.trim());
                    if (!isNaN(saldoBaru) && saldoBaru !== lastLoggedSaldo) {
                        lastLoggedSaldo = saldoBaru;
                        state.saldo = saldoBaru;
                        if (saldoBaru > highestSaldo) {
                            highestSaldo = saldoBaru;
                        }
                        updatePopup(lastResult ?? "-");
                    }
                }
            }, 1000);
        }

        function createPopup() {
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

        function updatePopup(result = "-") {
            const box = document.getElementById("popupMonitor");
            if (!box) return;
            box.innerHTML = `
💰 Saldo: ${state.saldo.toLocaleString("id-ID")}
🧱 Saldo Tertinggi: ${highestSaldo.toLocaleString("id-ID")}
🎲 Result: ${result ?? "-"}
📉 Size: ${state.bets.size.streakLose}x
📉 Parity: ${state.bets.parity.streakLose}x
📉 Color: ${state.bets.color.streakLose}x
🎯 Zigzag: ${zigzagCount}x
🎯 Dozen: ${targetDozen ?? '-'} (${fib[fibIndexDozen] ?? '-'})
🎯 Column: ${lastTargetColumn.join(',') || '-'} (${fib[fibIndexColumn] ?? '-'})
`;
        }

        createPopup();
        updateSaldoRealtime();
        loopMain();
    }, 3000);
})();
