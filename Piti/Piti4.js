// ==UserScript==
// @name         Piti4
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  try to take over the world!
// @updateURL    https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Piti/Piti4.js
// @downloadURL  https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Piti/Piti4.js
// @author       You
// @match        http*://*/*
// @run-at       document-end
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        window.close
// ==/UserScript==

var namagroup1 = 'LICIN';
var Comment1 = '#LICIN4D (DEKKLUWER) 47*60*21'; 

var namagroup2 = 'K86';
var Comment2 = 'K86TOTO ( DELEKEK ) : 66*02*94'; 

var namagroup3 = 'ELEVENS';
var Comment3 = '(ELEVENS4D) = (DOLUNDRO) 16*67*30'; 

var namagroup4 = 'RIATOTO';
var Comment4 = '#RIATOTO DEMPURUK = 27*10*53'; 

var namagroup5 = 'PEDRO';
var Comment5 = '#PEDRO4D (DELELENG*09*24*96)'; 

var namagroup6 = 'DIVA4D';
var Comment6 = '#DIVA4D (DINGLENG) = 23*49*20'; 

var namagroup7 = 'BENIH';
var Comment7 = '#BENIHTOTO(DELETET12) : 86*33*22'; 

var namagroup8 = '𝐀𝐋𝐋𝐏𝐀𝐒';
var Comment8 = 'Tok99Toto ( DUKUSAPU12 ) : 77*85*37'; 

var namagroup9 = 'Wellz';
var Comment9 = 'SIJITOGEL DUKUEMPEK10 41*04*64'; 

var namagroup10 = 'LING';
var Comment10 = 'LING77 (DUKANGBATU) 97*07'; 

var namagroup11 = 'MAYAPADA';
var Comment11 = 'BETT*Mayapada4D(BO)*DUODANCOK*25*45*83'; 

var namagroup12 = 'ROOM LOMBA TEBAK';
var Comment12 = 'DULELOT11 : 68*70*87 #BESTOTO88'; 

var namagroup13 = 'GOHT0G3L';
var Comment13 = 'GOHTOGEL=DODANCOK=80*26*51'; 

var namagroup14 = 'TARUNG';
var Comment14 = '#TARUNGTOTO (DUMPLEKAH)=90_65'; 

var namagroup15 = 'Hoho';
var Comment15 = 'DUKULENG12 : 58*88*29 #HOHOTOGEL'; 

var namagroup16 = 'KECERDASAN';
var Comment16 = 'CITA4D*DIKANGBATU*32*55*63'; 



var namagroup17 = 'Jawatengah';
var Comment17 = 'Baru Piti 4';

var namagroup18 = 'lajw';
var Comment18 = 'asek';


var refresh = 40;

var admin = ["Siâo","andre","adiat","andy","ayunda","audi","arxidi","aditia","aldi","ananda","alde","adm","ayesha","aqisya","arga","arifin","aru","agung","alenta","andi","arsyah","mrdepo","acha","annisa","amelia","anisa","fania","ban nee","putri","anisa",
             "boleng","biru","bobby","bastian","boboho","bola","bunga","bonbin",
             "cristina","camb","cassa","che","cinta","celsia","cila","calon","chika","calvin","chika",
             "david","dewa","desi","debby","dewi","dentoto","dika","dealova","diva","damara",
             "erwin","emilia","evelyn",
             "fira","fahresa","fiana","fahmi",
             "gita",
             "habib","hefi","hoihai","hana","hoki",
             "icha","iyatoto","invest","ivanna","inisial","ishaura",
             "jordi","jaguar","jne","jovanka","jessica","je pe","jess","jenifer",
             "keitogel","kumbara","kembar","kotna","karina","katharina","kemon","kaka","karla","komandan",
             "lianda","lusiana","lina","laura","lehman","leader","leon","lidya","langit",
             "mahendra","monica","mey","mersya","mad rm","multi","mariana","melati","male","megaways","manu","mamad","mas har","metha","maleeqq","mely","mayangsari",
             "nasution","nyocol","naura","neng","nino","nona","neman","novi","nella","nahdya","nur","namira","nindy",
             "oscar","ozawa","otong","ormas",
             "pung","puput","priyan","primus","primus","pencari","pricilia","putra",
             "ratu","rio","ria","rikodo","rizal","roy","rendy","rana","rindi",
             "sandiego","san","sanjaya","siska","safar","sinta","surianti","satria","sapto","salsabila","sanchez","sofia","sonia","serena","sahara","specialis","sam","sasha","sintia","sifa","satria",
             "tink","tiktak","tiara","tatang","tania",
             "yanty","yoky","yohana","yii","vero","vaulian",
             "wulan","wok","widya"];


var keyword1 = "ROOM"
var keyword2 = "𝗥𝗢𝗢𝗠"
var keyword3 = "LOMBA"
var keyword4 = "𝗟𝗢𝗠𝗕𝗔"
var keyword5 = "𝐋𝐎𝐌𝐁𝐀"
var keyword6 = "2D 2LINE"
var keyword7 = "ROM"
var keyword8 = "R00M"
var keyword9 = "2D 3LINE"
var keyword10 = "𝐑𝐎𝐎𝐌"
var keyword11 = "HONGKONG"
var keyword12 = "SINGA"
var keyword13 = "SYDNEY"

var Backlist1 = "pemenang lomba";
var Backlist2 = "rekap";
var Backlist3 = "hasil";
var Backlist4 = "room lomba freebet";
var Backlist5 = "prediksi";
var Backlist6 = "result";
var Backlist7 = "totomacau";



var jitter = 0
var Cutter = 0
var myrefresh = setInterval(function(){
    window.scroll(0,100)
    if(Cutter == 1){
        location.href = "about:blank"
    }
    if(jitter == 1){
        return;
    }

    for (let ntv = 0; ntv < document.querySelectorAll('[data-tracking-duration-id').length; ntv++) {
        if (document.querySelectorAll('[data-tracking-duration-id')[ntv]){
            // Nama FB
            var namafb = document.querySelectorAll('[data-tracking-duration-id]')[ntv].getElementsByClassName('native-text')[0];
            //Jam
            var jamposting = document.querySelectorAll('[data-tracking-duration-id]')[ntv].getElementsByClassName('native-text')[1];
            //Postingan
            var postingan =document.querySelectorAll('[data-tracking-duration-id')[ntv].getElementsByClassName('native-text')[3];
            //Comment Box
            var commentbox = document.querySelectorAll('[data-tracking-duration-id')[ntv].getElementsByClassName('native-text')
            // Cek Jam
            var ret = jamposting.textContent.replace(/  Admin   |  Moderator   /g, "");
            if (ret.includes("Baru")||ret.slice(0,7).includes("1 menit")||ret.slice(0,7).includes("2 menit")||ret.slice(0,7).includes("3 menit")||ret.slice(0,7).includes("4 menit")||ret.slice(0,7).includes("4 menit")){
                console.log("Jam Ditemukan " + ret)
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
                    if(postingan.textContent.toLowerCase().includes(Backlist1.toLowerCase())
                       ||postingan.textContent.toLowerCase().includes(Backlist2.toLowerCase())
                       ||postingan.textContent.toLowerCase().includes(Backlist3.toLowerCase())
                       ||postingan.textContent.toLowerCase().includes(Backlist4.toLowerCase())
                       ||postingan.textContent.toLowerCase().includes(Backlist5.toLowerCase())
                       ||postingan.textContent.toLowerCase().includes(Backlist6.toLowerCase())
                       ||postingan.textContent.toLowerCase().includes(Backlist7.toLowerCase())){
                        console.log("Terdaftar Backlist...!  ");
                        return;
                    }
                    console.log("Proses dilanjutkan tidak ada Backlist");
                    // Cek Admin
                    for (var adm in admin){
                        if(namafb.textContent.toLowerCase().includes(admin[adm].toLowerCase())||jamposting.textContent.toLowerCase().includes("admin")||jamposting.textContent.toLowerCase().includes("moderator")){
                            // Tampilkan Siapa Yang Memposting
                            if(jamposting.textContent.toLowerCase().includes("admin")||jamposting.textContent.toLowerCase().includes("moderator")){
                                console.log("Admin yang Memosting = Admin/Moderator");
                            }else{
                                console.log("Admin yang Memosting = " + admin[adm]);
                            }
                            // Click Comment Box
                            for (var clk = 0; clk < commentbox.length; clk++) {
                                if(commentbox[clk]){
                                    if(commentbox[clk].textContent.toLowerCase().includes("jawab")|| commentbox[clk].textContent.toLowerCase().includes("tulis")){

                                        clearInterval(myrefresh);
                                        console.log("Click Posting box")
                                        jitter = 0
                                        commentbox[clk].click()
                                        game.start()
                                        return;
                                    }
                                }
                            }
                            return;
                        }
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
                        if(jitter == 1){
                            return;
                        }
                        if(document.getElementsByClassName("prevent-scrolling")[0]){
                            waktupost[coki].click()
                        }

                    }
                }
            }
        }
    }


}, refresh * 10)


function gameClosure() {
    function game() {
        console.log('The game is Start')
        if(jitter == 1){
            return;
        }
        console.log('The game is running')
        /* This is just an example, replace this with the body of gameInit() */
        if(document.getElementsByClassName("multi-line-floating-textbox").length > 0 ){
            var ceknamagroup
            var ceknamagroup1
            var ceknamagroup2
            var ceknamagroup3
            var ceknamagroup4
            'use strict';
            if( document.getElementsByClassName("fixed-container")[0]){
                ceknamagroup = document.getElementsByClassName("fixed-container")[0].textContent;
            }
            if( document.getElementsByClassName('native-text')[5]){
                ceknamagroup1 = document.getElementsByClassName('native-text')[5].textContent;
            }
            if( document.getElementsByClassName('native-text')[6]){
                ceknamagroup2 = document.getElementsByClassName('native-text')[6].textContent;
            }
            if( document.getElementsByClassName('native-text')[7]){
                ceknamagroup3 = document.getElementsByClassName('native-text')[7].textContent;
            }
            if( document.getElementsByClassName('native-text')[8]){
                ceknamagroup4 = document.getElementsByClassName('native-text')[8].textContent;
            }

            if (document.getElementsByClassName("multi-line-floating-textbox")[0]){
                if (ceknamagroup.includes(namagroup1) == true||ceknamagroup1.includes(namagroup1) == true||ceknamagroup2.includes(namagroup1) == true||ceknamagroup3.includes(namagroup1) == true||ceknamagroup4.includes(namagroup1) == true) {
                    /*cek nama group dan tulis commntar*/
                    GM.setValue( 1,1);
                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment1;
                    console.log("Sudah Comment")
                    clicksend();
                    jitter = 1
                    return;
                }
                if (ceknamagroup.includes(namagroup2) == true||ceknamagroup1.includes(namagroup2) == true||ceknamagroup2.includes(namagroup2) == true||ceknamagroup3.includes(namagroup2) == true||ceknamagroup4.includes(namagroup2) == true) {
                    /*cek nama group dan tulis commntar*/
                    GM.setValue( 2,1);
                    /*cek nama group dan tulis commntar*/
                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment2;
                    console.log("Sudah Comment")
                    clicksend();
                    jitter = 1
                    return;
                }
                if (ceknamagroup.includes(namagroup3) == true||ceknamagroup1.includes(namagroup3) == true||ceknamagroup2.includes(namagroup3) == true||ceknamagroup3.includes(namagroup3) == true||ceknamagroup4.includes(namagroup3) == true) {
                    /*cek nama group dan tulis commntar*/
                    GM.setValue( 3,1);
                    /*cek nama group dan tulis commntar*/
                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment3;
                    console.log("Sudah Comment")
                    clicksend();
                    jitter = 1
                    return;

                }
                if (ceknamagroup.includes(namagroup4) == true||ceknamagroup1.includes(namagroup4) == true||ceknamagroup2.includes(namagroup4) == true||ceknamagroup3.includes(namagroup4) == true||ceknamagroup4.includes(namagroup4) == true) {
                    /*cek nama group dan tulis commntar*/
                    /*cek nama group dan tulis commntar*/
                    GM.setValue( 4,1);
                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment4;
                    console.log("Sudah Comment")
                    clicksend();
                    jitter = 1
                    return;
                }
                if (ceknamagroup.includes(namagroup5) == true||ceknamagroup1.includes(namagroup5) == true||ceknamagroup2.includes(namagroup5) == true||ceknamagroup3.includes(namagroup5) == true||ceknamagroup4.includes(namagroup5) == true) {
                    /*cek nama group dan tulis commntar*/
                    /*cek nama group dan tulis commntar*/
                    GM.setValue( 5,1);
                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment5;
                    console.log("Sudah Comment")
                    clicksend();
                    jitter = 1
                    return;
                }
                if (ceknamagroup.includes(namagroup6) == true||ceknamagroup1.includes(namagroup6) == true||ceknamagroup2.includes(namagroup6) == true||ceknamagroup3.includes(namagroup6) == true||ceknamagroup4.includes(namagroup6) == true) {
                    /*cek nama group dan tulis commntar*/
                    /*cek nama group dan tulis commntar*/
                    GM.setValue( 6,1);
                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment6;
                    console.log("Sudah Comment")
                    clicksend();
                    jitter = 1
                    return;
                }
                if (ceknamagroup.includes(namagroup7) == true||ceknamagroup1.includes(namagroup7) == true||ceknamagroup2.includes(namagroup7) == true||ceknamagroup3.includes(namagroup7) == true||ceknamagroup4.includes(namagroup7) == true) {
                    /*cek nama group dan tulis commntar*/
                    /*cek nama group dan tulis commntar*/
                    GM.setValue( 7,1);
                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment7;
                    console.log("Sudah Comment")
                    clicksend();
                    jitter = 1
                    return;
                }
                if (ceknamagroup.includes(namagroup8) == true||ceknamagroup1.includes(namagroup8) == true||ceknamagroup2.includes(namagroup8) == true||ceknamagroup3.includes(namagroup8) == true||ceknamagroup4.includes(namagroup8) == true) {
                    /*cek nama group dan tulis commntar*/
                    /*cek nama group dan tulis commntar*/
                    GM.setValue( 8,1);
                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment8;
                    console.log("Sudah Comment")
                    clicksend();
                    jitter = 1
                    return;
                }
                if (ceknamagroup.includes(namagroup9) == true||ceknamagroup1.includes(namagroup9) == true||ceknamagroup2.includes(namagroup9) == true||ceknamagroup3.includes(namagroup9) == true||ceknamagroup4.includes(namagroup9) == true) {
                    /*cek nama group dan tulis commntar*/
                    /*cek nama group dan tulis commntar*/
                    GM.setValue( 9,1);
                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment9;
                    console.log("Sudah Comment")
                    clicksend();
                    jitter = 1
                    return;
                }
                if (ceknamagroup.includes(namagroup10) == true||ceknamagroup1.includes(namagroup10) == true||ceknamagroup2.includes(namagroup10) == true||ceknamagroup3.includes(namagroup10) == true||ceknamagroup4.includes(namagroup10) == true) {
                    /*cek nama group dan tulis commntar*/
                    /*cek nama group dan tulis commntar*/
                    GM.setValue( 10,1);
                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment10;
                    console.log("Sudah Comment")
                    clicksend();
                    jitter = 1;
                    return;
                }
                if (ceknamagroup.includes(namagroup11) == true||ceknamagroup1.includes(namagroup11) == true||ceknamagroup2.includes(namagroup11) == true||ceknamagroup3.includes(namagroup11) == true||ceknamagroup4.includes(namagroup11) == true) {
                    /*cek nama group dan tulis commntar*/
                    /*cek nama group dan tulis commntar*/
                    GM.setValue( 11,1);
                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment11;
                    console.log("Sudah Comment")
                    clicksend();
                    jitter = 1;
                    return;
                }
                if (ceknamagroup.includes(namagroup12) == true||ceknamagroup1.includes(namagroup12) == true||ceknamagroup2.includes(namagroup12) == true||ceknamagroup3.includes(namagroup12) == true||ceknamagroup4.includes(namagroup12) == true) {
                    /*cek nama group dan tulis commntar*/
                    /*cek nama group dan tulis commntar*/
                    GM.setValue( 12,1);
                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment12;
                    console.log("Sudah Comment")
                    clicksend();
                    jitter = 1
                    return;
                }
                if (ceknamagroup.includes(namagroup13) == true||ceknamagroup1.includes(namagroup13) == true||ceknamagroup2.includes(namagroup13) == true||ceknamagroup3.includes(namagroup13) == true||ceknamagroup4.includes(namagroup13) == true) {
                    /*cek nama group dan tulis commntar*/
                    /*cek nama group dan tulis commntar*/
                    GM.setValue( 13,1);
                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment13;
                    console.log("Sudah Comment")
                    clicksend();
                    jitter = 1
                }
                if (ceknamagroup.includes(namagroup14) == true||ceknamagroup1.includes(namagroup14) == true||ceknamagroup2.includes(namagroup14) == true||ceknamagroup3.includes(namagroup14) == true||ceknamagroup4.includes(namagroup14) == true) {
                    /*cek nama group dan tulis commntar*/
                    /*cek nama group dan tulis commntar*/
                    GM.setValue( 14,1);
                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment14;
                    console.log("Sudah Comment")
                    clicksend();
                    jitter = 1
                    return;
                }

                if (ceknamagroup.includes(namagroup15) == true||ceknamagroup1.includes(namagroup15) == true||ceknamagroup2.includes(namagroup15) == true||ceknamagroup3.includes(namagroup15) == true||ceknamagroup4.includes(namagroup15) == true) {
                    /*cek nama group dan tulis commntar*/
                    /*cek nama group dan tulis commntar*/
                    GM.setValue( 15,1);
                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment15;
                    console.log("Sudah Comment")
                    clicksend();
                    jitter = 1
                    return;
                }

                if (ceknamagroup.includes(namagroup16) == true||ceknamagroup1.includes(namagroup16) == true||ceknamagroup2.includes(namagroup16) == true||ceknamagroup3.includes(namagroup16) == true||ceknamagroup4.includes(namagroup16) == true) {
                    /*cek nama group dan tulis commntar*/
                    /*cek nama group dan tulis commntar*/
                    GM.setValue( 16,1);
                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment16;
                    console.log("Sudah Comment")
                    clicksend();
                    jitter = 1
                    return;
                }
                if (ceknamagroup.includes(namagroup17) == true||ceknamagroup1.includes(namagroup17) == true||ceknamagroup2.includes(namagroup17) == true||ceknamagroup3.includes(namagroup17) == true||ceknamagroup4.includes(namagroup17) == true) {
                    /*cek nama group dan tulis commntar*/
                    /*cek nama group dan tulis commntar*/
                    GM.setValue( 17,1);
                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment17;
                    console.log("Sudah Comment")
                    clicksend();
                    jitter = 1
                    return;
                }
                if (ceknamagroup.includes(namagroup18) == true||ceknamagroup1.includes(namagroup18) == true||ceknamagroup2.includes(namagroup18) == true||ceknamagroup3.includes(namagroup18) == true||ceknamagroup4.includes(namagroup18) == true) {
                    /*cek nama group dan tulis commntar*/
                    /*cek nama group dan tulis commntar*/
                    GM.setValue( 18,1);
                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment18;
                    console.log("Sudah Comment")
                    clicksend();
                    jitter = 1
                    return;
                }
            }
        }
    }
    var currentGame;
    return {
        start() {
            currentGame = setInterval(game, 50)
        },
        stop() {
            clearInterval(currentGame)
        }
    }
}
var game = gameClosure()

function clicksend() {
    game.stop()
    jitter = 1
    
    /*Tampilkan TOMBOL SEND*/
    if(document.getElementsByClassName("textbox-submit-button")[0] && document.getElementsByClassName("multi-line-floating-textbox")[0].value.length >= 1){
        document.getElementsByClassName("textbox multi-line-floating-textbox")[0].dispatchEvent(
            new Event("input", { bubbles: true, cancelable: true })
        );
        document.getElementsByClassName("textbox-submit-button")[0].style.display=""

        /*Tekan TOMBOL SEND*/
        var clicksendcoment = document.getElementsByClassName("textbox-submit-button")[0];
        clicksendcoment.disabled = false;
        var clickEvent = document.createEvent ('MouseEvents');
        clickEvent.initEvent ("mousedown", true, true);
        clicksendcoment.dispatchEvent (clickEvent);
        console.log("Comment Terkirim");
        Cutter=1
        location.href = "about:blank"

        setTimeout(function(){location.href = "about:blank"},500)
        closer()




        /*Tekan TOMBOL SEND*/
    }
}
function closer() {
    location.href = "about:blank"


}