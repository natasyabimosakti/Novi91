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
            editor.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter', bubbles: true}));
            editor.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter', bubbles: true}));


        }, 100);
    }



},2000)
