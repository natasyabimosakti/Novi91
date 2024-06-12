// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2024-06-12
// @description  try to take over the world!
// @author       You
// @match        https://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==


(function() {
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
    'use strict';
const myHeaders = new Headers();
myHeaders.append("dpr", "1");
myHeaders.append("viewport-width", "400");
myHeaders.append("sec-ch-ua", "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"");
myHeaders.append("sec-ch-ua-mobile", "?1");
myHeaders.append("sec-ch-ua-platform", "\"Android\"");
myHeaders.append("sec-ch-ua-platform-version", "\"6.0\"");
myHeaders.append("sec-ch-ua-model", "\"Nexus 5\"");
myHeaders.append("sec-ch-ua-full-version-list", "\"Google Chrome\";v=\"125.0.6422.142\", \"Chromium\";v=\"125.0.6422.142\", \"Not.A/Brand\";v=\"24.0.0.0\"");
myHeaders.append("sec-ch-prefers-color-scheme", "dark");
myHeaders.append("Upgrade-Insecure-Requests", "1");
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
myHeaders.append("User-Agent", "Mozilla/5.0 (Linux; Android 13; SM-S901B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36");
myHeaders.append("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7");
myHeaders.append("Sec-Fetch-Site", "same-origin");
myHeaders.append("Sec-Fetch-Mode", "navigate");
myHeaders.append("Sec-Fetch-User", "?1");
myHeaders.append("Sec-Fetch-Dest", "document");
myHeaders.append("host", "mbasic.facebook.com");
myHeaders.append("Cookie", "datr=CCZqZnGr7_aEelE0vUNkRkBm");

const urlencoded = new URLSearchParams();
urlencoded.append("c_src", "group");
urlencoded.append("ctype", "inline");
urlencoded.append("cver", "amber");
urlencoded.append("cwevent", "composer_entry");
urlencoded.append("fb_dtsg", document.querySelectorAll("[name='fb_dtsg']")[0].value);
urlencoded.append("jazoest", document.querySelectorAll("[name='jazoest']")[0].value);
urlencoded.append("referrer", "group");
urlencoded.append("rst_icv", "");
urlencoded.append("target", document.querySelectorAll("[name='target']")[0].value);
urlencoded.append("view_post", "Posting");
urlencoded.append("xc_message", postingan[Math.floor(Math.random() * 28)]);

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: urlencoded,
  redirect: "follow"
};

fetch(document.querySelectorAll("[method='post']")[0].action, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
    // Your code here...
location.href="about:blank";
})();
