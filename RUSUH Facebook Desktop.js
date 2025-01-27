// ==UserScript==
// @name         RUSUH
// @namespace    http://tampermonkey.net/
// @version      3.5
// @description  try to take over the world!
// @author       You
// @match        http*://facebook.com/*
// @match        http*://*.facebook.com/*
// @run-at       document-end
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        window.close
// ==/UserScript==


var postingan = ["Sebelum ROOM LOMBA Keluar silahkan predksi dulu",
                 "ROOM LOMBA SENG SUWI OJO DI UP BLOK",
                 "TERTIDUR MENUNGGU ROOM LOMBA",
                 "MARI KITA NGOPI SAMBIL NUNGGU ROM LOMBA KELUAR MASTER",
                 "MIN SEDIAKAN ROOM PREDIKZ KHUSUS HK",
                 "MIN SEDIAKAN ROOM PRED1KZ1 KHUSUS SGP",
                 "JADWAL LOMBA JAM BERAPA",
                 "HK 18*27*49 SIAP POSTING DI ROOM LOMBA",
                 "IKUT LOMBA MIN",
                 "Doa dulu sebelum lomba di mulai",
                 "Menunggu ROOM LOMBA UP",
                 "MIN RULS LOMBA",
                 "Peraturan LOMBA Di Mana?",
                 "Gosok teros Hpne ngenteni ROOM Metu",
                 "SGP BBFS 8279 SIAP LOMBA",
                 "LOMBA GOSOK",
                 "LOMBA SCROLL FACEBOOK",
                 "Min OJO lali ROOM LOMBA e",
                 "Ayo MiN ROOM LOMBA ne",
                 "CODE ALAM LOMBA-LOMBA",
                 "Gerakan Penunggu LOMBA",
                 "SIAP-SIAP LOMBA AKAN DI MULAI",
                 "Min ROOM LOMBA MENUNGGU PERSETUJUAN",
                 "Adakan LOMBA FREEBET",
                 "RIKO MELU LOMBA GANTENG2",
                 "TERNGEROOM HK 25 13 59",
                 "TERNGEROOM SGP 68 32 56 57 23"]

var clickpostbox = setInterval(function(){
    for(var i = 40; i <= document.querySelectorAll("[role='button']").length;i++){
        if(document.querySelectorAll("[role='button']")[i].textContent.includes("Tulis")){
            console.log("data "+i)
            document.querySelectorAll("[role='button']")[i].click()
            clearInterval(clickpostbox)
            break;
        }
    }

}, 2000)

var pastingpost = setInterval(function(){

    if(document.querySelectorAll("[data-contents='true']")[0]){
        //Pasting Virtual
        const text = postingan[Math.floor(Math.random() * 28)]
        const dataTransfer = new DataTransfer();
        dataTransfer.setData('text', text);
        const event = new ClipboardEvent('paste', {
            clipboardData: dataTransfer,
            bubbles: true
        });
        document.querySelectorAll("[data-contents='true']")[0].dispatchEvent(event)
        //Pasting Virtual
        document.querySelectorAll("[aria-label='Posting']")[0].click()
        clearInterval(pastingpost)

    }



}, 2000)


