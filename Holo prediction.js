// ==UserScript==
// @name         Holo Rollete Predicition
// @namespace    http://tampermonkey.net/
// @version      2025-12-28
// @description  try to take over the world!
// @author       You
// @match        http*://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pedro4d03.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';


    let toastTimer = null;

    const wheel = [
        0, 32, 15, 19, 4, 21, 2, 25, 17, 34,
        6, 27, 13, 36, 11, 30, 8, 23, 10, 5,
        24, 16, 33, 1, 20, 14, 31, 9, 22,
        18, 29, 7, 28, 12, 35, 3, 26
    ];

    function getNeighbors(num) {
        const idx = wheel.indexOf(num);
        const len = wheel.length;

        return [
            wheel[(idx - 2 + len) % len],
            wheel[(idx - 1 + len) % len],
            num,
            wheel[(idx + 1) % len],
            wheel[(idx + 2) % len]
        ];
    }

    function predictFromLast(history, limit = 4) {
        if (!history.length) return [];

        const last = history[0];
        const score = {};
        let found = false;

        for (let i = history.length - 1; i > 0; i--) {
            if (history[i] === last) {
                found = true;
                const next = history[i - 1];
                const neighbors = getNeighbors(next);

                neighbors.forEach(n => {
                    score[n] = (score[n] || 0) + (n === next ? 2 : 1);
                });
            }
        }

        if (!found) {
            console.warn(`Tidak ada record sebelumnya untuk angka ${last}`);
            return [];
        }

        return Object.entries(score)
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit)
            .map(([number, point]) => ({ number: Number(number), point }));
    }
    function getHistory() {
        const container = document.querySelector("[data-role='windowContent']");
        if (!container) return [];

        return [...container.querySelectorAll('div')] // ⬅️ spread NodeList
            .filter(el => el.children.length === 0) // leaf node saja
            .map(el => el.textContent.trim())
            .filter(t => /^\d+$/.test(t))
            .map(Number)
            .filter(n => n >= 0 && n <= 36);
    }

    function runPrediction() {
        const history = getHistory();
        console.log (history);
        if (!history.length) return;

        const result = predictFromLast(history, 5);

        if (!result.length) {
            showToast('⚠️ Data belum cukup untuk prediksi');
            return;
        }

        console.clear();
        console.table(result);

        const nums = result.map(r => r.number).join(', ');
        showToast(`🎯 Prediksi: ${nums}`);
    }

    function showToast(message, duration = 3000) {
        let toast = document.getElementById('roulette-toast');

        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'roulette-toast';
            toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.9);
            color: #fff;
            padding: 10px 18px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 999999;
            opacity: 0;
            transition: opacity .3s;
        `;
            document.body.appendChild(toast);
        }

        // 🔴 HENTIKAN timeout lama
        if (toastTimer) {
            clearTimeout(toastTimer);
            toastTimer = null;
        }

        toast.textContent = message;
        toast.style.opacity = '1';

        toastTimer = setTimeout(() => {
            toast.style.opacity = '0';
        }, duration);
    }

    const intervalId = setInterval(runPrediction, 5000);


    // Your code here...
})();
