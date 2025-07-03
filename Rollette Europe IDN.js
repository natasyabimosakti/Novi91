// ==UserScript==
// @name         Roulette AI Auto Bet v3.0
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  Auto-bet roulette 1st/2nd/3rd dengan AI + Martingale, retry, log lengkap, dan class tombol
// @match        https://lobbybalancing.mngtto.com/new_rl_react/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  let history = [];
  let lastResult = null;
  let lastPeriode = null;
  let lastBetColumn = null;
  let currentBet = 1;
  let saldo = 0;
  let totalWin = 0;
  let totalLose = 0;
  let betting = false;

  function log(...args) {
    console.log('[🎯 ROULETTE AI]', ...args);
  }

  function getColumn(n) {
    if (n >= 1 && n <= 12) return 1;
    if (n >= 13 && n <= 24) return 2;
    if (n >= 25 && n <= 36) return 3;
    return 0;
  }

  function analyzeBestColumn() {
    const freq = { 1: 0, 2: 0, 3: 0 };
    const recent = history.slice(-10);
    for (let n of recent) {
      const col = getColumn(n);
      if (col !== 0) freq[col]++;
    }
    const lastCol = getColumn(history[history.length - 1] || 0);
    const score = {};
    for (let c = 1; c <= 3; c++) {
      score[c] = (10 - freq[c]) + (c !== lastCol ? 2 : 0);
    }
    const max = Math.max(...Object.values(score));
    const candidates = Object.entries(score).filter(([k, v]) => v === max).map(([k]) => parseInt(k));
    log("📈 Analisa skor kolom:", score, "Dipilih:", candidates);
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  function safePlaceBet(col, attempt = 0) {
    const classMap = {
      1: "_slot-1st12_",
      2: "_slot-2nd12_",
      3: "_slot-3rd12_"
    };

    const classPart = classMap[col];
    const btn = [...document.querySelectorAll("button")].find(btn => btn.className.includes(classPart));

    if (btn) {
      log(`🎲 Betting ${currentBet}x ke kolom ${col}`);
      for (let i = 0; i < currentBet; i++) {
        setTimeout(() => btn.click(), i * 300);
      }
      lastBetColumn = col;
      betting = true;
    } else {
      if (attempt < 20) {
        log(`⏳ Retry cari tombol kolom ${col} (ke-${attempt + 1})...`);
        setTimeout(() => safePlaceBet(col, attempt + 1), 600);
      } else {
        log(`❌ Gagal menemukan tombol kolom ${col} setelah 20 percobaan.`);
      }
    }
  }

  function evaluateResult(n) {
    const col = getColumn(n);
    const resultStr = `🎯 Hasil: ${n} => kolom ${col}`;
    if (col === lastBetColumn) {
      log(resultStr, '✅ MENANG');
      saldo += currentBet;
      currentBet = 1;
      totalWin++;
    } else {
      log(resultStr, '❌ KALAH');
      saldo -= currentBet;
      currentBet *= 2;
      totalLose++;
    }
    log(`📊 Kolom: ${col} | Bet: ${lastBetColumn} | Saldo: ${saldo} | ✅ ${totalWin} ❌ ${totalLose}`);
    betting = false;
  }

  function startNextBet() {
    if (betting) return;
    const best = analyzeBestColumn();
    setTimeout(() => safePlaceBet(best), 1500);
  }

  const originalLog = console.log;
  const customLog = function (...args) {
    try {
      for (const a of args) {
        const aStr = JSON.stringify(a);

        if (aStr.includes('middleware: openTime')) {
          log('🟢 Betting DIBUKA');
          // trigger betting saat openTime, jika belum betting
          if (!betting) startNextBet();
        } else if (aStr.includes('middleware: closeTime')) {
          log('🔴 Betting DITUTUP');
        }

        if (typeof a === 'object') {
          const game = a?.action?.payload?.game;
          const type = a?.action?.type;

          if (game === 'rouletted' && type === 'socket/loadNewValue') {
            const win = parseInt(a.action.payload.win);
            const periode = a.action.payload.periode;

            if (!isNaN(win) && periode !== lastPeriode) {
              lastPeriode = periode;
              lastResult = win;
              history.push(win);
              if (history.length > 20) history.shift();
              log('🎯 RESULT:', win);
              evaluateResult(win);
            }
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
    if (console.log !== customLog) {
      console.log = customLog;
      log('♻️ Log observer diaktifkan ulang');
    }
  }, 1000);

  log('🤖 Roulette AutoBot AI v3.0 aktif dan auto-bet tiap ronde!');
})();
