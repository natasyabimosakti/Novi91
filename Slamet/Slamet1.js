// ==UserScript==
// @name         NEW Slamet 1
// @namespace    http://tampermonkey.net/
// @version      3.17
// @description  try to take over the world!
// @updateURL    https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Slamet/Slamet1.js
// @downloadURL  https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Slamet/Slamet1.js
// @author       You
// @match        http*://*/*
// @run-at       document-end
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        window.close
// ==/UserScript==

var namagroup1 = 'SHIOKELINCI';
var Comment1 = '#shiokelinci4d*ASTEROID*01*44'; 

var namagroup2 = 'BUKU';
var Comment2 = 'IYATOTO ASELOLE 88*75*65'; 

var namagroup3 = 'TIKTAK';
var Comment3 = 'Tiktaktogel / ASKRITING99 / 17 , 84 , 50'; 

var namagroup4 = 'GAIB';
var Comment4 = 'GAIB4D=ASMUNI=08*14*33'; 

var namagroup5 = 'KEITOGEL';
var Comment5 = '#keitogel = (AKUNPUTUR) = 29*74*04'; 

var namagroup6 = 'KIOS';
var Comment6 = 'KIOSTOTO=ALIMIN=96*83*68'; 

var namagroup7 = '453P VIP';
var Comment7 = 'ASEPTOGEL ALADIN2 19*59*03'; 

var namagroup8 = 'MENARA';
var Comment8 = '#MENARA4D=ABIDIN1= 25*85'; 

var namagroup9 = 'GIL4';
var Comment9 = 'GILA4D=ANGELOTOK=40*92*55'; 

var namagroup10 = 'JNE';
var Comment10 = '#JNETOTO(AYANGBEB1)*94*43*12'; 

var namagroup11 = 'TOYIB';
var Comment11 = '#TOYIBSLOT ( ASMARA1 ) : 00*20*30'; 

var namagroup12 = 'MASTER KUY';
var Comment12 = 'TOGELKUY AMATPITAK 18*52*36'; 

var namagroup13 = 'KOI';
var Comment13 = '#KOITOTO ( AGUSBUNTUNG3 ) 56*58'; 

var namagroup14 = 'ANGKER';
var Comment14 = 'ANGKER4D=AHMADYANI=11*45*91'; 

var namagroup15 = 'VESPA';
var Comment15 = 'VESPATOGEL (ALGEDEBUK) 05*48*07'; 

var namagroup16 = 'Nemo';
var Comment16 = 'NEMO4D (ANDYLAU) : 70*54*57'; 

var namagroup17 = 'KIKO';
var Comment17 = '#KIKOTOTO (AJISUING) = 66*49';

var namagroup18 = 'Jawatengah';
var Comment18 = 'group Slamet 1';




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
             "sandiego","sanjaya","siska","safar","sinta","surianti","satria","sapto","salsabila","sanchez","sofia","sonia","serena","specialis","seojun","saskia","sifa","seojun","sudewo",
             "tink","tiktak","tiara","tatang","tomi",
             "xian","vivi",
             "yanty","yoky","yohana","yura","yaya",
             "wulan","wok","wak",
             "zuko"];


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


var jitter = 0
var Cutter = 0
var myrefresh = setInterval(function(){
    if (tm == "" || tm == undefined || tm == null) {
        GM.setValue("time", hour);
    }
    if ( hour > tm + 2 || hour < tm||document.URL.includes("google") == true||hour == undefined||hour == null){
        for (var kr = 1; kr < 19; kr++) {
            GM.setValue( kr,0);
        }
        GM.setValue("time", hour);
    }
    if(document.location.href.includes("group")){
        window.scroll(0,200)
    }
    if(Cutter == 1){
        location.href = "about:blank"
    }
    if(jitter == 1){
        return;
    }
    if(document.location.href.includes("group")){
        for (let ntv = 0; ntv < document.querySelectorAll('[data-tracking-duration-id').length; ntv++) {
            if(jitter == 1){
                return;
            }
            if(Cutter == 1){
                location.href = "about:blank"
            }
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

                if (postingan.textContent.includes("Baru")||postingan.textContent.includes(" 1 men")||postingan.textContent.includes(" 2 men")||postingan.textContent.includes(" 3 men")||postingan.textContent.includes(" 4 men")||postingan.textContent.includes(" 5 men")){
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
                            if(jitter == 1){
                                return;
                            }
                            if(namafb.textContent.toLowerCase().includes(admin[adm].toLowerCase())||jamposting2.toLowerCase().includes("admin")||jamposting2.toLowerCase().includes("moderator")||jamposting1.toLowerCase().includes("admin")||jamposting1.toLowerCase().includes("moderator")){
                                // Tampilkan Siapa Yang Memposting
                                if(jamposting2.toLowerCase().includes("admin")||jamposting2.toLowerCase().includes("moderator")){
                                    console.log("Admin yang Memosting = Admin/Moderator");
                                }else{
                                    console.log("Admin yang Memosting = " + admin[adm]);
                                }

                                // Click Comment Box
                                for (var clk = 0; clk < commentbox.length; clk++) {
                                    if(commentbox[clk]){
                                        console.log("comment box ditemukan")
                                        if(commentbox[clk].textContent.toLowerCase().includes("jawab")||commentbox[clk].textContent.toLowerCase().includes("tulis")||commentbox[clk].textContent.toLowerCase().includes("komentar")){
                                            clearInterval(myrefresh);
                                            console.log("Click Posting box")
                                            jitter = 0
                                            commentbox[clk].click()
                                            game.start()
                                            break;
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
        console.log('Menentukan Komentar')
        if(jitter == 1){
            return;
        }
        if(Cutter == 1){
            location.href = "about:blank"
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
                    if (id1 == "1") {
                        jitter = 1
                        Cutter = 1
                        location.href = "about:blank"
                    }
                    /*cek nama group dan tulis commntar*/
                    GM.setValue( 1,1);
                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment1;
                    console.log("Sudah Comment")
                    clicksend();
                    jitter = 1
                    return;
                }
                if (ceknamagroup.includes(namagroup2) == true||ceknamagroup1.includes(namagroup2) == true||ceknamagroup2.includes(namagroup2) == true||ceknamagroup3.includes(namagroup2) == true||ceknamagroup4.includes(namagroup2) == true) {
                    if (id2 == "1") {
                        jitter = 1
                        Cutter = 1
                        location.href = "about:blank"
                    }
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
                    if (id3 == "1") {
                        jitter = 1
                        Cutter = 1
                        location.href = "about:blank"
                    }
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
                    if (id4 == "1") {
                        jitter = 1
                        Cutter = 1
                        location.href = "about:blank"
                    }
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
                    if (id5 == "1") {
                        jitter = 1
                        Cutter = 1
                        location.href = "about:blank"
                    }
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
                    if (id6 == "1") {
                        jitter = 1
                        Cutter = 1
                        location.href = "about:blank"
                    }
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
                    if (id7 == "1") {
                        jitter = 1
                        Cutter = 1
                        location.href = "about:blank"
                    }
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
                    if (id8 == "1") {
                        jitter = 1
                        Cutter = 1
                        location.href = "about:blank"
                    }
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
                    if (id9 == "1") {
                        jitter = 1
                        Cutter = 1
                        location.href = "about:blank"
                    }
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
                    if (id10 == "1") {
                        jitter = 1
                        Cutter = 1
                        location.href = "about:blank"
                    }
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
                    if (id11 == "1") {
                        jitter = 1
                        Cutter = 1
                        location.href = "about:blank"
                    }
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
                    if (id12 == "1") {
                        jitter = 1
                        Cutter = 1
                        location.href = "about:blank"
                    }
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
                    if (id13 == "1") {
                        jitter = 1
                        Cutter = 1
                        location.href = "about:blank"
                    }
                    /*cek nama group dan tulis commntar*/
                    /*cek nama group dan tulis commntar*/
                    GM.setValue( 13,1);
                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment13;
                    console.log("Sudah Comment")
                    clicksend();
                    jitter = 1
                }
                if (ceknamagroup.includes(namagroup14) == true||ceknamagroup1.includes(namagroup14) == true||ceknamagroup2.includes(namagroup14) == true||ceknamagroup3.includes(namagroup14) == true||ceknamagroup4.includes(namagroup14) == true) {
                    if (id14 == "1") {
                        jitter = 1
                        Cutter = 1
                        location.href = "about:blank"
                    }
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
                    if (id15 == "1") {
                        jitter = 1
                        Cutter = 1
                        location.href = "about:blank"
                    }
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
                    if (id16 == "1") {
                        jitter = 1
                        Cutter = 1
                        location.href = "about:blank"
                    }
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
                    if (id17 == "1") {
                        jitter = 1
                        Cutter = 1
                        location.href = "about:blank"
                    }
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
                    if (id18 == "1") {
                        jitter = 1
                        Cutter = 1
                        location.href = "about:blank"
                    }
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
            currentGame = setInterval(game, 20)
        },
        stop() {
            clearInterval(currentGame)
        }
    }
}
var game = gameClosure()

function clicksend() {
    if(jitter == 1){
        return;
    }
    if(Cutter == 1){
        location.href = "about:blank"
    }
    game.stop()
    jitter = 1

    /*Tampilkan TOMBOL SEND*/
    if(document.getElementsByClassName("textbox-submit-button")[0] && document.getElementsByClassName("multi-line-floating-textbox")[0].value.length >= 1){
        Cutter =1
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




        setTimeout(function(){location.href = "about:blank"},500)
        setTimeout(function(){location.href = "about:blank"},1000)





        /*Tekan TOMBOL SEND*/
    }
}
