// ==UserScript==
// @name         Tukang Lapor Group Lama
// @namespace    http://tampermonkey.net/
// @version      3.1
// @description  try to take over the world!
// @updateURL    https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Tukang Lapor Group Baru.js
// @downloadURL  https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Tukang Lapor Group Baru.js
// @author       You
// @match        http*://*/*
// @run-at       document-end
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        window.close
// ==/UserScript==


var refresh = 1000;

var admin = ["Siâo","andre","adiat","andy","ayunda","audi","arxidi","aditia","aldi","ananda","alde","adm","ayesha","aqisya","arga","arifin","aru","agung","alenta","andi","arsyah","mrdepo","acha","annisa","amelia","anisa","anisa","agus tiar","azahra",
             "boleng","biru","bobby","bastian","boboho","bola","bunga","bonbin","ban nee","bang wawan",
             "cristina","camb","cassa","che","cinta","celsia","cila","calon","chika","calvin","chika","calvin","claudio",
             "david","dewa","desi","debby","dewi","dentoto","dika","dealova","diva","damara","den arkanza",
             "erwin","emilia","evelyn","el givano","esse",
             "fira","fahresa","fiana","fahmi","fiona","fania",
             "gita","kang bona","hoky","julianti","libra",
             "habib","hefi","hoihai","hana","hoki","hokage",
             "icha","iyatoto","invest","ivanna","inisial","ishaura","imam",
             "jordi","jaguar","jne","jovanka","jessica","je pe","jess","jenifer","jhone",
             "keitogel","kumbara","kembar","kotna","karina","katharina","kemon","kaka","karla","komandan",
             "lianda","lusiana","lina","laura","lehman","leader","leon","lidya","langit","leader",
             "mahendra","monica","mey","mersya","mad rm","multi","mariana","melati","male","megaways","manu","mamad","mas har","metha","maleeqq","mely","mayangsari","momo","mona",
             "nasution","nyocol","naura","neng","nino","nona","neman","novi","nella","nahdya","nur","namira","nindy","nurul",
             "oscar","ozawa","otong","ormas",
             "pung","puput","priyan","primus","primus","pencari","pricilia","putra","pengurus","putri",
             "ratu","rio","ria","rikodo","rizal","roy","rendy","rana","rindi","ranger",
             "sandiego","san","sanjaya","siska","safar","sinta","surianti","satria","sapto","salsabila","sanchez","sofia","sonia","serena","sahara","specialis","sam","sasha","sintia","sifa","satria","sellia","sintya",
             "tink","tiktak","tiara","tatang","tania",
             "yanty","yoky","yohana","yii","vero","vaulian",
             "wulan","wok","widya"];

var Laporan = await GM.getValue(1);
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
var xht = null;

var game2 = gameClosure2()
function sendMessage(text)
{
    console.log("Send Telegram")
    const url = `https://api.telegram.org/bot7479985104:AAF-ISIxbf18g_mOasLoubBwBKgkfSFzzAw/sendMessage?chat_id=983068551&text=${text}`;
    xht = new XMLHttpRequest();
    xht.open("GET", url);
    xht.send();
    return xht.responseText;
}

var urutkan = null
var waktupost = null








function gameClosure2() {
    function game2() {
       urutkan = document.querySelectorAll("[data-mcomponent='ServerTextArea']");
    waktupost = document.getElementsByClassName("native-text");

    if(document.location.href.includes("group")){
        window.scroll(0,2000)
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

                if (jamposting1.includes("Baru")||jamposting1.slice(0,7).includes("1 men")||jamposting1.slice(0,7).includes("2 men")||jamposting1.slice(0,7).includes("3 men")||jamposting1.slice(0,7).includes("4 men")||jamposting1.slice(0,7).includes("5 men")||jamposting2.includes("Baru")||jamposting2.slice(0,7).includes("1 men")||jamposting2.slice(0,7).includes("2 men")||jamposting2.slice(0,7).includes("3 men")||jamposting2.slice(0,7).includes("4 men")||jamposting2.slice(0,7).includes("5 men")){
                    console.log("Jam Ditemukan " + jamposting1)
                    if(postingan.textContent.toLowerCase().includes(Backlist1.toLowerCase())
                       ||postingan.textContent.toLowerCase().includes(Backlist2.toLowerCase())
                       ||postingan.textContent.toLowerCase().includes(Backlist3.toLowerCase())
                       ||postingan.textContent.toLowerCase().includes(Backlist4.toLowerCase())
                       ||postingan.textContent.toLowerCase().includes(Backlist5.toLowerCase())
                       ||postingan.textContent.toLowerCase().includes(Backlist6.toLowerCase())
                       ||postingan.textContent.toLowerCase().includes(Backlist7.toLowerCase())){
                        console.log("Terdaftar Backlist...!  ");
                        break;
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
                                location.href = "about:blank"
                                return;
                            }
                        }
                    }
                }
            }
        }
    }



    if(!document.querySelectorAll("[role='presentation']")[0]){
        if (document.readyState === "complete") {
            for (var cok = 0; cok < urutkan.length; cok++) {
                if(urutkan[cok].textContent.includes("URUTKAN")) {
                    urutkan[cok].click()
                }
            }
        }
    }
    if(document.getElementsByClassName("loading-overlay").length == 0 ){

        if(document.querySelectorAll("[role='presentation']")[0]){
            if (document.readyState === "complete") {
                for (var coki = 0; coki < waktupost.length; coki++) {
                    if(waktupost[coki].textContent.includes("Aktivitas")) {
                        if(document.getElementsByClassName("prevent-scrolling")[0]){
                            waktupost[coki].click()
                        }

                    }
                }
            }
        }
    }


    }
    var currentGame2;
    return {
        start() {
            currentGame2 = setInterval(game2, 1000)
        },
        stop() {
            clearInterval(currentGame2)
        }
    }
}




function lapor(){
    console.log("mulai lapor")
    const d = new Date();
    if(document.location.href.includes("group")){
        console.log("cek href ")
        if(document.querySelectorAll("[role='heading']").length > 0) {
            GM.setValue( 1,"(" + document.querySelectorAll("[role='heading']")[0].textContent + ") Belum Comment " + d.getHours() + ":" + d.getMinutes());
            console.log("(" + document.querySelectorAll("[role='heading']")[0].textContent + ") Belum Comment " + d.getHours() + ":" + d.getMinutes())
            document.location = "https://telegram.org"
        }
    }

}


var kirimlaporan = setInterval(function(){
    if(document.location.href.includes("telegram")){
        sendMessage(Laporan)
        console.log("Laporan Terkirim Ke Telegram" )
        GM.setValue( 1," ");
        clearInterval(kirimlaporan)

        setTimeout(function(){location.href = "about:blank";}, 3000);
    }

}, 5000);

setTimeout(function(){lapor()}, 240000);
setTimeout(function(){ game2.start()}, 10000);
