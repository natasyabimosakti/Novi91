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
var admin = ["Siâo Ciâ","febrian","jihan","jesika","rano","sabrina","artha","naura","katty","intan","neng","kendri","adelia","larissa","mesa","yasmine","oun","aurel","fiana","tiara","sabrina","hana","tania","leksa","brian","nadila","elly","farid","zurro","gretha","wndt","lehman","wiena","manu","lidya","otong","jhone","herfizah","vonny","jess","ayesha","jovanka","dollar","dewa","andy","erwin","wahid","ujen","sejitu","wahzo","kiky","calvin","megaways","fahresa","viona","mardia","sintia","robby","nathaya","boboho","celine","maes","tag","bella","dea","alde","puput","mad","hefi","dika","miranda","adm","celsia","leon","kotna","yoky","audi","lianda","salsabila","yohana","wok","bastian","hoihai","tink","sinta","kembar","laura","ayesha","sloter","nella","novi","sandiego","intan","ratu","priyan","san","ria","sanjaya","siska","jenifer","aditia","andri","safar","mahendra","multi","mariana","neman","minion","dewi","primus","roy","dewi","melati","kumbara","dinda","ananda","cinta","lina","icha","bobby","sanchez","oscar","rendy"];
var jam = ["Baru","1 menit","2 menit","3 menit","4 menit","5 menit","6 menit","7 menit","8 menit"];
var jam2= ["Admin   Baru","Admin   1 menit","Admin   2 menit","Admin   3 menit","Admin   4 menit","Admin   5 menit","Admin   6 menit","Admin   7 menit","Admin   8 menit"];
var jam3= ["Moderator   Baru","Moderator   1 menit","Moderator   2 menit","Moderator   3 menit","Moderator   4 menit","Moderator   5 menit","Moderator   6 menit","Moderator   7 menit","Moderator   8 menit"];
var keyword = ["𝗥𝗢𝗢𝗠","ROOM_L0MBA","ROOM","R00M","R0M","R0OM","RO0M","𝗥𝗢𝗢𝗠","🎱","LOMBA","𝐋𝐎𝐌𝐁𝐀","LIMBA","ROM","⏩","⬛","🏆"];


var Backlist1 = "pemenang lomba";
var Backlist2 = "rekap";
var Backlist3 = "hasil";
var Backlist4 = "room lomba freebet";
var Backlist5 = "done";
var Backlist6 = "result";



var myInterval = setInterval(function(){
    GM.setValue( 1000,1);
    if (tm == "" || tm == undefined || tm == null) {
        GM.setValue("time", hour);
    }


    if ( hour > tm + 2 || hour < tm||document.URL.includes("google") == true||hour == undefined||hour == null){
        for (var kr = 1; kr < 18; kr++) {
            GM.setValue( kr,0);
        }
        GM.setValue("time", hour);

    }
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

    var cekcomment
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


    for (let ntv = 9; ntv < document.getElementsByClassName("native-text").length; ntv++) {
        var cekjam = document.getElementsByClassName('native-text')
        var cekadmin = document.getElementsByClassName('native-text')
        for (var u in jam){
            if(cekjam[ntv].textContent.slice(0,7).includes(jam[u])||cekjam[ntv].textContent.includes(jam2[u])||cekjam[ntv].textContent.includes(jam3[u]) ){
                console.log("Menit Postingan =" + cekjam[ntv].textContent);
                for (var adm in admin){
                    if(cekadmin[ntv-1].textContent.toLowerCase().includes(admin[adm].toLowerCase())||cekadmin[ntv].textContent.toLowerCase().includes("admin")||cekadmin[ntv].textContent.toLowerCase().includes("moderator")){
                        console.log("Admin Di Temukan" + admin[adm]);
                        for (let ntva = ntv + 1; ntva < ntv + 3; ntva++) {
                            if(document.getElementsByClassName('native-text')[ntva].textContent.length >= 5){
                                console.log("postingan =" + document.getElementsByClassName('native-text')[ntva].textContent);
                                cekcomment = document.getElementsByClassName('native-text')
                                if(cekcomment[ntva].textContent.toLowerCase().includes(Backlist1)||cekcomment[ntva].textContent.toLowerCase().includes(Backlist2)||cekcomment[ntva].textContent.toLowerCase().includes(Backlist3)||cekcomment[ntva].textContent.toLowerCase().includes(Backlist4)||cekcomment[ntva].textContent.toLowerCase().includes(Backlist5)||cekcomment[ntva].textContent.toLowerCase().includes(Backlist6)){
                                    break;
                                }
                                for (var j in keyword){

                                    if (document.getElementsByClassName('native-text')[ntva].textContent.includes(keyword[j])){
                                        console.log("Keyword Ditemukan " + keyword[j]);


                                        for (let ntvb = ntva-2 ; ntvb < ntva + 9; ntvb++) {
                                            if(document.getElementsByClassName("native-text")[ntvb].textContent.includes("Tulis")) {
                                                console.log("Mulai Tulis Komentar");
                                                document.getElementsByClassName("native-text")[ntvb].click()

                                                if (ceknamagroup.includes(namagroup1) == true||ceknamagroup1.includes(namagroup1) == true||ceknamagroup2.includes(namagroup1) == true||ceknamagroup3.includes(namagroup1) == true||ceknamagroup4.includes(namagroup1) == true) {
                                                    /*cek nama group dan tulis commntar*/
                                                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment1;
                                                    if (id1 == "" || id1 == undefined || id1 == null ||id1 == "0") {
                                                        GM.setValue( 1,1);
                                                        clicksend();
                                                        clearInterval(myInterval);

                                                        console.log("Sudah Comment")
                                                        location.href = "about:blank"
                                                        return;
                                                    }

                                                }


                                                /*End*/
                                                /*Komentar*/


                                                if (ceknamagroup.includes(namagroup2) == true||ceknamagroup1.includes(namagroup2) == true||ceknamagroup2.includes(namagroup2) == true||ceknamagroup3.includes(namagroup2) == true||ceknamagroup4.includes(namagroup2) == true) {
                                                    /*cek nama group dan tulis commntar*/
                                                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment2;
                                                    if (id2 == "" || id2 == undefined || id2 == null ||id2 == "0") {
                                                        GM.setValue( 2,1);
                                                        clicksend();
                                                        clearInterval(myInterval);
                                                        console.log("Sudah Comment")
                                                        location.href = "about:blank"
                                                        return;
                                                    }

                                                }


                                                /*End*/
                                                /*Komentar*/


                                                if (ceknamagroup.includes(namagroup3) == true||ceknamagroup1.includes(namagroup3) == true||ceknamagroup2.includes(namagroup3) == true||ceknamagroup3.includes(namagroup3) == true||ceknamagroup4.includes(namagroup3) == true) {
                                                    /*cek nama group dan tulis commntar*/
                                                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment3;
                                                    if (id3 == "" || id3 == undefined || id3 == null ||id3 == "0") {
                                                        GM.setValue( 3,1);
                                                        clicksend();
                                                        clearInterval(myInterval);
                                                        console.log("Sudah Comment")
                                                        location.href = "about:blank"
                                                        return;
                                                    }

                                                }


                                                /*End*/
                                                /*Komentar*/


                                                if (ceknamagroup.includes(namagroup4) == true||ceknamagroup1.includes(namagroup4) == true||ceknamagroup2.includes(namagroup4) == true||ceknamagroup3.includes(namagroup4) == true||ceknamagroup4.includes(namagroup4) == true) {
                                                    /*cek nama group dan tulis commntar*/
                                                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment4;

                                                    if (id4 == "" || id4 == undefined || id4 == null ||id4 == "0") {
                                                        GM.setValue(4,1);
                                                        clicksend();
                                                        clearInterval(myInterval);
                                                        console.log("Sudah Comment")
                                                        location.href = "about:blank"
                                                        return;
                                                    }


                                                }


                                                /*End*/
                                                /*Komentar*/


                                                if (ceknamagroup.includes(namagroup5) == true||ceknamagroup1.includes(namagroup5) == true||ceknamagroup2.includes(namagroup5) == true||ceknamagroup3.includes(namagroup5) == true||ceknamagroup4.includes(namagroup5) == true) {
                                                    /*cek nama group dan tulis commntar*/
                                                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment5;

                                                    if (id5 == "" || id5 == undefined || id5 == null ||id5 == "0") {
                                                        GM.setValue(5,1);
                                                        clicksend();
                                                        clearInterval(myInterval);
                                                        console.log("Sudah Comment")
                                                        location.href = "about:blank"
                                                        return;
                                                    }


                                                }


                                                /*End*/
                                                /*Komentar*/


                                                if (ceknamagroup.includes(namagroup6) == true||ceknamagroup1.includes(namagroup6) == true||ceknamagroup2.includes(namagroup6) == true||ceknamagroup3.includes(namagroup6) == true||ceknamagroup4.includes(namagroup6) == true) {
                                                    /*cek nama group dan tulis commntar*/
                                                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment6;

                                                    if (id6 == "" || id6 == undefined || id6 == null ||id6 == "0") {
                                                        GM.setValue( 6,1);
                                                        clicksend();
                                                        clearInterval(myInterval);
                                                        console.log("Sudah Comment")
                                                        location.href = "about:blank"
                                                        return;
                                                    }


                                                }


                                                /*End*/
                                                /*Komentar*/


                                                if (ceknamagroup.includes(namagroup7) == true||ceknamagroup1.includes(namagroup7) == true||ceknamagroup2.includes(namagroup7) == true||ceknamagroup3.includes(namagroup7) == true||ceknamagroup4.includes(namagroup7) == true) {
                                                    /*cek nama group dan tulis commntar*/
                                                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment7;

                                                    if (id7 == "" || id7 == undefined || id7 == null ||id7 == "0") {
                                                        GM.setValue( 7,1);
                                                        clicksend();
                                                        clearInterval(myInterval);
                                                        console.log("Sudah Comment")
                                                        location.href = "about:blank"
                                                        return;
                                                    }

                                                }


                                                /*End*/
                                                /*Komentar*/


                                                if (ceknamagroup.includes(namagroup8) == true||ceknamagroup1.includes(namagroup8) == true||ceknamagroup2.includes(namagroup8) == true||ceknamagroup3.includes(namagroup8) == true||ceknamagroup4.includes(namagroup8) == true) {
                                                    /*cek nama group dan tulis commntar*/
                                                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment8;

                                                    if (id8 == "" || id8 == undefined || id8 == null ||id8 == "0") {
                                                        GM.setValue( 8,1);
                                                        clicksend();
                                                        clearInterval(myInterval);
                                                        console.log("Sudah Comment")
                                                        location.href = "about:blank"
                                                        return;
                                                    }


                                                }


                                                /*End*/
                                                /*Komentar*/


                                                if (ceknamagroup.includes(namagroup9) == true||ceknamagroup1.includes(namagroup9) == true||ceknamagroup2.includes(namagroup9) == true||ceknamagroup3.includes(namagroup9) == true||ceknamagroup4.includes(namagroup9) == true) {
                                                    /*cek nama group dan tulis commntar*/
                                                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment9;

                                                    if (id9 == "" || id9 == undefined || id9 == null ||id9 == "0") {
                                                        GM.setValue( 9,1);
                                                        clicksend();
                                                        clearInterval(myInterval);
                                                        console.log("Sudah Comment")
                                                        location.href = "about:blank"
                                                        return;
                                                    }

                                                }


                                                /*End*/
                                                /*Komentar*/


                                                if (ceknamagroup.includes(namagroup10) == true||ceknamagroup1.includes(namagroup10) == true||ceknamagroup2.includes(namagroup10) == true||ceknamagroup3.includes(namagroup10) == true||ceknamagroup4.includes(namagroup10) == true) {
                                                    /*cek nama group dan tulis commntar*/
                                                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment10;

                                                    if (id10 == "" || id10 == undefined || id10 == null ||id10 == "0") {
                                                        GM.setValue( 10,1);
                                                        clicksend();
                                                        clearInterval(myInterval);
                                                        console.log("Sudah Comment")
                                                        location.href = "about:blank"
                                                        return;
                                                    }


                                                }


                                                /*End*/
                                                /*Komentar*/


                                                if (ceknamagroup.includes(namagroup11) == true||ceknamagroup1.includes(namagroup11) == true||ceknamagroup2.includes(namagroup11) == true||ceknamagroup3.includes(namagroup11) == true||ceknamagroup4.includes(namagroup11) == true) {
                                                    /*cek nama group dan tulis commntar*/
                                                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment11;

                                                    if (id11 == "" || id11 == undefined || id11 == null ||id11 == "0") {
                                                        GM.setValue( 11,1);
                                                        clicksend();
                                                        clearInterval(myInterval);
                                                        console.log("Sudah Comment")
                                                        location.href = "about:blank"
                                                        return;
                                                    }


                                                }


                                                /*End*/
                                                /*Komentar*/


                                                if (ceknamagroup.includes(namagroup12) == true||ceknamagroup1.includes(namagroup12) == true||ceknamagroup2.includes(namagroup12) == true||ceknamagroup3.includes(namagroup12) == true||ceknamagroup4.includes(namagroup12) == true) {
                                                    /*cek nama group dan tulis commntar*/
                                                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment12;

                                                    if (id12 == "" || id12 == undefined || id12 == null ||id12 == "0") {
                                                        GM.setValue( 12,1);
                                                        clicksend();
                                                        clearInterval(myInterval);
                                                        console.log("Sudah Comment")
                                                        location.href = "about:blank"
                                                        return;
                                                    }

                                                }


                                                /*End*/
                                                /*Komentar*/


                                                if (ceknamagroup.includes(namagroup13) == true||ceknamagroup1.includes(namagroup13) == true||ceknamagroup2.includes(namagroup13) == true||ceknamagroup3.includes(namagroup13) == true||ceknamagroup4.includes(namagroup13) == true) {
                                                    /*cek nama group dan tulis commntar*/
                                                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment13;

                                                    if (id13 == "" || id13 == undefined || id13 == null ||id13 == "0") {
                                                        GM.setValue( 13,1);
                                                        clicksend();
                                                        clearInterval(myInterval);
                                                        console.log("Sudah Comment")
                                                        location.href = "about:blank"
                                                        return;
                                                    }


                                                }


                                                /*End*/
                                                /*Komentar*/


                                                if (ceknamagroup.includes(namagroup14) == true||ceknamagroup1.includes(namagroup14) == true||ceknamagroup2.includes(namagroup14) == true||ceknamagroup3.includes(namagroup14) == true||ceknamagroup4.includes(namagroup14) == true) {
                                                    /*cek nama group dan tulis commntar*/
                                                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment14;

                                                    if (id14 == "" || id14 == undefined || id14 == null ||id14 == "0") {
                                                        GM.setValue( 14,1);
                                                        clicksend();
                                                        clearInterval(myInterval);
                                                        console.log("Sudah Comment")
                                                        location.href = "about:blank"
                                                        return;
                                                    }

                                                }


                                                /*End*/
                                                /*Komentar*/


                                                if (ceknamagroup.includes(namagroup15) == true||ceknamagroup1.includes(namagroup15) == true||ceknamagroup2.includes(namagroup15) == true||ceknamagroup3.includes(namagroup15) == true||ceknamagroup4.includes(namagroup15) == true) {
                                                    /*cek nama group dan tulis commntar*/
                                                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment15;

                                                    if (id15 == "" || id15 == undefined || id15 == null ||id15 == "0") {
                                                        GM.setValue( 15,1);
                                                        clicksend();
                                                        clearInterval(myInterval);
                                                        console.log("Sudah Comment")
                                                        location.href = "about:blank"
                                                        return;
                                                    }

                                                }


                                                /*End*/
                                                /*Komentar*/


                                                if (ceknamagroup.includes(namagroup16) == true||ceknamagroup1.includes(namagroup16) == true||ceknamagroup2.includes(namagroup16) == true||ceknamagroup3.includes(namagroup16) == true||ceknamagroup4.includes(namagroup16) == true) {
                                                    /*cek nama group dan tulis commntar*/
                                                    document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment16;

                                                    if (id16 == "" || id16 == undefined || id16 == null ||id16 == "0") {
                                                        GM.setValue( 16,1);
                                                        clicksend();
                                                        clearInterval(myInterval);
                                                        console.log("Sudah Comment")
                                                        location.href = "about:blank"
                                                        return;
                                                    }


                                                }







                                            }
                                        }
                                    }
                                }

                            }
                            continue;
                        }
                    }
                }
            }
        }

    }
    'use strict';


},refresh * 10)









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
        /*Tekan TOMBOL SEND*/
    }
}
