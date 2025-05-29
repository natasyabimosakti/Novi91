// ==UserScript==
// @name         Tukang Lapor Group Lama
// @namespace    http://tampermonkey.net/
// @version      3.8
// @description  try to take over the world!
// @updateURL    https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Tukang Lapor Group Lama.js
// @downloadURL  https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Tukang Lapor Group Lama.js
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



/*======================================================================Paste Script Tampermonkey di sini===============================================================*/





var refresh = 200;

var URLADMIN = "https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Admin_group_Lama.json"

var keyword = ["ROOM","𝗥𝗢𝗢𝗠","LOMBA","𝗟𝗢𝗠𝗕𝗔","𝐋𝐎𝐌𝐁𝐀","LIMBA","ROM","R00M","login","𝐑𝐎𝐎𝐌","HONGKONG","SINGAPUR","nemo"]
var Backlist =["pemenang lomba","rekap","natidulu","room lomba freebet","prediksi","result","juara lomba"]
var isCommenting = false;
var isDound = false;
var EXPIRATION_MS = 8 * 60 * 1000; // 5 minutes
var now = Date.now();
// ✅ Daftar grup dan nilai default
var Laporan = await GM.getValue(1);
var commentToPost = '';
var grouptToPost = '';
let myObserver = null;
var forceOffRefresh = false;
var cekTombolUrutkan = true;
let adminList = [];
let adminListReady = false;
const LOCAL_KEY = "cachedAdminList";
const VERSION_KEY = "cachedAdminVersion";
var xht = null;

function sendMessager(text)
{
    console.log("Send Telegram")
    const url = `https://api.telegram.org/bot7479985104:AAF-ISIxbf18g_mOasLoubBwBKgkfSFzzAw/sendMessage?chat_id=983068551&text=${text}`;
    xht = new XMLHttpRequest();
    xht.open("GET", url);
    xht.send();
    return xht.responseText;
}

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
if(document.location.href.includes("group")){
    myObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType !== 1) continue; // Bukan elemen
                const text = node.textContent || "";
                if (text.includes("URUTKAN")) {
                    cekTombolUrutkan = true;
                }

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




function CekBacklist(postinganBL) {
    return Backlist.some(DataBacklist => postinganBL.includes(DataBacklist.toLowerCase()));
}
function CekKeyword(postingan) {
    return keyword.some(DataKeyword => postingan.includes(DataKeyword.toLowerCase()));
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
                            console.log("Check Backlist ");
                            if (CekBacklist(ThePost.textContent.toLowerCase())) continue
                            console.log("Proses dilanjutkan tidak ada Backlist");
                            if (!CekKeyword(ThePost.textContent.toLowerCase())) continue
                            console.log("Keyword Ditemukan " + ThePost.textContent);
                            // Cek Admin
                            const author = namafb.textContent.toLowerCase()
                            if (isAdmin(author)||isadminer.textContent.toLowerCase().includes("admin")||isadminer.textContent.toLowerCase().includes("moderator")){
                                console.log("Admin Ditemukan")
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
                                    console.log("TextBox komentar ditemukan:", tombolKirim);
                                    location.href = "about:blank"

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



var myrefresh = setInterval(function(){
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

function lapor(){
    console.log("mulai lapor")
    const d = new Date();
    if(document.location.href.includes("group")){
        console.log("cek href ")
        if(document.querySelectorAll("[role='heading']").length > 0) {
            GM.setValue( 1,"(" + document.querySelectorAll("[role='heading']")[0].textContent + ") Belum Comment Grup Baru " + d.getHours() + ":" + d.getMinutes());
            console.log("(" + document.querySelectorAll("[role='heading']")[0].textContent + ") Belum Comment Grup Baru" + d.getHours() + ":" + d.getMinutes())
            document.location = "https://telegram.org"
        }
    }

}


var kirimlaporan = setInterval(function(){
    if(document.location.href.includes("telegram")){
        sendMessager(Laporan)
        console.log("Laporan Terkirim Ke Telegram" )
        GM.setValue( 1," ");
        clearInterval(kirimlaporan)

        setTimeout(function(){location.href = "about:blank";}, 3000);
    }

}, 5000);

setTimeout(function(){lapor()}, 180000);


