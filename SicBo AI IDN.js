// ==UserScript==
// @name         Sic Bo Auto Bet AI Full (v5)
// @namespace    http://tampermonkey.net/
// @version      5.0
// @description  AI auto bet Sic Bo berdasarkan 10 result terakhir + Martingale + Waktu Aman
// @match         *://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let history = [];
    let currentBet = 1;
    let lastKey = "";
    let saldoMenang = 0;

    function isBettingOpen() {
        return document.querySelector('.timer.bet-open') !== null;
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

        if (numbers.some(n => n === null)) return null;
        return numbers;
    }

    // 🤖 AI Analisa: Hitung frekuensi angka dari 10 result terakhir
    function analyzeAndPredict() {
        let count = Array(7).fill(0); // index 1–6

        for (let result of history) {
            for (let n of result) {
                count[n]++;
            }
        }

        const maxFreq = Math.max(...count.slice(1)); // abaikan index 0

        // Ambil semua angka dengan frekuensi tertinggi
        const candidates = [];
        for (let i = 1; i <= 6; i++) {
            if (count[i] === maxFreq) candidates.push(i);
        }

        const chosen = candidates[Math.floor(Math.random() * candidates.length)];
        console.log(`🤖 AI memilih: ${chosen} dari frekuensi`, count.slice(1));
        return chosen;
    }

    function placeBet(number) {
        const button = document.querySelector(`.single-dice-row .sl-bet[bet="${number}"]`);
        const submit = document.querySelector('button.sl-green-sh');

        if (button) {
            console.log(`🎯 Klik angka: ${number}`);
            button.click();
        } else {
            console.warn(`❌ Tidak ditemukan tombol angka ${number}`);
            return false;
        }

        setTimeout(() => {
            if (submit && !submit.disabled) {
                console.log("📨 Klik tombol Submit");
                submit.click();
            } else {
                console.warn("⚠️ Tombol Submit tidak aktif");
            }
        }, 300);

        return true;
    }

    function detectWin(numbers, target) {
        const win = numbers.includes(target);
        if (win) {
            console.log("✅ MENANG!");
            saldoMenang += currentBet;
            currentBet = 1;
        } else {
            console.log("❌ KALAH!");
            saldoMenang -= currentBet;
            currentBet *= 2;
        }

        console.log(`🎲 Hasil: [${numbers.join(', ')}], Saldo total: ${saldoMenang}, Next bet: ${currentBet}`);
    }

    function mainLoop() {
        const result = getLatestDiceResult();
        if (result) {
            const key = result.join("-");
            if (key !== lastKey) {
                lastKey = key;

                history.push(result);
                if (history.length > 10) history.shift();

                // Tunggu sampai waktu taruhan dibuka
                const waitOpen = setInterval(() => {
                    if (isBettingOpen()) {
                        clearInterval(waitOpen);
                        const target = analyzeAndPredict();
                        placeBet(target);

                        setTimeout(() => {
                            const newResult = getLatestDiceResult();
                            if (newResult) detectWin(newResult, target);
                            setTimeout(mainLoop, 3000);
                        }, 6000);
                    } else {
                        console.log("⏳ Menunggu taruhan dibuka...");
                    }
                }, 1000);

                return;
            }
        }

        setTimeout(mainLoop, 1000);
    }

    console.log("🚀 Sic Bo Auto Bet AI v5 aktif...");
    mainLoop();
})();
