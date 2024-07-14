// ==UserScript==
// @name         clickComent body
// @namespace    http://tampermonkey.net/
// @version      0.8
// @updateURL    
// @downloadURL 
// @description  try to take over the world!
// @author       You
// @run-at       document-body
// @match        http*://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant       GM.setValue
// @grant       GM.getValue
// ==/UserScript==

/*Backlist Kata*/
var refrss = 4;

setTimeout(function() {
try{
var Backlist1 = "rekap";
var Backlist2 = "artikel";
var Backlist3 = "hasil";
var Backlist4 = "jam berapa";
var Backlist5 = "room lomba freebet";
var Backlist6 = "pemenang";
var Backlist7 = "(birutoto)";

var ia = document.getElementById('m_group_stories_container');
    if (ia) {
        var g = ia.getElementsByTagName("article")[0];
        var admnm = g.getElementsByTagName("strong")[0].textContent;
        var waktupost = g.getElementsByTagName("abbr")[0].textContent;
        var carikomen = g.getElementsByTagName("footer")[0].getElementsByTagName("div")[1];
        var postingan = g.getElementsByTagName('span')[2].textContent;
        var postinganmod = g.getElementsByTagName('span')[3].textContent;
        var postinganmod1 = g.getElementsByTagName('span')[4].textContent;
        var postingan1 = postingan.toLowerCase();
        var postingan2 = postinganmod.toLowerCase();
        var postingan3 = postinganmod1.toLowerCase();
        var aTags3 = carikomen.getElementsByTagName("a");

        if( waktupost == "Baru saja"||waktupost == "1 menit"||waktupost == "2 menit"||waktupost == "3 menit"||waktupost == "4 menit"||waktupost == "1 mnt"||waktupost == "2 mnt"||waktupost == "3 mnt"||waktupost == "4 mnt") {

            if (postingan1.includes(Backlist1) == true || postingan1.includes(Backlist2) == true || postingan1.includes(Backlist3) == true || postingan1.includes(Backlist4) == true || postingan1.includes(Backlist5) == true || postingan1.includes(Backlist6) == true|| postingan1.includes(Backlist7) == true) {
window.location.reload();
                return;
            };
            if (postingan2.includes(Backlist1) == true || postingan2.includes(Backlist2) == true || postingan2.includes(Backlist3) == true || postingan2.includes(Backlist4) == true || postingan2.includes(Backlist5) == true || postingan2.includes(Backlist6) == true|| postingan2.includes(Backlist7) == true) {
window.location.reload();
                return;
            };
            if (postingan3.includes(Backlist1) == true || postingan3.includes(Backlist2) == true || postingan3.includes(Backlist3) == true || postingan3.includes(Backlist4) == true || postingan3.includes(Backlist5) == true || postingan3.includes(Backlist6) == true|| postingan3.includes(Backlist7) == true) {
window.location.reload();
                return;
            };

if(postingan1.length > 5||postingan2.length > 5||postingan3.length > 5||postingan1.includes("🏅")){

            if (postingan1.includes("𝐋𝐎𝐌𝐁𝐀") == true||postingan1.includes("◼️") == true||postingan1.includes("🏅") == true||postingan1.includes("🏆") == true||postingan1.includes("lomba") == true || postingan1.includes("tebak") == true || postingan1.includes("room") == true ||postingan1.includes("𝗥𝗢𝗢𝗠") == true||postingan1.includes("R.O.O.M")==true||postingan1.includes("𝐫.𝐨.𝐨.𝐦") == true||postingan1.includes("𝗟𝗢𝗠𝗕𝗔") == true||postingan2.includes("lomba") == true ||postingan2.includes("𝐋𝐎𝐌𝐁𝐀") == true||postingan2.includes("◼️") == true||postingan2.includes("🏅") == true||postingan2.includes("🏆") == true| postingan2.includes("tebak") == true || postingan2.includes("room") == true ||postingan2.includes("𝗥𝗢𝗢𝗠") == true ||postingan2.includes("R.O.O.M")==true||postingan2.includes("𝐫.𝐨.𝐨.𝐦") == true||postingan2.includes("𝗟𝗢𝗠𝗕𝗔") == true||postingan3.includes("lomba") == true || postingan3.includes("tebak") == true || postingan3.includes("room") == true ||postingan3.includes("𝗥𝗢𝗢𝗠") == true||postingan3.includes("R.O.O.M")==true||postingan3.includes("𝐫.𝐨.𝐨.𝐦") == true||postingan3.includes("𝐋𝐎𝐌𝐁𝐀") == true||postingan3.includes("◼️") == true||postingan3.includes("🏅") == true||postingan3.includes("🏆") == true||postingan3.includes("𝗟𝗢𝗠𝗕𝗔") == true){
                for (var i = 0; i < aTags3.length; i++) {
                    var noah = aTags3[i].textContent;
                    if ( noah.search(/Komentar/) >= 0 || noah.includes("Komentari") == true || noah.includes("Komen") == true || noah.includes("Komentar") == true) {
                        var carihref = aTags3[i].href ;
                        location.href = carihref;
                        return;
                    };

                };
            };
};

        };
        if (postingan) {
            window.location.reload();
        };

};
}
    catch {
    };
}, refrss * 100);
