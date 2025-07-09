// ==UserScript==
// @name         Roulette AI v2.7 - Dozen + Column (Fast Bet + Fibonacci Terpisah) SexyRollete
// @namespace    http://tampermonkey.net/
// @version      2.7
// @description  AI betting cepat di dozen dan column dengan fibonacci masing-masing, konfirmasi 1x, anti double bet
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const fib = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377];
  let fibIndexDozen = 0;
  let fibIndexColumn = 0;
  let lastResult = null;
  let localHistory = [];
  let lastTargetDozen = null;
  let lastTargetColumn = null;

  const DOZEN_CLASS = {
    1: 'dozen1st',
    2: 'dozen2nd',
    3: 'dozen3rd'
  };

  const COLUMN_ID = {
    1: 'COLUMN1',
    2: 'COLUMN2',
    3: 'COLUMN3'
  };

  const infoBox = document.createElement("div");
  Object.assign(infoBox.style, {
    position: "fixed",
    bottom: "10px",
    right: "10px",
    background: "#111",
    color: "#0f0",
    padding: "10px",
    borderRadius: "8px",
    fontFamily: "monospace",
    zIndex: 9999
  });
  document.body.appendChild(infoBox);

  function updateInfo(info) {
    infoBox.innerHTML = `
      🎯 Dozen: ${info.dozen} (x${info.amountDozen})<br>
      🎯 Column: ${info.column} (x${info.amountColumn})<br>
      🔁 Fib Dozen: ${info.fibIndexDozen}, Column: ${info.fibIndexColumn}<br>
      🎲 Last Result: ${info.result}
    `;
  }

  function getDozen(num) {
    if (num >= 1 && num <= 12) return 1;
    if (num >= 13 && num <= 24) return 2;
    if (num >= 25 && num <= 36) return 3;
    return 0;
  }

  function getColumn(num) {
    if (num < 1 || num > 36) return 0;
    return ((num - 1) % 3) + 1;
  }

  function getLatestResult() {
    const el = document.querySelector("#resultHistory");
    if (!el || el.children.length === 0) return null;
    const num = parseInt(el.children[0].textContent.trim());
    return isNaN(num) ? null : num;
  }

  function getHistory() {
    const el = document.querySelector("#resultHistory");
    if (!el || el.children.length === 0) return [];
    return Array.from(el.children).map(c => parseInt(c.textContent.trim())).filter(n => !isNaN(n));
  }

  function getColdest(history, type = "dozen") {
    const count = [0, 0, 0];
    const mapper = type === "dozen" ? getDozen : getColumn;
    history.slice(0, 20).forEach(num => {
      const val = mapper(num);
      if (val > 0) count[val - 1]++;
    });
    const min = Math.min(...count);
    const candidates = count.map((v, i) => ({ idx: i + 1, v })).filter(c => c.v === min);
    return candidates[Math.floor(Math.random() * candidates.length)].idx;
  }

  function clickMultiple(el, times, cb) {
    let i = 0;
    function loop() {
      if (i < times) {
        el.click();
        i++;
        setTimeout(loop, 100); // ⚡ lebih cepat klik
      } else {
        if (cb) setTimeout(cb, 200);
      }
    }
    loop();
  }

  function mainLoop() {
    const countdown = document.getElementById("countdown");

    if (!countdown || countdown.textContent.includes("Spinning")) {
      return setTimeout(mainLoop, 1000);
    }

    const currentResult = getLatestResult();
    if (currentResult === null || currentResult === lastResult) {
      return setTimeout(mainLoop, 1000);
    }

    const d = getDozen(currentResult);
    const c = getColumn(currentResult);

    if (d === lastTargetDozen) {
      fibIndexDozen = 0;
    } else {
      fibIndexDozen = Math.min(fibIndexDozen + 1, fib.length - 1);
    }

    if (c === lastTargetColumn) {
      fibIndexColumn = 0;
    } else {
      fibIndexColumn = Math.min(fibIndexColumn + 1, fib.length - 1);
    }

    lastResult = currentResult;
    localHistory = getHistory();

    if (localHistory.length < 10) {
      console.log("⏳ Menunggu histori cukup...");
      return setTimeout(mainLoop, 1000);
    }

    lastTargetDozen = getColdest(localHistory, "dozen");
    lastTargetColumn = getColdest(localHistory, "column");

    const amountDozen = fib[fibIndexDozen];
    const amountColumn = fib[fibIndexColumn];

    updateInfo({
      dozen: lastTargetDozen,
      column: lastTargetColumn,
      amountDozen,
      amountColumn,
      fibIndexDozen,
      fibIndexColumn,
      result: currentResult
    });

    const dozenBtn = document.querySelector(`.${DOZEN_CLASS[lastTargetDozen]}`);
    const columnBtn = document.querySelector(`#${COLUMN_ID[lastTargetColumn]}`);

    if (!dozenBtn || !columnBtn) {
      console.warn("❌ Tombol dozen/column tidak ditemukan!");
      return setTimeout(mainLoop, 1000);
    }

    let doneDozen = false, doneColumn = false;
    const tryConfirm = () => {
      if (doneDozen && doneColumn) {
        const confirm = document.querySelector(".btnConfirm");
        if (confirm) {
          confirm.click();
          console.log("✅ Konfirmasi diklik");
        }
      }
    };

    // 🔁 Klik paralel
    clickMultiple(dozenBtn, amountDozen, () => {
      doneDozen = true;
      tryConfirm();
    });

    clickMultiple(columnBtn, amountColumn, () => {
      doneColumn = true;
      tryConfirm();
    });

    setTimeout(mainLoop, 15000); // tunggu sampai next round
  }

  setTimeout(() => {
    console.log("🚀 AI Started – Roulette v2.7 (Fast Bet + Fib Split)");
    mainLoop();
  }, 3000);
})();
