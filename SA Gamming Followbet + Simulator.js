// ==UserScript==
// @name         SA Gaming Roulette - Follow Dozen & Column Fibonacci
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Follow last dozen and column results on SA Gaming Roulette
// @author       Gemini Code Assist
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // --- KONFIGURASI ---
    const progression = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765];
    const betTargetRange = { max: 27, min: 2 }; // Diperlebar agar tidak meleset saat lag
    const waitStreak = 1; // Ubah ke 0 jika ingin langsung betting di Step 1 setelah result keluar aa 
    const unitValue = 10000; // 1 unit = Rp 10.000

    // --- STATE ---
    let state = {
        dozen: { step: 0, lastTarget: null, status: "Idle", maxStep: 0, currentBet: 0 },
        column: { step: 0, lastTarget: null, status: "Idle", maxStep: 0, currentBet: 0 },
        lastResult: null,
        lastBeadElement: null, // Menyimpan referensi elemen bead terakhir
        lastRoadmapCount: 0,
        isWaitingForSpin: false,
        totalProfitUnits: 0,
        maxCapitalUnits: 0,
        lastBetTime: 0 // Mencegah double bet di detik yang sama
    };

    // --- SELECTORS (SA Gaming Specific) ---
    const SELECTORS = {
        roadmap: '.roulette-roadmap-container svg',
        countdown: '.rwd-countdown-container p',
        dozen: {
            1: 'path[name*="1,2,3,4,5,6,7,8,9,10,11,12"]',
            2: 'path[name*="13,14,15,16,17,18,19,20,21,22,23,24"]',
            3: 'path[name*="25,26,27,28,29,30,31,32,33,34,35,36"]'
        },
        column: {
            1: 'path[name*="1,4,7,10,13,16,19,22,25,28,31,34"]',
            2: 'path[name*="2,5,8,11,14,17,20,23,26,29,32,35"]',
            3: 'path[name*="3,6,9,12,15,18,21,24,27,30,33,36"]'
        }
    };

    // --- UI POPUP ---
    const menu = document.createElement('div');
    menu.style = `position:fixed; top:10px; right:10px; z-index:9999; background:rgba(0,0,0,0.8);
                  color:white; padding:15px; border-radius:8px; font-family:monospace; min-width:200px;
                  border: 1px solid #97ff95; box-shadow: 0 0 10px rgba(0,0,0,0.5);`;
    document.body.appendChild(menu);

    function updateUI() {
        menu.innerHTML = `
            <div style="color:#97ff95; font-weight:bold; margin-bottom:10px; border-bottom:1px solid #444">SA BOT - ACTIVE</div>

            <div style="background:rgba(255,255,255,0.1); padding:8px; border-radius:4px; margin-bottom:10px">
                <div style="color:#fffa77">💰 Profit: <b>Rp ${(state.totalProfitUnits * unitValue).toLocaleString('id-ID')}</b></div>
                <div style="color:#ff4d4d">📉 Max Capital: <b>Rp ${(state.maxCapitalUnits * unitValue).toLocaleString('id-ID')}</b></div>
            </div>

            <div style="margin-bottom:5px; border-bottom: 1px dashed #444; padding-bottom:5px">
                Last Result: <span style="color:#fffa77; font-weight:bold">${state.lastResult !== null ? state.lastResult : '...'}</span>
                <span style="float:right; color:#aaa; font-size:10px">WaitStreak: ${waitStreak}</span>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px">
                <div>
                    <b>[DOZEN]</b><br>
                    Target: ${state.dozen.lastTarget || '-'}<br>
                    Step: <span style="color:#97ff95">${state.dozen.step}</span><br>
                    Bet: <span style="color:#fffa77">${state.dozen.step >= waitStreak ? progression[state.dozen.step - waitStreak] : 0}</span><br>
                    Mode: ${state.dozen.step >= waitStreak ? '<span style="color:#fffa77;font-weight:bold">REAL</span>' : '<span style="color:#aaa">WAIT</span>'}<br>
                    Peak: ${state.dozen.maxStep}
                </div>
                <div>
                    <b>[COLUMN]</b><br>
                    Target: ${state.column.lastTarget || '-'}<br>
                    Step: <span style="color:#97ff95">${state.column.step}</span><br>
                    Bet: <span style="color:#fffa77">${state.column.step >= waitStreak ? progression[state.column.step - waitStreak] : 0}</span><br>
                    Mode: ${state.column.step >= waitStreak ? '<span style="color:#fffa77;font-weight:bold">REAL</span>' : '<span style="color:#aaa">WAIT</span>'}<br>
                    Peak: ${state.column.maxStep}
                </div>
            </div>
        `;
    }

    // --- LOGIC HELPER ---
    function getLatestResult() {
        // Mengambil semua elemen bead dalam roadmap
        const beads = document.querySelectorAll(`${SELECTORS.roadmap} use`);
        if (beads.length === 0) return null;

        // Mencari dari urutan paling belakang (terbaru)
        for (let i = beads.length - 1; i >= 0; i--) {
            const href = beads[i].getAttribute('xlink:href') || beads[i].getAttribute('href') || "";
            const match = href.match(/r-(\d+)/);
            if (match) return parseInt(match[1]);
        }
        return null;
    }

    function getDozen(n) {
        if (n === 0) return 0;
        return Math.ceil(n / 12);
    }

    function getColumn(n) {
        if (n === 0) return 0;
        return n % 3 === 0 ? 3 : n % 3;
    }

    async function placeBet(type, target, amount) {
        const selector = SELECTORS[type][target];
        const btn = document.querySelector(selector);

        if (!btn) {
            console.error(`❌ Button ${type} ${target} tidak ditemukan!`);
            return;
        }

        // Simulasi klik sekuensial agar mesin game mendaftarkan setiap unit chip
        const executeSingleClick = async (el) => {
            const rect = el.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            const opts = { bubbles: true, clientX: x, clientY: y, view: window, buttons: 1 };

            el.dispatchEvent(new MouseEvent('mousedown', opts));
            await new Promise(r => setTimeout(r, 10)); // Jeda tipis antara tekan dan lepas
            el.dispatchEvent(new MouseEvent('mouseup', opts));
            el.dispatchEvent(new MouseEvent('click', opts));
        };

        console.log(`🎯 Menekan ${type} ${target} sebanyak ${amount}x`);
        // Jeda antar klik: 60ms (Aman/Stabil) atau 20ms (Turbo untuk jumlah besar)
        const delay = amount > 20 ? 5 : 60;

        for (let i = 0; i < amount; i++) {
            await executeSingleClick(btn);
            await new Promise(r => setTimeout(r, delay));
        }
        return true;
    }

    // --- MAIN LOOP ---
    setInterval(async () => {
        if(document.getElementsByClassName("video-resume-panel")[0]){
            document.getElementsByClassName("video-resume-panel")[0].click()
        }
        const countdownEl = document.querySelector(SELECTORS.countdown);
        const countdown = countdownEl ? parseInt(countdownEl.textContent) : NaN;
        const beads = document.querySelectorAll(`${SELECTORS.roadmap} use`);
        const roadmapCount = beads.length;

        // Bead paling terakhir di roadmap saat ini
        const latestBead = beads[beads.length - 1];

        // Inisialisasi target jika baru jalan (ambil dari history terakhir)
        if (latestBead && state.dozen.lastTarget === null) {
            const currentResult = getLatestResult();
            state.dozen.lastTarget = getDozen(currentResult);
            state.column.lastTarget = getColumn(currentResult);
            state.lastResult = currentResult;
            state.lastRoadmapCount = roadmapCount;
            state.lastBeadElement = latestBead;
            updateUI();
        }

        // 1. Evaluasi Hasil (Pemicu: Ada elemen bead baru yang berbeda dari sebelumnya)
        if (latestBead && latestBead !== state.lastBeadElement) {
            const href = latestBead.getAttribute('xlink:href') || latestBead.getAttribute('href') || "";
            const match = href.match(/r-(\d+)/);

            if (match) {
                const newResult = parseInt(match[1]);
                state.lastRoadmapCount = roadmapCount; // Update count hanya jika data valid
                state.lastBeadElement = latestBead;   // Kunci elemen ini agar tidak diproses ulang
                state.isWaitingForSpin = false; // BUKA KUNCI: Result sudah ada, siap bet di detik berikutnya

                console.log(`🎰 Putaran selesai. Result: ${newResult}`);
                state.lastResult = newResult;

            // Evaluasi Dozen
            if (state.dozen.lastTarget !== null) {
                if (getDozen(newResult) === state.dozen.lastTarget && newResult !== 0) {
                    // Simulasi Payout: Jika menang, saldo + (bet * 3)
                    if (state.dozen.currentBet > 0) {
                        state.totalProfitUnits += (state.dozen.currentBet * 3);
                        console.log(`%c💰 Dozen WIN! Payout: +${state.dozen.currentBet * 3} units`, "color: #97ff95");
                    }
                    state.dozen.step = 0;
                } else {
                    state.dozen.step++;
                    if (state.dozen.step > state.dozen.maxStep) state.dozen.maxStep = state.dozen.step;
                    console.log(`%c❌ Dozen LOSE. Next step: ${state.dozen.step}`, "color: #fffa77");
                }
                state.dozen.currentBet = 0; // Reset taruhan aktif setelah evaluasi
            }

            // Update target dozen (selalu ikuti angka terakhir, kecuali 0)
            if (getDozen(newResult) !== 0) {
                state.dozen.lastTarget = getDozen(newResult);
            }

            // Evaluasi Column
            if (state.column.lastTarget !== null) {
                if (getColumn(newResult) === state.column.lastTarget && newResult !== 0) {
                    // Simulasi Payout
                    if (state.column.currentBet > 0) {
                        state.totalProfitUnits += (state.column.currentBet * 3);
                        console.log(`%c💰 Column WIN! Payout: +${state.column.currentBet * 3} units`, "color: #97ff95");
                    }
                    state.column.step = 0;
                } else {
                    state.column.step++;
                    if (state.column.step > state.column.maxStep) state.column.maxStep = state.column.step;
                    console.log(`%c❌ Column LOSE. Next step: ${state.column.step}`, "color: #fffa77");
                }
                state.column.currentBet = 0;
            }

            // Update target column (selalu ikuti angka terakhir, kecuali 0)
            if (getColumn(newResult) !== 0) {
                state.column.lastTarget = getColumn(newResult);
            }

            updateUI();
            } else {
                // Bead baru muncul tapi 'r-X' belum ada di atribut, tunggu loop berikutnya
                console.log("⏳ Menunggu angka muncul di roadmap...");
            }
        }

        // Reset flag betting hanya jika countdown reset ke angka tinggi (Round baru benar-benar dimulai)
        if (!isNaN(countdown) && countdown >= 26 && state.isWaitingForSpin) {
            state.isWaitingForSpin = false;
            console.log("%c🔓 Round Reset: Siap menerima taruhan baru.", "color: #97ff95");
        }
        // Note: isWaitingForSpin sekarang lebih responsif karena di-reset saat roadmap muncul

        // 2. Eksekusi Betting
        if (!isNaN(countdown) &&
            countdown <= betTargetRange.max &&
            countdown >= betTargetRange.min &&
            !state.isWaitingForSpin) {

            // Kondisi Betting: Target valid, Step mencapai threshold, dan belum ada bet terpasang untuk round ini
            const dozenWillBet = state.dozen.lastTarget !== null && state.dozen.lastTarget >= 1 && state.dozen.step >= waitStreak && state.dozen.currentBet === 0;
            const columnWillBet = state.column.lastTarget !== null && state.column.lastTarget >= 1 && state.column.step >= waitStreak && state.column.currentBet === 0;

            // Jika tidak ada satu pun strategi yang dalam mode REAL, lewati proses klik
            if (!dozenWillBet && !columnWillBet) {
                updateUI(); // Tetap update UI untuk status WAIT
                return;
            }

            // KUNCI SEGERA: Mencegah interval detik berikutnya masuk sebelum proses klik selesai
            state.isWaitingForSpin = true;

            // Reset jika step melebihi kapasitas progression + offset penantian
            if (state.dozen.step >= (progression.length + waitStreak)) state.dozen.step = 0;
            if (state.column.step >= (progression.length + waitStreak)) state.column.step = 0;

            // Pasang Dozen (Mulai bet index 0 saat step mencapai 3)
            if (dozenWillBet) {
                const betIndex = Math.max(0, state.dozen.step - waitStreak);
                if (betIndex < progression.length) {
                    console.log(`📡 DOZEN REAL: Step ${state.dozen.step} -> Bet Index [${betIndex}] = ${progression[betIndex]} unit`);
                    const amt = progression[betIndex];
                    state.dozen.currentBet = amt;
                    state.totalProfitUnits -= amt; // Saldo berkurang saat bet
                    await placeBet('dozen', state.dozen.lastTarget, amt);
                }
            }

            // Pasang Column (Mulai bet index 0 saat step mencapai 3)
            if (columnWillBet) {
                const betIndex = Math.max(0, state.column.step - waitStreak);
                if (betIndex < progression.length) {
                    console.log(`📡 COLUMN REAL: Step ${state.column.step} -> Bet Index [${betIndex}] = ${progression[betIndex]} unit`);
                    const amt = progression[betIndex];
                    state.column.currentBet = amt;
                    state.totalProfitUnits -= amt; // Saldo berkurang saat bet
                    await placeBet('column', state.column.lastTarget, amt);
                }
            }

            // Update Max Capital (Drawdown)
            // Max Capital dihitung dari titik terendah saldo (Profit Units negatif terjauh)
            // Jika profit -5, berarti modal yang terpakai adalah 5 unit.
            state.maxCapitalUnits = Math.max(state.maxCapitalUnits, Math.abs(state.totalProfitUnits < 0 ? state.totalProfitUnits : 0));

            updateUI();
        }
    }, 1000);

    updateUI();
})();
