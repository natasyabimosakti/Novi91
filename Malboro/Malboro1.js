// ==UserScript==
// @name         MALBORO 1
// @namespace    http://tampermonkey.net/
// @version      3.160
// @description  try to take over the world!
// @updateURL    https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Malboro/Malboro1.js
// @downloadURL  https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Malboro/Malboro1.js
// @author       You
// @match        http*://*/*
// @run-at       document-end
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        window.close
// ==/UserScript==



var namagroup1 = 'SHIOKELINCI';
var Comment1 = '#shiokelinci4d*ANANDA122*36*80'; 

var namagroup2 = 'BUKU';
var Comment2 = 'IYATOTO ANAKCODA83 37*15*50'; 

var namagroup3 = 'TIKTAK';
var Comment3 = 'Tiktaktogel / ASUKAU348 / 14 , 57 , 42'; 

var namagroup4 = 'GAIB';
var Comment4 = 'GAIB4D=ANJANI48=65*56*48'; 

var namagroup5 = 'KEITOGEL';
var Comment5 = '#keitogel = (ANITI348) = 47*54*49'; 

var namagroup6 = 'KIOS';
var Comment6 = 'KIOSTOTO=ANDONG49=17*95*61'; 

var namagroup7 = '453P VIP';
var Comment7 = 'ASEPTOGEL ANJLOK549 55*90*06'; 

var namagroup8 = 'MENARA';
var Comment8 = '#MENARA4D=ANUNTU284= 51*35'; 

var namagroup9 = 'GIL4';
var Comment9 = 'GILA4D=ANALOH49=78*46*77'; 

var namagroup10 = 'JNE';
var Comment10 = '#JNETOTO(ALORJI3)*71*96*75'; 

var namagroup11 = 'TOYIB';
var Comment11 = '#TOYIBSLOT ( AMBOH45 ) : 12*86*68'; 

var namagroup12 = 'MASTER KUY';
var Comment12 = 'TOGELKUY AMARE45 33*92*66'; 

var namagroup13 = 'KOI';
var Comment13 = '#KOITOTO ( AMBOH45 ) 11*20'; 

var namagroup14 = 'ANGKER';
var Comment14 = 'ANGKER4D=ANUNTU284=58*88*41'; 

var namagroup15 = 'VESPA';
var Comment15 = 'VESPATOGEL (AMITAMI4) 02*09*38'; 

var namagroup16 = 'Nemo';
var Comment16 = 'NEMO4D (ANANDA122) : 67*98*38'; 

var namagroup17 = 'KIKO';
var Comment17 = '#KIKOTOTO (ANAKCODA83) = 05*60';
  
var namagroup18 = 'Jawatengah';
var Comment18 = 'Group Malb 1';


var refresh = 40;

var admin = ["Siâo","andre","adiat","andy","ayunda","audi","arxidi","adi","aldi","ananda","alde","adm","ayesha","aqisya","anjani","apri","amore","arifin","ayunda","agung","arem","arifa","azahra",
             "boleng","biru","bobby","bastian","bambang","bogard","bannet","botack","bang","aru sundawa","agus tiar","imam","oppe","komandan","melinda","ranger",
             "cristina","camb","cassa","che","cinta","celsia","calista","cahyo","cipto","claura","chelsea","calista","chin",
             "david","dewa","desi","debby","dewi","dentoto","dika","delon","dewy","damara",
             "erwin","elvina","evelyn","enzo",
             "fira","fahresa","findlay","fatimah",
             "gita","genzo","gambrong",
             "habib","hefi","hoihai","herfizah","hanny","hanabi","hokage","hoi hai",
             "icha","iyatoto","intan",
             "jordi","jaguar","jne","je pe","jess","junior","jovanka","jasmine",
             "kei","kumbara","kembar","kotna","karina","kopi","kang",
             "lianda","lusiana","lina","laura","lia","lollo","lupin",
             "mahendra","monica","mey","mersya","mad rm","multi","mariana","melati","meleqq","megaways","minion","melly","monicha","manu","maryam","mode","mary",
             "nasution","nyocol","naura","neng","nino","nona","neman","novi","nella","nayla","naomi","nica",
             "oscar","ozawa",
             "pung","puput","priyan","primus","primus","prediction","pebri","pasil",
             "ratu","rio","ria","rikodo","rizal","roy","rendy","rahma","ratsa","sinta","rara","ratna","mamad",
             "sandiego","sanjaya","siska","safar","sinta","surianti","satria","sapto","salsabila","sanchez","sofia","sonia","serena","specialis","seojun","saskia","sifa","seojun","sudewo","sembroh",
             "tink","tiktak","tiara","tatang","tomi",
             "xian","vivi",
             "yanty","yoky","yohana","yura","yaya",
             "wulan","wok","wak",
             "zuko",
             "kanaya","dealova","amel lia","keyza"];



var keyword1 = "ROOM"
var keyword2 = "𝗥𝗢𝗢𝗠"
var keyword3 = "LOMBA"
var keyword4 = "𝗟𝗢𝗠𝗕𝗔"
var keyword5 = "𝐋𝐎𝐌𝐁𝐀"
var keyword6 = "LIMBA"
var keyword7 = "ROM"
var keyword8 = "R00M"
var keyword9 = "login"
var keyword10 = "𝐑𝐎𝐎𝐌"
var keyword11 = "HONGKONG"
var keyword12 = "SINGAPUR"
var keyword13 = "nemo"

var Backlist1 = "pemenang lomba";
var Backlist2 = "rekap";
var Backlist3 = "hasil";
var Backlist4 = "room lomba freebet";
var Backlist5 = "prediksi";
var Backlist6 = "result";
var Backlist7 = "juara lomba";

var isCommenting = false;
var isDound = false;
var EXPIRATION_MS = 8 * 60 * 1000; // 5 minutes
var now = Date.now();

// ✅ Daftar grup dan nilai default yang ingin disimpan
var groups = [
    { groupId: namagroup1, defaultValue: false },
    { groupId: namagroup2, defaultValue: false },
    { groupId: namagroup3, defaultValue: false },
    { groupId: namagroup4, defaultValue: false },
    { groupId: namagroup5, defaultValue: false },
    { groupId: namagroup6, defaultValue: false },
    { groupId: namagroup7, defaultValue: false },
    { groupId: namagroup8, defaultValue: false },
    { groupId: namagroup9, defaultValue: false },
    { groupId: namagroup10, defaultValue: false },
    { groupId: namagroup11, defaultValue: false },
    { groupId: namagroup12, defaultValue: false },
    { groupId: namagroup13, defaultValue: false },
    { groupId: namagroup14, defaultValue: false },
    { groupId: namagroup15, defaultValue: false },
    { groupId: namagroup16, defaultValue: false },
    { groupId: namagroup17, defaultValue: false },
    { groupId: namagroup18, defaultValue: false }
    // Tambahkan groupId lain sesuai kebutuhan
];
var datakomen = {
                    [namagroup1]: await GM.getValue(`group_${namagroup1}`),
                    [namagroup2]: await GM.getValue(`group_${namagroup2}`),
                    [namagroup3]: await GM.getValue(`group_${namagroup3}`),
                    [namagroup4]: await GM.getValue(`group_${namagroup4}`),
                    [namagroup5]: await GM.getValue(`group_${namagroup5}`),
                    [namagroup6]: await GM.getValue(`group_${namagroup6}`),
                    [namagroup7]: await GM.getValue(`group_${namagroup7}`),
                    [namagroup8]: await GM.getValue(`group_${namagroup8}`),
                    [namagroup9]: await GM.getValue(`group_${namagroup9}`),
                    [namagroup10]: await GM.getValue(`group_${namagroup10}`),
                    [namagroup11]: await GM.getValue(`group_${namagroup11}`),
                    [namagroup12]: await GM.getValue(`group_${namagroup12}`),
                    [namagroup13]: await GM.getValue(`group_${namagroup13}`),
                    [namagroup14]: await GM.getValue(`group_${namagroup14}`),
                    [namagroup15]: await GM.getValue(`group_${namagroup15}`),
                    [namagroup16]: await GM.getValue(`group_${namagroup16}`),
                    [namagroup17]: await GM.getValue(`group_${namagroup17}`),
                    [namagroup18]: await GM.getValue(`group_${namagroup18}`)
                };

async function manageGroups() {
    for (const { groupId, defaultValue } of groups) {
        const key = `group_${groupId}`;
        const expireKey = `${key}_expire`;
        const expireAt = await GM.getValue(expireKey, 0);

        if (now > expireAt) {
            console.log(`Group ${groupId} expired. Resetting.`);
            await GM.setValue(key, defaultValue);
            await GM.setValue(expireKey, now + EXPIRATION_MS);
        }
    }
}

manageGroups()

var myrefresh = setInterval(function(){

    if(document.location.href.includes("group")){
        window.scroll(0,200)
    }
    if(isCommenting){
        startAutoTask();
    }
    if(document.location.href.includes("group")){
        for (let ntv = 0; ntv < document.querySelectorAll('[data-tracking-duration-id').length; ntv++) {
            if (document.querySelectorAll('[data-tracking-duration-id')[ntv]){
                // Nama FB
                var namafb = document.querySelectorAll('[data-tracking-duration-id')[ntv].getElementsByTagName("span")[0];
                //Jam
                var jamposting1 = document.querySelectorAll('[data-tracking-duration-id')[ntv].getElementsByTagName("span")[1].textContent;
                var jamposting2 = document.querySelectorAll('[data-tracking-duration-id')[ntv].getElementsByTagName("span")[2].textContent;
                //Postingan
                var postingan =document.querySelectorAll('[data-tracking-duration-id')[ntv]
                //Comment Box
                var commentbox = document.querySelectorAll('[data-tracking-duration-id')[ntv].getElementsByClassName('native-text')
                // Cek Jam

                if (postingan.textContent.includes("Baru")||postingan.textContent.split(' meni')[0].slice(-2) == 1||postingan.textContent.split(' meni')[0].slice(-2) == 2||postingan.textContent.split(' meni')[0].slice(-2) == 3||postingan.textContent.split(' meni')[0].slice(-2) == 4||postingan.textContent.split(' meni')[0].slice(-2) == 5||postingan.textContent.split(' meni')[0].slice(-2) == "‎1"||postingan.textContent.split(' meni')[0].slice(-2) == "‎2"||postingan.textContent.split(' meni')[0].slice(-2) == "‎3"||postingan.textContent.split(' meni')[0].slice(-2) == "‎4"||postingan.textContent.split(' meni')[0].slice(-2) == "‎5"){
                    console.log("Jam Ditemukan " + jamposting1)
                    if(postingan.textContent.toLowerCase().includes(Backlist1.toLowerCase())
                       ||postingan.textContent.toLowerCase().includes(Backlist2.toLowerCase())
                       ||postingan.textContent.toLowerCase().includes(Backlist3.toLowerCase())
                       ||postingan.textContent.toLowerCase().includes(Backlist4.toLowerCase())
                       ||postingan.textContent.toLowerCase().includes(Backlist5.toLowerCase())
                       ||postingan.textContent.toLowerCase().includes(Backlist6.toLowerCase())
                       ||postingan.textContent.toLowerCase().includes(Backlist7.toLowerCase())){
                        console.log("Terdaftar Backlist...!  ");
                        continue;
                    }
                    console.log("Proses dilanjutkan tidak ada Backlist");
                    if(postingan.textContent.toLowerCase().includes(keyword1.toLowerCase())
                       ||postingan.textContent.toLowerCase().includes(keyword2.toLowerCase())
                       ||postingan.textContent.toLowerCase().includes(keyword3.toLowerCase())
                       ||postingan.textContent.toLowerCase().includes(keyword4.toLowerCase())
                       ||postingan.textContent.toLowerCase().includes(keyword5.toLowerCase())
                       ||postingan.textContent.toLowerCase().includes(keyword6.toLowerCase())
                       ||postingan.textContent.toLowerCase().includes(keyword7.toLowerCase())
                       ||postingan.textContent.toLowerCase().includes(keyword8.toLowerCase())
                       ||postingan.textContent.toLowerCase().includes(keyword9.toLowerCase())
                       ||postingan.textContent.toLowerCase().includes(keyword10.toLowerCase())
                       ||postingan.textContent.toLowerCase().includes(keyword11.toLowerCase())
                       ||postingan.textContent.toLowerCase().includes(keyword12.toLowerCase())
                       ||postingan.textContent.toLowerCase().includes(keyword13.toLowerCase())){
                        console.log("Keyword Ditemukan " + postingan.textContent);
                    }else{
                        continue;
                    }
                    // Cek Backlist

                    // Cek Admin
                    for (var adm in admin){
                        if(namafb.textContent.toLowerCase().includes(admin[adm].toLowerCase())||jamposting2.toLowerCase().includes("admin")||jamposting2.toLowerCase().includes("moderator")||jamposting1.toLowerCase().includes("admin")||jamposting1.toLowerCase().includes("moderator")){
                            // Tampilkan Siapa Yang Memposting
                            if(jamposting2.toLowerCase().includes("admin")||jamposting2.toLowerCase().includes("moderator")){
                                console.log("Admin yang Memosting = Admin/Moderator");
                            }else{
                                console.log("Admin yang Memosting = " + admin[adm]);
                            }

                            // Click Comment Box
                            let tombolKirim = Array.from(document.querySelectorAll('[data-tracking-duration-id')[ntv].getElementsByClassName('native-text'))
                            .find(el => el.textContent.toLowerCase().includes("jawab") || el.textContent.toLowerCase().includes("tulis") || el.textContent.toLowerCase().includes("komentari")|| el.textContent.toLowerCase().includes("postingan")|| el.textContent.toLowerCase().includes("beri"));
                            if(tombolKirim){
                                isDound = true;
                                clickAt(1, 1);
                                console.log("comment box ditemukan")
                                clearInterval(myrefresh);
                                console.log("Click Posting box")
                                tombolKirim.click();
                                game.start()
                            }
                            break;

                        }
                    }

                }
            }
        }
        var urutkan = document.querySelectorAll("[data-mcomponent='ServerTextArea']");
    var waktupost = document.getElementsByClassName("native-text");
    if(!document.querySelectorAll("[role='presentation']")[0]){
        if (document.readyState === "complete") {
            for (var cok = 0; cok < urutkan.length; cok++) {
                if(urutkan[cok].textContent.includes("URUTKAN")) {

                    if (isDound) return;
                    urutkan[cok].click()
                }
            }
        }
    }
    if (isDound) {

        clickAt(1, 1);
    }
    if(document.getElementsByClassName("loading-overlay").length == 0 ){

        if(document.querySelectorAll("[role='presentation']")[0]){
            if (document.readyState === "complete") {
                for (var coki = 0; coki < waktupost.length; coki++) {
                    if(waktupost[coki].textContent === "Aktivitas terbaru") {
                        if(document.getElementsByClassName("prevent-scrolling")[0]){
                            if (isDound) {

                                clickAt(1, 1);
                            }
                            waktupost[coki].click()
                        }

                    }
                }
            }
        }
    }
    }


},refresh * 10)

var commentToPost = '';
var grouptToPost = '';
function gameClosure() {
    if (isCommenting) return;

    function game() {
        console.log('Menentukan Komentar');
        if (document.getElementsByClassName("multi-line-floating-textbox").length > 0) {
            var ceknamagroup = document.getElementsByClassName("fixed-container")[0]?.textContent || '';
            var ceknamagroup1 = document.getElementsByClassName('native-text')[5]?.textContent || '';
            var ceknamagroup2 = document.getElementsByClassName('native-text')[6]?.textContent || '';
            var ceknamagroup3 = document.getElementsByClassName('native-text')[7]?.textContent || '';
            var ceknamagroup4 = document.getElementsByClassName('native-text')[8]?.textContent || '';

            if (document.getElementsByClassName("multi-line-floating-textbox")[0]) {
                let commentMap = {
                    [namagroup1]: Comment1,
                    [namagroup2]: Comment2,
                    [namagroup3]: Comment3,
                    [namagroup4]: Comment4,
                    [namagroup5]: Comment5,
                    [namagroup6]: Comment6,
                    [namagroup7]: Comment7,
                    [namagroup8]: Comment8,
                    [namagroup9]: Comment9,
                    [namagroup10]: Comment10,
                    [namagroup11]: Comment11,
                    [namagroup12]: Comment12,
                    [namagroup13]: Comment13,
                    [namagroup14]: Comment14,
                    [namagroup15]: Comment15,
                    [namagroup16]: Comment16,
                    [namagroup17]: Comment17,
                    [namagroup18]: Comment18
                };

                for (let groupName in commentMap) {
                    if (
                        ceknamagroup.includes(groupName) ||
                        ceknamagroup1.includes(groupName) ||
                        ceknamagroup2.includes(groupName) ||
                        ceknamagroup3.includes(groupName) ||
                        ceknamagroup4.includes(groupName)
                    ) {
                        commentToPost = commentMap[groupName];
                        grouptToPost = groupName
                        console.log("Nama grup ditemukan: " + groupName);
                        scanPosts();
                        break;
                    }
                }
            }
        }
    }

    var currentGame;
    return {
        start() {
            if (currentGame) clearInterval(currentGame);
            currentGame = setInterval(game, 10);
        },
        stop() {
            if (currentGame) clearInterval(currentGame);
        }
    };
}

var game = gameClosure();


function clickAt(x, y) {
    const el = document.elementFromPoint(x, y);
    if (el) {
        const eventOptions = {
            bubbles: true,
            cancelable: true,
            clientX: x,
            clientY: y
        };

        el.dispatchEvent(new MouseEvent("mousedown", eventOptions));
        el.dispatchEvent(new MouseEvent("mouseup", eventOptions));
        el.dispatchEvent(new MouseEvent("click", eventOptions));

        console.log("Clicked at:", x, y, "on", el);
    } else {
        console.log("No element found at", x, y);
    }
}

function scanPosts() {
    if (isCommenting) return;
    isCommenting = true;
      if( datakomen[grouptToPost]){
          startAutoTask();
          return;
      }

    const textarea = document.querySelector(".multi-line-floating-textbox");
    const sendBtn = document.querySelector(".textbox-submit-button");

    if (textarea && sendBtn) {
        textarea.focus();
        textarea.value = commentToPost;
        textarea.dispatchEvent(new Event("input", { bubbles: true }));

        requestAnimationFrame(() => {
            // Aktifkan tombol jika disabled
            sendBtn.disabled = false;

            // Buat dan dispatch event mousedown (bukan .click())
            const clickEvent = document.createEvent("MouseEvents");
            clickEvent.initEvent("mousedown", true, true);
            sendBtn.dispatchEvent(clickEvent);
            GM.setValue("group_" + grouptToPost, true);
            GM.setValue("group_"+grouptToPost+"_expire", Date.now() + EXPIRATION_MS);
            console.log("✅ Komentar DIKIRIM (via dispatch):", commentToPost);
            setTimeout(() => {
                startAutoTask();
            }, 2000); // Reload ringan setelah kirim
        });
    } else {
        console.log("❌ Textarea atau tombol kirim tidak ditemukan.");
        isCommenting = false;
    }
}



var intervalId = null;
// Fungsi yang akan dijalankan berulang
function autoTask() {
location.href = "about:blank";
}

// Fungsi untuk memulai interval — tidak langsung dipanggil
function startAutoTask() {
    if (intervalId === null) {
        intervalId = setInterval(autoTask, 1000); // jalan tiap 1 detik
    }
}
