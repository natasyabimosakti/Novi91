// ==UserScript==
// @name         Roulette AI Auto Bet v4.3 (Full Save + Martingale)
// @namespace    http://tampermonkey.net/
// @version      4.3
// @description  Auto-bet roulette besar/kecil, ganjil/genap, merah/hitam + Martingale, simpan hasil analisa + reload otomatis setelah betting ditutup
// @match        https://lobbybalancing.mngtto.com/new_rl_react/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  let isBetting = false;

  let state = {
    lastPeriode: null,
    resultHistory: [],
    saldo: 0,
    totalWin: 0,
    totalLose: 0,
    bets: {
      size: { option: null, amount: 1 },
      parity: { option: null, amount: 1 },
      color: { option: null, amount: 1 },
    }
  };

  const classMap = {
    size: { big: '_slot-19-36_', small: '_slot-1-18_' },
    parity: { odd: '_slot-odd_', even: '_slot-even_' },
    color: { red: '_slot-red_', black: '_slot-black_' }
  };

  function log(...args) {
    console.log('[🎯 ROULETTE AI]', ...args);
  }

  function saveState() {
    localStorage.setItem("roulette_bot_state", JSON.stringify(state));
    log("💾 State disimpan");
  }

  function loadState() {
    const saved = localStorage.getItem("roulette_bot_state");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        state = Object.assign(state, parsed);
        log("📦 State berhasil dimuat");
      } catch (e) {
        log("⚠️ Gagal load state:", e);
      }
    }
  }

  function analyzeNextBets() {
    const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
    state.bets.size.option = random(['big', 'small']);
    state.bets.parity.option = random(['odd', 'even']);
    state.bets.color.option = random(['red', 'black']);
    log('📊 Analisa taruhan berikutnya:', JSON.parse(JSON.stringify(state.bets)));
    saveState();
  }

  function placeBet(category, attempt = 0) {
    const option = state.bets[category].option;
    const classPart = classMap[category][option];
    const btn = [...document.querySelectorAll("button")].find(b => b.className.includes(classPart));

    const nominalBtn = document.querySelector("[data-value='5000']");
    if (nominalBtn) nominalBtn.click();

    if (btn) {
      log(`🎲 BET ${category.toUpperCase()} => ${option} x${state.bets[category].amount}`);
      for (let i = 0; i < state.bets[category].amount; i++) {
        setTimeout(() => btn.click(), i * 300);
      }
    } else {
      if (attempt < 10) {
        setTimeout(() => placeBet(category, attempt + 1), 500);
      } else {
        log(`❌ Tidak menemukan tombol untuk ${category}/${option}`);
      }
    }
  }

  function evaluateBet(category, resultValue) {
    const bet = state.bets[category];
    let win = false;
    if (category === 'size') {
      win = (bet.option === 'big' && resultValue > 18) || (bet.option === 'small' && resultValue <= 18);
    } else if (category === 'parity') {
      win = (bet.option === 'even' && resultValue % 2 === 0) || (bet.option === 'odd' && resultValue % 2 === 1);
    } else if (category === 'color') {
      const redNumbers = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
      const isRed = redNumbers.includes(resultValue);
      win = (bet.option === 'red' && isRed) || (bet.option === 'black' && !isRed);
    }
    if (win) {
      log(`✅ ${category.toUpperCase()} ${bet.option} MENANG`);
      state.saldo += bet.amount;
      bet.amount = 1;
      state.totalWin++;
    } else {
      log(`❌ ${category.toUpperCase()} ${bet.option} KALAH`);
      state.saldo -= bet.amount;
      bet.amount *= 2;
      state.totalLose++;
    }
  }

  function onResult(winNum, periode) {
    if (periode === state.lastPeriode) return;
    state.lastPeriode = periode;
    state.resultHistory.push(winNum);
    if (state.resultHistory.length > 30) state.resultHistory.shift();

    log(`🎯 RESULT: ${winNum}`);
    for (const cat of ['size', 'parity', 'color']) {
      evaluateBet(cat, winNum);
    }
    analyzeNextBets();
    isBetting = false;
    saveState();
  }

  function onBettingOpen() {
    if (isBetting) return;
    isBetting = true;
    if (!state.bets.size.option || !state.bets.parity.option || !state.bets.color.option) {
      analyzeNextBets();
    }
    for (const cat of ['size', 'parity', 'color']) {
      placeBet(cat);
    }
  }

  const originalLog = console.log;
  const customLog = function (...args) {
    try {
      for (const a of args) {
        const aStr = JSON.stringify(a);
        if (aStr.includes('middleware: openTime')) {
          log('🟢 Betting DIBUKA');
          onBettingOpen();
        } else if (aStr.includes('middleware: closeTime')) {
          log('🔴 Betting DITUTUP');
          saveState();
          setTimeout(() => location.reload(), 1500);
        } else if (typeof a === 'object') {
          const game = a?.action?.payload?.game;
          const type = a?.action?.type;
          if (game === 'rouletted' && type === 'socket/loadNewValue') {
            const win = parseInt(a.action.payload.win);
            const periode = a.action.payload.periode;
            if (!isNaN(win)) onResult(win, periode);
          }
        }
      }
    } catch (e) {
      originalLog('⚠️ ERROR parsing log:', e);
    }
    originalLog.apply(console, args);
  };

  console.log = customLog;
  setInterval(() => {
    if (console.log !== customLog) console.log = customLog;
  }, 1000);

  window.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "r") {
      localStorage.removeItem("roulette_bot_state");
      log("🗑️ State telah direset oleh user (CTRL+R)");
    }
  });

  loadState();
  log('🤖 Roulette AutoBot AI v4.3 aktif! Martingale + simpan analisa + reload + anti bet ulang!');
})();
