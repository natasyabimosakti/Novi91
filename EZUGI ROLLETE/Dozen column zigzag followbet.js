// ==UserScript==
// @name         Auto Bet Final v9.2.5 (Result 0 Follow Fix)
// @namespace    http://tampermonkey.net/
// @version      3.25
// @description  Zigzag Dozen/Column + Martingale Fibonacci + Koin Otomatis + Lanjut saat result 0.
// @match        http*://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    setTimeout(() => {
        let highestSaldo = 0;
        const fib = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
        const DENOMINASI = [250000, 50000, 10000, 5000, 1000];

        const DOZEN_ID = { 1: 'index-800', 2: 'index-801', 3: 'index-802' };
        const COLUMN_ID = { 1: 'index-702', 2: 'index-701', 3: 'index-700' };

        let zigzagDozenCount = 0;
        let zigzagColumnCount = 0;
        let lastDozens = [];
        let lastColumns = [];

        let targetDozen = null;
        let targetColumn = null;
        let fibIndexDozen = 0;
        let fibIndexColumn = 0;

        let isBetting = false;
        let isEvaluated = false;
        let lastResult = null;
        let lastLoggedSaldo = null;

        const state = { saldo: 0 };

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
                            i++;
                            loop();
                        });
                    } else {
                        resolve();
                    }
                }
                loop();
            });
        }

        async function pilihKoinPecahan(chipCount, targetButton) {
            if (!targetButton || chipCount <= 0) return;
            const totalRupiah = chipCount * 1000;
            let sisa = totalRupiah;
            for (let nominal of DENOMINASI) {
                const jumlah = Math.floor(sisa / nominal);
                if (jumlah > 0) {
                    const chipBtn = document.querySelector(`[data-e2e="chip-${nominal}"]`);
                    if (!chipBtn) continue;
                    chipBtn.dispatchEvent(new Event('click', { bubbles: true }));
                    await clickMultiple(targetButton, jumlah);
                    sisa -= jumlah * nominal;
                    await new Promise(r => setTimeout(r, 20));
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

        function evaluateZigzag(winNum) {
            if (winNum === 0) {
                if (targetDozen !== null) fibIndexDozen = Math.min(fibIndexDozen + 1, fib.length - 1);
                if (targetColumn !== null) fibIndexColumn = Math.min(fibIndexColumn + 1, fib.length - 1);
                return;
            }

            const d = getDozen(winNum);
            const c = getColumn(winNum);

            // DOZEN
            if (targetDozen !== null) {
                if (d === targetDozen && d > 0) {
                    targetDozen = null;
                    fibIndexDozen = 0;
                    zigzagDozenCount = 0;
                } else if (d > 0) {
                    fibIndexDozen = Math.min(fibIndexDozen + 1, fib.length - 1);
                    targetDozen = d;
                }
            }

            lastDozens.unshift(d);
            if (lastDozens.length > 6) lastDozens.pop();
            zigzagDozenCount = (lastDozens.length >= 2 && lastDozens[0] !== lastDozens[1]) ? zigzagDozenCount + 1 : 0;

            if (zigzagDozenCount >= 3 && !targetDozen && d > 0) {
                targetDozen = d;
            }

            // COLUMN
            if (targetColumn !== null) {
                if (c === targetColumn && c > 0) {
                    targetColumn = null;
                    fibIndexColumn = 0;
                    zigzagColumnCount = 0;
                } else if (c > 0) {
                    fibIndexColumn = Math.min(fibIndexColumn + 1, fib.length - 1);
                    targetColumn = c;
                }
            }

            lastColumns.unshift(c);
            if (lastColumns.length > 6) lastColumns.pop();
            zigzagColumnCount = (lastColumns.length >= 2 && lastColumns[0] !== lastColumns[1]) ? zigzagColumnCount + 1 : 0;

            if (zigzagColumnCount >= 3 && !targetColumn && c > 0) {
                targetColumn = c;
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
// @version      3.NaN

                if (isNewResult) {
                    lastResult = result;
                    isEvaluated = false;
                    isBetting = false;
                }

                if (!isEvaluated && !isNaN(result)) {
                    evaluateZigzag(result);
                    isEvaluated = true;
                    updatePopup(result);
                }

                if (!isBetting && !isNaN(result)) {
                    isBetting = true;
                    await placeDozen();
                    await placeColumn();
                    updatePopup(result);
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
🎯 Zigzag Dozen: ${zigzagDozenCount}x ⇒ ${targetDozen ?? '-'} (${fib[fibIndexDozen] ?? '-'})
🎯 Zigzag Column: ${zigzagColumnCount}x ⇒ ${targetColumn ?? '-'} (${fib[fibIndexColumn] ?? '-'})
`;
        }

        createPopup();
        updateSaldoRealtime();
        loopMain();
    }, 3000);
})();
