// ==UserScript==
// @name         JAGO 1
// @namespace    http://tampermonkey.net/
// @version      3.15
// @description  try to take over the world!
// @updateURL    https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Jago/Jago1.js
// @downloadURL  https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Jago/Jago1.js
// @author       You
// @match        http*://*/*
// @run-at       document-end
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        window.close
// ==/UserScript==



var namagroup1 = 'SHIOKELINCI';
var Comment1 = '#shiokelinci4d*SUNTIKMATI*14*57'; 

var namagroup2 = 'BUKU';
var Comment2 = 'IYATOTO SETIASAJA 65*56*99'; 

var namagroup3 = 'TIKTAK';
var Comment3 = 'Tiktaktogel / SUKUMLAKU / 47 , 54 , 99'; 

var namagroup4 = 'GAIB';
var Comment4 = 'GAIB4D=SAMBUTAN20=17*95*61'; 

var namagroup5 = 'KEITOGEL';
var Comment5 = '#keitogel = (SASISU42) = 55*90*06'; 

var namagroup6 = 'KIOS';
var Comment6 = 'KIOSTOTO=SISWARUK=51*35*01'; 

var namagroup7 = '453P VIP';
var Comment7 = 'ASEPTOGEL SEMBODOH 36*80*62'; 

var namagroup8 = 'MENARA';
var Comment8 = '#MENARA4D=SINGKONGTHAI= 37*15'; 

var namagroup9 = 'GIL4';
var Comment9 = 'GILA4D=SUMURMATI=58*88*41'; 

var namagroup10 = 'JNE';
var Comment10 = '#JNETOTO(SUNDALA23)*02*09*60'; 

var namagroup11 = 'TOYIB';
var Comment11 = '#TOYIBSLOT ( SAKUKUTARA ) : 67*98*05'; 

var namagroup12 = 'MASTER KUY';
var Comment12 = 'TOGELKUY SIANGANAJA 78*46*77'; 

var namagroup13 = 'KOI';
var Comment13 = '#KOITOTO ( SUMBUBULU ) 71*96'; 

var namagroup14 = 'ANGKER';
var Comment14 = 'ANGKER4D=SAMBUNGBAYAM=12*86*68'; 

var namagroup15 = 'VESPA';
var Comment15 = 'VESPATOGEL (SUKAJANTUA) 33*92*66'; 

var namagroup16 = 'Nemo';
var Comment16 = 'NEMO4D (SLEMPANG26) : 11*20*83'; 

var namagroup17 = 'KIKO';
var Comment17 = '#KIKOTOTO (SUITSUIT22) = 83*66'


var namagroup18 = 'Jawatengah';
var Comment18 = 'Jago 1';




var refresh = 40;

var adminList = ["Siâo","andre","adiat","andy","ayunda","audi","arxidi","adi","aldi","ananda","alde","adm","ayesha","aqisya","anjani","apri","amore","arifin","ayunda","agung","arem","arifa","azahra","agus tiar","aru sundawa","amel lia",
             "boleng","biru","bobby","bastian","bambang","bogard","bannet","botack","bang","bonar",
             "cristina","camb","cassa","che","cinta","celsia","calista","cahyo","cipto","claura","chelsea","calista","chin",
             "david","dewa","desi","debby","dewi","dentoto","dika","delon","dewy","damara","dealova",
             "erwin","elvina","evelyn","enzo",
             "fira","fahresa","findlay","fatimah",
             "gita","genzo","gambrong",
             "habib","hefi","hoihai","herfizah","hanny","hanabi","hokage","hoi hai",
             "icha","iyatoto","intan","imam",
             "jordi","jaguar","jne","je pe","jess","junior","jovanka","jasmine",
             "kei","kumbara","kembar","kotna","karina","kopi","kang","komandan","kanaya",
             "lianda","lusiana","lina","laura","lia","lollo","lupin",
             "mahendra","monica","mey","mersya","mad rm","multi","mariana","melati","meleqq","megaways","minion","melly","monicha","manu","maryam","mode","mary","mamad","melinda",
             "nasution","nyocol","naura","neng","nino","nona","neman","novi","nella","nayla","naomi","nica",
             "oscar","ozawa","oppe",
             "pung","puput","priyan","primus","primus","prediction","pebri","pasil",
             "ratu","rio","ria","rikodo","rizal","roy","rendy","rahma","ratsa","sinta","rara","ratna","ranger",
             "sandiego","sanjaya","siska","safar","sinta","surianti","satria","sapto","salsabila","sanchez","sofia","sonia","serena","specialis","seojun","saskia","sifa","seojun","sudewo","sembroh",
             "tink","tiktak","tiara","tatang","tomi",
             "xian","vivi",
             "yanty","yoky","yohana","yura","yaya",
             "wulan","wok","wak",
             "zuko",
             "keyza"];

var keyword = ["ROOM","𝗥𝗢𝗢𝗠","LOMBA","𝗟𝗢𝗠𝗕𝗔","𝐋𝐎𝐌𝐁𝐀","LIMBA","ROM","R00M","login","𝐑𝐎𝐎𝐌","HONGKONG","SINGAPUR","nemo"]
var Backlist =["pemenang lomba","rekap","natidulu","room lomba freebet","prediksi","result","juara lomba"]
var isCommenting = false;
var isDound = false;
var EXPIRATION_MS = 8 * 60 * 1000; // 5 minutes
var now = Date.now();
// ✅ Daftar grup dan nilai default
const groupNames = [
    namagroup1, namagroup2, namagroup3, namagroup4, namagroup5, namagroup6,
    namagroup7, namagroup8, namagroup9, namagroup10, namagroup11, namagroup12,
    namagroup13, namagroup14, namagroup15, namagroup16, namagroup17, namagroup18
];
var commentToPost = '';
var grouptToPost = '';
let myObserver = null;
var forceOffRefresh = false;
var cekTombolUrutkan = true;

if(document.location.href.includes("group")){
    myObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType !== 1) continue; // Bukan elemen
                const text = node.textContent || "";
                if (text.includes("URUTKAN")) {
                    console.log("TOMBOL URUTKAN DITEMUKAN:", node);
                    cekTombolUrutkan = true;
                }

                if (text.includes("Aktivitas terbaru")) {
                    const tombol = node.querySelectorAll("[role='button']");
                    if (tombol.length >= 2) {
                        cekTombolUrutkan = false;
                        console.log("TOMBOL AKTIVITAS TERBARU DITEMUKAN:", node);

                        tombol.forEach(btn => {
                            if (btn.textContent.includes("Aktivitas terbaru")) {
                                btn.click();
                            }
                        });
                    }
                }
            }
        }
    });
    myObserver.observe(document.body, { childList: true, subtree: true });
}

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
    return adminList.some(admin => authorName.toLowerCase().includes(admin.toLowerCase()));

}

function cekArticle() {
    if(document.location.href.includes("group")){
        const observercontetn = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                for (const node of mutation.addedNodes) {
                    if (node.nodeType !== 1) continue; // Bukan elemen
                    const text = node.textContent || "";
                    if (node.hasAttribute && node.hasAttribute("data-tracking-duration-id")) {

                        // Cek Jam
                        if (/(\bBaru saja\b)/.test(text)||/(\b1 menit\b)/.test(text)||/(\b2 menit\b)/.test(text)||/(\b3 menit\b)/.test(text)||/(\b4 menit\b)/.test(text)||/(\b5 menit\b)/.test(text)) {
                            var namafb = node.getElementsByTagName("span")[0];
                            //Jam
                            var isadminer = node.querySelector("[data-focusable]")
                            //Postingan
                            var ThePost =node
                            //Comment Box
                            var commentbox = node.getElementsByClassName('native-text')
                            console.log("jam di temukan", node);
                            console.log("Jam Ditemukan ")
                            console.log("Check Backlist ");
                            if (CekBacklist(ThePost.textContent.toLowerCase())) continue
                            console.log("Proses dilanjutkan tidak ada Backlist");
                            if (!CekKeyword(ThePost.textContent.toLowerCase())) continue
                            console.log("Keyword Ditemukan " + ThePost.textContent);
                            // Cek Admin
                            const author = namafb.textContent.toLowerCase()
                            if (isAdmin(author)||isadminer.textContent.toLowerCase().includes("admin")||isadminer.textContent.toLowerCase().includes("moderator")){
                                const tombolKirim = Array.from(node.getElementsByClassName('native-text')).find(el => {
                                    const text = el.textContent.toLowerCase();
                                    return (
                                        text.includes("jawab") ||
                                        text.includes("tulis") ||
                                        text.includes("komentari") ||
                                        text.includes("postingan") ||
                                        text.includes("beri")
                                    );
                                });

                                if (tombolKirim) {
                                    forceOffRefresh = true;
                                    clearInterval(myrefresh)
                                    console.log("Tombol komentar ditemukan:", tombolKirim);
                                    let intervalId = setInterval(() => {
                                        if (myObserver) {
                                            myObserver.disconnect();
                                            console.log("🛑 Observer refresh dihentikan");
                                        }
                                        observercontetn.disconnect();
                                        tombolKirim.click()
                                        if (document.getElementsByClassName("multi-line-floating-textbox")[0]) {
                                            clearInterval(intervalId);
                                        }

                                    }, 5);

                                }

                            }
                        }
                    }
                }
            }
        });
        observercontetn.observe(document.body, { childList: true, subtree: true });
    }
}
cekArticle()

function tungguMentionsContainer() {
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType !== 1) continue; // Skip jika bukan elemen
                const container = node.querySelector?.('.mentions-shadow-container');
                if (container) {
                    console.log("Mentions container ditemukan (subtree):", container);
                    if (isCommenting) return;
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
                                    scanPosts();
                                    break;
                                }
                            }
                        }
                    }
                    observer.disconnect();
                    return;
                }

            }
        }
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    console.log("Observer aktif, menunggu .mentions-shadow-container...");
}
tungguMentionsContainer();

var myrefresh = setInterval(function(){
    console.log("forceOffRefresh:", forceOffRefresh)
    if (forceOffRefresh == true){
        return;
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
},refresh * 10)


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
function showNotification(message) {
                const notif = document.createElement("div");
                notif.textContent = message;
                notif.style.position = "fixed";
                notif.style.bottom = "20px";
                notif.style.right = "20px";
                notif.style.padding = "10px 20px";
                notif.style.backgroundColor = "#4caf50";
                notif.style.color = "white";
                notif.style.borderRadius = "5px";
                notif.style.zIndex = 9999;
                notif.style.fontSize = "16px";
                document.body.appendChild(notif);
                setTimeout(() => notif.remove(), 15000);
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
            sendBtn.disabled = false;
            const clickEvent = document.createEvent("MouseEvents");
            clickEvent.initEvent("mousedown", true, true);
            sendBtn.dispatchEvent(clickEvent);
            GM.setValue("group_" + grouptToPost, true);
            GM.setValue("group_"+grouptToPost+"_expire", Date.now() + EXPIRATION_MS);
            console.log("✅ Komentar DIKIRIM (via dispatch):", commentToPost);
            showNotification("Komentar Berhasil Terkirim : " + commentToPost);
            const targetNode = document.body; // atau elemen spesifik yang ingin diawasi

            const configs = { childList: true, subtree: true };

            const callback = function(mutationsList, observer) {
                for (let mutation of mutationsList) {
                    if (mutation.addedNodes.length) {
                        // Cek jika elemen yang diinginkan muncul
                        mutation.addedNodes.forEach(node => {
                            if (node.nodeType === 1 && node.textContent.toLowerCase().includes('diposting')||node.textContent.toLowerCase().includes('berhasil')) {
                                console.log('Notifikasi Postingan Terkirim:', node.textContent.toLowerCase());
                                location.href = "about:blank";
                                observer.disconnect();
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

function startAutoTask() {
    if (intervalId === null) {
        intervalId = setInterval(autoTask, 15000); 
    }
}
