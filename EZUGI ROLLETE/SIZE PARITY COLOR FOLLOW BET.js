// ==UserScript==
// @name         Auto Bet Roulette Advanced Full Bot
// @namespace    http://tampermonkey.net/
// @version      9.9.49
// @description  Full Bot Roulette: Dozen/Column Zigzag & Cold, Martingale, Anti Double Bet, Coin Auto, Popup & Log + Follow Parity, Color, Size + Popup with Max Balance
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const config = {
        baseBet: 1000,
        coinMap: {
            200000: 'chip-20',
            50000: 'chip-5',
            10000: 'chip-1',
            1000: 'chip-0.1',
        },
        coinValues: [200000, 50000, 10000, 1000],
        dozen: ['index-800', 'index-801', 'index-802'],
        column: ['index-700', 'index-701', 'index-702'],
        red: 'index-903', black: 'index-902',
        odd: 'index-904', even: 'index-901',
        small: 'index-900', big: 'index-905'
    };

    const state = {
        lastPeriode: '',
        history: [],
        betStatus: {},
        placedBets: new Set(),
        zigzagD: 0,
        zigzagC: 0,
        coldD: [0, 0, 0],
        coldC: [0, 0, 0],
        martingale: {
            dz: [config.baseBet, config.baseBet, config.baseBet],
            cl: [config.baseBet, config.baseBet, config.baseBet],
            red: config.baseBet,
            black: config.baseBet,
            odd: config.baseBet,
            even: config.baseBet,
            small: config.baseBet,
            big: config.baseBet
        },
        lastResult: null,
        lastValidResult: null,
        lastBetTarget: {},
        lastBetResult: {},
        maxBalance: 0
    };

    const popup = document.createElement("div");
    popup.style.cssText = "position:fixed;top:10px;right:10px;background:#222;color:#0f0;padding:10px;font-size:14px;z-index:9999;border:2px solid #0f0;border-radius:8px;white-space:pre-line";
    document.body.appendChild(popup);

    function updatePopup(balance, periode, result) {
        if (balance > state.maxBalance) state.maxBalance = balance;
        popup.innerText = `🎯 Periode: ${periode}\n🎯 Result: ${result}\n💰 Saldo: €${balance.toFixed(2)}\n💰 Saldo Tertinggi: €${state.maxBalance.toFixed(2)}`;
    }

    function getPeriode() {
        return document.querySelector('[data-e2e="round-info-value"]')?.textContent.trim() || '';
    }

    function getLastResult() {
        return document.getElementsByClassName("ervzci33")[0]?.children?.[0]?.textContent.trim() || '';
    }

    function isBettingOpen() {
        return document.querySelector('[data-e2e="betting-timer"]') !== null;
    }

    function getBalance() {
        let txt = document.querySelector('[data-e2e="balance-value"]')?.textContent || '';
        return parseFloat(txt.replace(/[^0-9.]/g, '')) || 0;
    }

    function dispatchClick(el) {
        if (el) el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }

    async function pickCoinsAndClick(id, amount) {
        let remaining = amount;
        for (const val of config.coinValues) {
            const qty = Math.floor(remaining / val);
            const chipBtn = document.querySelector(`[data-e2e="${config.coinMap[val]}"]`);
            for (let i = 0; i < qty; i++) {
                if (chipBtn) dispatchClick(chipBtn);
                await new Promise(r => setTimeout(r, 10));
                const el = document.getElementById(id);
                if (el) dispatchClick(el);
            }
            remaining %= val;
        }
    }

    async function placeBet(id, amount) {
        if (state.placedBets.has(id)) return;
        state.placedBets.add(id);
        await pickCoinsAndClick(id, amount);
    }

    function updateMartingale(currentNum) {
        if (state.lastBetResult && typeof currentNum === 'number') {
            const isEven = currentNum % 2 === 0;
            const isSmall = currentNum >= 1 && currentNum <= 18;
            const isRed = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(currentNum);
            const isBlack = !isRed;

            for (const key in state.lastBetResult) {
                let win = false;
                if (key === 'red') win = isRed;
                else if (key === 'black') win = isBlack;
                else if (key === 'even') win = isEven;
                else if (key === 'odd') win = !isEven;
                else if (key === 'small') win = isSmall;
                else if (key === 'big') win = !isSmall;

                if (win) {
                    state.martingale[key] = config.baseBet;
                } else {
                    state.martingale[key] *= 2;
                }
            }
        }
        state.lastResult = currentNum;
    }

    async function loop() {
        if (!isBettingOpen()) return;

        const periode = getPeriode();
        if (periode === state.lastPeriode) return;
        state.lastPeriode = periode;
        state.placedBets.clear();

        const num = parseInt(getLastResult());
        if (isNaN(num)) return;

        const refNum = num === 0 ? state.lastValidResult : num;

        updateMartingale(num);

        const isEven = refNum % 2 === 0;
        const isSmall = refNum >= 1 && refNum <= 18;
        const isRed = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(refNum);
        const isBlack = !isRed;

        const targets = {};

        const bets = [];
        if (isRed) bets.push(['red', config.red]);
        else bets.push(['black', config.black]);

        if (isEven) bets.push(['even', config.even]);
        else bets.push(['odd', config.odd]);

        if (isSmall) bets.push(['small', config.small]);
        else bets.push(['big', config.big]);

        for (const [key, id] of bets) {
            const amt = state.martingale[key];
            await placeBet(id, amt);
            console.log(`📌 Follow ${key.charAt(0).toUpperCase() + key.slice(1)} → ${amt}`);
            targets[key] = true;
        }

        state.lastBetTarget = targets;
        state.lastBetResult = targets;
        if (num !== 0) state.lastValidResult = num;

        const saldo = getBalance();
        updatePopup(saldo, periode, num);

        console.log(`🎯 Periode: ${periode}`);
        console.log(`🎯 Result: ${num}`);
        console.log(`💰 Saldo: €${saldo}`);
    }

    setInterval(loop, 1000);
})();
