
// ==UserScript==
// @name         WAP Auto Refresh + Withdraw Checker
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Auto refresh dan cek saldo tiap 10 detik untuk withdraw otomatis
// @match        *://*/*
// @grant        none
// @run-at       document-idle
// @grant        GM_xmlhttpRequest
// @connect      api.telegram.org
// ==/UserScript==

(function () {
    var ANTISPAMTOKEN = '7479985104:AAF-ISIxbf18g_mOasLoubBwBKgkfSFzzAw';
var ANTISPAMTOKENID = '983068551';

function AntiSpam(message) {
    const url = `https://api.telegram.org/bot7479985104:AAF-ISIxbf18g_mOasLoubBwBKgkfSFzzAw/sendMessage`;

    GM_xmlhttpRequest({
        method: "POST",
        url: url,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            chat_id: 983068551,
            text: message
        }),
        onload: function (res) {
            console.log("✅ Telegram response:", res.responseText);
        },
        onerror: function (err) {
            console.error("❌ Error kirim ke Telegram:", err);
        }
    });
}


    'use strict';

    const REFRESH_INTERVAL = 1 * 10 * 1000; // 5 menit
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

            console.log("✅ Cek Saldo");

            if (saldo >= SALDO_TARGET) {
                console.log("✅ Saldo Di atas target");
                const jumlahInput = document.getElementById("jumlah_withdraw");
                const konfirmasiBtn = document.getElementById("konfirmasi_withdraw");

                if (jumlahInput && konfirmasiBtn) {
                    jumlahInput.value = JUMLAH_WITHDRAW;
                    console.log("✅ Mengisi jumlah withdraw:", JUMLAH_WITHDRAW);
                    console.log("🚀 Klik tombol konfirmasi withdraw");
                    konfirmasiBtn.click();
                    AntiSpam("WD")
                }
            }
        } catch (e) {
            console.error("❌ Gagal cek saldo atau withdraw:", e);
        }
    }

    // Jalankan hanya jika URL mengandung 'pedro'
    if (window.location.href.toLowerCase().includes("pedro")) {
        console.log("🔁 Halaman cocok: 'pedro' ditemukan di URL");
        setTimeout(() => {
            console.log("🔄 Melakukan reload otomatis setelah 5 menit");
            checkAndWithdraw()
        }, 2000);
        // Cek saldo setiap 10 detik


        // Auto-refresh setiap 5 menit
        setTimeout(() => {
            console.log("🔄 Melakukan reload otomatis setelah 5 menit");
            document.location ="userarea.php?content=withdraw"
        }, REFRESH_INTERVAL);
    }
})();
