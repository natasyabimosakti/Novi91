// ==UserScript==
// @name         Plontos
// @namespace    http://tampermonkey.net/
// @version      3.05
// @description  try to take over the world!
// @updateURL    https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Room%20Insider.js
// @downloadURL  https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Room%20Insider.js
// @author       You
// @match        http*://*/*
// @run-at       document-end
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        window.close
// ==/UserScript==



var namagroup1 = 'RITOGEL';
var Comment1 = '#RITOGEL(BUNDER0)71*11*45';

var namagroup2 = 'K86';
var Comment2 = 'K86TOTO ( BOLINA61 ) : 49*40*28';

var namagroup3 = 'PUSAT LOMBA';
var Comment3 = 'Shiotogel4d (BUANG31) 59*78*39';

var namagroup4 = 'SEJ1TU';
var Comment4 = '#SEJITU ( BUANA87 ) : 21*57*13';

var namagroup5 = 'RNR';
var Comment5 = '‌#RNR303(BUKABEH) : 07*75*63';

var namagroup6 = 'DIVA4D';
var Comment6 = '#DIVA4D (BURUNG69) = 77*80*19';

var namagroup7 = 'Hoho';
var Comment7 = 'BOLINA61 : 10*81*34 #HOHOTOGEL';

var namagroup8 = 'TOK99T0T0';
var Comment8 = 'Tok99Toto ( BUDELTUNG ) : 68*17*92';

var namagroup9 = 'Wellz';
var Comment9 = 'SIJITOGEL BUANGKALI 59*78*39';

var namagroup10 = 'SLOTO';
var Comment10 = '#SLOTOGEL (BUWOSOK12) : 21*57*13';

var namagroup11 = 'KEBAYA';
var Comment11 = '(KEBAYA4D) = (BUNTOTASU) 07*75*63';

var namagroup12 = 'BESTOTO';
var Comment12 = 'BUSUNGMU62 : 77*80*19 #BESTOTO88';

var namagroup13 = 'GOHT0G3L';
var Comment13 = 'GOHTOGEL=BUANGKABEH=10*81*34';

var namagroup14 = 'BLITAR';
var Comment14 = '#BLITAR4D ( BOTAP27 ) : 44*17*92';

var namagroup15 = 'XX1';
var Comment15 = '#XX1TOTO (BOTAP27)  71*11*45 BETTING';

var namagroup16 = 'KECERDASAN';
var Comment16 = 'CITA4D*BOLINA61*49*40*28';







var namagroup17 = 'Jawatengah';
var Comment17 = 'Tester';

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











var refresh = 40;



var admin = ["Siâo","habib","sofia","neng","arxidi","che","aldi","nino","sofia","sonia","serena","alde","puput","mad","hefi","dika","iyatoto","adm","celsia","jne","kotna","yoky","audi","lianda","salsabila","yohana","wok","bastian","hoihai","tink","sinta","kembar","laura","ayesha","tiktak","nella","novi","sandiego","nasution","ratu","priyan","san","ria","sanjaya","siska","Baru","aditia","keitogel","safar","mahendra","multi","mariana","neman","tatang","dewi","primus","roy","dewi","melati","kumbara","dentoto","ananda","cinta","lina","icha","bobby","sanchez","oscar","rendy"];


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
var Backlist5 = "prediksi";
var Backlist6 = "result";
var Backlist7 = "result";

var myrefresh = setInterval(function(){
    var ceknamagroup
    'use strict';
    if( document.querySelectorAll("[data-mcomponent='ServerTextArea']")[4]){
        ceknamagroup = document.querySelectorAll("[data-mcomponent='ServerTextArea']")[4].textContent;
    }
    console.log(" ");

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
}, refresh * 10)

var myInterval = setInterval(function(){


   
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
            var clickboot = document.querySelectorAll('[data-tracking-duration-id')[ntv].getElementsByClassName('native-text')[0]
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
                            for (let atv = 0; atv < document.querySelectorAll('[data-tracking-duration-id]')[ntv].querySelectorAll("[role='button']").length; atv++) {
                                if (document.querySelectorAll('[data-tracking-duration-id]')[ntv].querySelectorAll("[role='button']")[atv].textContent.includes("󰍹")){
                                    console.log("ada")
                                    document.querySelectorAll('[data-tracking-duration-id]')[ntv].querySelectorAll("[role='button']")[atv].click()
                                    clearInterval(myInterval);
                                    clearInterval(myrefresh);








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


var commentanku = setInterval(function(){
     var ceknamagroup

    'use strict';
    if( document.querySelectorAll("[data-mcomponent='ServerTextArea']")[4]){
        ceknamagroup = document.querySelectorAll("[data-mcomponent='ServerTextArea']")[4].textContent;
    }

    if (ceknamagroup.includes(namagroup1) == true) {

        if( document.getElementsByClassName("internal-input")[0] ){
            /*cek nama group dan tulis commntar*/
            GM.setValue( 1,1);
            document.getElementsByClassName("internal-input")[0].value = Comment1;

            clearInterval(commentanku);
            console.log("Sudah Comment")
            clicksend();
            return;
        }

    }

    if (ceknamagroup.includes(namagroup2) == true) {

        if( document.getElementsByClassName("internal-input")[0] ){
            /*cek nama group dan tulis commntar*/
            GM.setValue( 2,1);
            /*cek nama group dan tulis commntar*/
            document.getElementsByClassName("internal-input")[0].value = Comment2;

            clearInterval(commentanku);
            console.log("Sudah Comment")
            clicksend();
            return;
        }

    }
    if (ceknamagroup.includes(namagroup3) == true) {

        if( document.getElementsByClassName("internal-input")[0] ){
            /*cek nama group dan tulis commntar*/
            GM.setValue( 3,1);
            /*cek nama group dan tulis commntar*/
            document.getElementsByClassName("internal-input")[0].value = Comment3;

            clearInterval(commentanku);
            console.log("Sudah Comment")
            clicksend();
            return;
        }

    }

    if (ceknamagroup.includes(namagroup4) == true) {
        /*cek nama group dan tulis commntar*/

        if( document.getElementsByClassName("internal-input")[0] ){
            /*cek nama group dan tulis commntar*/
            GM.setValue( 4,1);
            document.getElementsByClassName("internal-input")[0].value = Comment4;

            clearInterval(commentanku);
            console.log("Sudah Comment")
            clicksend();
            return;
        }

    }

    if (ceknamagroup.includes(namagroup5) == true) {
        /*cek nama group dan tulis commntar*/
        if( document.getElementsByClassName("internal-input")[0] ){
            /*cek nama group dan tulis commntar*/
            GM.setValue( 5,1);
            document.getElementsByClassName("internal-input")[0].value = Comment5;

            clearInterval(commentanku);
            console.log("Sudah Comment")
            clicksend();
            return;
        }
    }

    if (ceknamagroup.includes(namagroup6) == true) {
        /*cek nama group dan tulis commntar*/

        if( document.getElementsByClassName("internal-input")[0] ){
            /*cek nama group dan tulis commntar*/
            GM.setValue( 6,1);
            document.getElementsByClassName("internal-input")[0].value = Comment6;

            clearInterval(commentanku);
            console.log("Sudah Comment")
            clicksend();
            return;
        }

    }

    if (ceknamagroup.includes(namagroup7) == true) {
        /*cek nama group dan tulis commntar*/

        if( document.getElementsByClassName("internal-input")[0] ){
            /*cek nama group dan tulis commntar*/
            GM.setValue( 7,1);
            document.getElementsByClassName("internal-input")[0].value = Comment7;

            clearInterval(commentanku);
            console.log("Sudah Comment")
            clicksend();
            return;
        }

    }

    if (ceknamagroup.includes(namagroup8) == true) {
        /*cek nama group dan tulis commntar*/

        if( document.getElementsByClassName("internal-input")[0] ){
            /*cek nama group dan tulis commntar*/
            GM.setValue( 8,1);
            document.getElementsByClassName("internal-input")[0].value = Comment8;

            clearInterval(commentanku);
            console.log("Sudah Comment")
            clicksend();
            return;
        }

    }

    if (ceknamagroup.includes(namagroup9) == true) {
        /*cek nama group dan tulis commntar*/

        if( document.getElementsByClassName("internal-input")[0] ){
            /*cek nama group dan tulis commntar*/
            GM.setValue( 9,1);
            document.getElementsByClassName("internal-input")[0].value = Comment9;

            clearInterval(commentanku);
            console.log("Sudah Comment")
            clicksend();
            return;
        }

    }

    if (ceknamagroup.includes(namagroup10) == true) {
        /*cek nama group dan tulis commntar*/

        if( document.getElementsByClassName("internal-input")[0] ){
            /*cek nama group dan tulis commntar*/
            GM.setValue( 10,1);
            document.getElementsByClassName("internal-input")[0].value = Comment10;

            clearInterval(commentanku);
            console.log("Sudah Comment")
            clicksend();
            return;
        }

    }

    if (ceknamagroup.includes(namagroup11) == true) {
        /*cek nama group dan tulis commntar*/

        if( document.getElementsByClassName("internal-input")[0] ){
            /*cek nama group dan tulis commntar*/
            GM.setValue( 11,1);
            document.getElementsByClassName("internal-input")[0].value = Comment11;

            clearInterval(commentanku);
            console.log("Sudah Comment")
            clicksend();
            return;
        }

    }


    if (ceknamagroup.includes(namagroup12) == true) {
        /*cek nama group dan tulis commntar*/

        if( document.getElementsByClassName("internal-input")[0] ){
            /*cek nama group dan tulis commntar*/
            GM.setValue( 12,1);
            document.getElementsByClassName("internal-input")[0].value = Comment12;

            clearInterval(commentanku);
            console.log("Sudah Comment")
            clicksend();
            return;
        }

    }

    if (ceknamagroup.includes(namagroup13) == true) {
        /*cek nama group dan tulis commntar*/

        if( document.getElementsByClassName("internal-input")[0] ){
            /*cek nama group dan tulis commntar*/
            GM.setValue( 13,1);
            document.getElementsByClassName("internal-input")[0].value = Comment13;

            clearInterval(commentanku);
            console.log("Sudah Comment")
            clicksend();
            return;
        }

    }

    if (ceknamagroup.includes(namagroup14) == true) {
        /*cek nama group dan tulis commntar*/

        if( document.getElementsByClassName("internal-input")[0] ){
            /*cek nama group dan tulis commntar*/
            GM.setValue( 14,1);
            document.getElementsByClassName("internal-input")[0].value = Comment14;

            clearInterval(commentanku);
            console.log("Sudah Comment")
            clicksend();
            return;
        }

    }

    if (ceknamagroup.includes(namagroup15) == true) {
        /*cek nama group dan tulis commntar*/

        if( document.getElementsByClassName("internal-input")[0] ){
            /*cek nama group dan tulis commntar*/
            GM.setValue( 15,1);
            document.getElementsByClassName("internal-input")[0].value = Comment15;

            clearInterval(commentanku);
            console.log("Sudah Comment")
            clicksend();
            return;
        }

    }

    if (ceknamagroup.includes(namagroup16) == true) {
        /*cek nama group dan tulis commntar*/

        if( document.getElementsByClassName("internal-input")[0] ){
            /*cek nama group dan tulis commntar*/
            GM.setValue( 16,1);
            document.getElementsByClassName("internal-input")[0].value = Comment16;

            clearInterval(commentanku);
            console.log("Sudah Comment")
            clicksend();
            return;
        }

    }
    if (ceknamagroup.includes(namagroup17) == true) {
        /*cek nama group dan tulis commntar*/

        if( document.getElementsByClassName("internal-input")[0] ){
            /*cek nama group dan tulis commntar*/
            GM.setValue( 17,1);
            document.getElementsByClassName("internal-input")[0].value = Comment17;

            clearInterval(commentanku);
            console.log("Sudah Comment")
            clicksend();
            return;
        }

    }
},240)

function clicksend() {
    /*Tampilkan TOMBOL SEND*/
    /*Tekan TOMBOL SEND*/
   if( document.getElementsByClassName("internal-input")[0].value.length > 1){
    document.querySelectorAll("[aria-label='Posting komentar']")[0].click()
    console.log("Comment Terkirim");
       closer()
   }
    /*Tekan TOMBOL SEND*/

}


function closer() {
    setTimeout(function(){location.href = "about:blank"},5)


}
