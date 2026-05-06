// ==UserScript==
// @name         Pragmatic Sicbo - Markov Chain Bot
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Markov Chain + Conditional Martingale for Sicbo
// @author       Gemini Code Assist
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // --- KONFIGURASI ---
    const config = {
        maxHistory: 100, // Batas maksimal riwayat yang disimpan
        unitValue: 1000,
        martingale: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048], // Deret Martingale
        betDelay: 30, // DIPERCEPAT: Jeda antar klik chip
        triggerMissing: 12 // Pemicu cadangan (Missing Streak)
    };

    // --- STATE ---
    let resultHistory = [];

    let state = {
        lastProcessedHash: null,
        initialScanDone: false,
        isBetActive: false,
        isWaitingForTrigger: true, // Flag baru untuk status monitoring
        targetBets: [], // Menyimpan semua angka yang akan dipasang
        stats: { profit: 0, wins: 0, losses: 0 },
        currentStep: 0, // Level Martingale saat ini
        timeLeft: null,
        missingStreak: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
        markovScores: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
        markovTallies: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
        lastMarkovMatches: 0,
        bestMarkovNum: null // Menyimpan angka dengan probabilitas terendah
    };

    // --- UI POPUP ---
    let ui = null;

    function initUI() {
        if (ui) return;
        ui = document.getElementById('sicbo-bot-ui');
        if (!ui) {
            ui = document.createElement('div');
            ui.id = 'sicbo-bot-ui';
            ui.style = `position:fixed; bottom:20px; left:20px; z-index:10000; background:rgba(0,0,0,0.85);
                        color:#00ff00; padding:15px; border-radius:10px; font-family:monospace; font-size:12px;
                        border:1px solid #444; width:340px; max-height:600px; overflow-y:auto; box-shadow:0 0 15px rgba(0,0,0,0.5);`;
            document.body.appendChild(ui);
        }
    }

    function updateUI() {
        if (!ui) return; // Jangan update jika UI belum dibuat
        const formatRow = (h) => (
            `<div style="border-bottom:1px solid #222; padding:4px 0; display:flex; justify-content:space-between">
                <span>[${h.sum}] <b style="color:${h.type === 'Big' ? '#fffa77' : h.type === 'Small' ? '#97ff95' : '#ff4444'}">${h.type}</b></span>
                <span style="color:#777; font-size:10px">(${h.dice.join(',')})</span>
            </div>`
        );

        const streakHTML = Object.entries(state.missingStreak).map(([num, count]) =>
            `<div style="flex:1; text-align:center; border:1px solid #333; margin:1px; background:${count >= config.triggerMissing ? '#442200' : 'transparent'}">
                ${num}<br><span style="color:#fffa77">${count}</span>
             </div>`
        ).join('');

        const markovHTML = Object.entries(state.markovScores).map(([num, score]) => {
            const tally = state.markovTallies[num] || 0;
            return `<div style="flex:1; text-align:center; border:1px solid #333; margin:1px; background:${state.bestMarkovNum == num ? '#004400' : 'transparent'}">
                ${num}<br>
                <span style="color:#aaa; font-size:9px">${tally}x</span><br>
                <span style="color:#97ff95">${(score * 100).toFixed(0)}%</span>
             </div>`;
        }).join('');

        let historyHTML = resultHistory.slice().reverse().map(formatRow).join('');

        ui.innerHTML = `
            <div style="color:#fff; font-weight:bold; border-bottom:1px solid #333; margin-bottom:5px; display:flex; justify-content:space-between">
                <span>🎲 PRAGMATIC SICBO BOT</span>
                <span style="color:#aaa; font-size:10px">Matches: ${state.lastMarkovMatches}</span>
            </div>
            <div style="margin-bottom:10px">
                PROFIT: <span style="color:${state.stats.profit >= 0 ? '#00ff00' : '#ff4444'}">Rp ${state.stats.profit.toLocaleString()}</span><br>
                W/L: <span style="color:#97ff95">${state.stats.wins}W</span> / <span style="color:#ff4444">${state.stats.losses}L</span><br>
                LEVEL: <span style="color:#fffa77">Lvl ${state.currentStep + 1} (${config.martingale[state.currentStep] || 1}x)</span><br>
                SISA WAKTU: <span style="color:#97ff95">${state.timeLeft !== null ? state.timeLeft : '0'}s</span><br>
                STATUS: <span style="color:#fffa77">${state.isBetActive ? 'Bet Terpasang' : state.isWaitingForTrigger ? 'Mencari Pola...' : 'Pola Ketemu (Siap Bet)'}</span><br>
                TARGET: <span style="color:#fff">${state.targetBets.length > 0 ? state.targetBets.join(', ') : '-'}</span>
            </div>
            <div style="background:#111; padding:5px; margin-bottom:5px; border-radius:5px; font-size:10px">
                <b>STREAK / MARKOV SCORE:</b>
                <div style="display:flex; margin-top:3px">${streakHTML}</div>
                <div style="display:flex; margin-top:2px">${markovHTML}</div>
            </div>
            <div style="border-top:1px solid #333; padding-top:5px">
                <b style="color:#00ff00">📊 DATA HISTORY (${resultHistory.length}/${config.maxHistory})</b>
                <div style="max-height:300px; overflow-y:auto; margin:5px 0; background:rgba(255,255,255,0.05); padding:3px; border-radius:5px">
                    ${historyHTML || '<div style="color:#555; text-align:center; padding:10px">Scanning web data...</div>'}
                </div>
            </div>
        `;
    }

    // --- PARSER ---
    function getPairs(dice) {
        let pairs = [];
        for (let i = 0; i < dice.length; i++) {
            for (let j = i + 1; j < dice.length; j++) {
                let p = [dice[i], dice[j]].sort();
                pairs.push(p.join('-'));
            }
        }
        return [...new Set(pairs)]; // Hanya ambil kombinasi unik
    }

    function parseSlide(slide) {
        const dice0 = slide.querySelector('[data-testid="single-result-die-0"]');
        const dice1 = slide.querySelector('[data-testid="single-result-die-1"]');
        const dice2 = slide.querySelector('[data-testid="single-result-die-2"]');
        const sumEl = slide.querySelector('[data-testid="single-result-sum"]');

        if (!dice0 || !dice1 || !dice2 || !sumEl) return null;

        const dice = [
            parseInt(dice0.textContent),
            parseInt(dice1.textContent),
            parseInt(dice2.textContent)
        ];
        const sum = parseInt(sumEl.textContent);

        let type = '';
        if (sum >= 4 && sum <= 10) type = 'Small';
        else if (sum >= 11 && sum <= 17) type = 'Big';
        else type = 'Triple';

        return { dice, sum, type, hash: dice.join(',') + '-' + sum };
    }

    function scanExistingRoadmap() {
        const container = document.querySelector('[data-testid="inline-recent-results-container"]');
        if (!container) return false;

        const items = Array.from(container.querySelectorAll('[data-testid^="result-item-"]'));
        if (items.length === 0) return false;

        const parsedResults = [];
        items.forEach(item => {
            const res = parseSlide(item);
            if (res) parsedResults.push(res);
        });

        // Di Pragmatic, result-item-0 adalah yang terbaru.
        // Kita balik agar urutannya kronologis (Lama -> Baru) untuk analisis Markov.
        parsedResults.reverse();

        resultHistory = []; // Bersihkan memori internal bot (Fresh Start)
        initUI(); // Buat UI karena data ditemukan
        parsedResults.forEach(res => {
            updateMissingStreaks(res);
            resultHistory.push(res);
        });

        if (resultHistory.length > config.maxHistory) resultHistory.splice(0, resultHistory.length - config.maxHistory);

        analyzeMarkov();
        updateUI();
        return true;
    }

    async function betOnNumber(targetText) {
        // 1. Cari semua elemen bet-spot
        const allSpots = document.querySelectorAll('[data-testid="bet-spot"]');

        // 2. Temukan spot yang memiliki teks sesuai (misal: "TIGA", "ENAM")
        let targetEl = null;
        for (const el of allSpots) {
            if (el.innerText.includes(targetText)) {
                targetEl = el;
                break;
            }
        }

        if (!targetEl) {
            console.log(`Angka ${targetText} tidak ditemukan!`);
            return;
        }

        // 3. Jalankan fungsi bypassClick pada elemen tersebut
        console.log(`Melakukan klik pada: ${targetText}`);
        await bypassClick(targetEl);
    }

    // Fungsi bypassClick yang sudah dimodifikasi sedikit agar menerima elemen langsung
    async function bypassClick(el) {
        const rect = el.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        const eventParams = {
            clientX: x, clientY: y,
            view: window, bubbles: true, cancelable: true,
            pointerId: 1, width: 1, height: 1, pressure: 0.5,
            pointerType: "mouse", isPrimary: true
        };

        el.dispatchEvent(new PointerEvent('pointerover', eventParams));
        el.dispatchEvent(new PointerEvent('pointerenter', eventParams));
        await new Promise(r => setTimeout(r, 100));

        el.dispatchEvent(new PointerEvent('pointerdown', eventParams));
        el.dispatchEvent(new MouseEvent('mousedown', { ...eventParams, buttons: 1 }));
        await new Promise(r => setTimeout(r, 50));

        el.dispatchEvent(new PointerEvent('pointerup', eventParams));
        el.dispatchEvent(new MouseEvent('mouseup', { ...eventParams, buttons: 1 }));
        el.dispatchEvent(new MouseEvent('click', { ...eventParams, buttons: 1 }));
    }



    // --- MARKOV & LOGIC ---
    function analyzeMarkov() {
        if (resultHistory.length < 5) {
            state.markovScores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
            state.markovTallies = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
            state.lastMarkovMatches = 0;
            return [];
        }
        const lastResult = resultHistory[resultHistory.length - 1];
        const targetPairs = getPairs(lastResult.dice);

        let tallies = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
        let matchCount = 0;

        // Mencari berdasarkan 3 kombinasi pasangan dari result terakhir
        targetPairs.forEach(tp => {
            // Scan riwayat (kecuali yang paling terakhir karena kita butuh data "setelahnya")
            for (let i = 0; i < resultHistory.length - 1; i++) {
                const historicalPairs = getPairs(resultHistory[i].dice);

                if (historicalPairs.includes(tp)) {
                    matchCount++;
                    const nextResult = resultHistory[i + 1];
                    nextResult.dice.forEach(die => {
                        tallies[die]++;
                    });
                }
            }
        });

        state.lastMarkovMatches = matchCount;
        if (matchCount === 0) {
            state.markovScores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
            state.markovTallies = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
            return [];
        }

        let bestNum = null;
        let lowestProb = 999; // Inisialisasi angka tinggi
        let newScores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
        state.markovTallies = { ...tallies };

        for (let num = 1; num <= 6; num++) {
            // Probabilitas = Muncul Berapa Kali / Total Match Pasangan
            const prob = tallies[num] / matchCount;
            newScores[num] = prob;

            // Strategi Baru: Cari persentase PALING RENDAH
            if (prob < lowestProb) {
                lowestProb = prob;
                bestNum = num;
            }
            // Tie-break: Jika ada dua yang sama-sama rendah (misal sama-sama 0%),
            // pilih yang Missing Streak-nya lebih tinggi (lebih lama tidak muncul)
            else if (prob === lowestProb && bestNum !== null) {
                if (state.missingStreak[num] > state.missingStreak[bestNum]) {
                    bestNum = num;
                }
            }
        }
        state.markovScores = newScores;
        state.bestMarkovNum = bestNum;

        if (bestNum !== null) {
            console.log(`%c📊 Markov Found (Lowest): ${bestNum} (${(lowestProb * 100).toFixed(0)}%)`, "color: #97ff95");
            return [bestNum];
        }

        return [];
    }

    function updateMissingStreaks(res) {
        for (let i = 1; i <= 6; i++) {
            if (res.dice.includes(i)) {
                state.missingStreak[i] = 0;
            } else {
                state.missingStreak[i]++;
            }
        }
    }

    function processNewResult(res) {
        updateMissingStreaks(res);

        // 1. Evaluasi Target Putaran Sebelumnya terhadap Result Baru
        if (state.targetBets.length > 0) {
            let roundProfit = 0;
            const currentMultiplier = config.martingale[state.currentStep] || 1;
            const betAmountPerNum = config.unitValue * currentMultiplier;

            let isWin = false;
            state.targetBets.forEach(num => {
                const hitCount = res.dice.filter(d => d === num).length;
                if (hitCount > 0) {
                    // Menang: Payout 1:1 per dadu yang cocok (bersih)
                    const winAmt = betAmountPerNum * hitCount;
                    roundProfit += winAmt;
                    console.log(`%c🎯 [WIN] Num ${num} (${hitCount}x) : +${winAmt.toLocaleString()}`, "color: #97ff95; font-weight: bold;");
                    isWin = true;
                } else {
                    // Kalah: -1 unit
                    roundProfit -= betAmountPerNum;
                    console.log(`%c💀 [LOSE] Num ${num} : -${betAmountPerNum.toLocaleString()}`, "color: #ff4444;");
                }
            });

            state.stats.profit += roundProfit;

            if (isWin) {
                state.stats.wins++;
                state.currentStep = 0; // Reset Martingale saat menang
            } else {
                state.stats.losses++;
                state.currentStep++; // Naikkan Martingale saat kalah
                if (state.currentStep >= config.martingale.length) state.currentStep = 0;
            }

            console.log(`%c💰 ROUND PROFIT: ${roundProfit >= 0 ? '+' : ''}${roundProfit.toLocaleString()} | TOTAL: ${state.stats.profit.toLocaleString()}`, "color: #00ff00; font-weight: bold;");

            // Reset State Betting setelah evaluasi selesai
            state.isBetActive = false;
            state.isWaitingForTrigger = true;
            state.targetBets = [];
        }

        resultHistory.push(res);
        if (resultHistory.length > config.maxHistory) {
            resultHistory.shift();
        }

        // 2. Selalu update skor Markov untuk tampilan UI
        const markovSuggestion = analyzeMarkov();

        // 3. Filter Trigger (Hanya jika sedang monitoring)
        if (state.isWaitingForTrigger) {
            let triggerList = [];

            // 1. Prioritas Markov (Persentase Terendah)
            if (markovSuggestion.length > 0) {
                triggerList = markovSuggestion;
            }
            // 2. Backup: Missing Streak (Jika Markov tidak ada)
            else {
                for (let i = 1; i <= 6; i++) {
                    if (state.missingStreak[i] >= config.triggerMissing) triggerList.push(i);
                }
            }

            if (triggerList.length > 0) {
                // Ambil hanya satu angka (index 0) jika ada beberapa pemicu
                state.targetBets = [triggerList[0]];
                state.isWaitingForTrigger = false;
                console.log(`%c🔥 MODE BETTING AKTIF: [${state.targetBets[0]}]`, "color: #fffa77; font-weight:bold");
            }
        }

        // Pindahkan ke paling bawah agar UI merefleksikan status MODE terbaru
        updateUI();
    }

    // --- BETTING EXECUTION ---
    // Fungsi bypassClick sesuai input user
    async function bypassClick(el) {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        const eventParams = {
            clientX: x, clientY: y,
            view: window, bubbles: true, cancelable: true,
            pointerId: 1, width: 1, height: 1, pressure: 0.5,
            pointerType: "mouse", isPrimary: true
        };

        el.dispatchEvent(new PointerEvent('pointerover', eventParams));
        el.dispatchEvent(new PointerEvent('pointerenter', eventParams));
        await new Promise(r => setTimeout(r, 20)); // DIPERCEPAT: Jeda setelah hover

        el.dispatchEvent(new PointerEvent('pointerdown', eventParams));
        el.dispatchEvent(new MouseEvent('mousedown', { ...eventParams, buttons: 1 }));
        await new Promise(r => setTimeout(r, 20)); // DIPERCEPAT: Jeda tekan (hold)

        el.dispatchEvent(new PointerEvent('pointerup', eventParams));
        el.dispatchEvent(new MouseEvent('mouseup', { ...eventParams, buttons: 1 }));
        el.dispatchEvent(new MouseEvent('click', { ...eventParams, buttons: 1 }));
    }

    async function ensureChipSelected() {
        const chipElements = Array.from(document.querySelectorAll('[data-testid^="chip-"]'));
        const active = chipElements.find(c => c.getAttribute('aria-selected') === 'true' || c.classList.contains('selected'));

        if (!active && chipElements.length > 0) {
            console.log("🪙 Chip belum terpilih. Memilih chip pertama...");
            await bypassClick(chipElements[0]);
            await new Promise(r => setTimeout(r, 400));
        }
    }

    async function placeBet(num, multiplier) {
        const targetMap = { 1: "SATU", 2: "DUA", 3: "TIGA", 4: "EMPAT", 5: "LIMA", 6: "ENAM" };
        const targetText = targetMap[num];
        const allSpots = document.querySelectorAll('[data-testid="bet-spot"]');
        let targetEl = null;
        allSpots.forEach(el => {
            if (el.innerText.includes(targetText)) targetEl = el;
        });

        if (!targetEl) {
            console.log(`Angka ${targetText} tidak ditemukan!`);
            return false;
        }

        console.log(`Betting: ${targetText} (x${multiplier})`);
        for (let i = 0; i < multiplier; i++) {
            await bypassClick(targetEl);
            await new Promise(r => setTimeout(r, config.betDelay));
        }
        return true;
    }

    async function performBettingAction(targets, multiplier) {
        // Cari elemen bet-spot dulu untuk memastikan kita di frame yang benar
        const hasSpots = document.querySelector('[data-testid="bet-spot"]');
        if (!hasSpots) return false;

        console.log(`%c🚀 Mengeksekusi taruhan...`, "color: #fffa77; font-weight: bold;");

        await ensureChipSelected();

        let successCount = 0;
        for (const num of targets) {
            if (await placeBet(num, multiplier)) successCount++;
        }

        if (successCount > 0) {
            await new Promise(r => setTimeout(r, 50)); // DIPERCEPAT: Jeda sebelum konfirmasi
            const confirmBtn = document.querySelector('[data-testid="button-confirm"]') ||
                document.querySelector('[data-testid="confirm-button"]');
            if (confirmBtn) {
                await bypassClick(confirmBtn);
                console.log("%c✅ Terkonfirmasi", "color: #97ff95; font-weight: bold;");
            }
            return true;
        }
        return false;
    }

    async function executeAllBets() {
        if (state.targetBets.length === 0 || state.isBetActive) return;

        // Kunci segera di awal untuk mencegah re-entry dari interval berikutnya
        state.isBetActive = true;

        try {
            const success = await performBettingAction(state.targetBets, config.martingale[state.currentStep] || 1);

            if (!success) {
                state.isBetActive = false; // Lepas kunci jika frame ini tidak bisa melakukan bet
                console.log("⏳ Mencari area betting...");
            }
        } catch (err) {
            console.error("⚠️ Error saat eksekusi bet:", err);
            state.isBetActive = false; // Buka kunci jika error agar bisa mencoba lagi
        }
    }

    // --- MAIN LOOP ---
    setInterval(() => {
        // Auto-resume video Pragmatic Play (Selector Fixed)
        const resumeBtn = document.querySelector('[data-testid="video-resume-panel"] button');
        if (resumeBtn) {
            resumeBtn.click();
        }

        // Deteksi hasil terbaru di Pragmatic (result-item-0)
        const latestItem = document.querySelector('[data-testid="result-item-0"]');
        if (latestItem) {
            const res = parseSlide(latestItem);
            if (res && state.lastProcessedHash !== res.hash) {
                state.lastProcessedHash = res.hash;
                processNewResult(res);
            }
        }

        // Initial Scan
        if (!state.initialScanDone) {
            if (scanExistingRoadmap()) {
                state.initialScanDone = true;
                const latest = document.querySelector('[data-testid="result-item-0"]');
                const res = latest ? parseSlide(latest) : null;
                if (res) {
                    state.lastProcessedHash = res.hash;
                    // Langsung cek trigger setelah scan agar tidak perlu tunggu putaran depan
                    const currentSuggestion = analyzeMarkov();
                    if (currentSuggestion.length > 0) {
                        state.targetBets = [currentSuggestion[0]];
                        state.isWaitingForTrigger = false;
                    }
                    updateUI();
                }
                console.log(`📊 Berhasil memuat ${resultHistory.length} riwayat Pragmatic.`);
            }
        }

        // Betting phase: Cek countdown jika ada (asumsi elemen ada)
        const timerElements = document.querySelectorAll('[data-testid^="timer-countdown-"]');
        const timerContainer = document.querySelector('[data-testid="round-timer"]');
        let localTimeLeft = NaN;

        if (timerContainer && timerElements.length > 0) {
            const containerRect = timerContainer.getBoundingClientRect();
            const centerY = containerRect.top + containerRect.height / 2;

            let closest = null;
            let minDiff = Infinity;

            for (let el of timerElements) {
                const rect = el.getBoundingClientRect();
                const diff = Math.abs((rect.top + rect.height / 2) - centerY);
                // Cari elemen yang paling dekat dengan titik tengah visual timer
                if (diff < minDiff && el.offsetParent !== null) {
                    minDiff = diff;
                    closest = el;
                }
            }
            if (closest) {
                const val = parseInt(closest.textContent);
                if (!isNaN(val)) localTimeLeft = val;
            }
        }

        state.timeLeft = isNaN(localTimeLeft) ? null : localTimeLeft;

        // Eksekusi taruhan jika waktu tersisa memadai
        if (typeof state.timeLeft === 'number' && state.timeLeft <= 7 && state.timeLeft >= 2) {
            if (!state.isWaitingForTrigger && state.targetBets.length > 0 && !state.isBetActive) {
                console.log(`⏰ Sisa waktu: ${state.timeLeft}s. Menjalankan bet...`);
                executeAllBets();
            }
        }

        // Tambahkan pemanggilan updateUI agar tampilan sisa waktu di popup terus berubah
        updateUI();
    }, 300); // Polling ditingkatkan menjadi 300ms agar responsif terhadap timer singkat

    console.log("✅ Sicbo Markov Bot Active");
})();
