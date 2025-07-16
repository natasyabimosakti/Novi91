// ==UserScript==
// @name         Auto Bet Final v9.3.2 - Zigzag Protektor All In One
// @namespace    http://tampermonkey.net/
// @version      9.3.2
// @description  Auto bet dengan protektor, zigzag semua kategori, column delay, martingale penuh, saldo akurat
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

        let lastResult = null;
        let isBetting = false;
        let protektorAktif = false;
        let lastLoggedSaldo = null;

        let targetDozen = null;
        let fibIndexDozen = 0;
        let lastDozens = [];
        let zigzagCountDozen = 0;

        let columnHistory = [];
        let lastTargetColumn = [];
        let fibIndexColumn = 0;
        let targetColumn = null;

        const zigzagTrack = {
            size: { last: null, count: 0, active: false, target: null },
            parity: { last: null, count: 0, active: false, target: null },
            color: { last: null, count: 0, active: false, target: null }
        };

        const state = {
            saldo: 0,
            bets: {
                size: { option: null, amount: START_BET, streakLose: 0 },
                parity: { option: null, amount: START_BET, streakLose: 0 },
                color: { option: null, amount: START_BET, streakLose: 0 },
                column: { option: null, amount: START_BET, streakLose: 0 }
            }
        };

        const idMap = {
            size: { big: "BIG", small: "SMALL" },
            parity: { odd: "ODD", even: "EVEN" },
            color: { red: "RED", black: "BLACK" }
        };

        function parseRupiah(text) {
            const raw = text.replace(/\./g, '').replace(/,/g, '').replace(/[^\d]/g, '');
            return Math.floor(parseInt(raw, 10) / 100);
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

        function getColor(num) {
            if (num === 0) return null;
            return redNumbers.includes(num) ? 'red' : 'black';
        }

        function getParity(num) {
            if (num === 0) return null;
            return num % 2 === 0 ? 'even' : 'odd';
        }

        function getSize(num) {
            if (num === 0) return null;
            return num >= 19 ? 'big' : 'small';
        }

        function clickMultiple(el, times, cb) {
            if (!el || times < 1) return cb && cb();
            let i = 0;
            function loop() {
                if (i < times) {
                    el.click();
                    i++;
                    setTimeout(loop, 70);
                } else {
                    cb && setTimeout(cb, 150);
                }
            }
            loop();
        }

        function evaluateZigzagTrack(winNum) {
            const actual = {
                size: getSize(winNum),
                parity: getParity(winNum),
                color: getColor(winNum)
            };
            for (const cat of ['size', 'parity', 'color']) {
                const track = zigzagTrack[cat];
                if (track.last !== null && actual[cat] !== null) {
                    if (actual[cat] !== track.last) {
                        track.count++;
                    } else {
                        track.count = 0;
                    }
                    if (track.count >= 2) {
                        track.active = true;
                        track.target = actual[cat];
                        console.log(`[ZIGZAG] ${cat.toUpperCase()} zigzag 3x → Target: ${track.target}`);
                    }
                }
                track.last = actual[cat];
            }
        }

        function analyzeNextBets() {
            for (const cat of ['size', 'parity', 'color']) {
                const track = zigzagTrack[cat];
                const bet = state.bets[cat];
                if (track.active && track.target) {
                    bet.option = track.target;
                } else if (bet.streakLose > 0) {
                    // tetap gunakan bet.option sebelumnya
                } else {
                    bet.option = null;
                }
            }
        }

        function placeBet(cat, cb) {
            const bet = state.bets[cat];
            if (!bet.option) return cb && cb();
            const id = idMap[cat][bet.option];
            const el = document.getElementById(id);
            clickMultiple(el, bet.amount, cb);
        }

        function placeDozen(cb) {
            if (!targetDozen) return cb();
            const btn = document.querySelector(`.${DOZEN_CLASS[targetDozen]}`);
            clickMultiple(btn, fib[fibIndexDozen], cb);
        }

        function placeColumn(cb) {
            if (!targetColumn) return cb();
            const el = document.getElementById(COLUMN_ID[targetColumn]);
            clickMultiple(el, state.bets.column.amount, cb);
        }

        function confirmBet() {
            const btn = document.getElementById("btnBetConfirm") || document.querySelector(".btnConfirm");
            btn && btn.click();
        }

        function evaluateBets(winNum) {
            const result = {
                size: getSize(winNum),
                parity: getParity(winNum),
                color: getColor(winNum)
            };

            for (const cat of ['size', 'parity', 'color']) {
                const bet = state.bets[cat];
                const menang = result[cat] === bet.option;
                if (menang) {
                    bet.amount = START_BET;
                    bet.streakLose = 0;
                    zigzagTrack[cat] = { last: result[cat], count: 0, active: false, target: null };
                } else if (bet.option) {
                    bet.streakLose++;
                    bet.amount = Math.min(Math.pow(2, bet.streakLose), MAX_BET);
                }
            }

            const d = getDozen(winNum);
            if (targetDozen !== null) {
                if (d === targetDozen) {
                    fibIndexDozen = 0;
                    targetDozen = null;
                    zigzagCountDozen = 0;
                } else {
                    fibIndexDozen++;
                }
            }
            lastDozens.unshift(d);
            if (lastDozens.length > 6) lastDozens.pop();
            if (lastDozens.length >= 2 && lastDozens[0] !== lastDozens[1]) {
                zigzagCountDozen++;
            } else {
                zigzagCountDozen = 0;
            }
            if (zigzagCountDozen >= 5 && !targetDozen) {
                targetDozen = d;
                console.log(`[ZIGZAG] DOZEN zigzag 5x → Target: ${d}`);
            }

            const c = getColumn(winNum);
            columnHistory.unshift(c);
            if (columnHistory.length > 20) columnHistory.pop();

            if (targetColumn !== null && c === targetColumn) {
                targetColumn = null;
                state.bets.column.amount = START_BET;
                state.bets.column.streakLose = 0;
            } else if (targetColumn !== null) {
                state.bets.column.streakLose++;
                state.bets.column.amount = Math.min(Math.pow(2, state.bets.column.streakLose), MAX_BET);
            }

            const counts = [1, 2, 3].map(x => columnHistory.filter(v => v === x).length);
            const minCount = Math.min(...counts);
            const index = counts.findIndex(c => c === minCount) + 1;
            if (minCount >= 8) {
                targetColumn = index;
                state.bets.column.option = index;
            }
        }

        function updatePopup() {
            const box = document.getElementById("popupMonitor");
            if (!box) return;
            box.innerHTML = `
💰 Saldo: ${state.saldo.toLocaleString("id-ID")}
🛡 Protektor: ${protektorAktif ? '✅ Aktif' : '❌ Mati'}
🎯 Dozen: ${targetDozen ?? '-'} (${fib[fibIndexDozen] ?? '-'})
🎯 Column: ${targetColumn ?? '-'} (x${state.bets.column.amount})
🎯 Zigzag Dozen: ${zigzagCountDozen}x
📉 Size: ${state.bets.size.streakLose}x | Zigzag: ${zigzagTrack.size.count}x
📉 Parity: ${state.bets.parity.streakLose}x | Zigzag: ${zigzagTrack.parity.count}x
📉 Color: ${state.bets.color.streakLose}x | Zigzag: ${zigzagTrack.color.count}x
`;
        }

        function createPopup() {
            if (!document.getElementById("countdownDL")) return;
            const box = document.createElement("div");
            box.id = "popupMonitor";
            box.style.cssText = `position: fixed; bottom: 10px; left: 10px; background: rgba(0,0,0,0.85); color: #0f0; font-family: monospace; padding: 10px; font-size: 12px; border-radius: 6px; z-index: 999999; line-height: 1.4;`;
            box.innerHTML = "⌛ Loading...";
            document.body.appendChild(box);
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
            const el = document.querySelector("#countdown p");
            if (!el) return setTimeout(loopMain, 1000);
            const text = el.textContent.trim();
            const history = [...document.querySelectorAll("#resultHistory span")];
            if (!history.length) return setTimeout(loopMain, 1000);
            const result = parseInt(history[0].textContent.trim());
            if (result && result !== lastResult) {
                lastResult = result;
                evaluateBets(result);
                evaluateZigzagTrack(result);
                analyzeNextBets();
                updatePopup();
                isBetting = false;
            }

            if (!protektorAktif && state.saldo >= SALDO_PROTEK) protektorAktif = true;
            if (protektorAktif && state.saldo < SALDO_RESET) {
                protektorAktif = false;
                for (const bet of Object.values(state.bets)) {
                    bet.amount = START_BET;
                    bet.streakLose = 0;
                }
                targetDozen = null;
                zigzagCountDozen = 0;
                fibIndexDozen = 0;
                fibIndexColumn = 0;
                targetColumn = null;
                for (const cat in zigzagTrack) zigzagTrack[cat] = { last: null, count: 0, active: false, target: null };
            }

            if (!isBetting && text !== 'Spinning') {
                isBetting = true;
                placeBet('size', () => {
                    placeBet('parity', () => {
                        placeBet('color', () => {
                            placeDozen(() => {
                                placeColumn(() => {
                                    confirmBet();
                                    updatePopup();
                                });
                            });
                        });
                    });
                });
            }

            setTimeout(loopMain, 1000);
        }

        createPopup();
        updateSaldoRealtime();
        loopMain();
    }, 3000);
})();
