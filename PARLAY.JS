// ==UserScript==
// @name         PARLAY SERVED
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  try to take over the world!
// @author       You
// @updateURL    https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/PARLAY.JS
// @downloadURL  https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/PARLAY.JS
// @match        http*://*/Member*
// @match        http*://*/Main*
// @match        http*://*/*/home.aspx*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue

// ==/UserScript==
var USERNAME_CMD = await GM.getValue("userInfo");
var USERNAME_CMD_DB = '';
var username_bo = '';
var id_config = '';
var nama_web = '';
var konfigurasi1 ='';
var konfigurasi2 ='';
var nama_group ='';
var nomor_urut ='';
var jumlah_web ='';
var type_master='';
var stak ='';

var type_a ='';
var type_auto_a='';

var type_b ='';
var type_c ='';
var type_d ='';
var pur_a ='';
var pur_b ='';
var pur_c ='';
var pur_d ='';
var minimum_odd_a ='';
var minimum_odd_b ='';
var minimum_odd_c ='';
var minimum_odd_d ='';
var code_a ='';
var code_auto_a ='';
var code_b ='';
var code_c ='';
var code_d ='';
var code_uniq ='';
var host_url = "http://103.193.178.92/api";
(function() {
    const links = document.querySelectorAll('a[onclick]');
    let found = false;

    links.forEach(a => {
        const onclick = a.getAttribute('onclick');
        if (!onclick) return;

        const match = onclick.match(/https:\/\/cmd\.private88win\.com\/cmd\/launch\?token=([^']+)/);

        if (match) {
            found = true;
            const token = decodeURIComponent(match[1]);

            console.log("TOKEN DITEMUKAN:", token);

            // --- Toast ---
            let toast = document.createElement("div");
            toast.innerHTML = "TOKEN:<br>" + token;
            toast.style = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #000;
                color: #fff;
                padding: 12px 18px;
                border-radius: 5px;
                box-shadow: 0px 0px 10px rgba(0,0,0,0.4);
                z-index: 999999;
                font-size: 15px;
            `;

            document.body.appendChild(toast);

            setTimeout(() => toast.remove(), 6000);
        }
    });

    if (!found) {
        console.log("Token tidak ditemukan");
    }
})();

function generateRandomCode(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    code_uniq = code;
    return code;
}
generateRandomCode()
console.log(code_uniq)

await GM.setValue('clickedOddsList', []);
waitAndSaveUserInfo()
function waitAndSaveUserInfo() {
    const interval = setInterval(async () => {
        const el = document.querySelector(".UserInfo");
        if (el) {
            const userInfoText = el.innerText.trim();
            if (userInfoText !== USERNAME_CMD){
                await GM.setValue("userInfo", userInfoText);
                console.log("[USER INFO SAVED FROM DOM]", userInfoText);
                clearInterval(interval);
                window.location.reload()
            }
        }
    }, 500);
}

let container = document.createElement('div');
container.style.position = 'fixed';
container.style.top = '10px';
container.style.right = '10px';
container.style.backgroundColor = 'rgba(0,0,0,0.7)';
container.style.padding = '10px';
container.style.borderRadius = '8px';
container.style.zIndex = 9999;
container.style.display = 'none';
document.body.appendChild(container);


function buatTombolPlaceholder() {
    if (document.URL.includes("Member")){
        let keys = ["A", "B", "C", "D"];
        keys.forEach(k => {
            let btn = document.createElement('button');
            btn.textContent = `TIM ${k}`;
            btn.disabled = true; // disable dulu
            container.appendChild(btn);
        });
    }
}
buatTombolPlaceholder();
function loadConfig(username, cb) {
    GM_xmlhttpRequest({
        method: "GET",
        url: `${host_url}/get_config.php?username_cmd=${username}`,
        onload: res => {
            const json = JSON.parse(res.responseText);
            cb(json.data || []);
        }
    });
}


loadConfig(USERNAME_CMD, configs => {
    configs.forEach(cfg => {
        id_config = cfg.id_config
        USERNAME_CMD_DB = cfg.username_cmd
        username_bo = cfg.username
        nama_web = cfg.nama_web
        konfigurasi1 = cfg.konfigurasi1
        konfigurasi2 =cfg.konfigurasi2
        nama_group = cfg.nama_group
        nomor_urut =cfg.nomor_urut
        jumlah_web =cfg.jumlah_web
        type_master=cfg.type_master
        stak =cfg.stak
        type_a =cfg.type_a
        type_auto_a = cfg.type_a
        type_b =cfg.type_b
        type_c =cfg.type_c
        type_d =cfg.type_d
        pur_a =cfg.pur_a
        pur_b =cfg.pur_b
        pur_c =cfg.pur_c
        pur_d =cfg.pur_d
        minimum_odd_a =cfg.minimum_odd_a
        minimum_odd_b =cfg.minimum_odd_b
        minimum_odd_c =cfg.minimum_odd_c
        minimum_odd_d =cfg.minimum_odd_d
        code_a = cfg.code_tima
        code_auto_a = cfg.code_tima
        code_b = cfg.code_timb;
        code_c = cfg.code_timc;
        code_d = cfg.code_timd;
        console.log('CFG FULL:', cfg);
        console.log('CFG KEYS:', Object.keys(cfg));
        let buttons = container.querySelectorAll('button');
        let types = [type_a, type_b, type_c, type_d];
        buttons.forEach((btn, i) => {
            btn.disabled = false;
            btn.textContent = `TIM ${String.fromCharCode(65+i)} ${types[i]}`;
            btn.onclick = () => seleksi(types[i], cfg[`pur_${String.fromCharCode(97+i)}`], cfg[`minimum_odd_${String.fromCharCode(97+i)}`]);
        });
    });
    if(pur_a == '' ||type_master == "Client" ){
        container.style.display = 'none';
    } else{
        container.style.display = 'flex';
    }



    if (document.URL.includes("Member") && type_master == "Client"){

        const tombol = document.createElement('button');
        tombol.textContent = 'Hajar';
        tombol.id = 'tombolHajar';

        // Tambahkan style agar floating
        Object.assign(tombol.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 9999,
            padding: '15px 25px',
            backgroundColor: '#ff5722',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
        });

        // Tambahkan tombol ke body
        document.body.appendChild(tombol);

        // Event klik tombol
        tombol.addEventListener('click', () => {
            function waitForMatches(cb, interval = 1000, timeout = 10000) {
                let elapsed = 0;
                const id = setInterval(() => {
                    const matches = document.querySelectorAll(".tableDiv-match");
                    if (matches.length > 0) {
                        clearInterval(id);
                        cb(matches);
                    } else {
                        elapsed += interval;
                        if (elapsed >= timeout) {
                            clearInterval(id);
                            console.warn("Elemen .tableDiv-match tidak muncul dalam waktu timeout");
                        }
                    }
                }, interval);
            }

            // Panggil fungsi
            waitForMatches((matches) => {
                console.log("Semua matches sudah muncul:", matches.length);

                // --- eksekusi klik dengan delay ---
                const clicks = [
                    { type: type_a, code: code_a, label: "A" },
                    { type: type_b, code: code_b, label: "B" },
                    { type: type_c, code: code_c, label: "C" },
                    { type: type_d, code: code_d, label: "D" }
                ];

                let i = 0;
                const delay = 1000;

                const intervalId = setInterval(() => {
                    if (i >= clicks.length) {
                        clearInterval(intervalId);
                        console.log("Semua klik selesai");
                        return;
                    }

                    const { type, code, label } = clicks[i];

                    if (!type || !code) {
                        console.log(`Skip klik ${label}: type/code kosong`);
                        i++;
                        return;
                    }

                    switch(type.slice(0,1)) {
                        case "H":
                            OddsClick(null, `${code}_Hdp_Home`);
                            break;
                        case "A":
                            OddsClick(null, `${code}_Hdp_Away`);
                            break;
                        case "O":
                            OddsClick(null, `${code}_Over_Home`);
                            break;
                        case "U":
                            OddsClick(null, `${code}_Under_Away`);
                            break;
                        default:
                            console.log(`Type ${label} tidak dikenali:`, type);
                    }

                    console.log(`Klik ${label} (${type}) selesai`);
                    i++;
                }, delay);

            });
        });
        //////AUTO BET



    }
    ///AUTO BETTING
});





function TombolpilihanUpdate() {
    console.log('testb');
    console.log(type_b);
    let buttons = container.querySelectorAll('button');
    let scripts = [
        () => seleksi(type_a, pur_a, minimum_odd_a),
        () => seleksi(type_b, pur_b, minimum_odd_b),
        () => seleksi(type_c, pur_c, minimum_odd_c),
        () => seleksi(type_d, pur_d, minimum_odd_d),
    ];

    buttons.forEach((btn, i) => {
        btn.disabled = false; // enable tombol
        btn.onclick = scripts[i]; // pasang fungsi
        btn.textContent = `TIM ${String.fromCharCode(65+i)} ${[type_a,type_b,type_c,type_d][i]}`;
    });
}








// Event listener klik odds
document.addEventListener('click', async function(e) {
    const target = e.target;
    if (target.tagName === 'A' && target.classList.contains('odds')) {
        const href = target.getAttribute('href');
        if (href && href.startsWith('javascript: OddsClick')) {
            const codeMatch = href.match(/'(.+?)'/);
            if (!codeMatch) return;
            const code = codeMatch[1];
            const matchId = code.split('_')[0];
            let type = code.split('_')[1] === 'Hdp' ? code.split('_')[2] : code.split('_')[1];

            let jam = '';
            let team = '';
            const matchEl = document.querySelector(`#R_${matchId}`);
            if (matchEl) {
                jam = matchEl.getElementsByClassName("tableDiv-match-time")[0].textContent.replace("Live","").trim();
                team = matchEl.getElementsByClassName("tableDiv-match-info__event")[0].textContent.replace("Seri","").trim();
            }

            const value = parseFloat(target.textContent.trim());

            // Ambil array lama
            let list = await GM.getValue('clickedOddsList', []);

            // Cek apakah sudah ada socid yang sama
            const index = list.findIndex(item => item.socid === matchId);
            if (index >= 0) {
                // Update data yang lama
                list[index] = { socid: matchId, type, jam, team, odds: value };
            } else {
                // Tambahkan data baru
                list.push({ socid: matchId, type, jam, team, odds: value });
            }

            // Simpan kembali
            await GM.setValue('clickedOddsList', list);

            console.log('[CLICK ODDS SAVED/UPDATED]', { socid: matchId, type, jam, team, odds: value });
        }
    }
});


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


function seleksi(data,pur,minodds) {
    stopInterval();

    const type= data;
    const global_pur = pur;
    const global_odds= minodds;
    console.log(type, global_pur , global_odds)

    if(type == 'H' || type == 'A' || type == 'HA' || type == 'AB' || type == 'HB' || type == 'AA'){
        //type HDP
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

                if (handicap !== global_pur) {
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
                if(type == 'H' ||type == 'A' ){
                    // cek apakah kedua odds > 1.90
                    if (homeOdds > global_odds && awayOdds >global_odds && isLive) {
                        el.style.display = ''; // tampilkan match
                        oddsLinks[0].style.color = "#ff672b"; // overOdd
                        oddsLinks[1].style.color = "#ff672b"; // underOdd
                    } else {
                        el.style.display = 'none'; // sembunyikan match
                    }

                }else if(type == 'HA' ||type == 'AA' ){
                    if (homeOdds > global_odds && awayOdds > 1.70 && isLive) {
                        el.style.display = ''; // tampilkan match
                        oddsLinks[0].style.color = "#ff672b"; // overOdd
                        oddsLinks[1].style.color = ""; // underOdd
                    } else {
                        el.style.display = 'none'; // sembunyikan match
                    }
                }else if(type == 'HB'||type == 'AB'){
                    if (homeOdds > 1.70 && awayOdds > global_odds && isLive) {
                        el.style.display = ''; // tampilkan match
                        oddsLinks[0].style.color = ""; // overOdd
                        oddsLinks[1].style.color = "#ff672b"; // underOdd
                    } else {
                        el.style.display = 'none'; // sembunyikan match
                    }
                }

            });

        }, 500); // contoh tiap 3 detik
    }else{
        //type O/U
        currentInterval = setInterval(() => {
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
                    let ouText = ouDiv.querySelector('.tableDiv-match-odds b')?.textContent.trim(); // misal "2.5/3"
                    let underAway = parseFloat(ouDiv.querySelector('.tableDiv-match-odds__detail a:nth-child(2)')?.textContent.trim() || 0);
                    let overAway = parseFloat(ouDiv.querySelector('.tableDiv-match-odds__detail a:nth-child(1)')?.textContent.trim() || 0);
                    if(type == 'O' || type == 'U'){
                        if (ouText == global_pur && underAway >= global_odds && overAway >= global_odds && isLive) {
                            el.style.display = ""; // sembunyikan
                            oddsDetail[0].style.color = "#ff672b"; // overOdd
                            oddsDetail[1].style.color = "#ff672b"; // underOdd
                        } else {
                            el.style.display = "none"; // tampilkan
                        }
                    } else if(type == 'OA' || type == 'UA') {
                        if (ouText == global_pur && underAway >= 1.70 && overAway >= global_odds && isLive) {
                            el.style.display = "";
                            oddsDetail[0].style.color = "#ff672b"; // overOdd
                            oddsDetail[1].style.color = ""; // underOdd
                        } else {
                            el.style.display = "none"; // tampilkan
                        }
                    } else if(type == 'OB' || type == 'UB') {
                        if (ouText == global_pur && underAway >= global_odds && overAway >= 1.70 && isLive) {
                            el.style.display = "";
                            oddsDetail[0].style.color = ""; // overOdd
                            oddsDetail[1].style.color = "#ff672b"; // underOdd
                        } else {
                            el.style.display = "none"; // tampilkan
                        }
                    }
                }

                // tampilkan atau sembunyikan match
            });

        }, 500);

    }


};

// Ambil semua elemen mixParBetWin


function kirim_history() {

    if (document.URL.includes("Main")) {
        console.log("kirim history")
        const mixTables = document.querySelectorAll(".mixParBetWin");

        // Array untuk menampung semua data
        const allData = [];
        const total_bet = Math.round((parseFloat(document.getElementById("lb_ComboStake")?.textContent) || 0) * 1000);
        const total_odds = document.getElementById("lb_parlay_odds")?.textContent || "";
        const kemenangan = Math.round((parseFloat(document.getElementById("lb_estPayVal")?.textContent) || 0) * 1000);

        // Loop tiap tabel
        mixTables.forEach(tbl => {
            const row = tbl.children[0]; // tbody > tr
            const rowChildren = row.children; // td

            const data = [];
            for (let i = 0; i < 6; i++) { // ambil 6 td pertama, bisa disesuaikan
                if (rowChildren[i]) data.push(rowChildren[i].textContent.trim());
                else data.push(null);
            }

            allData.push(data);
        });
        console.log(allData)

        // Buat payload untuk dikirim
        const payload = {
            id_config: id_config,// dari variabel global
            nama_group: nama_group,// dari variabel global
            tanggal: new Date().toISOString(), // timestamp
            total_bet: total_bet,
            total_odds: total_odds,
            kemenangan: kemenangan,
            data: allData,// simpan array dari mixParBetWin
            code_uniq : code_uniq

        };

        // Kirim ke server PHP (endpoint simpan database)
        GM_xmlhttpRequest({
            method: "POST",
            url: `${host_url}/save_history.php`, // ganti dengan URL server-mu
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify(payload),
            onload: (res) => {
                console.log("Data berhasil dikirim:", res.responseText);
            },
            onerror: (err) => {
                console.error("Gagal mengirim data:", err);
            }
        });
    }
}

document.addEventListener('click', async function(e){
    if(type_master=='Master'){
        const target = e.target;
        if(target.id === 'btnBet') {
            const clickedOddsData = await GM_getValue('clickedOddsList', []);
            if(!clickedOddsData || clickedOddsData.length === 0) return;

            const tables = document.querySelectorAll('#pnParlayC .mixParBetWin');
            if(!tables || tables.length === 0) return;

            // Variabel id_config
            let payload = { id_config ,no_bo: 1, nama_group :nama_group };

            tables.forEach((tbl, index) => {
                const removeItem = tbl.querySelector('.img-removeitem[socid]');
                if(!removeItem) return;
                const socid = removeItem.getAttribute('socid');

                // cari di storage
                const matchData = clickedOddsData.find(o => o.socid === socid);
                if(!matchData) return;

                // Tentukan suffix: tima, timb, timc, timd
                const suffix = ['tima','timb','timc','timd'][index] || `tim${index+1}`;

                payload[`code_${suffix}`] = matchData.socid;
                payload[`jam_${suffix}`] = matchData.jam;
                payload[`nama_${suffix}`] = matchData.team;
            });

            console.log('[PAYLOAD TO SEND]', payload);
            // Kirim ke server/webhook
            GM_xmlhttpRequest({
                method: "POST",
                url: `${host_url}/save_auto_buy.php`,
                headers: { "Content-Type": "application/json" },
                data: JSON.stringify(payload),
                onload: (res) => console.log('Sent to server', res.responseText),
                onerror: (err) => console.error('Error sending', err)
            });
            kirim_history()

        }

    }else{
        const target = e.target;
        if(target.id === 'btnBet') {
            // Ambil semua code_x yang ada dan tidak null/undefined
            const codes = [code_a, code_b, code_c, code_d].filter(v => v); // hanya yang ada isinya

            if(codes.length === 0) return; // tidak ada yang perlu dicocokkan

            // Ambil semua socid di DOM
            const tables = document.querySelectorAll('#pnParlayC .mixParBetWin');
            const socidInDOM = Array.from(tables)
            .map(tbl => {
                const removeItem = tbl.querySelector('.img-removeitem[socid]');
                return removeItem ? removeItem.getAttribute('socid') : null;
            })
            .filter(Boolean); // hanya yang ada socid

            // Cek kecocokan
            const missing = codes.filter(code => !socidInDOM.includes(code));

            if(missing.length > 0) {
                alert('ada Kesalahan bet Jangan Lanjutkan: ' + missing.join(', '));
            } else {
                console.log('Semua kode cocok, tidak ada aksi.');
            }
            kirim_history()

        }

    }
});

// Target yang dipantau
const sportMenu = document.querySelector('.SportMenu');

if (!sportMenu) {
    console.error('SportMenu tidak ditemukan');
    return;
}
// Mutation Observer
const observer = new MutationObserver(() => {
    const items = document.querySelectorAll('.mixParBetWin');

    // kalau lebih dari 1 → hapus yang lama
    if (items.length > 1) {
        console.log('Jumlah item:', items.length);

        // hapus semua kecuali yang terakhir
        for (let i = 0; i < items.length - 1; i++) {
            const removeBtn = items[i].querySelector('.img-removeitem');
            if (removeBtn) {
                console.log('Menghapus item ke-', i);
                removeBtn.click();
                observer.disconnect();

            }
        }
    }else{
        observer.disconnect();
    }
});

// Mulai observasi
observer.observe(sportMenu, {
    childList: true,
    subtree: true
});



