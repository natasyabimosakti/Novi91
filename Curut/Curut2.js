// ==UserScript==
// @name         NEW CURUT2
// @namespace    http://tampermonkey.net/
// @version      3.30
// @description  try to take over the world!
// @updateURL    https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Curut/Curut2.js
// @downloadURL  https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Curut/Curut2.js
// @author       You
// @match        http*://*/*
// @run-at       document-end
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        window.close
// ==/UserScript==


var refresh = 60;



var namagroup1 = 'SHIOKELINCI';
var Comment1 = '#shiokelinci4d*MOCHOK52*18*53'; 

var namagroup2 = 'MIMPI';
var Comment2 = 'IYATOTO MOCHI92 26*40*92'; 

var namagroup3 = 'TIKTAK';
var Comment3 = '#Tiktaktogel / MODAR17 / 11 , 39 , 85'; 

var namagroup4 = 'GAIB';
var Comment4 = 'GAIB4D=MOCHOK36=71*13*96'; 

var namagroup5 = 'KEITOGEL';
var Comment5 = '#keitogel = (MONTIR36) = 81*93*34'; 

var namagroup6 = 'KIOST0T0';
var Comment6 = 'KIOSTOTO=MROTO15=55*86*06'; 

var namagroup7 = 'ASEP';
var Comment7 = '#ASEPTOGEL MOMER14 18*53*20'; 

var namagroup8 = 'ANGKER';
var Comment8 = 'ANGKER4D=MOMER14=71*13*96'; 

var namagroup9 = 'GILA';
var Comment9 = 'GILA4D=MOLET25=71*13*96'; 

var namagroup10 = 'JNE';
var Comment10 = '#JNETOTO(MOSIOM19)*81*93*34'; 

var namagroup11 = 'T_O_T_O_A_K_U_R_A_T';
var Comment11 = '#TA*MORATUL19*11*39*85*'; 

var namagroup12 = 'MASTER KUY';
var Comment12 = 'TOGELKUY MORAK16 26*40*92'; 

var namagroup13 = 'TOYIBSLOT';
var Comment13 = '#TOYIBSLOT ( MOKONG71 ) : 03*68*05'; 

var namagroup14 = 'DENTOTO';
var Comment14 = '#DENTOTO 03*68*05 ( MONTOK69 )'; 

var namagroup15 = 'HATRICK';
var Comment15 = 'VESPATOGEL (MOCHO19)  72*17*84'; 

var namagroup16 = 'Jawatengah';
var Comment16 = 'siap';



var myrefresh = setInterval(function(){

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
}, refresh * 10)

var myInterval = setInterval(function(){
    

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
                                clearInterval(myrefresh);
                                console.log("Sudah Comment")
                                return;
                            }

                            if (ceknamagroup.includes(namagroup2) == true||ceknamagroup1.includes(namagroup2) == true||ceknamagroup2.includes(namagroup2) == true||ceknamagroup3.includes(namagroup2) == true||ceknamagroup4.includes(namagroup2) == true) {
                                /*cek nama group dan tulis commntar*/
                                document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment2;
                                clicksend();
                                clearInterval(myInterval);
                                clearInterval(myrefresh);
                                console.log("Sudah Comment")
                                return;
                            }

                            if (ceknamagroup.includes(namagroup3) == true||ceknamagroup1.includes(namagroup3) == true||ceknamagroup2.includes(namagroup3) == true||ceknamagroup3.includes(namagroup3) == true||ceknamagroup4.includes(namagroup3) == true) {
                                /*cek nama group dan tulis commntar*/
                                document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment3;
                                clicksend();
                                clearInterval(myInterval);
                                clearInterval(myrefresh);
                                console.log("Sudah Comment")
                                return;
                            }

                            if (ceknamagroup.includes(namagroup4) == true||ceknamagroup1.includes(namagroup4) == true||ceknamagroup2.includes(namagroup4) == true||ceknamagroup3.includes(namagroup4) == true||ceknamagroup4.includes(namagroup4) == true) {
                                /*cek nama group dan tulis commntar*/
                                document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment4;
                                clicksend();
                                clearInterval(myInterval);
                                clearInterval(myrefresh);
                                console.log("Sudah Comment")
                                return;
                            }

                            if (ceknamagroup.includes(namagroup5) == true||ceknamagroup1.includes(namagroup5) == true||ceknamagroup2.includes(namagroup5) == true||ceknamagroup3.includes(namagroup5) == true||ceknamagroup4.includes(namagroup5) == true) {
                                /*cek nama group dan tulis commntar*/
                                document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment5;
                                clicksend();
                                clearInterval(myInterval);
                                clearInterval(myrefresh);
                                console.log("Sudah Comment")
                                return;
                            }

                            if (ceknamagroup.includes(namagroup6) == true||ceknamagroup1.includes(namagroup6) == true||ceknamagroup2.includes(namagroup6) == true||ceknamagroup3.includes(namagroup6) == true||ceknamagroup4.includes(namagroup6) == true) {
                                /*cek nama group dan tulis commntar*/
                                document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment6;
                                clicksend();
                                clearInterval(myInterval);
                                clearInterval(myrefresh);
                                console.log("Sudah Comment")
                                return;
                            }

                            if (ceknamagroup.includes(namagroup7) == true||ceknamagroup1.includes(namagroup7) == true||ceknamagroup2.includes(namagroup7) == true||ceknamagroup3.includes(namagroup7) == true||ceknamagroup4.includes(namagroup7) == true) {
                                /*cek nama group dan tulis commntar*/
                                document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment7;
                                clicksend();
                                clearInterval(myInterval);
                                clearInterval(myrefresh);
                                console.log("Sudah Comment")
                                return;
                            }

                            if (ceknamagroup.includes(namagroup8) == true||ceknamagroup1.includes(namagroup8) == true||ceknamagroup2.includes(namagroup8) == true||ceknamagroup3.includes(namagroup8) == true||ceknamagroup4.includes(namagroup8) == true) {
                                /*cek nama group dan tulis commntar*/
                                document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment8;
                                clicksend();
                                clearInterval(myInterval);
                                clearInterval(myrefresh);
                                console.log("Sudah Comment")
                                return;
                            }

                            if (ceknamagroup.includes(namagroup9) == true||ceknamagroup1.includes(namagroup9) == true||ceknamagroup2.includes(namagroup9) == true||ceknamagroup3.includes(namagroup9) == true||ceknamagroup4.includes(namagroup9) == true) {
                                /*cek nama group dan tulis commntar*/
                                document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment9;
                                clicksend();
                                clearInterval(myInterval);
                                clearInterval(myrefresh);
                                console.log("Sudah Comment")
                                return;
                            }

                            if (ceknamagroup.includes(namagroup10) == true||ceknamagroup1.includes(namagroup10) == true||ceknamagroup2.includes(namagroup10) == true||ceknamagroup3.includes(namagroup10) == true||ceknamagroup4.includes(namagroup10) == true) {
                                /*cek nama group dan tulis commntar*/
                                document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment10;
                                clicksend();
                                clearInterval(myInterval);
                                clearInterval(myrefresh);
                                console.log("Sudah Comment")
                                return;
                            }

                            if (ceknamagroup.includes(namagroup11) == true||ceknamagroup1.includes(namagroup11) == true||ceknamagroup2.includes(namagroup11) == true||ceknamagroup3.includes(namagroup11) == true||ceknamagroup4.includes(namagroup11) == true) {
                                /*cek nama group dan tulis commntar*/
                                document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment11;
                                clicksend();
                                clearInterval(myInterval);
                                clearInterval(myrefresh);
                                console.log("Sudah Comment")
                                return;
                            }


                            if (ceknamagroup.includes(namagroup12) == true||ceknamagroup1.includes(namagroup12) == true||ceknamagroup2.includes(namagroup12) == true||ceknamagroup3.includes(namagroup12) == true||ceknamagroup4.includes(namagroup12) == true) {
                                /*cek nama group dan tulis commntar*/
                                document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment12;
                                clicksend();
                                clearInterval(myInterval);
                                clearInterval(myrefresh);
                                console.log("Sudah Comment")
                                return;
                            }

                            if (ceknamagroup.includes(namagroup13) == true||ceknamagroup1.includes(namagroup13) == true||ceknamagroup2.includes(namagroup13) == true||ceknamagroup3.includes(namagroup13) == true||ceknamagroup4.includes(namagroup13) == true) {
                                /*cek nama group dan tulis commntar*/
                                document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment13;
                                clicksend();
                                clearInterval(myInterval);
                                clearInterval(myrefresh);
                                console.log("Sudah Comment")
                                return;
                            }

                            if (ceknamagroup.includes(namagroup14) == true||ceknamagroup1.includes(namagroup14) == true||ceknamagroup2.includes(namagroup14) == true||ceknamagroup3.includes(namagroup14) == true||ceknamagroup4.includes(namagroup14) == true) {
                                /*cek nama group dan tulis commntar*/
                                document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment14;
                                clicksend();
                                clearInterval(myInterval);
                                clearInterval(myrefresh);
                                console.log("Sudah Comment")
                                return;
                            }

                            if (ceknamagroup.includes(namagroup15) == true||ceknamagroup1.includes(namagroup15) == true||ceknamagroup2.includes(namagroup15) == true||ceknamagroup3.includes(namagroup15) == true||ceknamagroup4.includes(namagroup15) == true) {
                                /*cek nama group dan tulis commntar*/
                                document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment15;
                                clicksend();
                                clearInterval(myInterval);
                                clearInterval(myrefresh);
                                console.log("Sudah Comment")
                                return;
                            }

                            if (ceknamagroup.includes(namagroup16) == true||ceknamagroup1.includes(namagroup16) == true||ceknamagroup2.includes(namagroup16) == true||ceknamagroup3.includes(namagroup16) == true||ceknamagroup4.includes(namagroup16) == true) {
                                /*cek nama group dan tulis commntar*/
                                document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment16;
                                clicksend();
                                clearInterval(myInterval);
                                clearInterval(myrefresh);
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
    setTimeout(function(){location.href = "about:blank"},50)


}
