// ==UserScript==
// @name         Sic Bo Auto Bet FINAL FULL (Win Counter)
// @namespace    http://tampermonkey.net/
// @version      3.4
// @description  Auto bet Sic Bo: Prioritas, Martingale, Delay 2s, Cooldown check, Popup & Total Win/Kalah Log
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let betAmount = 1;
    const baseAmount = 1;
    let previousResult = [];
    let hasilSebelumnya = '';
    let angkaDipertaruhkan = 0;

    // Hitung total menang & kalah
    let totalMenang = 0;
    let totalKalah = 0;

    // Ambil hasil dadu dari elemen dice-XL1 ... XL6
    function ambilHasilDadu() {
        const dadu = document.querySelectorAll('.result__dice-group .dice');
        if (dadu.length !== 3) return null;
        const hasil = Array.from(dadu).map(el => {
            const match = el.className.match(/dice-XL(\d)/);
            return match ? parseInt(match[1]) : null;
        });
        return hasil.includes(null) ? null : hasil;
    }

    // Pilih angka prioritas: 1 → 6 → 5 → random
    function pilihAngkaUntukBet() {
        const prioritas = [1, 6, 5];
        for (let angka of prioritas) {
            if (previousResult.includes(angka)) return angka;
        }
        return Math.floor(Math.random() * 6) + 1;
    }

    // Tampilkan status ke layar (popup pojok kanan bawah)
    function tampilkanPopupStatus(teks) {
        let box = document.getElementById('popup-status-sicbo');
        if (!box) {
            box = document.createElement('div');
            box.id = 'popup-status-sicbo';
            Object.assign(box.style, {
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                background: '#333',
                color: '#fff',
                padding: '12px',
                borderRadius: '10px',
                fontFamily: 'monospace',
                fontSize: '14px',
                zIndex: 9999,
                boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                whiteSpace: 'pre-line'
            });
            document.body.appendChild(box);
        }
        box.textContent = teks;
    }

    // Klik pada area taruhan angka
    function klikBet(angka) {
        const target = document.querySelector(`.dice-one__bet .dice-M${angka}`);
        if (target) {
            const li = target.closest('li');
            if (li) {
                li.click();
                console.log(`🟢 Bertaruh pada angka ${angka} (chip: ${betAmount})`);
            }
        }
    }

    // Tunggu cooldown selesai → delay 2 detik → lalu klik bet
    function tungguDanKlikBet(angka) {
        const interval = setInterval(() => {
            const circle = document.querySelector('.ring__svg__circle');
            const style = circle?.getAttribute('style') || "";

            const cooldownSelesai = circle && style.includes("stroke-dasharray");

            if (cooldownSelesai) {
                clearInterval(interval);
                console.log("✅ Cooldown selesai, tunggu 2 detik sebelum bet...");
                setTimeout(() => {
                    klikBet(angka);
                    tampilkanPopupStatus(`🎯 Taruhan angka: ${angka}\n💰 Chip saat ini: ${betAmount}`);
                }, 2000); // delay sebelum klik
            } else {
                console.log("⏳ Masih dalam cooldown, tunggu...");
            }
        }, 200);
    }

    // Cek apakah taruhan menang
    function evaluasiKemenangan(angka, hasil) {
        return hasil.includes(angka);
    }

    // Proses tiap ronde baru muncul
    function prosesRondeBaru() {
        const hasil = ambilHasilDadu();
        if (!hasil) return;

        const hasilStr = hasil.join(',');
        if (hasilStr === hasilSebelumnya) return;
        hasilSebelumnya = hasilStr;

        previousResult = hasil;
        angkaDipertaruhkan = pilihAngkaUntukBet();

        tungguDanKlikBet(angkaDipertaruhkan);

        // Evaluasi hasil 2 detik setelah bet
        setTimeout(() => {
            const hasilBaru = ambilHasilDadu();
            if (!hasilBaru) return;

            const menang = evaluasiKemenangan(angkaDipertaruhkan, hasilBaru);
            let pesan = "";

            if (menang) {
                betAmount = baseAmount;
                totalMenang++;
                pesan = `✅ MENANG!\n🎲 Hasil: ${hasilBaru.join(', ')}\n🔄 Reset ke ${betAmount}\n🧮 Total Menang: ${totalMenang}, Total Kalah: ${totalKalah}`;
            } else {
                betAmount *= 2;
                totalKalah++;
                pesan = `❌ KALAH!\n🎲 Hasil: ${hasilBaru.join(', ')}\n⬆️ Gandakan jadi ${betAmount}\n🧮 Total Menang: ${totalMenang}, Total Kalah: ${totalKalah}`;
            }

            tampilkanPopupStatus(pesan);
            console.log(pesan);
        }, 2000);
    }

    // Jalankan observer hasil dadu
    function mulaiObserver() {
        const el = document.querySelector('.result__dice-group');
        if (!el) {
            setTimeout(mulaiObserver, 1000);
            return;
        }

        console.log('✅ Observer hasil dadu aktif...');
        const observer = new MutationObserver(() => {
            prosesRondeBaru();
        });

        observer.observe(el, {
            childList: true,
            subtree: true
        });

        // polling backup
        setInterval(prosesRondeBaru, 2000);
    }

    mulaiObserver();
})();
