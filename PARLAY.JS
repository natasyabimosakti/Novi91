// ==UserScript==
// @name         ROBOT PARLAY

// @namespace    http://tampermonkey.net/
// @version      2024-08-12
// @description  try to take over the world!
// @author       You
// @match        http*://*/Member*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Fungsi untuk isi match kosong berdasarkan groupid
    function fillEmptyMatches() {
        let matches = document.querySelectorAll('.tableDiv-match');

        // Simpan data valid per groupid
        let groupData = {};

        matches.forEach(el => {
            let gid = el.getAttribute('groupid');
            if (!gid) return;

            let idNum = el.id.split('_')[1];
            let top = el.querySelector(`#top_${idNum}`);
            let bot = el.querySelector(`#bot_${idNum}`);
            let ht = el.querySelector(`#ht_${idNum}`);
            let at = el.querySelector(`#at_${idNum}`);

            if (top && top.textContent.trim() !== '' && ht && ht.textContent.trim() !== '' && at && at.textContent.trim() !== '') {
                groupData[gid] = {
                    topText: top.textContent,
                    botText: bot ? bot.textContent : '',
                    htText: ht.textContent,
                    atText: at.textContent
                };
            }
        });

        // Isi elemen kosong dengan data dari group yang sama
        matches.forEach(el => {
            let gid = el.getAttribute('groupid');
            if (!gid || !groupData[gid]) return;

            let idNum = el.id.split('_')[1];
            let top = el.querySelector(`#top_${idNum}`);
            let bot = el.querySelector(`#bot_${idNum}`);
            let ht = el.querySelector(`#ht_${idNum}`);
            let at = el.querySelector(`#at_${idNum}`);

            if (top && top.textContent.trim() === '') top.textContent = groupData[gid].topText;
            if (bot && bot.textContent.trim() === '') bot.textContent = groupData[gid].botText;
            if (ht && ht.textContent.trim() === '') ht.textContent = groupData[gid].htText;
            if (at && at.textContent.trim() === '') at.textContent = groupData[gid].atText;

            // hapus class hide dari parent span jika masih ada
            let panelTime = el.querySelector('.panel-time.hide');
            if (panelTime) panelTime.classList.remove('hide');

            let matchInfo = el.querySelector('.tableDiv-match-info.hide');
            if (matchInfo) matchInfo.classList.remove('hide');
        });
    }

    // Jalankan otomatis tiap 500ms
    let fillInterval = setInterval(fillEmptyMatches, 500);

    let container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '10px';
    container.style.right = '10px';
    container.style.backgroundColor = 'rgba(0,0,0,0.7)';
    container.style.padding = '10px';
    container.style.borderRadius = '8px';
    container.style.zIndex = 9999;
    container.style.color = 'white';
    container.style.fontFamily = 'Arial, sans-serif';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '5px';
    document.body.appendChild(container);

    // Global interval
    let currentInterval = null;

    // Fungsi untuk menghentikan interval
    function stopInterval() {
        if(currentInterval !== null){
            clearInterval(currentInterval);
            currentInterval = null;
            console.log("Interval sebelumnya dihentikan");
        }
    }

    // Daftar script interval
    let scripts = {
        "TIM A HDP": function() {
            stopInterval();
            console.log("Menjalankan interval TIM A");
            currentInterval = setInterval(() => {
                console.log(document.URL);
                // ambil semua elemen match
                let matches = document.querySelectorAll('.tableDiv-match');

                matches.forEach(el => {

                    let idNum = el.id.split('_')[1];
                    let bot = el.querySelector(`#bot_${idNum}`);
                    let isLive = bot && bot.textContent.toUpperCase().includes('LIVE');
                    // ambil elemen handicap (b) di dalam .w-hdp
                    let hd = el.querySelector('.w-hdp b');
                    if (!hd) return;
                    let oddsDetail = el.querySelectorAll('.tableDiv-match-odds__detail');


                    let handicap = hd.textContent.trim();
                    // hapus karakter yang tidak perlu
                    handicap = handicap.replace(/\s+/g, '');
// @version      3.NaN
                    if (handicap !== '0.5') {
                        // sembunyikan jika bukan 0.5
                        el.style.display = 'none';
                        return;
                    }

                    // ambil odds Home dan Away
                    let oddsLinks = el.querySelectorAll('.w-hdp .tableDiv-match-odds__detail a');
                    if (oddsLinks.length < 2) {
                        el.style.display = 'none';
                        return;
                    }

                    let homeOdds = parseFloat(oddsLinks[0].textContent.trim());
                    let awayOdds = parseFloat(oddsLinks[1].textContent.trim());

                    // cek apakah kedua odds > 1.90
                    if (homeOdds > 1.90 && awayOdds > 1.90 && isLive) {
                        el.style.display = ''; // tampilkan match
                        oddsLinks[0].style.color = "#ff672b"; // overOdd
                        oddsLinks[1].style.color = "#ff672b"; // underOdd
                    } else {
                        el.style.display = 'none'; // sembunyikan match
                    }
                });

            }, 500); // contoh tiap 3 detik
        },
        "TIM B PATAH O/U": function() {
            stopInterval();
            console.log("Menjalankan interval TIM B");
            currentInterval = setInterval(() => {
                console.log("Interval TIM B jalan...");
                // ambil semua match
                let matches = document.querySelectorAll('.tableDiv-match');

                matches.forEach(el => {

                    let idNum = el.id.split('_')[1];
                    let bot = el.querySelector(`#bot_${idNum}`);
                    let isLive = bot && bot.textContent.toUpperCase().includes('LIVE');
                    let oddsDetail = el.querySelectorAll('.col.w-ou .tableDiv-match-odds__detail a');

                    // ===== Filter Tim B =====
                    let ouDiv = el.querySelector('.w-ou .tableDiv-match-odds');
                    let showB = false;

                    if (ouDiv) {
                        let ouText = ouDiv.querySelector('b')?.textContent.trim(); // misal "2.5/3"
                        let underAway = parseFloat(ouDiv.querySelector('.tableDiv-match-odds__detail a:nth-child(2)')?.textContent.trim() || 0);

                        // cek O/U = "2.5/3" dan Under Away minimal 2.30
                        if (ouText === "2.5/3" && underAway >= 2.30 && isLive) {
                            showB = true;
                        }
                    }

                    // tampilkan atau sembunyikan match
                    if (showB) {
                        el.style.display = '';
                        oddsDetail[0].style.color = "#ff672b"; // overOdd
                        oddsDetail[1].style.color = "#ff672b"; // underOdd
                    } else {
                        el.style.display = 'none';
                    }
                });

            }, 500);
        },
        "TIM C HDP": function() {
            stopInterval();
            console.log("Menjalankan interval TIM C");
            currentInterval = setInterval(() => {
                console.log("Interval TIM C jalan...");
                // ambil semua elemen match
                let matches = document.querySelectorAll('.tableDiv-match');

                matches.forEach(el => {
                    // ambil elemen handicap (b) di dalam .w-hdp
                    let hd = el.querySelector('.w-hdp b');
                    if (!hd) return;

                    let idNum = el.id.split('_')[1];
                    let bot = el.querySelector(`#bot_${idNum}`);
                    let isLive = bot && bot.textContent.toUpperCase().includes('LIVE');
                    let oddsDetail = el.querySelectorAll('.tableDiv-match-odds__detail');

                    let handicap = hd.textContent.trim();
                    // hapus karakter yang tidak perlu
                    handicap = handicap.replace(/\s+/g, '');

                    if (handicap !== '0.5') {
                        // sembunyikan jika bukan 0.5
                        el.style.display = 'none';
                        return;
                    }

                    // ambil odds Home dan Away
                    let oddsLinks = el.querySelectorAll('.w-hdp .tableDiv-match-odds__detail a');
                    if (oddsLinks.length < 2) {
                        el.style.display = 'none';
                        return;
                    }

                    let homeOdds = parseFloat(oddsLinks[0].textContent.trim());
                    let awayOdds = parseFloat(oddsLinks[1].textContent.trim());

                    // cek apakah kedua odds > 1.90
                    if (homeOdds > 1.90 && awayOdds > 1.90 && isLive) {
                        el.style.display = ''; // tampilkan match
                        oddsLinks[0].style.color = "#ff672b"; // overOdd
                        oddsLinks[1].style.color = "#ff672b"; // underOdd
                    } else {
                        el.style.display = 'none'; // sembunyikan match
                    }
                });

            }, 500);
        },
        "TIM Z O/U": function() {
            stopInterval();
            console.log("Menjalankan interval TIM Z");
            currentInterval = setInterval(() => {
                console.log("Interval TIM Z jalan...");
                // ambil semua match
                let matches = document.querySelectorAll('.tableDiv-match');

                matches.forEach(el => {
                    // ambil O/U
                    let ouEl = el.querySelector('.col.w-ou .tableDiv-match-odds b');
                    let oddsDetail = el.querySelectorAll('.col.w-ou .tableDiv-match-odds__detail a');

                    if (!ouEl || !oddsDetail || oddsDetail.length < 2) {
                        el.style.display = "none";
                        return;
                    }

                    let ouText = ouEl.textContent.trim().replace(/\s+/g, ''); // misal "2.5"
                    let overOdd = parseFloat(oddsDetail[0].textContent);
                    let underOdd = parseFloat(oddsDetail[1].textContent);
                    let idNum = el.id.split('_')[1];
                    let bot = el.querySelector(`#bot_${idNum}`);
                    let isLive = bot && bot.textContent.toUpperCase().includes('LIVE');

                    if (ouText == "2.5" && overOdd > 1.90 && underOdd > 1.90 && isLive) {
                        el.style.display = ""; // sembunyikan
                        oddsDetail[0].style.color = "#ff672b"; // overOdd
                        oddsDetail[1].style.color = "#ff672b"; // underOdd
                    } else {
                        el.style.display = "none"; // tampilkan
                    }
                });

            }, 500);
        }
    };

    // Buat tombol untuk setiap script
    for (let key in scripts) {
        let btn = document.createElement('button');
        btn.textContent = key;
        btn.style.padding = '5px 10px';
        btn.style.border = 'none';
        btn.style.borderRadius = '4px';
        btn.style.cursor = 'pointer';
        btn.style.backgroundColor = '#007bff';
        btn.style.color = 'white';
        btn.addEventListener('click', scripts[key]);
        container.appendChild(btn);
    }

    console.log(document.URL)
})();
