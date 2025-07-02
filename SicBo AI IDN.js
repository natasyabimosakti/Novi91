// ==UserScript==
// @name         Sic Bo Auto Bet AI Full (v7)
// @namespace    http://tampermonkey.net/
// @version      7.0
// @description  AI auto bet Sic Bo: analisa hasil sebelumnya, martingale, delay 2 detik, statistik lengkap
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Variabel global
    let history = [];
    let currentBet = 1;
    let lastKey = "";
    let saldoMenang = 0;
    let totalMenang = 0;
    let totalKalah = 0;
    let winStreak = 0;
    let loseStreak = 0;
    let lastBetNumber = null;

    // Cek apakah taruhan sedang dibuka
    function isBettingOpen() {
        return document.querySelector('.timer.bet-open') !== null;
    }

    // Ambil hasil dadu terbaru
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

    // Analisis AI: cari angka yang paling sering muncul dari 10 hasil terakhir
    function analyzeAndPredict() {
        let count = Array(7).fill(0); // index 1-6

        for (let result of history) {
            for (let n of result) {
                count[n]++;
            }
        }

        const maxFreq = Math.max(...count.slice(1));
        const candidates = [];
        for (let i = 1; i <= 6; i++) {
            if (count[i] === maxFreq) candidates.push(i);
        }

        const chosen = candidates[Math.floor(Math.random() * candidates.length)];
        console.log(`🤖 AI memilih angka: ${chosen} dari frekuensi`, count.slice(1));
        return chosen;
    }

    // Lakukan bet (klik tombol angka sebanyak currentBet)
    function placeBet(number) {
        lastBetNumber = number;
        const button = document.querySelector(`.single-dice-row .sl-bet[bet="${number}"]`);
        const submit = document.querySelector('button.sl-green-sh');

        if (!button) {
            console.warn(`❌ Tidak ditemukan tombol angka ${number}`);
            return false;
        }

        console.log(`🎯 Melakukan betting ${currentBet}x pada angka ${number}`);

        for (let i = 0; i < currentBet; i++) {
            setTimeout(() => {
                button.click();
            }, i * 200);
        }

        setTimeout(() => {
            if (submit && !submit.disabled) {
                console.log("📨 Klik tombol Submit");
                submit.click();
            } else {
                console.warn("⚠️ Tombol Submit belum aktif");
            }
        }, currentBet * 200 + 300);

        return true;
    }

    // Deteksi menang/kalah dan update statistik
    function detectWin(numbers) {
        if (lastBetNumber === null) {
            console.warn("⚠️ Tidak ada data bet sebelumnya");
            return;
        }

        const win = numbers.includes(lastBetNumber);

        if (win) {
            console.log("✅ MENANG!");
            saldoMenang += currentBet;
            currentBet = 1;
            totalMenang++;
            winStreak++;
            loseStreak = 0;
        } else {
            console.log("❌ KALAH!");
            saldoMenang -= currentBet;
            currentBet *= 2;
            totalKalah++;
            loseStreak++;
            winStreak = 0;
        }

        console.log(`🎯 Angka dibet: ${lastBetNumber}`);
        console.log(`🎲 Hasil dadu: ${numbers.join(', ')}`);
        console.log(`💰 Saldo total: ${saldoMenang}`);
        console.log(`✅ Menang: ${totalMenang} | ❌ Kalah: ${totalKalah}`);
        console.log(`🔥 Win streak: ${winStreak} | 💀 Lose streak: ${loseStreak}`);
        console.log(`🔁 Bet berikutnya: ${currentBet}`);
        console.log("────────────────────────────────────────");
    }

    // Loop utama
    function mainLoop() {
        console.log("🔁 Menunggu hasil baru...");

        const result = getLatestDiceResult();
        if (!result) {
            setTimeout(mainLoop, 1000);
            return;
        }

        const key = result.join("-");
        if (key !== lastKey) {
            lastKey = key;

            history.push(result);
            if (history.length > 10) history.shift();

            // Tunggu sampai status bet terbuka
            const waitOpen = setInterval(() => {
                if (isBettingOpen()) {
                    clearInterval(waitOpen);
                    console.log("🟢 Waktu betting terbuka... tunggu 2 detik");

                    const target = analyzeAndPredict();

                    // Delay 2 detik sebelum klik
                    setTimeout(() => {
                        placeBet(target);

                        // Tunggu 6 detik untuk hasil baru
                        setTimeout(() => {
                            const newResult = getLatestDiceResult();
                            if (newResult) detectWin(newResult);
                            setTimeout(mainLoop, 3000);
                        }, 6000);

                    }, 2000);
                } else {
                    console.log("⏳ Masih menunggu betting dibuka...");
                }
            }, 1000);

            return;
        }

        setTimeout(mainLoop, 1000);
    }

    console.log("🚀 Sic Bo Auto Bet v7 AKTIF...");
    mainLoop();
})();
