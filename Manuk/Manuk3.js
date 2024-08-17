// ==UserScript==
// @name         MANUK 3
// @namespace    http://tampermonkey.net/
// @version      3.67
// @description  try to take over the world!
// @updateURL    https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Manuk/Manuk3.js
// @downloadURL  https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Manuk/Manuk3.js
// @author       You
// @match        http*://*/*
// @run-at       document-end
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        window.close
// ==/UserScript==




var namagroup1 = 'SHIOKELINCI';
var Comment1 = '#shiokelinci4d*DOROKERTO*80*51'; 

var namagroup2 = 'BUKU';
var Comment2 = 'IYATOTO DOROMIBER 72*39*99'; 

var namagroup3 = 'TIKTAK';
var Comment3 = '#Tiktaktogel / DORONYOK / 77 , 46 , 69'; 

var namagroup4 = 'GAIB';
var Comment4 = 'GAIB4D=DOROPOL12=61*89*97'; 

var namagroup5 = 'KEITOGEL';
var Comment5 = '#keitogel = (DORODOR12) = 47*23*10'; 

var namagroup6 = 'KIOST0T0';
var Comment6 = 'KIOSTOTO=DOROWIS12=26*53*82'; 

var namagroup7 = '453P VIP';
var Comment7 = 'ASEPTOGEL DOROMAN12 22*35*78'; 

var namagroup8 = 'ANGKER';
var Comment8 = 'ANGKER4D=DOROKERTO3=60*32*38'; 

var namagroup9 = 'GILA';
var Comment9 = 'GILA4D=DOROMIBER2=26*53*82'; 

var namagroup10 = 'JNE';
var Comment10 = '#JNETOTO(DORONYOK31)*47*23*10'; 

var namagroup11 = 'T_O_T_O_A_K_U_R_A_T';
var Comment11 = '#TA*DOROPOL12*61*89*97*'; 

var namagroup12 = 'MASTER KUY';
var Comment12 = 'TOGELKUY DORODOR12 77*46*69'; 

var namagroup13 = 'TOYIBSLOT';
var Comment13 = '#TOYIBSLOT ( DOROWIS12 ) : 72*39*64'; 

var namagroup14 = 'DENTOTO';
var Comment14 = '#DENTOTO 22*35*64 ( DOROMAN12 )'; 

var namagroup15 = 'SIJI';
var Comment15 = 'SIJITOGEL DORODOR12 60*32*38'; 

var namagroup16 = 'NEMO';
var Comment16 = 'NEMO4D (DOROKERTO) : 80*51*95'; 

var namagroup17 = 'CIVIC';
var Comment17 = '#CIVICTOTO(DORODOR12) = 99*78';

var namagroup18 = 'Jawatengah';
var Comment18 = 'Manuk3';


var refresh = 40;
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

var admin = [" ","nyocol","gita","rikodo","adiat","david",",dewa","wulan","andy","desi","erwin","mey","lusiana","fahresa","rizal","jordi","surianti","satria","boleng","yanty","pung","tiara","cristina","fira","ayunda","mersya","nona","camb","jaguar","Siâo","primus","habib","cassa","neng","arxidi","che","aldi","nino","sofia","sonia","serena","alde","puput","mad","hefi","dika","iyatoto","adm","celsia","jne","kotna","yoky","audi","lianda","salsabila","yohana","wok","bastian","hoihai","tink","sinta","kembar","laura","ayesha","tiktak","nella","novi","sandiego","nasution","ratu","priyan","san","ria","sanjaya","siska","biru","aditia","keitogel","safar","mahendra","multi","mariana","neman","tatang","dewi","primus","roy","dewi","melati","kumbara","dentoto","ananda","cinta","lina","icha","bobby","sanchez","oscar","rendy"];




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

var Backlist1 = "pemenang lomba";
var Backlist2 = "rekap";
var Backlist3 = "hasil";
var Backlist4 = "room lomba freebet";
var Backlist5 = "prediksi";
var Backlist6 = "result";
var Backlist7 = "result";

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
    var urutkan = document.querySelectorAll("[data-mcomponent='ServerTextArea']");
    var urutkan2 = document.querySelectorAll("[data-mcomponent='TextArea']");
    var waktupost = document.getElementsByClassName("native-text");
    window.scrollTo(0, 2000);

    for (var coke = 0; coke < urutkan2.length; coke++) {
        if (urutkan2[coke].textContent.includes("URUTKAN")) {

            urutkan2[coke].click()


        }
    }



    for (var cok = 0; cok < urutkan.length; cok++) {
        if(urutkan[cok].textContent.includes("URUTKAN")) {
            urutkan[cok].click()

        }
    }





    for (var coki = 0; coki < waktupost.length; coki++) {
        if(waktupost[coki].textContent.includes("Aktivitas")) {
            waktupost[coki].click()

        }
    }


}, refresh * 10)


setTimeout
var myInterval = setInterval(function(){


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

    console.log(" ");
    for (let ntv = 0; ntv < document.querySelectorAll('[data-tracking-duration-id').length; ntv++) {
        if (document.querySelectorAll('[data-tracking-duration-id')[ntv]){
            // Nama FB
            var namafb = document.querySelectorAll('[data-tracking-duration-id]')[ntv].getElementsByClassName('native-text')[0];
            //Jam
            var jamposting = document.querySelectorAll('[data-tracking-duration-id]')[ntv].getElementsByClassName('native-text')[1];
            //Postingan
            var postingan =document.querySelectorAll('[data-tracking-duration-id')[ntv].getElementsByClassName('native-text')[3];
            //Comment Box
            var datacommentbox = document.querySelectorAll('[data-tracking-duration-id')[ntv].getElementsByClassName('native-text').length -1
            var commentbox = document.querySelectorAll('[data-tracking-duration-id')[ntv].getElementsByClassName('native-text')[datacommentbox];

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
                            commentbox.click()




                            if (ceknamagroup.includes(namagroup1) == true||ceknamagroup1.includes(namagroup1) == true||ceknamagroup2.includes(namagroup1) == true||ceknamagroup3.includes(namagroup1) == true||ceknamagroup4.includes(namagroup1) == true) {
                                if (id1 == "" || id1 == undefined || id1 == null ||id1 == "0") {
                                    /*cek nama group dan tulis commntar*/
                                    GM.setValue( 1,1);
                                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment1;

                                    clearInterval(myInterval);
                                    clearInterval(myrefresh);
                                    console.log("Sudah Comment")
                                    clicksend();
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

                                    clearInterval(myInterval);
                                    clearInterval(myrefresh);
                                    console.log("Sudah Comment")
                                    clicksend();
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

                                    clearInterval(myInterval);
                                    clearInterval(myrefresh);
                                    console.log("Sudah Comment")
                                    clicksend();
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

                                    clearInterval(myInterval);
                                    clearInterval(myrefresh);
                                    console.log("Sudah Comment")
                                    clicksend();
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

                                    clearInterval(myInterval);
                                    clearInterval(myrefresh);
                                    console.log("Sudah Comment")
                                    clicksend();
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

                                    clearInterval(myInterval);
                                    clearInterval(myrefresh);
                                    console.log("Sudah Comment")
                                    clicksend();
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

                                    clearInterval(myInterval);
                                    clearInterval(myrefresh);
                                    console.log("Sudah Comment")
                                    clicksend();
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

                                    clearInterval(myInterval);
                                    clearInterval(myrefresh);
                                    console.log("Sudah Comment")
                                    clicksend();
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

                                    clearInterval(myInterval);
                                    clearInterval(myrefresh);
                                    console.log("Sudah Comment")
                                    clicksend();
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

                                    clearInterval(myInterval);
                                    clearInterval(myrefresh);
                                    console.log("Sudah Comment")
                                    clicksend();
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

                                    clearInterval(myInterval);
                                    clearInterval(myrefresh);
                                    console.log("Sudah Comment")
                                    clicksend();
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

                                    clearInterval(myInterval);
                                    clearInterval(myrefresh);
                                    console.log("Sudah Comment")
                                    clicksend();
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

                                    clearInterval(myInterval);
                                    clearInterval(myrefresh);
                                    console.log("Sudah Comment")
                                    clicksend();
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

                                    clearInterval(myInterval);
                                    clearInterval(myrefresh);
                                    console.log("Sudah Comment")
                                    clicksend();
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

                                    clearInterval(myInterval);
                                    clearInterval(myrefresh);
                                    console.log("Sudah Comment")
                                    clicksend();
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

                                    clearInterval(myInterval);
                                    clearInterval(myrefresh);
                                    console.log("Sudah Comment")
                                    clicksend();
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

                                    clearInterval(myInterval);
                                    clearInterval(myrefresh);
                                    console.log("Sudah Comment")
                                    clicksend();
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

                                    clearInterval(myInterval);
                                    clearInterval(myrefresh);
                                    console.log("Sudah Comment")
                                    clicksend();
                                    return;
                                } else {
                                    location.href = "about:blank"

                                }
                            }



                            return;
                        }
                    }
                }
            }
        }
    }



}, 10)





function clicksend() {
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
    setTimeout(function(){location.href = "about:blank"},5)


}
