// ==UserScript==
// @name         WAP Auto Refresh + Withdraw Checker
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Auto refresh dan cek saldo tiap 10 detik untuk withdraw otomatis
// @match        *://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 menit
    const CHECK_INTERVAL = 10 * 1000; // 10 detik
    const SALDO_TARGET = 2500000;
    const JUMLAH_WITHDRAW = 1000000;

    function cleanNumber(str) {
        return Number(str.replace(/[^0-9]/g, ""));
    }

    function checkAndWithdraw() {
        try {
            const strong = document.getElementsByTagName("strong")[0];
            if (!strong) return;

            const saldo = cleanNumber(strong.textContent || "");
            console.log("💰 Cek saldo:", saldo);

            if (saldo > SALDO_TARGET) {
                const jumlahInput = document.getElementById("jumlah_withdraw");
                const konfirmasiBtn = document.getElementById("konfirmasi_withdraw");

                if (jumlahInput && konfirmasiBtn) {
                    jumlahInput.value = JUMLAH_WITHDRAW;
                    console.log("✅ Mengisi jumlah withdraw:", JUMLAH_WITHDRAW);
                    konfirmasiBtn.click();
                    console.log("🚀 Klik tombol konfirmasi withdraw");
                }
            }
        } catch (e) {
            console.error("❌ Gagal cek saldo atau withdraw:", e);
        }
    }

    // Jalankan hanya jika URL mengandung 'pedro'
    if (window.location.href.toLowerCase().includes("pedro")) {
        console.log("🔁 Halaman cocok: 'pedro' ditemukan di URL");

        // Cek saldo setiap 10 detik
        setInterval(checkAndWithdraw, CHECK_INTERVAL);

        // Auto-refresh setiap 5 menit
        setTimeout(() => {
            console.log("🔄 Melakukan reload otomatis setelah 5 menit");
            location.reload();
        }, REFRESH_INTERVAL);
    }
})();
