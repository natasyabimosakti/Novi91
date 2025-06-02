// ==UserScript==
// @name         scrpt facebook.com
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Auto Test
// @match        http*://*/*
// @grant        GM_xmlhttpRequest
// @connect      script.google.com
// ==/UserScript==

async function pasteTextToFacebookComment(text) {
    const commentBox = document.querySelector('[contenteditable="true"]');
    if (!commentBox) {
        console.error("Comment box not found");
        return;
    }

    commentBox.focus();

    // Buat event paste manual dengan data yang ingin dipaste
    const clipboardData = new DataTransfer();
    clipboardData.setData('text/plain', text);

    const pasteEvent = new ClipboardEvent('paste', {
        bubbles: true,
        cancelable: true,
        clipboardData: clipboardData
    });

    commentBox.dispatchEvent(pasteEvent);

    //tampilkan Tombol
    // 1. Fokus dan klik agar React mengenali interaksi
    commentBox.focus();
    commentBox.click();
    commentBox.dispatchEvent(new Event("focus", { bubbles: true }));

    // Tunggu UI update
    await new Promise(r => setTimeout(r, 1));

    //Klik Tombol Kirim
    const sendBtn = document.querySelector('#focused-state-composer-submit [role="button"][tabindex="0"]');
    if (sendBtn) {
        sendBtn.click();
        console.log('Komentar terkirim!');
    } else {
        console.error('Tombol kirim tidak ditemukan');
    }


}

// Pakai fungsi
pasteTextToFacebookComment("Ini komentar otomatis lewat paste clipboard");

