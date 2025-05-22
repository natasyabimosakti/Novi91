
// ==UserScript==
// @name         Anti-Throttle
// @version      3.0
// @description  try to take over the world!
// @author       You
// @match        http*://*/*
// @run-at       document-end
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        window.close
// ==/UserScript==

(function() {
  window.addEventListener("message", (event) => {
    if (event.data?.from === 'ext' && event.data.type === 'wake') {
      console.log("[TM] Dibangunkan dari ekstensi");
      // Jalankan ulang fungsi anti-throttle / komentar otomatis / worker di sini
      restartAntiThrottleWorker();
    }
  });

  let worker;

  function restartAntiThrottleWorker() {
    if (worker) {
      worker.terminate();
      console.log('[TM] Worker dihentikan');
    }
    const workerScript = `
      setInterval(() => {
        postMessage('keep-alive');
      }, 5000);
    `;
    const blob = new Blob([workerScript], { type: 'application/javascript' });
    worker = new Worker(URL.createObjectURL(blob));
    worker.onmessage = e => console.log('[TM] Worker:', e.data);
    console.log('[TM] Worker dimulai ulang');
  }

  // Mulai pertama kali worker
  restartAntiThrottleWorker();
})();


