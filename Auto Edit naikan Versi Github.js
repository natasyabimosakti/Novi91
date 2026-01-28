// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2024-08-12
// @description  try to take over the world!
// @author       You
// @match        http*://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

var refres = setInterval(function(){
    if(document.querySelectorAll("[data-testid='edit-button']")){
        document.querySelectorAll("[data-testid='edit-button']")[0].click()
        clearInterval(refres)
    }

},2000)
var namabah = setInterval(function(){
    if(document.getElementsByClassName("cm-line")[3]){
        var nextver = parseInt(document.getElementsByClassName("cm-line")[3].textContent.split(".").pop()) +1
        document.getElementsByClassName("cm-line")[3].textContent = '// @version      3.' + nextver
        clearInterval(namabah)
        const editor = document.querySelector('.cm-content');

        if (!editor) {
            console.error("Editor tidak ditemukan!");
            return;
        }

        // Fokus ke editor
        editor.focus();

        // 1. Pindahkan kursor ke paling atas
        editor.dispatchEvent(new KeyboardEvent('keydown', {key: 'Home', ctrlKey: true, bubbles: true}));

        // 2. Turun ke baris 24 (sebanyak 23 kali klik bawah)
        for (let i = 0; i < 23; i++) {
            editor.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown', bubbles: true}));
        }

        // 3. Seleksi dari kursor saat ini sampai paling bawah (Ctrl + Shift + End)
        editor.dispatchEvent(new KeyboardEvent('keydown', {
            key: 'End',
            ctrlKey: true,
            shiftKey: true,
            bubbles: true
        }));

        // 4. Hapus (Backspace)
        setTimeout(() => {
            editor.dispatchEvent(new KeyboardEvent('keydown', {key: 'Backspace', bubbles: true}));
            console.log("Proses hapus selesai.");
        }, 100);
    }

    (async function() {
        const editor = document.querySelector('.cm-content');
        editor.focus();

        // Memberi jeda sangat singkat agar browser mengenali fokusnya
        await new Promise(r => setTimeout(r, 100));
        try {
            // 2. Ambil teks dari clipboard
            // Jika ini pertama kali, browser tetap akan minta izin 'Allow' di pojok kiri atas
            const textFromClipboard = await navigator.clipboard.readText();

            // 6. Timpa dengan teks baru
            setTimeout(() => {
                document.execCommand('insertText', false, textFromClipboard);
                console.log("🔥 Selesai otomatis tanpa klik!");
            }, 100);

        } catch (err) {
            console.warn("⚠️ Browser memblokir fokus otomatis. Jalankan ulang dan klik sekali di halaman.");
            // Fallback: Jika gagal, script akan menunggu 1x klik saja di mana saja
            window.onclick = () => {
                arguments.callee(); // Jalankan ulang script ini saat diklik
                window.onclick = null; // Hapus listener agar tidak double
            };
        }
    })();

},2000)
