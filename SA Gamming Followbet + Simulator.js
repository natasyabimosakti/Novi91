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
    const waitStreak = 1; // Ubah ke 0 jika ingin langsung betting di Step 1 setelah result keluar
    const unitValue = 10000; // 1 unit = Rp 10.000

    // --- STATE ---
    let state = {
        dozen: { step: 0, lastTarget: null, status: "Idle", maxStep: 0, currentBet: 0 },
        column: { step: 0, lastTarget: null, status: "Idle", maxStep: 0, currentBet: 0 },


      
