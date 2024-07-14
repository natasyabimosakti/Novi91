// ==UserScript==
// @name         ROOM Insider
// @namespace    http://tampermonkey.net/
// @version      3.05
// @description  try to take over the world!
// @updateURL
// @downloadURL
// @author       You
// @match        http*://*/*
// @run-at       document-end
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        window.close
// ==/UserScript==
var refresh = 40;


var admin = ["Siâo","aldi","artha","adelia","ananda","aditia","andri","ayesha","aurel","alde","adm","audi","andy","ayesha",
             "brian","boboho","bobby","bonar","bella","bastian",
             "cinta","calvin","celsia","celine",
             "denis","dollar","dewa","dewi","dinda","dika","dea",
             "echa","erika","elly","erwin",
             "farah","febrian","fiana","farid","fahresa",
             "gretha",
             "herfizah","hana","hoihai","hefi","habib",
             "inisial","intan","icha","irfan",
             "jhone","jess","jovanka","jenifer","jihan","jesika","je pe",
             "kumbara","kemon","kayla","katty","kendri","kembar","kotna","kiky",
             "lehman","lianda","laura","leon","lidya","larissa","leksa","lina",
             "manu","mesa","mardia","maes","mad","miranda","melati","minion","mariana","mahendra","multi","megaways",
             "nadila","neng","naura","nathaya","nella","neman","novi",
             "oun","oscar","otong",
             "puput","primus","priyan",
             "ratu","roy","rendy","ria","ruto","riko","rano","robby",
             "sanchez","siska","safar","sanjaya","san","sandiego","sloter","sinta","slooter","sabrina","salsabila","sintia","sejitu",
             "tink","thonex","tiara","tania","tag",
             "ujen",
             "vonny","viona","virna",
             "wahid","wahzo","wok","wndt","wiena",
             "yoky","yasmine","yohana",
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
var keyword10 = "🎱"

var Backlist1 = "pemenang lomba";
var Backlist2 = "rekap";
var Backlist3 = "hasil";
var Backlist4 = "room lomba freebet";
var Backlist5 = "prediksi";
var Backlist6 = "result";
var Backlist7 = "result";

setTimeout(function() {
if( document.querySelectorAll("[value='Komentari']").length > 0){
return
}
    var ceknamagroup
    var ceknamagroup1
    var ceknamagroup2
    var ceknamagroup3
    var ceknamagroup4
    'use strict';
    if( document.querySelectorAll("[data-mcomponent='ServerTextArea']")[4]){
        ceknamagroup = document.querySelectorAll("[data-mcomponent='ServerTextArea']")[4].textContent;
    }
    for (let ntv = 0; ntv < document.getElementsByTagName("article").length; ntv++) {
        if (document.getElementsByTagName("article")[ntv]){
            // Nama FB
            var namafb = document.getElementsByTagName("article")[ntv].querySelectorAll("[role='presentation']")[0];
            //Jam
            var jamposting = document.getElementsByTagName("article")[ntv].children[1].getElementsByTagName("abbr")[0];
            //Postingan
            var postingan =document.getElementsByTagName("article")[ntv].children[0];
            //Comment Box
            var getlink = document.getElementsByTagName("article")[ntv].children[1].children[1].getElementsByTagName("a");


            // Cek Jam
            var ret = jamposting.textContent.replace(/  Admin   |  Moderator   /g, "");
            if (ret.includes("Baru")||ret == "1 mnt"||ret == "2 mnt"||ret == "3 mnt"||ret == "4 mnt"||ret == "5 mnt"){
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
                        if(namafb.textContent.toLowerCase().includes(admin[adm].toLowerCase())){
                            // Tampilkan Siapa Yang Memposting
                            if(jamposting.textContent.toLowerCase().includes("admin")||jamposting.textContent.toLowerCase().includes("moderator")){
                                console.log("Admin yang Memosting = Admin/Moderator");
                            }else{
                                console.log("Admin yang Memosting = " + admin[adm]);
                            }
                            // Click Comment Box
                            for (var i = 0; i < getlink.length; i++) {
                                var noah = getlink[i].textContent;
                                if ( noah.search(/Komentar/) >= 0 || noah.includes("Komentari") == true || noah.includes("Komen") == true || noah.includes("Komentar") == true) {
                                    var carihref = getlink[i].href ;
                                    location.href = carihref;
                                    return;
                                };

                            };



                            return;
                        }
                    }
                }
            }
        }
    }
window.location.reload()


},refresh* 10)
