// ==UserScript==
// @name         API Mbasic
// @namespace    http://tampermonkey.net/
// @version      2024-07-14
// @description  try to take over the world!
// @author       You
// @match        https://*.facebook.com/*
// @match        https://www.facebook.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        window.close
// ==/UserScript==

var refresh = 40

var namagroup1 = 'SHIOKELINCI';
var Comment1 = '#shiokelinci4d*XERBIA13*06*80';

var namagroup2 = 'MIMPI';
var Comment2 = 'IYATOTO XENON88 26*73*41';

var namagroup3 = 'TIKTAK';
var Comment3 = '#Tiktaktogel / XELINA56 / 48 , 87 , 88';

var namagroup4 = 'GA1B';
var Comment4 = 'GAIB4D=XELEMINT53=20*97*85';

var namagroup5 = 'KEITOGEL';
var Comment5 = '#keitogel = (XELOP83) = 06*80*69';

var namagroup6 = 'KIOST0T0';
var Comment6 = 'KIOSTOTO=XANXAN68=68*28*71';

var namagroup7 = '453P';
var Comment7 = 'ASEPTOGEL XONKING52 23*76*02';

var namagroup8 = 'ANGKER';
var Comment8 = 'ANGKER4D=XELINA56=23*76*02';

var namagroup9 = 'GILA';
var Comment9 = 'GILA4D=XEROPON=48*87*90';

var namagroup10 = 'JNE';
var Comment10 = '#JNETOTO(XENDION)*95*93*59';

var namagroup11 = 'T_O_T_O_A_K_U_R_A_T';
var Comment11 = '#TA*XERLAK67*26*73*41*';

var namagroup12 = 'MASTER KUY';
var Comment12 = 'TOGELKUY XIANTAR6 95*93*59';

var namagroup13 = 'TOYIBSLOT';
var Comment13 = '#TOYIBSLOT ( XIOYIB47 ) : 72*13*38';

var namagroup14 = 'DENTOTO';
var Comment14 = '#DENTOTO 20*97*85 ( XIAOLAN6 )';

var namagroup15 = 'HATRICK';
var Comment15 = 'VESPATOGEL (XIONGYU6)  72*13*38';

var namagroup16 = '521625';
var Comment16 = '';

var namagroup17 = 'Jawatengah';
var Comment17 = 'Mbasic';





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

setTimeout(function(){


    var articlefb = document.querySelectorAll("[role='article']");
    for(var artic = 0; artic < articlefb.length; artic++) {
        var carikeyword = document.querySelectorAll("[role='article']")[artic].children[0].textContent.toLocaleLowerCase()
        /*Cek Jam Postingan*/
        var cekjam = articlefb[artic].children[1].textContent;
        if(cekjam.slice(0,5).includes("Baru")||cekjam.slice(0,5).includes("1 mnt")||cekjam.slice(0,5).includes("2 mnt")||cekjam.slice(0,5).includes("3 mnt")||cekjam.slice(0,5).includes("4 mnt")||cekjam.slice(0,7).includes("1 menit")||cekjam.slice(0,7).includes("2 menit")||cekjam.slice(0,7).includes("3 menit")||cekjam.slice(0,7).includes("4 menit")){

            if(carikeyword.includes(keyword1.toLocaleLowerCase())||
               carikeyword.includes(keyword2.toLocaleLowerCase())||
               carikeyword.includes(keyword3.toLocaleLowerCase())||
               carikeyword.includes(keyword4.toLocaleLowerCase())||
               carikeyword.includes(keyword5.toLocaleLowerCase())||
               carikeyword.includes(keyword6.toLocaleLowerCase())||
               carikeyword.includes(keyword7.toLocaleLowerCase())||
               carikeyword.includes(keyword8.toLocaleLowerCase())||
               carikeyword.includes(keyword9.toLocaleLowerCase())||
               carikeyword.includes(keyword10.toLocaleLowerCase()) ){
                console.log ("Keyword Di Temukan")
                if(carikeyword.includes(Backlist1.toLocaleLowerCase())||
                   carikeyword.includes(Backlist2.toLocaleLowerCase())||
                   carikeyword.includes(Backlist3.toLocaleLowerCase())||
                   carikeyword.includes(Backlist4.toLocaleLowerCase())||
                   carikeyword.includes(Backlist5.toLocaleLowerCase())||
                   carikeyword.includes(Backlist6.toLocaleLowerCase())||
                   carikeyword.includes(Backlist7.toLocaleLowerCase()) ){
                    console.log ("BACKLIST Di Temukan . . . . !")
                    return;
                }
                console.log ("Backlist Tidak Di Temukan Lanjutkan Prosess")
                /*Kirim Postingan*/
                PostComment(artic)
                return;
                /*Kirim Postingan*/

            }

        }else{
            console.log ("JAM TIDAK DI TEMUKAN")
        }

    }
    window.location.reload()

}, refresh * 10)







/*PostComment Jangan DI OTAK ATIK*/


function PostComment(numberpost) {
    console.log(numberpost)

    var ceknamagroup
    var commentan




    if (document.title.toLocaleLowerCase().includes(namagroup1.toLocaleLowerCase())){
        /*cek nama group dan tulis commntar*/

        commentan = Comment1;
        console.log("Sudah Comment")
    }


    if (document.title.toLocaleLowerCase().includes(namagroup2.toLocaleLowerCase())){
        /*cek nama group dan tulis commntar*/

        commentan = Comment2;
        console.log("Sudah Comment")
    }

    if (document.title.toLocaleLowerCase().includes(namagroup3.toLocaleLowerCase())){
        /*cek nama group dan tulis commntar*/

        commentan = Comment3;
        console.log("Sudah Comment")
    }

    if (document.title.toLocaleLowerCase().includes(namagroup4.toLocaleLowerCase())){
        /*cek nama group dan tulis commntar*/

        commentan = Comment4;
        console.log("Sudah Comment")
    }

    if (document.title.toLocaleLowerCase().includes(namagroup5.toLocaleLowerCase())){
        /*cek nama group dan tulis commntar*/

        commentan = Comment5;
        console.log("Sudah Comment")
    }

    if (document.title.toLocaleLowerCase().includes(namagroup6.toLocaleLowerCase())){
        /*cek nama group dan tulis commntar*/

        commentan = Comment6;
        console.log("Sudah Comment")
    }

    if (document.title.toLocaleLowerCase().includes(namagroup7.toLocaleLowerCase())){
        /*cek nama group dan tulis commntar*/

        commentan = Comment7;
        console.log("Sudah Comment")
    }

    if (document.title.toLocaleLowerCase().includes(namagroup8.toLocaleLowerCase())){
        /*cek nama group dan tulis commntar*/

        commentan = Comment8;
        console.log("Sudah Comment")
    }

    if (document.title.toLocaleLowerCase().includes(namagroup9.toLocaleLowerCase())){
        /*cek nama group dan tulis commntar*/

        commentan = Comment9;
        console.log("Sudah Comment")
    }

    if (document.title.toLocaleLowerCase().includes(namagroup10.toLocaleLowerCase())){
        /*cek nama group dan tulis commntar*/

        commentan = Comment10;
        console.log("Sudah Comment")
    }

    if (document.title.toLocaleLowerCase().includes(namagroup11.toLocaleLowerCase())){
        /*cek nama group dan tulis commntar*/

        commentan = Comment11;
        console.log("Sudah Comment")
    }

    if (document.title.toLocaleLowerCase().includes(namagroup12.toLocaleLowerCase())){
        /*cek nama group dan tulis commntar*/

        commentan = Comment12;
        console.log("Sudah Comment")
    }

    if (document.title.toLocaleLowerCase().includes(namagroup13.toLocaleLowerCase())){
        /*cek nama group dan tulis commntar*/

        commentan = Comment13;
        console.log("Sudah Comment")
    }

    if (document.title.toLocaleLowerCase().includes(namagroup14.toLocaleLowerCase())){
        /*cek nama group dan tulis commntar*/

        commentan = Comment14;
        console.log("Sudah Comment")
    }

    if (document.title.toLocaleLowerCase().includes(namagroup15.toLocaleLowerCase())){
        /*cek nama group dan tulis commntar*/

        commentan = Comment15;
        console.log("Sudah Comment")
    }

    if (document.title.toLocaleLowerCase().includes(namagroup16.toLocaleLowerCase())){
        /*cek nama group dan tulis commntar*/

        commentan = Comment16;
        console.log("Sudah Comment")
    }

    if (document.title.toLocaleLowerCase().includes(namagroup17.toLocaleLowerCase())){
        /*cek nama group dan tulis commntar*/

        commentan = Comment17;
        console.log("Sudah Comment")
    }


























    /*cari identifier=*/
    var juson
    for(var cake = 0; cake < document.querySelectorAll("[role='article']")[numberpost].querySelectorAll("[href]").length; cake++) {
        if(document.querySelectorAll("[role='article']")[numberpost].querySelectorAll("[href]")[cake].href.includes("identifier=")){
            juson = document.querySelectorAll("[role='article']")[numberpost].querySelectorAll("[href]")[cake].href.split("identifier=",2).pop().split("&", 1)
        }
    }
    console.log ("identifier="+juson)
    /*cari identifier= SELESAI*/



    /*cari eav=*/
    var eav
    for(var c = 0; c < document.querySelectorAll("[role='article']")[numberpost].querySelectorAll("[href]").length; c++) {
        if(document.querySelectorAll("[role='article']")[numberpost].querySelectorAll("[href]")[c].textContent.includes("Komentar")){

            if(document.querySelectorAll("[role='article']")[numberpost].querySelectorAll("[href]")[c].href.includes("eav=")){
                eav = document.querySelectorAll("[role='article']")[numberpost].querySelectorAll("[href]")[c].href.split("eav=",2).pop().split('"', 1)
            }
        }

    }
    console.log ("eav="+eav)
    /*cari eav= SELESAI*/


    var av = document.querySelectorAll("[method='post']")[0].action.split("av=",2).pop().split('&', 1);






    var sot ="https://mbasic.facebook.com/a/comment.php?fs=8&fr=%2Fwap%2Fprofile_tribe.php&actionsource=0&comment_logging&ft_ent_identifier=" + juson + "&eav="+eav+"&av="+av+"&gfid=AQCL513AfL_w82BI-0c&paipv=0&refid=18"
    const myHeaders = new Headers();
    myHeaders.append("dpr", "1");
    myHeaders.append("viewport-width", "400");
    myHeaders.append("sec-ch-ua", "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"");
    myHeaders.append("sec-ch-ua-mobile", "?1");
    myHeaders.append("sec-ch-ua-platform", "\"Android\"");
    myHeaders.append("sec-ch-ua-platform-version", "\"6.0\"");
    myHeaders.append("sec-ch-ua-model", "\"Nexus 5\"");
    myHeaders.append("sec-ch-ua-full-version-list", "\"Not/A)Brand\";v=\"8.0.0.0\", \"Chromium\";v=\"126.0.6478.127\", \"Google Chrome\";v=\"126.0.6478.127\"");
    myHeaders.append("sec-ch-prefers-color-scheme", "dark");
    myHeaders.append("Upgrade-Insecure-Requests", "1");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("User-Agent", "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36");
    myHeaders.append("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7");
    myHeaders.append("Sec-Fetch-Site", "same-origin");
    myHeaders.append("Sec-Fetch-Mode", "navigate");
    myHeaders.append("Sec-Fetch-User", "?1");
    myHeaders.append("Sec-Fetch-Dest", "document");
    myHeaders.append("host", "mbasic.facebook.com");
    myHeaders.append("Cookie", "datr=CCZqZnGr7_aEelE0vUNkRkBm");

    const urlencoded = new URLSearchParams();
    urlencoded.append("comment_text", commentan);
    urlencoded.append("fb_dtsg", document.querySelectorAll("[name='fb_dtsg']")[0].value);
    urlencoded.append("jazoest", document.querySelectorAll("[name='jazoest']")[0].value);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow"
    };

    fetch(sot, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    closer()

}






function closer() {
    setTimeout(function(){location.href = "about:blank"},100)


}
