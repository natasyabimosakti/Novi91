// ==UserScript==
// @name         POLOS
// @namespace    http://tampermonkey.net/
// @version      3.00
// @description  try to take over the world!
// @updateURL    
// @downloadURL  
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





/*======================================================================3D===============================================================*/






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
var admin = ["febrian","jihan","jesika","rano","sabrina","artha","naura","katty","intan","neng","kendri","adelia","larissa","mesa","yasmine","oun","aurel","fiana","tiara","sabrina","hana","tania","leksa","brian","nadila","elly","farid","zurro","gretha","wndt","lehman","wiena","manu","lidya","otong","jhone","herfizah","vonny","jess","ayesha","jovanka","dollar","dewa","andy","erwin","wahid","ujen","sejitu","wahzo","kiky","calvin","megaways","fahresa","viona","mardia","sintia","robby","nathaya","boboho","celine","maes","tag","bella","dea","alde","puput","mad","hefi","dika","miranda","adm","celsia","leon","kotna","yoky","audi","lianda","salsabila","yohana","wok","bastian","hoihai","tink","sinta","kembar","laura","ayesha","sloter","nella","novi","sandiego","intan","ratu","priyan","san","ria","sanjaya","siska","jenifer","aditia","andri","safar","mahendra","multi","mariana","neman","minion","dewi","primus","roy","dewi","melati","kumbara","dinda","ananda","cinta","lina","icha","bobby","sanchez","oscar","rendy"];


var jam = ["Baru","1 menit","2 menit","3 menit","4 menit","5 menit","6 menit","7 menit","8 menit"];
var jam2= ["Admin   Baru","Admin   1 menit","Admin   2 menit","Admin   3 menit","Admin   4 menit","Admin   5 menit","Admin   6 menit","Admin   7 menit","Admin   8 menit"];
var jam3= ["Moderator   Baru","Moderator   1 menit","Moderator   2 menit","Moderator   3 menit","Moderator   4 menit","Moderator   5 menit","Moderator   6 menit","Moderator   7 menit","Moderator   8 menit"];
var keyword = ["ROOM", "𝗥𝗢𝗢𝗠", "LOMBA","𝗟𝗢𝗠𝗕𝗔","𝐋𝐎𝐌𝐁𝐀","LIMBA","ROM","R00M","R0M","🎱","⏩"];


var Backlist1 = "pemenang lomba";
var Backlist2 = "rekap";
var Backlist3 = "hasil";
var Backlist4 = "room lomba freebet";
var Backlist5 = "done";
var Backlist6 = "result";



var myInterval = setInterval(function(){


if(document.getElementsByClassName("native-text")[2].textContent.includes("Postingan")||document.getElementsByClassName("native-text")[3].textContent.includes("Postingan")||document.getElementsByClassName("native-text")[4].textContent.includes("Postingan")){
location.href = "about:blank"
}
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

                                                    } else {
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

                                                    } else {
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

                                                    } else {
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

                                                    } else {
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

                                                    } else {
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

                                                    } else {
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

                                                    } else {
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

                                                    } else {
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

                                                    } else {
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

                                                    } else {
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

                                                    } else {
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

                                                    } else {
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

                                                    } else {
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

                                                    } else {
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

                                                    } else {
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

                                                    } else {
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

    if(document.getElementsByClassName('textbox')[0]){
        const input = document.getElementsByClassName('textbox')[0];


        function insertAtCursor(myField, myValue) { // Exactly what is sounds like - Inserts text at caret
            //IE support
            if (document.selection) {
                myField.focus();
                var sel = document.selection.createRange();
                sel.text = myValue;
            }
            //MOZILLA and others
            else if (myField.selectionStart || myField.selectionStart == '0') {
                var startPos = myField.selectionStart;
                var endPos = myField.selectionEnd;
                myField.value = myField.value.substring(0, startPos) +
                    myValue +
                    myField.value.substring(endPos, myField.value.length);
            } else {
                myField.value += myValue;
            }
        }

        function simulate(e) { // Simulates the key event
            try {
                if (e.key.split('-').length === 2 && e.key.split('-')[1] === 'true') { // Checks for the condition
                    insertAtCursor(input, e.key.split('-')[0]) // Insert it
                }
            } catch (e) {
                if (e.name !== 'TypeError') {
                    throw e
                }
            }
        }


        var arr = ['keydown'] // Array of desired events

        arr.forEach(function(event) {
            input.addEventListener(event, simulate) // Dynamically add event listeners
        })

        input.focus();
        setTimeout(() => input.dispatchEvent(eventFactory('keydown')), 10)
        setTimeout(() => input.dispatchEvent(eventFactory('beforeinput')), 20)
        setTimeout(() => input.dispatchEvent(eventFactory('keypress')), 30)
        setTimeout(() => input.dispatchEvent(eventFactory('input')), 40)
        setTimeout(() => input.dispatchEvent(eventFactory('change')), 50)
        setTimeout(() => input.dispatchEvent(eventFactory('keyup')), 60)

        function eventFactory(eventName) {
            return new KeyboardEvent(eventName, {
                key: " -true", // It is modified to e-true instead of e to allow us to check
                keyCode: 32, // example values.
                code: "Space", // put everything you need in this object.
                which: 32,
                shiftKey: false, // you don't need to include values
                ctrlKey: false, // if you aren't going to use them.
                metaKey: false, // these are here for example's sake.
            });
        }
    }




    /*Tampilkan TOMBOL SEND*/
    if(document.getElementsByClassName("textbox-submit-button")[0]){
        /*Tekan TOMBOL SEND*/
        var clicksendcoment = document.getElementsByClassName("textbox-submit-button")[0];
        clicksendcoment.disabled = false;
        var clickEvent = document.createEvent ('MouseEvents');
        clickEvent.initEvent ("mousedown", true, true);
        clicksendcoment.dispatchEvent (clickEvent);
        console.log("Comment Terkirim");
        /*Tekan TOMBOL SEND*/
    } else if(document.getElementsByTagName("button")[1]){
        var clicksendcoment1 = document.getElementsByTagName("button")[1];
        clicksendcoment1.disabled = false;
        var clickEvent1 = document.createEvent ('MouseEvents');
        clickEvent1.initEvent ("mousedown", true, true);
        clicksendcoment1.dispatchEvent (clickEvent1);
    }
}