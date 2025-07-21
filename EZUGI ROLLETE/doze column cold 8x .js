// ==UserScript==
// @name         Auto Bet Final v9.3.1 (Cold 5x Berturut-turut)
// @namespace    http://tampermonkey.net/
// @version      3.31
// @description  Bet pada Dozen & Column yang belum muncul 5x berturut-turut. Martingale Fibonacci. Tetap bet jika result 0. Koin otomatis + popup saldo & status.
// @match        http*://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    setTimeout(() => {
        const fib = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
        const DENOMINASI = [250000, 50000, 10000, 5000, 1000];
        const DOZEN_ID = { 1: 'index-800', 2: 'index-801', 3: 'index-802' };
        const COLUMN_ID = { 1: 'index-702', 2: 'index-701', 3: 'index-700' };

        let coldDozen = { 1: 0, 2: 0, 3: 0 };
        let coldColumn = { 1: 0, 2: 0, 3: 0 };

        let targetDozen = null, targetColumn = null;
        let fibIndexDozen = 0, fibIndexColumn = 0;
        let isBetting = false, isEvaluated = false;
        let lastResult = null, lastLoggedSaldo = null;
        let highestSaldo = 0;
        const state = { saldo: 0 };

        function parseRupiah(text) {
            return parseInt(text.replace(/Rp|\s|,/g, '').replace(/\.\d+$/, '')) || 0;
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
                        requestAnimationFrame(() => {
                            el.dispatchEvent(new Event('click', { bubbles: true }));
                            i++; loop();
                        });
                    } else resolve();
                }
                loop();
            });
        }

        async function pilihKoinPecahan(chipCount, targetButton) {
            const totalRupiah = chipCount * 1000;
            let sisa = totalRupiah;
            for (let nominal of DENOMINASI) {
                const jumlah = Math.floor(sisa / nominal);
                if (jumlah > 0) {
                    const chipBtn = document.querySelector(`[data-e2e="chip-${nominal}"]`);
                    if (!chipBtn || !targetButton) continue;
                    chipBtn.dispatchEvent(new Event('click', { bubbles: true }));
                    await clickMultiple(targetButton, jumlah);
                    sisa -= jumlah * nominal;
                    await new Promise(r => setTimeout(r, 10));
                }
            }
        }

        async function placeDozen() {
            if (!targetDozen) return;
            const btn = document.querySelector(`[id="${DOZEN_ID[targetDozen]}"]`);
            if (btn) await pilihKoinPecahan(fib[fibIndexDozen], btn);
        }

        async function placeColumn() {
            if (!targetColumn) return;
            const btn = document.querySelector(`[id="${COLUMN_ID[targetColumn]}"]`);
            if (btn) await pilihKoinPecahan(fib[fibIndexColumn], btn);
        }

        function resetColdCounters(exceptDozen, exceptColumn) {
            for (let i = 1; i <= 3; i++) {
                if (i === exceptDozen) coldDozen[i] = 0;
                else coldDozen[i]++;
                if (i === exceptColumn) coldColumn[i] = 0;
                else coldColumn[i]++;
            }
        }

        function evaluateCold(winNum) {
            const d = getDozen(winNum);
            const c = getColumn(winNum);

            if (winNum === 0) {
                if (targetDozen !== null) fibIndexDozen = Math.min(fibIndexDozen + 1, fib.length - 1);
                if (targetColumn !== null) fibIndexColumn = Math.min(fibIndexColumn + 1, fib.length - 1);
                return;
            }

            resetColdCounters(d, c);

            // === DOZEN ===
            if (targetDozen !== null) {
                if (d === targetDozen) {
                    targetDozen = null;
                    fibIndexDozen = 0;
                } else {
                    fibIndexDozen = Math.min(fibIndexDozen + 1, fib.length - 1);
                }
            } else {
                for (let i = 1; i <= 3; i++) {
                    if (coldDozen[i] >= 7) {
                        targetDozen = i;
                        fibIndexDozen = 0;
                        break;
                    }
                }
            }

            // === COLUMN ===
            if (targetColumn !== null) {
                if (c === targetColumn) {
                    targetColumn = null;
                    fibIndexColumn = 0;
                } else {
                    fibIndexColumn = Math.min(fibIndexColumn + 1, fib.length - 1);
                }
            } else {
                for (let i = 1; i <= 3; i++) {
                    if (coldColumn[i] >= 7) {
                        targetColumn = i;
                        fibIndexColumn = 0;
                        break;
                    }
                }
            }
        }

        async function loopMain() {
            autoClosePopup();
            const el = document.getElementsByClassName("seconds")[0];
            const open = !!el;
            const history = document.getElementsByClassName("ervzci33")[0]?.children;
            if (!history?.length) return setTimeout(loopMain, 1000);

            if (open) {
                const resultSpan = history[0];
                const result = parseInt(resultSpan.textContent.trim());
                const isNewResult = result !== lastResult && !isNaN(result);

                if (isNewResult) {
                    lastResult = result;
                    isEvaluated = false;
                    isBetting = false;
                }

                if (!isEvaluated && !isNaN(result)) {
                    evaluateCold(result);
                    isEvaluated = true;
                }

                if (!isBetting && !isNaN(result)) {
                    isBetting = true;
                    await placeDozen();
                    await placeColumn();
                }
            } else {
                isBetting = false;
                isEvaluated = false;
            }

            setTimeout(loopMain, 1000);
        }

        function autoClosePopup() {
            setInterval(() => {
                const closeBtn = document.querySelector('[data-e2e="btn-label-Close"]');
                const btnrecon = document.querySelector('[data-e2e="btn-label-Reconnect"]');
                if (closeBtn) closeBtn.dispatchEvent(new Event('click', { bubbles: true }));
                if (btnrecon) btnrecon.dispatchEvent(new Event('click', { bubbles: true }));
            }, 1000);
        }

        function updateSaldoRealtime() {
            setInterval(() => {
                const el = document.querySelector("[data-e2e='balance-value']");
                if (el && el.textContent.trim()) {
                    const saldoBaru = parseRupiah(el.textContent.trim());
                    if (!isNaN(saldoBaru) && saldoBaru !== lastLoggedSaldo) {
                        lastLoggedSaldo = saldoBaru;
                        state.saldo = saldoBaru;
                        if (saldoBaru > highestSaldo) highestSaldo = saldoBaru;
                    }
                }
            }, 1000);
        }
        updateSaldoRealtime();
        loopMain();
    }, 3000);
})();
