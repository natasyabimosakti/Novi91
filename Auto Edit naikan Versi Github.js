// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2024-08-12
// @description  try to take over the world!
// @author       You
// @match        http*://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

var refres = setInterval(function(){
    if(document.querySelectorAll("[data-testid='edit-button']")){
        document.querySelectorAll("[data-testid='edit-button']")[0].click()
        clearInterval(refres)
    }

},2000)
var namabah = setInterval(function(){
    if(document.getElementsByClassName("cm-line")[3]){
        var nextver = parseInt(document.getElementsByClassName("cm-line")[3].textContent.split(".").pop()) +1
        document.getElementsByClassName("cm-line")[3].textContent = '// @version      3.' + nextver
        clearInterval(namabah)
    }

},2000)
