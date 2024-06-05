// ==UserScript==
// @name         Sampoerna4
// @namespace    http://tampermonkey.net/
// @version      3.28
// @description  try to take over the world!
// @updateURL    https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Sampoerna/Sampoerna4.js
// @downloadURL  https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Sampoerna/Sampoerna4.js
// @author       You
// @match        http*://*/*
// @run-at       document-end
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant       GM.setValue
// @grant       GM.getValue
// @grant       window.close
// ==/UserScript==
var refresh = 50;



/*======================================================================Paste Script Tampermonkey di sini===============================================================*/



var namagroup1 = 'RITOGEL';
var Comment1 = '#RITOGEL(ZONEST2)44*36*54'; 

var namagroup2 = 'K86T0T0';
var Comment2 = 'K86TOTO ( ZOROK73 ) : 72*97*00'; 

var namagroup3 = 'PUSAT LOMBA';
var Comment3 = 'Shiotogel4d (ZOWOK26) 17*04*08'; 

var namagroup4 = 'SEJ1TU';
var Comment4 = '#SEJITU ( ZORAN36 ) : 25*95*21'; 

var namagroup5 = 'RNR';
var Comment5 = '‌#RNR303(ZONIAK63) : 42*60*91'; 

var namagroup6 = 'DIVA4D';
var Comment6 = '#DIVA4D (ZOMING82) = 80*69*07'; 

var namagroup7 = 'Hoho';
var Comment7 = 'ZONATIK73 : 49*40*46 #HOHOTOGEL'; 

var namagroup8 = 'TOK99T0T0';
var Comment8 = 'Tok99Toto ( ZONATING ) : 24*50*09'; 

var namagroup9 = 'KIU';
var Comment9 = '#(KIUTOTO) (ZOWOK26) : 49*40*46'; 

var namagroup10 = 'SLOTO';
var Comment10 = '#SLOTOGEL (ZOKET72) : 24*50*09'; 

var namagroup11 = 'KEBAYA';
var Comment11 = '(KEBAYA4D) = (ZOKUTU72) 44*36*54'; 

var namagroup12 = 'BESTOTO';
var Comment12 = 'ZOWEKNI82 : 28*72*97 #BESTOTO88'; 

var namagroup13 = 'GOHT0G3L';
var Comment13 = 'GOHTOGEL=ZOWINDO=17*04*08'; 

var namagroup14 = 'MAYAPADA';
var Comment14 = 'BETT*SingasariTOTO(BO)*ZORLETA*25*95*21'; 

var namagroup15 = 'XX1';
var Comment15 = '#XX1TOTO (ZONIAK26)  42*60*91 BETTING'; 

var namagroup16 = 'LUCK';
var Comment16 = 'CITA4D*ZOWINDO*80*69*07';





var admin = ["Siâo Ciâ","febrian","jihan","jesika","rano","sabrina","artha","naura","katty","intan","neng","kendri","adelia","larissa","mesa","yasmine","oun","aurel","fiana","tiara","sabrina","hana","tania","leksa","brian","nadila","elly","farid","zurro","gretha","wndt","lehman","wiena","manu","lidya","otong","jhone","herfizah","vonny","jess","ayesha","jovanka","dollar","dewa","andy","erwin","wahid","ujen","sejitu","wahzo","kiky","calvin","megaways","fahresa","viona","mardia","sintia","robby","nathaya","boboho","celine","maes","tag","bella","dea","alde","puput","mad","hefi","dika","miranda","adm","celsia","leon","kotna","yoky","audi","lianda","salsabila","yohana","wok","bastian","hoihai","tink","sinta","kembar","laura","ayesha","sloter","nella","novi","sandiego","intan","ratu","priyan","san","ria","sanjaya","siska","jenifer","aditia","andri","safar","mahendra","multi","mariana","neman","minion","dewi","primus","roy","dewi","melati","kumbara","dinda","ananda","cinta","lina","icha","bobby","sanchez","oscar","rendy"];
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

        if (document.querySelectorAll('[data-tracking-duration-id')[0]){
            // Nama FB
            var namafb = document.querySelectorAll('[data-tracking-duration-id]')[0].getElementsByClassName('native-text')[0];
            //Jam
            var jamposting = document.querySelectorAll('[data-tracking-duration-id]')[0].getElementsByClassName('native-text')[1];
            //Postingan
            var postingan =document.querySelectorAll('[data-tracking-duration-id')[0].getElementsByClassName('native-text')[3];
            //Comment Box
            var datacommentbox = document.querySelectorAll('[data-tracking-duration-id')[0].getElementsByClassName('native-text').length -1
            var commentbox = document.querySelectorAll('[data-tracking-duration-id')[0].getElementsByClassName('native-text')[datacommentbox];

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
