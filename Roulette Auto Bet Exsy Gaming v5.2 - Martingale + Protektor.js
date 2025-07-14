// ==UserScript==
// @name         Roulette Auto Bet Exsy Gaming v5.2 - Martingale + Protektor
// @namespace    http://tampermonkey.net/
// @version      5.2
// @description  Auto-bet roulette dengan sistem Martingale, protektor saldo, dan popup monitor real-time
// @match        http*://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    setTimeout(() => {
        let isBetting = false;
        let protektorAktif = false;
        const MAX_BET = 16;
        const START_BET = 1;
        const SALDO_RESET = 1_000_000;
        const SALDO_PROTEK = 1_500_000;
        let lastLoggedSaldo = null;

        let state = {
            lastPeriode: null,
            saldo: 0,
            protektorPernahAktif: false,
            totalWin: 0,
            totalLose: 0,
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

        const redNumbers = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];

        function log(...args) {
            console.log("[🎯 ROULETTE]", ...args);
        }

        function parseRupiah(text) {
            if (!text) return null;
            const raw = text.replace(/[.,]/g, '').replace(/[^\d]/g, '');
            const intVal = parseInt(raw, 10);
            if (isNaN(intVal)) return null;
            return Math.floor(intVal / 100);
        }

        function analyzeNextBets() {
            const rand = arr => arr[Math.floor(Math.random() * arr.length)];
            state.bets.size.option = rand(['big', 'small']);
            state.bets.parity.option = rand(['odd', 'even']);
            state.bets.color.option = rand(['red', 'black']);
            log("📊 Analisa taruhan:", state.bets);
        }

        function evaluateBet(category, winNum) {
            const bet = state.bets[category];
            let menang = false;
            if (category === 'size') {
                menang = (bet.option === 'big' && winNum > 18) || (bet.option === 'small' && winNum <= 18);
            } else if (category === 'parity') {
                menang = (bet.option === 'odd' && winNum % 2 === 1) || (bet.option === 'even' && winNum % 2 === 0);
            } else if (category === 'color') {
                const isRed = redNumbers.includes(winNum);
                menang = (bet.option === 'red' && isRed) || (bet.option === 'black' && !isRed);
            }

            if (menang) {
                log(`✅ ${category.toUpperCase()} MENANG`);
                state.totalWin++;
                bet.amount = START_BET;
                bet.streakLose = 0;
            } else {
                log(`❌ ${category.toUpperCase()} KALAH`);
                state.totalLose++;
                bet.streakLose++;
                bet.amount = Math.min(Math.pow(2, bet.streakLose), MAX_BET);
            }
            log(`📉 STREAK ${category.toUpperCase()}: ${bet.streakLose}, AMOUNT: ${bet.amount}`);
        }

        function placeBet(category) {
            const bet = state.bets[category];
            const optionId = idMap[category][bet.option];
            const tombol = document.getElementById(optionId);
            if (tombol) {
                for (let i = 0; i < bet.amount; i++) {
                    setTimeout(() => tombol.click(), i * 300);
                }
                log(`🎲 ${category.toUpperCase()} => ${bet.option} x${bet.amount}`);
            } else {
                log(`❌ Tombol ${category}/${bet.option} tidak ditemukan`);
            }
        }

        function konfirmasiBet() {
            const btn = document.getElementById("btnBetConfirm");
            if (btn) {
                setTimeout(() => btn.click(), 500);
                log("✅ Konfirmasi Bet diklik");
            }
        }

        function updateSaldoRealtime() {
            setInterval(() => {
                for (const host of document.querySelectorAll('*')) {
                    const shadow = host.shadowRoot;
                    if (shadow) {
                        const el = shadow.querySelector('.menu-info__balance__title.menu-info__balance__title--mr-16');
                        if (el && el.textContent.trim()) {
                            const saldoBaru = parseRupiah(el.textContent.trim());
                            if (!isNaN(saldoBaru) && saldoBaru >= 10000) {
                                if (saldoBaru !== lastLoggedSaldo) {
                                    lastLoggedSaldo = saldoBaru;
                                    state.saldo = saldoBaru;
                                    updatePopup();
                                    log("💰 Saldo:", saldoBaru.toLocaleString("id-ID", { minimumFractionDigits: 2 }));
                                }
                            }
                        }
                    }
                }
            }, 1000);
        }

        function handleProtektor() {
            const saldoNow = state.saldo;
            if (!state.protektorPernahAktif && saldoNow > SALDO_PROTEK) {
                protektorAktif = true;
                state.protektorPernahAktif = true;
                log("🟢 Protektor AKTIF karena saldo > 1.500.000");
            }

            if (protektorAktif && saldoNow < SALDO_RESET) {
                log("🔄 Protektor RESET karena saldo < 1.000.000");
                for (const cat in state.bets) {
                    state.bets[cat].amount = START_BET;
                    state.bets[cat].streakLose = 0;
                }
                protektorAktif = false;
            }
            updatePopup();
        }

        function isBettingClosed() {
            const cd = document.getElementById("countdown");
            return cd && cd.textContent.includes("Spinning");
        }

        function getLatestResult() {
            const el = document.querySelectorAll("[id='resultHistory']")[0]?.children[0];
            const result = parseInt(el?.textContent || "", 10);
            return isNaN(result) ? null : result;
        }

        function createPopup() {
            if(!document.getElementById("countdownDL")){return;}
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
            box.innerHTML = "⌛ Memuat...";
            document.body.appendChild(box);
        }

        function updatePopup() {
            const box = document.getElementById("popupMonitor");
            if (!box) return;
            box.innerHTML = `
💰 Saldo: ${state.saldo >= 10000 ? state.saldo.toLocaleString("id-ID", {minimumFractionDigits: 2}) : '❓ Tidak terbaca'}
📈 Size: ${state.bets.size.streakLose}x
📈 Parity: ${state.bets.parity.streakLose}x
📈 Color: ${state.bets.color.streakLose}x
🛡 Protektor: ${state.protektorPernahAktif ? (protektorAktif ? "✅ Aktif" : "🕓 Sudah") : "❌ Belum"}
            `;
        }

        function loopMain() {
            try {
                handleProtektor();

                if (!isBettingClosed() && !isBetting) {
                    isBetting = true;
                    if (!state.bets.size.option) analyzeNextBets();
                    for (const cat of ['size', 'parity', 'color']) placeBet(cat);
                    setTimeout(() => konfirmasiBet(), 1000);
                }

                if (isBettingClosed() && isBetting) {
                    setTimeout(() => {
                        const win = getLatestResult();
                        if (win !== null && win !== state.lastPeriode) {
                            state.lastPeriode = win;
                            for (const cat of ['size', 'parity', 'color']) evaluateBet(cat, win);
                            analyzeNextBets();
                            isBetting = false;
                            updatePopup();
                        }
                    }, 1000);
                }

            } catch (e) {
                log("❗ Error loop:", e);
            }

            setTimeout(loopMain, 1000);
        }

        window.addEventListener("keydown", (e) => {
            if (e.ctrlKey && e.key === "r") {
                log("🗑️ Reset state manual (CTRL+R)");
                state = {
                    lastPeriode: null,
                    saldo: 0,
                    protektorPernahAktif: false,
                    totalWin: 0,
                    totalLose: 0,
                    bets: {
                        size: { option: null, amount: START_BET, streakLose: 0 },
                        parity: { option: null, amount: START_BET, streakLose: 0 },
                        color: { option: null, amount: START_BET, streakLose: 0 }
                    }
                };
                lastLoggedSaldo = null;
                updatePopup();
            }
        });

        createPopup();
        updateSaldoRealtime();
        log("🤖 AutoBet v5.2 AKTIF Tanpa LocalStorage!");
        loopMain();
    }, 5000);
})();
