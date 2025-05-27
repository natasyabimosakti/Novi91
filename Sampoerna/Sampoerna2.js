// ==UserScript==
// @name         Sampoerna2
// @namespace    http://tampermonkey.net/
// @version      3.184
// @description  try to take over the world!
// @updateURL    https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Sampoerna/Sampoerna2.js
// @downloadURL  https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Sampoerna/Sampoerna2.js
// @author       You
// @match        http*://*/*
// @run-at       document-end
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        window.close
// ==/UserScript==




/*======================================================================Paste Script Tampermonkey di sini===============================================================*/

var namagroup1 = 'NONGKRONG';
var Comment1 = '#AMAVI5D ( BOSBOS64 ) : 78*26*42'; 

var namagroup2 = 'K86';
var Comment2 = 'K86TOTO ( BOSEK64 ) : 34*70*45'; 

var namagroup3 = 'WARUNG';
var Comment3 = '#(WARUNGTOTO) = (BOSREN64) 60*76*40'; 

var namagroup4 = 'RIATOTO';
var Comment4 = '#RIATOTO BOSEN68 = 14*31*28'; 

var namagroup5 = 'PEDRO';
var Comment5 = '#PEDRO4D (BOSMAN67*77*86*61)'; 

var namagroup6 = 'DIVA4D';
var Comment6 = '#DIVA4D (BOSMINI88) = 50*03*30'; 

var namagroup7 = 'KASTOTO';
var Comment7 = '#KASTOTO(BOSMAN67) = 95*83*23 #AGENTOGELTERPERCAYA'; 

var namagroup8 = 'TOK99';
var Comment8 = 'Tok99Toto ( BOSTER73 ) : 93*43*58'; 

var namagroup9 = 'TAFSIR MIMPI';
var Comment9 = 'SIJITOGEL BOSMAN67 32*67*73'; 

var namagroup10 = 'KAGET';
var Comment10 = 'DAGELAN4D(BOSLON89) : 54*74*88'; 

var namagroup11 = 'MAYAPADA';
var Comment11 = 'BETT*Mayapada4D(BO)*BOSBIG53*29*35*21'; 

var namagroup12 = 'OPUNG';
var Comment12 = 'OPUNG4D ( BOSBIS48 ) : 22*62*71'; 

var namagroup13 = 'GOHT0G3L';
var Comment13 = 'GOHTOGEL=BOSLEM64=39*90*66'; 

var namagroup14 = 'COMO';
var Comment14 = '( #COMOTOTO BOSBEN64 : 80*25 )'; 

var namagroup15 = 'Hoho';
var Comment15 = 'BOSNOM63 : 68*87*96 #HOHOTOGEL'; 

var namagroup16 = 'CEME';
var Comment16 = '#CEMETOTO ( BOSBIS48 ) : 56*81*41'; 







var namagroup17 = 'Jawatengah';
var Comment17 = 'Baru Sampo 2';

var namagroup18 = 'lajw';
var Comment18 = 'asek';


var refresh = 40;

var adminList = ["Siâo","andre","adiat","andy","ayunda","audi","arxidi","aditia","aldi","ananda","alde","adm","ayesha","aqisya","arga","arifin","aru","agung","alenta","andi","arsyah","mrdepo","acha","annisa","amelia","anisa","anisa","agus tiar","azahra",
                 "boleng","biru","bobby","bastian","boboho","bola","bunga","bonbin","ban nee","bang wawan",
                 "cristina","camb","cassa","che","cinta","celsia","cila","calon","chika","calvin","chika","calvin","claudio","ceme",
                 "david","dewa","desi","debby","dewi","dentoto","dika","dealova","diva","damara","den arkanza","denis",
                 "erwin","emilia","evelyn","el givano","esse",
                 "fira","fahresa","fiana","fahmi","fiona","fania",
                 "gita","kang bona","hoky","julianti","libra","garda","gebby",
                 "habib","hefi","hoihai","hana","hoki","hokage",
                 "icha","iyatoto","invest","ivanna","inisial","ishaura","imam","isticharo",
                 "jordi","jaguar","jne","jovanka","jessica","je pe","jess","jenifer","jhone",
                 "keitogel","kumbara","kembar","kotna","karina","katharina","kemon","kaka","karla","komandan",
                 "lianda","lusiana","lina","laura","lehman","leader","leon","lidya","langit","leader","loetoe",
                 "mahendra","monica","mey","mersya","mad rm","multi","mariana","melati","male","megaways","manu","mamad","mas har","metha","maleeqq","mely","mayangsari","momo","mona","mas hoki","maley",
                 "nasution","nyocol","naura","neng","nino","nona","neman","novi","nella","nahdya","nur","namira","nindy","nurul",
                 "oscar","ozawa","otong","ormas",
                 "pung","puput","priyan","primus","primus","pencari","pricilia","putra","pengurus","putri",
                 "ratu","rio","ria","rikodo","rizal","roy","rendy","rana","rindi","ranger",
                 "sandiego","san","sanjaya","siska","safar","sinta","surianti","satria","sapto","salsabila","sanchez","sofia","sonia","serena","sahara","specialis","sam","sasha","sintia","sifa","satria","sellia","sintya","stevent",
                 "tink","tiktak","tiara","tatang","tania","thonex",
                 "yanty","yoky","yohana","yii","vero","vaulian",
                 "wulan","wok","widya",
                 "raja","mega","jonh","james","stephen"];

var keyword = ["ROOM","𝗥𝗢𝗢𝗠","LOMBA","𝗟𝗢𝗠𝗕𝗔","𝐋𝐎𝐌𝐁𝐀","LIMBA","ROM","R00M","login","𝐑𝐎𝐎𝐌","HONGKONG","SINGAPUR","nemo"]
var Backlist =["pemenang lomba","rekap","natidulu","room lomba freebet","prediksi","result","juara lomba"]
var isCommenting = false;
var isDound = false;
var EXPIRATION_MS = 8 * 60 * 1000; // 5 minutes
var now = Date.now();
// ✅ Daftar grup dan nilai default yang ingin disimpan
const groupNames = [
    namagroup1, namagroup2, namagroup3, namagroup4, namagroup5, namagroup6,
    namagroup7, namagroup8, namagroup9, namagroup10, namagroup11, namagroup12,
    namagroup13, namagroup14, namagroup15, namagroup16, namagroup17, namagroup18
];
var groups = groupNames.map(groupId => ({ groupId, defaultValue: false }));
const datakomenArray = await Promise.all(
    groupNames.map(name => GM.getValue(`group_${name}`))
);
var datakomen = groupNames.reduce((acc, name, idx) => {
    acc[name] = datakomenArray[idx];
    return acc;
}, {});

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
function CekBacklist(postinganBL) {
    return Backlist.some(DataBacklist => postinganBL.includes(DataBacklist.toLowerCase()));
}
function CekKeyword(postingan) {
    return keyword.some(DataKeyword => postingan.includes(DataKeyword.toLowerCase()));
}
function isAdmin(authorName) {
    return adminList.some(admin => authorName.includes(admin.toLowerCase()));
}
var myrefresh = setInterval(function(){
    if(isCommenting){
        startAutoTask();
    }
    if(document.location.href.includes("group")){
        var posisiarticle = document.querySelectorAll('[data-tracking-duration-id')
        for (let ntv = 0; ntv < posisiarticle.length; ntv++) {

            if (posisiarticle[ntv]){
                // Nama FB
                var namafb = posisiarticle[ntv].getElementsByTagName("span")[0];
                //Jam
                var isadminer = posisiarticle[ntv].querySelector("[data-focusable]")
                //Postingan
                var postingan =posisiarticle[ntv]
                //Comment Box
                var commentbox = posisiarticle[ntv].getElementsByClassName('native-text')
                // Cek Jam
                if (postingan.textContent.includes("Baru")||postingan.textContent.split(' meni')[0].slice(-2) == 1||postingan.textContent.split(' meni')[0].slice(-2) == 2||postingan.textContent.split(' meni')[0].slice(-2) == 3||postingan.textContent.split(' meni')[0].slice(-2) == 4||postingan.textContent.split(' meni')[0].slice(-2) == 5||postingan.textContent.split(' meni')[0].slice(-2) == "‎1"||postingan.textContent.split(' meni')[0].slice(-2) == "‎2"||postingan.textContent.split(' meni')[0].slice(-2) == "‎3"||postingan.textContent.split(' meni')[0].slice(-2) == "‎4"||postingan.textContent.split(' meni')[0].slice(-2) == "‎5"){
                    console.log("Jam Ditemukan ")
                    console.log("Check Backlist ");
                    const ThePost = postingan.textContent.toLowerCase()
                    if (CekBacklist(ThePost)) continue
                    console.log("Proses dilanjutkan tidak ada Backlist");
                    if (!CekKeyword(ThePost)) continue
                    console.log("Keyword Ditemukan " + postingan.textContent);
                    // Cek Admin
                    const author = namafb.textContent.toLowerCase()
                    if (isAdmin(author)||isadminer.toLowerCase().includes("admin")||isadminer.toLowerCase().includes("moderator")){
                        let tombolKirim = Array.from(posisiarticle[ntv].getElementsByClassName('native-text'))
                        .find(el => el.textContent.toLowerCase().includes("jawab") || el.textContent.toLowerCase().includes("tulis") || el.textContent.toLowerCase().includes("komentari")|| el.textContent.toLowerCase().includes("postingan")|| el.textContent.toLowerCase().includes("beri"));
                        if(tombolKirim){
                            isDound = true;
                            clickAt(1, 1);
                            console.log("comment box ditemukan")
                            clearInterval(myrefresh);
                            console.log("Click Posting box")
                            tombolKirim.click();
                            // Click Comment Box
                            game.start()
                        }
                    }else{
                        continue
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
                const allGroups = [ceknamagroup, ceknamagroup1, ceknamagroup2, ceknamagroup3, ceknamagroup4];

                for (let groupName in commentMap) {
                    if (allGroups.some(list => list.includes(groupName))) {
                        commentToPost = commentMap[groupName];
                        grouptToPost = groupName;
                        console.log("Nama grup ditemukan: " + groupName);
                        clearInterval(currentGame);
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



            const targetNode = document.body; // atau elemen spesifik yang ingin diawasi

            const configs = { childList: true, subtree: true };

            const callback = function(mutationsList, observer) {
                for (let mutation of mutationsList) {
                    if (mutation.addedNodes.length) {
                        // Cek jika elemen yang diinginkan muncul
                        mutation.addedNodes.forEach(node => {
                            if (node.nodeType === 1 && node.textContent.toLowerCase().includes('diposting')||node.textContent.toLowerCase().includes('berhasil')) {
                                console.log('Notifikasi Postingan Terkirim:', node.textContent.toLowerCase());
                                startAutoTask();
                                // Lakukan aksi di sini
                            }
                        });
                    }
                }
            };

            const observer = new MutationObserver(callback);
            observer.observe(targetNode, configs);

            setTimeout(() => {
                startAutoTask();
            }, 15000); // Reload ringan setelah kirim
        });
    } else {
        console.log("❌ Textarea atau tombol kirim tidak ditemukan.");
        isCommenting = false;
    }
}

var intervalId = null;
function autoTask() {
    location.href = "about:blank";
}

// Fungsi untuk memulai interval — tidak langsung dipanggil
function startAutoTask() {
    if (intervalId === null) {
        intervalId = setInterval(autoTask, 15000); // jalan tiap 1 detik
    }
}
