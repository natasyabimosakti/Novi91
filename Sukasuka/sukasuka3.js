// ==UserScript==
// @name         NEW BENT3
// @namespace    http://tampermonkey.net/
// @version      3.22
// @description  try to take over the world!
// @updateURL    https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Sukasuka/sukasuka3.js
// @downloadURL  https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Sukasuka/sukasuka3.js
// @author       You
// @match        http*://*/*
// @run-at       document-end
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant       GM.setValue
// @grant       GM.getValue
// @grant       window.close
// ==/UserScript==


var refresh = 60;



var namagroup1 = 'MIMPI';
var Comment1 = 'IYATOTO CINOIRENG12 39*53*73'; 

var namagroup2 = 'ANGKER';
var Comment2 = 'ANGKER4D=CUILANSENG12=48*61*83'; 

var namagroup3 = 'JNE';
var Comment3 = '#JNETOTO(CACINGAN54)*07*32*18'; 

var namagroup4 = 'GAIB';
var Comment4 = 'GAIB4D=CACINGAN54=93*75*12'; 

var namagroup5 = 'TOYIBSLOT';
var Comment5 = '#TOYIBSLOT ( CINTAKU43 ) : 99*82*69'; 

var namagroup6 = 'TIKTAK';
var Comment6 = '#Tiktaktogel / CUKAPASAR56 / 99 , 82 , 69'; 

var namagroup7 = 'ASEP';
var Comment7 = '#ASEPTOGEL CUCUBUAYA65 89*58*71'; 

var namagroup8 = 'MASTER KUY';
var Comment8 = 'TOGELKUY CNDAKARTA76 20*74*28'; 

var namagroup9 = 'SHIOKELINCI';
var Comment9 = '#shiokelinci4d*CACING65*89*58'; 

var namagroup10 = 'GILA';
var Comment10 = 'GILA4D=CUALINSENG41=93*75*12'; 

var namagroup11 = 'KEITOGEL';
var Comment11 = '#keitogel = (CUCUKU76) = 39*53*73'; 

var namagroup12 = 'KIOST0T0';
var Comment12 = 'KIOSTOTO=CUCUBUAYA65=97*95*45'; 

var namagroup13 = 'T_O_T_O_A_K_U_R_A_T';
var Comment13 = '#TA*CIANGSUI54*07*32*18*'; 

var namagroup14 = 'DENTOTO';
var Comment14 = '#DENTOTO 97*95*45 ( CUCUKU76 )'; 

var namagroup15 = '12312312';
var Comment15 = ''; 

var namagroup16 = '12312312';
var Comment16 = '';




var admin = ["Siâo Ciâ","baru","baru","sonia","serena","alde","puput","mad","hefi","dika","iyatoto","adm","celsia","jne","kotna","yoky","audi","lianda","salsabila","yohana","wok","bastian","hoihai","tink","sinta","kembar","laura","ayesha","tiktak","nella","novi","sandiego","nasution","ratu","priyan","san","ria","sanjaya","siska","Baru","aditia","keitogel","safar","mahendra","multi","mariana","neman","tatang","dewi","primus","roy","dewi","melati","kumbara","dentoto","ananda","cinta","lina","icha","bobby","sanchez","oscar","rendy"];
var keyword1 = "ROOM"
var keyword2 = "𝗥𝗢𝗢𝗠"
var keyword3 = "LOMBA"
var keyword4 = "𝗟𝗢𝗠𝗕𝗔"
var keyword5 = "𝐋𝐎𝐌𝐁𝐀"
var keyword6 = "LIMBA"
var keyword7 = "ROM"
var keyword8 = "R00M"
var keyword9 = "R0M"
var keyword10 = "🎱"

var Backlist1 = "pemenang lomba";
var Backlist2 = "rekap";
var Backlist3 = "hasil";
var Backlist4 = "room lomba freebet";
var Backlist5 = "done";
var Backlist6 = "result";
var Backlist7 = "result";


var myInterval = setInterval(function(){
    var urutkan = document.querySelectorAll("[data-mcomponent='ServerTextArea']");
    var urutkan2 = document.querySelectorAll("[data-mcomponent='TextArea']");
    var waktupost = document.getElementsByClassName("native-text");
    window.scrollTo(0, 2000);
    if (document.readyState === "complete") {
        for (var coke = 0; coke < urutkan2.length; coke++) {
            if (urutkan2[coke].textContent.includes("URUTKAN")) {

                urutkan2[coke].click()


            }
        }

    }
    if (document.readyState === "complete") {
        for (var cok = 0; cok < urutkan.length; cok++) {
            if(urutkan[cok].textContent.includes("URUTKAN")) {
                urutkan[cok].click()

            }
        }

    }


    if (document.readyState === "complete") {
        for (var coki = 0; coki < waktupost.length; coki++) {
            if(waktupost[coki].textContent.includes("Aktivitas")) {
                waktupost[coki].click()

            }
        }

    }

    var ceknamagroup
    var ceknamagroup1
    var ceknamagroup2
    var ceknamagroup3
    var ceknamagroup4
    'use strict';
    if( document.getElementsByClassName('native-text')[4]){
        ceknamagroup = document.getElementsByClassName('native-text')[4].textContent;
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
                                /*cek nama group dan tulis commntar*/
                                document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment1;
                                clicksend();
                                clearInterval(myInterval);
                                console.log("Sudah Comment")
                                return;
                            }

                            if (ceknamagroup.includes(namagroup2) == true||ceknamagroup1.includes(namagroup2) == true||ceknamagroup2.includes(namagroup2) == true||ceknamagroup3.includes(namagroup2) == true||ceknamagroup4.includes(namagroup2) == true) {
                                /*cek nama group dan tulis commntar*/
                                document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment2;
                                clicksend();
                                clearInterval(myInterval);
                                console.log("Sudah Comment")
                                return;
                            }

                            if (ceknamagroup.includes(namagroup3) == true||ceknamagroup1.includes(namagroup3) == true||ceknamagroup2.includes(namagroup3) == true||ceknamagroup3.includes(namagroup3) == true||ceknamagroup4.includes(namagroup3) == true) {
                                /*cek nama group dan tulis commntar*/
                                document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment3;
                                clicksend();
                                clearInterval(myInterval);
                                console.log("Sudah Comment")
                                return;
                            }

                            if (ceknamagroup.includes(namagroup4) == true||ceknamagroup1.includes(namagroup4) == true||ceknamagroup2.includes(namagroup4) == true||ceknamagroup3.includes(namagroup4) == true||ceknamagroup4.includes(namagroup4) == true) {
                                /*cek nama group dan tulis commntar*/
                                document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment4;
                                clicksend();
                                clearInterval(myInterval);
                                console.log("Sudah Comment")
                                return;
                            }

                            if (ceknamagroup.includes(namagroup5) == true||ceknamagroup1.includes(namagroup5) == true||ceknamagroup2.includes(namagroup5) == true||ceknamagroup3.includes(namagroup5) == true||ceknamagroup4.includes(namagroup5) == true) {
                                /*cek nama group dan tulis commntar*/
                                document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment5;
                                clicksend();
                                clearInterval(myInterval);
                                console.log("Sudah Comment")
                                return;
                            }

                            if (ceknamagroup.includes(namagroup6) == true||ceknamagroup1.includes(namagroup6) == true||ceknamagroup2.includes(namagroup6) == true||ceknamagroup3.includes(namagroup6) == true||ceknamagroup4.includes(namagroup6) == true) {
                                /*cek nama group dan tulis commntar*/
                                document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment6;
                                clicksend();
                                clearInterval(myInterval);
                                console.log("Sudah Comment")
                                return;
                            }

                            if (ceknamagroup.includes(namagroup7) == true||ceknamagroup1.includes(namagroup7) == true||ceknamagroup2.includes(namagroup7) == true||ceknamagroup3.includes(namagroup7) == true||ceknamagroup4.includes(namagroup7) == true) {
                                /*cek nama group dan tulis commntar*/
                                document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment7;
                                clicksend();
                                clearInterval(myInterval);
                                console.log("Sudah Comment");
                                return;
                            }

                            if (ceknamagroup.includes(namagroup8) == true||ceknamagroup1.includes(namagroup8) == true||ceknamagroup2.includes(namagroup8) == true||ceknamagroup3.includes(namagroup8) == true||ceknamagroup4.includes(namagroup8) == true) {
                                /*cek nama group dan tulis commntar*/
                                document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment8;
                                clicksend();
                                clearInterval(myInterval);
                                console.log("Sudah Comment");
                                return;
                            }

                            if (ceknamagroup.includes(namagroup9) == true||ceknamagroup1.includes(namagroup9) == true||ceknamagroup2.includes(namagroup9) == true||ceknamagroup3.includes(namagroup9) == true||ceknamagroup4.includes(namagroup9) == true) {
                                /*cek nama group dan tulis commntar*/
                                document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment9;
                                clicksend();
                                clearInterval(myInterval);
                                console.log("Sudah Comment")
                                return;
                            }

                            if (ceknamagroup.includes(namagroup10) == true||ceknamagroup1.includes(namagroup10) == true||ceknamagroup2.includes(namagroup10) == true||ceknamagroup3.includes(namagroup10) == true||ceknamagroup4.includes(namagroup10) == true) {
                                /*cek nama group dan tulis commntar*/
                                document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment10;
                                clicksend();
                                clearInterval(myInterval);
                                console.log("Sudah Comment")
                                return;
                            }

                            if (ceknamagroup.includes(namagroup11) == true||ceknamagroup1.includes(namagroup11) == true||ceknamagroup2.includes(namagroup11) == true||ceknamagroup3.includes(namagroup11) == true||ceknamagroup4.includes(namagroup11) == true) {
                                /*cek nama group dan tulis commntar*/
                                document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment11;
                                clicksend();
                                clearInterval(myInterval);
                                console.log("Sudah Comment")
                                return;
                            }


                            if (ceknamagroup.includes(namagroup12) == true||ceknamagroup1.includes(namagroup12) == true||ceknamagroup2.includes(namagroup12) == true||ceknamagroup3.includes(namagroup12) == true||ceknamagroup4.includes(namagroup12) == true) {
                                /*cek nama group dan tulis commntar*/
                                document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment12;
                                clicksend();
                                clearInterval(myInterval);
                                console.log("Sudah Comment")
                                return;
                            }

                            if (ceknamagroup.includes(namagroup13) == true||ceknamagroup1.includes(namagroup13) == true||ceknamagroup2.includes(namagroup13) == true||ceknamagroup3.includes(namagroup13) == true||ceknamagroup4.includes(namagroup13) == true) {
                                /*cek nama group dan tulis commntar*/
                                document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment13;
                                clicksend();
                                clearInterval(myInterval);
                                console.log("Sudah Comment")
                                return;
                            }

                            if (ceknamagroup.includes(namagroup14) == true||ceknamagroup1.includes(namagroup14) == true||ceknamagroup2.includes(namagroup14) == true||ceknamagroup3.includes(namagroup14) == true||ceknamagroup4.includes(namagroup14) == true) {
                                /*cek nama group dan tulis commntar*/
                                document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment14;
                                clicksend();
                                clearInterval(myInterval);
                                console.log("Sudah Comment")
                                return;
                            }

                            if (ceknamagroup.includes(namagroup15) == true||ceknamagroup1.includes(namagroup15) == true||ceknamagroup2.includes(namagroup15) == true||ceknamagroup3.includes(namagroup15) == true||ceknamagroup4.includes(namagroup15) == true) {
                                /*cek nama group dan tulis commntar*/
                                document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment15;
                                clicksend();
                                clearInterval(myInterval);
                                console.log("Sudah Comment")
                                return;
                            }

                            if (ceknamagroup.includes(namagroup16) == true||ceknamagroup1.includes(namagroup16) == true||ceknamagroup2.includes(namagroup16) == true||ceknamagroup3.includes(namagroup16) == true||ceknamagroup4.includes(namagroup16) == true) {
                                /*cek nama group dan tulis commntar*/
                                document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment16;
                                clicksend();
                                clearInterval(myInterval);
                                console.log("Sudah Comment")
                                return;
                            }



                            return;
                        }
                    }
                }
            }
        }
    }



}, refresh * 10)







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
        location.href = "about:blank"
        /*Tekan TOMBOL SEND*/
    }
}
