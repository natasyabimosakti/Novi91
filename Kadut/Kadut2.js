// ==UserScript==
// @name         NEW KADUT2
// @namespace    http://tampermonkey.net/
// @version      3.83
// @description  try to take over the world!
// @updateURL    https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Kadut/Kadut2.js
// @downloadURL  https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Kadut/Kadut2.js
// @author       You
// @match        http*://*/*
// @run-at       document-end
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        window.close
// ==/UserScript==





var namagroup1 = 'SHIOKELINCI';
var Comment1 = '#shiokelinci4d*SRIWLIT62*56*58'; 

var namagroup2 = 'BUKU';
var Comment2 = 'IYATOTO SRIWING72 18*52*36'; 

var namagroup3 = 'TIKTAK';
var Comment3 = '#Tiktaktogel / SRIMIT64 / 00 , 20 , 30'; 

var namagroup4 = 'GAIB';
var Comment4 = 'GAIB4D=SRIWET67=94*43*12'; 

var namagroup5 = 'KEITOGEL';
var Comment5 = '#keitogel = (SRIANU36) = 40*92*55'; 

var namagroup6 = 'KIOST0T0';
var Comment6 = 'KIOSTOTO=SRIWIDURTI=11*45*66'; 

var namagroup7 = '453P VIP';
var Comment7 = 'ASEPTOGEL SRINDIM63 05*48*07'; 

var namagroup8 = 'ANGKER';
var Comment8 = 'ANGKER4D=SRINDIM63=70*54*57'; 

var namagroup9 = 'GILA';
var Comment9 = 'GILA4D=SRIWEL74=56*58*49'; 

var namagroup10 = 'JNE';
var Comment10 = '#JNETOTO(SRIWING67)*18*52*36'; 

var namagroup11 = 'T_O_T_O_A_K_U_R_A_T';
var Comment11 = '#TA*SRIANU36*00*20*30*'; 

var namagroup12 = 'MASTER KUY';
var Comment12 = 'TOGELKUY SRISUWING 94*43*12'; 

var namagroup13 = 'TOYIBSLOT';
var Comment13 = '#TOYIBSLOT ( SRIMBELEWEL ) : 40*92*55'; 

var namagroup14 = 'DENTOTO';
var Comment14 = '#DENTOTO 11*45*66 ( SRILAKCU )'; 

var namagroup15 = 'SIJI';
var Comment15 = 'SIJITOGEL SRIWEL74 05*48*91'; 

var namagroup16 = 'NEMO';
var Comment16 = 'NEMO4D (BUNDER0) : 70*54*91'; 

var namagroup17 = 'CIVIC';
var Comment17 = '#CIVICTOTO(SRIWING72) = 57*07';

var namagroup18 = 'Jawatengah';
var Comment18 = 'Kadut2';



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




    for (let ntv = 0; ntv < document.querySelectorAll('[data-tracking-duration-id').length; ntv++) {
        if (document.querySelectorAll('[data-tracking-duration-id')[ntv]){
            // Nama FB
            var namafb = document.querySelectorAll('[data-tracking-duration-id]')[ntv].getElementsByClassName('native-text')[0];
            //Jam
            var jamposting = document.querySelectorAll('[data-tracking-duration-id]')[ntv].getElementsByClassName('native-text')[1];
            //Postingan
            var postingan =document.querySelectorAll('[data-tracking-duration-id')[ntv].getElementsByClassName('native-text')[3];
            //Comment Box
            var datacommentbox = document.querySelectorAll('[data-tracking-duration-id')[ntv].getElementsByClassName('native-text').length -3
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
                            for (var clk = datacommentbox; clk < datacommentbox+11; clk++) {
                                if(commentbox[clk]){
                                    if(commentbox[clk].textContent.toLowerCase().includes("jawab")|| commentbox[clk].textContent.toLowerCase().includes("tulis")){
                                        commentbox[clk].click()

                                    }

                                }
                            }
                            var ceknamagroup
                            'use strict';
                            ceknamagroup = document.getElementsByClassName("fixed-container top")[0]
                            if(ceknamagroup){

                                if (ceknamagroup.textContent.includes(namagroup1) ) {
                                    if (id1 == "" || id1 == undefined || id1 == null ||id1 == "0") {
                                        /*cek nama group dan tulis commntar*/

                                        document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment1;


                                        if(document.getElementsByClassName("multi-line-floating-textbox")[0].textContent = Comment1){
                                            GM.setValue( 1,1);
                                            clearInterval(myInterval);
                                            clearInterval(myrefresh);
                                            console.log("Sudah Comment")
                                            clicksend();
                                            return;
                                        }
                                    } else {
                                        location.href = "about:blank"

                                    }
                                }

                                if (ceknamagroup.textContent.includes(namagroup2) ) {
                                    if (id2 == "" || id2 == undefined || id2 == null ||id2 == "0") {
                                        /*cek nama group dan tulis commntar*/

                                        /*cek nama group dan tulis commntar*/
                                        document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment2;


                                        if(document.getElementsByClassName("multi-line-floating-textbox")[0].textContent = Comment2){
                                            GM.setValue( 2,1);
                                            clearInterval(myInterval);
                                            clearInterval(myrefresh);
                                            console.log("Sudah Comment")
                                            clicksend();
                                            return;
                                        }
                                    } else {
                                        location.href = "about:blank"

                                    }
                                }
                                if (ceknamagroup.textContent.includes(namagroup3) ) {
                                    if (id3 == "" || id3 == undefined || id3 == null ||id3 == "0") {
                                        /*cek nama group dan tulis commntar*/

                                        /*cek nama group dan tulis commntar*/
                                        document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment3;


                                        if(document.getElementsByClassName("multi-line-floating-textbox")[0].textContent = Comment3){
                                            GM.setValue( 3,1);
                                            clearInterval(myInterval);
                                            clearInterval(myrefresh);
                                            console.log("Sudah Comment")
                                            clicksend();
                                            return;
                                        }
                                    } else {
                                        location.href = "about:blank"

                                    }
                                }

                                if (ceknamagroup.textContent.includes(namagroup4) ) {
                                    /*cek nama group dan tulis commntar*/
                                    if (id4 == "" || id4 == undefined || id4 == null ||id4 == "0") {
                                        /*cek nama group dan tulis commntar*/

                                        document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment4;

                                        if(document.getElementsByClassName("multi-line-floating-textbox")[0].textContent = Comment4){
                                            GM.setValue( 4,1);
                                            clearInterval(myInterval);
                                            clearInterval(myrefresh);
                                            console.log("Sudah Comment")
                                            clicksend();
                                            return;
                                        }
                                    } else {
                                        location.href = "about:blank"

                                    }
                                }

                                if (ceknamagroup.textContent.includes(namagroup5) ) {
                                    /*cek nama group dan tulis commntar*/
                                    if (id5 == "" || id5 == undefined || id5 == null ||id5 == "0") {
                                        /*cek nama group dan tulis commntar*/
                                        document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment5;


                                        if(document.getElementsByClassName("multi-line-floating-textbox")[0].textContent = Comment5){
                                            GM.setValue( 5,1);
                                            clearInterval(myInterval);
                                            clearInterval(myrefresh);
                                            console.log("Sudah Comment")
                                            clicksend();
                                            return;
                                        }
                                    } else {
                                        location.href = "about:blank"

                                    }
                                }

                                if (ceknamagroup.textContent.includes(namagroup6) ) {
                                    /*cek nama group dan tulis commntar*/
                                    if (id6 == "" || id6 == undefined || id6 == null ||id6 == "0") {
                                        /*cek nama group dan tulis commntar*/

                                        document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment6;

                                        if(document.getElementsByClassName("multi-line-floating-textbox")[0].textContent = Comment6){
                                            GM.setValue( 6,1);
                                            clearInterval(myInterval);
                                            clearInterval(myrefresh);
                                            console.log("Sudah Comment")
                                            clicksend();
                                            return;
                                        }
                                    } else {
                                        location.href = "about:blank"

                                    }
                                }

                                if (ceknamagroup.textContent.includes(namagroup7) ) {
                                    /*cek nama group dan tulis commntar*/
                                    if (id7 == "" || id7 == undefined || id7 == null ||id7 == "0") {
                                        /*cek nama group dan tulis commntar*/

                                        document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment7;

                                        if(document.getElementsByClassName("multi-line-floating-textbox")[0].textContent = Comment7){
                                            GM.setValue( 7,1);
                                            clearInterval(myInterval);
                                            clearInterval(myrefresh);
                                            console.log("Sudah Comment")
                                            clicksend();
                                            return;
                                        }
                                    } else {
                                        location.href = "about:blank"

                                    }
                                }

                                if (ceknamagroup.textContent.includes(namagroup8) ) {
                                    /*cek nama group dan tulis commntar*/
                                    if (id8 == "" || id8 == undefined || id8 == null ||id8 == "0") {
                                        /*cek nama group dan tulis commntar*/

                                        document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment8;

                                        if(document.getElementsByClassName("multi-line-floating-textbox")[0].textContent = Comment8){
                                            GM.setValue(8,1);
                                            clearInterval(myInterval);
                                            clearInterval(myrefresh);
                                            console.log("Sudah Comment")
                                            clicksend();
                                            return;
                                        }
                                    } else {
                                        location.href = "about:blank"

                                    }
                                }

                                if (ceknamagroup.textContent.includes(namagroup9) ) {
                                    /*cek nama group dan tulis commntar*/
                                    if (id9 == "" || id9 == undefined || id9 == null ||id9 == "0") {
                                        /*cek nama group dan tulis commntar*/

                                        document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment9;

                                        if(document.getElementsByClassName("multi-line-floating-textbox")[0].textContent = Comment9){
                                            GM.setValue( 9,1);
                                            clearInterval(myInterval);
                                            clearInterval(myrefresh);
                                            console.log("Sudah Comment")
                                            clicksend();
                                            return;
                                        }
                                    } else {
                                        location.href = "about:blank"

                                    }
                                }

                                if (ceknamagroup.textContent.includes(namagroup10) ) {
                                    /*cek nama group dan tulis commntar*/
                                    if (id10 == "" || id10 == undefined || id10 == null ||id10 == "0") {
                                        /*cek nama group dan tulis commntar*/

                                        document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment10;

                                        if(document.getElementsByClassName("multi-line-floating-textbox")[0].textContent = Comment10){
                                            GM.setValue( 10,1);
                                            clearInterval(myInterval);
                                            clearInterval(myrefresh);
                                            console.log("Sudah Comment")
                                            clicksend();
                                            return;
                                        }
                                    } else {
                                        location.href = "about:blank"

                                    }
                                }

                                if (ceknamagroup.textContent.includes(namagroup11) ) {
                                    /*cek nama group dan tulis commntar*/
                                    if (id11 == "" || id11 == undefined || id11 == null ||id11 == "0") {
                                        /*cek nama group dan tulis commntar*/

                                        document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment11;

                                        if(document.getElementsByClassName("multi-line-floating-textbox")[0].textContent = Comment11){
                                            GM.setValue( 11,1);
                                            clearInterval(myInterval);
                                            clearInterval(myrefresh);
                                            console.log("Sudah Comment")
                                            clicksend();
                                            return;
                                        }
                                    } else {
                                        location.href = "about:blank"

                                    }
                                }


                                if (ceknamagroup.textContent.includes(namagroup12) ) {
                                    /*cek nama group dan tulis commntar*/
                                    if (id12 == "" || id12 == undefined || id12 == null ||id12 == "0") {
                                        /*cek nama group dan tulis commntar*/

                                        document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment12;

                                        if(document.getElementsByClassName("multi-line-floating-textbox")[0].textContent = Comment12){
                                            GM.setValue( 12,1);
                                            clearInterval(myInterval);
                                            clearInterval(myrefresh);
                                            console.log("Sudah Comment")
                                            clicksend();
                                            return;
                                        }
                                    } else {
                                        location.href = "about:blank"

                                    }
                                }

                                if (ceknamagroup.textContent.includes(namagroup13) ) {
                                    /*cek nama group dan tulis commntar*/
                                    if (id13 == "" || id13 == undefined || id13 == null ||id13 == "0") {
                                        /*cek nama group dan tulis commntar*/

                                        document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment13;

                                        if(document.getElementsByClassName("multi-line-floating-textbox")[0].textContent = Comment13){
                                            GM.setValue( 13,1);
                                            clearInterval(myInterval);
                                            clearInterval(myrefresh);
                                            console.log("Sudah Comment")
                                            clicksend();
                                            return;
                                        }
                                    } else {
                                        location.href = "about:blank"

                                    }
                                }

                                if (ceknamagroup.textContent.includes(namagroup14) ) {
                                    /*cek nama group dan tulis commntar*/
                                    if (id14 == "" || id14 == undefined || id14 == null ||id14 == "0") {
                                        /*cek nama group dan tulis commntar*/

                                        document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment14;

                                        if(document.getElementsByClassName("multi-line-floating-textbox")[0].textContent = Comment14){
                                            GM.setValue( 14,1);
                                            clearInterval(myInterval);
                                            clearInterval(myrefresh);
                                            console.log("Sudah Comment")
                                            clicksend();
                                            return;
                                        }
                                    } else {
                                        location.href = "about:blank"

                                    }
                                }

                                if (ceknamagroup.textContent.includes(namagroup15) ) {
                                    /*cek nama group dan tulis commntar*/
                                    if (id15 == "" || id15 == undefined || id15 == null ||id15 == "0") {
                                        /*cek nama group dan tulis commntar*/

                                        document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment15;

                                        if(document.getElementsByClassName("multi-line-floating-textbox")[0].textContent = Comment15){
                                            GM.setValue( 15,1);
                                            clearInterval(myInterval);
                                            clearInterval(myrefresh);
                                            console.log("Sudah Comment")
                                            clicksend();
                                            return;
                                        }
                                    } else {
                                        location.href = "about:blank"

                                    }
                                }

                                if (ceknamagroup.textContent.includes(namagroup16) ) {
                                    /*cek nama group dan tulis commntar*/
                                    if (id16 == "" || id16 == undefined || id16 == null ||id16 == "0") {
                                        /*cek nama group dan tulis commntar*/

                                        document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment16;

                                        if(document.getElementsByClassName("multi-line-floating-textbox")[0].textContent = Comment16){
                                            GM.setValue( 16,1);
                                            clearInterval(myInterval);
                                            clearInterval(myrefresh);
                                            console.log("Sudah Comment")
                                            clicksend();
                                            return;
                                        }
                                    } else {
                                        location.href = "about:blank"

                                    }
                                }

                                if (ceknamagroup.textContent.includes(namagroup17) ) {
                                    /*cek nama group dan tulis commntar*/
                                    if (id17 == "" || id17 == undefined || id17 == null ||id17 == "0") {
                                        /*cek nama group dan tulis commntar*/

                                        document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment17;

                                       if(document.getElementsByClassName("multi-line-floating-textbox")[0].textContent = Comment17){
                                            GM.setValue( 17,1);
                                            clearInterval(myInterval);
                                            clearInterval(myrefresh);
                                            console.log("Sudah Comment")
                                            clicksend();
                                            return;
                                        }
                                    } else {
                                        location.href = "about:blank"

                                    }
                                }

                                if (ceknamagroup.textContent.includes(namagroup18) ) {
                                    /*cek nama group dan tulis commntar*/
                                    if (id18 == "" || id18 == undefined || id18 == null ||id18 == "0") {
                                        /*cek nama group dan tulis commntar*/

                                        document.getElementsByClassName("multi-line-floating-textbox")[0].value = Comment18;

                                        if(document.getElementsByClassName("multi-line-floating-textbox")[0].textContent = Comment18){
                                            GM.setValue( 18,1);
                                            clearInterval(myInterval);
                                            clearInterval(myrefresh);
                                            console.log("Sudah Comment")
                                            clicksend();
                                            return;
                                        }
                                    } else {
                                        location.href = "about:blank"

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
