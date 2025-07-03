// ==UserScript==
// @name         Sic Bo Auto Bet AI v9.8.4 (Click Timing Fixed)
// @namespace    http://tampermonkey.net/
// @version      9.8.4
// @description  Auto Bet Sic Bo pakai AI + Martingale + Delay klik & Submit
// @match        *://*/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    let history = [];
    let currentBet = 1;
    let lastPeriode = null;
    let saldoMenang = 0;
    let totalMenang = 0;
    let totalKalah = 0;
    let winStreak = 0;
    let loseStreak = 0;
    let lastBetNumber = null;
    let bettingInProgress = false;

    function log(...args) {
        console.log("[🎲 SicBo v9.8.4]", ...args);
    }

    function waitForElement(selector, callback, maxTry = 30, delay = 1000) {
        let tryCount = 0;
        const check = setInterval(() => {
            const el = document.querySelector(selector);
            if (el) {
                clearInterval(check);
                callback(el);
            } else if (++tryCount >= maxTry) {
                clearInterval(check);
                console.warn(`⛔ Gagal menemukan elemen ${selector} setelah ${maxTry}x`);
            }
        }, delay);
    }

    function getPeriode() {
        const tableDesc = document.querySelector(".table-desc");
        if (!tableDesc) return null;
        const descList = tableDesc.getElementsByClassName("desc-content");
        if (descList.length < 6) {
            console.warn(`⚠️ .desc-content masih kurang (ditemukan ${descList.length})`);
            return null;
        }
        return descList[descList.length - 6]?.textContent.trim() || null;
    }

    function getLatestDiceResult() {
        const diceContainer = document.querySelector('.history-container > div');
        if (!diceContainer) return null;
        const imgs = diceContainer.querySelectorAll('img[src*="/m31/"]');
        if (imgs.length < 3) return null;
        const numbers = Array.from(imgs).slice(0, 3).map(img => {
            const match = img.src.match(/\/(\d)\.svg$/);
            return match ? parseInt(match[1]) : null;
        });
        return numbers.some(n => n === null) ? null : numbers;
    }

    function isBettingOpen() {
        return document.querySelector('.timer.bet-open') !== null;
    }

    function analyzeHybridAI() {
        let freq = Array(7).fill(0);
        let lastAppear = Array(7).fill(-1);
        let streaks = Array(7).fill(0);
        let totalSum = 0;

        for (let i = 0; i < history.length; i++) {
            const result = history[i];
            totalSum += result.reduce((a, b) => a + b, 0);
            const unique = new Set(result);
            for (let n = 1; n <= 6; n++) {
                if (unique.has(n)) {
                    freq[n]++;
                    lastAppear[n] = i;
                }
            }
        }

        if (history.length >= 2) {
            const [r1, r2] = [history[history.length - 1], history[history.length - 2]];
            for (let n = 1; n <= 6; n++) {
                if (r1.includes(n) && r2.includes(n)) streaks[n]++;
            }
        }

        let score = Array(7).fill(0);
        const avgTotal = totalSum / history.length || 10;
        const lastRoundDice = history[history.length - 1] || [];

        for (let n = 1; n <= 6; n++) {
            if (freq[n] > 0) score[n] += 1;
            if (lastAppear[n] === -1 || history.length - lastAppear[n] >= 5) score[n] += 2;
            if (lastRoundDice.includes(n)) score[n] -= 2;
            if (streaks[n] > 0) score[n] += 1;
            if (avgTotal > 10 && n >= 4) score[n] += 1;
            if (avgTotal < 9 && n <= 3) score[n] += 1;
        }

        const maxScore = Math.max(...score.slice(1));
        const bestCandidates = [];
        for (let i = 1; i <= 6; i++) {
            if (score[i] === maxScore) bestCandidates.push(i);
        }

        return bestCandidates[Math.floor(Math.random() * bestCandidates.length)];
    }

    function placeBet(number) {
        if (bettingInProgress) return false;
        const buttons = document.getElementsByClassName("p12-bottom");
        const index = number - 1;
        const button = buttons[index];
        const submit = document.querySelector('button.sl-green-sh');
        if (!button || !submit) {
            log(`❌ Tidak menemukan tombol bet ${number} atau Submit.`);
            return false;
        }

        log(`🎯 Betting ${currentBet}x pada angka ${number}`);
        bettingInProgress = true;

        for (let i = 0; i < currentBet; i++) {
            setTimeout(() => {
                button.click();
                log(`🟢 Klik ke-${i + 1} untuk angka ${number}`);
            }, i * 5); // Delay antar klik
        }

        setTimeout(() => {
            if (!submit.disabled) {
                submit.click();
                log("📤 Klik Submit");
            } else {
                log("⌛ Tunggu Submit aktif...");
                const waitSubmit = setInterval(() => {
                    const refreshed = document.querySelector('button.sl-green-sh');
                    if (refreshed && !refreshed.disabled) {
                        refreshed.click();
                        log("📤 Klik Submit setelah tunggu");
                        clearInterval(waitSubmit);
                    }
                }, 500);
            }
        }, currentBet * 300 + 500);

        return true;
    }

    function detectWin(numbers) {
        if (lastBetNumber === null) return;
        const win = numbers.includes(lastBetNumber);
        if (win) {
            log("✅ MENANG!");
            saldoMenang += currentBet;
            currentBet = 1;
            winStreak++;
            loseStreak = 0;
            totalMenang++;
        } else {
            log("❌ KALAH!");
            saldoMenang -= currentBet;
// @version      3.NaN
            loseStreak++;
            winStreak = 0;
            totalKalah++;
        }

        log(`🎲 Dadu: ${numbers.join(', ')} | 🎯 Taruhan: ${lastBetNumber}`);
        log(`💰 Saldo: ${saldoMenang} | ✅ ${totalMenang} ❌ ${totalKalah}`);
        log(`🔥 Streak: Win ${winStreak} / Lose ${loseStreak}`);
        log(`🔁 Bet selanjutnya: ${currentBet}`);
    }

    function mainLoop() {
        let attempt = 0;
        const maxAttempts = 20;

        const checkPeriode = setInterval(() => {
            const periode = getPeriode();
            if (periode && periode !== lastPeriode) {
                clearInterval(checkPeriode);
                lastPeriode = periode;
                log("🆕 Ronde baru:", periode);
                lanjutkanBetting();
            } else {
                attempt++;
                if (attempt >= maxAttempts) {
                    clearInterval(checkPeriode);
                    log("❌ Gagal ambil periode setelah beberapa kali coba.");
                    setTimeout(mainLoop, 3000);
                }
            }
        }, 1000);
    }

    function lanjutkanBetting() {
        const waitResult = setInterval(() => {
            const result = getLatestDiceResult();
            if (result) {
                clearInterval(waitResult);
                history.push(result);
                if (history.length > 10) history.shift();

                const waitOpen = setInterval(() => {
                    if (isBettingOpen()) {
                        clearInterval(waitOpen);
                        log("🟢 Betting dibuka! Delay 2 detik...");
                        const target = analyzeHybridAI();
                        lastBetNumber = target;

                        setTimeout(() => {
                            if (!placeBet(target)) {
                                bettingInProgress = false;
                                return mainLoop();
                            }

                            const nextRonde = setInterval(() => {
                                const pNow = getPeriode();
                                if (pNow && pNow !== lastPeriode) {
                                    clearInterval(nextRonde);
                                    const resultBaru = getLatestDiceResult();
                                    if (resultBaru) detectWin(resultBaru);
                                    bettingInProgress = false;
                                    mainLoop();
                                }
                            }, 1000);
                        }, 2000);
                    }
                }, 1000);
            }
        }, 1000);
    }

    waitForElement(".table-desc", () => {
        log("✅ .table-desc ditemukan. Mulai bot...");
        mainLoop();
    });
})();
