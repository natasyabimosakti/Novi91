// ==UserScript==
// @name         Kawul4
// @namespace    http://tampermonkey.net/
// @version      3.102
// @description  try to take over the world!
// @updateURL    https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Kawul/Kawul4.js
// @downloadURL  https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Kawul/Kawul4.js
// @author       You
// @match        http*://*/*
// @run-at       document-end
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        window.close
// ==/UserScript==



var namagroup1 = 'XX1';
var Comment1 = '#XX1TOTO (SALAMANAE) 85*67*18 BETTING'; 

var namagroup2 = 'K86';
var Comment2 = 'K86TOTO ( SAKUWIL ) : 47*12*94'; 

var namagroup3 = 'PUSAT LOMBA';
var Comment3 = 'Shiotogel4d (SANGEKABEH) 37*00*70'; 

var namagroup4 = 'TEMPO';
var Comment4 = 'SAKAREPMU : 73*54*51 #TEMPOTOTO'; 

var namagroup5 = 'INSTANT';
var Comment5 = '#INSTANTOTO (SAKAUBEN) = 25*03'; 

var namagroup6 = 'DIVA4D';
var Comment6 = '#DIVA4D (SAKEMBER) = 04*84*96'; 

var namagroup7 = 'RNR';
var Comment7 = '#RNR303(SAKAUBEN) : 24*79*08'; 

var namagroup8 = 'TOK99T0T0';
var Comment8 = 'Tok99Toto ( SAMBATAE ) : 69*41*62'; 

var namagroup9 = 'Wellz';
var Comment9 = 'SIJITOGEL SALAMANSEK 37*00*70'; 

var namagroup10 = 'LING';
var Comment10 = 'LING77 (SAIKIPIYE) 73*54'; 

var namagroup11 = 'KELUARGA';
var Comment11 = '#LTDTOTO =(SANTAYBOSKU)= 24*79*'; 

var namagroup12 = 'ROOM LOMBA TEBAK';
var Comment12 = 'SAWERBOSE0 : 04*84*96 #BESTOTO88'; 

var namagroup13 = 'GOHT0G3L';
var Comment13 = 'GOHTOGEL=SAWERSEK=85*67*18'; 

var namagroup14 = 'BLITAR';
var Comment14 = '#BLITAR4D ( SALAMANAE ) : 01*41*62'; 

var namagroup15 = 'Hoho';
var Comment15 = 'SAMBATAE : 25*03*91 #HOHOTOGEL'; 

var namagroup16 = 'KECERDASAN';
var Comment16 = 'CITA4D*SANGEKABEH*47*12*94';



var namagroup17 = 'Jawatengah';
var Comment17 = 'Kawul4';

var namagroup18 = 'lajw';
var Comment18 = 'asek';



var refresh = 30;
var d = new Date();
var hour = d.getHours();
var tm = await GM.getValue("time");
var id1 = await GM.getValue(1);
var id2 = await GM.getValue(2);
var id3 = await GM.getValue(3);
var id4 = await GM.getValue(4);
var id5 = await GM.getValue(5);
var id6 = await GM.getValue(6);
var id7 = await GM.getValue(7);
var id8 = await GM.getValue(8);
var id9 = await GM.getValue(9);
var id10 = await GM.getValue(10);
var id11 = await GM.getValue(11);
var id12 = await GM.getValue(12);
var id13 = await GM.getValue(13);
var id14 = await GM.getValue(14);
var id15 = await GM.getValue(15);
var id16 = await GM.getValue(16);
var id17 = await GM.getValue(17);
var id18 = await GM.getValue(18);

var admin = ["Siâo","andre","adiat","andy","ayunda","audi","arxidi","aditia","aldi","ananda","alde","adm","ayesha","aqisya","arga","arifin","aru",
             "boleng","biru","bobby","bastian","boboho","bola",
             "cristina","camb","cassa","che","cinta","celsia","cila","calon","chika",
             "david",",dewa","desi","debby","dewi","dentoto","dika","dealova",
             "erwin","emilia",
             "fira","fahresa",
             "gita",
             "habib","hefi","hoihai","hana",
             "icha","iyatoto","invest","ivanna","inisial",
             "jordi","jaguar","jne","jovanka","jessica","je pe","jess","jenifer",
             "keitogel","kumbara","kembar","kotna","karina","katharina","kemon","kaka",
             "lianda","lusiana","lina","laura","lehman","leader","leon","lidya",
             "mahendra","monica","mey","mersya","mad","multi","mariana","melati","male","megaways","manu","mamad","mas","metha",
             "nasution","nyocol","naura","neng","nino","nona","neman","novi","nella","nahdya","nur","namira","nindy",
             "oscar","ozawa",
             "pung","puput","priyan","primus","primus","pencari","pricilia",
             "ratu","rio","ria","rikodo","rizal","roy","rendy","rana","rindi",
             "sandiego","san","sanjaya","siska","safar","sinta","surianti","satria","sapto","salsabila","sanchez","sofia","sonia","serena","sahara","specialis","sam","sasha","sintia",
             "tink","tiktak","tiara","tatang","tania",
             "yanty","yoky","yohana",
             "wulan","wok"];

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

var Backlist1 = "pemenang lomba";
var Backlist2 = "rekap";
var Backlist3 = "hasil";
var Backlist4 = "room lomba freebet";
var Backlist5 = "prediksi";
var Backlist6 = "result";
var Backlist7 = "result";


var jitter = 0
var myrefresh = setInterval(function(){
 window.scroll(0,100)
    if (tm == "" || tm == undefined || tm == null) {
        GM.setValue("time", hour);
    }
    if ( hour > tm + 2 || hour < tm||document.URL.includes("google") == true||hour == undefined||hour == null){
        for (var kr = 1; kr < 19; kr++) {
            GM.setValue( kr,0);
        }
        GM.setValue("time", hour);
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
                   ||postingan.textContent.toLowerCase().includes(keyword10.toLowerCase())){
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
                        waktupost[coki].click()
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

            if (ceknamagroup.includes(namagroup1) == true||ceknamagroup1.includes(namagroup1) == true||ceknamagroup2.includes(namagroup1) == true||ceknamagroup3.includes(namagroup1) == true||ceknamagroup4.includes(namagroup1) == true) {
                if (id1 == "" || id1 == undefined || id1 == null ||id1 == "0") {
                    /*cek nama group dan tulis commntar*/
                    GM.setValue( 1,1);
                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment1;
                    console.log("Sudah Comment")
                    clicksend();
                     jitter = 1
                    return;
                } else {
                    location.href = "about:blank"
                }
            }
            if (ceknamagroup.includes(namagroup2) == true||ceknamagroup1.includes(namagroup2) == true||ceknamagroup2.includes(namagroup2) == true||ceknamagroup3.includes(namagroup2) == true||ceknamagroup4.includes(namagroup2) == true) {
                if (id2 == "" || id2 == undefined || id2 == null ||id2 == "0") {
                    /*cek nama group dan tulis commntar*/
                    GM.setValue( 2,1);
                    /*cek nama group dan tulis commntar*/
                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment2;
                    console.log("Sudah Comment")
                    clicksend();
                     jitter = 1
                    return;
                } else {
                    location.href = "about:blank"
                }
            }
            if (ceknamagroup.includes(namagroup3) == true||ceknamagroup1.includes(namagroup3) == true||ceknamagroup2.includes(namagroup3) == true||ceknamagroup3.includes(namagroup3) == true||ceknamagroup4.includes(namagroup3) == true) {
                if (id3 == "" || id3 == undefined || id3 == null ||id3 == "0") {
                    /*cek nama group dan tulis commntar*/
                    GM.setValue( 3,1);
                    /*cek nama group dan tulis commntar*/
                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment3;
                    console.log("Sudah Comment")
                    clicksend();
                     jitter = 1
                    return;
                } else {
                    location.href = "about:blank"
                }
            }
            if (ceknamagroup.includes(namagroup4) == true||ceknamagroup1.includes(namagroup4) == true||ceknamagroup2.includes(namagroup4) == true||ceknamagroup3.includes(namagroup4) == true||ceknamagroup4.includes(namagroup4) == true) {
                /*cek nama group dan tulis commntar*/
                if (id4 == "" || id4 == undefined || id4 == null ||id4 == "0") {
                    /*cek nama group dan tulis commntar*/
                    GM.setValue( 4,1);
                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment4;
                    console.log("Sudah Comment")
                    clicksend();
                     jitter = 1
                    return;
                } else {
                    location.href = "about:blank"
                }
            }
            if (ceknamagroup.includes(namagroup5) == true||ceknamagroup1.includes(namagroup5) == true||ceknamagroup2.includes(namagroup5) == true||ceknamagroup3.includes(namagroup5) == true||ceknamagroup4.includes(namagroup5) == true) {
                /*cek nama group dan tulis commntar*/
                if (id5 == "" || id5 == undefined || id5 == null ||id5 == "0") {
                    /*cek nama group dan tulis commntar*/
                    GM.setValue( 5,1);
                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment5;
                    console.log("Sudah Comment")
                    clicksend();
                     jitter = 1
                    return;
                } else {
                    location.href = "about:blank"
                }
            }
            if (ceknamagroup.includes(namagroup6) == true||ceknamagroup1.includes(namagroup6) == true||ceknamagroup2.includes(namagroup6) == true||ceknamagroup3.includes(namagroup6) == true||ceknamagroup4.includes(namagroup6) == true) {
                /*cek nama group dan tulis commntar*/
                if (id6 == "" || id6 == undefined || id6 == null ||id6 == "0") {
                    /*cek nama group dan tulis commntar*/
                    GM.setValue( 6,1);
                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment6;
                    console.log("Sudah Comment")
                    clicksend();
                     jitter = 1
                    return;
                } else {
                    location.href = "about:blank"
                }
            }
            if (ceknamagroup.includes(namagroup7) == true||ceknamagroup1.includes(namagroup7) == true||ceknamagroup2.includes(namagroup7) == true||ceknamagroup3.includes(namagroup7) == true||ceknamagroup4.includes(namagroup7) == true) {
                /*cek nama group dan tulis commntar*/
                if (id7 == "" || id7 == undefined || id7 == null ||id7 == "0") {
                    /*cek nama group dan tulis commntar*/
                    GM.setValue( 7,1);
                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment7;
                    console.log("Sudah Comment")
                    clicksend();
                     jitter = 1
                    return;
                } else {
                    location.href = "about:blank"
                }
            }
            if (ceknamagroup.includes(namagroup8) == true||ceknamagroup1.includes(namagroup8) == true||ceknamagroup2.includes(namagroup8) == true||ceknamagroup3.includes(namagroup8) == true||ceknamagroup4.includes(namagroup8) == true) {
                /*cek nama group dan tulis commntar*/
                if (id8 == "" || id8 == undefined || id8 == null ||id8 == "0") {
                    /*cek nama group dan tulis commntar*/
                    GM.setValue( 8,1);
                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment8;
                    console.log("Sudah Comment")
                    clicksend();
                     jitter = 1
                    return;
                } else {
                    location.href = "about:blank"
                }
            }
            if (ceknamagroup.includes(namagroup9) == true||ceknamagroup1.includes(namagroup9) == true||ceknamagroup2.includes(namagroup9) == true||ceknamagroup3.includes(namagroup9) == true||ceknamagroup4.includes(namagroup9) == true) {
                /*cek nama group dan tulis commntar*/
                if (id9 == "" || id9 == undefined || id9 == null ||id9 == "0") {
                    /*cek nama group dan tulis commntar*/
                    GM.setValue( 9,1);
                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment9;
                    console.log("Sudah Comment")
                    clicksend();
                     jitter = 1
                    return;
                } else {
                    location.href = "about:blank"
                }
            }
            if (ceknamagroup.includes(namagroup10) == true||ceknamagroup1.includes(namagroup10) == true||ceknamagroup2.includes(namagroup10) == true||ceknamagroup3.includes(namagroup10) == true||ceknamagroup4.includes(namagroup10) == true) {
                /*cek nama group dan tulis commntar*/
                if (id10 == "" || id10 == undefined || id10 == null ||id10 == "0") {
                    /*cek nama group dan tulis commntar*/
                    GM.setValue( 10,1);
                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment10;
                    console.log("Sudah Comment")
                    clicksend();
                     jitter = 1;
                    return;
                } else {
                    location.href = "about:blank"
                }
            }
            if (ceknamagroup.includes(namagroup11) == true||ceknamagroup1.includes(namagroup11) == true||ceknamagroup2.includes(namagroup11) == true||ceknamagroup3.includes(namagroup11) == true||ceknamagroup4.includes(namagroup11) == true) {
                /*cek nama group dan tulis commntar*/
                if (id11 == "" || id11 == undefined || id11 == null ||id11 == "0") {
                    /*cek nama group dan tulis commntar*/
                    GM.setValue( 11,1);
                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment11;
                    console.log("Sudah Comment")
                    clicksend();
                     jitter = 1;
                    return;
                } else {
                    location.href = "about:blank"
                }
            }
            if (ceknamagroup.includes(namagroup12) == true||ceknamagroup1.includes(namagroup12) == true||ceknamagroup2.includes(namagroup12) == true||ceknamagroup3.includes(namagroup12) == true||ceknamagroup4.includes(namagroup12) == true) {
                /*cek nama group dan tulis commntar*/
                if (id12 == "" || id12 == undefined || id12 == null ||id12 == "0") {
                    /*cek nama group dan tulis commntar*/
                    GM.setValue( 12,1);
                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment12;
                    console.log("Sudah Comment")
                    clicksend();
                     jitter = 1
                    return;
                } else {
                    location.href = "about:blank"
                }
            }
            if (ceknamagroup.includes(namagroup13) == true||ceknamagroup1.includes(namagroup13) == true||ceknamagroup2.includes(namagroup13) == true||ceknamagroup3.includes(namagroup13) == true||ceknamagroup4.includes(namagroup13) == true) {
                /*cek nama group dan tulis commntar*/
                if (id13 == "" || id13 == undefined || id13 == null ||id13 == "0") {
                    /*cek nama group dan tulis commntar*/
                    GM.setValue( 13,1);
                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment13;
                    console.log("Sudah Comment")
                    clicksend();
                     jitter = 1
                    return;
                } else {
                    location.href = "about:blank"
                }
            }
            if (ceknamagroup.includes(namagroup14) == true||ceknamagroup1.includes(namagroup14) == true||ceknamagroup2.includes(namagroup14) == true||ceknamagroup3.includes(namagroup14) == true||ceknamagroup4.includes(namagroup14) == true) {
                /*cek nama group dan tulis commntar*/
                if (id14 == "" || id14 == undefined || id14 == null ||id14 == "0") {
                    /*cek nama group dan tulis commntar*/
                    GM.setValue( 14,1);
                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment14;
                    console.log("Sudah Comment")
                    clicksend();
                     jitter = 1
                    return;
                } else {
                    location.href = "about:blank"
                }
            }

            if (ceknamagroup.includes(namagroup15) == true||ceknamagroup1.includes(namagroup15) == true||ceknamagroup2.includes(namagroup15) == true||ceknamagroup3.includes(namagroup15) == true||ceknamagroup4.includes(namagroup15) == true) {
                /*cek nama group dan tulis commntar*/
                if (id15 == "" || id15 == undefined || id15 == null ||id15 == "0") {
                    /*cek nama group dan tulis commntar*/
                    GM.setValue( 15,1);
                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment15;
                    console.log("Sudah Comment")
                    clicksend();
                     jitter = 1
                    return;
                } else {
                    location.href = "about:blank"
                }
            }

            if (ceknamagroup.includes(namagroup16) == true||ceknamagroup1.includes(namagroup16) == true||ceknamagroup2.includes(namagroup16) == true||ceknamagroup3.includes(namagroup16) == true||ceknamagroup4.includes(namagroup16) == true) {
                /*cek nama group dan tulis commntar*/
                if (id16 == "" || id16 == undefined || id16 == null ||id16 == "0") {
                    /*cek nama group dan tulis commntar*/
                    GM.setValue( 16,1);
                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment16;
                    console.log("Sudah Comment")
                    clicksend();
                     jitter = 1
                    return;
                } else {
                    location.href = "about:blank"
                }
            }
            if (ceknamagroup.includes(namagroup17) == true||ceknamagroup1.includes(namagroup17) == true||ceknamagroup2.includes(namagroup17) == true||ceknamagroup3.includes(namagroup17) == true||ceknamagroup4.includes(namagroup17) == true) {
                /*cek nama group dan tulis commntar*/
                if (id7 == "" || id17 == undefined || id17 == null ||id17 == "0") {
                    /*cek nama group dan tulis commntar*/
                    GM.setValue( 17,1);
                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment17;
                    console.log("Sudah Comment")
                    clicksend();
                     jitter = 1
                    return;
                } else {
                    location.href = "about:blank"
                }
            }
            if (ceknamagroup.includes(namagroup18) == true||ceknamagroup1.includes(namagroup18) == true||ceknamagroup2.includes(namagroup18) == true||ceknamagroup3.includes(namagroup18) == true||ceknamagroup4.includes(namagroup18) == true) {
                /*cek nama group dan tulis commntar*/
                if (id18 == "" || id18 == undefined || id18 == null ||id18 == "0") {
                    /*cek nama group dan tulis commntar*/
                    GM.setValue( 18,1);
                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment18;
                    console.log("Sudah Comment")
                    clicksend();
                     jitter = 1
                    return;
                } else {
                    location.href = "about:blank"
                }
            }
        }
    }
    var currentGame;
    return {
        start() {
            currentGame = setInterval(game, 0)
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
    if(document.getElementsByClassName("textbox-submit-button")[0]){
        document.getElementsByClassName("textbox-submit-button")[0].style.display=""

        /*Tekan TOMBOL SEND*/
        var clicksendcoment = document.getElementsByClassName("textbox-submit-button")[0];
        clicksendcoment.disabled = false;
        var clickEvent = document.createEvent ('MouseEvents');
        clickEvent.initEvent ("mousedown", true, true);
        clicksendcoment.dispatchEvent (clickEvent);
        console.log("Comment Terkirim");
        closer()
        /*Tekan TOMBOL SEND*/
    }
}

function closer() {
    setTimeout(function(){location.href = "about:blank"},100)


}
