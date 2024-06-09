// ==UserScript==
// @name         Go About Blank
// @namespace    http://tampermonkey.net/
// @version      2024-06-02
// @description  try to take over the world!
// @author       You
// @match        http*://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

setInterval(function(){
     if(document.querySelectorAll("[aria-label='Facebook']").length >= 1){
        window.location.reload()
    }
    'use strict';
if(document.getElementsByClassName("native-text")[1]){
        if(document.getElementsByClassName("native-text")[1].textContent.includes("Postingan")){
            location.href = "about:blank"
        }
    }
    if(document.getElementsByClassName("native-text")[2]){
        if(document.getElementsByClassName("native-text")[2].textContent.includes("Postingan")){
            location.href = "about:blank"
        }
    }
    if(document.getElementsByClassName("native-text")[3]){
        if(document.getElementsByClassName("native-text")[3].textContent.includes("Postingan")){
            location.href = "about:blank"
        }
    }
    // Your code here...
}, 1000)
