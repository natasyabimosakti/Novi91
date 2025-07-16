// ==UserScript==
// @name         Auto Bet Roulette v8.2.3 - Stable Zigzag + Column + Protektor Martingale
// @namespace    http://tampermonkey.net/
// @version      8.2.3
// @description  ✅ Martingale semua kategori (size, parity, color, dozen, column) ✅ Reset jika menang ✅ Dozen mengikuti result terbaru saat zigzag ≥ 5 ✅ Column hanya bet jika tidak muncul 8x terakhir ✅ Protektor aktif jika saldo ≥ 1.5jt dan reset jika turun < 1jt ✅ Tetap bet jika result sama atau 0 ✅ Cegah klik berulang/error + confirm bet setelah semua selesai
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
        const redNumbers = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
        const DOZEN_CLASS = { 1: 'dozen1st', 2: 'dozen2nd', 3: 'dozen3rd' };
        const COLUMN_ID = { 1: 'COLUMN1', 2: 'COLUMN2', 3: 'COLUMN3' };

        let fibIndexDozen = 0;
        let fibIndexColumn = 0;
        let isBetting = false;
        let isPlacing = false;
        let lastResult = null;
        let lastSaldo = null;
        let protektor = false;
        let zigzagCount = 0;
        let targetDozen = null;
        let columnTarget = null;

        const state = {
            saldo: 0,
            bets: {
                size: { option: null, amount: START_BET, streak: 0 },
                parity: { option: null, amount: START_BET, streak: 0 },
                color: { option: null, amount: START_BET, streak: 0 }
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

        function updateSaldoRealtime() {
            setInterval(() => {
                for (const host of document.querySelectorAll('*')) {
                    const shadow = host.shadowRoot;
                    if (shadow) {
                        const el = shadow.querySelector('.menu-info__balance__title.menu-info__balance__title--mr-16');
                        if (el && el.textContent.trim()) {
                            const saldoBaru = parseRupiah(el.textContent.trim());
                            if (!isNaN(saldoBaru) && saldoBaru !== lastSaldo) {
                                lastSaldo = saldoBaru;
                                state.saldo = saldoBaru;
                                updatePopup();
                                if (!protektor && saldoBaru >= SALDO_PROTEK) {
                                    protektor = true;
                                    log("🛡 Protektor Aktif");
                                } else if (protektor && saldoBaru < SALDO_RESET) {
                                    protektor = false;
                                    resetMartingale();
                                    log("🛡 Protektor Nonaktif, Reset Martingale");
                                }
                            }
                        }
                    }
                }
            }, 1000);
        }

        function getHistory() {
            const el = document.querySelector("#resultHistory");
            if (!el || el.children.length === 0) return [];
            return Array.from(el.children).map(c => parseInt(c.textContent.trim())).filter(n => !isNaN(n));
        }

        function analyzeZigzag(history) {
            const dozHist = history.map(getDozen).filter(d => d > 0);
            zigzagCount = 0;
            for (let i = 1; i < dozHist.length; i++) {
                if (dozHist[i] !== dozHist[i - 1]) {
                    zigzagCount++;
                    if (zigzagCount >= 5) {
                        targetDozen = getDozen(history[0]);
                        return;
                    }
                } else {
                    break;
                }
            }
            targetDozen = null;
        }

        function analyzeColumn(history) {
            const recent = history.map(getColumn).filter(c => c > 0).slice(0, 8);
            columnTarget = null;
            [1, 2, 3].forEach(col => {
                const count = recent.filter(c => c === col).length;
                if (count === 0) columnTarget = col;
            });
        }

        function placeClick(el, times, cb) {
            if (!el || el.disabled) {
                log("⚠️ Element tidak ditemukan atau nonaktif");
                cb?.();
                return;
            }
            let i = 0;
            function clicker() {
                if (i < times) {
                    el.click();
                    i++;
                    setTimeout(clicker, 60);
                } else {
                    cb?.();
                }
            }
            clicker();
        }

        function placeFixedBets(cb) {
            let done = 0;
            const next = () => { done++; if (done === 3) cb?.(); };
            ['size', 'parity', 'color'].forEach(cat => {
                const bet = state.bets[cat];
                const id = idMap[cat][bet.option];
                const el = document.getElementById(id);
                if (el && !el.disabled) {
                    for (let i = 0; i < bet.amount; i++) {
                        setTimeout(() => {
                            if (el && !el.disabled) el.click();
                            if (i === bet.amount - 1) next();
                        }, i * 40);
                    }
                } else {
                    log(`⚠️ ${id} tidak ditemukan atau nonaktif`);
                    next();
                }
            });
        }

        function placeDozenAndColumn(cb) {
            let done = 0;
            const checkConfirm = () => { done++; if (done >= 2) cb?.(); };

            if (targetDozen) {
                const el = document.querySelector(`.${DOZEN_CLASS[targetDozen]}`);
                placeClick(el, fib[fibIndexDozen], checkConfirm);
            } else checkConfirm();

            if (columnTarget) {
                const el = document.querySelector(`#${COLUMN_ID[columnTarget]}`);
                placeClick(el, fib[fibIndexColumn], checkConfirm);
            } else checkConfirm();
        }

        function confirmBet() {
            const btn = document.getElementById("btnBetConfirm") || document.querySelector(".btnConfirm");
            if (btn && !btn.disabled) {
                btn.click();
                log("✅ Konfirmasi diklik");
            } else {
                log("⚠️ Tombol konfirmasi tidak ditemukan / nonaktif");
            }
        }

        function evaluate(winNum) {
            ['size', 'parity', 'color'].forEach(cat => {
                const bet = state.bets[cat];
                const won =
                      (cat === 'size' && ((bet.option === 'big' && winNum >= 19) || (bet.option === 'small' && winNum <= 18))) ||
                      (cat === 'parity' && ((bet.option === 'odd' && winNum % 2 === 1) || (bet.option === 'even' && winNum % 2 === 0))) ||
                      (cat === 'color' && ((bet.option === 'red' && redNumbers.includes(winNum)) || (bet.option === 'black' && !redNumbers.includes(winNum))));
                if (won) {
                    bet.amount = START_BET;
                    bet.streak = 0;
                } else {
                    bet.streak++;
                    bet.amount = Math.min(Math.pow(2, bet.streak), MAX_BET);
                }
            });

            const doz = getDozen(winNum);
            if (targetDozen) {
                if (doz === targetDozen) {
                    fibIndexDozen = 0;
                    targetDozen = null;
                    zigzagCount = 0;
                } else {
                    fibIndexDozen++;
                    if (zigzagCount >= 5) targetDozen = doz;
                }
            }

            const col = getColumn(winNum);
            if (columnTarget && col === columnTarget) {
                fibIndexColumn = 0;
                columnTarget = null;
            } else if (columnTarget) {
                fibIndexColumn++;
            }
        }

        function analyzeNext() {
            const rand = a => a[Math.floor(Math.random() * a.length)];
            state.bets.size.option = rand(['big', 'small']);
            state.bets.parity.option = rand(['odd', 'even']);
            state.bets.color.option = rand(['red', 'black']);
        }

        function resetMartingale() {
            fibIndexDozen = 0;
            fibIndexColumn = 0;
            Object.values(state.bets).forEach(bet => {
                bet.amount = START_BET;
                bet.streak = 0;
            });
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
            `;
            box.innerHTML = "⌛ Loading...";
            document.body.appendChild(box);
        }

        function updatePopup() {
            const box = document.getElementById("popupMonitor");
            if (!box) return;
            box.innerHTML = `
💰 Saldo: ${state.saldo.toLocaleString("id-ID")}
🎯 Zigzag: ${zigzagCount}x
📉 Size: ${state.bets.size.streak}
📉 Parity: ${state.bets.parity.streak}
📉 Color: ${state.bets.color.streak}
🛡 Protektor: ${protektor ? '✅' : '❌'}
`;
        }

        function mainLoop() {
            const countdown = document.querySelector("#countdown p")?.textContent.trim();
            const history = getHistory();
            const latest = history[0];

            if (typeof latest === 'number') {
                if (latest !== lastResult || latest === 0) {
                    lastResult = latest;
                    evaluate(latest);
                    analyzeNext();
                    analyzeZigzag(history);
                    analyzeColumn(history);
                    isBetting = false;
                    isPlacing = false;
                    updatePopup();
                    log("🎯 Result:", latest);
                }
            }

            if (!isBetting && !isPlacing && countdown && countdown !== "Spinning") {
                isBetting = true;
                isPlacing = true;
                placeFixedBets(() => {
                    placeDozenAndColumn(() => {
                        setTimeout(() => {
                            confirmBet();
                            isPlacing = false;
                        }, 300);
                    });
                });
            }

            setTimeout(mainLoop, 500);
        }

        createPopup();
        updateSaldoRealtime();
        mainLoop();
    }, 3000);
})();
