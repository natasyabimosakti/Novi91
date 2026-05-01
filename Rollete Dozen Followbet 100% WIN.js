// ==UserScript==
// @name         Auto Bet Follow Dozen - Fibonacci Progression
// @namespace    http://tampermonkey.net/
// @version      1.1.0
// @description  Follow last dozen result with custom progression [1,1,2,3,5,...]
// @match        http*://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // --- KONFIGURASI ---
    const progression = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 125, 250, 500];
    const betDelay = 3000; // Tunggu 3 detik setelah bet dibuka baru mulai klik (opsional)

    // --- STATE SYSTEM ---
    let currentStep = 0;
    let lastProcessedNumber = null;
    let lastTargetDozen = null;
    let isWaitingForSpin = false;

    console.log("🎲 Script Roulette Follow Dozen Aktif");

    function getLatestResult() {
        const el = document.querySelector('#resultHistory li:first-child span');
        return el ? parseInt(el.textContent.trim()) : null;
    }

    function getDozen(number) {
        if (number >= 1 && number <= 12) return 1;
        if (number >= 13 && number <= 24) return 2;
        if (number >= 25 && number <= 36) return 3;
        return 0; // Untuk angka 0
    }

    function getCountdown() {
        const el = document.querySelector('#countdown p');
        return el ? el.textContent.trim() : "";
    }

    async function placeBet(dozen, amount) {
        const targetId = `#DZ${dozen}`;
        const btnDozen = document.querySelector(targetId);
        const btnConfirm = document.querySelector('#btnBetConfirm');

        if (!btnDozen) {
            console.error("❌ Elemen Dozen tidak ditemukan:", targetId);
            return;
        }

        console.log(`💰 Memasang Bet pada Dozen ${dozen} sebanyak ${amount} unit`);

        // Melakukan klik sebanyak jumlah unit progression
        for (let i = 0; i < amount; i++) {
            btnDozen.click();
            await new Promise(r => setTimeout(r, 150)); // Jeda antar klik chip
        }

        // Klik konfirmasi
        if (btnConfirm && !btnConfirm.classList.contains('noWork')) {
            setTimeout(() => {
                btnConfirm.click();
                console.log("✅ Bet dikonfirmasi");
            }, 500);
        }
    }

    function mainLogic() {
        const countdownText = getCountdown();
        const isSpinning = countdownText.toLowerCase().includes("spinning");
        const latestNumber = getLatestResult();

        // Indikator putaran baru: Jika sebelumnya spinning dan sekarang muncul angka countdown
        if (!isSpinning && isWaitingForSpin && latestNumber !== null) {
            isWaitingForSpin = false;
            
            console.log(`🎰 Putaran Baru! Result Terakhir: ${latestNumber}`);

            const currentResultDozen = getDozen(latestNumber);
            
            // Cek Menang atau Kalah
            if (lastTargetDozen !== null) {
                if (currentResultDozen === lastTargetDozen) {
                    console.log("%c🏆 MENANG! Reset Progression.", "color: green; font-weight: bold;");
                    currentStep = 0;
                } else {
                    console.log("%c❌ KALAH! Lanjut Progression.", "color: red; font-weight: bold;");
                    currentStep++;
                    if (currentStep >= progression.length) {
                        console.warn("⚠️ Batas progression tercapai. Reset ke awal.");
                        currentStep = 0;
                    }
                }
            }

            // Tentukan target dozen berikutnya (follow result)
            // Jika result 0, biasanya tetap di dozen sebelumnya atau skip. 
            // Di sini kita pilih follow dozen result jika bukan 0.
            if (currentResultDozen !== 0) {
                lastTargetDozen = currentResultDozen;
            } else {
                console.log("ℹ️ Angka 0 keluar. Tetap menggunakan target dozen sebelumnya.");
                // Jika belum ada target sebelumnya, default ke dozen 1
                if (lastTargetDozen === null) lastTargetDozen = 1;
            }

            const betAmount = progression[currentStep];

            // Eksekusi bet dengan delay agar sistem web siap
            setTimeout(() => {
                const currentStatus = getCountdown();
                if (!currentStatus.toLowerCase().includes("spinning")) {
                    placeBet(lastTargetDozen, betAmount);
                }
            }, betDelay);
        }

        // Jika sedang spinning, tandai agar siap memproses saat taruhan dibuka kembali
        if (isSpinning) {
            isWaitingForSpin = true;
        }
    }

    // Jalankan pengecekan setiap 1 detik
    setInterval(mainLogic, 1000);

    // Logging sederhana untuk memantau status di console
    setInterval(() => {
        const cd = getCountdown();
        if (!cd.toLowerCase().includes("spinning")) {
            const res = getLatestResult();
            console.clear();
            console.log(`--- ROULLETE BOT STATS ---`);
            console.log(`Status: Betting Open (${cd})`);
            console.log(`Last Result: ${res} (Dozen ${getDozen(res)})`);
            console.log(`Next Target: Dozen ${lastTargetDozen}`);
            console.log(`Current Step: ${currentStep} (Bet: ${progression[currentStep]})`);
        }
    }, 5000);
})();
