// ==UserScript==
// @name         Pragmatic Roulette Meja Bundar - Markov Chain Tracker
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Analisis Markov Chain untuk memprediksi 3 angka potensial di Roulette Pragmatic
// @author       Gemini Code Assist
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // --- STATE ---
    let state = {
        history: [],
        predictions: [],
        lastProcessedNumber: null,
        isTimerActive: false,
        martingaleStep: 0,
        maxMartingaleStep: 0,
        plannedCenters: [], // Menyimpan 3 titik pusat yang akan diklik
        lastBetNumbers: [],
        isBettingExecuted: false,
        expectingResult: false, // Flag baru untuk menunggu hasil keluar
        panelSynced: false, // Flag untuk membatasi sinkronisasi panel besar
        stats: { wins: 0, losses: 0, profit: 0 }
    };

    // --- CONFIGURATION ---
    const SELECTORS = {
        historyPanel: '[data-testid="game-statistics"]', // Panel history besar
        recentResults: '[data-testid="recent-results"]', // Baris hasil terbaru
        itemSelector: '[data-testid="single-result"]', // Angka hasil
        timer: '[data-testid^="timer-countdown-"]', // Selector countdown timer
        raceTrack: '[data-testid="racetrack"]', // Container Meja Bundar
        doubleBtn: '[data-testid="icon-DoubleBet"]', // Tombol Double
        maxHistory: 1000 // Batas penyimpanan memori agar tidak lambat
    };

    const WHEEL_ORDER = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];

    // --- UI POPUP ---
    let ui = null;

    function initUI() {
        if (ui || document.getElementById('roulette-markov-ui') || !document.body) return;

        ui = document.createElement('div');
        ui.id = 'roulette-markov-ui';
        ui.style = `position:fixed; top:10px; left:10px; z-index:99999; background:rgba(0,0,0,0.9);
                    color:#97ff95; padding:15px; border-radius:10px; font-family:monospace; font-size:12px;
                    border:1px solid #444; width:280px; box-shadow:0 0 15px rgba(0,0,0,0.5); pointer-events:auto;`;
        document.body.appendChild(ui);

        // Tambahkan CSS Animation untuk efek Pulse yang sangat mencolok
        const style = document.createElement('style');
        style.textContent = `
            @keyframes markov-glow-pulse {
                0% { box-shadow: 0 0 10px #2ecc71, inset 0 0 5px #fff; }
                50% { box-shadow: 0 0 25px #2ecc71, inset 0 0 10px #fff; }
                100% { box-shadow: 0 0 10px #2ecc71, inset 0 0 5px #fff; }
            }
            @keyframes markov-yellow-pulse {
                0% { box-shadow: 0 0 15px #f1c40f, inset 0 0 10px #fff; transform: scale(1); }
                50% { box-shadow: 0 0 40px #f1c40f, inset 0 0 20px #fff; transform: scale(1.1); }
                100% { box-shadow: 0 0 15px #f1c40f, inset 0 0 10px #fff; transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }

    function updateUI() {
        if (!ui) return;
        const top3 = state.predictions.slice(0, 3);
        const lastNum = state.history.length > 0 ? state.history[state.history.length - 1] : '-';

        ui.innerHTML = `
            <div style="color:#fff; font-weight:bold; border-bottom:1px solid #333; margin-bottom:8px; display:flex; justify-content:space-between">
                <span>📊 MARKOV ROULETTE</span>
                <span style="color:#fffa77">v1.0</span>
            </div>
            <div style="margin-bottom:10px">
                LAST RESULT: <span style="color:#fff; font-size:16px; font-weight:bold">${lastNum}</span><br>
                DATA POINTS: <span style="color:#aaa">${state.history.length} results</span>
            </div>
            <div style="margin-bottom:10px; display:flex; gap:5px; font-size:11px">
                <div style="flex:1; background:#222; padding:5px; border-radius:3px">
                    W/L: <span style="color:#97ff95">${state.stats.wins}</span> / <span style="color:#ff4444">${state.stats.losses}</span>
                </div>
                <div style="flex:1; background:#222; padding:5px; border-radius:3px">
                    STEP: <span style="color:#fffa77">Lvl ${state.martingaleStep + 1}</span>
                </div>
                <div style="flex:1; background:#222; padding:5px; border-radius:3px">
                    PEAK: <span style="color:#ff4444">Lvl ${state.maxMartingaleStep + 1}</span>
                </div>
            </div>
            <div style="background:#111; padding:8px; border-radius:5px; border:1px solid #222">
                <b style="color:#00ff00">💡 TOP 3 PREDICTIONS:</b><br>
                <div style="margin-bottom:5px; font-size:10px; color:#fffa77; border-bottom:1px solid #333; padding-bottom:3px">
                    BETTING ON: ${state.lastBetNumbers.length > 0 ? state.lastBetNumbers.join(', ') : '-'}
                </div>
                <div style="margin-top:5px; font-size:15px">
                    ${top3.length > 0 ? top3.map((p, i) => `
                        <div style="display:flex; justify-content:space-between; margin-bottom:2px">
                            <span>${i+1}. Angka <b style="color:#fff">${p.num}</b></span>
                            <span style="color:#aaa">${p.count}x muncul</span>
                        </div>
                    `).join('') : '<span style="color:#555">Waiting for data...</span>'}
                </div>
            </div>
            <div style="margin-top:10px; font-size:10px; color:#777">
                *Klik panel history di game untuk memperbanyak data.
            </div>
            <div style="max-height:200px; overflow-y:auto; margin-top:8px; border-top:1px solid #333; padding-top:5px; font-size:10px; color:#aaa; line-height:1.5; word-break:break-all;">
                <b style="color:#77ff77">FULL HISTORY (Newest First):</b><br>
                ${state.history.slice().reverse().join(', ')}
            </div>
        `;
        highlightRacetrack();
    }

    function highlightRacetrack() {
        const tracks = document.querySelectorAll(SELECTORS.raceTrack);
        const track = Array.from(tracks).find(t => t.offsetParent !== null); // Cari racetrack yang sedang tampil
        if (!track) return;

        // Reset semua spot terlebih dahulu (bersihkan highlight lama)
        const allSpots = track.querySelectorAll('[data-bet-code]');
        allSpots.forEach(s => {
            // RESET styles spot
            s.style.setProperty('background-color', '', 'important');
            s.style.setProperty('box-shadow', '', 'important');
            s.style.setProperty('z-index', '', 'important');
            s.style.setProperty('display', '', 'important');

            // Cari elemen teks terdalam yang berisi angka
            const rtText = Array.from(s.querySelectorAll('*')).find(el =>
                el.children.length === 0 && !isNaN(parseInt(el.textContent.trim()))
            );

            if (rtText) {
                // RESET styles rtText
                rtText.style.setProperty('background-color', '', 'important');
                rtText.style.setProperty('box-shadow', '', 'important');
                rtText.style.setProperty('border-radius', '', 'important');
                rtText.style.setProperty('animation', '', 'important');
                rtText.style.setProperty('color', '', 'important');
                rtText.style.setProperty('font-weight', '', 'important');
                rtText.style.setProperty('width', '', 'important');
                rtText.style.setProperty('height', '', 'important');
                rtText.style.setProperty('display', '', 'important');
                rtText.style.setProperty('align-items', '', 'important');
                rtText.style.setProperty('justify-content', '', 'important');
                rtText.style.setProperty('border', '', 'important');
                rtText.style.setProperty('transform', '', 'important');

                const num = parseInt(rtText.textContent.trim());
                if (isNaN(num)) return;

                const isCenter = state.plannedCenters.includes(num);
                const isNeighbor = state.lastBetNumbers.includes(num);

                // JIka angka ada di rencana taruhan
                if (isNeighbor || isCenter) {
                    // Posisikan angka tepat di tengah area bet
                    s.style.setProperty('display', 'flex', 'important');
                    s.style.setProperty('align-items', 'center', 'important');
                    s.style.setProperty('justify-content', 'center', 'important');
                    s.style.setProperty('z-index', isCenter ? '100' : '90', 'important');

                    rtText.style.setProperty('display', 'flex', 'important');
                    rtText.style.setProperty('align-items', 'center', 'important');
                    rtText.style.setProperty('justify-content', 'center', 'important');
                    rtText.style.setProperty('border-radius', '50%', 'important');
                    rtText.style.setProperty('width', isCenter ? '28px' : '24px', 'important');
                    rtText.style.setProperty('height', isCenter ? '28px' : '24px', 'important');

                    if (isCenter) {
                        // ANGKA INTI / CLICK TARGET (Kuning Emas)
                        rtText.style.setProperty('background-color', '#f1c40f', 'important');
                        rtText.style.setProperty('color', '#7c0000', 'important');
                        rtText.style.setProperty('font-weight', '900', 'important');
                        rtText.style.setProperty('box-shadow', '0 0 20px #f1c40f, inset 0 0 10px #fff', 'important');
                        rtText.style.setProperty('animation', 'markov-yellow-pulse 0.8s infinite', 'important');
                        rtText.style.setProperty('border', '2px solid #fff', 'important');
                    } else {
                        // ANGKA TETANGGA / COVERED (Hijau Emerald)
                        rtText.style.setProperty('background-color', '#2ecc71', 'important');
                        rtText.style.setProperty('color', '#4400ff', 'important');
                        rtText.style.setProperty('font-weight', 'bold', 'important');
                        rtText.style.setProperty('box-shadow', '0 0 15px #2ecc71, inset 0 0 10px #fff', 'important');
                        rtText.style.setProperty('animation', 'markov-glow-pulse 1.5s infinite', 'important');
                    }
                }
            }
        });
    }

    // --- HELPER: MERGE SEQUENCES WITHOUT DUPLICATES ---
    function mergeSequences(existing, newData) {
        if (existing.length === 0) return newData;
        if (newData.length === 0) return existing;

        const s1 = existing.join(',');
        const s2 = newData.join(',');

        // 1. Jika salah satu adalah subset dari yang lain (Panel memiliki data memori kita)
        if (s1.includes(s2)) return existing;
        if (s2.includes(s1)) return newData.slice(-SELECTORS.maxHistory);

        // 2. Cari overlap: Akhir 'existing' matches Awal 'newData' (Ada angka baru muncul)
        for (let i = Math.min(existing.length, newData.length); i >= 1; i--) {
            if (s1.endsWith(newData.slice(0, i).join(','))) {
                return [...existing, ...newData.slice(i)].slice(-SELECTORS.maxHistory);
            }
        }

        // 3. Cari overlap: Awal 'existing' matches Akhir 'newData' (Data panel lebih lengkap di belakang)
        for (let i = Math.min(existing.length, newData.length); i >= 1; i--) {
            if (s2.endsWith(existing.slice(0, i).join(','))) {
                return [...newData, ...existing.slice(i)].slice(-SELECTORS.maxHistory);
            }
        }

        // 4. Fallback jika tidak ada overlap sama sekali
        return newData.length >= existing.length ? newData : existing;
    }

    // --- DATA SCRAPER ---
    function extractNumbers(isNewRoundTrigger) {
        const getNumbersFromContainer = (container) => {
            if (!container) return [];

            const items = Array.from(container.querySelectorAll(SELECTORS.itemSelector));
            const results = items.map(item => {
                const val = parseInt(item.textContent.trim());
                if (!isNaN(val) && val >= 0 && val <= 36) return val;
                return NaN;
            }).filter(n => !isNaN(n));
            return results;
        };

        // Cari elemen overscrollable yang benar-benar berisi item data
        const panels = document.querySelectorAll(SELECTORS.historyPanel);
        const historyContainer = panels.length > 0 ? Array.from(panels).find(p => p.querySelector(SELECTORS.itemSelector)) : null;

        const recentContainer = document.querySelector(SELECTORS.recentResults);

        return {
            panel: getNumbersFromContainer(historyContainer).reverse(),
            bar: getNumbersFromContainer(recentContainer).reverse()
        };
    }

    // --- MARKOV LOGIC ---
    function calculateMarkov() {
        if (state.history.length < 2) return;

        const latestNum = state.history[state.history.length - 1];
        const tallies = {};

        // Cari setiap kemunculan latestNum dalam sejarah (kecuali indeks terakhir)
        for (let i = 0; i < state.history.length - 1; i++) {
            if (state.history[i] === latestNum) {
                const nextNum = state.history[i + 1];
                tallies[nextNum] = (tallies[nextNum] || 0) + 1;
            }
        }

        // Ubah map menjadi array dan urutkan berdasarkan frekuensi tertinggi
        const sorted = Object.entries(tallies)
            .map(([num, count]) => ({ num: parseInt(num), count }))
            .sort((a, b) => b.count - a.count);

        state.predictions = sorted;
    }

    // --- NEW: CALCULATE BET PLAN ---
    function calculateBetPlan() {
        if (state.predictions.length === 0) {
            state.plannedCenters = [];
            state.lastBetNumbers = [];
            return;
        }

        const covered = new Set();
        const centers = [];

        for (const pred of state.predictions) {
            if (centers.length >= 3) break;
            const neighbors = get5Neighbors(pred.num);
            const hasOverlap = neighbors.some(n => covered.has(n));
            if (!hasOverlap) {
                centers.push(pred.num);
                neighbors.forEach(n => covered.add(n));
            }
        }
        console.log(`%c📝 Bet Plan Updated: Centers [${centers.join(', ')}]`, "color: #aaa");
        state.plannedCenters = centers;
        state.lastBetNumbers = Array.from(covered);
    }

    // --- BETTING LOGIC ---
    function get5Neighbors(num) {
        const idx = WHEEL_ORDER.indexOf(num);
        if (idx === -1) return [];
        const neighbors = [];
        for (let i = -2; i <= 2; i++) {
            let targetIdx = (idx + i) % WHEEL_ORDER.length;
            if (targetIdx < 0) targetIdx += WHEEL_ORDER.length;
            neighbors.push(WHEEL_ORDER[targetIdx]);
        }
        return neighbors;
    }

    async function bypassClick(el) {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        const win = el.ownerDocument.defaultView || window;

        const eventParams = {
            clientX: x, clientY: y,
            view: win, bubbles: true, cancelable: true,
            pointerId: 1, width: 1, height: 1, pressure: 0.5,
            pointerType: "mouse", isPrimary: true, buttons: 1
        };

        el.dispatchEvent(new PointerEvent('pointerover', eventParams));
        el.dispatchEvent(new PointerEvent('pointerenter', eventParams));
        await new Promise(r => setTimeout(r, 100));

        el.dispatchEvent(new PointerEvent('pointerdown', eventParams));
        el.dispatchEvent(new MouseEvent('mousedown', { ...eventParams, buttons: 1, which: 1 }));
        await new Promise(r => setTimeout(r, 50));

        el.dispatchEvent(new PointerEvent('pointerup', eventParams));
        el.dispatchEvent(new MouseEvent('mouseup', { ...eventParams, buttons: 1, which: 1 }));
        el.dispatchEvent(new MouseEvent('click', { ...eventParams, buttons: 1, which: 1 }));
    }

    async function executeAutoBet() {
        if (state.isBettingExecuted || state.plannedCenters.length === 0) return;
        state.isBettingExecuted = true;

        // Cari Race Track yang sedang aktif tampil
        const track = Array.from(document.querySelectorAll(SELECTORS.raceTrack)).find(el => el.offsetParent !== null);
        if (!track) {
            console.warn("⚠️ Race Track tidak ditemukan (mungkin sedang tertutup).");
            state.isBettingExecuted = false;
            return;
        }

        // Jeda sinkronisasi agar UI game siap menerima input
        await new Promise(r => setTimeout(r, 500));

        console.log(`%c🚀 Auto Bet Executing: ${state.plannedCenters.join(', ')}`, "color: #fffa77; font-weight: bold;");

        // 1. Klik Angka di Racetrack (Mencocokkan visual text)
        for (const num of state.plannedCenters) {
            const allSpots = Array.from(track.querySelectorAll('[data-bet-code]'));
            const targetSpot = allSpots.find(s => {
                return Array.from(s.querySelectorAll('*')).some(el =>
                    el.children.length === 0 && el.textContent.trim() === num.toString()
                );
            });

            if (targetSpot) {
                console.log(`🎯 Clicking number: ${num}`);
                await bypassClick(targetSpot);
                await new Promise(r => setTimeout(r, 250)); // Jeda antar bet agar server mendaftar dengan benar
            } else {
                console.warn(`⚠️ Spot untuk angka ${num} tidak ditemukan di racetrack.`);
            }
        }

        // 2. Martingale (Gunakan Tombol Double)
        if (state.martingaleStep > 0) {
            const doubleIcon = document.querySelector(SELECTORS.doubleBtn);
            const doubleBtn = doubleIcon ? (doubleIcon.closest('button') || doubleIcon.closest('[role="button"]') || doubleIcon.parentElement) : null;
            if (doubleBtn) {
                for (let i = 0; i < state.martingaleStep; i++) {
                    await bypassClick(doubleBtn);
                    await new Promise(r => setTimeout(r, 200));
                }
                console.log(`%c💰 Martingale Applied: ${state.martingaleStep}x Double`, "color: #97ff95");
            }
        }

        // 3. Konfirmasi Taruhan (Jika ada tombol confirm yang harus diklik)
        const confirmBtn = document.querySelector('[data-testid="button-confirm"]') || document.querySelector('[data-testid="confirm-button"]');
        if (confirmBtn && confirmBtn.offsetParent !== null && !confirmBtn.disabled) {
            await bypassClick(confirmBtn);
            console.log("%c✅ Taruhan Terkonfirmasi", "color: #97ff95");
        }
    }

    function evaluateLastRound(newResult) {
        if (state.lastBetNumbers.length === 0) return;

        const isWin = state.lastBetNumbers.includes(newResult);
        if (isWin) {
            console.log("%c🏆 WIN DETECTED!", "color: #97ff95; font-weight: bold;");
            state.stats.wins++;
            state.martingaleStep = 0;
        } else {
            console.log("%c💀 LOSS DETECTED!", "color: #ff4444; font-weight: bold;");
            state.stats.losses++;
            state.martingaleStep++;
            if (state.martingaleStep > state.maxMartingaleStep) state.maxMartingaleStep = state.martingaleStep;
            if (state.martingaleStep > 8) state.martingaleStep = 0; // Safety reset
        }
    }

    // --- MAIN LOOP ---
    setInterval(async () => {
        // Pastikan UI diinisialisasi sesegera mungkin tanpa menunggu data
        if (!ui) initUI();

        // 1. Deteksi fase taruhan berdasarkan keberadaan elemen countdown di DOM
        const allTimerSpans = document.querySelectorAll(SELECTORS.timer);
        const timerVisible = allTimerSpans.length > 0;

        // Deteksi nilai detik secara spesifik dari span yang sedang aktif (visible)
        let activeTimerEl = null;
        let countdownVal = NaN;
        const triggerSeconds = [2, 4, 5]; // Detik pemicu taruhan

        // Cari elemen countdown yang benar-benar aktif (terlihat)
        // Kita cek prioritas detik pemicu terlebih dahulu
        for (const sec of triggerSeconds) {
            const el = document.querySelector(`[data-testid="timer-countdown-${sec}"]`);
            if (el && (el.offsetParent !== null || el.getClientRects().length > 0)) {
                activeTimerEl = el;
                countdownVal = sec;
                break;
            }
        }

        // Fallback: Jika detik pemicu belum ada, cari detik lain untuk update UI
        if (!activeTimerEl) {
            const anyTimer = document.querySelector('[data-testid^="timer-countdown-"]');
            if (anyTimer && (anyTimer.offsetParent !== null || anyTimer.getClientRects().length > 0)) {
                activeTimerEl = anyTimer;
                const match = anyTimer.getAttribute('data-testid').match(/\d+/);
                countdownVal = match ? parseInt(match[0]) : NaN;
            }
        }

        let isNewRoundTrigger = false;
        // Timer muncul = Ronde baru/Fase taruhan dimulai
        if (timerVisible && !state.isTimerActive) {
            isNewRoundTrigger = true;
            state.isBettingExecuted = false;
            state.expectingResult = true; // Tandai kita menunggu hasil dari putaran barusan
            state.panelSynced = false; // Reset agar bisa sync panel lagi jika diperlukan
        }
        state.isTimerActive = timerVisible;

        // --- 1. DATA SCANNING ---
        const rawData = extractNumbers();
        let freshData = [...state.history];
        const newestInBar = rawData.bar[rawData.bar.length - 1];
        const lastStored = freshData[freshData.length - 1];

        // --- LOGIKA INITIAL LOAD ---
        if (state.history.length === 0 && (rawData.panel.length > 0 || rawData.bar.length > 0)) {
            state.history = rawData.panel.length > 0 ? rawData.panel : rawData.bar;
            state.lastProcessedNumber = state.history[state.history.length - 1];
            state.expectingResult = false;
            calculateMarkov(); // Hitung prediksi segera setelah load
            calculateBetPlan(); // Siapkan angka yang akan dibet
            if (rawData.panel.length > 0) state.panelSynced = true;
            updateUI();
            return;
        }

        // 1. Sinkronisasi Panel (Hanya satu kali per ronde jika terdeteksi)
        if (rawData.panel.length > 0 && !state.panelSynced) {
            console.log("📥 Big Sync from History Panel...");
            freshData = mergeSequences(freshData, rawData.panel);
            state.panelSynced = true;
        }

        // 2. Deteksi Angka Baru (Termasuk Twin)
        if (state.expectingResult && newestInBar !== undefined) {
            // Kasus A: Angka berubah (Result baru muncul)
            if (newestInBar !== lastStored) {
                console.log(`🎰 New Result Detected: ${newestInBar}`);
                freshData = mergeSequences(freshData, rawData.bar);
                state.expectingResult = false;
            }
            // Kasus B: Timer hilang (Betting Closed) tapi angka belum masuk
            else if (!timerVisible && state.isTimerActive) {
                 // Paksa ambil data terbaru dari bar saat transisi tutup
                 freshData = mergeSequences(freshData, rawData.bar);
            }
            // Kasus B: Angka tetap sama tapi timer sudah jalan (Twin/Kembar)
            // Kita tunggu sampai ada tanda countdown aktif untuk memastikan UI benar-benar tidak berubah
            else if (newestInBar === lastStored && !isNaN(countdownVal) && countdownVal <= 15) {
                console.log(`🎲 Twin Number Detected: ${newestInBar}`);
                freshData = [...freshData, newestInBar].slice(-SELECTORS.maxHistory);
                state.expectingResult = false;
            }
        }

        // 3. Update State & UI
        if (freshData.length !== state.history.length) {
                console.log("🔄 New data/update detected. Recalculating...");
                evaluateLastRound(freshData[freshData.length - 1]);
                state.history = freshData;
                state.lastProcessedNumber = freshData[freshData.length - 1];
                calculateMarkov();
                calculateBetPlan(); // Perbarui rencana bet setiap ada angka baru
                updateUI();
        }

        // --- 2. BETTING EXECUTION ---
        // Trigger betting pada detik spesifik (5, 4, atau 2) saat elemen span muncul aktif
        if (timerVisible && !state.isBettingExecuted && triggerSeconds.includes(countdownVal)) {
            console.log(`🕒 Bet Triggered at Second: ${countdownVal}`);
            if (state.plannedCenters.length > 0) {
                executeAutoBet();
            }
        }

        updateUI();
    }, 300); // Polling dipercepat untuk respon yang lebih akurat

    console.log("%c✔️ Roulette Markov Bot Active", "color:black; background:#97ff95; padding:5px; font-weight:bold;");
})();
