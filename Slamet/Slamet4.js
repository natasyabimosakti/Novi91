// ==UserScript==
// @name         NEW Slamet 4
// @namespace    http://tampermonkey.net/
// @version      3.136
// @description  try to take over the world!
// @require      file:///media/veracrypt1/Core_Bot/Core.js
// @author       You
// @match        *://*.facebook.com/*
// @run-at       document-end
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        window.close
// @connect      api.telegram.org
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// @grant        window.focus
// ==/UserScript==

var namagroup18 = 'Jawatengah';
var Comment18 = 'slamet4';



if (typeof window.initBabonLogic === 'function') {
    window.initBabonLogic(namagroup18, Comment18);
} else {
    console.error("❌ Core Script Gagal Dimuat! Pastikan file 'Core.js' ada di folder Core_Bot dan izin 'Allow access to file URLs' sudah aktif di pengaturan ekstensi.");
}
