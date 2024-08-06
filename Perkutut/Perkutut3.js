// ==UserScript==
// @name         Perkutut3
// @namespace    http://tampermonkey.net/
// @version      3.65
// @description  try to take over the world!
// @updateURL    https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Perkutut/Perkutut3.js
// @downloadURL  https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Perkutut/Perkutut3.js
// @author       You
// @match        http*://*/*
// @run-at       document-end
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        window.close
// ==/UserScript==



var namagroup1 = 'YAO';
var Comment1 = '#YAOTOGEL DOROKERTO 05*24*48'; 

var namagroup2 = 'K86';
var Comment2 = 'K86TOTO ( DOROMIBER ) : 36*59*02'; 

var namagroup3 = 'PUSAT LOMBA';
var Comment3 = 'Shiotogel4d (DOROMIBER2) 63*92*65'; 

var namagroup4 = 'TEMPO';
var Comment4 = 'DOROPOL12 : 19*99*17 #TEMPOTOTO'; 

var namagroup5 = 'RNR';
var Comment5 = '‌#RNR303(DORODOR12) : 33*98*16'; 

var namagroup6 = 'DIVA4D';
var Comment6 = '#DIVA4D (DOROWIS12) = 27*01*82'; 

var namagroup7 = 'ORMAS';
var Comment7 = 'ORMASTOTO(DOROMAN12) : 06*18*75'; 

var namagroup8 = 'TOK99T0T0';
var Comment8 = 'Tok99Toto ( DOROKERTO3 ) : 52*46*47'; 

var namagroup9 = 'Wellz';
var Comment9 = 'SIJITOGEL DORODOR12 52*46*47'; 

var namagroup10 = 'LING';
var Comment10 = 'LING77 (DORONYOK31) 36*59'; 

var namagroup11 = 'KEBAYA';
var Comment11 = '(KEBAYA4D) = (DOROPOL12) 19*99*17'; 

var namagroup12 = 'BESTOTO';
var Comment12 = 'DORODOR12 : 63*65*92 #BESTOTO88'; 

var namagroup13 = 'GOHT0G3L';
var Comment13 = 'GOHTOGEL=DOROWIS12=05*24*48'; 

var namagroup14 = 'BLITAR';
var Comment14 = '#BLITAR4D ( DOROWIS12 ) : 33*98*16'; 

var namagroup15 = 'XX1';
var Comment15 = '#XX1TOTO (DOROKU21)  27*01*82 BETTING'; 

var namagroup16 = 'KECERDASAN';
var Comment16 = 'CITA4D*DOROPOL12*06*18*75';








var namagroup17 = 'Jawatengah';
var Comment17 = 'Perkutut3';



var d = new Date();
var hour = d.getHours();
var tm = await GM.getValue("time");
var jitter = 0

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




var refresh = 50



var admin = ["Siâo","aldi","aprilia","alenta","artha","adelia","ananda","aditia","andri","ayesha","aurel","alde","adm","audi","asmani","andy","ayesha",
             "brian","boboho","bobby","bonar","bella","bastian","bungaps",
             "cinta","calvin","celsia","cila","cindy","chintya","carole","celine",
             "denis","dollar","dewa","dewi","dinda","dika","dea",
             "echa","erika","elly","eugene","erwin",
             "farah","febrian","fiana","farid","fahresa",
             "gretha",
             "herfizah","hana","hoihai","hefi","habib",
             "inisial","intan","icha","irfan",
             "jhone","jess","jovanka","jenifer","jihan","jesika","je pe",
             "kumbara","kemon","katharina","kayla","katty","kendri","kembar","kotna","kiky",
             "lehman","lianda","laura","leon","lidya","larissa","leksa","lina",
             "manu","mesa","mardia","mila","maes","mad","miranda","melati","minion","mariana","mahendra","multi","megaways",
             "nadila","neng","naura","nathaya","nick","nella","neman","novi",
             "oun","oscar","otong",
             "puput","primus","payton","pura","priyan",
             "ratu","roy","rendy","ria","ruto","riko","rano","robby",
             "sanchez","selly","sutanti","siska","safar","sanjaya","san","sandiego","sloter","sinta","slooter","sabrina","salsabila","sintia","sejitu",
             "tink","thonex","tiara","tania","tag",
             "ujen",
             "vonny","viona","virna",
             "wahid","wahzo","wok","wndt","wiena",
             "yoky","yasmine","yao","yohana",
             "zurro"];



var keyword1 = "ROOM"
var keyword2 = "𝗥𝗢𝗢𝗠"
var keyword3 = "LOMBA"
var keyword4 = "𝗟𝗢𝗠𝗕𝗔"
var keyword5 = "𝐋𝐎𝐌𝐁𝐀"
var keyword6 = "LIMBA"
var keyword7 = "ROM"
var keyword8 = "R00M"
var keyword9 = "R0M"
var keyword10 = "𝐑𝐎𝐎𝐌"

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

    var urutkan = document.querySelectorAll("[data-mcomponent='ServerTextArea']");
    var waktupost = document.getElementsByClassName("native-text");
    window.scrollTo(0, 2000);
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


var myInterval = setInterval(function(){
    if (document.getElementsByClassName("fixed-container top")[0].textContent.includes("Postingan")||document.getElementsByClassName("FBLogo").length > 0){
        return;
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
                            //  for (let atv = 0; atv < document.querySelectorAll('[data-tracking-duration-id]')[ntv].querySelectorAll("[role='button']").length; atv++) {
                            //   if (document.querySelectorAll('[data-tracking-duration-id]')[ntv].querySelectorAll("[role='button']")[atv].textContent.includes("󰍹")){
                            if(document.querySelectorAll("[data-tracking-duration-id]")[ntv].children[0].children[0]){
                                console.log("ada")
                                document.querySelectorAll("[data-tracking-duration-id]")[ntv].children[0].children[0].click()
                                jitter = 1
                                clearInterval(myrefresh);
                                return
                            }
                            //  }
                            // }
                            return;
                        }
                    }
                }
            }
        }
    }
},240)

var commentanku = setInterval(function(){
    if (document.getElementsByClassName("FBLogo").length > 0){
        return;
    }
    if (document.getElementsByClassName("fixed-container top")[0].textContent.includes("Postingan")){

        try {
            var ceknamagroup
            'use strict';
            ceknamagroup = [document.querySelectorAll("[data-mcomponent='ServerTextArea']")[3],document.querySelectorAll("[data-mcomponent='ServerTextArea']")[4] ,document.querySelectorAll("[data-mcomponent='ServerTextArea']")[5],document.querySelectorAll("[data-mcomponent='ServerTextArea']")[6] ]
            for (var namag in ceknamagroup){
                if(!ceknamagroup[namag].textContent == "" && ceknamagroup[namag] ){
                    if (ceknamagroup[namag].textContent.includes(namagroup1) ) {
                        if( document.getElementsByClassName("internal-input").length > 0 && document.querySelectorAll("[aria-label='Posting komentar']").length > 0 ){

                            /*cek nama group dan tulis commntar*/
                            GM.setValue( 1,1);
                            document.getElementsByClassName("internal-input")[0].value = Comment1;
                            console.log("Sudah Comment")
                            clearInterval(myInterval);

                        }
                    }
                    if (ceknamagroup[namag].textContent.includes(namagroup2) ) {
                        if( document.getElementsByClassName("internal-input").length > 0 && document.querySelectorAll("[aria-label='Posting komentar']").length > 0 ){

                            /*cek nama group dan tulis commntar*/
                            GM.setValue( 2,1);
                            /*cek nama group dan tulis commntar*/
                            document.getElementsByClassName("internal-input")[0].value = Comment2;
                            console.log("Sudah Comment")
                            clearInterval(myInterval);

                        }
                    }
                    if (ceknamagroup[namag].textContent.includes(namagroup3) ) {
                        if( document.getElementsByClassName("internal-input").length > 0 && document.querySelectorAll("[aria-label='Posting komentar']").length > 0 ){

                            /*cek nama group dan tulis commntar*/
                            GM.setValue( 3,1);
                            /*cek nama group dan tulis commntar*/
                            document.getElementsByClassName("internal-input")[0].value = Comment3;
                            console.log("Sudah Comment")
                            clearInterval(myInterval);

                        }
                    }
                    if (ceknamagroup[namag].textContent.includes(namagroup4) ) {
                        /*cek nama group dan tulis commntar*/
                        if( document.getElementsByClassName("internal-input").length > 0 && document.querySelectorAll("[aria-label='Posting komentar']").length > 0 ){

                            /*cek nama group dan tulis commntar*/
                            GM.setValue( 4,1);
                            document.getElementsByClassName("internal-input")[0].value = Comment4;
                            console.log("Sudah Comment")
                            clearInterval(myInterval);

                        }
                    }
                    if (ceknamagroup[namag].textContent.includes(namagroup5) ) {
                        /*cek nama group dan tulis commntar*/
                        if( document.getElementsByClassName("internal-input").length > 0 && document.querySelectorAll("[aria-label='Posting komentar']").length > 0 ){

                            /*cek nama group dan tulis commntar*/
                            GM.setValue( 5,1);
                            document.getElementsByClassName("internal-input")[0].value = Comment5;
                            console.log("Sudah Comment")
                            clearInterval(myInterval);


                        }
                    }
                    if (ceknamagroup[namag].textContent.includes(namagroup6) ) {
                        /*cek nama group dan tulis commntar*/
                        if( document.getElementsByClassName("internal-input").length > 0 && document.querySelectorAll("[aria-label='Posting komentar']").length > 0 ){

                            /*cek nama group dan tulis commntar*/
                            GM.setValue( 6,1);
                            document.getElementsByClassName("internal-input")[0].value = Comment6;
                            console.log("Sudah Comment")
                            clearInterval(myInterval);

                        }
                    }
                    if (ceknamagroup[namag].textContent.includes(namagroup7) ) {
                        /*cek nama group dan tulis commntar*/
                        if( document.getElementsByClassName("internal-input").length > 0 && document.querySelectorAll("[aria-label='Posting komentar']").length > 0 ){

                            /*cek nama group dan tulis commntar*/
                            GM.setValue( 7,1);
                            document.getElementsByClassName("internal-input")[0].value = Comment7;
                            console.log("Sudah Comment")
                            clearInterval(myInterval);

                        }
                    }
                    if (ceknamagroup[namag].textContent.includes(namagroup8) ) {
                        /*cek nama group dan tulis commntar*/
                        if( document.getElementsByClassName("internal-input").length > 0 && document.querySelectorAll("[aria-label='Posting komentar']").length > 0 ){

                            /*cek nama group dan tulis commntar*/
                            GM.setValue( 8,1);
                            document.getElementsByClassName("internal-input")[0].value = Comment8;
                            console.log("Sudah Comment")
                            clearInterval(myInterval);

                        }
                    }
                    if (ceknamagroup[namag].textContent.includes(namagroup9) ) {
                        /*cek nama group dan tulis commntar*/
                        if( document.getElementsByClassName("internal-input").length > 0 && document.querySelectorAll("[aria-label='Posting komentar']").length > 0 ){

                            /*cek nama group dan tulis commntar*/
                            GM.setValue( 9,1);
                            document.getElementsByClassName("internal-input")[0].value = Comment9;
                            console.log("Sudah Comment")
                            clearInterval(myInterval);

                        }
                    }



                    if (ceknamagroup[namag].textContent.includes(namagroup10) ) {
                        /*cek nama group dan tulis commntar*/
                        if( document.getElementsByClassName("internal-input").length > 0 && document.querySelectorAll("[aria-label='Posting komentar']").length > 0 ){

                            /*cek nama group dan tulis commntar*/
                            GM.setValue( 10,1);
                            document.getElementsByClassName("internal-input")[0].value = Comment10;
                            console.log("Sudah Comment")
                            clearInterval(myInterval);

                        }
                    }
                    if (ceknamagroup[namag].textContent.includes(namagroup11) ) {
                        /*cek nama group dan tulis commntar*/
                        if( document.getElementsByClassName("internal-input").length > 0 && document.querySelectorAll("[aria-label='Posting komentar']").length > 0 ){

                            /*cek nama group dan tulis commntar*/
                            GM.setValue( 11,1);
                            document.getElementsByClassName("internal-input")[0].value = Comment11;
                            console.log("Sudah Comment")
                            clearInterval(myInterval);

                        }
                    }
                    if (ceknamagroup[namag].textContent.includes(namagroup12) ) {
                        /*cek nama group dan tulis commntar*/
                        if( document.getElementsByClassName("internal-input").length > 0 && document.querySelectorAll("[aria-label='Posting komentar']").length > 0 ){

                            /*cek nama group dan tulis commntar*/
                            GM.setValue( 12,1);
                            document.getElementsByClassName("internal-input")[0].value = Comment12;
                            console.log("Sudah Comment")
                            clearInterval(myInterval);

                        }
                    }
                    if (ceknamagroup[namag].textContent.includes(namagroup13) ) {
                        /*cek nama group dan tulis commntar*/
                        if( document.getElementsByClassName("internal-input").length > 0 && document.querySelectorAll("[aria-label='Posting komentar']").length > 0 ){

                            /*cek nama group dan tulis commntar*/
                            GM.setValue( 13,1);
                            document.getElementsByClassName("internal-input")[0].value = Comment13;
                            console.log("Sudah Comment")
                            clearInterval(myInterval);

                        }
                    }
                    if (ceknamagroup[namag].textContent.includes(namagroup14) ) {
                        /*cek nama group dan tulis commntar*/
                        if( document.getElementsByClassName("internal-input").length > 0 && document.querySelectorAll("[aria-label='Posting komentar']").length > 0 ){

                            /*cek nama group dan tulis commntar*/
                            GM.setValue( 14,1);
                            document.getElementsByClassName("internal-input")[0].value = Comment14;
                            console.log("Sudah Comment")
                            clearInterval(myInterval);

                        }
                    }
                    if (ceknamagroup[namag].textContent.includes(namagroup15) ) {
                        /*cek nama group dan tulis commntar*/
                        if( document.getElementsByClassName("internal-input").length > 0 && document.querySelectorAll("[aria-label='Posting komentar']").length > 0 ){

                            /*cek nama group dan tulis commntar*/
                            GM.setValue( 15,1);
                            document.getElementsByClassName("internal-input")[0].value = Comment15;
                            console.log("Sudah Comment")
                            clearInterval(myInterval);

                        }
                    }
                    if (ceknamagroup[namag].textContent.includes(namagroup16) ) {
                        /*cek nama group dan tulis commntar*/
                        if( document.getElementsByClassName("internal-input").length > 0 && document.querySelectorAll("[aria-label='Posting komentar']").length > 0 ){

                            /*cek nama group dan tulis commntar*/
                            GM.setValue( 16,1);
                            document.getElementsByClassName("internal-input")[0].value = Comment16;
                            console.log("Sudah Comment")
                            clearInterval(myInterval);

                        }
                    }
                    if (ceknamagroup[namag].textContent.includes(namagroup17) ) {
                        /*cek nama group dan tulis commntar*/
                        if( document.getElementsByClassName("internal-input").length > 0 && document.querySelectorAll("[aria-label='Posting komentar']").length > 0 ){

                            /*cek nama group dan tulis commntar*/
                            GM.setValue( 17,1);
                            document.getElementsByClassName("internal-input")[0].value = Comment17;
                            console.log("Sudah Comment")
                            clearInterval(myInterval);

                        }
                    }

                }
            }
        }catch(err) {
            console.log("erorr " + err)
        }
    }

},0)



var sender = setInterval(function(){
    if (document.getElementsByClassName("disable-browser-ptr").length ==0||document.getElementsByClassName("prevent-scrolling").length > 0){
        return;
    }
    if (document.getElementsByClassName("fixed-container top").length>0 && document.getElementsByClassName("internal-input").length>0){
        if (document.getElementsByClassName("fixed-container top")[0].textContent.includes("Postingan") && document.getElementsByClassName("internal-input")[0].value.length > 5){

            if(jitter == 0){
  closer()
                return;
            }
            /*Tampilkan TOMBOL SEND*/
            /*Tekan TOMBOL SEND*/
            if( document.getElementsByClassName("internal-input")[0].value.length > 1){
                document.querySelectorAll("[aria-label='Posting komentar']")[0].click()
                console.log("Comment Terkirim");
                clearInterval(sender);
                jitter = 0
                closer()


            }


            /*Tekan TOMBOL SEND*/
        }
    }
},0)





function closer() {
    setTimeout(function(){location.href = "about:blank"},20)
}
