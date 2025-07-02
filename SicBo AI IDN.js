// ==UserScript==
// @name         Sic Bo Auto Bet AI Full (v6) - Statistik Lengkap
// @namespace    http://tampermonkey.net/
// @version      6.0
// @description  AI auto bet Sic Bo berdasarkan 10 result terakhir + Martingale + Statistik lengkap
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let history = [];
    let currentBet = 1;
    let lastKey = "";
    let saldoMenang = 0;

    // Statistik tambahan
    let totalMenang = 0;
    let totalKalah = 0;
    let winStreak = 0;
    let loseStreak = 0;

    // Cek apakah taruhan sedang dibuka
    function isBettingOpen() {
        return document.querySelector('.timer.bet-open') !== null;
    }

    // Ambil 3 angka dari history container
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

    // AI analisis: ambil angka dengan frekuensi terbanyak
    function analyzeAndPredict() {
        let count = Array(7).fill(0); // Index 1–6

        for (let result of history) {
            for (let n of result) {
                count[n]++;
            }
        }

        const maxFreq = Math.max(...count.slice(1)); // abaikan index 0
        const candidates = [];
        for (let i = 1; i <= 6; i++) {
            if (count[i] === maxFreq) candidates.push(i);
        }

        const chosen = candidates[Math.floor(Math.random() * candidates.length)];
        console.log(`🤖 AI memilih: ${chosen} dari frekuensi`, count.slice(1));
        return chosen;
    }

    // Klik angka sebanyak currentBet kali + klik tombol Submit
    function placeBet(number) {
        const button = document.querySelector(`.single-dice-row .sl-bet[bet="${number}"]`);
        const submit = document.querySelector('button.sl-green-sh');

        if (!button) {
            console.warn(`❌ Tidak ditemukan tombol angka ${number}`);
            return false;
        }

        console.log(`🎯 Melakukan bet ${currentBet}x pada angka: ${number}`);

        // Klik angka sesuai jumlah taruhan (martingale)
        for (let i = 0; i < currentBet; i++) {
            setTimeout(() => {
                button.click();
            }, i * 200);
        }

        // Klik submit setelah semua klik angka selesai
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

    // Evaluasi menang/kalah + update statistik
    function detectWin(numbers, target) {
        const win = numbers.includes(target);

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

        // Tampilkan statistik
        console.log("🎲 Hasil Dadu:", numbers);
        console.log(`💰 Saldo: ${saldoMenang}`);
        console.log(`✅ Total Menang: ${totalMenang} | ❌ Total Kalah: ${totalKalah}`);
        console.log(`🔥 Win Streak: ${winStreak} | 💀 Lose Streak: ${loseStreak}`);
        console.log(`🧠 Bet Berikutnya: ${currentBet}`);
        console.log("─────────────────────────────");
    }

    // Loop utama: jalankan terus setiap siklus
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
                        console.log("⏳ Menunggu waktu betting dibuka...");
                    }
                }, 1000);

                return;
            }
        }

        setTimeout(mainLoop, 1000);
    }

    console.log("🚀 Sic Bo Auto Bet v6 aktif!");
    mainLoop();
})();
