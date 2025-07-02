// ==UserScript==
// @name         Sic Bo Auto-Bet FINAL v2.4 (Klik Ganda)
// @namespace    http://tampermonkey.net/
// @version      2.4
// @description  Auto-bet Sic Bo with Priority 1>6>5, Martingale, Cooldown, Confirm, and Click Ganda
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let betAmount = 1;
    const baseAmount = 1;
    const maxAmount = 32;

    let angkaDipertaruhkan = 0;
    let hasilTerakhir = "";
    let previousResult = [];
    let sedangTaruhan = false;
    let totalMenang = 0;
    let totalKalah = 0;

    function ambilHasilDadu() {
        const dadu = document.querySelectorAll('.result__dice-group .dice');
        if (dadu.length !== 3) return null;

        const hasil = Array.from(dadu).map(el => {
            const match = el.className.match(/dice-XL(\d)/);
            return match ? parseInt(match[1]) : null;
        });

        return hasil.includes(null) ? null : hasil;
    }

    function pilihAngkaUntukBet() {
        const prioritas = [1, 6, 5];
        for (let angka of prioritas) {
            if (previousResult.includes(angka)) return angka;
        }
        return Math.floor(Math.random() * 6) + 1;
    }

    function tampilkanPopup(teks) {
        let box = document.getElementById('popup-sicbo-auto');
        if (!box) {
            box = document.createElement('div');
            box.id = 'popup-sicbo-auto';
            Object.assign(box.style, {
                position: 'fixed',
                bottom: '10px',
                right: '10px',
                background: '#222',
                color: '#0f0',
                padding: '10px',
                fontSize: '14px',
                borderRadius: '10px',
                zIndex: 999999,
                fontFamily: 'monospace',
                whiteSpace: 'pre-line'
            });
            document.body.appendChild(box);
        }
        box.textContent = teks;
    }

    function klikConfirm() {
        const btn = document.querySelector('.btnlist__confirm__title');
        if (btn) {
            btn.click();
            console.log("✅ Klik tombol Confirm");
            tampilkanPopup(`🔁 Menunggu hasil...\nTaruhan: ${angkaDipertaruhkan}`);
        } else {
            console.warn("❌ Tombol Confirm tidak ditemukan");
        }
    }

    function klikTaruhan(angka) {
        const target = document.querySelector(`.dice-one__bet .dice-M${angka}`);
        if (!target) {
            console.warn(`❌ DOM angka ${angka} belum siap, retry...`);
            setTimeout(() => klikTaruhan(angka), 500);
            return;
        }

        const li = target.closest('li');
        if (li) {
            console.log(`🟢 Klik angka taruhan: ${angka} (chip: ${betAmount})`);
            for (let i = 0; i < betAmount; i++) {
                setTimeout(() => {
                    li.click();
                }, i * 150); // delay per klik
            }

            tampilkanPopup(`🟢 BET: ${angka}\n💰 Klik x${betAmount}`);
            setTimeout(klikConfirm, betAmount * 150 + 300);
        }
    }

    function evaluasiHasil(hasil) {
        const hasilStr = hasil.join(',');
        if (hasilStr === hasilTerakhir) return;
        hasilTerakhir = hasilStr;
        previousResult = hasil;

        console.log(`🎲 Hasil dadu: ${hasil.join(', ')} (Taruhan: ${angkaDipertaruhkan})`);

        if (hasil.includes(angkaDipertaruhkan)) {
            console.log("✅ MENANG");
            totalMenang++;
            betAmount = baseAmount;
            tampilkanPopup(`✅ MENANG!\n🎲 ${hasil.join(', ')}\n🧮 Menang: ${totalMenang} | Kalah: ${totalKalah}`);
        } else {
            console.log("❌ KALAH");
            totalKalah++;
            betAmount = Math.min(betAmount * 2, maxAmount);
            tampilkanPopup(`❌ KALAH!\n🎲 ${hasil.join(', ')}\n⬆️ Chip jadi: ${betAmount}\n🧮 Menang: ${totalMenang} | Kalah: ${totalKalah}`);
        }

        sedangTaruhan = false;
    }

    function prosesRondeBaru() {
        if (sedangTaruhan) return;

        const circle = document.querySelector('.ring__svg__circle');
        const style = circle?.getAttribute('style') || "";

        if (style.includes("stroke-dasharray")) {
            console.log("⏳ Cooldown selesai, tunggu 2 detik sebelum bet...");
            sedangTaruhan = true;
            setTimeout(() => {
                angkaDipertaruhkan = pilihAngkaUntukBet();
                klikTaruhan(angkaDipertaruhkan);
            }, 2000);
        }
    }

    function setupObserverHasil() {
        const target = document.querySelector('.result__dice-group');
        if (!target) return;

        const observer = new MutationObserver(() => {
            setTimeout(() => {
                const hasil = ambilHasilDadu();
                if (!hasil) {
                    console.warn("❌ Belum ada hasil dadu.");
                    return;
                }
                console.log(`🎲 [Observer] Deteksi hasil: ${hasil.join(', ')}`);
                evaluasiHasil(hasil);
            }, 500);
        });

        observer.observe(target, { childList: true, subtree: true });
        console.log("🟢 Observer hasil aktif");
    }

    function monitorKemunculanResultGroup() {
        const observer = new MutationObserver(() => {
            const el = document.querySelector('.result__dice-group');
            if (el) {
                console.log("🔄 Memasang ulang observer hasil...");
                setupObserverHasil();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    setInterval(() => {
        const hasil = ambilHasilDadu();
        if (hasil) evaluasiHasil(hasil);
    }, 3000);

    setInterval(prosesRondeBaru, 3000);

    monitorKemunculanResultGroup();
    setupObserverHasil();
})();
