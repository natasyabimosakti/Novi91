// ==UserScript==
// @name         JAGO 3
// @namespace    http://tampermonkey.net/
// @version      3.18
// @description  try to take over the world!
// @updateURL    https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Jago/Jago3.js
// @downloadURL  https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Jago/Jago3.js
// @author       You
// @match        http*://*/*
// @run-at       document-end
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        window.close
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// ==/UserScript==



var namagroup1 = 'SHIOKELINCI';
var Comment1 = '#shiokelinci4d*MASIHMARIS*73*10'; 

var namagroup2 = 'BUKU';
var Comment2 = 'IYATOTO MANDINI28 63*30*97'; 

var namagroup3 = 'TIKTAK';
var Comment3 = 'Tiktaktogel / MASKURAWAN / 64 , 40 , 97'; 

var namagroup4 = 'GAIB';
var Comment4 = 'GAIB4D=MUMUBELONG=22*24*21'; 

var namagroup5 = 'KEITOGEL';
var Comment5 = '#keitogel = (MUBENGAN52) = 34*13*79'; 

var namagroup6 = 'KIOS';
var Comment6 = 'KIOSTOTO=MANCURMUJUR=00*28*07'; 

var namagroup7 = '453P VIP';
var Comment7 = 'ASEPTOGEL MULETENAK 04*76*81'; 

var namagroup8 = 'MENARA';
var Comment8 = '#MENARA4D=MELONGOBEGOK= 52*26'; 

var namagroup9 = 'GIL4';
var Comment9 = 'GILA4D=MANAHIWAK=31*44*59'; 

var namagroup10 = 'JNE';
var Comment10 = '#JNETOTO(MANOKNURI)*94*89*29'; 

var namagroup11 = 'TOYIB';
var Comment11 = '#TOYIBSLOT ( MEKASIH92 ) : 08*87*53'; 

var namagroup12 = 'MASTER KUY';
var Comment12 = 'TOGELKUY MENCLOKCUK 91*93*23'; 

var namagroup13 = 'KOI';
var Comment13 = '#KOITOTO ( MENDUNGKUL ) 74*82'; 

var namagroup14 = 'ANGKER';
var Comment14 = 'ANGKER4D=MRIPATKUSIPIT=39*27*32'; 

var namagroup15 = 'VESPA';
var Comment15 = 'VESPATOGEL (MARISUWEK) 25*16*85'; 

var namagroup16 = 'Nemo';
var Comment16 = 'NEMO4D (MAMALAMA) : 19*03*18'; 

var namagroup17 = 'KIKO';
var Comment17 = '#KIKOTOTO (MABURDUWUR) = 18*85';


var namagroup18 = 'Jawatengah';
var Comment18 = 'Jago 3';



var refresh = 40;
var URLADMIN = "https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Admin_group_Lama.json"
var keyword = ["ROOM","𝗥𝗢𝗢𝗠","LOMBA","𝗟𝗢𝗠𝗕𝗔","𝐋𝐎𝐌𝐁𝐀","LIMBA","ROM","R00M","login","𝐑𝐎𝐎𝐌","HONGKONG","SINGAPUR","nemo"]
var Backlist =["pemenang lomba","rekap","natidulu","room lomba freebet","prediksi","result","juara lomba"]
var isCommenting = false;
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
let adminList = [];
let adminListReady = false;
const LOCAL_KEY = "cachedAdminList";
const VERSION_KEY = "cachedAdminVersion";
cekArticle()
function isAdmin(name) {
    if (!adminListReady || !name) return false;
    return adminList.some(admin => name.toLowerCase().includes(admin.toLowerCase()));
}

function loadLocalAdmin() {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) {
        try {
            adminList = JSON.parse(stored);
            adminListReady = true;
            console.log("✅ Admin list loaded from localStorage:", adminList.length, "names");
        } catch (e) {
            console.error("❌ Failed to parse local admin list:", e);
        }
    }
}
function fetchAdminListFromGitHub() {
    GM_xmlhttpRequest({
        method: "GET",
        url: URLADMIN,
        onload: function(response) {
            try {
                const data = JSON.parse(response.responseText);
                const latestVersion = data.version;
                const admins = data.admins;

                const currentVersion = localStorage.getItem(VERSION_KEY);
                if (currentVersion !== latestVersion) {
                    console.log("⬆️ New admin version found:", latestVersion);
                    localStorage.setItem(LOCAL_KEY, JSON.stringify(admins));
                    localStorage.setItem(VERSION_KEY, latestVersion);
                    adminList = admins;
                    adminListReady = true;
                } else {
                    console.log("⏩ Admin list is up-to-date (version:", currentVersion + ")");
                }
            } catch (e) {
                console.error("❌ Failed to parse remote admin list:", e);
            }
        },
        onerror: function(err) {
            console.error("❌ Failed to load admin list from GitHub:", err);
        }
    });
}
loadLocalAdmin();
fetchAdminListFromGitHub();

function getCommentForGroup() {
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
    var ceknamagroup = document.getElementsByClassName("fixed-container")[0]?.textContent || '';
    var ceknamagroup1 = document.getElementsByClassName('native-text')[5]?.textContent || '';
    var ceknamagroup2 = document.getElementsByClassName('native-text')[6]?.textContent || '';
    var ceknamagroup3 = document.getElementsByClassName('native-text')[7]?.textContent || '';
    var ceknamagroup4 = document.getElementsByClassName('native-text')[8]?.textContent || '';
    const allGroups = [ceknamagroup, ceknamagroup1, ceknamagroup2, ceknamagroup3, ceknamagroup4];

    for (let groupName in commentMap) {
        if (allGroups.some(text => text.includes(groupName))) {
            return { groupName, comment: commentMap[groupName] };
        }
    }
    return null;
}
function tungguGroup() {
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType !== 1) continue;
                const container = node.querySelector?.('.fixed-container');
                if (container) {
                    const result = getCommentForGroup();
                    if(result) {
                        commentToPost = result.comment;
                        grouptToPost = result.groupName;
                        console.log("✅Nama grup : " + result.groupName + " Comment : " + result.comment);
                    }
                }
            }
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
}
tungguGroup()
if(document.location.href.includes("group")){
    myObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType !== 1) continue; // Bukan elemen
                const text = node.textContent || "";
                if (text.includes("Aktivitas terbaru")) {
                    const tombol = node.querySelectorAll("[role='button']");
                    if (tombol.length >= 2) {
                        cekTombolUrutkan = false;
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
async function manageGroups() {
    for (const { groupId, defaultValue } of groups) {
        const key = `group_${groupId}`;
        const expireKey = `${key}_expire`;
        const expireAt = await GM.getValue(expireKey, 0);

        if (now > expireAt) {
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
var observercontetn;

function cekArticle() {
    console.log('cekArticle');
    if (document.location.href.includes("group")) {
        const observercontetn = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                for (const node of mutation.addedNodes) {
                    if (node.nodeType !== 1) continue;

                    const artikelBaruList = [];

                    // Jika node itu sendiri adalah artikel
                    if (node.matches?.('[data-tracking-duration-id]')) {
                        artikelBaruList.push(node);
                    }

                    // Tambahkan semua child yang merupakan artikel
                    const descendants = node.querySelectorAll?.('[data-tracking-duration-id]');
                    if (descendants) {
                        artikelBaruList.push(...descendants);
                    }
                    // Proses semua artikel
                    artikelBaruList.forEach((artikel) => {
                        const text = artikel.textContent || "";
                        if (/(\bBaru saja\b)/.test(text)||/(\b1 menit\b)/.test(text)||/(\b2 menit\b)/.test(text)||/(\b3 menit\b)/.test(text)||/(\b4 menit\b)/.test(text)||/(\b5 menit\b)/.test(text)) {
                            var namafb = artikel.getElementsByTagName("span")[0];
                            //Jam
                            var isadminer = artikel.querySelector("[data-focusable]")
                            //Postingan
                            var ThePost =artikel
                            //Comment Box
                            var commentbox = artikel.getElementsByClassName('native-text')
                            console.log("jam di temukan", artikel);
                            console.log("Check Backlist ");
                            if (CekBacklist(ThePost.textContent.toLowerCase())) return
                            console.log("Proses dilanjutkan tidak ada Backlist");
                            if (!CekKeyword(ThePost.textContent.toLowerCase())) return
                            console.log("Keyword Ditemukan " + ThePost.textContent);
                            // Cek Admin
                            const author = namafb.textContent.toLowerCase()
                            if (isAdmin(author)||isadminer.textContent.toLowerCase().includes("admin")||isadminer.textContent.toLowerCase().includes("moderator")){
                                console.log("Admin Ditemukan")
                                const tombolKirim = Array.from(artikel.getElementsByClassName('native-text')).find(el => {
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
                                    console.log("TextBox komentar ditemukan:", tombolKirim);
                                    function klikTextboxJikaSiap() {
                                        tombolKirim.click();
                                        // Tunggu textbox aktif
                                        const textbox = document.querySelector(".multi-line-floating-textbox");
                                        if (textbox) {
                                            if (myObserver) {
                                                myObserver.disconnect();
                                            }
                                            console.log("✅ TextBox komentar Telah DI Klik & Muncul");
                                            return; // Stop loop
                                        }
                                        // Ulangi frame berikutnya
                                        requestAnimationFrame(klikTextboxJikaSiap);
                                    }
                                    klikTextboxJikaSiap();
                                }

                            }
                        }
                    });
                }
            }
        });

        observercontetn.observe(document.body, { childList: true, subtree: true });
    }
}

cekArticle()

function tungguMentionsContainer() {
    console.log('tungguMentionsContainer')
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType !== 1) continue; // Skip jika bukan elemen
                const container = node.querySelector?.('.mentions-shadow-container');
                if (container) {
                    console.log("TextBox Untuk komentar Telah Muncul");
                    if (isCommenting) return;
                    console.log("Cex");
                    const textarea = document.querySelector(".multi-line-floating-textbox");
                    const sendBtn = document.querySelector(".textbox-submit-button");
                    if (textarea && sendBtn) {
                        textarea.focus();
                        textarea.value = commentToPost;
                        sendBtn.disabled = false;
                        const clickEvent = document.createEvent("MouseEvents");
                        clickEvent.initEvent("mousedown", true, true);
                        sendBtn.dispatchEvent(clickEvent);
                        GM.setValue("group_" + grouptToPost, true);
                        GM.setValue("group_"+grouptToPost+"_expire", Date.now() + EXPIRATION_MS);
                        console.log("✅ Komentar DIKIRIM (via dispatch):", commentToPost);
                        showNotification("Komentar Sudah Terkirim : " + commentToPost);

                        isCommenting = true;
                        if (observercontetn) {
                            observercontetn.disconnect();
                        }
                        if (observer) {
                            observer.disconnect();
                        }
                        startAutoTask();
                        break;
                    } else {
                        showNotification("❌ Textarea atau tombol kirim tidak ditemukan");
                        isCommenting = false;
                    }

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

    var urutkan = document.querySelectorAll("[data-mcomponent='ServerTextArea']");
    var waktupost = document.getElementsByClassName("native-text");
    if(!document.querySelectorAll("[role='presentation']")[0]){
        if (document.readyState === "complete") {
            for (var cok = 0; cok < urutkan.length; cok++) {
                if(urutkan[cok].textContent.includes("URUTKAN")) {
                    cekTombolUrutkan = true;
                    if (forceOffRefresh == true){
                        clearInterval(myrefresh)
                        return;
                    }
                    urutkan[cok].click()
                }
            }
        }
    }
},refresh * 10)

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


function startAutoTask() {
    let myObservere = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType !== 1) continue; // Bukan elemen
                if (node.nodeType === 1 && node.textContent.toLowerCase().includes('diposting')||node.textContent.toLowerCase().includes('berhasil')) {
                    location.href = "about:blank";
                }
            }
        }
    });
    myObservere.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => {
        location.href = "about:blank";
    }, 10000);
}
