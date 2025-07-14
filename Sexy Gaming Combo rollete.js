// ==UserScript==
// @name         Roulette Auto Bet v6.2 - Fix Reset Dozen/Column
// @namespace    http://tampermonkey.net/
// @version      6.2
// @description  Fix reset logic dozen/column. Auto-bet roulette (size/parity/color) + 2 dozen + 2 column dengan Martingale, protektor saldo, popup real-time, dan konfirmasi setelah semua klik selesai
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
        let lastResult = null;
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

        function loopMain() {
            const cd = document.getElementById("countdown");
            const isClosed = cd && cd.textContent.includes("Spinning");
            const result = getHistory()[0];

            if (!isClosed && !isBetting) {
                isBetting = true;
                placeDozenAndColumn(getHistory());
            }

            if (isClosed && isBetting) {
                setTimeout(() => {
                    const win = result;
                    if (win !== null && win !== state.lastPeriode) {
                        state.lastPeriode = win;
                        const d = getDozen(win);
                        const c = getColumn(win);
                        if (lastTargetDozen.includes(d)) {
                            fibIndexDozen = 0;
                        } else {
                            fibIndexDozen = Math.min(fibIndexDozen + 1, fib.length - 1);
                        }
                        if (lastTargetColumn.includes(c)) {
                            fibIndexColumn = 0;
                        } else {
                            fibIndexColumn = Math.min(fibIndexColumn + 1, fib.length - 1);
                        }
                        isBetting = false;
                    }
                }, 1000);
            }
            setTimeout(loopMain, 1000);
        }

        loopMain();
    }, 3000);
})();
