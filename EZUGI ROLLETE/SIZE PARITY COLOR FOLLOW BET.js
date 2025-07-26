// ==UserScript==
// @name         Auto Bet Roulette Martingale v1.1.4
// @namespace    http://tampermonkey.net/
// @version      1.1.4
// @description  Auto bet roulette dengan martingale, saldo real-time, dan reset manual
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const DOM = {
        red: 'index-903',
        black: 'index-902',
        odd: 'index-904',
        even: 'index-901',
        small: 'index-900',
        big: 'index-905',
    };

    let roundNumber = 0;
    let lastResult = null;
    let previousBet = { color: 'red', parity: 'odd', size: 'small' };
    let marti = { color: 1, parity: 1, size: 1 };
    let highestBalance = 0;
    let lastKnownResultText = "";
    let popupText;

    function resetMartingale() {
        marti = { color: 1, parity: 1, size: 1 };
        updatePopup(`✅ Semua Martingale direset!\n${lastKnownResultText}`);
        console.log("✅ Martingale reset manual.");
    }

    function createPopup() {
        const container = document.createElement("div");
        container.style = `
            position:fixed;
            bottom:10px;
            right:10px;
            z-index:9999;
            background:rgba(0,0,0,0.85);
            color:lime;
            padding:10px;
            border-radius:10px;
            font-family:monospace;
            max-width: 250px;
            font-size: 13px;
        `;

        const textDiv = document.createElement("div");
        textDiv.innerText = "🔄 Init...";
        container.appendChild(textDiv);
        popupText = textDiv;

        const btn = document.createElement("button");
        btn.innerText = "🔄 Reset Marti";
        btn.style = `
            margin-top:8px;
            padding:4px 8px;
            background:#222;
            color:lime;
            border:1px solid lime;
            border-radius:4px;
            cursor:pointer;
        `;
        btn.onclick = resetMartingale;
        container.appendChild(btn);

        document.body.appendChild(container);
        return container;
    }

    function updatePopup(text) {
        if (popupText) popupText.innerText = text;
    }

    function simulateClick(selector, times) {
        const elem = document.querySelector(`[id="${selector}"]`);
        if (!elem || window.getComputedStyle(elem).pointerEvents === "none") return false;
        for (let i = 0; i < times; i++) {
            elem.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        }
        return true;
    }

    function getResult() {
        return document.getElementsByClassName("ervzci33")[0]?.children?.[0]?.textContent.trim();
    }

    function getCurrentBalance() {
        const raw = document.querySelector('[data-e2e="balance-value"]')?.textContent || '';
        const clean = parseFloat(raw.replace(/[^\d.-]/g, ''));
        return isNaN(clean) ? 0 : clean;
    }

    function mapResultToPosition(result) {
        const num = parseInt(result);
        if (isNaN(num)) return previousBet;
        const isEven = num % 2 === 0;
        const isSmall = num >= 1 && num <= 18;
        const isRed = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(num);
        return {
            color: isRed ? 'red' : 'black',
            parity: isEven ? 'even' : 'odd',
            size: isSmall ? 'small' : 'big',
        };
    }

    function placeBets(pos) {
        simulateClick(DOM[pos.color], marti.color);
        simulateClick(DOM[pos.parity], marti.parity);
        simulateClick(DOM[pos.size], marti.size);
        console.log(`✅ BET: ${pos.color} x${marti.color}, ${pos.parity} x${marti.parity}, ${pos.size} x${marti.size}`);
    }

    function evaluateMarti(resultPos, prevPos) {
        marti.color = resultPos.color === prevPos.color ? 1 : marti.color * 2;
        marti.parity = resultPos.parity === prevPos.parity ? 1 : marti.parity * 2;
        marti.size = resultPos.size === prevPos.size ? 1 : marti.size * 2;
    }

    function updateBalanceRealtime() {
        setInterval(() => {
            const balance = getCurrentBalance();
            if (balance > highestBalance) {
                highestBalance = balance;
                resetMartingale()
            }
            const balanceText = `💰 Saldo Saat Ini: € ${balance.toFixed(2)}\n🔝 Saldo Tertinggi: € ${highestBalance.toFixed(2)}`;
            updatePopup(`${lastKnownResultText}\n${balanceText}`);
        }, 1000);
    }

    function loop() {
        const bettingTimer = document.querySelector('[data-e2e="betting-timer"]');
        if (!bettingTimer) {
            setTimeout(loop, 200);
            return;
        }

        roundNumber++;
        const result = getResult();

        // Proses evaluasi hasil
        let resultPos;

        if (parseInt(result) === 0) {
            marti.color *= 2;
            marti.parity *= 2;
            marti.size *= 2;
            resultPos = previousBet;
            console.log("⚠️ Result 0: Gandakan semua dan gunakan posisi sebelumnya.");
        } else if (result === lastResult) {
            marti = { color: 1, parity: 1, size: 1 };
            resultPos = mapResultToPosition(result);
            previousBet = resultPos;
            console.log("🔁 Result sama: reset marti.");
        } else {
            resultPos = mapResultToPosition(result);
            evaluateMarti(resultPos, previousBet);
            previousBet = resultPos;
        }

        lastKnownResultText = `🎯 Ronde: ${roundNumber}\n🎲 Result: ${result}`;
        placeBets(resultPos);
        lastResult = result;

        const waitNext = setInterval(() => {
            if (!document.querySelector('[data-e2e="betting-timer"]')) {
                clearInterval(waitNext);
                setTimeout(loop, 200);
            }
        }, 200);
    }

    createPopup();
    updateBalanceRealtime();
    setTimeout(loop, 1000);
})();
