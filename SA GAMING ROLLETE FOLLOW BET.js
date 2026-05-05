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
    const betTargetRange = { max: 28, min: 1 }; 
    const waitStreak = 2; // Menunggu 3x kalah baru mulai bet (Index 0 Fibonacci)

    // --- STATE ---
    let state = {
        dozen: { step: 0, lastTarget: null, status: "Idle", maxStep: 0, virtual: true },
        column: { step: 0, lastTarget: null, status: "Idle", maxStep: 0, virtual: true },
        lastResult: null,
        isWaitingForSpin: false,
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
            <div style="margin-bottom:5px">Result: <span style="color:#fffa77">${state.lastResult !== null ? state.lastResult : 'Waiting...'}</span></div>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px">
                <div>
                    <b>[DOZEN]</b><br>
                    Tgt: ${state.dozen.lastTarget || '-'}<br>
                    Step: ${state.dozen.step}<br>
                    Bet: ${state.dozen.step >= waitStreak ? progression[state.dozen.step - waitStreak] : 0}<br>
                    Peak: ${state.dozen.maxStep}<br>
                    Mode: ${state.dozen.step >= waitStreak ? '<span style="color:#fffa77">REAL</span>' : '<span style="color:#aaa">WAIT</span>'}
                </div>
                <div>
                    <b>[COLUMN]</b><br>
                    Tgt: ${state.column.lastTarget || '-'}<br>
                    Step: ${state.column.step}<br>
                    Bet: ${state.column.step >= waitStreak ? progression[state.column.step - waitStreak] : 0}<br>
                    Peak: ${state.column.maxStep}<br>
                    Mode: ${state.column.step >= waitStreak ? '<span style="color:#fffa77">REAL</span>' : '<span style="color:#aaa">WAIT</span>'}
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

        // Simulasi klik yang lebih nyata untuk SA Gaming
        const simulateClick = (el) => {
            const rect = el.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            const opts = { bubbles: true, clientX: x, clientY: y, view: window };
            
            el.dispatchEvent(new PointerEvent('pointerdown', opts));
            el.dispatchEvent(new MouseEvent('mousedown', opts));
            el.dispatchEvent(new PointerEvent('pointerup', opts));
            el.dispatchEvent(new MouseEvent('mouseup', opts));
            el.dispatchEvent(new MouseEvent('click', opts));
        };

        console.log(`🎯 Menekan ${type} ${target} sebanyak ${amount}x`);
        for (let i = 0; i < amount; i++) {
            simulateClick(btn);
            await new Promise(r => setTimeout(r, 3)); 
        }
    }

    // --- MAIN LOOP ---
    setInterval(async () => {
        const countdownEl = document.querySelector(SELECTORS.countdown);
        const countdown = countdownEl ? parseInt(countdownEl.textContent) : NaN;
        const currentResult = getLatestResult();

        // Inisialisasi target jika baru jalan (ambil dari history terakhir)
        if (currentResult !== null && state.dozen.lastTarget === null) {
            state.dozen.lastTarget = getDozen(currentResult);
            state.column.lastTarget = getColumn(currentResult);
            state.lastResult = currentResult;
        }

        // 1. Evaluasi Hasil (Pemicu: Saat countdown reset ke angka tinggi/waktu bet baru dimulai)
        if (!isNaN(countdown) && countdown > 26 && state.isWaitingForSpin) {
            state.isWaitingForSpin = false;
            
            // Meskipun currentResult sama dengan state.lastResult, kita tetap proses karena ini putaran baru
            console.log(`🎰 Putaran selesai. Result: ${currentResult}`);

            // Evaluasi Dozen
            if (state.dozen.lastTarget !== null) {
                if (getDozen(currentResult) === state.dozen.lastTarget && currentResult !== 0) {
                    console.log("%c💰 Dozen WIN! Reset step.", "color: #97ff95");
                    state.dozen.step = 0;
                } else {
                    state.dozen.step++;
                    if (state.dozen.step > state.dozen.maxStep) state.dozen.maxStep = state.dozen.step;
                    console.log(`%c❌ Dozen LOSE. Next step: ${state.dozen.step}`, "color: #fffa77");
                }
            }
            
            // Update target dozen (selalu ikuti angka terakhir, kecuali 0)
            if (getDozen(currentResult) !== 0) {
                state.dozen.lastTarget = getDozen(currentResult);
            }

            // Evaluasi Column
            if (state.column.lastTarget !== null) {
                if (getColumn(currentResult) === state.column.lastTarget && currentResult !== 0) {
                    console.log("%c💰 Column WIN! Reset step.", "color: #97ff95");
                    state.column.step = 0;
                } else {
                    state.column.step++;
                    if (state.column.step > state.column.maxStep) state.column.maxStep = state.column.step;
                    console.log(`%c❌ Column LOSE. Next step: ${state.column.step}`, "color: #fffa77");
                }
            }
            
            // Update target column (selalu ikuti angka terakhir, kecuali 0)
            if (getColumn(currentResult) !== 0) {
                state.column.lastTarget = getColumn(currentResult);
            }

            state.lastResult = currentResult;
            updateUI();
        }

        // 2. Eksekusi Betting
        if (!isNaN(countdown) && 
            countdown <= betTargetRange.max && 
            countdown >= betTargetRange.min && 
            !state.isWaitingForSpin &&
            state.dozen.lastTarget !== null) {
            
            state.isWaitingForSpin = true;

            // Reset jika step melebihi kapasitas progression + offset penantian
            if (state.dozen.step >= (progression.length + waitStreak)) state.dozen.step = 0;
            if (state.column.step >= (progression.length + waitStreak)) state.column.step = 0;

            // Pasang Dozen (Mulai bet index 0 saat step mencapai 3)
            if (state.dozen.lastTarget !== null && state.dozen.step >= waitStreak) {
                const betIndex = state.dozen.step - waitStreak;
                if (betIndex < progression.length) {
                    await placeBet('dozen', state.dozen.lastTarget, progression[betIndex]);
                }
            }

            // Pasang Column (Mulai bet index 0 saat step mencapai 3)
            if (state.column.lastTarget !== null && state.column.step >= waitStreak) {
                const betIndex = state.column.step - waitStreak;
                if (betIndex < progression.length) {
                    await placeBet('column', state.column.lastTarget, progression[betIndex]);
                }
            }
            
            updateUI();
        }
    }, 1000);

    updateUI();
})();
